const width = 800;
const height = 400;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

const svg = d3.select('#visualization')
    .append('svg')
        .attr('width', width)
        .attr('height', height);

// test to see if it's working
svg.append('circle')
    .attr('cx', width/2)
    .attr('cy', height/2)
    .attr('r', 50)
    .attr('fill', 'steelblue');
