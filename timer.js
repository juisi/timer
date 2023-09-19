class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    if (callbacks) {
      // set the class property (function) values by referencing the passed in callbacks
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onPause = callbacks.onPause;
      this.onComplete = callbacks.onComplete;
    }

    // set DOM references as class properties
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.timeRemaining;
    // and point related event listeners to callback methods
    // pass the return value of bind
    // (which is a new function with this pointing to class)
    this.startButton.addEventListener("click", this.start.bind(this));
    this.pauseButton.addEventListener("click", this.pause);
    this.durationInput.addEventListener("click", this.setDuration);
    this.intervalId;
  }
  // defining class methods like below is equivalent to "function start()" : But, no need to use bind with a class method syntax
  start(event) {
    if (this.onStart) {
      // pass the initial value of total duration
      this.onStart(this.timeRemaining);
    }
    // 1. manual tick instantly so don't need to wait the first interval
    this.timerTick();
    if (!this.intervalId) this.intervalId = setInterval(this.timerTick, 20); // set to 50 milliseconds
  }
  // arrow function makes binding unnecessary in this case
  // Also the get and set syntax allows the class .this inside the functions
  pause = (event) => {
    console.log("PAUSE this.intervalId", this.intervalId);
    clearInterval(this.intervalId);
    this.intervalId = undefined;
    this.onPause
      ? this.onPause()
      : "no action if optional callback wasn't passed to the constructor";
  };
  timerTick = () => {
    if (this.timeRemaining > 0) {
      this.timeRemaining = this.timeRemaining - 0.02; // subtrack 20 milliseconds, equivalent to the timer interval
      this.onTick
        ? // pass the value to the callback that was passed in on the initialization of the Timer
          this.onTick(this.timeRemaining)
        : "no action if optional callback wasn't passed to the constructor";
    } else {
      this.pause();
      this.onComplete
        ? this.onComplete()
        : "no action if optional callback wasn't passed to the constructor";
    }
  };
  // Use getter and setter "property"
  // (only) DOM element stores the data and is updated once the per interval
  set timeRemaining(value) {
    // round the value to 2 decimals before setting it to the DOM element
    this.durationInput.value = value.toFixed(2);
  }
  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }
}
