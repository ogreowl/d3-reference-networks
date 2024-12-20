// Set up SVG
const width = 800;
const height = 400;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

const svg = d3.select('#visualization')
    .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background-color', '#f0f0f0'); // Light gray background to see the canvas

// Create interactive circle
const circle = svg.append('circle')
    .attr('cx', width/2)
    .attr('cy', height/2)
    .attr('r', 50)
    .attr('fill', 'steelblue')
    .style('cursor', 'pointer') // Change cursor to show it's interactive
    .on('mouseover', function() {
        d3.select(this)
            .transition()
            .duration(300)
            .attr('fill', 'orange')
            .attr('r', 75);
    })
    .on('mouseout', function() {
        d3.select(this)
            .transition()
            .duration(300)
            .attr('fill', 'steelblue')
            .attr('r', 50);
    })
    .on('click', function(event) {
        // Generate random position within SVG bounds
        const newX = Math.random() * (width - 100) + 50;  // Keep away from edges
        const newY = Math.random() * (height - 100) + 50;
        
        d3.select(this)
            .transition()
            .duration(1000)
            .attr('cx', newX)
            .attr('cy', newY);
    });

// Add text to explain interactions
svg.append('text')
    .attr('x', width/2)
    .attr('y', 30)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Arial')
    .text('Hover over circle and click it!');
