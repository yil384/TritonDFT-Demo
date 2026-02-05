// TritonDFT — AgentFlow-inspired interactions

// Table of Contents visibility
document.addEventListener('DOMContentLoaded', function() {
    const tocSidebar = document.getElementById('tocSidebar');
    
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

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = 60;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
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

// Copy BibTeX
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
            copyButton.style.background = 'rgba(255, 255, 255, 0.08)';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
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

document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.agent-card, .dimension-box, .finding-box, .stat-box, .figure-container, .demo-video-container'
    );
    animateElements.forEach(el => observer.observe(el));
});

// Image error fallback
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img[src*="assets/"]').forEach(img => {
        img.addEventListener('error', function() {
            this.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
            this.style.minHeight = '300px';
            this.style.display = 'block';
        });
    });
});

// Enhanced table responsiveness
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.results-table').forEach(table => {
        if (!table.parentElement.classList.contains('results-table-container')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'results-table-container';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });
});

console.log('TritonDFT website loaded successfully!');
