# HASAN’s COLLECTION

A responsive, 3D and animated clothing brand website for kameez shalwar, with summer and winter collections, a cart page and WhatsApp ordering. Built with plain HTML, CSS and JavaScript. No frameworks or build tools needed.

## Features

- Summer collection: 50 lawn suits in 50 different colors
- Winter collection: 50 wool-blend suits in 50 different colors
- Every suit is Rs 3,000, with **Add to cart** and **Buy now** buttons
- Separate cart page with quantity controls, remove, clear cart and a total
- **Order on WhatsApp** button that sends the whole cart as a message
- Floating WhatsApp contact button on every page
- Dark and light theme that follows the device setting and remembers the visitor's choice
- Color search on both collection pages
- 3D rotating ring of suits on the home page, tilting product cards, snow on the winter page and a rotating sun on the summer page
- Add to cart animation: the suit flies into the cart button
- Cart saved in the browser, so it stays after a page reload
- Fully responsive layout and reduced-motion support

## Project structure

```
hasans-collection/
├── index.html
├── summer.html
├── winter.html
├── cart.html
├── style.css
├── script.js
├── PHOTO-LIST.txt
└── images/
    ├── summer/   (s1.jpg to s50.jpg)
    └── winter/   (w1.jpg to w50.jpg)
```

## Run locally

1. Unzip the project.
2. Open `index.html` in any browser.

## Add real photos

Every suit has a photo slot. If a photo is missing, the site shows a drawn suit in that color instead.

1. Open `PHOTO-LIST.txt` to see the file name for each suit, for example `s1.jpg` is Mint Cream and `w1.jpg` is Midnight Navy.
2. Save your summer photos in `images/summer/` and your winter photos in

## Checkout, payments and staff orders

**Customer checkout (`checkout.html`)**
- Asks for full name, phone, email, city, full address, postal code and order notes.
- Payment methods: **EasyPaisa** (QR code, number, copy button, transaction ID, optional screenshot), **JazzCash** (same flow) and **Cash on delivery** (adds Rs 200 to the total).
- After the order is placed, the cart is cleared and the customer sees an order number.
- To use your official QR image instead of the generated one, save it as `images/qr/easypaisa-official.png` and `images/qr/jazzcash-official.png`. The site picks it up automatically.

**Staff orders page**
- The staff page is a separate website (see the staff zip). It reads the orders that this website saves in Firebase.
- Both websites must use the same Firebase config.
- Change the COD fee or the payment numbers in `firebase-config.js`.

### Connect Firebase (free)
1. Go to console.firebase.google.com and create a project.
2. Build > Firestore Database > Create database.
3. Open the **Rules** tab, paste the contents of `firestore.rules` and click Publish.
4. Project settings > Your apps > add a Web app, then copy the `firebaseConfig` values.
5. Paste them into `firebase-config.js` and upload the project to GitHub. Use the same values in the staff website.

Until step 5 is done, the site runs in demo mode: orders are saved only in the browser that placed them.
