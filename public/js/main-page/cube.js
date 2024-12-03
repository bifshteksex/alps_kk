$(document).ready(function () {
  const galleryOptions = {
    cubeSelector: ".b-cube",
    sideSelector: ".b-cube-side",
  };

  const gallery = cubeGallery(galleryOptions);
  gallery.isAnimating = false;
  let cubeIntervalID = 0;

  const $cubeMain = $(".b-cube-main");
  const $rotatorMain = $(".b-rotator-main");

  function rotateCube(rotateBy, duration = 1000) {
    const angle = gallery.currentAngle;
    gallery.isAnimating = true;

    $({ deg: angle }).animate(
      { deg: angle + rotateBy },
      {
        duration,
        step(now) {
          $cubeMain.css({ transform: `rotateX(${now}deg)` });
          $rotatorMain.css({ transform: `rotateX(${now}deg)` });
        },
        complete() {
          gallery.isAnimating = false;
          controlVideoPlayback(true);
          gallery.currentAngle += rotateBy;
        },
      }
    );
  }

  function controlVideoPlayback(shouldPlay) {
    const videos = document.querySelectorAll(".cube-video");
    videos.forEach((video) => {
      if (shouldPlay && !video.classList.contains('video-pause')) {
        setTimeout(() => video.play(), 20);
      } else {
        video.pause();
      }
    });
  }

  function stopCubeInterval() {
    clearInterval(cubeIntervalID);
    cubeIntervalID = 0;
  }

  App.Index.prototype.swipe = function (_, direction) {
    if (!gallery.isAnimating) {
      stopCubeInterval();
      const rotateBy = direction === "down" ? -90 : 90;
      rotateCube(rotateBy);
    }
  };

  App.Rotator.prototype.clickArrDown = function () {
    if (!gallery.isAnimating) {
      stopCubeInterval();
      rotateCube(90);
    }
  };

  App.Rotator.prototype.clickArrUp = function () {
    if (!gallery.isAnimating) {
      stopCubeInterval();
      rotateCube(-90);
    }
  };

  $(window).on("mousewheel", (e) => {
    if (!gallery.isAnimating) {
      stopCubeInterval();
      const rotateBy = e.originalEvent.wheelDelta > 0 ? -90 : 90;
      rotateCube(rotateBy);
    }
  });

  $(window).on("keydown", (e) => {
    if (!gallery.isAnimating && (e.which === 38 || e.which === 40)) {
      stopCubeInterval();
      const rotateBy = e.which === 38 ? -90 : 90;
      rotateCube(rotateBy);
    }
  });

  setInterval(() => {
    if (!cubeIntervalID) {
      cubeIntervalID = setInterval(() => rotateCube(90), 56000);
    }
  }, 1000);
});
