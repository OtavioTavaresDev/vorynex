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

## 🚀 Sobre o Projeto

**Vorynex** é um e‑commerce estático moderno para venda de produtos digitais, toolkits, automações e ferramentas de cybersecurity. Totalmente funcional sem backend, com checkout via WhatsApp e suporte a múltiplos idiomas.

### ✨ Demonstração ao vivo
🔗 **[https://otaviotavaresdev.github.io/vorynex/](https://otaviotavaresdev.github.io/vorynex/)**

---

## 📋 Features Completas

| Categoria | Funcionalidades |
|-----------|-----------------|
| 🌍 **Internacionalização** | 6 idiomas (EN, PT, ES, FR, IT, RU) com detecção automática do navegador |
| 🛒 **Carrinho de Compras** | Adição/remoção de itens, quantidades, persistência via localStorage |
| 📦 **Catálogo Dinâmico** | Produtos carregados via JSON com traduções por idioma |
| 🔍 **Filtros Avançados** | Pesquisa textual, filtro por categoria, ordenação (preço/nome) |
| 📱 **Responsividade** | Mobile‑first com menu hamburger adaptativo |
| 💬 **Checkout WhatsApp** | Mensagens pré‑preenchidas com detalhes do pedido |
| 🎨 **Design Premium** | Dark mode com gradientes, animações suaves e glassmorphism |
| ⚡ **Performance** | 100% estático, carregamento instantâneo, sem dependências pesadas |
| 🔒 **Segurança** | Escape HTML, Content Security Policy, sem dados sensíveis no frontend |

---

## 📁 Estrutura do Projeto
/vorynex
├── index.html # Página principal
├── assets/
│ ├── css/
│ │ └── style.css # Estilos (dark mode, responsivo, animações)
│ ├── js/
│ │ └── main.js # Lógica (i18n, carrinho, filtros, renderização)
│ └── images/
│ └── vorynex.png # Logo personalizada
├── data/
│ ├── products.json # Catálogo de produtos (com traduções)
│ └── translations.json # Strings para 6 idiomas
├── pages/
│ ├── privacy.html # Política de Privacidade
│ └── terms.html # Termos de Uso
├── .gitignore
└── README.md

text

---

## 🎨 Design & UX

### Paleta de Cores
| Cor | Código | Uso |
|-----|--------|-----|
| Preto Profundo | `#0f0f0f` | Fundo principal |
| Card | `#18181b` | Cards e sidebars |
| Ciano Neon | `#00e5ff` | Destaques, botões primários, gradientes |
| Roxo | `#8b5cf6` | Botão "Add to cart", gradientes |
| Texto | `#f0f0f5` / `#a1a1aa` | Texto principal / secundário |

### Componentes Principais
- **Header Sticky** com blur effect e menu responsivo
- **Hero Section** com logo animada e CTA
- **Cards de Produtos** com hover 3D e grid adaptativo (1→2→3 colunas)
- **Carrossel Infinito** de depoimentos
- **Carrinho Lateral** com overlay e gestão de quantidades
- **FAQ Accordion** (8 perguntas/respostas)
- **Footer** com links sociais e contato

---

## 📱 Fluxo de Compra

1. **Navegação** → Usuário explora o catálogo, pesquisa e filtra produtos
2. **Carrinho** → Adiciona itens ao carrinho (persistido no navegador)
3. **Checkout** → Clica em "Checkout via WhatsApp"
4. **Mensagem** → Texto pré‑formatado com:
   - Lista de produtos e quantidades
   - Preços unitários
   - Taxa de revenda (configurável)
   - Total do pedido
5. **Confirmação** → Após pagamento (PIX/transferência), entrega digital imediata

---

## 🛠️ Customização

### Adicionar/Remover Produtos
Edite `data/products.json`:
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
Alterar Número do WhatsApp
Edite a constante no início de assets/js/main.js:

javascript
const WHATSAPP_NUMBER = '5511998447863'; // Seu número
Ajustar Taxa de Revenda
javascript
const RESELLER_FEE = 200; // Valor em dólares
Adicionar Novo Idioma
Adicione o código em SUPPORTED_LANGS no main.js

Duplique um bloco de idioma no translations.json e traduza as strings

📦 Deploy no GitHub Pages
Faça push do repositório para o GitHub

Acesse Settings → Pages

Em Branch, selecione main e pasta / (root)

Clique em Save

Seu site estará disponível em https://<username>.github.io/vorynex/

⏱️ O deploy leva de 30 segundos a 2 minutos

🔧 Tecnologias Utilizadas
Tecnologia	Uso
HTML5	Estrutura semântica
CSS3	Estilização, animações, flexbox/grid, variáveis
Vanilla JavaScript	Lógica de negócio, manipulação DOM, i18n
JSON	Armazenamento de dados (produtos, traduções)
Font Awesome	Ícones
Google Fonts	Fonte Inter
GitHub Pages	Hospedagem estática
✅ Checklist de Funcionalidades
Catálogo dinâmico via JSON

Tradução completa (6 idiomas)

Carrinho com persistência

Filtros e ordenação

Pesquisa em tempo real

Menu hamburger mobile

Links automáticos para WhatsApp

Design responsivo (mobile‑first)

Animações CSS (float, pulse, scroll)

Páginas legais (Privacy/Terms)

SEO básico (meta tags)

Bloqueio de zoom e scroll horizontal indesejado

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

📞 Contato
Canal	Link
WhatsApp	+55 11 99844-7863
Instagram	@vorynexbusines
Email	vorynexbusines@gmail.com
GitHub	@OtavioTavaresDev
<div align="center"> <sub>Built with 💜 by Vorynex · Digital tools. Built for execution.</sub> </div> 
