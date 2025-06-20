<?php
namespace Lib;
use Config\Config;
use Config\Secret;
use Lib\Model;
use Lib\Controller;
use Lib\Utils;

class Process_shipment
{
    public static function create_shipment($order) 
    {
        /**
         * CreateNonContractShipment Canada Post service.
         * The CreateNonContractShipment service is used to generate and pay for a 
         * shipping label, including validation and payment authorization. 
         */

        $customer_number = Secret::keys('CANADA_POST_CUSTOMER_NUMBER');
        $username = Secret::keys('CANADA_POST_API_USERNAME');
        $password = Secret::keys('CANADA_POST_API_PASSWORD');
        $endpoint_url = Secret::keys('CANADA_POST_API_ENDPOINT');

        // REST URL
        $service_url = 'https://ct.soa-gw.canadapost.ca/rs/' . $customer_number . '/ncshipment';

        //the dropoff location postal code (Pine Center Canada Post in this case).
        $requeste_shipping_point = 'V2N2S0';
        //expedited parcel service code
        $service_code = 'DOM.EP';

        // // include in <destination> if applicable
        // <company>ACME Corp</company>

        // delivery options if needed
        // <options>
        //     <option>
        //         <option-code>DC</option-code>
        //     </option>
        // </options>

        $xmlRequest = <<<XML
        <?xml version="1.0" encoding="UTF-8"?>
        <non-contract-shipment xmlns="http://www.canadapost.ca/ws/ncshipment-v4">
            <requested-shipping-point>{$requeste_shipping_point}</requested-shipping-point>
            <delivery-spec>
                <service-code>{$service_code}</service-code>
                <sender>
                    <company>Nature With Us</company>
                    <contact-phone>1 (250) 981-1324</contact-phone>
                    <address-details>
                        <address-line-1>5535 Patterson Road E</address-line-1>
                        <city>Prince George</city>
                        <prov-state>BC</prov-state>
                        <postal-zip-code>V2N6A2</postal-zip-code>
                    </address-details>
                </sender>
                <destination>
                    <name>{$order->name}</name>
                    <address-details>
                        <address-line-1>{$order->line1}</address-line-1>
                        <address-line-2>{$order->line2}</address-line-2>
                        <city>{$order->city}</city>
                        <prov-state>{$order->state}</prov-state>
                        <country-code>CA</country-code>
                        <postal-zip-code>{$order->postal_code}</postal-zip-code>
                    </address-details>
                </destination>
                <parcel-characteristics>
                    <weight>15</weight>
                    <dimensions>
                        <length>1</length>
                        <width>1</width>
                        <height>1</height>
                    </dimensions>
                </parcel-characteristics>
                <preferences>
                    <show-packing-instructions>true</show-packing-instructions>
                </preferences>
                <references>
                    <cost-centre>ccent</cost-centre>
                    <customer-ref-1>{$order->id}</customer-ref-1>
                    <customer-ref-2>{$order->payment_intent_id}</customer-ref-2>
                </references>
            </delivery-spec>
        </non-contract-shipment>
        XML;

        $curl = curl_init($service_url); // Create REST Request
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
        // curl_setopt($curl, CURLOPT_CAINFO, realpath(dirname($_SERVER['SCRIPT_FILENAME'])) . '/../../../third-party/cert/cacert.pem'); // Signer Certificate in PEM format
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $xmlRequest);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($curl, CURLOPT_USERPWD, $username . ':' . $password);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/vnd.cpc.ncshipment-v4+xml', 'Accept: application/vnd.cpc.ncshipment-v4+xml'));
        $curl_response = curl_exec($curl); // Execute REST Request
        if(curl_errno($curl)){
            throw new Exception("Curl Error encountered.");
        }
        // echo 'HTTP Response Status: ' . curl_getinfo($curl,CURLINFO_HTTP_CODE) . "\n";
        curl_close($curl);

        // Example of using SimpleXML to parse xml response
        libxml_use_internal_errors(true);
        $xml = simplexml_load_string('<root>' . preg_replace('/<\?xml.*\?>/','',$curl_response) . '</root>');
        $shimpent_info = [];
        $shimpent_info['message'] = '';
        $shimpent_info['order_id'] = $order->id;

        if (!$xml) {
            $shimpent_info['message'] .= 'Failed loading XML' . "\n";
            $shimpent_info['message'] .= $curl_response . "\n";
            foreach(libxml_get_errors() as $error) {
                $shimpent_info['message'] .= "\t" . $error->message;
            }
        } else {  
            if ($xml->{'non-contract-shipment-info'} ) {    
                $shipment = $xml->{'non-contract-shipment-info'}->children('http://www.canadapost.ca/ws/ncshipment-v4');
                if ( $shipment->{'shipment-id'} ) {
                    $shimpent_info['Shipment ID'] = $shipment->{'shipment-id'};
                    foreach ( $shipment->{'links'}->{'link'} as $link ) { 
                        // $shimpent_info .= $link->attributes()->{'rel'} . ': ' . $link->attributes()->{'href'} . "\n";  
                        $shimpent_info[(string)$link->attributes()->{'rel'}] = (string)$link->attributes()->{'href'};    
                    }
                }
            }
            if ($xml->{'messages'} ) {                  
                $messages = $xml->{'messages'}->children('http://www.canadapost.ca/ws/messages');       
                foreach ( $messages as $message ) {
                    $shimpent_info['message'] .= 'Error Code: ' . $message->code . "\n";
                    $shimpent_info['message'] .= 'Error Msg: ' . $message->description . "\n\n";
                }
            }
        }

        return $shimpent_info;
    }

    public static function print_label($shimpent_info)
    {
        /**
         * The GetArtifact service is used to retrieve a pdf of the shipping label 
         * created by a prior Create Non-Contract Shipment call.
         */

        $username = Secret::keys('CANADA_POST_API_USERNAME');
        $password = Secret::keys('CANADA_POST_API_PASSWORD');
        $service_url = $shimpent_info['label'];

        $curl = curl_init($service_url); // Create REST Request
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2); 
        // curl_setopt($curl, CURLOPT_CAINFO, realpath(dirname($_SERVER['SCRIPT_FILENAME'])) . '/../../../third-party/cert/cacert.pem'); // Mozilla cacerts
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($curl, CURLOPT_USERPWD, $username . ':' . $password);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Accept:application/pdf', 'Accept-Language:en-CA'));
        $curl_response = curl_exec($curl); // Execute REST Request
        if(curl_errno($curl)){
            echo 'Curl error: ' . curl_error($curl) . "\n";
        }

        echo 'HTTP Response Status: ' . curl_getinfo($curl,CURLINFO_HTTP_CODE) . "\n";

        $contentType =  curl_getinfo($curl,CURLINFO_CONTENT_TYPE); 

        if ( strpos($contentType, 'application/pdf' ) !== FALSE ) {
            // Writing binary response to file
            // realpath doesn't include a trailing slash, so include it manually (must escape backslashes)
            $filePath = realpath('./temp')."\\";
            $fileName = 'artifact_' . $shimpent_info['order_id'] . '.pdf';
            $file = $filePath . $fileName;
            file_put_contents($file, $curl_response);

            //sending the file to the browser for download
            if (file_exists($file))
            {
                header("Cache-Control: public");
                header("Content-Description: File Transfer");
                header("Content-Disposition: attachment; filename=".basename($file));
                header("Content-Type: application/pdf");
                header("Content-Transfer-Encoding: binary");

                // read the file from disk
                readfile($file);

                utils::dbug($file);
            } else 
            {
                echo "error sending back the created pdf file: The file does not exist!";
            }
            
        } elseif (strpos($contentType, 'xml' ) > -1 ) {
            // Example of using SimpleXML to parse xml error response
            libxml_use_internal_errors(true);
            $xml = simplexml_load_string('<root>' . preg_replace('/<\?xml.*\?>/','',$curl_response) . '</root>');
            if (!$xml) {
                echo 'Failed loading XML' . "\n";
                echo $curl_response . "\n";
                foreach(libxml_get_errors() as $error) {
                    echo "\t" . $error->message;
                }
            } else {    
                if ($xml->{'messages'} ) {                  
                    $messages = $xml->{'messages'}->children('http://www.canadapost.ca/ws/messages');       
                    foreach ( $messages as $message ) {
                        echo 'Error Code: ' . $message->code . "\n";
                        echo 'Error Msg: ' . $message->description . "\n\n";
                    }
                }
            }
        } else {
            echo 'Unknown Content Type: ' . $contentType . "\n";
        }

        curl_close($curl);
    }

}