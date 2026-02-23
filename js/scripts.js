/*!
* Brendan.T Portfolio Scripts
* Interactive components and animations
*/

// Horizontal Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionPanels = document.querySelectorAll('.accordion-panel');
    
    if (accordionPanels.length > 0) {
        accordionPanels.forEach(panel => {
            panel.addEventListener('click', function() {
                // Don't do anything if clicking the already active panel
                if (this.classList.contains('active')) {
                    return;
                }
                
                // Remove active class from all panels
                accordionPanels.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked panel
                this.classList.add('active');
            });
        });
    }
});
