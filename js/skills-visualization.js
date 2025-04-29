/**
 * Initialize skills visualization using D3.js
 */
function initSkillsVisualization() {
    // Check if D3 is loaded
    if (typeof d3 === 'undefined') {
        console.error('D3.js is not loaded');
        return;
    }

    // Skills data organized by categories
    const skillsData = {
        name: "Skills",
        children: [
            {
                name: "Data Science",
                children: [
                    { name: "Machine Learning", value: 85 },
                    { name: "Deep Learning", value: 75 },
                    { name: "Statistical Analysis", value: 90 },
                    { name: "NLP", value: 65 },
                    { name: "Computer Vision", value: 70 }
                ]
            },
            {
                name: "Big Data",
                children: [
                    { name: "Spark", value: 85 },
                    { name: "Scala", value: 80 },
                    { name: "Hadoop", value: 65 },
                    { name: "Kafka", value: 70 },
                    { name: "Hive", value: 75 }
                ]
            },
            {
                name: "Programming",
                children: [
                    { name: "Python", value: 90 },
                    { name: "R", value: 85 },
                    { name: "SQL", value: 80 },
                    { name: "HTML/CSS", value: 70 },
                    { name: "JavaScript", value: 60 }
                ]
            },
            {
                name: "Cloud & DevOps",
                children: [
                    { name: "GCP", value: 80 },
                    { name: "Docker", value: 75 },
                    { name: "Git", value: 70 },
                    { name: "Azure", value: 60 }
                ]
            }
        ]
    };

    // Get the container dimensions
    const container = document.getElementById('skills-map');
    const width = container.clientWidth;
    const height = 400;

    // Clear previous visualization if any
    d3.select('#skills-map svg').remove();

    // Create SVG container
    const svg = d3.select('#skills-map')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Color scale for different categories
    const color = d3.scaleOrdinal()
        .domain(skillsData.children.map(d => d.name))
        .range(['#3498db', '#2ecc71', '#e74c3c', '#f39c12']);

    // Create a hierarchical structure
    const hierarchy = d3.hierarchy(skillsData)
        .sum(d => d.value || 0);

    // Create a circle packing layout
    const pack = d3.pack()
        .size([width * 0.8, height * 0.8])
        .padding(3);

    // Generate the circle positions
    const nodes = pack(hierarchy).descendants();

    // Create a group for each node
    const node = svg.selectAll('.node')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x - width / 2}, ${d.y - height / 2})`);

    // Add circles for each node
    node.append('circle')
        .attr('r', d => d.r)
        .attr('fill', d => d.children ? 'transparent' : color(d.parent.data.name))
        .attr('opacity', d => d.children ? 1 : 0.7)
        .attr('stroke', d => d.children ? color(d.data.name) : 'none')
        .attr('stroke-width', d => d.children ? 2 : 0)
        .on('mouseover', function(event, d) {
            d3.select(this)
                .attr('opacity', 1)
                .attr('stroke', '#333')
                .attr('stroke-width', 2);
        })
        .on('mouseout', function(event, d) {
            d3.select(this)
                .attr('opacity', d.children ? 1 : 0.7)
                .attr('stroke', d.children ? color(d.data.name) : 'none')
                .attr('stroke-width', d.children ? 2 : 0);
        });

    // Add text labels for categories and skills
    node.append('text')
        .attr('dy', d => d.children ? '0.3em' : '0.3em')
        .style('text-anchor', 'middle')
        .style('font-size', d => d.children ? '14px' : '10px')
        .style('font-weight', d => d.children ? 'bold' : 'normal')
        .style('fill', d => d.children ? color(d.data.name) : '#333')
        .style('pointer-events', 'none')
        .text(d => d.data.name);

    // Add tooltips for skill level
    node.filter(d => !d.children)
        .append('title')
        .text(d => `${d.data.name}: ${d.data.value}%`);

    // Add category labels
    svg.selectAll('.category-label')
        .data(skillsData.children)
        .enter()
        .append('text')
        .attr('class', 'category-label')
        .attr('x', 0)
        .attr('y', (d, i) => height / 2 - 20 - i * 25)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .style('fill', d => color(d.name))
        .text(d => d.name);

    // Add legend
    const legend = svg.selectAll('.legend')
        .data(skillsData.children)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => `translate(${width / 2 - 80}, ${-height / 2 + 30 + i * 20})`);

    legend.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', d => color(d.name));

    legend.append('text')
        .attr('x', 20)
        .attr('y', 12)
        .style('font-size', '12px')
        .text(d => d.name);
}

// Make sure to initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // The main.js already handles the initialization based on the component loading
});