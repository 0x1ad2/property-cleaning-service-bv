#!/bin/bash

# Image Optimization Script
# Converts images from .references/photography to optimized WebP format
# Usage: ./scripts/optimize-images.sh

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Directories
SOURCE_DIR=".references/photography"
OUTPUT_DIR="public/images/optimized"

# Image settings
WIDTH=1200
HEIGHT=800
QUALITY=80

echo "🖼️  Image Optimization Script"
echo "================================"
echo ""

# Check if sharp-cli is available
if ! command -v sharp &> /dev/null; then
    echo -e "${YELLOW}⚠️  sharp not found. Installing sharp package...${NC}"
    npm install sharp
fi

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${RED}✗ Error: Source directory '$SOURCE_DIR' not found${NC}"
    exit 1
fi

# Count total images
total_images=$(find "$SOURCE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | wc -l | tr -d ' ')

if [ "$total_images" -eq 0 ]; then
    echo -e "${YELLOW}⚠️  No images found in $SOURCE_DIR${NC}"
    exit 0
fi

echo "Found $total_images image(s) to process"
echo ""

# Process each image
processed=0
skipped=0

# Create a temporary Node.js script for processing in the project directory
TEMP_SCRIPT=".optimize-image-temp.js"
cat > "$TEMP_SCRIPT" << 'EOF'
import sharp from 'sharp';
import fs from 'fs';

const [inputPath, outputPath, width, height, quality] = process.argv.slice(2);

(async () => {
  try {
    await sharp(inputPath)
      .resize(parseInt(width), parseInt(height), { fit: 'cover' })
      .webp({ quality: parseInt(quality) })
      .toFile(outputPath);
    
    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`${sizeKB} KB`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
})();
EOF

# Process images
while IFS= read -r input_file; do
    # Get filename without path and extension
    filename=$(basename "$input_file")
    name="${filename%.*}"
    
    # Convert to lowercase-kebab case and normalize special characters
    # Replace spaces and special characters with hyphens, convert to lowercase
    output_name=$(echo "$name" | \
        sed -e 's/[ëéèê]/e/g' -e 's/[&]/and/g' -e 's/[^a-zA-Z0-9]/-/g' | \
        sed -e 's/--*/-/g' -e 's/^-//' -e 's/-$//' | \
        tr '[:upper:]' '[:lower:]')
    output_file="$OUTPUT_DIR/${output_name}.webp"
    
    # Process the image
    echo -n "Processing: $filename → ${output_name}.webp ... "
    
    if size=$(node "$TEMP_SCRIPT" "$input_file" "$output_file" "$WIDTH" "$HEIGHT" "$QUALITY" 2>&1); then
        echo -e "${GREEN}✓${NC} ($size)"
        ((processed++))
    else
        echo -e "${RED}✗${NC} Failed: $size"
        ((skipped++))
    fi
done < <(find "$SOURCE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \))

# Cleanup
rm -f "$TEMP_SCRIPT"

echo ""
echo "================================"
echo -e "${GREEN}✨ Optimization complete!${NC}"
echo "Processed: $processed image(s)"
if [ "$skipped" -gt 0 ]; then
    echo -e "${YELLOW}Skipped: $skipped image(s)${NC}"
fi
echo ""
echo "Output directory: $OUTPUT_DIR"
