import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './App.css';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const products = [
  {
    id: "strawberry-crunch",
    title: "Freeze-Dried Strawberry Crunch",
    zh: "冻干草莓脆",
    price: 14.99,
    compareAt: 19.99,
    badge: "Best Seller",
    desc: "Bright berry aroma, airy crunch, and a clean ingredient story made for TikTok conversion.",
    longDesc:
      "Made from carefully selected strawberries, this product delivers a crisp texture, natural fruit aroma, and a clean premium feel designed for global direct-to-consumer selling.",
    accent: "from-[#f2c8cf] via-[#fff7f2] to-[#f5efe6]",
    specs: ["Real fruit", "Low-temperature freeze-dried", "No frying", "Light crispy texture"],
  },
  {
    id: "mango-bites",
    title: "Freeze-Dried Mango Bites",
    zh: "冻干芒果块",
    price: 16.99,
    compareAt: 21.99,
    badge: "TikTok Favorite",
    desc: "Sweet tropical notes with a premium crispy texture that looks great on camera.",
    longDesc:
      "A brighter tropical profile with vivid color and satisfying crunch, ideal for snack gifting, UGC content, and premium fruit positioning.",
    accent: "from-[#f2d48b] via-[#fff7e9] to-[#f5efe6]",
    specs: ["Ripe mango flavor", "Crunchy bite", "Natural sweetness", "Giftable format"],
  },
  {
    id: "mixed-fruit-box",
    title: "Mixed Fruit Crunch Box",
    zh: "冻干混合水果礼盒",
    price: 24.99,
    compareAt: 29.99,
    badge: "Bundle",
    desc: "A higher-AOV set designed for gifting, sampling, and multi-flavor first orders.",
    longDesc:
      "A premium variety set combining multiple popular fruits in one bundle, designed to raise AOV and give first-time buyers an easier way to try the range.",
    accent: "from-[#d7c7e8] via-[#faf6ff] to-[#f5efe6]",
    specs: ["Bundle ready", "Higher AOV", "Great for gifting", "Multi-flavor sampling"],
  },
];

const faqs = [
  [
    "Do you ship internationally?",
    "Yes. This structure is ready for global DTC selling, with sections prepared for shipping rules, delivery times, and checkout integration.",
  ],
  [
    "Are these suitable for TikTok traffic?",
    "Yes. The homepage is designed to convert short-video traffic with strong first-screen visuals, social proof, featured products, and direct call-to-action buttons.",
  ],
  [
    "Can buyers also contact you for wholesale or OEM?",
    "Yes. The site keeps both DTC and factory-direct cooperation paths open so you can sell retail and also capture larger B2B opportunities.",
  ],
];

const factoryPoints = [
  "ISO-certified freeze-drying facility",
  "Export-ready production capacity",
  "Custom packing and labeling available",
  "Quality control and food safety compliance",
];

function money(n) {
  return `$${n.toFixed(2)}`;
}

function getHashRoute() {
  if (typeof window === "undefined") return "/";
  const raw = window.location.hash.replace(/^#/, "").trim();
  return raw || "/";
}

function LogoMark({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF8EF" stroke="#D9CFBF" strokeWidth="2" />
      <path d="M20 38C20 28.6112 27.6112 21 37 21H44C44 30.3888 36.3888 38 27 38H20Z" fill="#8D5B2D" />
      <path d="M18 43C18 34.1634 25.1634 27 34 27H39C39 35.8366 31.8366 43 23 43H18Z" fill="#C88443" fillOpacity="0.92" />
      <circle cx="42" cy="22" r="4" fill="#E9C9A1" />
    </svg>
  );
}

function Wordmark() {
  return (
    <div className="flex flex-col leading-none text-left">
      <span className="text-sm font-semibold tracking-[0.28em] text-[#2b2218]">ORUIYUAN</span>
      <span className="mt-1 text-[11px] tracking-[0.22em] text-[#7b6c59]">FREEZE-DRIED SNACKS</span>
    </div>
  );
}

function PageShell({ eyebrow, title, description, children }) {
  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={stagger}
      className="mx-auto max-w-7xl px-6 py-16 lg:px-10"
    >
      <motion.div variants={fadeUp} className="mb-12 max-w-3xl">
        <div className="text-sm tracking-[0.28em] text-[#8d5b2d]">{eyebrow}</div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#2b2218] sm:text-6xl">{title}</h1>
        {description ? <p className="mt-5 text-base leading-8 text-[#6b5b49]">{description}</p> : null}
      </motion.div>
      {children}
    </motion.section>
  );
}

function Header({ cartCount }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#d9cfbf] bg-[#fbf8f2]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#/" className="flex items-center gap-3">
          <LogoMark className="h-10 w-10" />
          <Wordmark />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#/ingredients" className="text-sm text-[#6b5b49] transition hover:text-[#2b2218]">Ingredients</a>
          <a href="#/shop" className="text-sm text-[#6b5b49] transition hover:text-[#2b2218]">Shop</a>
          <a href="#/about" className="text-sm text-[#6b5b49] transition hover:text-[#2b2218]">About</a>
          <a href="#/faq" className="text-sm text-[#6b5b49] transition hover:text-[#2b2218]">FAQ</a>
          <a href="#/contact" className="text-sm text-[#6b5b49] transition hover:text-[#2b2218]">Contact</a>
        </nav>
        <a href="#/cart" className="rounded-full border border-[#d9cfbf] bg-[#fffaf2] px-4 py-2 text-sm text-[#2b2218] transition hover:bg-[#f3eadf]">
          Cart {cartCount ? `(${cartCount})` : ""}
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#d9cfbf] px-6 py-10 text-center text-sm text-[#8b7a67]">
      ORUIYUAN FREEZE-DRIED SNACKS · INGREDIENT-FIRST DTC · FACTORY DIRECT
    </footer>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <motion.div variants={fadeUp} whileHover={{ y: -8 }} className="overflow-hidden rounded-[2rem] border border-[#d9cfbf] bg-[#fbf8f2]">
      <a href={`#/product/${product.id}`} className="block">
        <div className={`relative h-72 overflow-hidden bg-gradient-to-br ${product.accent}`}>
          <div className="flex h-full items-end p-5">
            <div className="flex h-full w-full items-end rounded-[1.4rem] border border-[#d9cfbf] bg-[#f4ecdf] p-5 text-xs tracking-[0.24em] text-[#8d5b2d]">
              {product.badge}
            </div>
          </div>
        </div>
      </a>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-semibold text-[#2b2218]">{product.title}</div>
            <div className="mt-1 text-sm text-[#7b6c59]">{product.zh}</div>
          </div>
          <div className="rounded-full border border-[#d9cfbf] bg-[#fffaf2] px-3 py-1 text-xs text-[#6b5b49]">{product.badge}</div>
        </div>
        <p className="mt-4 text-sm leading-7 text-[#6b5b49]">{product.desc}</p>
        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <div className="text-2xl font-semibold text-[#2b2218]">{money(product.price)}</div>
            <div className="text-sm text-[#a08f7d] line-through">{money(product.compareAt)}</div>
          </div>
          <button
            type="button"
            onClick={() => onAdd(product)}
            className="rounded-full bg-[#8d5b2d] px-5 py-2.5 text-sm font-medium text-white transition hover:scale-[1.02]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function HomePage({ onAdd }) {
  return (
    <>
      <motion.section initial="hidden" animate="show" variants={stagger} className="mx-auto flex min-h-[94vh] max-w-7xl flex-col justify-center px-6 py-16 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div variants={stagger} className="max-w-3xl">
            <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#d9cfbf] bg-[#fffaf2] px-4 py-2 text-xs tracking-[0.28em] text-[#8d5b2d]">
              <LogoMark className="h-6 w-6" />
              <span>INGREDIENT-FIRST DTC LANDING PAGE</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-semibold leading-[1.02] tracking-tight text-[#2b2218] sm:text-6xl lg:text-8xl">
              Real Fruit.
              <span className="block bg-gradient-to-b from-[#8d5b2d] to-[#b37a42] bg-clip-text text-transparent">Freeze-Dried Crunch.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-base leading-8 text-[#6b5b49] sm:text-lg">
              Premium freeze-dried fruit snacks made from real ingredients. Crispy texture, natural flavor, and no artificial additives.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#/shop" className="rounded-full bg-[#8d5b2d] px-7 py-3 text-sm font-medium text-white transition hover:scale-[1.02]">Shop Best Sellers</a>
              <a href="#/ingredients" className="rounded-full border border-[#d9cfbf] bg-[#fffaf2] px-7 py-3 text-sm font-medium text-[#2b2218] transition hover:bg-[#f3eadf]">Explore Ingredients</a>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-[2.4rem] border border-[#d9cfbf] bg-[#fbf8f2] p-4 shadow-[0_25px_80px_rgba(80,58,33,0.12)]">
            <div className="grid min-h-[34rem] gap-4 rounded-[1.9rem] border border-[#d9cfbf] bg-[#f7f1e7] p-4">
              <div className="flex items-center justify-between rounded-[1.2rem] border border-[#d9cfbf] bg-[#fffaf2] px-5 py-4">
                <div className="flex items-center gap-3">
                  <LogoMark className="h-9 w-9" />
                  <Wordmark />
                </div>
                <div className="text-xs tracking-[0.22em] text-[#8d5b2d]">PREMIUM FRUIT STORY</div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.4rem] border border-[#d9cfbf] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.85),rgba(243,235,224,0.9)_48%,transparent_75%)] p-5">
                  <div className="text-xs tracking-[0.22em] text-[#8d5b2d]">INGREDIENT STORY</div>
                  <div className="mt-14 text-2xl font-semibold text-[#2b2218]">Whole fruits, clean sourcing, and crisp texture.</div>
                </div>
                <div className="rounded-[1.4rem] border border-[#d9cfbf] bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.92),rgba(243,235,224,0.92)_45%,transparent_70%)] p-5">
                  <div className="text-xs tracking-[0.22em] text-[#8d5b2d]">PRODUCT FOCUS</div>
                  <div className="mt-14 text-2xl font-semibold text-[#2b2218]">Premium freeze-dried snacks for global DTC.</div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.2rem] border border-[#d9cfbf] bg-[#fffaf2] p-5"><div className="text-xs tracking-[0.18em] text-[#7b6c59]">STYLE</div><div className="mt-2 text-lg font-semibold text-[#2b2218]">Light & editorial</div></div>
                <div className="rounded-[1.2rem] border border-[#d9cfbf] bg-[#fffaf2] p-5"><div className="text-xs tracking-[0.18em] text-[#7b6c59]">TRUST</div><div className="mt-2 text-lg font-semibold text-[#2b2218]">Ingredient-first</div></div>
                <div className="rounded-[1.2rem] border border-[#d9cfbf] bg-[#fffaf2] p-5"><div className="text-xs tracking-[0.18em] text-[#7b6c59]">MODEL</div><div className="mt-2 text-lg font-semibold text-[#2b2218]">TikTok → DTC</div></div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <PageShell eyebrow="BEST SELLERS" title="Customer Favorites" description="A clean homepage section that leads directly into product clicks and add-to-cart behavior.">
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-6 lg:grid-cols-3">
          {products.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}
        </motion.div>
      </PageShell>
    </>
  );
}

function IngredientsPage() {
  const blocks = [
    ["REAL FRUIT", "精选完整果源", "Bright, clean visuals to communicate real fruit quality and natural sourcing."],
    ["FREEZE-DRIED", "低温冻干工艺", "Built to highlight crunch, lightness, and premium product texture."],
    ["FACTORY DIRECT", "工厂直供", "Manufacturing capability becomes part of the trust story."],
    ["STRAWBERRY", "草莓", "Naturally sweet and aromatic, with a strong visual identity."],
    ["MANGO", "芒果", "Tropical flavor with vivid color and gifting potential."],
    ["BLUEBERRY", "蓝莓", "Useful for antioxidant-led messaging and clean premium positioning."],
  ];

  return (
    <PageShell eyebrow="INGREDIENT TRANSPARENCY" title="Ingredient Transparency" description="We believe great snacks start with great ingredients. Our freeze-dried fruits are made from carefully selected real fruit to preserve natural flavor, color, and nutrients.">
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blocks.map(([en, zh, text]) => (
          <motion.div key={en} variants={fadeUp} className="rounded-[2rem] border border-[#d9cfbf] bg-[#fbf8f2] p-7">
            <div className="text-xs tracking-[0.24em] text-[#8d5b2d]">{en}</div>
            <div className="mt-3 text-2xl font-semibold text-[#2b2218]">{zh}</div>
            <p className="mt-4 text-sm leading-7 text-[#6b5b49]">{text}</p>
          </motion.div>
        ))}
      </motion.div>
    </PageShell>
  );
}

function ShopPage({ onAdd }) {
  return (
    <PageShell eyebrow="SHOP" title="All Products" description="A dedicated second-level shop page for browsing the full range instead of depending only on homepage sections.">
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-6 lg:grid-cols-3">
        {products.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}
      </motion.div>
    </PageShell>
  );
}

function ProductPage({ product, onAdd }) {
  if (!product) {
    return (
      <PageShell eyebrow="404" title="Product not found" description="This product page does not exist.">
        <a href="#/shop" className="rounded-full bg-[#8d5b2d] px-6 py-3 text-sm font-medium text-white">Back to Shop</a>
      </PageShell>
    );
  }

  return (
    <PageShell eyebrow={product.badge.toUpperCase()} title={product.title} description={product.longDesc}>
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={fadeUp} className={`rounded-[2.2rem] border border-[#d9cfbf] bg-gradient-to-br ${product.accent} p-5`}>
          <div className="min-h-[30rem] rounded-[1.6rem] border border-[#d9cfbf] bg-[#f4ecdf] p-6 text-xs tracking-[0.28em] text-[#8d5b2d]">PRODUCT HERO IMAGE</div>
        </motion.div>
        <motion.div variants={stagger} className="space-y-6">
          <motion.div variants={fadeUp} className="rounded-[1.8rem] border border-[#d9cfbf] bg-[#fbf8f2] p-6">
            <div className="text-sm text-[#8b7a67]">Price</div>
            <div className="mt-2 text-4xl font-semibold text-[#2b2218]">{money(product.price)}</div>
            <div className="mt-1 text-sm text-[#a08f7d] line-through">{money(product.compareAt)}</div>
            <button type="button" onClick={() => onAdd(product)} className="mt-6 rounded-full bg-[#8d5b2d] px-6 py-3 text-sm font-medium text-white">Add to Cart</button>
          </motion.div>
          <motion.div variants={fadeUp} className="rounded-[1.8rem] border border-[#d9cfbf] bg-[#fbf8f2] p-6">
            <div className="text-sm tracking-[0.24em] text-[#8d5b2d]">SPECIFICATIONS</div>
            <div className="mt-4 grid gap-3">
              {product.specs.map((item) => (
                <div key={item} className="rounded-full border border-[#d9cfbf] bg-[#fffaf2] px-4 py-3 text-sm text-[#6b5b49]">{item}</div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </PageShell>
  );
}

function AboutPage() {
  return (
    <PageShell eyebrow="ABOUT / FACTORY" title="From Our Factory to Global Markets" description="A real second-level about page helps your site feel more complete, more credible, and much less like a one-page template.">
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <motion.div variants={fadeUp} className="rounded-[2rem] border border-[#d9cfbf] bg-[#fbf8f2] p-8">
          <div className="text-sm tracking-[0.24em] text-[#8d5b2d]">FACTORY STORY</div>
          <p className="mt-5 text-base leading-8 text-[#6b5b49]">ORUIYUAN is positioned as a factory-direct freeze-dried snack manufacturer, combining premium product presentation with export-ready production capability.</p>
          <div className="mt-6 grid gap-3">
            {factoryPoints.map((item) => (
              <div key={item} className="rounded-[1.2rem] border border-[#d9cfbf] bg-[#fffaf2] px-5 py-4 text-sm text-[#6b5b49]">{item}</div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={fadeUp} className="rounded-[2rem] border border-[#d9cfbf] bg-[#fbf8f2] p-5">
          <div className="min-h-[30rem] rounded-[1.5rem] border border-[#d9cfbf] bg-[#f4ecdf] p-6 text-xs tracking-[0.28em] text-[#8d5b2d]">FACTORY / PRODUCTION / PACKAGING VISUALS</div>
        </motion.div>
      </motion.div>
    </PageShell>
  );
}

function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <PageShell eyebrow="FAQ" title="Frequently Asked Questions" description="A real FAQ page reduces friction for both DTC customers and wholesale enquiries.">
      <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4">
        {faqs.map(([q, a], idx) => (
          <motion.button key={q} variants={fadeUp} onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)} className="w-full rounded-[1.6rem] border border-[#d9cfbf] bg-[#fbf8f2] p-6 text-left">
            <div className="flex items-center justify-between gap-4">
              <div className="text-base font-medium text-[#2b2218]">{q}</div>
              <div className="text-xl text-[#8b7a67]">{openIndex === idx ? "−" : "+"}</div>
            </div>
            <AnimatePresence initial={false}>
              {openIndex === idx ? (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <p className="pt-4 text-sm leading-7 text-[#6b5b49]">{a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.button>
        ))}
      </motion.div>
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell eyebrow="CONTACT / WHOLESALE" title="Get in Touch" description="This page can carry both customer service enquiries and factory-direct wholesale leads.">
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <motion.div variants={fadeUp} className="rounded-[2rem] border border-[#d9cfbf] bg-[#fbf8f2] p-8">
          <div className="space-y-4 text-sm text-[#6b5b49]">
            <div><span className="font-medium text-[#2b2218]">Email:</span> hello@oruiyuan.com</div>
            <div><span className="font-medium text-[#2b2218]">WhatsApp:</span> +86 000 0000 0000</div>
            <div><span className="font-medium text-[#2b2218]">Cooperation:</span> OEM / ODM / Wholesale</div>
          </div>
        </motion.div>
        <motion.div variants={fadeUp} className="rounded-[2rem] border border-[#d9cfbf] bg-[#fbf8f2] p-8">
          <div className="grid gap-4">
            <input className="h-12 rounded-full border border-[#d9cfbf] bg-[#fffaf2] px-5 text-sm outline-none" placeholder="Your name" />
            <input className="h-12 rounded-full border border-[#d9cfbf] bg-[#fffaf2] px-5 text-sm outline-none" placeholder="Your email" />
            <textarea className="min-h-[140px] rounded-[1.5rem] border border-[#d9cfbf] bg-[#fffaf2] px-5 py-4 text-sm outline-none" placeholder="Your message" />
            <button type="button" className="rounded-full bg-[#8d5b2d] px-6 py-3 text-sm font-medium text-white">Send Inquiry</button>
          </div>
        </motion.div>
      </motion.div>
    </PageShell>
  );
}

function CartPage({ cart, changeQty }) {
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.qty * item.price, 0), [cart]);
  return (
    <PageShell eyebrow="CART" title="Your Bag" description="A dedicated cart page makes the site feel closer to a real store, even before live checkout is connected.">
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div variants={fadeUp} className="space-y-4">
          {cart.length === 0 ? (
            <div className="rounded-[2rem] border border-[#d9cfbf] bg-[#fbf8f2] p-8 text-sm text-[#6b5b49]">Your cart is empty.</div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="rounded-[2rem] border border-[#d9cfbf] bg-[#fbf8f2] p-6">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-lg font-semibold text-[#2b2218]">{item.title}</div>
                    <div className="mt-1 text-sm text-[#7b6c59]">{item.zh}</div>
                    <div className="mt-3 text-sm text-[#6b5b49]">{money(item.price)}</div>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-[#d9cfbf] bg-[#fffaf2] px-2 py-1">
                    <button type="button" onClick={() => changeQty(item.id, -1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3eadf] text-[#2b2218]">−</button>
                    <span className="min-w-6 text-center text-sm text-[#2b2218]">{item.qty}</span>
                    <button type="button" onClick={() => changeQty(item.id, 1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3eadf] text-[#2b2218]">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </motion.div>
        <motion.div variants={fadeUp} className="rounded-[2rem] border border-[#d9cfbf] bg-[#fbf8f2] p-8">
          <div className="text-sm tracking-[0.24em] text-[#8d5b2d]">ORDER SUMMARY</div>
          <div className="mt-6 flex items-center justify-between text-sm text-[#6b5b49]"><span>Subtotal</span><span className="text-2xl font-semibold text-[#2b2218]">{money(subtotal)}</span></div>
          <button type="button" className="mt-6 w-full rounded-full bg-[#8d5b2d] px-6 py-3 text-sm font-medium text-white">Proceed to Checkout</button>
          <a href="#/shop" className="mt-3 block w-full rounded-full border border-[#d9cfbf] bg-[#fffaf2] px-6 py-3 text-center text-sm font-medium text-[#2b2218]">Continue Shopping</a>
        </motion.div>
      </motion.div>
    </PageShell>
  );
}

export default function App() {
  const [route, setRoute] = useState(getHashRoute());
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const sync = () => setRoute(getHashRoute());
    window.addEventListener("hashchange", sync);
    sync();
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const currentProduct = route.startsWith("/product/") ? products.find((p) => p.id === route.replace("/product/", "")) : null;

  let page = null;
  if (route === "/") page = <HomePage onAdd={addToCart} />;
  else if (route === "/ingredients") page = <IngredientsPage />;
  else if (route === "/shop") page = <ShopPage onAdd={addToCart} />;
  else if (route.startsWith("/product/")) page = <ProductPage product={currentProduct} onAdd={addToCart} />;
  else if (route === "/about") page = <AboutPage />;
  else if (route === "/faq") page = <FAQPage />;
  else if (route === "/contact") page = <ContactPage />;
  else if (route === "/cart") page = <CartPage cart={cart} changeQty={changeQty} />;
  else page = <PageShell eyebrow="404" title="Page not found" description="The page you are looking for does not exist."><a href="#/" className="rounded-full bg-[#8d5b2d] px-6 py-3 text-sm font-medium text-white">Back Home</a></PageShell>;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f1e7] text-[#2b2218] selection:bg-[#c9b69d]/40">
      <div className="border-b border-[#d9cfbf] bg-[#efe5d5] px-4 py-3 text-center text-xs tracking-[0.22em] text-[#6f5d48]">FREE GLOBAL SHIPPING ON ORDERS OVER $49</div>
      <Header cartCount={cartCount} />
      <main>{page}</main>
      <Footer />
    </div>
  );
}
