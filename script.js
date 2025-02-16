const slider = document.querySelector(".slider");
const images = document.querySelectorAll(".slider-image");
const imageText = document.getElementById("imageText");
const imageNumber = document.getElementById("imageNumber");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
let isSliding = false;
const totalImages = images.length;

function updateSlider(index) {
    if (isSliding) return;
    isSliding = true;
    prevBtn.disabled = true;
    nextBtn.disabled = true;

    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(${-index * 100}%)`;

    setTimeout(() => {
        imageText.textContent = `Image ${index + 1}`;
        imageNumber.textContent = index + 1;
        isSliding = false;
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }, 500);
}

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateSlider(currentIndex);
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalImages;
    updateSlider(currentIndex);
});

let touchStartX = 0;
let touchEndX = 0;

document.querySelector(".slider-container").addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector(".slider-container").addEventListener("touchend", (e) => {
    if (isSliding) return;

    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX) {
        currentIndex = (currentIndex + 1) % totalImages;
        updateSlider(currentIndex);
    } else if (touchEndX > touchStartX) {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateSlider(currentIndex);
    }
});
