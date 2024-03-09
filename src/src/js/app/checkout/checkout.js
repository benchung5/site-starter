
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


(function() {
  var Main = {
    showMessage: function (messageText) {
      const messageContainer = document.querySelector("#payment-message");

      messageContainer.classList.remove("hidden");
      messageContainer.textContent = messageText;

      setTimeout(function () {
        messageContainer.classList.add("hidden");
        messageContainer.textContent = "";
      }, 4000);
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
        products: [],
        address: [],
        pickup: '',
        message: '',
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

      // check for payment completion response, otherwise start customer info form
      const statusClientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret");

      if (statusClientSecret) {
        inst.paymentStatus = PaymentStatus.init({
          stripe: inst.stripe,
          message: inst.showMessage.bind(inst),
          clientSecret: statusClientSecret
        });
      } else {
        let cart = JSON.parse(localStorage.getItem('cart'));
        inst.orderSummary = OrderSummary.init({ 
          cart: cart 
        });
        if(cart.length !== 0) {
          appStateStore.setData({ isLoading: true});
          postOrder(inst.order, (apiData) => {
            inst.elements = inst.stripe.elements({ clientSecret: apiData.clientSecret, appearance });
            inst.cutomerInfo = CustomerInfo.init({
              stripe: inst.stripe,
              elements: inst.elements,
              onElementLoaded: inst.onFirstElementLoaded.bind(inst),
              onCalculateShipping: (info) => {
                const cart = JSON.parse(localStorage.getItem('cart'));
                inst.order.products = cart;
                inst.order.address = info.address;
                inst.order.pickup = info.pickup;
                inst.order.message = info.message;

                calcShippingAndTax(inst.order, (apiData) => {
                  inst.orderSummary.updateShippingAndTax(apiData.shipping, apiData.tax);

                  checkoutStore.setData({ calcShippingLoading: false});

                  //making sure not to load it twice
                  if(!inst.payment) {
                    inst.payment = Payment.init({
                      stripe: inst.stripe,
                      elements: inst.elements,
                      message: inst.showMessage.bind(inst)
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