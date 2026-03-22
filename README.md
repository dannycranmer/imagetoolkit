# PicBrew

**Free, private image tools that run entirely in your browser.**

Your images never leave your device. No uploads, no servers, no tracking — just fast, browser-based image processing powered by the Canvas API.

**Live site:** [https://dannycranmer.github.io/imagetoolkit/](https://dannycranmer.github.io/imagetoolkit/)

## Tools

| Tool | Description |
|------|-------------|
| [Image Compressor](https://dannycranmer.github.io/imagetoolkit/compress.html) | Reduce file size with quality control. Batch support + ZIP download. |
| [Image Resizer](https://dannycranmer.github.io/imagetoolkit/resize.html) | Resize by pixels, percentage, or social media presets (Instagram, Twitter, Facebook, LinkedIn, YouTube). |
| [Image Converter](https://dannycranmer.github.io/imagetoolkit/convert.html) | Convert between JPEG, PNG, and WebP formats. |
| [Image Cropper](https://dannycranmer.github.io/imagetoolkit/crop.html) | Visual drag-to-crop with aspect ratio presets (1:1, 4:3, 16:9, 3:2). |
| [Add Watermark](https://dannycranmer.github.io/imagetoolkit/watermark.html) | Text watermarks with position, rotation, opacity, and tiling options. |
| [Background Remover](https://dannycranmer.github.io/imagetoolkit/background-remover.html) | Remove backgrounds by color with flood fill or global mode. |
| [Flip & Rotate](https://dannycranmer.github.io/imagetoolkit/flip-rotate.html) | Flip, rotate by preset angles, or set a custom rotation. |
| [Filters & Effects](https://dannycranmer.github.io/imagetoolkit/filters.html) | Brightness, contrast, saturation, blur, grayscale, sepia, invert. |
| [Meme Generator](https://dannycranmer.github.io/imagetoolkit/meme.html) | Classic top/bottom text memes with Impact font. |
| [Image to Base64](https://dannycranmer.github.io/imagetoolkit/base64.html) | Convert images to Base64 data URIs for embedding in HTML/CSS. |
| [Color Palette Extractor](https://dannycranmer.github.io/imagetoolkit/palette.html) | Extract dominant colors using median cut. Download as PNG or JSON. |
| [Image Collage Maker](https://dannycranmer.github.io/imagetoolkit/collage.html) | Combine 2-9 images into grid layouts (2x1, 2x2, 3x3, etc.). |
| [Image Noise Remover](https://dannycranmer.github.io/imagetoolkit/denoise.html) | Reduce noise/grain with Gaussian, median, or bilateral filtering. |
| [Screenshot Mockup Generator](https://dannycranmer.github.io/imagetoolkit/mockup.html) | Place screenshots in device frames (iPhone, MacBook, iPad, Android, browser). |
| [Image to PDF](https://dannycranmer.github.io/imagetoolkit/image-to-pdf.html) | Combine multiple images into a single PDF with layout controls. |

## Why PicBrew?

- **Privacy-first** — All processing happens in your browser. Your images are never uploaded anywhere.
- **Free** — No subscriptions, no paywalls, no usage limits.
- **Fast** — No server round-trips. Everything runs locally using the Canvas API.
- **No ads** — Clean, distraction-free interface.
- **No signup** — Just open and use. No account required.
- **Works offline** — After the initial page load, tools work without an internet connection.
- **Open source** — View the code, suggest improvements, or fork it.

## Tech Stack

- Pure HTML, CSS, and JavaScript — no frameworks, no build step
- Canvas API for all image manipulation
- [JSZip](https://stuk.github.io/jszip/) for batch ZIP downloads
- [jsPDF](https://github.com/parallax/jsPDF) for image-to-PDF conversion
- Deployed on GitHub Pages

## Sister Projects

- [Parchment](https://parchpdf.com/) — Free, private PDF tools
- [DevBrew](https://devbrew.org/) — Free developer tools

## Support

If you find PicBrew useful, consider [buying me a coffee](https://buymeacoffee.com/dairylea).

## License

MIT
