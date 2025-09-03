# Local Images Directory

## 📁 **File Structure**
```
public/assets/images/
├── README.md (this file)
├── code-algorithms.jpg (example: 1920x1080, high quality)
├── math-chalkboard.jpg (example: 1920x1080, high quality)
└── your-images-here/
```

## 🖼️ **How to Use Local Images**

### **1. Add Your Images**
- Place your image files directly in this folder
- Supported formats: JPG, PNG, WebP, AVIF
- Recommended: Use high-resolution images (1920x1080 or higher)

### **2. Reference in Blog Posts**
```typescript
{
  type: "image",
  src: "/assets/images/your-image.jpg",
  alt: "Description of image",
  caption: "Optional caption",
  width: 1920,
  height: 1080,
  quality: "high",        // "low", "medium", "high", "original"
  format: "webp"          // "jpeg", "png", "webp", "avif"
}
```

### **3. Image Quality Settings**
- **quality**: Controls compression level
  - `"low"`: 50% quality (smaller file, lower quality)
  - `"medium"`: 75% quality (balanced)
  - `"high"`: 90% quality (larger file, better quality)
  - `"original"`: No compression (largest file, best quality)

- **format**: Controls output format
  - `"webp"`: Best quality/size ratio (recommended)
  - `"avif"`: Best compression, newer format
  - `"jpeg"`: Universal compatibility
  - `"png"`: Lossless, good for graphics

## 🚀 **Vercel Optimization**

Vercel automatically:
- ✅ Optimizes images for different screen sizes
- ✅ Serves WebP/AVIF to supported browsers
- ✅ Provides responsive images with `srcSet`
- ✅ Caches optimized versions globally

## 📱 **Responsive Images**

The system automatically generates:
- Mobile: 400w, 800w
- Tablet: 1200w
- Desktop: 1600w, 1920w

## 💡 **Best Practices**

1. **Use high-resolution source images** (1920x1080+)
2. **Set quality to "high"** for photos, "medium" for graphics
3. **Use WebP format** for best performance
4. **Keep file names descriptive** and lowercase
5. **Optimize source images** before uploading (remove EXIF data, etc.)

## 🔗 **CDN Alternative**

For very large images or high-traffic sites, consider:
- **Cloudinary**: Free tier, excellent quality control
- **AWS S3 + CloudFront**: Enterprise-grade
- **Vercel Image Optimization**: Built-in, automatic
