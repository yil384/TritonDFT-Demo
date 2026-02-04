# TritonDFT Demo Website

Official demonstration website for the TritonDFT paper, submitted to ICML 2026.

## About TritonDFT

**TritonDFT** is a multi-agent framework designed to automate the complete Density Functional Theory (DFT) workflow, accelerating materials science research.

### Key Features

- 🤖 **End-to-End Workflow Automation** - From structure search to result analysis
- ⚖️ **Pareto-Aware Parameter Inference** - Intelligent accuracy-cost trade-off optimization
- 📚 **Multi-Source Knowledge Augmentation** - Domain tools, historical memory, and human-in-the-loop interaction
- 🖥️ **HPC Integration** - Seamless integration with high-performance computing resources

### DFTBench

We introduce **DFTBench**, the first comprehensive benchmark for evaluating DFT workflow automation capabilities:

- 100 material samples
- 10 distinct material types
- 500+ CPU hours of expert curation
- Multi-dimensional evaluation (science expertise, trade-off optimization, HPC knowledge, cost efficiency)

## Website Structure

```
TritonDFT-Demo-Web/
├── index.html              # Main page
├── styles.css              # Stylesheet
├── script.js               # JavaScript interactions
├── assets/                 # Assets folder
│   ├── performance-comparison.png   # (to be added)
│   ├── time-comparison.png          # (to be added)
│   ├── pareto-frontier.png          # (to be added)
│   └── workflow-diagram.png         # (to be added)
├── README.md               # This file
├── DEPLOYMENT.md           # Deployment guide
├── LICENSE                 # MIT License
└── .gitignore             # Git ignore file
```

## Quick Start

### Local Development

1. Clone or download this repository

2. Start a local web server:

   **Using Python:**
   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Using Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

   **Using PHP:**
   ```bash
   php -S localhost:8000
   ```

   **Using the included script:**
   ```bash
   ./start.sh
   ```

3. Open your browser and navigate to `http://localhost:8000`

### Deployment

This is a static website that can be easily deployed to:

- **GitHub Pages**: Push to `gh-pages` branch
- **Netlify**: Drag-and-drop deployment or connect Git repository
- **Vercel**: Import Git repository and deploy
- **Any static hosting service**

See `DEPLOYMENT.md` for detailed deployment instructions.

## Customization

### Adding Images

Add the following images to the `assets/` folder:

1. `performance-comparison.png` - Overall performance comparison chart
2. `time-comparison.png` - Time comparison across workflow steps
3. `pareto-frontier.png` - Pareto frontier visualization for Silicon
4. `workflow-diagram.png` - TritonDFT system architecture diagram

### Modifying Content

- **Text and content**: Edit `index.html`
- **Styling**: Modify `styles.css` CSS variables and styles
- **Interactions**: Update `script.js`

### Color Scheme

Modify CSS variables in `styles.css`:

```css
:root {
    --primary-color: #4a90e2;    /* Primary color */
    --secondary-color: #7b68ee;  /* Secondary color */
    --accent-color: #2ecc71;     /* Accent color */
    /* ... more variables ... */
}
```

## Features

### Design
- ✅ Clean, academic design inspired by [AgentFlow](https://agentflow.stanford.edu/)
- ✅ Table of Contents sidebar
- ✅ Fully responsive (desktop/tablet/mobile)
- ✅ Smooth animations and transitions

### Functionality
- ✅ Smooth scrolling navigation
- ✅ Active section highlighting
- ✅ One-click BibTeX copy
- ✅ Social sharing buttons
- ✅ Keyboard shortcuts (press 't' for TOC toggle)

### Performance
- ✅ Lightweight HTML/CSS/JS
- ✅ No build tools required
- ✅ Fast loading times
- ✅ SEO friendly

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Other modern browsers

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling and animations
- **Vanilla JavaScript** - No framework dependencies
- **Font Awesome** - Icon library
- **Google Fonts** - Inter typeface

## Links

- 📄 [Paper](https://anonymous.4open.science/r/TritonDFT-43C7/) (anonymous submission)
- 💻 [Code Repository](https://anonymous.4open.science/r/TritonDFT-43C7/)
- 📊 DFTBench (coming soon)

## Citation

If you use TritonDFT in your research, please cite our paper:

```bibtex
@article{tritondft2026,
  title={TritonDFT: Automating DFT with a Multi-Agent Framework},
  author={Anonymous Authors},
  journal={International Conference on Machine Learning (ICML)},
  year={2026}
}
```

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

This website is adapted from:
- [Nerfies](https://nerfies.github.io/)
- [MathVista](https://mathvista.github.io/)
- [AgentFlow](https://agentflow.stanford.edu/)

Licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/).

---

**Note**: This is an anonymous submission for ICML 2026. Full author information and contact details will be made public upon paper acceptance.
