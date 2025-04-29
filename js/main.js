document.addEventListener('DOMContentLoaded', function() {
    // Load components into the page
    loadComponent('header-container', 'components/header.html');
    loadComponent('navbar-container', 'components/navbar.html');
    loadComponent('experiences-container', 'components/experience.html');
    loadComponent('education-container', 'components/education.html');
    loadComponent('projects-container', 'components/projects.html');
    loadComponent('skills-container', 'components/skills.html');
    loadComponent('footer-container', 'components/footer.html');

    // Initialize loading animation
    initLoading();

    // Initialize download CV button
    initDownloadCV();
});

/**
 * Load HTML component into container
 * @param {string} containerId - ID of the container to load into
 * @param {string} componentPath - Path to the component HTML file
 */
function loadComponent(containerId, componentPath) {
    fetch(componentPath)
        .then(response => response.text())
        .then(html => {
            document.getElementById(containerId).innerHTML = html;

            // Initialize specific component functionality if needed
            if (containerId === 'projects-container') {
                initProjectFilters();
            } else if (containerId === 'skills-container') {
                initSkillsVisualization();
            } else if (containerId === 'navbar-container') {
                initNavigation();
            } else if (containerId === 'header-container') {
                initParticles();
            }
        })
        .catch(error => {
            console.error(`Error loading component ${componentPath}:`, error);
        });
}

/**
 * Initialize loading screen animation
 */
function initLoading() {
    const loadingScreen = document.querySelector('.loading-screen');
    const progress = document.querySelector('.progress');
    
    // Simulate loading progress
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            // Hide loading screen when complete
            setTimeout(() => {
                loadingScreen.style.opacity = 0;
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        } else {
            width += Math.random() * 10;
            if (width > 100) width = 100;
            progress.style.width = `${width}%`;
        }
    }, 200);
}

/**
 * Initialize download CV functionality
 */
function initDownloadCV() {
    const downloadBtn = document.getElementById('download-cv');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Change this path to your actual CV file
            window.open('assets/documents/lina-benzemma-cv.pdf', '_blank');
        });
    }
}