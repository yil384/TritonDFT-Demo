# TritonDFT Demo Website - File Index

Quick reference for all project files.

## 📄 Core Website Files

| File | Description | Lines |
|------|-------------|-------|
| `index.html` | Main website page (English) | ~314 |
| `styles.css` | Complete styling and responsive design | ~800+ |
| `script.js` | Interactive features and animations | ~200+ |

## 📚 Documentation Files

| File | Purpose | When to Read |
|------|---------|--------------|
| `README.md` | Project overview and instructions | First |
| `QUICKSTART.md` | 3-step quick start guide | When starting |
| `SUMMARY.md` | Complete project summary | For overview |
| `DEPLOYMENT.md` | Detailed deployment guide | When deploying |
| `PROJECT_OVERVIEW.md` | Comprehensive project details | For deep dive |
| `TEST_CHECKLIST.md` | Testing checklist | Before launch |
| `INDEX.md` | This file - file reference | Anytime |

## 🛠️ Utility Files

| File | Purpose | Usage |
|------|---------|-------|
| `start.sh` | Launch local server | `./start.sh` |
| `generate_sample_images.py` | Create sample charts | `python3 generate_sample_images.py` |
| `.gitignore` | Git ignore configuration | Automatic |
| `LICENSE` | MIT License | Reference |

## 📁 Directories

### `assets/`
Contains images and media files.

| Expected File | Purpose |
|--------------|---------|
| `performance-comparison.png` | Overall performance chart |
| `time-comparison.png` | Time comparison across steps |
| `pareto-frontier.png` | Pareto frontier visualization |
| `workflow-diagram.png` | System architecture diagram |
| `README.md` | Image usage guide |

## 🎯 Quick Access Guide

### I want to...

**...see the website**
→ Run `./start.sh` then open `http://localhost:8000`

**...change colors**
→ Edit `styles.css` lines 9-18 (CSS variables)

**...modify content**
→ Edit `index.html` (all text is there)

**...add images**
→ Put files in `assets/` folder

**...deploy the site**
→ Read `DEPLOYMENT.md`

**...understand the project**
→ Read `SUMMARY.md`

**...customize the site**
→ Read `PROJECT_OVERVIEW.md`

**...test before launch**
→ Use `TEST_CHECKLIST.md`

**...get started quickly**
→ Read `QUICKSTART.md`

## 📊 Project Statistics

```
Total Files:       13
Documentation:     6 files
Code Files:        3 files
Utility Files:     4 files
Total Lines:       ~1500+
Languages:         HTML, CSS, JavaScript, Markdown, Python
```

## 🗂️ File Organization

```
TritonDFT-Demo-Web/
│
├── 🌐 Website Files
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── 📚 Documentation
│   ├── README.md
│   ├── QUICKSTART.md
│   ├── SUMMARY.md
│   ├── DEPLOYMENT.md
│   ├── PROJECT_OVERVIEW.md
│   ├── TEST_CHECKLIST.md
│   └── INDEX.md (this file)
│
├── 🛠️ Utilities
│   ├── start.sh
│   ├── generate_sample_images.py
│   ├── .gitignore
│   └── LICENSE
│
└── 📁 Assets
    ├── README.md
    └── (image files to be added)
```

## 🔍 Finding Things

### Section in HTML
All sections have clear IDs:
- `#introduction`
- `#workflow`
- `#pareto`
- `#benchmark`
- `#results`
- `#share`
- `#bibtex`

### CSS Classes
Major classes:
- `.hero-section`
- `.content-section`
- `.agent-card`
- `.dimension-box`
- `.finding-box`
- `.results-table`

### JavaScript Functions
Key functions:
- `copyBibtex()` - Copy citation
- `highlightTOC()` - Highlight current section
- `shareOnTwitter()` - Social sharing
- `shareOnLinkedIn()` - Social sharing

## 📝 Editing Priority

When customizing, edit in this order:

1. **Content First**
   - `index.html` - Update all text and links

2. **Visual Second**
   - `styles.css` - Adjust colors and spacing

3. **Assets Third**
   - Add images to `assets/`

4. **Advanced Last**
   - `script.js` - Modify interactions (if needed)

## 🔗 External Dependencies

### CDN Links (in `index.html`)
- Google Fonts (Inter)
- Font Awesome 6.4.0

### Python Dependencies (for image generation)
- matplotlib
- numpy

## ⚡ Performance Tips

### Optimize Before Launch
1. Compress images (aim for <200KB each)
2. Minify CSS/JS (optional)
3. Enable caching on server
4. Use CDN for hosting (Netlify, Vercel)

## 🆘 Troubleshooting Guide

| Problem | Check This File | Look For |
|---------|----------------|----------|
| Site won't load | `index.html` | File path, syntax |
| Styling broken | `styles.css` | Syntax errors, missing files |
| Features not working | `script.js` | Console errors |
| Can't start server | `start.sh` | Permissions, port availability |
| Need deployment help | `DEPLOYMENT.md` | Platform-specific instructions |

## 📞 Support Resources

- **Getting Started**: `QUICKSTART.md`
- **Full Documentation**: `README.md`
- **Technical Details**: `PROJECT_OVERVIEW.md`
- **Deploy Help**: `DEPLOYMENT.md`
- **Testing**: `TEST_CHECKLIST.md`

---

**Last Updated**: February 4, 2026  
**Version**: 1.0.0

---

**Quick Start**: `./start.sh` → `http://localhost:8000` 🚀

