// We use the environment variable set at server start time
// require('dotenv').config();

const stripe = require('stripe')(
  process.env.STRIPE_SECRET_KEY, // Use environment variable instead of hardcoding
  {
    apiVersion: '2023-08-16', // Specify the API version to allow zero-amount orders
    stripeAccount: null, // No connected account
    maxNetworkRetries: 2, // Retry network requests up to 2 times
    timeout: 80000, // 80 seconds
    host: 'api.stripe.com', // Explicitly use the live API endpoint
  }
);

// Create a checkout session
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [
    {
      price: priceId,
      quantity: 1,
    },
  ],
  mode: 'payment',
  success_url: `${event.headers.origin}/success.html`,
  cancel_url: `${event.headers.origin}/cancel.html`,
  // Add shipping address collection
  shipping_address_collection: {
    allowed_countries: [
      'DE',
      'AT',
      'CH',
      'FR',
      'IT',
      'BE',
      'NL',
      'LU',
      'ES',
      'US',
      'GB',
    ], // Add countries you want to support
  },
  // Collect billing address
  billing_address_collection: 'required',
  // Collect additional information
  custom_fields: [
    {
      key: 'delivery_notes',
      label: {
        type: 'custom',
        custom: 'Delivery Instructions (Optional)',
      },
      type: 'text',
      optional: true,
    },
  ],
  // Enable promotion/discount codes
  allow_promotion_codes: true,
  // Remove these two lines that are causing the error
  // api_version: '2023-08-16',
  // stripe_account: null,
});
