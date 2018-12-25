let numbers = [true];
let count = 1;
let sequence = [];
let index = 0;
let arcs = [];
let biggest = 0;

/**
 * Options
 */
const SCALING = 8
const ANIMATE = true
const ANIMSPEED = 0.1
const COLORSPEED = 5

//Options for Envelope
var attackLevel = 1.0;
var releaseLevel = 0;

var attackTime = 0.001
var decayTime = 0.2;
var susPercent = 0.2;
var releaseTime = 0.5;


let osc;
let env;

class Arc {
  constructor(start, end, dir) {
    this.start = start;
    this.end = end;
    this.dir = dir;
  }
  show() {

    let diameter = abs(this.end - this.start);//next - index;
    let x = (this.end + this.start) / 2//(next + index) / 2;
    stroke(255);
    noFill();
    if (this.dir == 0) {
      arc(x, 0, diameter, diameter, PI, 0);

    }
    else
      arc(x, 0, diameter, diameter, 0, PI);

  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  numbers[index] = true;
  frameRate(5);
  sequence.push(index);

  env = new p5.Env();

  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);

  osc = new p5.Oscillator();

  osc.setType('sine');
  osc.amp(env);
  osc.start();

  env.play();
}
const step = () => {
  let next = index - count;
  if (next < 0 || numbers[next]) {
    next = index + count;
  }
  numbers[next] = true;
  sequence.push(next);
  let a = new Arc(index, next, count % 2);
  arcs.push(a);
  index = next;
  if (index > biggest)
    biggest = index;
  count++;
  let n = (index % 25) + 48;
  let freq = pow(2, ((n) - 49) / 12) * 440;
  osc.freq(freq);
  env.play()


}
function draw() {
  background(0);
  translate(0, height / 2);
  scale(width / biggest);
  step();
  for (let arc of arcs) {
    arc.show();

  }

}