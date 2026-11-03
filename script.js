const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const PH='923009260391',PRICE=3000,PAGE=document.body.dataset.page;
const fmt=n=>'Rs '+n.toLocaleString('en-US');
const mix=(h,t,p)=>{const n=parseInt(h.slice(1),16);return 'rgb('+[n>>16,n>>8&255,n&255].map(v=>Math.round(v+(t-v)*p))+')'};

/* ---------- Products: 50 summer + 50 winter, one color each ---------- */
const SC='Mint Cream:BFE8D2,Sky Breeze:8EC9EE,Lemon Zest:F3E36A,Coral Reef:F4806B,Peach Fizz:F7B58F,Lilac Mist:C9B5E8,Aqua Wave:5CCFCB,Rose Petal:F2A5BC,Sand Dune:E3CFA3,Pistachio:AEDB8A,Ivory Silk:F2EDDC,Marigold:F5B731,Turquoise:2FB8B0,Blush Pink:F8C9D4,Cloud White:F4F6F8,Powder Blue:B9D6F2,Apricot:F8A95A,Sage Leaf:A6BFA0,Lavender:B8A2DF,Papaya:FF9A6B,Seafoam:7FD8BE,Buttercup:FADA5E,Watermelon:F25C7A,Ice Blue:A6E1F0,Fresh Lime:C5E34E,Cotton Candy:F5A9D9,Honeydew:D7F0C2,Tangerine:FF8C2B,Periwinkle:8C9DEB,Champagne:EAD9B8,Cantaloupe:FFB36B,Jade:3DBE8C,Orchid:D189D9,Flamingo:FF7F9F,Cerulean:3E9BE0,Daffodil:FFD93B,Opal Green:8FD6B2,Pearl Grey:D3D7DC,Guava:FF7F6A,Wisteria:A68FD8,Kiwi:8FCB4F,Salmon:FA8E7F,Lagoon:2AA7C9,Vanilla:F6EBC8,Raspberry Fizz:E8507E,Mango Sunset:FFA533,Cyan Pop:3FD0E8,Fern Mist:6FB98F,Rosewater:E8B6B0,Citrus Yellow:F0D12E';
const WC='Midnight Navy:14213D,Charcoal:2E3238,Forest Pine:1F4D3A,Burgundy:6D1A2B,Espresso:3B2A22,Deep Plum:4A1F4F,Slate Blue:3C4F76,Olive Drab:55622F,Maroon:5C1414,Teal Depth:0F5A63,Mocha:6B4A3A,Ash Grey:6E737B,Mustard Wool:B58A1B,Bottle Green:0E4B3A,Wine Red:7A1F3D,Ink Black:15161A,Rust:A04A22,Steel Blue:4A6A8A,Camel:B5834A,Aubergine:3E1F3C,Moss:4C5B2E,Cobalt Night:1F3A8A,Cocoa:54382B,Storm Cloud:565D6A,Cranberry:8B1E3F,Evergreen:1B5E4A,Peacock:0C6E7C,Walnut:5A3E2B,Denim:35557F,Smoke:8A8F98,Brick:8E3A2B,Royal Purple:50307F,Hunter:2E5A3A,Coffee:4A3324,Iron Grey:3B4048,Garnet:7E1830,Sapphire:1D3F91,Bronze:8A5A2B,Petrol:1B4B5A,Mulberry:6B2C5A,Graphite:3A3D42,Khaki Wool:7D7A4A,Oxblood:5B1A22,Dark Teal:0A4D4A,Cinnamon:8B4A2A,Twilight:2B2F5B,Ivy:3A5A40,Pewter:7A8087,Deep Magenta:7A1F5C,Tobacco:6F4E2E';
const mk=(s,k)=>s.split(',').map((x,i)=>{const[n,h]=x.split(':');return{id:k[0]+(i+1),season:k,name:n+' Kameez Shalwar',color:n,hex:'#'+h,fabric:k==='summer'?'Lawn':'Wool blend'}});
const P=[...mk(SC,'summer'),...mk(WC,'winter')];
const byId=id=>P.find(p=>p.id===id);

/* ---------- Suit artwork (SVG, colored per product) ---------- */
const suit=(h,s)=>{const d=mix(h,0,.24),l=mix(h,255,.38),K='M88 36Q100 48 112 36L138 46L168 150L146 156L134 90L138 200H62L66 90L54 156L32 150L62 46Z',Sh='M54 176H101L92 288H62ZM99 176H146L138 288H108Z';
return `<svg viewBox="0 0 200 300" aria-hidden="true"><path d="${Sh}" fill="${d}"/><path d="${Sh}" fill="url(#sh)"/><rect x="62" y="280" width="30" height="8" fill="${l}"/><rect x="108" y="280" width="30" height="8" fill="${l}"/><path d="${K}" fill="${h}"/><path d="${K}" fill="url(#sh)"/><path d="${K}" fill="url(#${s==='summer'?'dt':'wv'})"/><rect x="62" y="192" width="76" height="8" fill="${l}"/><path d="M32 150L54 156M168 150L146 156" stroke="${l}" stroke-width="5"/><path d="M88 36Q100 52 112 36" fill="none" stroke="${l}" stroke-width="4"/><path d="M100 48V122" stroke="${d}" stroke-width="2.5"/><g fill="#E0B352"><circle cx="100" cy="64" r="2.8"/><circle cx="100" cy="82" r="2.8"/><circle cx="100" cy="100" r="2.8"/></g>${s==='winter'?`<path d="M60 44Q100 74 140 44L152 128Q100 98 48 128Z" fill="${mix(h,0,.4)}"/><path d="M60 44Q100 74 140 44L152 128Q100 98 48 128Z" fill="url(#wv)"/><path d="M52 118l-4 12M66 122l-3 12M82 126l-2 12M100 128v12M118 126l2 12M134 122l3 12M148 118l4 12" stroke="${mix(h,0,.4)}" stroke-width="2.5"/>`:''}</svg>`};


/* ---------- Real photos: images/summer/s1.jpg ... images/winter/w50.jpg (falls back to the drawing if a photo is missing) ---------- */
const EXT=['jpg','png','webp'];
const art=p=>`<img class="ph" src="images/${p.season}/${p.id}.jpg" data-e="0" alt="${p.name}, ${p.color}" loading="lazy" onerror="fb(this,'${p.id}')">`;
window.fb=(i,id)=>{const n=+i.dataset.e+1,p=byId(id);if(n<EXT.length){i.dataset.e=n;i.src=`images/${p.season}/${id}.${EXT[n]}`}else i.outerHTML=suit(p.hex,p.season)};

/* ---------- Layout: header, footer, WhatsApp button ---------- */
const NAV=[['index.html','Home','home'],['summer.html','Summer collection','summer'],['winter.html','Winter collection','winter'],['index.html#contact','Contact','']];
document.body.insertAdjacentHTML('afterbegin',`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="sh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".3"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient><pattern id="dt" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.4" fill="#fff" opacity=".35"/><circle cx="9" cy="9" r="1.4" fill="#fff" opacity=".35"/></pattern><pattern id="wv" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M0 7L7 0" stroke="#000" stroke-width="1" opacity=".16"/></pattern></defs></svg>
<header class="nav"><div class="wrap"><a class="logo" href="index.html">HASAN’s<span>COLLECTION</span></a>
<nav id="menu">${NAV.map(([u,n,k])=>`<a href="${u}"${k&&k===PAGE?' class="on"':''}>${n}</a>`).join('')}</nav>
<div class="nr"><button class="ib" id="theme" type="button"></button><a class="ib cart-btn" href="cart.html" aria-label="Open cart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M5 8h14l-1 12H6zM9 8a3 3 0 0 1 6 0"/></svg><b class="cc">0</b></a><button class="ib bgr" id="burger" type="button" aria-label="Open menu">≡</button></div></div></header>`);
document.body.insertAdjacentHTML('beforeend',`<footer><div class="wrap"><div class="fw"><div><span class="logo">HASAN’s COLLECTION</span><p>Kameez shalwar for summer and winter. Every suit is Rs 3,000.</p></div><div><b>Contact us</b><a href="tel:03009260391">0300 9260391</a><a href="mailto:syedhasanshahqadri@gmail.com">syedhasanshahqadri@gmail.com</a><a href="https://wa.me/${PH}" target="_blank" rel="noopener">Chat on WhatsApp</a></div></div><p class="cp">© 2026 HASAN’s COLLECTION. All rights reserved.</p></div></footer>
<a class="wa" href="https://wa.me/${PH}?text=${encodeURIComponent('Hello HASAN’s COLLECTION, I have a question.')}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><svg viewBox="0 0 32 32"><path fill="#fff" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.600-1.700A13 13 0 1 0 16 3zm0 2.400a10.600 10.600 0 1 1-5.500 19.700l-.4-.2-3.800 1 1-3.700-.3-.4A10.600 10.600 0 0 1 16 5.400z"/><path fill="#fff" d="M11.800 9.800c-.3 0-.8.100-1.200.600-.4.500-1.500 1.500-1.500 3.600s1.500 4.200 1.700 4.400c.2.300 3 4.700 7.300 6.400 3.600 1.400 4.300 1.100 5.100 1 .8-.1 2.500-1 2.800-2 .4-1 .4-1.800.3-2-.1-.2-.4-.3-.8-.5l-2.600-1.200c-.4-.1-.6-.2-.9.200l-1.100 1.400c-.2.300-.4.300-.8.100-.4-.2-1.600-.6-3-1.800-1.100-1-1.900-2.200-2.100-2.600-.2-.4 0-.6.200-.8l.6-.7c.2-.2.300-.4.400-.6.100-.3.100-.5 0-.7l-1.200-2.900c-.3-.7-.6-.7-.9-.7z"/></svg></a><div class="toast" id="toast" role="status"></div>`);

/* ---------- Theme ---------- */
const R=document.documentElement;
const isDark=()=>(R.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'))==='dark';
const paint=()=>{const d=isDark();$('#theme').textContent=d?'☀':'☾';$('#theme').setAttribute('aria-label',d?'Switch to light theme':'Switch to dark theme')};
try{const t=localStorage.getItem('hc-theme');if(t)R.dataset.theme=t}catch(e){}
paint();
$('#theme').onclick=()=>{const t=isDark()?'light':'dark';R.dataset.theme=t;try{localStorage.setItem('hc-theme',t)}catch(e){}paint()};
$('#burger').onclick=()=>$('#menu').classList.toggle('open');
$$('#menu a').forEach(a=>a.onclick=()=>$('#menu').classList.remove('open'));

/* ---------- Cart ---------- */
let cart=[];try{cart=JSON.parse(localStorage.getItem('hc-cart'))||[]}catch(e){}
const count=()=>{const n=cart.reduce((a,c)=>a+c.q,0);$$('.cc').forEach(e=>e.textContent=n)};
const save=()=>{try{localStorage.setItem('hc-cart',JSON.stringify(cart))}catch(e){}count()};
const add=id=>{const c=cart.find(x=>x.id===id);c?c.q++:cart.push({id,q:1});save()};
count();
const toast=t=>{const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),1800)};
const bump=()=>{const b=$('.cart-btn');b.classList.remove('bump');void b.offsetWidth;b.classList.add('bump')};
const fly=el=>{if(!el||matchMedia('(prefers-reduced-motion: reduce)').matches)return bump();const f=el.getBoundingClientRect(),t=$('.cart-btn').getBoundingClientRect(),g=document.createElement('div');g.className='fly';g.innerHTML=el.outerHTML;Object.assign(g.style,{left:f.left+'px',top:f.top+'px',width:f.width+'px',height:f.height+'px'});document.body.append(g);g.animate([{transform:'none',opacity:1},{transform:`translate(${t.left-f.left}px,${t.top-f.top}px) scale(.1) rotate(25deg)`,opacity:.3}],{duration:750,easing:'cubic-bezier(.5,0,.8,.4)'}).onfinish=()=>{g.remove();bump()}};
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-add]'),b=e.target.closest('[data-buy]');
  if(a){add(a.dataset.add);fly(a.closest('.card').querySelector('.im img,.im svg'));toast(byId(a.dataset.add).name+' added to cart')}
  if(b){add(b.dataset.buy);location.href='cart.html'}
});

/* ---------- 3D tilt ---------- */
const tilt=root=>$$('.tilt',root).forEach(el=>{
  el.onpointermove=e=>{if(e.pointerType!=='mouse')return;const r=el.getBoundingClientRect();el.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*14+'deg');el.style.setProperty('--rx',(.5-(e.clientY-r.top)/r.height)*12+'deg')};
  el.onpointerleave=()=>{el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')};
});

/* ---------- Cards ---------- */
const card=p=>`<article class="card tilt" style="--c:${p.hex}" data-n="${p.color.toLowerCase()}"><div class="im">${art(p)}</div><div class="tx"><h3>${p.name}</h3><p class="cn"><i></i>${p.color} · ${p.fabric}</p><div class="pr">${fmt(PRICE)}</div><div class="bt"><button class="btn line" type="button" data-add="${p.id}">Add to cart</button><button class="btn" type="button" data-buy="${p.id}">Buy now</button></div></div></article>`;

/* ---------- Pages ---------- */
if(PAGE==='home'){
  const ring=['s4','w1','s2','w4','s12','w3','s7','w7'];
  $('#ring').innerHTML=ring.map((id,i)=>{const p=byId(id);return `<div class="face" style="--i:${i};--c:${p.hex}">${art(p)}</div>`}).join('');
  $('#ts').insertAdjacentHTML('beforeend',art(byId('s1')));
  $('#tw').insertAdjacentHTML('beforeend',art(byId('w1')));
  $('#best').innerHTML=['s2','w1','s4','w4','s12','w3','s7','w7'].map(id=>card(byId(id))).join('');
  
}
if(PAGE==='summer'||PAGE==='winter'){
  const list=P.filter(p=>p.season===PAGE);
  $('#grid').innerHTML=list.map(card).join('');
  const q=$('#q'),n=$('#n');
  q.oninput=()=>{const v=q.value.trim().toLowerCase();let c=0;$$('#grid .card').forEach(el=>{const s=!v||el.dataset.n.includes(v);el.hidden=!s;if(s)c++});n.textContent=`Showing ${c} of ${list.length} suits`};
  if(PAGE==='winter'){$('#snow').innerHTML=Array.from({length:38},()=>`<i style="--x:${Math.random()*100};--s:${3+Math.random()*5}px;--d:${6+Math.random()*7}s;--dl:-${Math.random()*10}s;--dx:${Math.random()*60-30}px"></i>`).join('')}
}
if(PAGE==='cart'){
  const render=()=>{
    const box=$('#cartbox');
    if(!cart.length){box.innerHTML=`<div class="empty"><h2>Your cart is empty</h2><p>Add a suit from the summer or winter collection.</p><a class="btn" href="summer.html">Shop summer</a><a class="btn line" href="winter.html">Shop winter</a></div>`;return}
    const total=cart.reduce((a,c)=>a+c.q*PRICE,0);
    const msg=`Hello HASAN’s COLLECTION, I want to order:\n`+cart.map(c=>{const p=byId(c.id);return `- ${p.name} (${p.color}, ${p.season}) x${c.q} = ${fmt(c.q*PRICE)}`}).join('\n')+`\nTotal: ${fmt(total)}\nPlease confirm size and delivery.`;
    box.innerHTML=`<div class="cl"><div>${cart.map(c=>{const p=byId(c.id);return `<div class="crow"><div class="mi" style="--c:${p.hex}">${art(p)}</div><div><h3>${p.name}</h3><p>${p.color} · ${p.season==='summer'?'Summer':'Winter'} collection</p></div><div class="qty"><button type="button" data-q="${c.id}:-1" aria-label="Decrease quantity">−</button><span>${c.q}</span><button type="button" data-q="${c.id}:1" aria-label="Increase quantity">+</button></div><b>${fmt(c.q*PRICE)}</b><button class="rm" type="button" data-rm="${c.id}">Remove</button></div>`}).join('')}</div>
    <aside class="sum"><h3>Order summary</h3><div><span>Items</span><span>${cart.reduce((a,c)=>a+c.q,0)}</span></div><div><span>Delivery</span><span>Set at checkout</span></div><div class="tot"><span>Total</span><span>${fmt(total)}</span></div><a class="btn" href="checkout.html">Checkout</a><a class="btn line" href="summer.html">Continue shopping</a><a class="btn wab" target="_blank" rel="noopener" href="https://wa.me/${PH}?text=${encodeURIComponent(msg)}">Ask on WhatsApp instead</a><button class="btn line" type="button" id="clr">Clear cart</button></aside></div>`;
  };
  document.addEventListener('click',e=>{
    const q=e.target.closest('[data-q]'),r=e.target.closest('[data-rm]');
    if(q){const[id,d]=q.dataset.q.split(':'),c=cart.find(x=>x.id===id);c.q+=+d;if(c.q<1)cart=cart.filter(x=>x!==c);save();render()}
    if(r){cart=cart.filter(x=>x.id!==r.dataset.rm);save();render()}
    if(e.target.id==='clr'){cart=[];save();render()}
  });
  render();
}
tilt(document);
