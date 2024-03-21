
var { STRIPE_PUBLISHABLE_KEY } = require('../secret')['globals'];
import Component from '../component';
import CustomerInfo from './customerInfo';
import Payment from './payment';
import PaymentStatus from './paymentStatus';
import { postOrder, calcShippingAndTax } from '../actions/checkout'
import OrderSummary from './orderSummary';
import Loader from '../parts/loader';
import appStateStore from '../storage/appStateStore';
import checkoutStore from '../storage/checkoutStore';
import { getUrlParams } from '../lib/utils';


(function() {
  var Main = {
    showMessage: function (messageText) {
      const messageContainer = document.querySelector("#message-container");

      messageContainer.innerHTML = messageText;

      // setTimeout(function () {
      //   messageContainer.classList.add("hidden");
      //   messageContainer.textContent = "";
      // }, 5000);
    },
    onFirstElementLoaded: function () {
      appStateStore.setData({ isLoading: false});
    },
    init: function() {
      var proto = Object.assign({}, this, Component);
      var inst = Object.create(proto);
      // assign the instance constructor to the prototype so 'this' refers to the instance
      proto.constructor = inst;

      appStateStore.init();
      checkoutStore.init();

      let elementsContainerEl = document.querySelector("#elements-container");
      let customerInfoContainerEl = document.querySelector("#customer-info-container");
      //insert into loader, then insert that into the page container
      let loader = Loader.init({
        children: customerInfoContainerEl,
        minHeight: '10rem',
        size: '4rem',
        backgroundColor: '#f4f6f7'
      });
      elementsContainerEl.prepend(loader.el);

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

      localStorage.getItem('cart');
      inst.orderSummary = OrderSummary.init({ 
        cart: cart
      });

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
        localStorage.removeItem('shipping');
        localStorage.removeItem('tax');
      } else {
        if(cart.length !== 0) {
          elementsContainerEl.style.display = 'block';
          appStateStore.setData({ isLoading: true});
          inst.order.products = cart;
          postOrder(inst.order, (apiData) => {
            inst.order.paymentIntentId = apiData.paymentIntentId;
            inst.elements = inst.stripe.elements({ clientSecret: apiData.clientSecret, appearance });
            inst.cutomerInfo = CustomerInfo.init({
              stripe: inst.stripe,
              elements: inst.elements,
              message: inst.showMessage.bind(inst),
              onElementLoaded: inst.onFirstElementLoaded.bind(inst),
              onCalculateShipping: (info) => {
                this.showMessage('');
                const cart = JSON.parse(localStorage.getItem('cart'));
                inst.order.address = info.address;
                inst.order.pickup = info.pickup;
                inst.order.message = info.message;
                inst.order.email = info.email;

                calcShippingAndTax(inst.order, (apiData) => {
                  inst.orderSummary.updateShippingAndTax(apiData.shipping, apiData.tax);
                  localStorage.setItem('shipping', apiData.shipping);
                  localStorage.setItem('tax', apiData.tax);
                  checkoutStore.setData({ calcShippingLoading: false});

                  //making sure not to load it twice
                  if(!inst.payment) {
                    inst.payment = Payment.init({
                      stripe: inst.stripe,
                      elements: inst.elements,
                      message: inst.showMessage.bind(inst),
                    });
                  }
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