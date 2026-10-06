# DevendraPali theme — block export

Static HTML/CSS for each home-page section, ready to register as ACF/SCF blocks.

- `index.html` — full page preview (open in a browser).
- `assets/css/base.css` — design tokens (CSS variables), base styles, buttons, scroll-reveal, responsive rules. Enqueue site-wide.
- `assets/js/site.js` — scroll reveal, sticky header, mobile menu, dark mode (persisted), back-to-top. Enqueue in footer.
- `blocks/dp-*/` — one folder per block: `block.json` (ACF block v3), `render.php`, `style.css`, `markup.html`.

## Register blocks (functions.php)
```php
add_action('init', function () {
  foreach (glob(get_stylesheet_directory() . '/blocks/*', GLOB_ONLYDIR) as $dir) register_block_type($dir);
});
add_action('wp_enqueue_scripts', function () {
  wp_enqueue_style('dp-base', get_stylesheet_directory_uri() . '/assets/css/base.css');
  wp_enqueue_script('dp-site', get_stylesheet_directory_uri() . '/assets/js/site.js', [], null, true);
});
```
Wrap page content in `<div class="dp-site">` (e.g. in header.php / footer.php) so tokens and reveal apply.

## Theming
Set on `.dp-site`: `data-theme="light|dark"`, `data-radius="soft|medium|round"`, `data-motion="subtle|moderate|expressive"`.
