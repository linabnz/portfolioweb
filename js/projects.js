/**
 * Initialize project filters and interactions
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Event listeners for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get filter category
            const filterCategory = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter projects
            filterProjects(filterCategory, projectCards);
        });
    });
    
    // Initialize project card interactions
    initProjectCardInteractions(projectCards);
}

/**
 * Filter projects based on category
 * @param {string} category - Category to filter by
 * @param {NodeList} projects - List of project elements
 */
function filterProjects(category, projects) {
    projects.forEach(project => {
        const projectCategory = project.getAttribute('data-category');
        
        if (category === 'all' || projectCategory === category) {
            // Show project with animation
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = 1;
                project.style.transform = 'translateY(0)';
            }, 10);
        } else {
            // Hide project with animation
            project.style.opacity = 0;
            project.style.transform = 'translateY(20px)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

/**
 * Initialize project card hover interactions
 * @param {NodeList} projectCards - List of project card elements
 */
function initProjectCardInteractions(projectCards) {
    projectCards.forEach(card => {
        const overlay = card.querySelector('.project-overlay');
        
        // Show overlay on hover/click
        card.addEventListener('mouseenter', function() {
            if (overlay) {
                overlay.style.opacity = 1;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (overlay) {
                overlay.style.opacity = 0;
            }
        });
        
        // For mobile: toggle overlay on click
        card.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (overlay) {
                    const currentOpacity = window.getComputedStyle(overlay).opacity;
                    
                    if (currentOpacity === '0') {
                        overlay.style.opacity = 1;
                    } else {
                        // Only hide if not clicking on a link
                        if (!e.target.closest('a')) {
                            overlay.style.opacity = 0;
                        }
                    }
                }
            }
        });
    });
}