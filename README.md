# MotoRanger Website

A modern, responsive website for MotoRanger, a premium automotive lighting and accessories company.

## Project Overview

This website is built with modern HTML, CSS, and JavaScript to showcase MotoRanger's products and brand. It's designed to be:

- Fast-loading and responsive for all devices
- Easy to maintain with JSON-based content management
- Visually appealing with modern design elements
- SEO-friendly and accessible

## Design Versions

The website comes with multiple design options to choose from:

1. **Main Design** (`index.html`)
   - Clean and professional design with a focus on showcasing products
   - Red and black color scheme aligned with brand identity
   - Mobile-first responsive layout

2. **Alternative Design 2** (`index-alt2.html`)
   - Futuristic neon theme with modern visual effects
   - Enhanced animations and interactive elements
   - Fully responsive with optimized mobile experience

3. **BlackDSN Inspired Design** (`index-blackdsn.html`)
   - Elegant, minimal design inspired by BlackDSN template
   - Advanced animations and transitions
   - Custom cursor and preloader
   - Grid-based layout for modern aesthetic
   - Bold typography and improved visual hierarchy

## Features

- **Mobile-First Design**: Optimized for all screen sizes with a focus on mobile users
- **JSON Data Management**: Easy content updates through JSON files
- **Modern UI**: Sleek, professional design with smooth animations
- **WhatsApp Integration**: Direct purchasing through WhatsApp chat
- **Gallery**: Showcase for product images and videos
- **Product Catalog**: Filterable, searchable product listings
- **Fast Loading**: Optimized assets for quick page loads

## File Structure

```
motoranger/
├── index.html             # Main design homepage
├── index-alt2.html        # Alternative design 2 homepage
├── index-blackdsn.html    # BlackDSN inspired homepage
├── products.html          # Products catalog page
├── gallery.html           # Gallery page
├── about.html             # About us page
├── contact.html           # Contact page
├── css/
│   ├── styles.css         # Main design stylesheet
│   ├── styles-alt2.css    # Alternative design 2 stylesheet
│   └── styles-blackdsn.css # BlackDSN inspired stylesheet
├── js/
│   ├── app.js             # Main JavaScript file
│   └── app-blackdsn.js    # Extended JS for BlackDSN design
├── data/
│   ├── products.json      # Products data
│   ├── featured-products.json # Featured products data
│   ├── categories.json    # Categories data
│   └── gallery.json       # Gallery data
└── images/
    ├── products/          # Product images
    ├── gallery/           # Gallery images
    ├── categories/        # Category images
    ├── team/              # Team member images
    └── about/             # About page images
```

## How to Update Content

### Adding/Editing Products

1. Open `data/products.json`
2. Follow the existing format to add or edit products
3. Add product images to `images/products/`

### Updating Featured Products

1. Open `data/featured-products.json`
2. Add or remove products from the featured list

### Adding Gallery Items

1. Open `data/gallery.json`
2. Follow the format to add new gallery items
3. Add images to `images/gallery/`

## Choosing a Design

To switch between designs, simply use the corresponding HTML file:
- For the main design: `index.html`
- For the alternative design 2: `index-alt2.html`
- For the BlackDSN inspired design: `index-blackdsn.html`

Each design has its own CSS file and potentially additional JavaScript functionality.

## Hosting

This website can be hosted on GitHub Pages, Netlify, or any other static hosting service. The site is fully static and doesn't require a backend server.

## Development

To work on this project locally:

1. Clone the repository
2. Open the project in a code editor
3. Use a local server (like Live Server in VS Code) to preview changes

## Future Enhancements

- E-commerce functionality
- Customer warranty registration module
- Dealer locator feature
- Blog/news section

## Credits

- Font Awesome for icons
- Google Fonts for typography
- Inspiration from modern automotive websites and BlackDSN template
