var bubbleManager;
const startSize = 100;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0, 300, 300, 100);
    bubbleManager = new Array();
}

function createBubble() {
	var newBubble = {
		'r': random(255),
		'g': random(255),
		'b': random(255),
		't': random(100, 200),
		'x': mouseX,
		'y': mouseY,
		'bubbleSize': startSize
	};
	bubbleManager.push(newBubble);
}

function draw() {
    for (var i = 0; i < bubbleManager.length; i++) {
    	fill(bubbleManager[i].r, bubbleManager[i].g, bubbleManager[i].b, bubbleManager[i].t);
    	ellipse(bubbleManager[i].x, bubbleManager[i].y, bubbleManager[i].bubbleSize, bubbleManager[i].bubbleSize);
    } 
}

function mousePressed() {
	createBubble();
}

// TODO: create sense of 3D depth, beyond xy collisions
// TODO: enable growing size
// TODO: implement bubble physics
