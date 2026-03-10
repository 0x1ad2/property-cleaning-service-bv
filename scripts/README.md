# Scripts Directory

This directory contains utility scripts for the project.

## optimize-images.sh

Automatically converts and optimizes images from `.references/photography` to WebP format for use in the website.

### Features

- Converts JPG, JPEG, and PNG images to WebP format
- Resizes images to 1200x800px (cover fit)
- Compresses with 80% quality
- Automatically converts filenames to PascalCase
- Shows progress and file sizes
- Color-coded output

### Usage

```bash
# From project root
./scripts/optimize-images.sh
```

### Requirements

- Node.js installed
- `sharp` npm package (auto-installed if missing)

### Configuration

You can modify these variables in the script:

- `WIDTH`: Output image width (default: 1200)
- `HEIGHT`: Output image height (default: 800)
- `QUALITY`: WebP quality 0-100 (default: 80)
- `SOURCE_DIR`: Input directory (default: `.references/photography`)
- `OUTPUT_DIR`: Output directory (default: `public/images/optimized`)

### Workflow

1. Add new images to `.references/photography/`
2. Run `./scripts/optimize-images.sh`
3. Optimized WebP images appear in `public/images/optimized/`
4. Reference them in your components using the PascalCase filename

### Example

Input: `.references/photography/my-new-image.png`  
Output: `public/images/optimized/MyNewImage.webp`

Then use in code:
```tsx
image: "MyNewImage.webp"
```
