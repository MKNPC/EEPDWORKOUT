// Tab System with Distinct Animations
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initTabs();
    initNavigation();
});

// Initialize Tab System
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            const animationType = btn.dataset.anim;

            // Remove active from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active to clicked button
            btn.classList.add('active');

            // Handle panel transitions
            tabPanels.forEach(panel => {
                if (panel.id === `tab-${targetTab}`) {
                    // Remove active first to reset animation
                    panel.classList.remove('active');
                    panel.style.display = 'none';
                    
                    // Force reflow
                    void panel.offsetWidth;
                    
                    // Show and animate with specific animation type
                    panel.style.display = 'grid';
                    panel.dataset.anim = animationType;
                    
                    // Small delay for animation to trigger
                    setTimeout(() => {
                        panel.classList.add('active');
                    }, 10);
                } else {
                    panel.classList.remove('active');
                    setTimeout(() => {
                        if (!panel.classList.contains('active')) {
                            panel.style.display = 'none';
                        }
                    }, 300);
                }
            });

            // Update icons
            lucide.createIcons();
        });
    });

    // Show first tab by default
    if (tabBtns.length > 0) {
        tabBtns[0].click();
    }
}

// Initialize navigation
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                navLinks.classList.remove('active');
            }
        });
    });
}
