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
 
 // Track selected philosophers
 const selectedPhilosophers = new Set(philosophers.map(p => p.name));
 
 // Create checkboxes
 const checkboxContainer = document.getElementById('philosopher-checkboxes');
 philosophers.forEach(phil => {
    const label = document.createElement('label');
    label.style.display = 'inline-block';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    checkbox.value = phil.name;
    
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            selectedPhilosophers.add(this.value);
        } else {
            selectedPhilosophers.delete(this.value);
        }
        // Force update of reference lines by updating threshold
        const threshold = parseInt(slider.value);
        thresholdDisplay.textContent = threshold;
        updateVisualization();
    });
    
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(` ${phil.name}`));
    checkboxContainer.appendChild(label);
 });
 
 // Add this function to update the visualization
 function updateVisualization() {
    // Calculate reference counts first
    const visibleOutgoingRefs = philosophers.map(phil => {
        if (!selectedPhilosophers.has(phil.name)) return 0;
        
        return philosophers.reduce((total, target) => {
            if (!selectedPhilosophers.has(target.name)) return total;
            const sourceIndex = philosophers.findIndex(p => p.name === phil.name);
            const targetIndex = philosophers.findIndex(p => p.name === target.name);
            return total + referenceMatrix[sourceIndex][targetIndex];
        }, 0);
    });

    const visibleIncomingRefs = philosophers.map(phil => {
        if (!selectedPhilosophers.has(phil.name)) return 0;
        
        return philosophers.reduce((total, source) => {
            if (!selectedPhilosophers.has(source.name)) return total;
            const sourceIndex = philosophers.findIndex(p => p.name === source.name);
            const targetIndex = philosophers.findIndex(p => p.name === phil.name);
            return total + referenceMatrix[sourceIndex][targetIndex];
        }, 0);
    });

    const selectedPhilosopherData = philosophers.filter(p => selectedPhilosophers.has(p.name));
    
    // Update scales using the pre-calculated values
    xScale.domain([
        d3.min(selectedPhilosopherData, d => d.birthYear),
        d3.max(selectedPhilosopherData, d => d.birthYear)
    ]).nice();
    
    yScale.domain([0,
        d3.max(visibleOutgoingRefs)
    ]).nice();

    // Update all visual elements using the pre-calculated values
    // ... rest of the function remains the same, using visibleOutgoingRefs and visibleIncomingRefs ...

    // Update axes
    yAxis.transition()
        .duration(750)
        .call(d3.axisLeft(yScale));
    
    xAxis.transition()
        .duration(750)
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale));

    // Update points with new y positions
    g.selectAll('.author-point')
        .transition()
        .duration(750)
        .attr('cx', d => xScale(d.birthYear))
        .attr('cy', (d, i) => yScale(visibleOutgoingRefs[i]))
        .style('display', d => selectedPhilosophers.has(d.name) ? 'block' : 'none');

    // Update bubbles with new sizes and positions
    g.selectAll('.author-bubble')
        .transition()
        .duration(750)
        .attr('cx', d => xScale(d.birthYear))
        .attr('cy', (d, i) => yScale(visibleOutgoingRefs[i]))
        .attr('r', (d, i) => Math.sqrt(visibleIncomingRefs[i]) * 2)
        .style('display', d => selectedPhilosophers.has(d.name) ? 'block' : 'none');

    // Update labels
    g.selectAll('.author-label')
        .transition()
        .duration(750)
        .attr('x', d => xScale(d.birthYear))
        .attr('y', (d, i) => yScale(visibleOutgoingRefs[i]) - 10)
        .style('display', d => selectedPhilosophers.has(d.name) ? 'block' : 'none');

    // Update reference lines with new positions
    g.selectAll('.reference-line')
        .transition()
        .duration(750)
        .attr('d', function() {
            const title = this.querySelector('title').textContent;
            const [source, ...rest] = title.split(' references ');
            const target = rest.join(' references ').split(' ')[0];
            const refs = parseInt(this.getAttribute('data-refs'));
            const threshold = parseInt(slider.value);
            
            // Only create path if both philosophers are selected and above threshold
            if (!selectedPhilosophers.has(source) || 
                !selectedPhilosophers.has(target) || 
                refs < threshold) {
                return null;  // This will effectively hide the path
            }
            
            const sourceIndex = philosophers.findIndex(p => p.name === source);
            const targetIndex = philosophers.findIndex(p => p.name === target);
            
            const sourceX = xScale(philosophers[sourceIndex].birthYear);
            const sourceY = yScale(visibleOutgoingRefs[sourceIndex]);
            const targetX = xScale(philosophers[targetIndex].birthYear);
            const targetY = yScale(visibleOutgoingRefs[targetIndex]);
            
            // Handle bidirectional references
            const reverseRefs = referenceMatrix[targetIndex][sourceIndex];
            
            if (reverseRefs > 0 && source > target) {
                // Adjust curve for bidirectional references
                const midY = (sourceY + targetY) / 2 + 50;
                const path = d3.path();
                path.moveTo(sourceX, sourceY);
                path.quadraticCurveTo((sourceX + targetX) / 2, midY, targetX, targetY);
                return path.toString();
            } else {
                // Standard curve
                const midY = (sourceY + targetY) / 2 - 50;
                const path = d3.path();
                path.moveTo(sourceX, sourceY);
                path.quadraticCurveTo((sourceX + targetX) / 2, midY, targetX, targetY);
                return path.toString();
            }
        })
        .style('display', function() {
            const title = this.querySelector('title').textContent;
            const [source, ...rest] = title.split(' references ');
            const target = rest.join(' references ').split(' ')[0];
            const refs = parseInt(this.getAttribute('data-refs'));
            const threshold = parseInt(slider.value);
            
            return (selectedPhilosophers.has(source) && 
                    selectedPhilosophers.has(target) && 
                    refs >= threshold) ? 'block' : 'none';
        });
 }
 
 // Modify the slider event listener
 slider.addEventListener('input', function() {
    const threshold = parseInt(this.value);
    thresholdDisplay.textContent = threshold;
    updateVisualization();
 });