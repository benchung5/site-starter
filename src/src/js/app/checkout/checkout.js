const env = process.env.NODE_ENV || "development";
var { STRIPE_PUBLISHABLE_KEY } = require('../secret')['globals'];
var { DOMAIN_URL } = require('../config')[env];

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const pathArray = window.location.pathname.split("/");
const currentPage = pathArray[1];


if (currentPage == 'checkout') {
  initCheckout();
} else if (currentPage == 'checkout_return') {
  initCheckoutReturn();
}

// Create a Checkout Session as soon as the page loads
async function initCheckout() {
  const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
  const response = await fetch("/api/checkout", {
    method: "POST",
  });

  const { clientSecret } = await response.json();

  const checkout = await stripe.initEmbeddedCheckout({
    clientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}

async function initCheckoutReturn() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sessionId = urlParams.get('session_id');
  const response = await fetch("/api/status", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ session_id: sessionId }),
  });
  const session = await response.json();

  if (session.status == 'open') {
    window.replace(`${DOMAIN_URL}/checkout`)
  } else if (session.status == 'complete') {
    document.getElementById('success').classList.remove('hidden');
    document.getElementById('customer-email').textContent = session.customer_email
  }
}