$(document).ready(function () {
  // Выпадающие меню
  function openDropdown(elem) {
    // $(".dropdown_menu").not($(elem).siblings(".dropdown_menu")[0]).slideUp(300);
    console.log(elem);
    $(elem).next().slideToggle(300);
    $(elem).parent().siblings().find(".dropdown_link").next().slideUp();
    $(elem).parent().siblings().find(".header_search__label").next().slideUp();
    $(".mobile_menu").slideUp();
    $(".main_menu").removeClass("active");
    // $(elem).siblings(".dropdown_menu").slideToggle(300);
    // $(".header_search__input").slideUp(300);
  }
  // language=JQuery-CSS
  $(".dropdown_link").click(function () {
    openDropdown(this);
    return false;
  });
  $(".header_search__label").click(function () {
    openDropdown(this);
    return false;
  });
  // language=JQuery-CSS
  // $('.main_slider').click(function () {
  //     $(".dropdown_menu").slideUp(300);
  //     return false;
  // });

  // language=JQuery-CSS
  // $(`.header_search__label`).click(function () {
  //     $(".dropdown_menu").slideUp(300);
  //     $(".header_search__input").slideToggle(300);
  //
  //     return false;
  // });

  $(".main_header .main_menu a").click(function (e) {
    e.preventDefault();
    $(".side_menu").toggleClass("open");
    $(this).parent().toggleClass("active");
    $("body").toggleClass("menu_open");
  });
  $(".mobile_header .main_menu").click(function () {
    $(this).toggleClass("active");
    $(".mobile_menu").slideToggle(300);
    $("body").toggleClass("menu_open");
    $(".header_search__input, .dropdown_menu").slideUp();
  });
  $(".people-slider").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: false,
    infinite: true,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  $(".client-slider").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: false,
    infinite: true,
    autoplay: true,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  $(".contact-item").click(function () {
    $(this).toggleClass("active");
    if (!$(this).hasClass("active")) {
      $(this).find(".contact-drop").slideUp();
    } else {
      $(this).parent().parent().find(".contact-drop").slideUp();
      $(this).find(".contact-drop").slideToggle();
    }
  });
  $(".contact-drop").click(function (event) {
    event.stopPropagation();
  });
  var $body = $(window.document.body);

  function bodyFreezeScroll() {
    var bodyWidth = $body.innerWidth();
    $body.css("overflow", "hidden");
    $body.css(
      "marginRight",
      ($body.css("marginRight") ? "+=" : "") + ($body.innerWidth() - bodyWidth)
    );
  }

  function bodyUnfreezeScroll() {
    var bodyWidth = $body.innerWidth();
    $body.css("marginRight", "0");
    $body.css("overflow", "auto");
  }
  $(".expert-item").click(function () {
    $(".video-popup").addClass("active");
    bodyFreezeScroll();
  });
  $(".registration_btn_open").click(function () {
    $(".registration-popup").addClass("active");
    bodyFreezeScroll();
  });
  $(".contact-form-btn_reg").click(function () {
    $(".registration-popup").removeClass("active");
    bodyUnfreezeScroll();
  });
  $(".open-form-btn").click(function () {
    $(".mail-popup").addClass("active");
    bodyFreezeScroll();
  });
  $(document).mouseup(function (e) {
    var container = $(".contact-list");
    if (container.has(e.target).length === 0) {
      $(".contact-drop").slideUp();
    }
    var container2 = $(".video-popup-container");
    if (container2.has(e.target).length === 0) {
      $(".video-popup").removeClass("active");
      bodyUnfreezeScroll();
    }
    var container3 = $(".registration-popup-container");
    if (container3.has(e.target).length === 0) {
      $(".registration-popup").removeClass("active");
      bodyUnfreezeScroll();
    }
    var container4 = $(".mail-popup-container");
    if (container4.has(e.target).length === 0) {
      $(".mail-popup").removeClass("active");
      bodyUnfreezeScroll();
    }
  });
  $(".article-item-link").click(function () {
    var scroll_el = $(this).attr("href");
    if ($(scroll_el).length != 0) {
      $("html, body").animate(
        { scrollTop: $(scroll_el).offset().top - $(".main_header").height() },
        500
      );
    }
    return false;
  });
  $(".publication-item-link").click(function (e) {
    e.preventDefault();
    $(this).addClass("active");
    $(this)
      .parent()
      .siblings()
      .find(".publication-item-link")
      .removeClass("active");
  });
  var items = $(".change-height").find(".item-item").slice(0, 2);
  var items2 = $(".change-height2").find(".item-item").slice(0, 3);
  var i,
    j,
    height2 = 0,
    height = 0;

  for (i = 0; i < items.length; i++) {
    height += items.eq(i).height();
  }
  $(".change-height").height(height);
  for (j = 0; j < items2.length; j++) {
    height2 += items2.eq(j).height();
  }
  $(".change-height2").height(height2);

  function changeHeight(param, item) {
    item.parent().find(".change-height").height("auto");
    item.parent().find(".change-height").toggleClass("active");
    var thisText = item.parent().find(".item-more-text").attr("data-text");
    if (!item.parent().find(".change-height").hasClass("active")) {
      item.parent().find(".change-height").height(param);
      item.parent().find(".change-height").removeClass("active");
      item.parent().find(".item-more-text").text(thisText);
    } else {
      item.parent().find(".item-more-text").text("Свернуть");
    }
  }

  $(".item-more").click(function (e) {
    e.preventDefault();
    changeHeight(height, $(this));
  });
  $(".item-other-more").click(function (e) {
    e.preventDefault();
    changeHeight(height2, $(this));
  });
  $(".question-btn").click(function () {
    $(this).parent().siblings().find(".question-btn").removeClass("active");
    $(this).toggleClass("active");
    $(this).parent().siblings().find(".question-slide").slideUp();
    $(this).parent().find(".question-slide").slideToggle();
  });
  if ($(window).width() > 1000) {
    setTimeout(function () {
      if ($(".contact-form-trigger").length > 0) {
        var heightDuration =
          $(".contact-right").height() -
          $(".contact-form-trigger").position().top -
          $(".contact-form-trigger").height();
        if (heightDuration < 1) {
          heightDuration = 1;
        }
        console.log(heightDuration);
        var controller = new ScrollMagic.Controller({
          globalSceneOptions: { triggerHook: "0", offset: "-105" },
        });
        var scene1 = new ScrollMagic.Scene({
          triggerElement: ".contact-form-trigger", // point of execution
          duration: heightDuration, // pin element for the window height - 1
          reverse: true, // allows the effect to trigger when scrolled in the reverse direction
        })
          .setPin(".contact-form-fixed") // the element we want to pin
          .addTo(controller);
      }
    }, 500);
  }

  $(".mail-popup-close").click(function () {
    $(".mail-popup").removeClass("active");
  });
  $(document).mouseup(function (e) {
    if (!e.target.parentElement.classList.contains("active")) {
      var container2 = $(".header_search");
      var container3 = $(".lang");
      var container4 = $(".header_contacts__current");
      var container5 = $(".header-phone");
      if (container2.parent().has(e.target).length === 0) {
        container2.find(".header_search__input").slideUp();
      }
      if (container3.parent().has(e.target).length === 0) {
        container3.find(".lang__list").slideUp();
      }
      if (container4.parent().has(e.target).length === 0) {
        container4.parent().find(".dropdown_menu").slideUp();
      }
      if (container5.parent().has(e.target).length === 0) {
        container5.find(".lang__list").slideUp();
      }
    }
  });
  if ($(window).width() > 910) {
    $(document).mouseup(function (e) {
      if (!e.target.parentElement.classList.contains("active")) {
        var container2 = $(".side-menu-container");
        if (container2.parent().has(e.target).length === 0) {
          $(".side_menu").removeClass("open");
          $(".main_menu").removeClass("active");
          $("body").removeClass("menu_open");
          // $('.mobile_menu').slideUp()
        }
      }
    });
  }
  $(".footer-ancor").click(function (e) {
    e.preventDefault();
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      800
    );
    return false;
  });
  $(".video-popup-close").click(function () {
    $(".video-popup").removeClass("active");
    bodyUnfreezeScroll();
  });
});

$(window).scroll(function () {
  if ($(this).scrollTop() > 0) {
    $(".main_header").addClass("active");
  } else {
    $(".main_header").removeClass("active");
  }
  if ($(this).scrollTop() > 100) {
    $(".footer-ancor").addClass("active");
  } else {
    $(".footer-ancor").removeClass("active");
  }
});

var swiper = new Swiper(".anonce-swiper", {
  slidesPerView: 1,
  spaceBetween: 55,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 6000,
    disableOnInteraction: true,
  },
});
