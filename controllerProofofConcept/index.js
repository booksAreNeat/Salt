//the js code needed to make a controler control a basic representation of a pepper on screen.
//canvas 
const canvas = document.getElementById("gameTestArea");
const ctx = canvas.getContext("2d");


// Pepper cube variables
let pepperWidthAndHeight = 0;
let pepperX = 0; 
let pepperY = 0;
let pepperColour = "#ff9500ff";
let velocity = 0;
let pepperVisionConeAngle = 0;
let pepperVisionColour = "white";


//controler button variables 
let controllerIndex = null;

let leftStickUpPressed = false; 
let leftStickRightPressed = false;
let leftStickDownPressed = false;
let leftStickLeftPressed = false;
let leftStickPressed = false;

let aPressed = false;
let bPressed = false;
let xPressed = false;
let yPressed = false;

let rightStickUpPressed = false;
let rightStickRightPressed = false; 
let rightStickDownPressed = false;
let rightStickLeftPressed = false;
let rightStickPressed = false;

let dPadUpPressed = false;
let dPadRightPressed = false;
let dPadDownPressed = false;
let dPadLeftPressed = false;

let leftBumperPressed = false;
let rightBumperPressed = false;

let leftTriggerPressed = false;
let rightTriggerPressed = false;

let squaresPressed = false;
let hamburgerPressed = false;


//canvas setup function - alows canvas to scale with window size and assigns variables to the Pepper in relation to the canvas dimentions
function setupCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    pepperWidthAndHeight = canvas.width * 0.1;
    velocity =canvas.width * 0.01;

    pepperX = (canvas.width - pepperWidthAndHeight) / 2;
    pepperY = (canvas.height - pepperWidthAndHeight) / 2;

}

setupCanvas();

//alows the canvas to scale with window size.
window.addEventListener("resize", setupCanvas);


//ensures that i havent just made ms paint by refreshing the 'background'
function clearScreen(){
    ctx.fillStyle = "#333331";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


//this didnt work when i put it up at the top so it lives here. 
let pepperBrightness = pepperWidthAndHeight*2;


//function that contains the canvas things that make pepper exist 
function drawPepper(){
    ctx.save();

    //make pepper spinnable
    ctx.translate(pepperX, pepperY);
    ctx.rotate(pepperVisionConeAngle);

    //make peppers vision cone
    ctx.beginPath();
    ctx.moveTo(0, pepperWidthAndHeight /2);
    ctx.lineTo(pepperWidthAndHeight/2, -pepperBrightness)
    ctx.lineTo(-pepperWidthAndHeight/2, -pepperBrightness);
    ctx.closePath();
    ctx.fillStyle = pepperVisionColour;
    ctx.fill();

    //make pepper visible and label her
    ctx.fillStyle = pepperColour;
    ctx.fillRect(- pepperWidthAndHeight/2, -pepperWidthAndHeight / 2, pepperWidthAndHeight, pepperWidthAndHeight);
    ctx.font = "25px Arial";
    ctx.textAlign ="center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx.fillText("PEPPER",  0, 0)

    ctx.restore();
}



//gamepad API tie in 
window.addEventListener("gamepadconnected", (event) => {
    controllerIndex = event.gamepad.index;
    console.log("gamepad Connected")
});

window.addEventListener("gamepaddisconnected", (event) => {
    controllerIndex = null;
    console.log("gamepad Disconnected")
})

//how inputs become actions - not a self help book.
function gamepadInput(){
    if(controllerIndex !== null){
        const gamepad = navigator.getGamepads()[controllerIndex];
        //console.log(gamepad);
        const buttons = gamepad.buttons

        //left stick
        const leftStickDeadZone = 0.4;
        const leftStickLeftRightValue = gamepad.axes[0];

        if(leftStickLeftRightValue >= leftStickDeadZone){
            leftStickRightPressed = true;
        }
        else if(leftStickLeftRightValue <=  - leftStickDeadZone) {
            leftStickLeftPressed = true;
        }else{
            leftStickRightPressed = false;
            leftStickLeftPressed = false;
        }
        
        const leftStickUpDownValue = gamepad.axes[1];

        if(leftStickUpDownValue >= leftStickDeadZone) {
            leftStickDownPressed = true;
        }
        else if(leftStickUpDownValue <= - leftStickDeadZone) {
            leftStickUpPressed = true;
        }else{
            leftStickDownPressed = false;
            leftStickUpPressed = false;
        }

        //rightStick
        const rightStickDeadZone = 0.4;
        const rightStickLeftRightValue = gamepad.axes[2];

        if(rightStickLeftRightValue >= rightStickDeadZone) {
            rightStickRightPressed = true;
        }else if (rightStickLeftRightValue <= - rightStickDeadZone) {
            rightStickLeftPressed = true;
        }else{
            rightStickRightPressed = false;
            rightStickLeftPressed = false;
        }

        const rightStickUpDownValue = gamepad.axes[3];

        if(rightStickUpDownValue >= rightStickDeadZone) {
            rightStickDownPressed = true;
        }else if(rightStickUpDownValue <= - rightStickDeadZone) {
            rightStickUpPressed = true;
        }else{
            rightStickDownPressed = false;
            rightStickUpPressed = false;
        }

        // A, B, X, Y buttons
        aPressed = buttons[0].pressed;
        bPressed = buttons[1].pressed;
        xPressed = buttons[2].pressed;
        yPressed = buttons[3].pressed;

        // left and right bumpers 
        leftBumperPressed = buttons[4].pressed;
        rightBumperPressed = buttons[5].pressed;

        //left and right triggers
        leftTriggerPressed = buttons[6].pressed;
        rightTriggerPressed = buttons[7].pressed;

        //squares and hamburger buttons
        squaresPressed = buttons[8].pressed;
        hamburgerPressed = buttons[9].pressed;

        //left and right stick center push buttons
        leftStickPressed = buttons[10].pressed;
        rightStickPressed = buttons[11].pressed;

        //dPad buttons
        dPadUpPressed = buttons[12].pressed;
        dPadDownPressed = buttons[13].pressed;
        dPadLeftPressed = buttons[14].pressed;
        dPadRightPressed = buttons[15].pressed;

    }
}


//move Pepper using leftStick
function movePepperWithLeftStick(){
    if(leftStickUpPressed){
        pepperY -= velocity;
    }
    if(leftStickDownPressed){
        pepperY += velocity;
    }
    if(leftStickLeftPressed){
        pepperX -= velocity;
    }
    if(leftStickRightPressed){
        pepperX += velocity;
    }
}

//move Pepper with dpad
function movePepper(){
    if(dPadUpPressed) {
        pepperY -= velocity;
    }
    if(dPadDownPressed) {
        pepperY += velocity;
    }
    if(dPadLeftPressed) {
        pepperX -= velocity;
    }
    if(dPadRightPressed) {
        pepperX += velocity;
    }
}

//rotates pepper and extends retracts her vision cone using the right stick push in to reset also bounds the max and min her vision cone can extend 
function rotatePepper(){
    if(rightStickRightPressed){
        pepperVisionConeAngle +=0.025;
    }
    if(rightStickLeftPressed){
        pepperVisionConeAngle -=0.025;
    }
    if(rightStickUpPressed){
        pepperBrightness += pepperWidthAndHeight/10;
    }
    if(rightStickDownPressed) {
        pepperBrightness -= pepperWidthAndHeight/10;
    }
    if(rightStickPressed){
        pepperVisionConeAngle = 0;
        pepperBrightness = pepperWidthAndHeight*2;
    }
    pepperBrightness = Math.max(pepperWidthAndHeight/2, Math.min(pepperBrightness, pepperWidthAndHeight*3));
}


//uses the abxy buttons to change the colour of peppers vision cone and uses the squares and hamburger buttons to reset to default colours.
function changePepperColour(){
    if(aPressed){
        pepperVisionColour = "green";
    }
    if(bPressed) {
        pepperVisionColour = "red";
    }
    if(xPressed) {
        pepperVisionColour = "blue";
    }
    if(yPressed) {
        pepperVisionColour = "yellow";
    }
    if(hamburgerPressed) {
        pepperVisionColour = "white";
    }
    if(squaresPressed){
        pepperColour = "#ff9500ff";
    }
}

//update Pepper position on canvas
function updatePepper(){
    
    //call all the functions that make changes to pepper. 
    movePepperWithLeftStick();
    movePepper();
    rotatePepper();

    changePepperColour();
    
    //stops pepper flying off into the abyss like i did when i made this.
    const buffer = 20;
    pepperX = Math.max(buffer, Math.min(pepperX, canvas.width-buffer));
    pepperY = Math.max(buffer, Math.min(pepperY, canvas.height-buffer));
    
}

function gameLoop(){
    //console.log("gameloop is looping");
    //console.log(PepperWidthAndHeight)
    clearScreen();
    drawPepper();
    gamepadInput();
    updatePepper();
    requestAnimationFrame(gameLoop);
}

gameLoop();