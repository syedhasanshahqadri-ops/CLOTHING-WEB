// Paste your Firebase web app config here (Firebase console > Project settings > Your apps).
// Until it is filled in, the site runs in demo mode and saves orders on this device only.
export const firebaseConfig = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_PROJECT_ID.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};
export const COD_FEE = 200;
export const ACCOUNTS = {
  easypaisa: { name: "EasyPaisa", number: "0332 3556402", qr: "images/qr/easypaisa.svg", official: "images/qr/easypaisa-official.png" },
  jazzcash: { name: "JazzCash", number: "0315 9260391", qr: "images/qr/jazzcash.svg", official: "images/qr/jazzcash-official.png" }
};
