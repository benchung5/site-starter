
var { STRIPE_PUBLISHABLE_KEY } = require('../secret')['globals'];
import appStateStore from '../storage/appStateStore';
import Component from '../component';
import CustomerInfo from './customerInfo';
import Payment from './payment';
import PaymentStatus from './paymentStatus';
import { postOrder } from '../actions/checkout'

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

      const appearance = {
        theme: 'flat',
        variables: { colorPrimaryText: '#262626' }
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
        postOrder(inst.order, (apiData) => {
          inst.elements = inst.stripe.elements({ clientSecret: apiData.clientSecret, appearance });
          inst.cutomerInfo = CustomerInfo.init({
            stripe: inst.stripe,
            elements: inst.elements,
            onAddressComplete: () => {
              inst.payment = Payment.init({
                stripe: inst.stripe,
                elements: inst.elements,
                message: inst.showMessage.bind(inst)
              });
            }
          });
        });
      }
    }
  }

  Main.init();
})();



// ------- UI helpers -------



// //========================

// const env = process.env.NODE_ENV || "development";
// var { STRIPE_PUBLISHABLE_KEY } = require('../secret')['globals'];
// var { DOMAIN_URL, SERVER_URL } = require('../config')[env];
// import Loader from '../parts/loader';
// import appStateStore from '../storage/appStateStore';
// import { toggleClass } from '../lib/utils';


// appStateStore.init();

// let order = {
//   products: [],
// };

// // ------- stripe init -------

// // This is your test publishable API key.
// const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

// const appearance = {
//   theme: 'flat',
//   variables: { colorPrimaryText: '#262626' }
// };

// // the element group to modify
// let elements;

// // check for payment completion response, otherwise start address form
// const statusClientSecret = new URLSearchParams(window.location.search).get(
//   "payment_intent_client_secret");
// if (statusClientSecret) {
//   paymentStatus();
// } else {
//   initAddressForm();
// }

// // ------- email and address form-------

// let linkAuthenticationElement;
// let addressElement;

// async function initAddressForm() {

//   //insert into loader, then insert that into the page container
//   let el = document.querySelector("#customer-info-container .inner");
//   let loader = Loader.init({
//     children: el,
//     minHeight: '10rem',
//     // isInitialPageLoad: true,
//     backgroundColor: '#f4f6f7'
//   });
//   let container = document.querySelector("#customer-info-container");
//   container.appendChild(loader.el);

//   appStateStore.setData({ isLoading: true});

//   const { clientSecret } = await fetch(`${SERVER_URL}/checkout`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ order }),
//   }).then((r) => r.json());

//   elements = stripe.elements({ clientSecret, appearance });

//   const options = {
//     mode: 'shipping',
//     // since only one country, country selector is hidden
//     allowedCountries: ['CA'],
//   };

//   linkAuthenticationElement = elements.create("linkAuthentication");
//   linkAuthenticationElement.mount("#link-authentication-element");

//   addressElement = elements.create('address', options);
//   addressElement.mount('#address-element');

//   //fires a soon a s the form is filled, no submit needed
//   addressElement.on('change', (event) => {
//     if (event.complete){
//       // Extract potentially complete address
//       const address = event.value.address;
//       console.log(address);
//       //todo...calculate shipping and tax and update order summary
//       initPaymentForm();
//     }
//   })

//   linkAuthenticationElement.on('change', (event) => {
//     const email = event.value.email;
//     localStorage.setItem('customerEmail', email);
//     console.log('customerEmail: ', email);
//     let emailt = localStorage.getItem('customerEmail');
//     console.log('customerEmailStorage: ', emailt);
//   });

//   addressElement.on('ready', (event) => {
//       appStateStore.setData({ isLoading: false});
//   });
// }

// // ------- payment form -------

// document.querySelector("#payment-form").addEventListener("submit", onPaymentFormSubmit);
// let paymentElement;

// async function initPaymentForm() {

//   // cancel if payment element is already initiated
//   if(paymentElement) {
//     // paymentElement.update({business: {name: 'Stripe Shop'}});
//     // or 
//     // paymentElement.update();
//     return;
//   }

//   const options = {
//     business: {name: 'Nature With Us'},
//     layout: "tabs",
//   };

//   paymentElement = elements.create("payment", options);
//   paymentElement.mount("#payment-element");
// }

// async function onPaymentFormSubmit(e) {
//   e.preventDefault();
//   setLoading(true);

//   const { error } = await stripe.confirmPayment({
//     elements,
//     confirmParams: {
//       // payment completion page
//       return_url: `${DOMAIN_URL}/checkout`,
//     },
//   });

//   // This point will only be reached if there is an immediate error when
//   // confirming the payment. Otherwise, your customer will be redirected to
//   // your `return_url`. For some payment methods like iDEAL, your customer will
//   // be redirected to an intermediate site first to authorize the payment, then
//   // redirected to the `return_url`.
//   if (error.type === "card_error" || error.type === "validation_error") {
//     showMessage(error.message);
//   } else {
//     showMessage("An unexpected error occurred.");
//   }

//   setLoading(false);
// }

// async function paymentStatus() {
//   const { paymentIntent } = await stripe.retrievePaymentIntent(statusClientSecret);
//   switch (paymentIntent.status) {
//     case "succeeded":
//       onPaymentSuccess(paymentIntent);
//       break;
//     case "processing":
//       showMessage("Your payment is processing.");
//       break;
//     case "requires_payment_method":
//       showMessage("Your payment was not successful, please try again.");
//       break;
//     default:
//       showMessage("Something went wrong.");
//       break;
//   }
// }

// // ------- UI helpers -------

// function onPaymentSuccess(paymentIntent) {
//   //todo... save transaction data to database
//   // paymentIntent.id...

//   const messageContainer = document.querySelector("#success");
//   document.getElementById('customer-email').textContent = localStorage.getItem('customerEmail');
//   document.getElementById('customer-name').textContent = paymentIntent.shipping.name;
//   document.getElementById('line1').textContent = paymentIntent.shipping.address.line1;
//   document.getElementById('line2').textContent = paymentIntent.shipping.address.line2;
//   document.getElementById('city').textContent = paymentIntent.shipping.address.city;
//   document.getElementById('state').textContent = paymentIntent.shipping.address.state;
//   document.getElementById('postal_code').textContent = paymentIntent.shipping.address.postal_code;
//   messageContainer.classList.remove("hidden");
// }

// function showMessage(messageText) {
//   const messageContainer = document.querySelector("#payment-message");

//   messageContainer.classList.remove("hidden");
//   messageContainer.textContent = messageText;

//   setTimeout(function () {
//     messageContainer.classList.add("hidden");
//     messageContainer.textContent = "";
//   }, 4000);
// }

// // Show a spinner on payment submission
// let submitButton = document.querySelector("#submit");
// function setLoading(isLoading) {
//   if (isLoading) {
//     // Disable the button and show a spinner
//     submitButton.disabled = true;
//     toggleClass(submitButton, 'button--loading');
//   } else {
//     submitButton.disabled = false;
//     toggleClass(submitButton, 'button--loading');
//   }
// }