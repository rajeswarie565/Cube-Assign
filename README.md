# GTG Perfumes - Responsive Website

A pixel-perfect, fully responsive single-page website for GTG Perfumes, built with vanilla HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Interactive Product Gallery**: Image gallery with arrow controls, dot indicators, and clickable thumbnails
- **Dynamic Add-to-Cart**: Radio button groups for fragrance and purchase type selection that dynamically update the cart URL
- **Animated Statistics**: Percentage counters that animate when scrolled into view
- **Accessible Navigation**: Hamburger menu with keyboard support and ARIA attributes
- **Semantic HTML**: Clean, semantic HTML5 structure
- **Cross-Browser Compatible**: Works on Chrome, Firefox, Edge, and Safari

## Project Structure

```
/cube.raji final
├─ index.html              # Main HTML file
├─ README.md               # This file
├─ css/
│  └─ styles.css          # All styles with responsive breakpoints
├─ js/
│  └─ main.js             # All interactive functionality
└─ images/                 # Image assets
   ├─ hero/
   │  └─ hero-bottle-grass.png
   ├─ products/
   │  ├─ main-product.png
   │  ├─ single-subscription.png
   │  ├─ double-subscription.png
   │  └─ thumbnails/      # 8 thumbnail images
   └─ collection.png
```

## Interactive Features

### 1. Product Gallery
- Click arrow buttons to navigate between images
- Click dot indicators to jump to specific images
- Click thumbnails to view full-size images
- Keyboard navigation supported (Arrow keys)

### 2. Add-to-Cart Functionality
- Select from 3 fragrance options (Purple Pink, Bright Purple, Orange Red)
- Choose purchase type (Single Subscription, Double Subscription, One-time Purchase)
- Add-to-Cart button URL updates dynamically based on selections (9 total combinations)
- Subscription details expand/collapse based on selection

### 3. Animated Counters
- Statistics section (84%, 78%, 89%, 90%) animate when scrolled into view
- Uses IntersectionObserver API for performance

### 4. Responsive Navigation
- Hamburger menu on tablet and mobile devices
- Full navigation bar on desktop
- Keyboard accessible (Enter/Space to toggle, Escape to close)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

## Setup & Deployment

### Local Development

1. Clone or download this repository
2. Open `index.html` in a web browser
3. For local development with a server, use:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (with http-server)
   npx http-server
   ```

### GitHub Pages Deployment

1. Create a new repository on GitHub
2. Push all files to the repository
3. Go to Settings → Pages
4. Select the main branch as the source
5. Your site will be available at `https://[username].github.io/[repository-name]`

**Note**: Ensure all paths in HTML, CSS, and JS are relative (they already are).

## File Descriptions

### `index.html`
- Semantic HTML5 structure
- All sections: Header, Hero, Product, Collection, Statistics, Comparison Table, Footer
- Proper ARIA attributes for accessibility
- Meta tags for SEO

### `css/styles.css`
- CSS Reset and base styles
- Responsive breakpoints (mobile: <768px, tablet: 768-1199px, desktop: 1200px+)
- Flexbox and Grid layouts
- Custom radio button styling
- Smooth transitions and animations
- Print styles included

### `js/main.js`
- Modular JavaScript code
- Navigation module (hamburger menu)
- Gallery module (image carousel)
- Radio groups & Add-to-Cart module
- Counter animation module
- Accordion module
- Smooth scroll functionality

## Testing Checklist

- [x] Visual match to design across all breakpoints
- [x] Gallery navigation (arrows, dots, thumbnails) works correctly
- [x] All radio combinations update Add-to-Cart link
- [x] Subscription details expand/collapse properly
- [x] Counters animate when scrolled into view
- [x] Table is semantic and responsive
- [x] Hamburger menu works on tablet/mobile
- [x] Keyboard navigation functional
- [x] Images load correctly
- [x] No console errors

## Performance Optimizations

- Images use `loading="lazy"` for below-the-fold content
- Hero image uses `loading="eager"` for faster LCP
- Efficient event listeners
- CSS transitions for smooth animations
- IntersectionObserver for counter animations (performance-friendly)

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Alt text for all images
- Proper heading hierarchy
- Form labels for radio groups

## Color Scheme

- Primary Green: `#2d5016`
- Light Green: `#4a7c2a`
- Purple: `#9b59b6`
- Pink: `#e91e63`
- Orange: `#ff6b35`
- White: `#ffffff`
- Light Grey: `#f5f5f5`

## License

This project is created for GTG Perfumes. All rights reserved.

## Contact

For questions or issues, please contact the development team.

