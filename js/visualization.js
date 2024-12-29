// Set up SVG dimensions and margins
const width = 1000;
const height = 600;
const margin = { top: 40, right: 40, bottom: 60, left: 80 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Sample dataset
const philosophers = [
    { name: "Plato", birthYear: -427, outgoingRefs: 0, incomingRefs: 0 },
    { name: "Aristotle", birthYear: -384, outgoingRefs: 0, incomingRefs: 0 },
    { name: "Descartes", birthYear: 1596, outgoingRefs: 0, incomingRefs: 0 },
    { name: "Leibniz", birthYear: 1646, outgoingRefs: 0, incomingRefs: 0 },
    { name: "Newton", birthYear: 1643, outgoingRefs: 0, incomingRefs: 0 },
    { name: "Hume", birthYear: 1711, outgoingRefs: 0, incomingRefs: 0 },
    { name: "Kant", birthYear: 1724, outgoingRefs: 0, incomingRefs: 0 },
    { name: "Hegel", birthYear: 1770, outgoingRefs: 0, incomingRefs: 0 },
    { name: "Marx", birthYear: 1818, outgoingRefs: 0, incomingRefs: 0 },
    { name: "Nietzsche", birthYear: 1844, outgoingRefs: 0, incomingRefs: 0 },
    { name: "Russell", birthYear: 1872, outgoingRefs: 0, incomingRefs: 0 },
    { name: "Wittgenstein", birthYear: 1889, outgoingRefs: 0, incomingRefs: 0 },
    { name: "Heidegger", birthYear: 1889, outgoingRefs: 0, incomingRefs: 0 },
    { name: "Sartre", birthYear: 1905, outgoingRefs: 0, incomingRefs: 0 }
];

// Reference matrix (who references whom)
// rows: referencing philosopher, columns: referenced philosopher
const referenceMatrix = [
    //Plat,Aris,Desc,Leib,Newt,Hume,Kant,Hege,Marx,Niet,Russ,Witt,Heid,Sart
    [0,   10,  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0  ], // Plato
    [5,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0  ], // Aristotle
    [8,   12,  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0  ], // Descartes
    [3,   7,   15,  0,   8,   0,   0,   0,   0,   0,   0,   0,   0,   0  ], // Leibniz
    [0,   4,   6,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0  ], // Newton
    [2,   5,   10,  4,   6,   0,   0,   0,   0,   0,   0,   0,   0,   0  ], // Hume
    [6,   8,   12,  9,   3,   15,  0,   0,   0,   0,   0,   0,   0,   0  ], // Kant
    [10,  12,  8,   6,   0,   5,   15,  0,   0,   0,   0,   0,   0,   0  ], // Hegel
    [4,   6,   0,   0,   0,   0,   8,   20,  0,   0,   0,   0,   0,   0  ], // Marx
    [12,  8,   0,   0,   0,   4,   10,  15,  6,   0,   0,   0,   0,   0  ], // Nietzsche
    [5,   8,   4,   3,   2,   10,  6,   4,   5,   3,   0,   0,   0,   0  ], // Russell
    [4,   6,   2,   0,   0,   3,   8,   2,   0,   4,   12,  0,   0,   0  ], // Wittgenstein
    [8,   6,   0,   0,   0,   0,   12,  10,  4,   15,  0,   3,   0,   0  ], // Heidegger
    [3,   2,   0,   0,   0,   0,   6,   8,   10,  12,  0,   0,   15,  0  ]  // Sartre
];

// Calculate total outgoing and incoming references
philosophers.forEach((phil, i) => {
    // Sum row for outgoing references
    phil.outgoingRefs = referenceMatrix[i].reduce((a, b) => a + b, 0);
    
    // Sum column for incoming references
    phil.incomingRefs = referenceMatrix.reduce((sum, row) => sum + row[i], 0);
 });
 
 // Create main SVG
 const svg = d3.select('#visualization')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
 
 // Create a group for the visualization area with margins
 const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
 
 // Create scales
 const xScale = d3.scaleLinear()
    .domain([
        d3.min(philosophers, d => d.birthYear),
        d3.max(philosophers, d => d.birthYear)
    ])
    .range([0, innerWidth])
    .nice();
    
 const yScale = d3.scaleLinear()
    .domain([0, d3.max(philosophers, d => d.outgoingRefs)])
    .range([innerHeight, 0])
    .nice();
 
 // Add gridlines
 const xGrid = g.append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(0,${innerHeight})`);
    
 const yGrid = g.append('g')
    .attr('class', 'grid');
    
 xGrid.call(d3.axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickFormat('')
 );
 
 yGrid.call(d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickFormat('')
 );
 
 // Add axes
 const xAxis = g.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScale));
    
 const yAxis = g.append('g')
    .attr('class', 'axis')
    .call(d3.axisLeft(yScale));
 
 // Add axis labels
 xAxis.append('text')
    .attr('class', 'axis-label')
    .attr('x', innerWidth / 2)
    .attr('y', 40)
    .style('text-anchor', 'middle')
    .text('Birth Year');
    
 yAxis.append('text')
    .attr('class', 'axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -innerHeight / 2)
    .attr('y', -60)
    .style('text-anchor', 'middle')
    .text('Total Outgoing References');
 
 // Add text labels above points
 g.selectAll('.author-label')
    .data(philosophers)
    .enter()
    .append('text')
    .attr('class', 'author-label')
    .attr('x', d => xScale(d.birthYear))
    .attr('y', d => yScale(d.outgoingRefs) - 10)
    .attr('text-anchor', 'middle')
    .style('fill', '#333')
    .style('font-size', '12px')
    .text(d => d.name);
 
 // Add small points (always visible)
 g.selectAll('.author-point')
    .data(philosophers)
    .enter()
    .append('circle')
    .attr('class', 'author-point')
    .attr('cx', d => xScale(d.birthYear))
    .attr('cy', d => yScale(d.outgoingRefs))
    .attr('r', 3)
    .style('fill', 'black')
    .style('opacity', 1);
 
 // Add arrow marker definitions
 svg.append("defs").append("marker")
    .attr("id", "arrowhead")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", 0)
    .attr("markerWidth", 4)
    .attr("markerHeight", 4)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("class", "arrowhead");
 
 // Add arrow marker for hover state
 svg.append("defs").append("marker")
    .attr("id", "arrowhead-hover")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", 0)
    .attr("markerWidth", 4)
    .attr("markerHeight", 4)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("class", "arrowhead-hover");
 
 // Add larger bubbles
 g.selectAll('.author-bubble')
    .data(philosophers)
    .enter()
    .append('circle')
    .attr('class', 'author-bubble')
    .attr('cx', d => xScale(d.birthYear))
    .attr('cy', d => yScale(d.outgoingRefs))
    .attr('r', d => Math.sqrt(d.incomingRefs) * 2 + 5)
    .style('fill', 'steelblue')
    .style('opacity', 0.4)
    .on('mouseover', function(event, d) {
        d3.select(this)
            .style('opacity', 0.7)
            .attr('r', d => Math.sqrt(d.incomingRefs) * 2 + 7);
    })
    .on('mouseout', function(event, d) {
        d3.select(this)
            .style('opacity', 0.4)
            .attr('r', d => Math.sqrt(d.incomingRefs) * 2 + 5);
    })
    .append('title')
    .text(d => `${d.name}\nBirth Year: ${d.birthYear}\nOutgoing References: ${d.outgoingRefs}\nIncoming References: ${d.incomingRefs}`);
 
 // Draw all reference lines initially
 referenceMatrix.forEach((row, i) => {
    row.forEach((refs, j) => {
        if (refs > 0 && i !== j) {
            const source = philosophers[i];
            const target = philosophers[j];
            const reverseRefs = referenceMatrix[j][i];
            
            const sourceX = xScale(source.birthYear);
            const sourceY = yScale(source.outgoingRefs);
            const targetX = xScale(target.birthYear);
            const targetY = yScale(target.outgoingRefs);
            
            const curveOffset = 50;
            let midY;
            
            if (reverseRefs > 0) {
                midY = (sourceY + targetY) / 2 - curveOffset;
            } else {
                midY = (sourceY + targetY) / 2 - curveOffset;
            }
            
            const midX = (sourceX + targetX) / 2;
            
            const path = d3.path();
            path.moveTo(sourceX, sourceY);
            
            if (reverseRefs > 0 && i > j) {
                midY = (sourceY + targetY) / 2 + curveOffset;
            }
            
            path.quadraticCurveTo(midX, midY, targetX, targetY);
            
            g.append("path")
                .attr("d", path.toString())
                .attr("class", "reference-line")
                .style("fill", "none")
                .style("stroke", "rgba(100, 100, 100, 0.2)")
                .style("stroke-width", Math.log(refs) + 1)
                .attr("marker-end", "")
                .attr("data-refs", refs)  // Store reference count for threshold filtering
                .on("mouseover", function() {
                    d3.select(this)
                        .style("stroke", "rgba(100, 100, 100, 0.8)")
                        .attr("marker-end", "url(#arrowhead-hover)");
                })
                .on("mouseout", function() {
                    d3.select(this)
                        .style("stroke", "rgba(100, 100, 100, 0.2)")
                        .attr("marker-end", "");
                })
                .append("title")
                .text(`${source.name} references ${target.name} ${refs} times`);
        }
    });
 });
 
 // Set up slider interaction
 const slider = document.getElementById('threshold');
 const thresholdDisplay = document.getElementById('threshold-value');
 
 slider.addEventListener('input', function() {
    const threshold = parseInt(this.value);
    thresholdDisplay.textContent = threshold;
    
    // Update line visibility based on threshold
    d3.selectAll('.reference-line')
        .style('display', function() {
            const refs = parseInt(this.getAttribute('data-refs'));
            return refs >= threshold ? 'block' : 'none';
        });
 });