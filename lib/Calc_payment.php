<?php
namespace Lib;
use Config\Config;
use Config\Secret;
use Lib\Model;
use Lib\Controller;
use Lib\Utils;

class Calc_payment
{
    public static function calc_shipping($order) {
        // calc shipping
        $seeds = [];
        $plants = [];
        $grand_total_before_tax = 0;
        $shipping_cost_obj = (object)[];
        $shipping_cost_obj->grand_total_before_tax = 0;

        if ($order['pickup'] !== 'yes') {
            $product_count = 0;
            foreach ($order['products'] as $product) {
                $product_count = $product_count + $product['quantity'];
            }

            //add to box
            $boxes = [];
            $box_index = 0;
            $products_in_box = 0;
            $products_per_box = 6;

            for ($i = 1; $i <= $product_count; $i++) {
                if ($products_in_box >= $products_per_box) {
                    $box_index = $box_index + 1;
                    $products_in_box = 0;
                }
                $products_in_box = $products_in_box + 1;
                $boxes[$box_index] = (object)['product_count' => $products_in_box];
            }

            foreach ($boxes as $box) {
                //each plant pack is 0.44kg
                //each box material weight is 1.13kg
                $box->weight = (0.44 * $box->product_count) + 1.13;
                //round to 1 decimal place
                $box->weight = round($box->weight, 1);

                //calculate canada post shipping
                try {
                    $customer_number = Secret::keys('CANADA_POST_CUSTOMER_NUMBER');
                    $username = Secret::keys('CANADA_POST_API_USERNAME');
                    $password = Secret::keys('CANADA_POST_API_PASSWORD');

                    $service_url = 'https://ct.soa-gw.canadapost.ca/rs/ship/price';
                    
                    $origin_postal_code = Config::company_info('COMPANY_POSTAL_CODE');; 
                    $destination_postal_code = 'V5Z1B6';

                    // 8.3lb = 3.77kg
                    // 12in = 30.48cm
                    // 8in = 20.32cm
                    // 6in = 15.24cm
                    
                    $xmlRequest = <<<XML
                    <?xml version="1.0" encoding="UTF-8"?>
                    <mailing-scenario xmlns="http://www.canadapost.ca/ws/ship/rate-v4">
                        <customer-number>{$customer_number}</customer-number>
                        <parcel-characteristics>
                            <weight>$box->weight</weight>
                            <dimensions>
                                <length>30.5</length>
                                <width>20.3</width>
                                <height>15.2</height>
                            </dimensions>
                        </parcel-characteristics>
                        <origin-postal-code>{$origin_postal_code}</origin-postal-code>
                        <destination>
                            <domestic>
                                <postal-code>{$destination_postal_code}</postal-code>
                            </domestic>
                        </destination>
                    </mailing-scenario>
                    XML;
                    
                    $curl = curl_init($service_url); // Create REST Request
                    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
                    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
                    //curl_setopt($curl, CURLOPT_CAINFO, realpath(dirname($_SERVER['SCRIPT_FILENAME'])) . '/cert/cacert.pem');
                    curl_setopt($curl, CURLOPT_POST, true);
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $xmlRequest);
                    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
                    curl_setopt($curl, CURLOPT_USERPWD, $username . ':' . $password);
                    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/vnd.cpc.ship.rate-v4+xml', 'Accept: application/vnd.cpc.ship.rate-v4+xml'));
                    $curl_response = curl_exec($curl); // Execute REST Request
                    if(curl_errno($curl)){
                        throw new Exception("Curl Error encountered.");
                    }
                    
                    curl_close($curl);
                    
                    //Use SimpleXML to parse xml response
                    libxml_use_internal_errors(true);
                    $xml = simplexml_load_string('<root>' . preg_replace('/<\?xml.*\?>/','', $curl_response) . '</root>');
                    if (!$xml) {
                        throw new Exception("XML Parsing Failed");
                    } else {                    
                        if ($xml->{'price-quotes'} ) {
                            $priceQuotes = $xml->{'price-quotes'}->children('http://www.canadapost.ca/ws/ship/rate-v4');
                            if ( $priceQuotes->{'price-quote'} ) {
                                foreach ( $priceQuotes as $priceQuote ) {  

                                    if ($priceQuote->{'service-name'} == 'Expedited Parcel') {
                                        // properties of a SimpleXmlElement object are objects themselves, 
                                        // so you need to put "(string)" before them
                                        $box->base = (string) $priceQuote->{'price-details'}->{'base'};
                                        $box->tax = (string) $priceQuote->{'price-details'}->{'taxes'}->{'gst'};
                                        $box->fuel = (string) $priceQuote->{'price-details'}->{'adjustments'}->{'adjustment'}[0]->{'adjustment-cost'};
                                        $box->smb_savings = (string) $priceQuote->{'price-details'}->{'adjustments'}->{'adjustment'}[1]->{'adjustment-cost'};
                                        $box->total_before_tax = floatval($box->base) + floatval($box->smb_savings) + $box->fuel;
                                        //convert to cents
                                        $box->total_before_tax = $box->total_before_tax * 100;
                                    }

                                }
                            }
                        }


                        if ($xml->{'messages'} ) { 
                            //todo: handle possible error message                  
                            $messages = $xml->{'messages'}->children('http://www.canadapost.ca/ws/messages'); 

                            $error = (object)[];
                            $error->error = 'There was an error calculating shipping to your address. Please try again or contact us to make an order. We apololgize for the inconvinience';
                            Utils::json_respond(JWT_PROCESSING_ERROR, $error);
                        }
                        

                        $shipping_cost_obj->grand_total_before_tax = $shipping_cost_obj->grand_total_before_tax + $box->total_before_tax;
                    
                    }
                 
                } catch(Exception $e) {
                    Utils::json_respond(JWT_PROCESSING_ERROR, $e->getMessage());
                }
            }

            $shipping_cost_obj->box_count = count($boxes);
            // Utils::dbug($boxes);
            // Utils::dbug($shipping_cost_obj);
        }

        return $shipping_cost_obj;
    }

    public static function calc_tax($order, $shipping_cost) {
        // calc tax
        // Alberta: 5% GST, BC: 7% PST + 5% GST
        $total = 0;
        $tax = 0;
        foreach ($order['products'] as $product) {
            $subtotal = $product['price'] * $product['quantity'];
            $total = $subtotal + $total;
        }
        $total =  $total + $shipping_cost;

        if (($order['address']['state'] == 'QC')) {
            $tax = $total * 0.14975;
        }

        if (($order['address']['state'] == 'ON')) {
            $tax = $total * 0.13;
        }

        if (($order['address']['state'] == 'SK')) {
            $tax = $total * 0.11;
        }

        if (($order['address']['state'] == 'BC') || ($order['address']['state'] == 'MB')) {
            // $tax = $total * 0.12;
            $tax = $total * 0.05;
        }

        if (($order['address']['state'] == 'AB') || ($order['address']['state'] == 'NT') || ($order['address']['state'] == 'NU') || ($order['address']['state'] == 'YT')) {
            $tax = $total * 0.05;
        }

        if (($order['address']['state'] == 'NB') || ($order['address']['state'] == 'NL') || ($order['address']['state'] == 'NS') || ($order['address']['state'] == 'PE')) {
            $tax = $total * 0.15;
        }

        return intval($tax);
    }

    public static function calc_subtotal($order) {
        $total = 0;
        foreach ($order['products'] as $product) {
            $subtotal = $product['price'] * $product['quantity'];
            $total = $subtotal + $total;
        }

        return $total;
    }

    public static function verify_products($order) {

        $products_model = Controller::load_model('products_model');
        
        $valid = true;

        foreach ($order['products'] as $product) {
            $existing_product = $products_model->get(['id' => $product['id']]);

            if (!$existing_product) {
                $valid = false;
            } else {
                if ($product['quantity'] > $existing_product->amount_available) {
                    $valid = false;
                }

                if (intval($product['price']) !== $existing_product->price) {
                    $valid = false;
                }
            }
        }

        return $valid;
    }

}