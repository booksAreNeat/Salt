document.addEventListener("DOMContentLoaded", function(){
    const images = [
        "Images/tablet/0SOCET-information.png",
        "Images/tablet/1BA.png",
        "Images/tablet/2CS.png",
        "Images/tablet/3CCD.png",
        "Images/tablet/4CY.png",
        "Images/tablet/5DS.png",
        "Images/tablet/6DSAI.png",
        "Images/tablet/7DSBM.png",
        "Images/tablet/8ED.png",
        "Images/tablet/9EDM.png",
        "Images/tablet/10EIMC.png",
        "Images/tablet/11GD.png",
        "Images/tablet/12Maritime.png",
        "Images/tablet/13ME.png",
        "Images/tablet/14MAEE.png",
        "Images/tablet/15MOE.png",
        "Images/tablet/16REE.png",
        "Images/tablet/17WMD.png"
    ];
    let currentIndex = 0;
    
    const slideImage = document.querySelector(".tablet-carousel-image");
    const leftArrow = document.querySelector(".tablet-left-arrow");
    const rightArrow = document.querySelector(".tablet-right-arrow");

    function updateSlide(){
        slideImage.src = images[currentIndex];
    }
    leftArrow.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlide();
    });
    rightArrow.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlide();
    });
}
)