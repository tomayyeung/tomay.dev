// declare global variables
let clickingOnSwing = false;

const swingHead = {
    width: 100,
    height: 20
};
let swingHeadRect;
let swingHeadPath;

const swingPlank = {
    width: 90,
    height: 20
};
let swingPlankRect;
let swingPlankPath;

const ropeLength = 200;
const ropeResolution = 100; // # of points in the rope path
let leftRopeTop; // 10 pixels from the left of the swing head
let leftRopeBottom; // 5 pixels from the left of the swing plank
let rightRopeTop; // 10 pixels from the right of the swing head
let rightRopeBottom; // 5 pixels from the right of the swing plank

/**
 * 
 * @param {paper.Point} A 
 * @param {paper.Point} B 
 * @param {Number} s rope length
 * @returns 
 */
function ropePath(A, B, s) {
    let points = [];

    // p1 is left, p2 is right
    let p1, p2;
    if (A.x < B.x) {
        p1 = A, p2 = B;
    } else {
        p1 = B, p2 = A;
    }
    
    let d = p2.x - p1.x; // horizontal distance
    let h = Math.abs(p1.y - p2.y); // vertical distance

    if (d < 2) { // close enough, draw a vertical line
        points.push(new paper.Point(p1.x, p2.y));
        points.push(new paper.Point(p1.x, p2.y));

        // add extra length underneath
        if (p1.y < p2.y) {
            points.push(new paper.Point(p1.x, p1.y + (s-h)/2));
        } else {
            points.push(new paper.Point(p2.x, p2.y + (s-h)/2));
        }

        return points;
    } else if (h < 2) { // close enough, do a normal cosh
        let k = d/2;
        let a = Math.abs(newtons((x) => 2*x*Math.sinh(k/x)-s, 0.8*k, 0.5, 200)); // get an estimate of a
        console.log(a);
        const ropePathFunc = (x) => a*Math.cosh((x-k-p1.x)/a); // shift function back horizontally

        let step = ropeResolution/d;
        for (let i = p1.x; i <= p2.x; i += step) { // add points according to function
            // flip y because of canvas coordinates -> y increases downwards
            let y = ropePathFunc(i);
            let diff = p1.y - y;
            y += 2*diff;
            points.push(new paper.Point(i, y));
        }

        return points;
    } else {
        let a = newtons((x) => ropePathFuncGeneral(x, d, h, s), s, 2, 100); // get an estimate of a
        let x1 = (a*Math.log((s+h)/(s-h))-d)/2;

        // temp rope path to calculate vertical shift
        const tempRopePathFunc = (x) => a*Math.cosh((x+x1/a));
        let yShift = p1.y - tempRopePathFunc(0);

        // fill up an array with points based on our final function
        const ropePathFunc = (x) => tempRopePathFunc(x) + yShift;
        for (let i = p1.x; i <= p2.x; i++) {
            points[i] = new paper.Point(i, ropePathFunc(i));
        }

        return points;
    }
}

/**
 * 
 * @param {Number} a rope constant that determines the shape of the rope
 * @param {Number} d horizontal distance
 * @param {Number} h vertical distance
 * @param {Number} s rope length
 * @returns rope path function
 */
function ropePathFuncGeneral(a, d, h, s) { // roots of this function (what values of a make it 0)
    return 2*a*Math.sinh(d/(2*a)) - Math.sqrt(s*s-h*h);
}

/**
 * 
 * @param {Function} f function to find derivative of
 * @param {Number} x point to find derivative at
 * @param {Number} H step size
 * @returns the derivative of f at x
 */
function derivative(f, x, H = 0.00001) {
    return (f(x+H) - f(x))/H;
}

/**
 * 
 * @param {Function} f - function to find root of
 * @param {Number} x0 - initial guess
 * @param {Number} tolerance - how close to the real root we want to get
 * @param {Number} maxIterations - maximum number of iterations before giving up
 * @returns - the root of the function
 */
function newtons(f, x0, tolerance, maxIterations) {
    let i = 0;
    let error = Number.POSITIVE_INFINITY;
    let x = x0;

    while (error > tolerance && i < maxIterations) {
        let fx = f(x);
        let dfx = derivative(f, x);
        let xNext = x - fx / dfx;
        console.log(`x: ${x}, fx: ${fx}, dfx: ${dfx}`);
        //console.log(xNext);
        error = Math.abs(xNext - x);
        x = xNext;
        i++;
    }

    if (i === maxIterations) {
        console.warn("newton method didn't converge :(");
    }

    console.log(x);

    return x;
}

function testNewtons() {
    const f = (x) => Math.cos(x) - x*x*x;
    let solution = newtons(f, 0.5, 0.00001, 100);
    console.log(solution);
}

function testRopePath() {
    // points
    let p1 = [100, 100];
    let p2 = [300, 100];
    let point1 = new paper.Point(p1);
    let point2 = new paper.Point(p2);
    let circle1 = new paper.Path.Circle(point1, 5);
    let circle2 = new paper.Path.Circle(point2, 5);
    circle1.fillColor = "blue";
    circle2.fillColor = "blue";

    // rope path
    let listOfPoints = ropePath(point1, point2, 300);
    console.log(listOfPoints);
    let rope = new paper.Path(listOfPoints);
    rope.strokeColor = "green";
    for (let point of listOfPoints) {
        //console.log(point.x, point.y);
    }
}

paper.install(window);
window.onload = function () {
    // setup canvas & paper
    paper.setup("demo-canvas");

    let tool = new paper.Tool();

    // swing head
    swingHeadRect = new paper.Rectangle(
        paper.view.center.x - swingHead.width/2, 
        paper.view.center.y - swingHead.height*3, 
        swingHead.width, swingHead.height
    );
    swingHeadPath = new paper.Path.Rectangle(swingHeadRect);
    swingHeadPath.strokeColor = "black";

    // swing plank
    swingPlankRect = new paper.Rectangle(
        paper.view.center.x - swingPlank.width/2,
        swingHeadRect.y + swingHeadRect.height + ropeLength,
        swingPlank.width, swingPlank.height
    );
    swingPlankPath = new paper.Path.Rectangle(swingPlankRect);
    swingPlankPath.strokeColor = "black";

    tool.onMouseDown = function(event) {
        clickingOnSwing = event.point.isInside(swingPlankRect);
    }

    tool.onMouseUp = function(event) {  
        clickingOnSwing = false;
    }

    tool.onMouseMove = function(event) {
        if (clickingOnSwing) {
            // move the swing plank
            swingPlankRect.point = swingPlankRect.point.add(event.delta);
            for (let segment of swingPlankPath.segments) { // move each segment individually
                segment.point = segment.point.add(event.delta);
            }

            // move ropes
            // set new bottom points
            leftRopeBottom.x = swingPlankRect.x + (swingPlankRect.width * 5/90), leftRopeBottom.y = swingPlankRect.y;
            rightRopeBottom.x = swingPlankRect.x + (swingPlankRect.width * 85/90), rightRopeBottom.y = swingPlankRect.y;
            /*leftRope.segments[1].point = leftRopeBottom;
            rightRope.segments[1].point = rightRopeBottom;*/
            // apply new rope path
            let leftRope = ropePath(leftRopeTop, leftRopeBottom, ropeLength);
            console.log(leftRope);
            let rightRope = ropePath(rightRopeTop, rightRopeBottom, ropeLength);
            leftRopePath.removeSegments();
            rightRopePath.removeSegments();
            for (let point of leftRope) {
                leftRopePath.add(point);
            }
            for (let point of rightRope) {
                rightRopePath.add(point);
            }
        }
    };

    // ropes
    leftRopeTop = new paper.Point(swingHeadRect.x + (swingHeadRect.width * 0.1), swingHeadRect.y + swingHeadRect.height); // constant
    leftRopeBottom = new paper.Point(swingPlankRect.x + (swingPlankRect.width * 5/90), swingPlankRect.y);
    rightRopeTop = new paper.Point(swingHeadRect.x + (swingHeadRect.width * 0.9), swingHeadRect.y + swingHeadRect.height); // constant
    rightRopeBottom = new paper.Point(swingPlankRect.x + (swingPlankRect.width * 85/90), swingPlankRect.y);
    // placeholder - just straight lines for now
    let leftRopePath = new paper.Path([leftRopeTop, leftRopeBottom]);
    leftRopePath.strokeColor = "red";
    let rightRopePath = new paper.Path([rightRopeTop, rightRopeBottom]);
    rightRopePath.strokeColor = "black";


    testRopePath();
    //testNewtons(); // newton's method works

    paper.view.draw();
}