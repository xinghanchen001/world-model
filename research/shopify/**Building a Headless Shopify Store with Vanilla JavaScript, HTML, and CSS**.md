


Headless commerce means using Shopify for backend (products, orders, checkout) while building a custom frontend separate from Shopify’s Liquid themes. This guide will walk you through setting up a headless Shopify store using only JavaScript, HTML, and CSS (no React or other frameworks). We’ll cover creating a Shopify store, using the Storefront API for data and checkout, building the frontend, deploying it (e.g., on Netlify), and additional tips for performance and security.

  

**1. Setting Up Shopify**

  

To start, you need a Shopify store and enable headless (Storefront API) access:

1. **Create a Shopify Store:** Sign up for Shopify and create a new store. If you’re a developer, you can use the Shopify Partners dashboard to create a free development store for testing . This gives you a sandbox store to experiment without time limits or affecting a live shop.

2. **Enable Headless Storefront API Access:** In your Shopify admin, enable the Storefront API (for headless commerce). The recommended way is to install Shopify’s **Headless** sales channel from the Shopify App Store. After installing, click **“Create storefront”** to generate Storefront API access tokens . (Alternatively, you can create a private app in **Settings > Apps and sales channels**. Enable the option **“Allow this app to access your storefront data using the Storefront API”** on the private app to generate an API token.) Ensure you grant the necessary API permissions (like read products, read collections, etc.) for your custom storefront in the channel settings.

3. **Get API Credentials:** After enabling the Storefront API, Shopify will provide an **access token** (often called the Storefront API access token) for your storefront. Copy this token – it will be used to authenticate API calls from your frontend . Also note your shop’s domain (e.g. your-store.myshopify.com), which forms part of the API endpoint. You do **not** need any secret key or OAuth for the Storefront API; the access token is sufficient for public storefront data requests.

4. **(Optional) Add Products:** Make sure your store has some products added and available to the Storefront API. By default, products should be accessible if they are active and not restricted by permissions. You can use Shopify’s GraphiQL app or the Shopify admin to double-check that your products are published to the “Headless” channel (or to your private app’s Storefront API access) so that the API can query them.

  

**2. Integrating the Shopify Storefront API with JavaScript**

  

With your store and Storefront API enabled, you can use JavaScript (in the browser or Node) to fetch data from Shopify and process checkouts. We’ll use the Storefront API’s GraphQL endpoint for flexibility. No framework is needed – a simple fetch call can query the API.

  

**Fetching Product Data via the Storefront API**

  

Shopify’s Storefront API is GraphQL-based. The endpoint URL is your Shopify domain plus the API path and version, for example:

```
https://<your-shop>.myshopify.com/api/2023-04/graphql.json
```

(where 2023-04 is an API version) .

  

To fetch products, you’ll send an HTTP POST request to this endpoint with your query and include the Storefront access token in the headers for authentication. Specifically, set the header X-Shopify-Storefront-Access-Token to your access token, and use Content-Type: application/graphql (if sending the query as a raw GraphQL string) or application/json (if sending a JSON payload) . For example, in JavaScript:

```
const storefrontAccessToken = 'YOUR_STOREFRONT_TOKEN';
const shopDomain = 'YOUR_SHOP_DOMAIN.myshopify.com';
const apiUrl = `https://${shopDomain}/api/2023-04/graphql.json`;

// Define a GraphQL query to get products (e.g., first 10 products with basic fields)
const productsQuery = `
  {
    products(first: 10) {
      edges {
        node {
          id
          title
          description
          images(first: 1) {
            edges { node { src } }
          }
          variants(first: 1) {
            edges { node { price { amount currencyCode } } }
          }
        }
      }
    }
  }
`;

// Set up request options with headers and query
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/graphql',
    'X-Shopify-Storefront-Access-Token': storefrontAccessToken
  },
  body: productsQuery
};

// Fetch product data from Shopify Storefront API
fetch(apiUrl, options)
  .then(res => res.json())
  .then(data => {
    console.log('Shopify products data:', data);
    // TODO: handle the product data (e.g., save it or pass to a render function)
  })
  .catch(err => console.error('Error fetching products:', err));
```

In this code, we send a GraphQL query for the first 10 products. Shopify will return a JSON response containing the product data. The data object will contain a structure matching your query (in this case, an array of products with their id, title, description, image URL, and price). You can adjust the query to retrieve different fields or more products as needed. (Tip: You can test and refine your GraphQL queries using Shopify’s GraphiQL explorer app in your store admin, which provides an interactive IDE for Storefront API queries.)

  

**Displaying Product Details on Your Frontend**

  

Once you have the product data in JavaScript, you can dynamically display it on your custom HTML page. Typically, you will parse the JSON response to extract the products list. For example, with the above query, data.data.products.edges will be an array of product nodes. You can then manipulate the DOM to show this data:

```
function renderProducts(products) {
  const listEl = document.getElementById('product-list'); // a container div in our HTML
  listEl.innerHTML = '';  // clear any existing content
  products.forEach(edge => {
    const product = edge.node;
    // Create HTML elements for each product
    const productEl = document.createElement('div');
    productEl.className = 'product';

    // Basic product info
    const titleEl = document.createElement('h2');
    titleEl.textContent = product.title;
    const descEl = document.createElement('p');
    descEl.textContent = product.description;

    // Product image
    const imgEl = document.createElement('img');
    if (product.images.edges.length > 0) {
      imgEl.src = product.images.edges[0].node.src;
      imgEl.alt = product.title;
    }

    // Price (assuming first variant's price)
    let priceText = '';
    if (product.variants.edges.length > 0) {
      const priceInfo = product.variants.edges[0].node.price;
      priceText = `${priceInfo.currencyCode} $${priceInfo.amount}`;
    }
    const priceEl = document.createElement('p');
    priceEl.textContent = priceText;

    // Add-to-cart / Buy button
    const buttonEl = document.createElement('button');
    buttonEl.textContent = 'Add to Cart';
    buttonEl.onclick = () => addToCart(product);

    // Append elements to the product element
    productEl.appendChild(titleEl);
    productEl.appendChild(imgEl);
    productEl.appendChild(descEl);
    productEl.appendChild(priceEl);
    productEl.appendChild(buttonEl);

    // Append the product element to the list
    listEl.appendChild(productEl);
  });
}
```

In this snippet, renderProducts creates DOM elements for each product and appends them to a container (with id "product-list" in the HTML). It displays the product title, description, an image, and price, and includes a button to add the product to cart. You could call renderProducts(data.data.products.edges) inside the .then of your fetch request to show products as soon as the data is loaded. The styling of these elements can be handled via CSS (more on that in the next section).

  

**Handling Shopify’s Checkout Process with JavaScript**

  

One of the key parts of a headless store is handling the cart and checkout, since you’re not using Shopify’s built-in storefront pages. Shopify’s Storefront API allows you to create a checkout via GraphQL. The typical workflow is: **create a checkout with line items using the API, then redirect the user to Shopify’s checkout URL to complete payment.**

  

**Creating a Cart and Checkout via API:** You can maintain a cart in your frontend as a JavaScript array of items (product variant IDs and quantities). When the user is ready to buy, use the Storefront API checkoutCreate mutation to create a checkout. For example, a GraphQL mutation for checkout might look like:

```
mutation createCheckout($items: [CheckoutLineItemInput!]!) {
  checkoutCreate(input: { lineItems: $items }) {
    checkout {
      id
      webUrl
    }
    checkoutUserErrors {
      message
    }
  }
}
```

If successful, the response will include a checkout object with an id and a webUrl . The webUrl is the most important part – it’s the URL of the Shopify-hosted checkout page for the created cart. In your JavaScript, you can call this mutation by sending a POST fetch similar to the products query, but with the mutation string and variables for the items. For example:

```
function checkout() {
  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  // Build line items array for GraphQL from cartItems
  const lineItems = cartItems.map(item => {
    return `{ variantId: "${item.variantId}", quantity: ${item.quantity} }`;
  }).join(", ");
  
  const checkoutMutation = `mutation {
    checkoutCreate(input: { lineItems: [${lineItems}] }) {
      checkout { webUrl id }
      checkoutUserErrors { message }
    }
  }`;
  
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken
    },
    body: checkoutMutation
  })
    .then(res => res.json())
    .then(data => {
      const errors = data.data.checkoutCreate.checkoutUserErrors;
      if (errors && errors.length) {
        console.error("Checkout error:", errors);
        alert("Error creating checkout: " + errors[0].message);
      } else {
        const checkoutUrl = data.data.checkoutCreate.checkout.webUrl;
        // Redirect user to the Shopify checkout
        window.location.href = checkoutUrl;
      }
    })
    .catch(err => console.error('Checkout request failed:', err));
}
```

In the above code, when checkout() is called, it sends the checkoutCreate mutation with all items in the cartItems array. Shopify responds with the checkout web URL. We then redirect the browser to that URL, taking the user to Shopify’s secure checkout page to enter payment and shipping details. **This approach leverages Shopify’s trusted checkout** (with all its payment options and security) even though your storefront is custom. Keep in mind that the checkout will be on a Shopify domain (or yourshop.com domain) and not on your headless site’s domain – this is normal for Shopify headless setups .

  

**Handling the “Add to Cart” button:** We referenced an addToCart(product) function in the rendering code. You can implement this to add the selected product (or its variant) to a cart array. For simplicity, you might assume one variant per product (or always the default variant). For example:

```
let cartItems = [];

function addToCart(product) {
  // Use the first variant's ID as the item to add
  const variantId = product.variants.edges[0].node.id;
  // Check if item already in cart
  const existing = cartItems.find(item => item.variantId === variantId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cartItems.push({ variantId: variantId, quantity: 1 });
  }
  console.log(`Added to cart: ${product.title}`);
  console.log(cartItems);
  alert(`${product.title} added to cart!`);
}
```

This function finds the product’s variant ID and either increments quantity if it’s already in the cart or adds a new entry. In a real app, you’d also update a cart UI (like showing the number of items). For now, it just logs and alerts. You would also have a “View Cart / Checkout” button on your page that triggers the checkout() function defined earlier.

  

**Summary:** In this section, we fetched product data from Shopify using JavaScript and set up a method to create a Shopify checkout via the Storefront API. We are using Shopify’s backend for secure checkout while controlling the entire shopping UI on the frontend.

  

**3. Building the Frontend with JavaScript, HTML, and CSS**

  

Now that the data-fetching logic is in place, you need to build the user interface of your storefront with HTML, JS, and CSS. This involves structuring your files, creating the HTML markup for product listings and cart actions, applying styles, and wiring up the JavaScript functions to UI events.

  

**Project Structure**

  

Since this is a purely static front-end, you can keep things simple. A typical structure might be:

• **index.html** – The main HTML file containing the layout and placeholders for content.

• **styles.css** – Your CSS file for styling the site.

• **app.js** – Your JavaScript file containing code to call the Shopify API and manipulate the DOM.

  

You might also have additional HTML pages (for example, a product detail page) or additional JS modules, but for a basic setup one page is enough.

  

**HTML Setup:** In the index.html, include a container where products will be rendered and any static elements like header or footer. Also include references to the CSS and JS. For example:

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Headless Shopify Store</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header>
    <h1>My Shop</h1>
    <button id="checkout-button" onclick="checkout()">Go to Checkout</button>
  </header>
  
  <main>
    <div id="product-list"><!-- Products will be injected here --></div>
  </main>
  
  <footer>
    <p>&copy; 2025 My Shop</p>
  </footer>
  
  <script src="app.js"></script>
</body>
</html>
```

In this HTML:

• We have a <div id="product-list"></div> which our renderProducts JS function will fill with product items.

• A “Go to Checkout” button calls the checkout() function (to redirect users when they’re ready).

• We include the CSS (styles.css) in the head, and our JS (app.js) at the end of the body. (Including JS at the bottom ensures the DOM is loaded before the script runs, or you could use defer attribute.)

  

**CSS Styling:** In styles.css, you can add styles for the classes and elements used:

```
body {
  font-family: sans-serif;
  margin: 0; padding: 0;
}
header, footer {
  background: #333; color: #fff; padding: 1em; text-align: center;
}
h1 { margin: 0; }
#product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  padding: 1em;
}
.product {
  border: 1px solid #ccc;
  padding: 1em;
  width: 200px;
}
.product img {
  max-width: 100%;
  height: auto;
}
.product h2 {
  font-size: 1.2em;
  margin: 0.5em 0;
}
.product p {
  font-size: 0.9em;
}
.product button {
  background: #007b5e; color: #fff;
  border: none; padding: 0.5em 1em;
  cursor: pointer;
}
.product button:hover {
  background: #005a43;
}
```

This CSS gives a simple grid layout to the product list, styles the product card, and gives a basic style to the button. You can customize this to match your brand’s look and feel. The key is that you have full control over HTML/CSS in a headless setup, so you can make the design as custom as you want.

  

**Dynamic Content and User Interactions**

  

With the HTML structure in place and styles loaded, the remaining step is to connect the JavaScript logic to the UI:

• On page load, you should fetch the products from Shopify and then call renderProducts to populate the page. You can do this by adding a script at the end of index.html or within app.js that calls the fetch as soon as the script runs.

For example, at the bottom of app.js:

```
// Immediately fetch and display products on load
fetch(apiUrl, options)
  .then(res => res.json())
  .then(data => {
    const products = data.data.products.edges;
    renderProducts(products);
  });
```

This will automatically display products when the page is opened.

  

• The “Add to Cart” buttons we created in renderProducts call the addToCart function for each product. This function (defined in the previous section) updates the cartItems array. You might also update a cart icon or count in the UI to reflect items added (for brevity, we just used an alert).

• The “Go to Checkout” button at the top calls the checkout() function when clicked. This function creates a Shopify checkout and redirects the user. In practice, you could make this button show a mini cart or confirm the items before redirecting. But in our simple flow, it directly initiates checkout with whatever is in the cartItems.

• **Product Selection:** If you want a separate product detail page when a product is clicked, you can implement it by capturing a click on the product element and then either navigating to a new HTML page (and maybe passing an ID in the URL hash) or opening a modal. On that detail view, you would use another Storefront API query (e.g., query a single product by handle or ID) to get more details (additional images, variant options, etc.). This is an extension you can consider, but it’s not strictly necessary for a basic headless setup. Many headless implementations simply have product listings and a quick add-to-cart or buy flow to keep things fast.

• **Client-side Routing:** Because this is a single-page application (SPA) style approach with only HTML/JS, if you want multiple “pages” (like homepage, product page, cart page), you might use JavaScript to swap views or a simple client-side router. However, since the question scope is a basic setup without frameworks, managing multiple pages can be done with multiple HTML files or a bit of JS logic to show/hide sections. To keep things straightforward, our example just has one page.

  

Everything in the frontend (UI and interactions) is done with plain JavaScript, HTML, and CSS, which means no React or Vue is needed. This simplicity can lead to very fast loading times and easier hosting.

  

**4. Hosting and Deployment**

  

Once your headless storefront is built, you need to host it somewhere since Shopify will not serve this custom frontend for you (Shopify only hosts Liquid theme stores or Hydrogen apps on Oxygen). In a headless setup, **your frontend must be hosted separately from the Shopify backend** .

  

**Deploying on Netlify:** Netlify is a great option for hosting static websites (HTML/CSS/JS). It provides continuous deployment from Git and a global CDN for free. To deploy your site on Netlify:

• Commit your project (the HTML, CSS, JS files and any assets) to a Git repository (GitHub, GitLab, etc.). Ensure the index.html is at the root or specify the correct build directory.

• Go to Netlify and create an account (if you haven’t). Choose **“Add New Site”** and **“Import an existing project”** from Git. Connect your Git repository and branch. Netlify will detect it’s a static site (no build command needed if you have just static files) and will publish it. Netlify looks for an index.html as the entry point , so make sure your main file is named correctly.

• Alternatively, you can use the **Netlify CLI** or the drag-and-drop **Netlify Drop** UI: you can literally drag your project folder or a zip of it onto Netlify’s interface and it will upload and host it. In seconds, you’ll get a live URL for your site .

• Once deployed, Netlify provides a default subdomain (like your-site.netlify.app). You can set up a custom domain if you own one, via Netlify’s domain settings.

  

Netlify will serve your files over HTTPS, which is important for security (and required to call Shopify’s APIs from the browser, since Shopify API endpoints require secure context).

  

**Alternative Hosting Options:** There are many other places to host a static front-end:

• **Vercel:** Similar to Netlify, great for JAMStack apps (commonly used for Next.js, but also works for any static site).

• **GitHub Pages:** You can host the site from a GitHub repository (for example, from the gh-pages branch or docs/ folder).

• **Cloudflare Pages, AWS S3 + CloudFront, Firebase Hosting, Heroku, DigitalOcean, etc.:** All can serve static sites. If your site is pure static (client-side rendering), you just need a CDN or static hosting service . If you had server-side rendering, you’d need a Node.js server, but in our case we do all data fetching client-side.

• **Shopify’s Hosting?:** Shopify does _not_ host your custom HTML/JS site. The only way Shopify would serve content is via the Online Store (Liquid) or Hydrogen + Oxygen (Shopify’s own headless solution which uses React). Since we’re not using those, you will host externally. (If you wanted, you could embed your headless app in a single blank Liquid template, but that isn’t common or necessary.) So plan to use one of the external hosting options for your headless storefront.

  

In summary, deploy your static files to a hosting service of your choice. Netlify is often used for its ease of setup and CI/CD integration. Other popular platforms for headless Shopify frontends include Vercel, AWS, DigitalOcean, Cloudflare Pages, and more . The key is that your front-end is decoupled from Shopify, so you have the freedom to host it anywhere that can serve static content.

  

**5. Additional Considerations**

  

Finally, here are some additional tips and considerations to ensure your headless store runs smoothly, performs well, and provides a good user experience:

• **Performance Optimization:** Headless stores can be extremely fast if optimized. Keep your JavaScript and CSS lean, and minimize network requests. Since you control the data fetching, you can optimize what you request from Shopify (e.g., only ask for fields you need, use GraphQL queries efficiently). Use Shopify’s CDN for images – the URLs you get for images can be adjusted to deliver appropriately sized images. Also consider caching responses (you could cache product data in memory or localStorage to avoid repeated fetches). Minify your CSS/JS and compress images for faster loads. A clutter-free, optimized site greatly improves load times. _Example:_ Optimize images and minify code to achieve fast loading times – speed is critical in e-commerce .

• **Shopify Checkout Limitations:** With a headless approach, you’re still using Shopify’s checkout. This means some limitations remain:

• The checkout will happen on Shopify’s domain (or a domain controlled by Shopify) and you can’t fully customize its UI. For non-Shopify Plus stores, the checkout is essentially a black box—you can style the logo and color scheme in Shopify settings, but cannot change the layout or functionality. (Shopify Plus allows some checkout customization, but even then checkout is separate from your frontend app.) **In short, you cannot host or script your own payment pages** – you must redirect to Shopify’s checkout for the actual transaction .

• Certain Shopify features like discount codes or gift cards can be applied via the Storefront API (there are mutations to apply discount codes to a checkout), but if you don’t implement those on the headless side, customers can still apply them on the Shopify checkout page manually. Be aware of such features – you might need to use additional API calls if you want to replicate them in your UI.

• Customer accounts/login: If your store uses Shopify’s customer accounts, implementing a login on a headless frontend requires using the Storefront API customer token (via customerAccessTokenCreate mutation). This is an advanced topic, but just note that things like login or order history would need additional API usage. If you don’t need accounts, you can rely on Shopify’s checkout to collect customer email for order tracking.

• **Security and User Experience:** Even though your frontend is separate, you should uphold best practices for security:

• **API Credentials:** Treat your Storefront API token carefully. While it’s safe to expose to the client (it only has limited permissions), do not expose any private admin API keys or secrets on the front-end. Ideally, store the token in an environment variable if using a build tool, or at least keep it outside your version control. Never commit admin API keys. _Best practice:_ store API keys and tokens securely and avoid hard-coding them in public code .

• **HTTPS:** Always serve your headless site over HTTPS, especially since it will be calling Shopify’s API (which requires secure requests) and redirecting to checkout. Hosting providers like Netlify or Vercel provide SSL by default on their domains.

• **Smooth UX:** Make sure to provide feedback during interactions. For example, when the user clicks “Add to Cart,” show a message or update a cart count so they know it worked. If the product data takes a moment to load, you might show a loading spinner. Also, consider error handling – if a product fetch fails, inform the user or retry. A polished UX goes a long way to make the headless store feel as reliable as a native Shopify theme.

• **Mobile Responsiveness:** Ensure your HTML/CSS layout is responsive. Many shoppers will be on mobile devices. Test your site on different screen sizes and use CSS media queries or flexbox/grid to make it mobile-friendly (e.g., in our CSS, the product grid will wrap on smaller screens).

• **SEO Considerations:** One drawback of purely client-side rendered stores is that SEO can suffer if search engines can’t see the content (as it loads via JS). To mitigate this, you might pre-render content or use a static site generator to output some content. However, Shopify’s Storefront API doesn’t easily allow pre-generating all pages without custom code. If SEO is critical, consider using a static generation approach or a server-side rendered approach. For a small catalog, you could also generate a static HTML page for each product using a script that pulls data from Shopify and writes files. This is an advanced optimization if needed.

  

By following the above steps and tips, you should have a basic but functional headless Shopify storefront. You’ll be able to showcase products with a custom design, allow users to add products to a cart, and redirect them to Shopify’s secure checkout. You also have full control to extend this setup – you could integrate a CMS for content, use frameworks like Svelte or Alpine.js for richer interactivity (still no need for React if you prefer not), or scale up the complexity as needed. The headless approach gives you freedom in front-end technology while still leveraging Shopify’s robust e-commerce backend.

  

**Sources:**

• Shopify Dev Docs – _Getting started with the Storefront API (Headless)_

• F22 Labs – _Headless Shopify private app setup_

• _Toomanytabs_ Blog – Shopify Storefront API with fetch example

• F22 Labs – _Storefront API checkoutCreate example_

• Haydon Power Agency – _Headless Shopify Checkout Limitations_

• Cocoon Agency – _Hosting a Headless Shopify frontend separately_

• Alphasec (Blog) – _Deploying a Static Site to Netlify_

• F22 Labs – _Design and Performance Tips for Headless Shopify_

• Endgrate – _API Keys Security Tip_