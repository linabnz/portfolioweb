#!/bin/bash

mkdir -p css js components assets/{images,fonts,documents}

touch index.html
touch components/{header.html,navbar.html,experience.html,education.html,projects.html,skills.html,footer.html}

touch css/{styles.css,components.css,sections.css,animations.css}

touch js/{main.js,navigation.js,projects.js,skills-visualization.js,particles-config.js}

echo "Arborescence du portfolio créée à la racine du repo avec succès."
