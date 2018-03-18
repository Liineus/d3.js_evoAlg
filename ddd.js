          // Number of Nodes
var nNodes = 1,
    createLink = false;

// Dataset Structure
var data = {nodes: [], links: []};


// Iterate in the nodes
for (var k = 0; k < nNodes; k += 1) {
    // Create a node with a random radius.
    data.nodes.push({radius: Math.floor(Math.random() * (20 - 8 + 1)) + 8,
    linksN: 0,
	isaParent: 1,
    nodeNumber: k,
	cr: 'hsl(' + 360 * Math.random() + ', 50%, 50%)'})
	

	
    // Create random links to the node.
    for (var j = k + 1; j < nNodes; j += 1) {

        // Only create links if the indexes are closer, with probability 0.1
        createLink = (Math.random() < 0.2) && (Math.abs(k - j) < 10);

        if (createLink) {
            // Append a link with variable distance between the nodes.
            data.links.push({
                source: k,
                target: j,
                dist: 10 * Math.abs(k - j) + 10
            });
            data.nodes[k].linksN++;


        }
    }
}


// Figure width and height
var width = innerWidth;
    height = innerHeight-100;

// Create and configure the force layout
var force = d3.layout.force()
    .size([width, height])
    .nodes(data.nodes)
    .charge(function(d) { return -1 * d.radius * d.radius; })
    .linkDistance(function(d) { return d.dist; })
    .links(data.links)
    .start();

// Create a canvas element and set its size.
var canvas = d3.select('div#canvas-force').append('canvas')
    .attr('width', width + 'px')
    .attr('height', height + 'px')
	.style("background-color", 'black')
    .node();

// Get the canvas context.
var context = canvas.getContext('2d');


force.on('tick', function() {
    // Clear the complete figure.
    context.clearRect(0, 0, width, height);

    // Draw the links
    data.links.forEach(function(d) {
        // Draw a line from source to target
        context.beginPath();
        context.moveTo(d.source.x, d.source.y);
        context.lineTo(d.target.x, d.target.y);
        context.stroke();
    });

    // Draw the nodes
    data.nodes.forEach(function(d, i) {
        // Draws a complete arc for each node.
        context.beginPath();
        context.arc(d.x, d.y, d.radius, 0, 2 * Math.PI, true);
		context.fillStyle = d.cr;
		if (d.linksN <= 2) {
			context.strokeStyle = 'grey';
		} else {
			context.strokeStyle = 'yellow';
		}
        context.fill();
    });
});

document.getElementById("NG").style.height = "30px";
document.getElementById("NG").style.width = "170px";
var counter = 0;

setInterval(function(){
  // ...
  force.start();
}, 1000);

function buttonClick() {

    

	var randomN;
	var rep = 0;
	var poprep = 0;
	
	
    for (var k = 0; k < nNodes; k += 1) {
		
		if(data.nodes[k].linksN >10 || data.nodes[k].radius < 4)  { data.nodes[k].cr = 'white'; rep++ }
        if (data.nodes[k].linksN <= 10) {
			
			randomN = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
			
			for (var s = 0; s < randomN; s += 1) {
				
				if(s < 4 && data.nodes[k].radius >= 4) {
					data.nodes[k].linksN++;
					data.nodes.push({radius: (data.nodes[k].radius+1)/2,
									linksN: 0,
									isaParent: 0,
									nodeNumber: nNodes+k,
									cr: data.nodes[k].cr});
				
					
						data.links.push({
							source: k,
							target: data.nodes.length-1,
							dist: Math.floor(Math.random() * (40 - 20 + 1)) + 20
						});
						
						
						
				}
				if(s >= 1 && Math.floor(Math.random() * (1000 - 1 + 1)) + 1 < 2) {
					data.nodes[k].linksN++;
					data.nodes.push({radius: Math.floor(Math.random() * (10 - 4 + 1)) + 4,
									linksN: 0,
									isaParent: 1,
									nodeNumber: nNodes+k,
									cr: 'hsl(' + 360 * Math.random() + ', 50%, 50%)'});
				}
					
			}
        }
		
    }
    nNodes = data.nodes.length;
    console.log(nNodes + "Populacja");

	var btn = document.createElement("BUTTON");
	poprep = nNodes-rep;
    counter++;
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("Pokolenie" + counter + "\n\n" + " Populacja: " + nNodes + "\n\n" + " Zdolni do reprodukcji: " + poprep );
    btn.appendChild(t);
    btn.style.height = "120px";
    btn.style.width = "90px";
    document.body.appendChild(btn);

force = d3.layout.force()
    .size([width, height])
    .nodes(data.nodes)
	.on("tick", update);
}