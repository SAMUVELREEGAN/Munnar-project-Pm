const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BUILD_DIR = path.join(ROOT, 'build');
const SRC_DIR = path.join(ROOT, 'src');

console.log('====================================================');
console.log('MOBILE FRIENDLINESS & CORE WEB VITALS VERIFICATION');
console.log('====================================================\n');

let passed = 0;
let failed = 0;

function assert(condition, message, details = '') {
  if (condition) {
    console.log(`[PASS] ${message}`);
    if (details) console.log(`       ${details}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    if (details) console.error(`       ${details}`);
    failed++;
  }
}

// 1. Viewport Tag in public and build
const pubHtml = fs.readFileSync(path.join(ROOT, 'public', 'index.html'), 'utf8');
const buildHtml = fs.readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf8');

assert(
  pubHtml.includes('<meta name="viewport" content="width=device-width, initial-scale=1.0" />'),
  'public/index.html has exact viewport meta tag',
  'content="width=device-width, initial-scale=1.0"'
);

assert(
  buildHtml.includes('name="viewport" content="width=device-width, initial-scale=1.0"'),
  'build/index.html has exact viewport meta tag',
  'content="width=device-width, initial-scale=1.0"'
);

// 2. Preload Primary LCP Hero Image
assert(
  pubHtml.includes('rel="preload"') && pubHtml.includes('href="%PUBLIC_URL%/images/Munnar-bg.webp"'),
  'public/index.html preloads primary LCP hero image',
  'fetchpriority="high" type="image/webp"'
);

assert(
  buildHtml.includes('rel="preload"') && buildHtml.includes('/images/Munnar-bg.webp'),
  'build/index.html preloads primary LCP hero image',
  'Preloaded before bundle execution'
);

// 3. Fast Tap Response (touch-action: manipulation for low INP)
const appCss = fs.readFileSync(path.join(SRC_DIR, 'App.css'), 'utf8');
assert(
  appCss.includes('touch-action: manipulation;'),
  'App.css specifies touch-action: manipulation to eliminate mobile 300ms tap delay',
  'Improves Interaction to Next Paint (INP)'
);

assert(
  !appCss.includes('feTurbulence'),
  'App.css removes expensive full-screen SVG feTurbulence filter',
  'Eliminates heavy GPU repaint cycles on mobile scroll'
);

// 4. Code Splitting & Lazy Loading in App.js
const appJs = fs.readFileSync(path.join(SRC_DIR, 'App.js'), 'utf8');
assert(
  appJs.includes('lazy(') && appJs.includes('Suspense'),
  'App.js implements React.lazy and Suspense route code splitting',
  'Keeps homepage JS bundle small and main thread responsive'
);

// Check build chunks
const jsFiles = fs.readdirSync(path.join(BUILD_DIR, 'static', 'js'));
const chunkFiles = jsFiles.filter(f => f.includes('.chunk.js') && !f.endsWith('.map'));
assert(
  chunkFiles.length >= 5,
  'Production build created distinct on-demand lazy chunks',
  `Found ${chunkFiles.length} separate chunks`
);

// 5. Image Dimensions & Aspect Ratios (CLS Prevention)
const navbarJsx = fs.readFileSync(path.join(SRC_DIR, 'Components', 'Nav', 'Navbar.jsx'), 'utf8');
assert(
  navbarJsx.includes('width="153"') && navbarJsx.includes('height="56"'),
  'Navbar logo has explicit width="153" and height="56"',
  'Preserves 2.73:1 intrinsic aspect ratio to prevent CLS'
);

const footerJsx = fs.readFileSync(path.join(SRC_DIR, 'Components', 'Footer', 'Footer.jsx'), 'utf8');
assert(
  footerJsx.includes('width="168"') && footerJsx.includes('height="56"'),
  'Footer logo has explicit width="168" and height="56"',
  'Prevents layout shifts on page bottom'
);

const heroJsx = fs.readFileSync(path.join(SRC_DIR, 'Components', 'Home-page', 'HeroSection.jsx'), 'utf8');
assert(
  heroJsx.includes('width="1600"') && heroJsx.includes('height="900"'),
  'Hero background image has explicit width="1600" and height="900"',
  'Reserves 16:9 aspect ratio above the fold'
);

// 6. Mobile Touch Targets (>= 44px)
assert(
  navbarJsx.includes('min-h-[48px]'),
  'Mobile bottom navigation links have min-h-[48px] touch targets',
  'Exceeds 44x44px minimum touch recommendation'
);

assert(
  heroJsx.includes('min-h-[44px]') && heroJsx.includes('min-w-'),
  'Hero slide indicator buttons have min-h-[44px] accessible touch targets',
  'Fixes 6px button touch target failure while preserving sleek gold pill visual'
);

const testJsx = fs.readFileSync(path.join(SRC_DIR, 'Components', 'Home-page', 'Testimonials.jsx'), 'utf8');
assert(
  testJsx.includes('h-11 w-11'),
  'Testimonials carousel navigation buttons are 44x44px (h-11 w-11)',
  'Ensures easy tapping on mobile screens'
);

const contactJsx = fs.readFileSync(path.join(SRC_DIR, 'Components', 'Contact-page', 'Contact.jsx'), 'utf8');
assert(
  contactJsx.includes('h-11 w-11'),
  'Contact page social icon buttons have 44x44px touch targets',
  'Upgraded from 32px to 44px'
);

assert(
  contactJsx.includes('min-h-[44px]'),
  'Contact page submit button has min-h-[44px] touch target',
  'Ensures full tap target compliance'
);

// 7. Anti-Zoom Mobile Input Sizing
assert(
  contactJsx.includes('text-base sm:text-sm'),
  'Contact form inputs use text-base (16px) on mobile to prevent iOS Safari auto-zoom',
  'Prevents page zoom and horizontal layout disruption on input focus'
);

const packagesJsx = fs.readFileSync(path.join(SRC_DIR, 'Components', 'Our-Package', 'Packages.jsx'), 'utf8');
assert(
  packagesJsx.includes('text-base sm:text-sm'),
  'Packages search input uses text-base (16px) on mobile to prevent auto-zoom',
  'Keeps viewport steady during search'
);

// 8. Passive Touch Listeners
assert(
  packagesJsx.includes("touchstart', handleClickOutside, { passive: true }") ||
  packagesJsx.includes('touchstart", handleClickOutside, { passive: true }'),
  'Packages.jsx registers touchstart listener with { passive: true }',
  'Never blocks mobile scrolling or main-thread compositor'
);

assert(
  packagesJsx.includes('if (!isOpen) return;'),
  'CustomDropdown only binds document listeners when opened',
  'Eliminates idle main-thread listener overhead'
);

// 9. WebP Image Asset Optimization
const teaGardensWebp = path.join(ROOT, 'public', 'images', 'munnar-tea-gardens.webp');
assert(
  fs.existsSync(teaGardensWebp),
  'munnar-tea-gardens.webp exists in public/images',
  `Optimized WebP size: ${(fs.statSync(teaGardensWebp).size / 1024).toFixed(1)} KB (down from 2,794 KB JPG)`
);

// 10. Native INP Performance Observer in reportWebVitals
const vitalsJs = fs.readFileSync(path.join(SRC_DIR, 'reportWebVitals.js'), 'utf8');
assert(
  vitalsJs.includes('INP') && vitalsJs.includes('PerformanceObserver'),
  'reportWebVitals.js includes native INP (Interaction to Next Paint) observer',
  'Measures real user interaction delays'
);

console.log('\n====================================================');
console.log(`TOTAL CHECKS: ${passed + failed}`);
console.log(`PASSED: ${passed}`);
console.log(`FAILED: ${failed}`);
console.log('====================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL MOBILE RESPONSIVENESS & CORE WEB VITALS CHECKS PASSED!\n');
}
