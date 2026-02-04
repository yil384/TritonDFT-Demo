// Table of Contents - Right sidebar (always visible on desktop)
document.addEventListener('DOMContentLoaded', function() {
    const tocSidebar = document.getElementById('tocSidebar');
    
    // Show/hide TOC based on scroll position and screen size
    function updateTOCVisibility() {
        if (window.innerWidth > 1200) {
            tocSidebar.style.display = 'block';
        } else {
            tocSidebar.style.display = 'none';
        }
    }
    
    window.addEventListener('resize', updateTOCVisibility);
    updateTOCVisibility();
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offset = 20;
            const targetPosition = targetElement.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close TOC after clicking a link
            const tocSidebar = document.getElementById('tocSidebar');
            if (tocSidebar && tocSidebar.classList.contains('active')) {
                tocSidebar.classList.remove('active');
            }
        }
    });
});

// Active section highlighting in TOC
const sections = document.querySelectorAll('section[id]');
const tocLinks = document.querySelectorAll('.toc-content nav a');

function highlightTOC() {
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightTOC);
window.addEventListener('load', highlightTOC);

// Copy BibTeX function
function copyBibtex() {
    const bibtexText = `@article{tritondft2026,
  title={TritonDFT: Automating DFT with a Multi-Agent Framework},
  author={Anonymous Authors},
  journal={International Conference on Machine Learning (ICML)},
  year={2026}
}`;
    
    navigator.clipboard.writeText(bibtexText).then(() => {
        const copyButton = document.querySelector('.copy-button');
        const originalHTML = copyButton.innerHTML;
        
        copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyButton.style.background = 'rgba(46, 204, 113, 0.3)';
        
        setTimeout(() => {
            copyButton.innerHTML = originalHTML;
            copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy BibTeX. Please copy manually.');
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.agent-card, .dimension-box, .finding-box, .stat-box, .figure-container'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Enhanced table responsiveness
function makeTablesResponsive() {
    const tables = document.querySelectorAll('.results-table');
    tables.forEach(table => {
        if (!table.parentElement.classList.contains('results-table-container')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'results-table-container';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });
}

document.addEventListener('DOMContentLoaded', makeTablesResponsive);

// Scroll to top button (optional)
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    document.body.appendChild(button);
};

// Uncomment to enable scroll-to-top button
// document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Handle placeholder images
document.addEventListener('DOMContentLoaded', () => {
    const placeholderImages = document.querySelectorAll('img[src*="assets/"]');
    placeholderImages.forEach(img => {
        img.addEventListener('error', function() {
            // If image fails to load, style it as a placeholder
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
            this.style.minHeight = '400px';
        });
    });
});

// Print functionality
function printPage() {
    window.print();
}

// Share functionality helpers
function shareOnTwitter() {
    const url = window.location.href;
    const text = 'Check out TritonDFT: Automating DFT with a Multi-Agent Framework';
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
}

function shareOnLinkedIn() {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
}

// Keyboard shortcuts (removed TOC toggle as it's now always visible on desktop)

console.log('TritonDFT website loaded successfully!');
