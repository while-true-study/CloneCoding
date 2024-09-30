let currentIndex = 0; // 슬라이드 인덱스
const slides = document.querySelectorAll('.slider'); // 슬라이드들
const slideCount = slides.length - 1; // 클론 제외 슬라이드 개수
const sliderInner = document.querySelector('.slider__inner');
let autoSlideInterval; // 자동 슬라이드 인터벌
let isMoving = false; // 움직이는지 확인


function moveToSlide(index) {  // 인덱스에 따라 슬라이드 이동
    if (isMoving) return;
    isMoving = true;
    sliderInner.style.transform = `translateX(-${index * 100}%)`;
    setTimeout(() => isMoving = false, 1000); // 1초 뒤에 상태 변환하기 
}

function startAutoSlide() {  // 자동 슬라이드 실행
    autoSlideInterval = setInterval(() => {
        goNext();}, 4000);
}

function initSlider() {  // 슬라이더 초기화
    slides.forEach(slide => {
        slide.style.width = `${100 / (slideCount + 1)}%`; // 슬라이드 너비 설정
    });
    startAutoSlide(); // 시작
}

const nextBtn = document.querySelector('.next');
function goNext() {
    if(isMoving) return;
    currentIndex++;
    console.log({currentIndex});

    if (currentIndex > slideCount) { // 클론 슬라이드 중일때? 클론 슬라이드 보일때
        sliderInner.style.transition = "none"; // 전환 효과 제거
        currentIndex = 0; // 인덱스를 0으로
        moveToSlide(currentIndex);
        setTimeout(() => {
            sliderInner.style.transition = "transform 1s ease-in-out"; // 전환 효과 적용
        }, 50);
    } else {
        moveToSlide(currentIndex);
    }
}
nextBtn.addEventListener('click', goNext);


const prevBtn = document.querySelector('.prev');
function goPrev() {
    if(isMoving) return;
    currentIndex--;
    console.log({currentIndex});

    if (currentIndex <= 0) { // 처음 슬라이드일때
        sliderInner.style.transition = "none"; // 전환 효과 제거
        currentIndex = slideCount; // 인덱스를 5로
        moveToSlide(currentIndex);
        setTimeout(() => {
            sliderInner.style.transition = "transform 1s ease-in-out"; // 전환 효과 적용
        }, 50);
    } else {
        moveToSlide(currentIndex);
    }
}
prevBtn.addEventListener('click', goPrev);

const startBtn = document.querySelector('.play-btn');
startBtn.addEventListener('click', startAutoSlide);

const stopBtn = document.querySelector('.pause-btn');
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}
stopBtn.addEventListener('click', stopAutoSlide);



window.onload = initSlider;