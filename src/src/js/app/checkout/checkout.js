
var { STRIPE_PUBLISHABLE_KEY } = require('../secret')['globals'];
import appStateStore from '../storage/appStateStore';
import Component from '../component';
import CustomerInfo from './customerInfo';
import Payment from './payment';
import PaymentStatus from './paymentStatus';
import { postOrder } from '../actions/checkout'
import OrderSummary from './orderSummary';

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
    init: function() {
      var proto = Object.assign({}, this, Component);
      var inst = Object.create(proto);
      // assign the instance constructor to the prototype so 'this' refers to the instance
      proto.constructor = inst;

      appStateStore.init();

      inst.order = {
        products: [],
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
        inst.orderSummary = OrderSummary.init();
        postOrder(inst.order, (apiData) => {
          inst.elements = inst.stripe.elements({ clientSecret: apiData.clientSecret, appearance });
          inst.cutomerInfo = CustomerInfo.init({
            stripe: inst.stripe,
            elements: inst.elements,
            onCalculateShipping: () => {
              //making sure not to load it twice
              if(!inst.payment) {
                inst.payment = Payment.init({
                  stripe: inst.stripe,
                  elements: inst.elements,
                  message: inst.showMessage.bind(inst)
                });
              }
            }
          });
        });
      }
    }
  }

  Main.init();
})();