

function fadeOut() {
    TweenMax.to(".myBttn", 1, {
        y: -100,
        opacity:0
    });

TweenMax.to(".screen", 2, {
    y: -400,
    opacity: 0,
    ease: Power2.easeInOut,
    delay:2
});

TweenMax.from(".overlay", 2, {
    ease: Power2.easeInOut
});

TweenMax.to(".overlay", 2, {
    delay: 2.6,
    top: "-110%",
    ease: Expo.easeInOut
});

TweenMax.to(".overlay-2", 2, {
    delay:3,
    top:"-110%",
    ease: Expo.easeInOut
});

TweenMax.from(".content-animation", 2, {
    delay:3.2,
    opacity:0,
    ease: Power2.easeInOut
});

TweenMax.to(".content-animation", 2, {
    opacity: 1,
    y: -300,
    delay: 3.2,
    ease: Power2.easeInOut
})
}