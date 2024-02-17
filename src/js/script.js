"use strict";

jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  // ハンバーガーメニュー
  let scrollPosition = 0;

  function openDrawer() {
    scrollPosition = $(window).scrollTop();
    $(".js-drawer").addClass("is-open");
    $(".js-hamburger").addClass("is-open");
    $("body").addClass("is-fixed").css("top", -scrollPosition);
  }

  function closeDrawer() {
    $(".js-drawer").removeClass("is-open");
    $(".js-hamburger").removeClass("is-open");
    $("body").removeClass("is-fixed").css("top", "");
    $(window).scrollTop(scrollPosition);
  }

  $(".js-hamburger").click(function () {
    $(this).toggleClass("is-open");
    if ($(this).hasClass("is-open")) {
      openDrawer();
    } else {
      closeDrawer();
    }
  });

  $(".js-drawer, .js-drawer a[href]").on("click", function () {
    closeDrawer();
  });

  $(window).on("resize", function () {
    if (window.matchMedia("(min-width: 768px)").matches) {
      closeDrawer();
    }
  });

  // ページトップボタン
  const pageTop = $(".js-pagetop");
  pageTop.hide();
  $(window).scroll(function () {
    var scrollPosition = $(this).scrollTop();
    var windowHeight = $(this).height();
    var bodyHeight = $(document).height();
    var footerHeight = $(".p-footer").outerHeight();
    if (scrollPosition > 70) {
      pageTop.fadeIn();
    } else {
      pageTop.fadeOut();
    }
    if (bodyHeight - scrollPosition <= windowHeight + footerHeight) {
      pageTop.css({
        position: "absolute",
        bottom: footerHeight + 6 + "px",
      });
    } else {
      pageTop.css({
        position: "fixed",
        bottom: "20px",
      });
    }
  });
  pageTop.click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      300,
      "swing"
    );
    return false;
  });

  // アンカーリンク
  // $(document).ready(function () {
  //   // 別ページからの遷移を考慮して、ページ読み込み時とハッシュ変更時に処理を実行
  //   function adjustAnchor() {
  //     var headerHeight = $(".js-header").outerHeight(); // ヘッダーの動的な高さを取得
  //     var hash = window.location.hash; // 現在のハッシュを取得

  //     if (hash) {
  //       var target = $(hash);
  //       if (target.length) {
  //         var position = target.offset().top - headerHeight; // ヘッダーの高さを考慮した位置を計算
  //         $("html, body").stop().animate(
  //           {
  //             scrollTop: position,
  //           },
  //           600,
  //           "swing"
  //         );
  //       }
  //     }
  //   }

  //   // ページ読み込み時とハッシュが変更された時にアンカー位置調整を実行
  //   $(window).on("load hashchange", function () {
  //     adjustAnchor();
  //   });

  //   // ページ内リンクに対するクリックイベント
  //   $('a[href^="#"]').click(function (e) {
  //     var href = $(this).attr("href");
  //     // 別ページへのアンカーの場合はデフォルトの動作を実行
  //     if (href.startsWith("#") && href.length > 1) {
  //       // ハッシュ変更をトリガーとして位置調整を実行する
  //       window.location.hash = href;
  //       return false; // デフォルトのアンカー動作をキャンセル
  //     }
  //   });
  // });

  

  // SPのみスライダー
  $(document).ready(function () {
    initializeAboutSwiper();
    initializeFlowSwiper1();
    initializeFlowSwiper2();
    initializeFlowSwiper3();
  });

  function initializeAboutSwiper() {
    const aboutSwiper = document.querySelector(".js-about-swiper");
    if (
      aboutSwiper &&
      document.querySelector(".js-about-swiper-next") &&
      document.querySelector(".js-about-swiper-prev")
    ) {
      let swiperInstance = null;

      const createSwiper = function () {
        if (window.innerWidth >= 768) {
          if (swiperInstance) {
            swiperInstance.destroy();
            swiperInstance = null;
          }
          clearSwiperStyles(aboutSwiper);
        } else {
          if (!swiperInstance) {
            swiperInstance = new Swiper(aboutSwiper, {
              loop: true,
              spaceBetween: 45,
              slidesPerView: "auto",
              centeredSlides: true,
              speed: 1000,
              autoplay: {
                disableOnInteraction: false,
              },
              pagination: {
                el: aboutSwiper.querySelector(".swiper-pagination"),
                clickable: true,
              },
              navigation: {
                nextEl: document.querySelector(".js-about-swiper-next"),
                prevEl: document.querySelector(".js-about-swiper-prev"),
              },
            });
          }
        }
      };

      createSwiper();
      $(window).on("resize", createSwiper);
    }
  }

  function initializeFlowSwiper1() {
    const flowSwiper1 = document.querySelector(".js-flow-swiper1");
    if (
      flowSwiper1 &&
      document.querySelector(".js-flow-swiper-next1") &&
      document.querySelector(".js-flow-swiper-prev1")
    ) {
      let swiperInstance1 = null;

      const createSwiper1 = function () {
        if (window.innerWidth >= 768) {
          if (swiperInstance1) {
            swiperInstance1.destroy();
            swiperInstance1 = null;
          }
          clearSwiperStyles(flowSwiper1);
        } else {
          if (!swiperInstance1) {
            swiperInstance1 = new Swiper(flowSwiper1, {
              loop: true,
              spaceBetween: 45,
              slidesPerView: "auto",
              centeredSlides: true,
              pagination: {
                el: flowSwiper1.querySelector(".swiper-pagination"),
                clickable: true,
              },
              navigation: {
                nextEl: document.querySelector(".js-flow-swiper-next1"),
                prevEl: document.querySelector(".js-flow-swiper-prev1"),
              },
              on: {
                init: function () {
                  applyCommonSwiperStyles();
                },
              },
            });
          }
        }
      };

      createSwiper1();
      $(window).on("resize", createSwiper1);
    }
  }

  function initializeFlowSwiper2() {
    const flowSwiper2 = document.querySelector(".js-flow-swiper2");
    if (
      flowSwiper2 &&
      document.querySelector(".js-flow-swiper-next2") &&
      document.querySelector(".js-flow-swiper-prev2")
    ) {
      let swiperInstance2 = null;

      const createSwiper2 = function () {
        if (window.innerWidth >= 768) {
          if (swiperInstance2) {
            swiperInstance2.destroy();
            swiperInstance2 = null;
          }
          clearSwiperStyles(flowSwiper2);
        } else {
          if (!swiperInstance2) {
            swiperInstance2 = new Swiper(flowSwiper2, {
              loop: true,
              spaceBetween: 45,
              slidesPerView: "auto",
              centeredSlides: true,
              pagination: {
                el: flowSwiper2.querySelector(".swiper-pagination"),
                clickable: true,
              },
              navigation: {
                nextEl: document.querySelector(".js-flow-swiper-next2"),
                prevEl: document.querySelector(".js-flow-swiper-prev2"),
              },
              on: {
                init: function () {
                  applyCommonSwiperStyles();
                },
              },
            });
          }
        }
      };

      createSwiper2();
      $(window).on("resize", createSwiper2);
    }
  }

  function initializeFlowSwiper3() {
    const flowSwiper3 = document.querySelector(".js-flow-swiper3");
    if (
      flowSwiper3 &&
      document.querySelector(".js-flow-swiper-next3") &&
      document.querySelector(".js-flow-swiper-prev3")
    ) {
      let swiperInstance3 = null;

      const createSwiper3 = function () {
        if (window.innerWidth >= 768) {
          if (swiperInstance3) {
            swiperInstance3.destroy();
            swiperInstance3 = null;
          }
          clearSwiperStyles(flowSwiper3);
        } else {
          if (!swiperInstance3) {
            swiperInstance3 = new Swiper(flowSwiper3, {
              loop: true,
              spaceBetween: 45,
              slidesPerView: "auto",
              centeredSlides: true,
              pagination: {
                el: flowSwiper3.querySelector(".swiper-pagination"),
                clickable: true,
              },
              navigation: {
                nextEl: document.querySelector(".js-flow-swiper-next3"),
                prevEl: document.querySelector(".js-flow-swiper-prev3"),
              },
              on: {
                init: function () {
                  applyCommonSwiperStyles();
                },
              },
            });
          }
        }
      };

      createSwiper3();
      $(window).on("resize", createSwiper3);
    }
  }

  function clearSwiperStyles(container) {
    if (!container) return;
    container.style = ""; // Swiperコンテナのスタイルをクリア
    var pagination = container.querySelector(".swiper-pagination");
    if (pagination) pagination.style = ""; // ページネーションのスタイルをクリア
    var prevButton = container.querySelector(".js-flow-swiper-prev"); // 前へボタンのスタイルをクリア
    if (prevButton) prevButton.style = "";
    var nextButton = container.querySelector(".js-flow-swiper-next"); // 次へボタンのスタイルをクリア
    if (nextButton) nextButton.style = "";
  }

  function applyCommonSwiperStyles() {
    const flows = document.querySelectorAll(".p-sub-flow");
    flows.forEach(function (flow) {
      flow.style.opacity = 1;
      flow.style.visibility = "visible";
    });
  }
});

// modal
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".js-modal");

  // `modal` 要素が存在する場合のみ処理を実行
  if (modal) {
    const openModal = function openModal(imgSrc) {
      if (modalImg) {
        modalImg.src = imgSrc;
      }
      modal.classList.add("show");
      if (modalWrap) {
        modalWrap.classList.add("show");
      }
      modal.style.visibility = "visible";
      updateButtonStates();
      document.body.style.overflow = "hidden";
    };
    const updateModalImage = function updateModalImage(index) {
      if (modalImg) {
        // 既存のアニメーションクラスをクリア
        modalImg.classList.remove("fadeIn");

        // アニメーションが終了したらクラスを削除
        modalImg.addEventListener(
          "animationend",
          function () {
            modalImg.classList.remove("fadeIn");
          },
          {
            once: true,
          }
        );

        // 新しい画像ソースを設定してアニメーションクラスを追加
        modalImg.src = imageSources[index];
        modalImg.classList.add("fadeIn");
      }
      updateButtonStates();
    };
    const updateButtonStates = function updateButtonStates() {
      if (prevButton) {
        prevButton.classList.toggle("is-disabled", currentIndex <= 0);
      }
      if (nextButton) {
        nextButton.classList.toggle(
          "is-disabled",
          currentIndex >= imageSources.length - 1
        );
      }
    };
    const closeModal = function closeModal() {
      modal.classList.remove("show");
      if (modalWrap) {
        modalWrap.classList.remove("show");
      }
      modal.addEventListener("transitionend", function onTransitionEnd() {
        modal.style.visibility = "hidden";
        modal.removeEventListener("transitionend", onTransitionEnd);
        document.body.style.overflow = "";
      });
    };
    const modalWrap = modal.querySelector(".p-modal__wrap");
    const modalInner = modal.querySelector(".p-modal__inner");
    const modalImgContainer = modal.querySelector(".p-modal__img");
    const modalImg = modalImgContainer
      ? modalImgContainer.querySelector("img")
      : null;
    const modalClose = document.querySelector(".p-modal__close-button");
    const prevButton = document.querySelector(".p-modal__prev");
    const nextButton = document.querySelector(".p-modal__next");
    let currentIndex = 0;
    let imageSources = [];
    const modalTriggers = document.querySelectorAll(".js-modal-trigger");
    modalTriggers.forEach(function (trigger, index) {
      imageSources.push(trigger.getAttribute("href"));
      trigger.setAttribute("data-index", index);
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        currentIndex = parseInt(this.getAttribute("data-index"));
        if (modalImg) {
          openModal(this.getAttribute("href"));
        }
      });
    });
    if (prevButton) {
      prevButton.addEventListener("click", function () {
        if (currentIndex > 0) {
          currentIndex--;
          updateModalImage(currentIndex);
        }
      });
    }
    if (nextButton) {
      nextButton.addEventListener("click", function () {
        if (currentIndex < imageSources.length - 1) {
          currentIndex++;
          updateModalImage(currentIndex);
        }
      });
    }
    modal.addEventListener("click", function (e) {
      if (
        e.target === modal ||
        e.target === modalInner ||
        e.target === modalWrap
      ) {
        closeModal();
      }
    });

    if (modalClose) {
      modalClose.addEventListener("click", closeModal);
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" || e.key === "Esc") {
        closeModal();
      }
    });
  }



  //ローディング
  var webStorage = function () {
    if (sessionStorage.getItem('access')) {
      //2回目以降アクセス時の処理
      $('.loader').hide();//ローダーを非表示に
      // Fvスライダー
  var fvSwiperContainer = document.querySelector(".js-fv-swiper");
  if (fvSwiperContainer) {
    var fvSwiper = new Swiper(fvSwiperContainer, {
      loop: true,
      effect: "fade",
      speed: 3000,
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 2000,
      },
    });
  }
      
    } else {
      //初回アクセス時の処理
      sessionStorage.setItem('access', 0);
      const texts = document.querySelectorAll('.loader__text span');
  const opening=gsap.timeline();
  opening.fromTo(
    '.loader__logo',
    {
      opacity:0,
      x:-20,
      rotate:20,
      rotateX:20,
    },
    {
      opacity:1,
      x:0,
      rotate:0,
      rotateX:0,
      duration:1.4,
    }
  )
  .fromTo(
    texts,
    {
      opacity:0,
      x:-10,
    },
    {
      x:0,
      opacity:1,
      stagger:{
        each:0.08,
      }
    },"-=0.7"
  )
  .fromTo(
    ".loader",
    {
      opacity:1,
    },
    {
      opacity:0,
    },"+=0.2"
  )
  .to(
    ".loader",
    {
      display:"none",
    },
  )
  .fromTo(
    ".p-fv__read",
    {
      opacity:0,
    },
    {
      opacity:1,
      duration:1.3,
    },"-=0.4"
  )
  // .fromTo(
  //   ".p-fv__text",
  //   {
  //     opacity:0,
  //   },
  //   {
  //     opacity:1,
  //     duration:1,

  //   },"-=0.4"
  // )
  // .fromTo(
  //   ".p-fv__swiper",
  //   {
  //     opacity:0,
  //   },
  //   {
  //     opacity:1,
  //     duration:1,

  //   },"-=0.4"
  // )

  // Fvスライダー
  setTimeout(function(){
    var fvSwiperContainer = document.querySelector(".js-fv-swiper");
    if (fvSwiperContainer) {
      var fvSwiper = new Swiper(fvSwiperContainer, {
        loop: true,
        effect: "fade",
        speed: 3000,
        fadeEffect: {
          crossFade: true,
        },
        autoplay: {
          delay: 2000,
        },
      });
    }
  }
    ,2000);
  
    }
  }
  webStorage();


  //アニメーション======================

  //発火タイミング調整
  const customPosition=$(window).width() < 768 ? 25 : 50;
  const startPosition="top+=" + customPosition + " bottom";
  //サブタイトル
  let fadeIns=document.querySelectorAll('.js-fadeIn');
  fadeIns.forEach((fadeIn)=>{
    gsap.fromTo(
      fadeIn.querySelector('span'),
      {
        yPercent:100,
      },
      {
        yPercent:0,
        duration:0.8,
        ease:Power2.easeOut,
        scrollTrigger:{
          trigger:fadeIn,
          start:startPosition,
        }
      }
    );

    //タイトル
    let fadeIns2 = gsap.utils.toArray(".js-fadeIns2");
  fadeIns2.forEach((fadeIn) => {
    gsap.fromTo(
      fadeIn.querySelectorAll('span'),
      {
        x: -10,
        opacity:0,
      },
      {
        x: 0,
        opacity:1,
        ease:Power3.easeOut,
        scrollTrigger: {
          trigger: fadeIn,
          start: startPosition,
        },
        stagger:{
          each:0.08,
        }
      }
    );
  });
  });


  //1つずつ表示
  let fadeIns3=document.querySelectorAll('.js-fadeIns3');
  fadeIns3.forEach((fadeIn)=>{
    gsap.fromTo(
      fadeIn.querySelectorAll('.js-fadeIns3-child'),
      {
        autoAlpha:0,
      },
      {
        autoAlpha:1,
        duration:1,
        ease:Power3.easeOut,
        scrollTrigger:{
          trigger:fadeIn,
          start:startPosition,
        },
        stagger:0.1,

      }
      )
  });

  //scale
  let imgs=document.querySelectorAll('.js-img');
  imgs.forEach((img)=>{
    gsap.fromTo(
      img.querySelector("img"),
      {
        scale:1.1,
      },
      {
        scale:1,
        duration:1.2,
        scrollTrigger:{
          trigger:img,
          start:startPosition,
          once:true,
          toggleClass:{
            targets:img,
            className:"is-open"
          }
        }
      }
    );
  });

  let fadeIns4=document.querySelectorAll('.js-fadeIn4');
  fadeIns4.forEach((fadeIn)=>{
    gsap.fromTo(
      fadeIn,
      {
        y:30,
        opacity:0,
		
      },
      {
        y:0,
        opacity:1,
        duration:0.8,
        ease:Power2.easeOut,
        scrollTrigger:{
          trigger:fadeIn,
          start:"top bottom",
        }
      }
    );
  });

  //mask
  let maskImgs=document.querySelectorAll('.js-maskImg');
  maskImgs.forEach((maskImg)=>{
    gsap.fromTo(
      maskImg,
      {
      },
      {
        scrollTrigger:{
          trigger:maskImg,
          start:startPosition,
          once:true,
          toggleClass:{
            targets:maskImg,
            className:"is-open"
          }
        }
      }
    );
  });
  
});

