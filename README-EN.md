# Vorynex · Digital Tools for Execution

<div align="center">
  <img src="assets/images/vorynex.png" alt="Vorynex Logo" width="200">
</div>

<div align="center">

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-00e5ff?style=for-the-badge&logo=github)](https://otaviotavaresdev.github.io/vorynex/)
[![License](https://img.shields.io/badge/License-MIT-8b5cf6?style=for-the-badge)](LICENSE)
[![Made with Vanilla JS](https://img.shields.io/badge/Vanilla-JS-f0f0f5?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

## 🚀 About the Project

**Vorynex** is a modern static e‑commerce platform for selling digital products, toolkits, automation scripts, and cybersecurity tools. Fully functional without a backend, featuring WhatsApp checkout and multilingual support.

### ✨ Live Demo
🔗 **[https://otaviotavaresdev.github.io/vorynex/](https://otaviotavaresdev.github.io/vorynex/)**

---

## 📋 Full Features

| Category | Features |
|----------|----------|
| 🌍 **Internationalization** | 6 languages (EN, PT, ES, FR, IT, RU) with automatic browser detection |
| 🛒 **Shopping Cart** | Add/remove items, quantities, persistence via localStorage |
| 📦 **Dynamic Catalog** | Products loaded from JSON with per-language translations |
| 🔍 **Advanced Filters** | Text search, category filter, sorting (price/name) |
| 📱 **Responsiveness** | Mobile‑first with adaptive hamburger menu |
| 💬 **WhatsApp Checkout** | Pre‑filled messages with order details |
| 🎨 **Premium Design** | Dark mode with gradients, smooth animations, and glassmorphism |
| ⚡ **Performance** | 100% static, instant loading, no heavy dependencies |
| 🔒 **Security** | HTML escaping, Content Security Policy, no sensitive data on frontend |

---

## 📁 Project Structure
/vorynex
├── index.html # Main page
├── assets/
│ ├── css/
│ │ └── style.css # Styles (dark mode, responsive, animations)
│ ├── js/
│ │ └── main.js # Logic (i18n, cart, filters, rendering)
│ └── images/
│ └── vorynex.png # Custom logo
├── data/
│ ├── products.json # Product catalog (with translations)
│ └── translations.json # Strings for 6 languages
├── pages/
│ ├── privacy.html # Privacy Policy
│ └── terms.html # Terms of Use
├── .gitignore
└── README.md

text

---

## 🎨 Design & UX

### Color Palette
| Color | Code | Usage |
|-------|------|-------|
| Deep Black | `#0f0f0f` | Main background |
| Card | `#18181b` | Cards and sidebars |
| Neon Cyan | `#00e5ff` | Highlights, primary buttons, gradients |
| Purple | `#8b5cf6` | "Add to cart" button, gradients |
| Text | `#f0f0f5` / `#a1a1aa` | Primary / secondary text |

### Key Components
- **Sticky Header** with blur effect and responsive menu
- **Hero Section** with animated logo and CTA
- **Product Cards** with 3D hover and adaptive grid (1→2→3 columns)
- **Infinite Carousel** for testimonials
- **Side Cart** with overlay and quantity management
- **FAQ Accordion** (8 questions/answers)
- **Footer** with social links and contact info

---

## 📱 Sales Flow

1. **Browse** → User explores catalog, searches, and filters products
2. **Cart** → Adds items to cart (persisted in browser)
3. **Checkout** → Clicks "Checkout via WhatsApp"
4. **Message** → Pre‑formatted text with:
   - Product list and quantities
   - Unit prices
   - Reseller fee (configurable)
   - Order total
5. **Confirmation** → After payment (PIX/wire transfer), immediate digital delivery

---

## 🛠️ Customization

### Add/Remove Products
Edit `data/products.json`:
```json
{
  "id": "vx-005",
  "category": "security",
  "price": "$XX",
  "demo_link": "https://...",
  "translations": {
    "en": { "name": "Product Name", "description": "Description" },
    "pt": { "name": "Nome do Produto", "description": "Descrição" }
  }
}
Change WhatsApp Number
Edit the constant at the top of assets/js/main.js:

javascript
const WHATSAPP_NUMBER = '5511998447863'; // Your number
Adjust Reseller Fee
javascript
const RESELLER_FEE = 200; // Amount in dollars
Add a New Language
Add the code to SUPPORTED_LANGS in main.js

Duplicate a language block in translations.json and translate the strings

📦 Deploy to GitHub Pages
Push the repository to GitHub

Go to Settings → Pages

Under Branch, select main and folder / (root)

Click Save

Your site will be live at https://<username>.github.io/vorynex/

⏱️ Deployment takes 30 seconds to 2 minutes

🔧 Technologies Used
Technology	Purpose
HTML5	Semantic structure
CSS3	Styling, animations, flexbox/grid, variables
Vanilla JavaScript	Business logic, DOM manipulation, i18n
JSON	Data storage (products, translations)
Font Awesome	Icons
Google Fonts	Inter font
GitHub Pages	Static hosting
✅ Feature Checklist
Dynamic catalog via JSON

Full translation (6 languages)

Cart with persistence

Filters and sorting

Real‑time search

Mobile hamburger menu

Auto‑generated WhatsApp links

Responsive design (mobile‑first)

CSS animations (float, pulse, scroll)

Legal pages (Privacy/Terms)

Basic SEO (meta tags)

Zoom and unwanted horizontal scroll blocking

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

📞 Contact
Channel	Link
WhatsApp	+55 11 99844-7863
Instagram	@vorynexbusines
Email	vorynexbusines@gmail.com
GitHub	@OtavioTavaresDev
<div align="center"> <sub>Built with 💜 by Vorynex · Digital tools. Built for execution.</sub> </div>
