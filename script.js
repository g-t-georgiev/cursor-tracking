import { useState } from "./state.js"
import { interpolate } from "./lerp.js";

const containerElem = document.querySelector('[data-container]');
const targetElem = containerElem.querySelector('[data-target-area]');
const arrows = targetElem.querySelectorAll('[data-arrow]');

let rafId;
let startTime;
let initialAngle = 0;
let currentAngle = 0;
let targetAngle = 0;

let [ getMouseOverState, setMouseOverState ] = useState(false);
let [ getMousePosState, setMousePosState ] = useState({ x: 0, y: 0 });

targetElem.addEventListener('mouseenter', function (event) {
    setMouseOverState(true);
}, { capture: true });
targetElem.addEventListener('mouseleave', function (event) {
    setMouseOverState(false);
}, { capture: true });
targetElem.addEventListener('mousemove', function (event) {
    setMousePosState({ 
        ...getMousePosState(), 
        x: event.clientX,
        y: event.clientY
    });
}, { capture: true });

update(performance.now());

function update() {
    arrows.forEach(function (arrow) {
        if (!getMouseOverState()) {
            targetAngle = initialAngle;
        } else {
            const mousePos = getMousePosState();
            const rect = arrow.getBoundingClientRect();
            const center = {
                x: rect.x + (rect.width / 2),
                y: (rect.y + window.scrollY) - window.scrollY + (rect.height / 2)
            };

            const distanceX = mousePos.x - center.x;
            const distanceY = mousePos.y - center.y;
            targetAngle = Math.round(Math.atan2(distanceX, -distanceY) * (180 / Math.PI));
        }

        targetAngle = findClosestAngle(currentAngle, targetAngle);
        currentAngle = interpolate(currentAngle, targetAngle, 0.1) % 360;
        arrow.style.setProperty('--rotate', currentAngle);
    });

    rafId = window.requestAnimationFrame(update);
}

function findClosestAngle(from, to) {
    return from + ((((to - from) % 360) + 540) % 360) - 180;
}