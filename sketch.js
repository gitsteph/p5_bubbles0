var bg;
var barriers;
var bubbleManager;
var mouseHeld;
const startSize = 20;
var maxFrequency = 800;


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
    
    // instantiate oscillator
    env = new p5.Env();
    env.setADSR(.001, .2, .2, .5);
    env.setRange(1.0, 0.0);

    var osc = new p5.Oscillator();
    osc.setType('sine');
    osc.freq(maxFrequency); // freq should be proportional to radius; min: 200, max: 800
    osc.amp(env);
    osc.start(); // will want to clean up post-pop

    var newBubble = {
        'r': random(255),
        'g': random(255),
        'b': random(255),
        't': random(100, 200),
        'diameter': startSize,
        'matterBubble': matterBubble,
        'osc': osc,
        'env': env
    };
    bubbleManager.push(newBubble);
}

function draw() {
    matter.changeGravity(random(-.5, .5, 0.1), -.1);

    canvas = createCanvas(windowWidth * 0.98, windowHeight * 0.97);
    background(bg);

    cursor(HAND);
    for (var i = 0; i < bubbleManager.length; i++) {
        fill(bubbleManager[i].r, bubbleManager[i].g, bubbleManager[i].b, bubbleManager[i].t);
        stroke(bubbleManager[i].r + 20, bubbleManager[i].g + 20, bubbleManager[i].b + 20);
        if (mouseHeld == true && i == (bubbleManager.length - 1)) {
            var x = bubbleManager[i].matterBubble.getPositionX();
            var y = bubbleManager[i].matterBubble.getPositionY();
            matter.forget(bubbleManager[i].matterBubble);
            bubbleManager[i].diameter += 2;
            var frequencyExponent = 10-(bubbleManager[i].diameter-startSize)*.01;
            bubbleManager[i].osc.freq(Math.pow(2, Math.max(3, Math.min(10, frequencyExponent))));
            bubbleManager[i].matterBubble = matter.makeBall(x, y, bubbleManager[i].diameter);
        }
        ellipse(
            bubbleManager[i].matterBubble.getPositionX(),
            bubbleManager[i].matterBubble.getPositionY(),
            bubbleManager[i].matterBubble.getDiameter(),
            bubbleManager[i].matterBubble.getDiameter()
        )
    }
    textSize(50);
    fill(253, 95, 0, 200);
    stroke(253 - 50, 95 - 50, 0 - 50);
    text("make some bubbles!", 20, 50);
    if (bubbleManager.length > 2) {
        fill(249, 9, 178, 200);
        stroke(249 - 50, 9 - 50, 178 - 50);
        text("poke some existing bubbles!", 20, height - 50);
        textSize(25);
        text("(+ turn up the sound)", 20, height - 20);
    }
}

function mousePressed() {
    var popIt = false;
    var bubbleToPop;
    for (var i = 0; i < bubbleManager.length; i++) {
        var d = dist(mouseX, mouseY, bubbleManager[i].matterBubble.getPositionX(), bubbleManager[i].matterBubble.getPositionY());
        if (d < (bubbleManager[i].diameter / 2)) {
            popIt = true;
            bubbleToPop = i;
            break;
        }
    }
    if (popIt == true) {
        bubbleManager[bubbleToPop].env.play();
        matter.forget(bubbleManager[bubbleToPop].matterBubble);
        bubbleManager.splice(bubbleToPop, 1);
    } else {
        createBubble();
        mouseHeld = true;
    }
}

function mouseReleased() {
    mouseHeld = false;
}

// TODO: create sense of 3D depth, beyond xy collisions
