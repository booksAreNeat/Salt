let session;
  function tts(s) {
    session = s;
    console.log("Connected to Pepper session");

    // Created the ALMemory event "PepperSpeechText"
    session.service("ALMemory").then(function (ALMemory) {
      ALMemory.subscriber("PepperSpeechText").then(function (subscriber) {
        subscriber.signal.connect(function (text) {
          showCaption(text);
        });
      });
    });
  }

tts(session);


function showCaption(text){
    const caption = document.getElementById("pepper-speech");
    if(!caption){
        return;
    }
    caption.textContent = text;
    caption.style.display = "block";
    caption.style.opacity = "1";

    clearTimeout(caption.hideTimeout);
    caption.hideTimeout = setTimeout(() => {
        caption.style.opacity = "0";
        setTimeout(() => (caption.style.display = "none"), 1000);
    }, 6000);
 }