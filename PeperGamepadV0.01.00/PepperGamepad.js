//js that links stuarts gamepad control to johns pepper control api - this should allow someone to controll pepper with an xbox controler. 

//canvas
const canvas = document.getElementById("pepperInstrumentPanel");
const ctx = canvas.getContext("2d");

//canvas variables
let iWidthHeight = 0;
let iSpaceing = 0;
let noOfinstrumentsInRow = 8;
let iLitColour = "#fff200ff";
let iUnlitColour = "#fff99e8a";
let iWarningColour = "#ff0000ff";
//let instrumentOutlineColour = "#c8c8c8ff";
let iTextColour = "#000000ff";
let iBackgroundColour = "#f2f2f2ff";


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

let xBoxPressed = false;


////pepper status variables
//shows the grip state of peppers grip
let leftHandGrip = false;
let leftGripColour = "#000000ff";

let rightHandGrip = false;
let rightGripColour = "#000000ff";


//shows the curent translation of pepper if any
let pepperTranslateForeward = false;
let translateForwardColour = "#000000ff";

let pepperTranslateRight = false;
let translateRightColour = "#000000ff";

let pepperTranslateBackward = false;
let translateBackwardColour = "#000000ff";

let pepperTranslateLeft = false;
let translateLeftColour = "#000000ff";

let pepperNotTranslating = false;
let notTranslatingColour = "#000000ff";

//shows the curent totation of pepper if any
let pepperRotateLeft = false;
let rotateLeftColour = "#000000ff";

let pepperRotateRight = false;
let rotateRightColour = "#000000ff";




//shows the curent power state of pepper 
let pepperIsAwake = true //nao.motion.robotIsWakeUp();
let pepperIsAtRest = !pepperIsAwake;
let isAwakeColour = "#000000ff";
let atRestColour = "#000000ff";



//canvas setup function - alows canvas to scale with window size and assigns variables to the Pepper in relation to the canvas dimentions
function setupCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    iWidthHeight = canvas.width * 0.1;
    iSpaceing = 10;
    //(canvas.width - (instrumentBlockWidthHeight * noOfinstrumentsInRow)) / (noOfinstrumentsInRow + 1);
    // velocity =canvas.width * 0.01;

    // pepperX = (canvas.width - pepperWidthAndHeight) / 2;
    // pepperY = (canvas.height - pepperWidthAndHeight) / 2;

}

setupCanvas();

//alows the canvas to scale with window size.
window.addEventListener("resize", setupCanvas);


//ensures that i havent just made ms paint by refreshing the 'background'
function clearScreen(){
    ctx.fillStyle = iBackgroundColour;
    ctx.fillRect(1, 1, canvas.width, canvas.height);
}


function drawPeppersInstrumentPanel(){

    ctx.save();
    //pepper is awake instrument light
    ctx.fillStyle = isAwakeColour;
    ctx.fillRect(100, 100, iWidthHeight, iWidthHeight);
    ctx.fillStyle = "#000000ff";
    ctx.font = "26px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("pepper is awake", 100 +iWidthHeight /2, 100+iWidthHeight /2);

    //pepper is at rest instrument light
    ctx.fillStyle = atRestColour;
    ctx.fillRect(200+iWidthHeight, 100, iWidthHeight, iWidthHeight);
    ctx.fillStyle = "#000000ff";
    ctx.font = "26px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("pepper is at rest", 200 + iWidthHeight*1.5, 100+iWidthHeight/2);

    //translation instuments =
    //translareforward
    ctx.fillStyle = translateForwardColour;
    ctx.fillRect(300+ iWidthHeight*2, 200 + iWidthHeight, iWidthHeight, iWidthHeight);
    ctx.fillStyle = "#000000ff";
    ctx.font = "26px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Translating foreward", 300 + iWidthHeight*2.5, 200+iWidthHeight*1.5);

    //rotatate right
    ctx.fillStyle = rotateRightColour;
    ctx.fillRect(400+ iWidthHeight*3, 200 + iWidthHeight, iWidthHeight, iWidthHeight);
    ctx.fillStyle = "#000000ff";
    ctx.font = "26px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("rotating Right", 400 + iWidthHeight*3.5, 200+iWidthHeight*1.5);

    //not translating
    ctx.fillStyle = notTranslatingColour;
    ctx.fillRect(300+ iWidthHeight*2, 300 + iWidthHeight*2, iWidthHeight, iWidthHeight);
    ctx.fillStyle = "#000000ff";
    ctx.font = "26px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("pepper is stationary", 300 + iWidthHeight*2.5, 300+iWidthHeight*2.5);

    //rotatinfg left
    ctx.fillStyle = rotateLeftColour;
    ctx.fillRect(200+iWidthHeight, 200+iWidthHeight, iWidthHeight, iWidthHeight);
    ctx.fillStyle = iTextColour;
    ctx.font ="26px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Rotating Left", 200+iWidthHeight*1.5, 200+iWidthHeight*1.5);

    //translartingbackwards
    ctx.fillStyle = translateLeftColour;
    ctx.fillRect(200+ iWidthHeight, 300+iWidthHeight*2, iWidthHeight, iWidthHeight)
    ctx.fillStyle = iTextColour;
    ctx.font ="26px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Translating Left", 200+iWidthHeight*1.5, 300+iWidthHeight*2.5);
    
    //translating right
    ctx.fillStyle = translateRightColour;
    ctx.fillRect(400+iWidthHeight*3, 300+iWidthHeight*2, iWidthHeight, iWidthHeight)
    ctx.fillStyle = iTextColour;
    ctx.font ="26px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Translating Right", 400+iWidthHeight*3.5, 300+iWidthHeight*2.5);

    //translating backward
    ctx.fillStyle = translateBackwardColour;
    ctx.fillRect(300+iWidthHeight*2, 400+iWidthHeight*3, iWidthHeight, iWidthHeight)
    ctx.fillStyle = iTextColour;
    ctx.font ="26px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Translating backward", 300+iWidthHeight*2.5, 400+iWidthHeight*3.5);


    //pepper grip 
    ctx.fillStyle = leftGripColour;
    ctx.fillRect(100, 200+iWidthHeight, iWidthHeight, iWidthHeight);
    ctx.fillStyle = iTextColour;
    ctx.font ="26px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Left Hand Gripping", 100+iWidthHeight*0.5, 200+iWidthHeight*1.5);

    ctx.fillStyle = rightGripColour;
    ctx.fillRect(500+iWidthHeight*4 ,200+iWidthHeight, iWidthHeight, iWidthHeight);
    ctx.fillStyle = iTextColour;
    ctx.font ="26px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Right Hand Gripping", 500+iWidthHeight*4.5, 200+iWidthHeight*1.5);

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

        //xbox button 
        xBoxPressed = buttons[16].pressed;

    }
}



//linking buttons to pepper - if its apocolypticly ugly but it works then leave me alone 

//using the left stick to translate pepper across the ground
function pepperGroundTranslation(){
    if(leftStickUpPressed){
        //nao.motion.move(vspeed, 0.0, 0.0);
        pepperTranslateForeward = true;
        console.log("pepper translating forward using left stick.");
    }else{
        pepperTranslateForeward = false;
    }
    if(leftStickRightPressed){
        //nao.motion.move(0.0, vspeed, 0.0);
        pepperTranslateRight = true;
        console.log("pepper is translating right.");
    }else{
        pepperTranslateRight = false;
    }
    if(leftStickDownPressed){
        //nao.motion.move(-vspeed, 0.0, 0.0);
        pepperTranslateBackward = true;
        console.log("pepper is translating backward.");
    }else{
        pepperTranslateBackward = false;
    }
    if(leftStickLeftPressed){
        //nao.motion.move(0.0, -vspeed, 0.0);
        pepperTranslateLeft = true;
        console.log("pepper is translating left.");
    }else{
        pepperTranslateLeft = false;
    }

        if(pepperTranslateForeward){
        translateForwardColour = iLitColour;
    }else{
        translateForwardColour = iUnlitColour;
    }
    if(pepperTranslateRight){
        translateRightColour = iLitColour;
    }else{
        translateRightColour = iUnlitColour;
    }
    if(pepperTranslateBackward){
        translateBackwardColour = iLitColour;
    }else{
        translateBackwardColour = iUnlitColour;
    }
    if(pepperTranslateLeft){
        translateLeftColour = iLitColour;
    }else{
        translateLeftColour = iUnlitColour;
    }

    if(!pepperTranslateForeward && !pepperTranslateRight && !pepperTranslateBackward && !pepperTranslateLeft){
        pepperNotTranslating = true;
    }else{
        pepperNotTranslating = false;
    }

    if(pepperNotTranslating){
        notTranslatingColour = iLitColour;
    }else{
        notTranslatingColour = iUnlitColour;
    }
}

function pepperRotates(){
    if(leftBumperPressed){
        //nao.motion.move(0.0, 0.0, vspeed);
        pepperRotateLeft = true;
        console.log("pepper's body is rotating left.", pepperRotateLeft);
    }else{
        pepperRotateLeft = false;
    }
    if(rightBumperPressed){
        //nao.motion.move(0.0, 0.0, -vspeed);
        pepperRotateRight = true;
        console.log("pepper's boddy is rotating right.")
    }else{
        pepperRotateRight = false;
    }


    if(pepperRotateLeft){
        rotateLeftColour = iLitColour;
    }else{
        rotateLeftColour = iUnlitColour;
    }
    if(pepperRotateRight){
        rotateRightColour = iLitColour;
    }else{
        rotateRightColour = iUnlitColour;
    }
}

function pepperGrips(){
    if(leftTriggerPressed){
        leftHandGrip = true;
        
            //actual grip logic cant test without a pepper
            // if(nao.motion.getAngles('LHand') < 1){
            //     nao.motion.openHand('LHand');
            //     leftHandGrip = false;
            // }
            // if(nao.motion.getAngles('LHand') > 0){
            //     nao.motion.closeHand('LHand');
            //     leftHandGrip = true;
            // }
    }else{
        leftHandGrip = false;
    }
    if(leftHandGrip){
        leftGripColour = iLitColour;
    }else{
        leftGripColour = iUnlitColour;
    }
    

    if(rightTriggerPressed){
        rightHandGrip = true;

            //see above
            // if(nao.motion.getAngles('RHand') < 1){
            //     nao.motion.openHand('RHand');
            //     rightHandGrip = false;
            // }
            // if(nao.motion.getAngles('RHand') > 0){
            //     nao.motion.closeHand('RHand');
            //     rightHandGrip = true;
            // }
    }else{
        rightHandGrip = false;
    }
    if(rightHandGrip){
        rightGripColour = iLitColour;
    }else{
        rightGripColour = iUnlitColour;
    }
    
            // earlier code that made griping a constant input but im not sure how that would work having read more of the NAOqi API its here incase its usefull later
            // if(leftTriggerPressed){
            //     nao.motion.closeHand('LHand');
            //     console.log("pepper's left hand is gripping. Release trigger to let go.");
            // }else if(!leftTriggerPressed){
            //     nao.motion.openHand('LHand');
            // }
            // if(rightTriggerPressed){
            //     nao.motion.closeHand('RHand');
            //     console.log("pepper's right hand is gripping. Release trigger to let go.");
            // }else if(!rightTriggerPressed){
            //     nao.motion.openHand('RHand');
            // }
}


//A, B, X, Y button use
function pepperABXY(){
    if(aPressed){
        pepperIsAwake = true;
        
        //pepperIsAwakeColour = instrumentWarningColour;
        console.log("button a pressed");
    }
    if(bPressed){
        pepperIsAwake = false;
        console.log("b button pressed.");
    }
    if(xPressed){
        
    }
    if(yPressed){
        
    }
}


// //dPad button use
// function pepperDPad(){
//     if(dPadUpPressed){

//     }
//     if(dPadRightPressed){

//     }
//     if(dPadDownPressed){

//     }
//     if(dPadLeftPressed){

//     }
// }


// //squares and hamburger buttons 
// function pepperSquaresHamburgers(){
//     if(squaresPressed){

//     }
//     if(hamburgerPressed){

//     }
// }

function updatePepper(){
    pepperABXY();
    pepperGroundTranslation();
    pepperRotates();
    pepperGrips();

    if(pepperIsAwake){
        isAwakeColour = iLitColour;
        atRestColour = iUnlitColour;
    }else{
        isAwakeColour = iUnlitColour;
        atRestColour = iLitColour;
    }



}

function gameLoop(){
    clearScreen();
    drawPeppersInstrumentPanel();
    gamepadInput();
    updatePepper();
    //console.log(pepperRotateLeft)
    requestAnimationFrame(gameLoop);
}

gameLoop();