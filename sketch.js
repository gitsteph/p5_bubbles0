var bg;
var barriers;
var bubbleManager;
var mouseHeld;
const startSize = 20;


function setup() {
    var canvas = createCanvas(windowWidth * 0.98, windowHeight * 0.97);
    bg = loadImage("./sang-huynh-357633-unsplash.jpg");
    // Photo by Sang Huynh on Unsplash

    // make barriers
    barriers = new Array();
    barriers.push(matter.makeBarrier(windowWidth / 2, windowHeight, windowWidth, 50)); // floor
    barriers.push(matter.makeBarrier(windowWidth / 2, 0, windowWidth, 50)); // ceiling
    barriers.push(matter.makeBarrier(0, windowHeight / 2, 50, windowHeight)); // leftWall
    barriers.push(matter.makeBarrier(windowWidth, windowHeight / 2, 50, windowHeight)); // rightWall

    bubbleManager = new Array();
    bubbleSizeTime = 0;
    mouseHeld = false;
    matter.zeroGravity();
    matter.changeGravity(random(-1, 1, 0.1), -.2);
}

function createBubble() {
    var matterBubble = matter.makeBall(mouseX, mouseY, startSize);
    var newBubble = {
        'r': random(255),
        'g': random(255),
        'b': random(255),
        't': random(100, 200),
        'diameter': startSize,
        'matterBubble': matterBubble
    };
    bubbleManager.push(newBubble);
}

function popBubble(targetBubble) {

}

function draw() {
    matter.changeGravity(random(-.5, .5, 0.1), -.1);

    canvas = createCanvas(windowWidth * 0.98, windowHeight * 0.97);
    background(bg);

    cursor(HAND);
    for (var i = 0; i < bubbleManager.length; i++) {
        fill(bubbleManager[i].r, bubbleManager[i].g, bubbleManager[i].b, bubbleManager[i].t);
        if (mouseHeld == true && i == (bubbleManager.length - 1)) {
            var x = bubbleManager[i].matterBubble.getPositionX();
            var y = bubbleManager[i].matterBubble.getPositionY();
            matter.forget(bubbleManager[i].matterBubble);
            bubbleManager[i].diameter += 2;
            bubbleManager[i].matterBubble = matter.makeBall(x, y, bubbleManager[i].diameter);
        }
        ellipse(
            bubbleManager[i].matterBubble.getPositionX(),
            bubbleManager[i].matterBubble.getPositionY(),
            bubbleManager[i].matterBubble.getDiameter(),
            bubbleManager[i].matterBubble.getDiameter()
        )
    }
    if (bubbleManager.length > 10) {
        fill(253,95,0, 200);
        stroke(20);
        textSize(50);
        text("poke some existing bubbles!", 20, height - 20);
    }
}

function mousePressed() {
    createBubble();
    mouseHeld = true;
}

function mouseReleased() {
    mouseHeld = false;
}

// TODO: create sense of 3D depth, beyond xy collisions
// TODO: implement bubble popping + sound
