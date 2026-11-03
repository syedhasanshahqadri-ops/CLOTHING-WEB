import { COD_FEE, ACCOUNTS } from "./firebase-config.js";
import { addOrder, isDemo } from "./db.js";
const box = $("#co");
const items = () => cart.map(c => ({ ...c, p: byId(c.id) })).filter(c => c.p);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
let method = "easypaisa", shot = "";

function empty() {
  box.innerHTML = `<div class="empty"><h2>Your cart is empty</h2><p>Add a suit before you check out.</p><a class="btn" href="summer.html">Shop summer</a><a class="btn line" href="winter.html">Shop winter</a></div>`;
}
const fee = () => method === "cod" ? COD_FEE : 0;
const sub = () => items().reduce((a, c) => a + c.q * PRICE, 0);

function payPanel() {
  if (method === "cod") return `<div class="pp"><p><b>Pay the courier when your order arrives.</b> A cash on delivery fee of ${fmt(COD_FEE)} is added to your total.</p></div>`;
  const a = ACCOUNTS[method], amt = fmt(sub());
  return `<div class="pp"><div class="qrw"><div class="qrb"><img id="qr" src="${a.official}" alt="${a.name} QR code" width="190" height="190"></div>
<div><h3>Pay ${amt} with ${a.name}</h3><ol><li>Open the ${a.name} app and scan this QR code, or choose Send Money.</li><li>Send exactly <b>${amt}</b> to <b>${a.number}</b>.</li><li>Enter the transaction ID below so we can confirm your payment.</li></ol>
<button class="btn line" type="button" id="cp" data-n="${a.number.replace(/\s/g, "")}">Copy number ${a.number}</button></div></div>
<div class="f"><label for="tx">Transaction ID *</label><input id="tx" name="txn" required minlength="6" autocomplete="off" placeholder="Shown in your payment confirmation message"></div>
<div class="f"><label for="sh">Payment screenshot (optional)</label><input id="sh" type="file" accept="image/*"><small id="shn"></small></div></div>`;
}
function summary() {
  const s = sub();
  return `<aside class="sum"><h3>Order summary</h3>${items().map(c => `<div><span>${esc(c.p.color)} × ${c.q}</span><span>${fmt(c.q * PRICE)}</span></div>`).join("")}
<div><span>Subtotal</span><span>${fmt(s)}</span></div><div><span>${method === "cod" ? "Cash on delivery fee" : "Delivery"}</span><span>${method === "cod" ? fmt(COD_FEE) : "Free"}</span></div>
<div class="tot"><span>Total</span><span>${fmt(s + fee())}</span></div>
<button class="btn" type="submit" id="go">Place order</button><p class="er" id="er" role="alert" hidden></p>${isDemo ? `<p class="dm">Demo mode: Firebase is not connected, so this order is saved on this device only.</p>` : ""}
<a class="btn line" href="summer.html">Continue shopping</a><a class="bk" href="cart.html">Back to cart</a></aside>`;
}
function render() {
  if (!items().length) return empty();
  const keep = Object.fromEntries([...(box.querySelectorAll("input[name],textarea")||[])].map(e => [e.name, e.value]));
  box.innerHTML = `<form class="cl co" id="fm" novalidate><div>
<fieldset><legend>Your details</legend><div class="g2">
<div class="f"><label for="nm">Full name *</label><input id="nm" name="name" required autocomplete="name"></div>
<div class="f"><label for="ph">Phone / WhatsApp *</label><input id="ph" name="phone" required type="tel" inputmode="tel" autocomplete="tel" placeholder="03XX XXXXXXX"></div>
<div class="f"><label for="em">Email *</label><input id="em" name="email" required type="email" autocomplete="email"></div>
<div class="f"><label for="ct">City *</label><input id="ct" name="city" required autocomplete="address-level2"></div>
<div class="f wide"><label for="ad">Full delivery address *</label><textarea id="ad" name="address" required rows="3" autocomplete="street-address" placeholder="House no, street, area"></textarea></div>
<div class="f"><label for="pc">Postal code</label><input id="pc" name="postal" autocomplete="postal-code" inputmode="numeric"></div>
<div class="f"><label for="nt">Order notes (size, delivery time)</label><input id="nt" name="notes"></div></div></fieldset>
<fieldset><legend>Payment method</legend><div class="pm">
${[["easypaisa", "EasyPaisa", "Scan a QR code or send money"], ["jazzcash", "JazzCash", "Scan a QR code or send money"], ["cod", "Cash on delivery", `Pay on arrival, ${fmt(COD_FEE)} extra`]].map(([v, t, d]) => `<label class="pr2${method === v ? " on" : ""}"><input type="radio" name="pay" value="${v}"${method === v ? " checked" : ""}><b>${t}</b><small>${d}</small></label>`).join("")}</div>
${payPanel()}</fieldset></div>${summary()}</form>`;
  Object.entries(keep).forEach(([k, v]) => { const e = box.querySelector(`[name="${k}"]`); if (e && e.type !== "radio" && e.type !== "file") e.value = v; });
  const q = $("#qr");
  if (q) q.onerror = () => { q.onerror = null; q.src = ACCOUNTS[method].qr; };
}
box.addEventListener("change", async e => {
  if (e.target.name === "pay") { method = e.target.value; shot = ""; render(); }
  if (e.target.id === "sh" && e.target.files[0]) {
    try { shot = await compress(e.target.files[0]); $("#shn").textContent = "Screenshot attached"; } catch (x) { shot = ""; $("#shn").textContent = "Could not read this image. Try another one."; }
  }
});
box.addEventListener("click", e => {
  const c = e.target.closest("#cp");
  if (c) { (navigator.clipboard ? navigator.clipboard.writeText(c.dataset.n) : Promise.reject()).then(() => toast("Number copied"), () => toast(c.dataset.n)); }
});
function compress(file) {
  return new Promise((res, rej) => {
    const im = new Image(), u = URL.createObjectURL(file);
    im.onload = () => { const r = Math.min(1, 800 / im.width), c = document.createElement("canvas"); c.width = im.width * r; c.height = im.height * r; c.getContext("2d").drawImage(im, 0, 0, c.width, c.height); URL.revokeObjectURL(u); res(c.toDataURL("image/jpeg", .6)); };
    im.onerror = rej; im.src = u;
  });
}
box.addEventListener("submit", async e => {
  e.preventDefault();
  const f = e.target, v = n => (f.elements[n] ? f.elements[n].value.trim() : ""), er = $("#er");
  const bad = msg => { er.textContent = msg; er.hidden = false; };
  const must = [["name", "your name"], ["phone", "your phone number"], ["email", "your email"], ["city", "your city"], ["address", "your delivery address"]];
  for (const [n, l] of must) if (!v(n)) { f.elements[n].focus(); return bad("Please enter " + l + "."); }
  if (!/^\+?[0-9\s-]{10,15}$/.test(v("phone"))) { f.elements.phone.focus(); return bad("Enter a valid phone number, like 0300 1234567."); }
  if (!/^\S+@\S+\.\S+$/.test(v("email"))) { f.elements.email.focus(); return bad("Enter a valid email address."); }
  if (method !== "cod" && v("txn").length < 6) { f.elements.txn.focus(); return bad("Enter the transaction ID from your " + ACCOUNTS[method].name + " payment."); }
  const s = sub(), no = "HC-" + new Date().toISOString().slice(2, 10).replace(/-/g, "") + "-" + Math.floor(1000 + Math.random() * 9000);
  const order = {
    orderNo: no, status: "New",
    customer: { name: v("name"), phone: v("phone"), email: v("email"), address: v("address"), city: v("city"), postal: v("postal"), notes: v("notes") },
    items: items().map(c => ({ id: c.id, name: c.p.name, color: c.p.color, season: c.p.season, qty: c.q, price: PRICE })),
    subtotal: s, codFee: fee(), total: s + fee(),
    payment: { method: method === "cod" ? "Cash on delivery" : ACCOUNTS[method].name, txnId: method === "cod" ? "" : v("txn"), screenshot: method === "cod" ? "" : shot, paid: false }
  };
  const b = $("#go"); b.disabled = true; b.textContent = "Placing order…"; er.hidden = true;
  try { await addOrder(order); } catch (x) { b.disabled = false; b.textContent = "Place order"; return bad("We could not send your order. Check your internet and try again."); }
  cart = []; save();
  box.innerHTML = `<div class="empty ok"><h2>Thank you, ${esc(order.customer.name.split(" ")[0])}</h2><p>Your order <b>${no}</b> is placed. Total: <b>${fmt(order.total)}</b> (${order.payment.method}).<br>We will contact you on ${esc(order.customer.phone)} to confirm delivery.</p><a class="btn" href="index.html">Back to home</a><a class="btn line" href="summer.html">Keep shopping</a></div>`;
  scrollTo({ top: 0, behavior: "smooth" });
});
render();
