# Quick Start Guide

Get your TritonDFT website up and running in minutes!

## 📋 Prerequisites

You need one of the following installed:
- Python 3.x or Python 2.x
- Node.js (for `http-server`)
- PHP

## 🚀 Quick Start (3 Steps)

### Step 1: Navigate to the Project

```bash
cd /Users/yil384/UCSD/TritonDFT-Demo-Web
```

### Step 2: (Optional) Generate Sample Images

If you want to see the website with placeholder images:

```bash
# Install dependencies (if not already installed)
pip install matplotlib numpy

# Generate sample images
python3 generate_sample_images.py
```

This will create example charts in the `assets/` folder.

### Step 3: Start the Server

**Option A - Use the start script (easiest):**
```bash
./start.sh
```

**Option B - Use Python directly:**
```bash
python3 -m http.server 8000
```

**Option C - Use Node.js:**
```bash
npx http-server -p 8000
```

**Option D - Use PHP:**
```bash
php -S localhost:8000
```

### Step 4: View Your Website

Open your browser and navigate to:
```
http://localhost:8000
```

## 🎨 Customization

### Update Content

1. **Edit text**: Open `index.html` and modify the content
2. **Change colors**: Edit CSS variables in `styles.css`
3. **Add your own images**: Replace files in `assets/` folder

### Key Files to Customize

| File | Purpose |
|------|---------|
| `index.html` | Main content and structure |
| `styles.css` | Colors, fonts, and layout |
| `script.js` | Interactive features |
| `assets/` | Images and media |

### Quick Color Change

Edit these lines in `styles.css`:

```css
:root {
    --primary-color: #4a90e2;    /* Main blue color */
    --secondary-color: #7b68ee;  /* Purple accent */
    --accent-color: #2ecc71;     /* Green highlights */
}
```

## 📱 Testing

### Test Responsiveness

1. Open browser DevTools (F12)
2. Click the device toolbar icon
3. Test different screen sizes:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1200px

### Test All Features

- ✅ Click TOC toggle button (☰)
- ✅ Test smooth scrolling from TOC links
- ✅ Copy BibTeX citation
- ✅ Test social sharing buttons
- ✅ Check all images load correctly

## 🌐 Deployment

### GitHub Pages (Free & Easy)

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Create repository on GitHub, then:
git remote add origin https://github.com/yourusername/tritondft.git
git branch -M main
git push -u origin main

# Enable GitHub Pages in repository settings
```

Your site will be live at: `https://yourusername.github.io/tritondft/`

### Netlify (Drag & Drop)

1. Go to [Netlify](https://www.netlify.com/)
2. Sign up/Login
3. Drag the entire `TritonDFT-Demo-Web` folder to the deploy area
4. Done! Your site is live in seconds

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd TritonDFT-Demo-Web
vercel

# Follow the prompts
```

## 📝 Content Checklist

Before going live, make sure to:

- [ ] Add your actual images to `assets/`
- [ ] Update author information (after deanonymization)
- [ ] Add correct paper links
- [ ] Update GitHub repository URL
- [ ] Add contact information
- [ ] Test all links
- [ ] Check spelling and grammar
- [ ] Test on mobile devices
- [ ] Verify BibTeX citation

## 🆘 Troubleshooting

### Images not showing?

1. Check file names match exactly (case-sensitive)
2. Verify images are in `assets/` folder
3. Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Server won't start?

1. Check if port 8000 is already in use
2. Try a different port: `python3 -m http.server 8080`
3. Make sure you're in the correct directory

### Styling looks broken?

1. Clear browser cache
2. Check if `styles.css` loaded (DevTools → Network tab)
3. Verify file path in `index.html`

### JavaScript not working?

1. Open browser console (F12)
2. Check for errors
3. Verify `script.js` is loaded

## 💡 Tips

1. **Use keyboard shortcut**: Press `t` to toggle table of contents
2. **Smooth scrolling**: Click any TOC link for smooth navigation
3. **Copy BibTeX**: Click the copy button in the BibTeX section
4. **Mobile friendly**: Test on your phone - it's fully responsive!

## 🔗 Useful Links

- [HTML Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [Google Fonts](https://fonts.google.com/)

## 📞 Need Help?

- Check `README.md` for detailed documentation
- See `DEPLOYMENT.md` for deployment options
- Review `PROJECT_OVERVIEW.md` for project structure

---

**Enjoy your new TritonDFT website!** 🎉

