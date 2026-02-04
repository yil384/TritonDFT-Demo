# Website Testing Checklist

Use this checklist to verify all features are working correctly.

## 🚀 Pre-Launch Testing

### 1. Server Launch
- [ ] Run `./start.sh` successfully
- [ ] Website loads at `http://localhost:8000`
- [ ] No console errors in browser DevTools (F12)

### 2. Visual Design
- [ ] Logo displays correctly
- [ ] All text is readable
- [ ] Colors match the design
- [ ] Proper spacing and alignment
- [ ] Hero section looks professional
- [ ] All sections have proper backgrounds

### 3. Navigation
- [ ] TOC button (☰) is visible
- [ ] Click TOC button - sidebar opens/closes
- [ ] All TOC links work
- [ ] Smooth scrolling to sections
- [ ] Active section highlights in TOC
- [ ] Press 't' key toggles TOC

### 4. Content Sections

#### Hero Section
- [ ] Logo and title visible
- [ ] Author information displays
- [ ] All action buttons present
- [ ] Performance chart area visible

#### Introduction
- [ ] Text is readable
- [ ] Highlight box stands out
- [ ] Key points list displays
- [ ] Time comparison figure area visible

#### TritonDFT System
- [ ] Section title displays
- [ ] Agent cards in grid layout
- [ ] All 4 agents visible
- [ ] Icons show correctly
- [ ] Hover effects work

#### Pareto Optimization
- [ ] Two-column layout works
- [ ] Text and figure side-by-side
- [ ] Info box displays correctly
- [ ] Pareto frontier image area visible

#### DFTBench
- [ ] Statistics boxes display
- [ ] Numbers are prominent
- [ ] Dimension cards in grid
- [ ] All 4 dimensions visible
- [ ] Icons display correctly

#### Results
- [ ] Table displays properly
- [ ] All columns visible
- [ ] TritonDFT row highlighted
- [ ] Finding cards in grid
- [ ] Icons show correctly

#### Share Section
- [ ] Share buttons visible
- [ ] Twitter button works
- [ ] LinkedIn button works

#### BibTeX
- [ ] Code block displays
- [ ] Copy button visible
- [ ] Proper formatting

### 5. Interactive Features

#### Copy BibTeX
- [ ] Click copy button
- [ ] Button shows "Copied!"
- [ ] Button changes color temporarily
- [ ] Text is copied to clipboard
- [ ] Paste works correctly

#### Smooth Scrolling
- [ ] Click any TOC link
- [ ] Page scrolls smoothly
- [ ] Lands at correct section
- [ ] No jarring jumps

#### TOC Auto-Highlight
- [ ] Scroll down the page
- [ ] TOC highlights current section
- [ ] Changes as you scroll

### 6. Responsive Design

#### Desktop (>1200px)
- [ ] Full layout displays
- [ ] TOC sidebar visible when active
- [ ] Content centered
- [ ] Proper spacing

#### Tablet (768px - 1200px)
- [ ] Grid cards adjust
- [ ] Tables scrollable
- [ ] Content readable
- [ ] Navigation works

#### Mobile (<768px)
- [ ] Single column layout
- [ ] TOC overlay works
- [ ] Text is readable
- [ ] Buttons stack properly
- [ ] Cards full width
- [ ] Images scale correctly

### 7. Images
- [ ] All image placeholders display
- [ ] Gradient backgrounds show
- [ ] Captions are readable
- [ ] Images don't break layout

### 8. Links
- [ ] All external links work
- [ ] Links open in new tab
- [ ] Internal anchors work
- [ ] No broken links

### 9. Footer
- [ ] Footer displays
- [ ] Institution name visible
- [ ] Attribution text readable
- [ ] Links work

### 10. Cross-Browser Testing

#### Chrome
- [ ] Layout correct
- [ ] All features work
- [ ] Animations smooth

#### Firefox
- [ ] Layout correct
- [ ] All features work
- [ ] Animations smooth

#### Safari
- [ ] Layout correct
- [ ] All features work
- [ ] Animations smooth

#### Edge
- [ ] Layout correct
- [ ] All features work
- [ ] Animations smooth

### 11. Performance

#### Load Time
- [ ] Page loads in < 2 seconds
- [ ] CSS loads correctly
- [ ] JavaScript executes
- [ ] Fonts load properly

#### Interactions
- [ ] No lag on scroll
- [ ] Hover effects instant
- [ ] Animations smooth
- [ ] No freezing

### 12. Accessibility

#### Keyboard Navigation
- [ ] Tab through all links
- [ ] Enter activates links
- [ ] 't' toggles TOC
- [ ] Esc closes TOC (if implemented)

#### Screen Reader (Optional)
- [ ] Headings make sense
- [ ] Alt text on images
- [ ] Links are descriptive

### 13. Code Quality

#### HTML
- [ ] No syntax errors
- [ ] Proper nesting
- [ ] Semantic tags used
- [ ] All IDs unique

#### CSS
- [ ] No errors in DevTools
- [ ] Proper syntax
- [ ] Variables used correctly
- [ ] Media queries work

#### JavaScript
- [ ] No console errors
- [ ] Functions work correctly
- [ ] Event listeners attached
- [ ] No memory leaks

---

## 🐛 Common Issues & Fixes

### Issue: TOC not opening
**Fix**: Check JavaScript console for errors. Verify `script.js` is loaded.

### Issue: Copy button not working
**Fix**: Use HTTPS or localhost. Clipboard API requires secure context.

### Issue: Images not showing
**Fix**: 
1. Check file names match exactly
2. Verify images are in `assets/` folder
3. Run `python3 generate_sample_images.py` to create samples

### Issue: Smooth scrolling not working
**Fix**: Check if `html { scroll-behavior: smooth; }` is in CSS.

### Issue: Layout broken on mobile
**Fix**: Clear browser cache. Check viewport meta tag in HTML.

### Issue: Fonts not loading
**Fix**: Check internet connection. Google Fonts requires network access.

---

## ✅ Launch Ready Checklist

Before deploying to production:

- [ ] All tests above pass
- [ ] Real images added to `assets/`
- [ ] All links updated (paper, code, etc.)
- [ ] Author information correct
- [ ] Contact details added
- [ ] Spelling/grammar checked
- [ ] BibTeX citation correct
- [ ] Tested on mobile device
- [ ] Tested on multiple browsers
- [ ] Performance is good
- [ ] No console errors
- [ ] Favicon added (optional)
- [ ] Google Analytics added (optional)

---

## 📊 Testing Results Template

```
Date: _______________
Tester: _______________
Browser: _______________
Device: _______________

Desktop: ☐ Pass  ☐ Fail
Mobile:  ☐ Pass  ☐ Fail
Tablet:  ☐ Pass  ☐ Fail

Notes:
_________________________________
_________________________________
_________________________________

Issues Found:
_________________________________
_________________________________
_________________________________

Overall: ☐ Ready  ☐ Needs Work
```

---

## 🎯 Priority Levels

**Critical (Must Fix)**:
- Site doesn't load
- Major layout breaks
- Links don't work
- Copy button fails

**High (Should Fix)**:
- Mobile responsiveness issues
- Cross-browser inconsistencies
- Animation glitches
- Image loading problems

**Medium (Nice to Fix)**:
- Minor spacing issues
- Color tweaks
- Performance optimizations
- Code cleanup

**Low (Optional)**:
- Additional features
- Easter eggs
- Extra animations
- Advanced interactions

---

**Testing Status**: ☐ In Progress  ☐ Complete  ☐ Approved

**Tested By**: _________________  **Date**: _________________

