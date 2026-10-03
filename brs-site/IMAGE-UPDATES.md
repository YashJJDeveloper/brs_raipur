# Updating website images

All displayed image paths are managed in **dist/images.js**. Each entry is keyed by the product code, for example:

```js
"8605": "assets/mahabali-new.jpg"
```

1. Put your replacement image in `dist/assets/` (JPG, PNG, WebP or AVIF), or use a direct HTTPS image URL.
2. Change that product's path in `dist/images.js`.
3. Reload the website. The catalogue card, detail popup, and featured image all use the same entry in Hindi and English.

For example, replacing product `8605` automatically updates Mahabali wherever it appears. The three featured packs use products `7005`, `8605`, and `8618`.

Local edits update your local website. To update a hosted website, publish the updated configuration and any new image files. This configuration does not provide an upload dashboard or save changes to hosting by itself.

If another script updates `window.BRSImages.products` while the page is running, it can apply the images immediately with:

```js
window.BRSImages.products["8605"] = "assets/mahabali-new.jpg";
window.dispatchEvent(new Event("brs:images-changed"));
```

Product text translations remain in `dist/translations/hi.js` and `dist/translations/en.js`.
