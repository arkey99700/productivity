const swiperHero = new Swiper(".hero__slider", {
  direction: "horizontal",
  allowTouchMove: false,
  speed: 800,
  slidesPerView: "auto",
  centeredSlides: true,
  effect: "creative",
  creativeEffect: {
    prev: {
      opacity: 0,
    },
    next: {
      opacity: 0,
    },
  },
  pagination: {
    el: ".hero__pagination",
    clickable: true,
  },
});

const swiperBlog = new Swiper(".blog__slider", {
  direction: "horizontal",
  allowTouchMove: false,
  speed: 800,
  slidesPerView: "auto",
  centeredSlides: true,
  effect: "creative",
  creativeEffect: {
    prev: {
      opacity: 0,
      translate: ["-10px", 0, 0],
    },
    next: {
      opacity: 0,
      translate: ["10px", 0, 0],
    },
  },
  pagination: {
    el: ".blog__slider-controls",
    clickable: true,
  },
  navigation: {
    nextEl: ".blog__slider-arrow--right",
    prevEl: ".blog__slider-arrow--left",
  },
});

const swiperQuotes = new Swiper(".quotes__slider", {
  direction: "horizontal",
  allowTouchMove: false,
  slidesPerView: "auto",
  spaceBetween: 70,
  effect: "creative",
  creativeEffect: {
    prev: {
      opacity: 0,
      scale: 0,
    },
    next: {
      opacity: 0.3,
      translate: ["500px", 0, 0],
    },
  },
  pagination: {
    el: ".quotes__slider-controls",
    clickable: true,
  },
});
