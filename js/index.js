gsap.registerPlugin(ScrollTrigger);

// 동영상
const video = document.querySelector('.lecture-video');
const playButton = document.querySelector('.video-play');

playButton.addEventListener('click', () => {
  video.play();
  playButton.style.display = 'none';
});

video.addEventListener('click', () => {
  if (!video.paused) {
    video.pause();
    playButton.style.display = 'flex';
  }
});

//textarea 글자수 계산
const textarea = document.querySelector('.textarea-wrap textarea');
const charCount = document.querySelector('.char-count strong');

textarea.addEventListener('input', () => {
  charCount.textContent = textarea.value.length;
});

//과목 swiper
const subjectTabs = document.querySelectorAll('.subject-tab button');
const subjectSwiper = new Swiper('.subject-swiper', {
  loop: true,
  effect: "fade",
  autoHeight: false,

  fadeEffect: {
    crossFade: true,
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  speed: 300,

  navigation: {
    prevEl: ".swiper-prev",
    nextEl: ".swiper-next",
  },

  on: {
    init: function () {
      const randomIndex = Math.floor(Math.random() * subjectTabs.length);

      this.slideToLoop(randomIndex, 0);

      subjectTabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === randomIndex);
      });
    },

    slideChange: function () {
      const index = this.realIndex;

      subjectTabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
      });
    },
  },
});

subjectTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const index = Number(tab.dataset.index);

    subjectSwiper.slideToLoop(index);
  });
});

// GSAP
gsap.registerPlugin(ScrollTrigger);

let gsapContext;

function initGSAP() {
  if (gsapContext) {
    gsapContext.revert();
  }

  gsapContext = gsap.context(() => {

    // 메인 타이틀
    gsap.from(".main-section .main-title", {
      opacity: 0,
      y: 130,
      duration: 0.8,
      ease: "power2.out",
    });

    // education
    gsap.timeline({
      scrollTrigger: {
        trigger: ".education-section",
        start: "top 75%",
        once: true,
      },
    })
      .from(".education-title", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
      })
      .from(
        ".paper",
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.2)",
        },
        "-=0.3"
      );

    // lecture
    gsap.timeline({
      scrollTrigger: {
        trigger: ".lecture-section",
        start: "top 75%",
        once: true,
      },
    })
      .from(".lecture-section .title-wrap", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
      })
      .from(
        ".lecture-section .lecture-info",
        {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3"
      );

    // closing
    gsap.timeline({
      scrollTrigger: {
        trigger: ".closing-section",
        start: "top 75%",
        once: true,
      },
    })
      .from(".closing-section .closing-title", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
      })
      .from(
        ".closing-section .review-wrap",
        {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .from(
        ".closing-section .edu-apply-btn",
        {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "back.out(1.2)",
        },
        "-=0.2"
      );

  });
}

initGSAP();

let resizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    initGSAP();
    ScrollTrigger.refresh();
  }, 300);
});
