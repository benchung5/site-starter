
import Component from '../component';
import CustomerInfo from './customerInfo';
import CustomerInfoSummary from './customerInfoSummary';
import Payment from './payment';
import PaymentStatus from './paymentStatus';
import { postOrder, calcShippingAndTax } from '../actions/checkout'
import OrderSummary from './orderSummary';
import checkoutStore from '../storage/checkoutStore';
import { getUrlParams } from '../lib/utils';
const env = process.env.NODE_ENV || "development";
var { STRIPE_PUBLISHABLE_KEY } = require('../secret')[env];


(function() {
  var Main = {
    showMessage: function (messageText) {
      const messageContainer = document.querySelector("#message-container");
      messageContainer.innerHTML = messageText;
    },
    onChangeCustomerInfo: function() {
      checkoutStore.setData({customerDetailsUpdating: true});
      this.customerInfo.reAttach();
      this.customerInfoSummary.detach();
    },
    onTotalUpdated: function (apiData) {
      if (apiData.error) {
        this.showMessage(apiData.error);
        //destroy all elements
        this.customerInfo.linkAuthenticationElement.destroy();
        this.customerInfo.addressElement.destroy();
        this.customerInfo.el.innerHTML = "";
        this.orderSummary.el.innerHTML = "";
      } else {
        this.orderSummary.updateShippingAndTax(apiData.shipping, apiData.tax, apiData.total);
        checkoutStore.setData({ calcShippingLoading: false});
        checkoutStore.setData({customerDetailsUpdating: false});
      }

      if (!this.payment) {
        this.payment = Payment.init({
          stripe: this.stripe,
          elements: this.elements,
          message: this.showMessage.bind(this),
        });
      }
    },
    init: function() {
      var proto = Object.assign({}, this, Component);
      var inst = Object.create(proto);
      // assign the instance constructor to the prototype so 'this' refers to the instance
      proto.constructor = inst;

      checkoutStore.init();

      let elementsContainerEl = document.querySelector("#elements-container");
      let customerInfoContainerEl = document.querySelector("#customer-info-container");

      inst.order = {
        paymentIntentId: '',
        products: [],
        address: [],
        pickup: '',
        message: '',
        email: '',
      };

      // This is your test publishable API key.
      inst.stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

      // themes can be found here: https://docs.stripe.com/elements/appearance-api
      const appearance = {
        theme: 'stripe',
        variables: { 
          colorPrimary: '#645f68;',
          colorText: '#645f68',
          fontFamily: 'lato, "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif',
        }
      };
      // the element group to modify
      inst.elements = null;

      // remove later
      // **************************************
      // **************************************
      const hash = getUrlParams('test')[0];
      if (hash == 25465) {
        let testCart = [{
                  "id": "111",
                  "productTypeName": "Seeds",
                  "productTypeVariationName": "Packet",
                  "price": "50",
                  "amount_available": "1",
                  "status": null,
                  "image": null,
                  "plantId": "220",
                  "commonName": "Test Prod",
                  "botanicalName": "",
                  "plantUrl": "",
                  "quantity": "1"
              }];

        testCart = JSON.stringify(testCart);
        localStorage.setItem('cart', testCart);

        inst.order.test = 25465;
      }
      // **************************************
      // **************************************

      let cart = JSON.parse(localStorage.getItem('cart'));

      // check for payment completion response, otherwise start customer info form
      const statusClientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret");

      if (statusClientSecret) {
        inst.paymentStatus = PaymentStatus.init({
          stripe: inst.stripe,
          message: inst.showMessage.bind(inst),
          clientSecret: statusClientSecret
        });
        //remove stuff from localstorage
        localStorage.removeItem('cart');
      } else {
        localStorage.getItem('cart');
        inst.orderSummary = OrderSummary.init({ 
          cart: cart
        });
        if(cart.length !== 0) {
          elementsContainerEl.style.display = 'block';
          inst.order.products = cart;
          postOrder(inst.order, (apiData) => {
            inst.order.paymentIntentId = apiData.paymentIntentId;
            inst.elements = inst.stripe.elements({ clientSecret: apiData.clientSecret, appearance });
            inst.customerInfo = CustomerInfo.init({
              stripe: inst.stripe,
              elements: inst.elements,
              message: inst.showMessage.bind(inst),
              onCalculateShipping: (info) => {
                inst.showMessage('');
                if(!inst.customerInfoSummary) {
                  inst.customerInfoSummary = CustomerInfoSummary.init({
                    customerInfo: info,
                    onButtonClick: inst.onChangeCustomerInfo.bind(inst),
                  });
                } else {
                  inst.customerInfoSummary.update(info);
                  inst.customerInfoSummary.reAttach();
                }

                const cart = JSON.parse(localStorage.getItem('cart'));
                inst.order.address = info.address;
                inst.order.pickup = info.pickup;
                inst.order.message = info.message;
                inst.order.email = info.email;

                calcShippingAndTax(inst.order, (apiData) => {
                  inst.onTotalUpdated(apiData);
                });
              }
            });
          });
        }
      }
    }
  }

  Main.init();
})();