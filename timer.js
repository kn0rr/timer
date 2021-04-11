class Timer {
    constructor (durationInput, startButton, pauseButton,callbacks){
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if(callbacks){
            this.onStart=callbacks.onStart;
            this.onTick=callbacks.onTick;
            this.onComplete=callbacks.onComplete;
        }
        // Because we want the "this" of the constructor to be used in start, we need to use an arrow function 
        this.startButton.addEventListener('click',this.start);
        this.pauseButton.addEventListener('click',this.pause);
    }
    start=()=> {
        clearInterval(this.interval);
        if(this.onStart){
            this.onStart(this.timeRemaining);
        }
         //To run tick immediatly
        this.tick();
        //run tick every second and safe the interval id in timer and safe it in this
        this.interval = setInterval(this.tick,20);
        
    }
    pause = () => {
        clearInterval(this.interval);
    }
    onDurationChange() {

    }
    tick = () => {
        if(this.timeRemaining<=0){
            this.pause();
            if (this.onComplete){
                this.onComplete();
            }
        }
        else {
        this.timeRemaining=this.timeRemaining-.02;
        if (this.onTick){
            this.onTick(this.timeRemaining);
        }
        }
    }
    // define getter and setter
    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }
    
    set timeRemaining(time) {
        return this.durationInput.value=time.toFixed(2);
    }
}