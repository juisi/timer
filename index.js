const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const timerCircle = document.querySelector("#timerCircle");
// calculate the perimeter from the circle radius
const perimeter = timerCircle.getAttribute("r") * 2 * Math.PI;
// intialize stroke dash value dynamically based on perimeter pixels
timerCircle.setAttribute("stroke-dasharray", perimeter);
// Want to initialize the graphic with zero stroke dash offset (in pixels)
let currentOffset = 0;
// define a global var for storing the duration (of remaining time) so it can be used in onTick()
let currentDuration;
// pass in (event callbacks wrapped in an object )
const timerApp = new Timer(durationInput, startButton, pauseButton, {
  // pass in additional callbacks that can be referenced from the app and pass in values
  onStart(totalDuration) {
    console.log("start timer with perimeter pixels: ", perimeter);
    // initialize with a value from total duration (from the parameter value that is calculated in the app)
    currentDuration = totalDuration;
  },
  onTick(timeRemaining) {
    // calculate current offset by perimeter and duration.
    // current offset = perimeter * time remaining = pixels related to the  (duration or Totalduration) -perimeter
    // first the relation of total pixels (for example 1193) to remaining time (start with for example 30s)
    // divide by current (remaining) duration (start with for example 30s)
    // subtrack the total perimeter pixels.
    // To start with the stroke pixels should be 0 and adding to it on every tick
    // so on each tick, the dividing value decreases -> pixel value of the stroke increases
    currentOffset = (perimeter * timeRemaining) / currentDuration - perimeter;
    console.log("current stroke offset in pixels: ", currentOffset);
    timerCircle.setAttribute("stroke-dashoffset", currentOffset);
  },
  onPause() {
    console.log("running the passed in callback onPause()");
  },
  onComplete() {
    console.log("running the passed in callback onComplete()");
  },
});
