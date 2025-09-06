# 🎯 SlideGen Pro

A powerful, browser-based presentation slide generator that transforms JSON data into beautiful, professional slides with custom branding support.

![SlideGen Pro](https://img.shields.io/badge/Version-1.0-blue?style=for-the-badge) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🌟 Features

### ✨ **Core Functionality**
- **JSON-driven**: Import slide content from structured JSON files
- **Drag & Drop**: Intuitive file upload with visual feedback
- **Live Preview**: See your slides instantly as you generate them
- **Multiple Export Options**: Download as PNG images or export to PDF

### 🎨 **Design & Branding**
- **Custom Overlay Support**: Add your brand background to all slides
- **Professional Templates**: Modern, clean slide designs
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Dark Theme**: Easy on the eyes with beautiful gradients

### 🚀 **Advanced Features**
- **Batch Processing**: Generate multiple slides at once
- **Real-time Validation**: Instant feedback on JSON structure
- **Animation Effects**: Smooth transitions and hover effects
- **Print Optimization**: Perfect for PDF generation

## 🛠️ Installation

### Quick Start (Recommended)
1. **Download**: Save the HTML file as `slidegen-pro.html`
2. **Open**: Double-click the file or open in any modern browser
3. **Use**: No installation required - everything runs in your browser!

## 📚 Usage Guide

### Step 1: Prepare Your Content
Create a JSON file with your slide data:

```json
[
  {
    "title": "Welcome to My Presentation",
    "subtitle": "An Introduction",
    "content": [
      "First key point about the topic",
      "Second important detail",
      "Third supporting argument",
      "Call to action or conclusion"
    ]
  },
  {
    "title": "Technical Details",
    "subtitle": "Code Example:",
    "codeBlock": "function hello() {\n  console.log('Hello World!');\n  return true;\n}"
  }
]
```

### Step 2: Generate Slides
1. **Upload JSON**: Drag & drop or click to upload your JSON file
2. **Add Branding** (Optional): Upload a background image for your slides
3. **Generate**: Click "Generate Slides" to create your presentation
4. **Preview**: Review your slides in the browser

### Step 3: Export Your Presentation
- **PNG Images**: Download each slide as a high-quality PNG
- **PDF Export**: Use "Export PDF" for a complete document
- **Print**: Direct printing support with optimized layouts

## 📄 JSON Structure Reference

### Required Fields
- `title`: The main heading for your slide (string, required)

### Optional Fields
- `subtitle`: Secondary heading or description (string)
- `content`: Array of bullet points (array of strings)
- `codeBlock`: Code snippet to display (string, preserves formatting)

### Complete Example
```json
[
  {
    "title": "HTML Basics: Headings and Paragraphs",
    "subtitle": "What We'll Cover Today:",
    "content": [
      "Understanding HTML structure basics",
      "Working with heading tags (h1-h6)",
      "Creating paragraphs with the p tag",
      "Best practices for content organization",
      "Hands-on examples and common mistakes"
    ]
  },
  {
    "title": "Code Structure Example",
    "subtitle": "HTML Syntax:",
    "content": [
      "Tags use angle brackets",
      "Most tags come in pairs",
      "Proper nesting is important"
    ],
    "codeBlock": "<h1>Main Title</h1>\n<p>This is a paragraph.</p>\n<h2>Subtitle</h2>"
  },
  {
    "title": "Questions & Discussion",
    "content": [
      "What challenges have you faced with HTML?",
      "Which concepts need more explanation?",
      "Ready to practice together?"
    ]
  }
]
```

## 🎨 Customization Options

### Brand Overlay
- Upload any image (PNG, JPG, SVG)
- Image automatically scales to fit slide dimensions
- Overlay preserves text readability with smart opacity
- Perfect for adding logos, patterns, or brand colors

### Slide Dimensions
- Default: 4:3 aspect ratio (standard presentation format)
- Optimized for both digital display and printing
- Responsive design adapts to different screen sizes

### Styling
- Edit CSS variables in the HTML file to customize:
  - Colors and gradients
  - Font families and sizes
  - Spacing and layout
  - Animation effects

## ⚡ Performance Tips

### File Size Optimization
- Keep JSON files under 1MB for optimal performance
- Compress overlay images before uploading
- Use web-optimized image formats (WebP, PNG, JPG)

### Browser Compatibility
- **Recommended**: Chrome, Firefox, Safari, Edge (latest versions)
- **HTML2Canvas**: Required for image export functionality
- **JavaScript**: Must be enabled for full functionality

### Large Presentations
- For 50+ slides, generate in batches
- Close other browser tabs during export
- Allow extra time for PDF generation

## 🔧 Troubleshooting

### Common Issues

**"Generate Slides" button is disabled**
- Ensure JSON file is uploaded and valid
- Check browser console for error messages
- Verify JSON structure matches required format

**Download not working**
- Allow pop-ups and downloads in browser settings
- Wait for html2canvas library to fully load
- Try refreshing the page and re-uploading files

**Slides look different than expected**
- Check JSON formatting (use online JSON validator)
- Ensure all required fields are present
- Review content length (very long text may overflow)

**Overlay image not showing**
- Verify image file format (PNG, JPG, SVG supported)
- Check image file size (recommended < 5MB)
- Ensure image loads properly in browser

### Error Messages
```
"JSON must be an array of slide objects"
→ Wrap your slide objects in square brackets []

"Slide X is missing a title"  
→ Add "title" field to the specified slide

"Please select a valid JSON file"
→ Ensure file has .json extension and proper MIME type
```

## 🤝 Contributing

This project is open source and welcomes contributions:

### Development Setup
1. Fork the repository
2. Make your changes to the HTML/CSS/JavaScript
3. Test thoroughly across browsers
4. Submit a pull request

### Feature Requests
- Theme customization options
- Additional export formats
- Slide transition animations
- Template library
- Real-time collaboration

## 📋 Changelog

### Version 1.0
- Initial release with core functionality
- JSON import and validation
- PNG/PDF export capabilities
- Brand overlay support
- Responsive design
- Drag & drop interface

## 📞 Support

### Getting Help
- Check this README for common solutions
- Review browser console for error messages
- Ensure you're using a supported browser
- Verify JSON file structure

### Contact
- **Created by**: @yaasir.codes
- **GitHub Issues**: For bug reports and feature requests
- **Email**: For direct support inquiries

## 📄 License

This project is open source and available under the MIT License. Feel free to use, modify, and distribute according to the license terms.

---

**Made with ❤️ by @yaasir.codes** - Empowering content creators with beautiful, professional slides.
