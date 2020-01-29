class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks){
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);

        //search for either enter key or focus out to change timer
        this.durationInput.addEventListener('keypress', this.durationChangeEnter);
        this.durationInput.addEventListener('focusout', this.changeDuration);
        this.timeRemaining = 10;
        this.updateTimerDisplay();
        this.timerActive = false;
    }
    //start timer ticking every 1s by default
    start = (event, refresh=50) => {
        if(!this.timerActive){
            if (this.onStart){
                this.onStart(this.timeRemaining);
            }
            this.tick(refresh/1000);

            this.timerID = setInterval(() => {
                this.tick(refresh/1000);
            }, refresh);
            this.timerActive = true;

        }

    }
    //scrap existing timer
    pause = () => {
        clearInterval(this.timerID);
        this.timerActive = false;
    }
    //update internal timer value based on time passed
    tick = (interval=1) => {

        this.timeRemaining -= interval;
        this.updateTimerDisplay();
        if (this.onTick){
            this.onTick(this.timeRemaining);
        }
        if(this.timeRemaining <= 0){
            this.onDurationComplete();
        }
    }

    //check if enter key was pressed
    durationChangeEnter = (e) => {
        if(e.key === 'Enter'){
            this.changeDuration();
        }
    }
    //update internal timer based on duration box value
    changeDuration = () => {
        this.timeRemaining = this.durationInput.value;
    }
    //update duration box value based on internal timer
    updateTimerDisplay = () => {
        this.durationInput.value = this.timeRemaining.toFixed(2);
    }
    //halt internal timer and reset negative time values if applicable
    onDurationComplete = () => {
        if (this.onComplete) {
            this.onComplete();
        }
        this.pause();
        this.timeRemaining = 0;
        this.updateTimerDisplay();
    }
}