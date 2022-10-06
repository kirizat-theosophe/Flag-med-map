const timeline = gsap.timeline();

const settings = {
   duration: 1,        
    rotation: 360  
};

timeline.from(".ball-1", settings);


timeline.from(".ball-2", settings);

timeline.from(".ball-3", settings);

timeline.from(".ball-4", settings);

gsap.from(".ball", {
    duration: 3,
    y: "random(-800, -400)",
    ease: "bounce",
    rotation: 360,
    stagger: 0.4
});



