window.addEventListener('DOMContentLoaded', () => {

    // полифил foreach
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (callback, thisArg) {
          var T, k;
          if (this == null) {
            throw new TypeError(' this is null or not defined');
          }
          var O = Object(this);
          var len = O.length >>> 0;
          if (typeof callback !== 'function') {
              throw new TypeError(callback + ' is not a function');
          }
          if (arguments.length > 1) {
            T = thisArg;
          }
          k = 0;
          while (k < len) {
            var kValue;
            if (k in O) {
              kValue = O[k];
              callback.call(T, kValue, k, O);
            }
            k++;
          }
        };
    }

    //фокус на поле поиска
    const menuNavItemSerch = document.querySelector('.menu-nav-item--serch');
    const menuNavItemSerchInput = document.querySelector('.menu-nav-item--serch input');
    if(menuNavItemSerchInput !==null) {
        menuNavItemSerchInput.addEventListener('focus', function(){ //фокус
            menuNavItemSerch.classList.add('menu-nav-item--serch__no-icon')
        })
        menuNavItemSerchInput.addEventListener('blur', function(){ //онфокус
            menuNavItemSerch.classList.remove('menu-nav-item--serch__no-icon')
            if(this.value === '') {
                menuNavItemSerch.classList.remove('menu-nav-item--serch__no-icon')
            }
            else {
                menuNavItemSerch.classList.add('menu-nav-item--serch__no-icon')
            }
        })
    
        menuNavItemSerchInput.addEventListener('input', function(){//изменения плдя
            if(this.value === '') {
                menuNavItemSerch.classList.remove('menu-nav-item--serch__no-icon')
            }
            else {
                menuNavItemSerch.classList.add('menu-nav-item--serch__no-icon')
            }
        })
    }

    const menuLangsItem = document.querySelectorAll('.menu-langs-item');
    console.log(menuLangsItem)
    menuLangsItem.forEach(function(e) {
        e.addEventListener('click', function(){
            // menuLangsItem.forEach(function(elem) {
            //     elem.addEventListener('click', function(){
            //         console.log(elem)
            //     })

            // })
            console.log(menuLangsItem)
            menuLangsItem.forEach(function(elem){
                elem.classList.remove('menu-langs-item--current')
            })
            e.classList.add('menu-langs-item--current')
        })
    })

    // куб слайдер главная
    if(document.querySelector('.cube') !== null){
        let deg = 0; //градусы поворота
        let isWheel = true;
        let heroMain = document.querySelector('.hero-main');
        if (heroMain.addEventListener) {
            if ('onwheel' in document) {
              // IE9+, FF17+, Ch31+
              heroMain.addEventListener("wheel", function(){
                if(isWheel) {
                    isWheel = false;
                    cubeSlide();//прокрнутка
                    }
                    setTimeout(() => {
                    isWheel = true;
                    }, 1200);//смена флага
                console.log(isWheel)
              })
            } else if ('onmousewheel' in document) {
              // устаревший вариант события
              heroMain.addEventListener("mousewheel", cubeSlide);
            } else {
              // Firefox < 17
              heroMain.addEventListener("MozMousePixelScroll", cubeSlide);
            }
        } else { // IE8-
            heroMain.attachEvent("onmousewheel", cubeSlide);
            } 
            
        // function isWheelCheck() {
        //     isWheel = false;
        // } 
            
        function cubeSlide(e) {
            
            e = e || window.event;
            let delta = e.deltaY || e.detail || e.wheelDelta;
            // console.log(delta)
            let cube = document.querySelector('.cube');
            console.log(e)
            if(delta < 0){
                deg+=90;
            } else {
                deg-=90;
            }
            cube.style.transform = 'rotateX('+ deg + 'deg)';
        }
    }

    $('.clients-slider').slick({
        autoplay: true,
        dots: true,
        arrows: true,
        swipeToSlide: true,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 568,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
        // variableWidth: true
    })

    $('.benefits-slider').slick({
        // autoplay: true,
        arrows: true,
        swipeToSlide: true,
        slidesToShow: 1
    })

    if(!document.querySelector('.countries-slider--employee')) {
        $('.countries-slider').slick({
            autoplay: true,
            dots: true,
            arrows: true,
            swipeToSlide: true,
            // variableWidth: true,
            slidesToShow: 5,
            responsive: [
                {
                    breakpoint: 1366,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
    
    $('.countries-slider--employee').slick({
        autoplay: true,
        dots: true,
        arrows: true,
        swipeToSlide: true,
        // variableWidth: true,
        slidesToShow: 4,
        responsive: [
            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            },
        ]
    });
    
    $('.countries-slider--employee').slick('refresh')

    $('.team-list').slick({
        arrows: true,
        swipeToSlide: true,
        slidesToShow: 4,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    
    $('.about-section__employee-list').slick({
        fade: true,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows:false,
        
    });

    $('.countries-slider--legal').slick({
        autoplay: true,
        dots: true,
        arrows: true,
        swipeToSlide: true,
        // variableWidth: true,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            },
        ]
    });

    $('.countries-slider--legal').slick('refresh')

    $('.parallax-window').parallax({
        naturalWidth: 600,
        naturalHeight: 400
    });

    $('.speakers_list').slick({
        // autoplay: true,
        dots: true,
        arrows: false,
        swipeToSlide: true,
        // variableWidth: true,
        slidesToShow: 1 ,
    });

    $('.news-list-1').slick({
        dots: true,
        arrows: true    ,
        swipeToSlide: true,
        slidesToShow: 1 ,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                }
            },
            
        ]
    });

    $('.news-list-2').slick({
        dots: true,
        arrows: true    ,
        swipeToSlide: true,
        slidesToShow: 1 ,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                }
            },
            
        ]
    });

    $('.last-news__slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 700,
        dots: true,
        arrows: true,

        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            },
        ]
    });

    $('.all-news-item-archive-list').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
    });

    
    $('.career-country_list').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 700,
        dots: false,
        arrows: true,
        // variableWidth: true,

        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2
                }
                
            },

            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 2
                }
                
            },
        ]
    });

    $('.all-vebinar-2__list_slide-1').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 700,
        dots: true,
        arrows: true,
        appendArrows: $('.all-vebintar__slider-button'),
        // variableWidth: true,

        
    });


    var swiper = new Swiper('.subserice-fac__content', {
        slidesPerView: 1,
        spaceBetween: 350,
        //autoHeight: true,
        loop: true,
        pagination: {
          el: '.subserice-fac__content_pagination',
          clickable: true,
        },

        navigation: {
            nextEl: '.subserice-fac__content_swiper-button-next',
            prevEl: '.subserice-fac__content_swiper-button-prev',
        },

        breakpoints: {

            320: {
                
            },
            768: {
                spaceBetween: 100, 
            },
            992: {
                spaceBetween: 200, 
            }
        }

    });
    
    var swiper = new Swiper('.all-vebina__past-list', {
        slidesPerView: 2,
        slidesPerColumn: 2,
        // spaceBetween: 25,
        pagination: {
          el: '.all-vebina__past-list-pagination',
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
          
        },
       
        navigation: {
            nextEl: '.all-vebina__past-list-next',
            prevEl: '.all-vebina__past-list-prev',
        },
        breakpoints: {

            320: {
                slidesPerView: 1,
                slidesPerColumn: 2,
            },
            992: {
                slidesPerView: 2,
                slidesPerColumn: 2,
            }
        }


    });

    var swiper_office = new Swiper('.office_item__slider', {
        slidesPerView: 2.5,
        spaceBetween: 10,
        navigation: {
            nextEl: '.office_item__slider_next',
            prevEl: '.office_item__slider_prev',
        },

        breakpoints: {
            1200: {
                slidesPerView: 6,
            },

            768: {
                slidesPerView: 4.5,
            },
            575: {
                slidesPerView: 2.5,
            },
            
            
        }

    });
  

    // tab logics

    const careerCountryItem = document.querySelectorAll('.career-country_item');
    const tabItem = document.querySelectorAll('.tab-item')
    
    careerCountryItem.forEach(function(e){
        e.addEventListener('click', function(e){
            careerCountryItem.forEach(function(e){
                e.classList.remove('career-country_item--active');//убираем выделение с неактивной кнопки
            })
            e.target.classList.toggle('career-country_item--active');//активная кнопка
            //смена контента по нажатию
            e.target.getAttribute('data-tab')//получает data атрибут кнопки
            tabItem.forEach(function(tabItem){
                if(e.target.getAttribute('data-tab') === tabItem.getAttribute('data-tab')){//находим одинакоые data-tab атрибуты
                    
                    tabItem.classList.add('collapse-list--show')

                }
                else {
                    tabItem.classList.remove('collapse-list--show')
                }
                
            })
        })
    })
    
    progressBar();

    function progressBar() {
        let h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight',
        progress = document.querySelector('.progress-bar__line'),
        scroll;

        document.addEventListener('scroll', () => {
            scroll = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
            progress.style.setProperty('--scroll', scroll + '%');
        });
    }

    scrollTop();

    function scrollTop() {
        const scrollTop =  document.querySelector('.go-top')
        const scrollTopClassShow = 'go-top--show';
        // const hero = document.querySelector('.hero');
        const header = document.querySelector('header');

        if(!header) return;

        window.addEventListener('scroll', () => {
            if(window.pageYOffset >= parseInt(getComputedStyle(header).height)) {
                scrollTop.classList.add(scrollTopClassShow);
            }
            else {
                scrollTop.classList.remove(scrollTopClassShow);
            }
        });

        scrollTop.addEventListener('click', () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    footerInputFocus();

    function footerInputFocus() {
        const input = document.querySelector('.footer-form__input');
        if(!input) return;

        input.addEventListener('focus', handler);
        input.addEventListener('blur', handler);

        function handler() {
            const field = input.closest('.footer-form__controls');
            field.classList.toggle('footer-form__controls--focused')
        }
    }

    

    searchToggle();

    function searchToggle() {
        const search = document.querySelector('.search');
        if(!search) return;
        const searchInput = document.querySelector('.search-form__input');

        const btnOpen = document.querySelector('.header-search');
        const btnOpenM = document.querySelector('.header-search-mobile');
        const btnClose = document.querySelector('.search__close');

        btnOpen.addEventListener('click', () => {
            toggle();
            window.setTimeout(() => {
                searchInput.focus();
            }, 500);
        });
        if (btnOpenM){
            btnOpenM.addEventListener('click', () => {
                toggle();
                window.setTimeout(() => {
                    searchInput.focus();
                }, 500);
            });
        }
        
        btnClose.addEventListener('click', toggle);
     
        function toggle() {
            search.classList.toggle('search--show');
            
        }

    }

    modal();

    function modal() {
        const buttonsOpen = document.querySelectorAll('[data-modal]');
        if(buttonsOpen) {
            buttonsOpen.forEach(btn => {
                btn.addEventListener('click', e => {
                    e.preventDefault(); 
                    const selector = btn.getAttribute('data-modal');
                    const modal = document.querySelector(selector);
                    if(!modal) return;

                    modal.classList.add('modal--show');
                });
            });
        }

        const buttonsClose = document.querySelectorAll('.modal__close');
        if(buttonsClose) {
            buttonsClose.forEach(btn => {
                btn.addEventListener('click', () => {
                    const modal = btn.closest('.modal');
                    modal.classList.remove('modal--show');
                });
            });
        }

        const modals = document.querySelectorAll('.modal');
        if(modals) {
            modals.forEach(modal => {
                modal.addEventListener('click', e => {
                    const elem = e.target;
                    console.log(elem)
                    if(!elem.closest('.modal__content') && modal.classList.contains('modal--show')|| elem.classList.contains('modal-2__button')) {
                        modal.classList.remove('modal--show');
                    }
                });
            });
        }

        

        
    }

    dropDown();
    
    function dropDown() {
        const dropdownButtons = document.querySelectorAll('.dropdown-btn');

        dropdownButtons.forEach(btn => {
            btn.addEventListener('click', toggle);
        });

        function toggle(e) {
            const btn = e.target;
            let dropdown = btn.closest('.dropdown');
            let dropdown_content = document.querySelector('.dropdown-content__about');
            let dropdown_content_all = document.querySelector('.dropdown-content__all');
            if(!dropdown) {
                dropdown = document.querySelector('.dropdown--show');
                //dropdown.classList.remove('dropdown--show');
                
            }
            else {
                dropdown.classList.toggle('dropdown--show');
                dropdown_content.classList.remove('open');
                dropdown_content_all.textContent = 'Смотреть все';
                if(dropdown.classList.contains('dropdown--show')) {
                    window.addEventListener('click', windowClickHandler);
                }
                else {
                    window.removeEventListener('click', windowClickHandler);
                }
            }
        }

        function windowClickHandler(e) {
            const elem = e.target;
            if(!elem.closest('.dropdown') && !elem.closest('.dropdown-btn')) {
                toggle(e);
            }
        }

    }

    employeeSticky();

    function employeeSticky() {
        const employee = document.querySelector('.employee-sticky');
        const employeeInfo = document.querySelector('.employee-info');
        if(!employee) return;

        window.addEventListener('scroll', () => {
            console.log(employeeInfo.getBoundingClientRect().y)
            if(employeeInfo.getBoundingClientRect().y < 115 ) {
                employee.classList.add('employee-sticky--show');
            }
            else {
                employee.classList.remove('employee-sticky--show');
            } 
            if(employeeInfo.getBoundingClientRect().y < -1488) {
                employee.classList.add('employee-sticky--abs')
            }
             
            else {
                employee.classList.remove('employee-sticky--abs') 
            }
        });
    }

    // coolie close 
    let cookieClose = document.querySelector('.cookie-close');
    let cookie = document.querySelector('.cookie')

    if(cookieClose) {
        cookieClose.addEventListener('click', e => {
            cookie.classList.remove('cookie--show');
        })
    }

    // списко сотрудников логика

    const dropdawn__button = document.querySelectorAll('.form-group .dropdawn__button');
    const dropdown__list = document.querySelectorAll('.dropdown__list')
    const dropdown__item = document.querySelectorAll('.dropdown__item')

    dropdawn__button.forEach(function(elem){
        elem.addEventListener('click', function(){
            elem.nextElementSibling.classList.toggle('dropdown__list_visible')
            elem.classList.toggle('dropdawn__button_active')
            
        })
    })

    dropdown__list.forEach(function(elem){
        elem.querySelectorAll('.dropdown__item').forEach(function(elemItem) {
            
            elemItem.addEventListener('click', function(e){
                e.stopPropagation();
                elemItem.closest('.form-group').querySelector('.dropdawn__button').innerText = this.innerText;
                elem.classList.remove('dropdown__list_visible')
                elem.previousElementSibling.classList.remove('dropdawn__button_active')
            })
        })
    })

    //закрытие дропдауна по клие вне формы
    document.addEventListener('click', function(e){
        dropdawn__button.forEach(function(elem){
            if(e.target !== elem) {
                elem.classList.remove('dropdawn__button_active');
                elem.nextElementSibling.classList.remove('dropdown__list_visible')
            }
        })
    })

    // закрытие дропдауна по Tab и Esc
    document.addEventListener('keydown', function(e){
        dropdawn__button.forEach(function(elem){
            if(e.key === 'Tab' || e.key === 'Escape') {
                elem.classList.remove('dropdawn__button_active');
                elem.nextElementSibling.classList.remove('dropdown__list_visible')
            }
        })
    })

//   движение девушеи по скролу 

    function girlDrive(){
        if(screen.width > 1200) {
            var a = document.querySelector('.about-section__employee_legal'), b = null, 
            P = 100;//отступ от начала экрана
            window.addEventListener('scroll', Ascroll, false);
            document.body.addEventListener('scroll', Ascroll, false);
            function Ascroll() {
            if (b == null) {
                var Sa = getComputedStyle(a, ''), s = '';
                for (var i = 0; i < Sa.length; i++) {
                if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
                    s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
                }
                }
                b = document.createElement('div');
                b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
                a.insertBefore(b, a.firstChild);
                var l = a.childNodes.length;
                for (var i = 1; i < l; i++) {
                b.appendChild(a.childNodes[1]);
                }
                a.style.height = b.getBoundingClientRect().height + 'px';
                a.style.padding = '0';
                a.style.border = '0';
            }
            var Ra = a.getBoundingClientRect(),
                R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('.about-section__content').getBoundingClientRect().bottom);  // селектор блока, при достижении нижнего края которого нужно открепить прилипающий элемент
            if ((Ra.top - P) <= 0 ) {
                console.log(Ra.top - P)
                console.log(R + 'r')
                if (((Ra.top - P)) <= R) {
                    console.log(Ra.top - P)
                b.className = 'about-section__employee_legal--stop';
                b.style.top = - R +'px';
                } else {
                b.className = 'about-section__employee_legal--sticky';
                b.style.top = P + 'px';
                }
            } else {
                b.className = '';
                b.style.top = '';
            }
            window.addEventListener('resize', function() {
                a.children[0].style.width = getComputedStyle(a, '').width
            }, false);
            }
        }
    }

    function shareDrive(){
        if(screen.width > 778) {
            var a = document.querySelector('.share-content-list'), b = null, 
            P = 100;//отступ от начала экрана
            window.addEventListener('scroll', Ascroll, false);
            document.body.addEventListener('scroll', Ascroll, false);
            function Ascroll() {
            if (b == null) {
                var Sa = getComputedStyle(a, ''), s = '';
                for (var i = 0; i < Sa.length; i++) {
                if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
                    s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
                }
                }
                b = document.createElement('div');
                b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
                a.insertBefore(b, a.firstChild);
                var l = a.childNodes.length;
                for (var i = 1; i < l; i++) {
                b.appendChild(a.childNodes[1]);
                }
                a.style.height = b.getBoundingClientRect().height + 'px';
                a.style.padding = '0';
                a.style.border = '0';
            }
            var Ra = a.getBoundingClientRect(),
                R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('.last-news_content').getBoundingClientRect().bottom);  // селектор блока, при достижении нижнего края которого нужно открепить прилипающий элемент
            if ((Ra.top - P) <= 0 ) {
                console.log(Ra.top - P)
                console.log(R + 'r')
                if (((Ra.top - P)) <= R) {
                    console.log(Ra.top - P)
                b.className = 'share--stop';
                b.style.top = - R +'px';
                } else {
                b.className = 'share--sticky';
                b.style.top = P + 'px';
                }
            } else {
                b.className = '';
                b.style.top = '';
            }
            window.addEventListener('resize', function() {
                a.children[0].style.width = getComputedStyle(a, '').width
            }, false);
            }
        }
    }

    if(document.querySelector('.about-section__employee_legal') !== null){
        girlDrive()
    }

    if(document.querySelector('.share') !== null) {
        shareDrive() 
    }

    // read-more-show

    const readMore =  document.querySelector('.read-more');
    const lastNewsContentTextWrapp = document.querySelector('.last-news_content__text-wrapp')
    if(readMore !== null){
        readMore.addEventListener('click', function(){
            lastNewsContentTextWrapp.classList.toggle('last-news_content__text-wrapp--show')
            readMore.classList.toggle("read-more--show")
            if(readMore.classList.contains('read-more--show')) {
                readMore.innerHTML='Скрыть'
            }
            else {
                readMore.innerHTML='Читать все'
            } 
        })
    }

    var swiper = new Swiper('.all-office__list', {
        slidesPerView: 3,
        slidesPerColumn: 2,
        spaceBetween: 30,
        // loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        pagination: {
        el: '.swiper-pagination',
        clickable: true,
        },

        breakpoints: {

            320: {
                slidesPerView: 1,
                slidesPerColumn: 2,
            },

            576: {
                slidesPerView: 2,
                slidesPerColumn: 2,
            },


            992: {
                slidesPerView: 3,
                slidesPerColumn: 2,
            }
        }


    });

    //сортировка сотрудников
    
    var swiper_all_team = new Swiper('.all-team__list', {
        slidesPerView: 2,
        slidesPerColumn: 2,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
            nextEl: '.all-team__next',
            prevEl: '.all-team__prev',
        },

        breakpoints: {

            320: {
                slidesPerView: 2,
                slidesPerColumn: 2,
            },
            768: {
                slidesPerView: 4,
                slidesPerColumn: 2,
            }
        }

    });

      //collapse show
    //   const collapseItem = document.querySelectorAll('.collapse-item');
    //   collapseItem.forEach(function(e){
    //       const tabButton = e.querySelector('.collapse-button');
    //       console.log(tabButton)
    //       tabButton.addEventListener('click', function(){
    //           // document.querySelectorAll('.collapse-button').forEach((e)=>{e.classList.remove('collapse-button--show')})
    //           // document.querySelectorAll('.collapse-text').forEach((e)=>{e.classList.remove('collapse-text--show')})
    //           this.closest('.collapse-item').querySelector('.collapse-text').classList.toggle('collapse-text--show')
    //           this.classList.toggle('collapse-button--show')
              
    //       })
    //   })
      $('.collapse-button').click(function () {
        if($(this).hasClass('collapse-button--show')){
            $(this).removeClass("collapse-button--show");
            $(this).parents('.collapse-item').find('.collapse-text').slideUp();
            
        }else{
            $('.collapse-button').removeClass("collapse-button--show")
            $(this).addClass("collapse-button--show");
            $('.collapse-text').slideUp();
            $(this).parents('.collapse-item').find('.collapse-text').slideDown();
            
        }    
     });

     $(".all__office_list-wrap .all__office_item").click(function () {
        var tab = $(this).data("index");
        $(".all__office_content_tab").removeClass("active");
        $(".all__office_list-wrap .all__office_item").removeClass("all__office_item--active");
        $(this).addClass("all__office_item--active");
        $(tab).addClass("active");
    });
    $(".header__top .menu-toggle").click(function (e) {
        e.preventDefault();
        
        $(this).toggleClass("active");
        $(this).parent().find('.menu').toggleClass("menu--show ");
    });

    if($(window).width() > 910) {
        $(document).mouseup(function (e) {
            if(!e.target.parentElement.classList.contains('active')) {
                var headerCountries = $(".header-countries");
                var headerPhones = $(".header-phones");
                var menuBurger = $(".menu--show ");
                var menuToggleBtn = $(".header__top .menu-toggle");
                
                if (headerPhones.parent().has(e.target).length === 0){
                    headerPhones.removeClass('dropdown--show');
                }

                if (headerCountries.parent().has(e.target).length === 0){
                    headerCountries.removeClass('dropdown--show');
                }
                if (menuBurger.parent().has(e.target).length === 0){
                    menuBurger.removeClass('menu--show');
                    menuToggleBtn.removeClass('active');

                }
                
            }
        });
        $(document).mouseup(function (e) {
            if(!e.target.parentElement.classList.contains('active')) {
                var container2 = $(".side-menu-container");
                if (container2.parent().has(e.target).length === 0){
                    $('.side_menu').removeClass('open');
                    $('.main_menu').removeClass('active');
                    $("body").removeClass("menu_open");
                    // $('.mobile_menu').slideUp()
                }
            }

        });
    }
    $(".button-call-fone").click(function () {
       var data_fone = $(this).data('fone');
       $(document).find('[data-modal-fone="' + data_fone + '"]').addClass('open');
        
    });
    $(".countries-slider__fone-close").click(function () {
       $(this).parent().removeClass('open');
         
     });

    $('.dropdown-content__all').click(function () {
        $(this).prev().toggleClass('open');
        if($(this).prev().hasClass("open")){
            
            $(this).text('Свернуть');
        } else {
            $(this).text('Смотреть все');
        }
     });

    $(window).on('load', function(){
       
    });
    $(window).scroll(function(){ 
        $('.popular-article').addClass('open');
	  });
	
    $('.popular-article__close').click(function () {
        $(this).parents('.popular-article').remove();
     });

     $('.site-map__item-name').click(function () {
        $(this).toggleClass('open');
        $(this).next().slideToggle();
      
     });

    //filter 

    $(".dropdown__item").on("click", function(){
        var filter = $(this).html().toLowerCase();
        console.log(filter)
        var slidesxcol;
        $(".dropdown__item")
        $(".dropdown__item").removeClass("active");
        $('.all-team__button').text('Сброс');
        $(this).addClass("active");
        $(".swiper-slide").not("[data-filter='"+filter+"']").addClass("non-swiper-slide").removeClass("swiper-slide").hide();
		$("[data-filter='"+filter+"']").removeClass("non-swiper-slide").addClass("swiper-slide").attr("style", null).show();
        console.log($(".swiper-slide").length)
        if($(".swiper-slide").length > 6)
            slidesxcol = 3;
        else slidesxcol = 1;
        document.querySelector('.all-team .swiper-container').style.height="auto";
        swiper_all_team.update();   
    })

    $(".all-team__button").on("click", function(){
        $(this).text('Поиск');
        $('.team-list-item').removeClass("non-swiper-slide").addClass("swiper-slide").show()
        document.querySelector('.all-team .swiper-container').style.height="800px";
        swiper_all_team.update();   
    })

  
    $( ".modal-form-field input, .modal-form-field textarea" ).focusin(function(){ 
	    $(this).parent().addClass('foc');
	  });
    //   $( ".modal-form-field input, .modal-form-field textarea" ).focusout(function(){ 
	//     $(this).parent().removeClass('foc');
	//   });
      
    // сортировка публикаций

    var swiper = new Swiper('.publications__list', {
        slidesPerView: 1,
        slidesPerColumn: 2,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {

            575: {
                slidesPerView: 2,
                slidesPerColumn: 2,
                spaceBetween: 30,
            },
          
        }


    });

    var swiper = new Swiper('.polular-publications__list', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    })

    var swiper = new Swiper('.search-results__list', {
        slidesPerView: 1,
        // spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    })

    //курсор gif  за мышкой

    let errorPageWrap = document.querySelector('.error-page__wrap');
    let gifCursor = document.querySelector('.gif-cursor')
    if(errorPageWrap) {
        errorPageWrap.addEventListener('mousemove', function(){
            errorCursorPos = event.pageX;
            gifCursor.classList.add('gif-cursor--active');
            gifCursor.style.transform = "translate(" + event.pageX + "px, "+ event.pageY + "px)";
            gifCursor.style.transform = "-webkit-translate(" + event.pageX + "px, "+ event.pageY + "px)";
            gifCursor.style.transform = "-ms-translate(" + event.pageX + "px, "+ event.pageY + "px)";
        })
    
        errorPageWrap.addEventListener('mouseout', function(){
            gifCursor.classList.remove('gif-cursor--active')
    
        })  
    }
   

    // кастомный select в модалках
    let modalSelect = document.querySelectorAll('.modal-select')
    modalSelect.forEach(e => {
        let modalSectionName = e.querySelector('.modal-section-name')
        let modalSelectList = e.querySelector('.modal-select-list')
        let modalSelectListInput = e.querySelectorAll('.modal-select-list input')
        modalSectionName.addEventListener('click', ()=> {
            modalSelectList.classList.toggle('modal-select-list--active')
        })

        modalSelectListInput.forEach(target =>{
            target.addEventListener('click', ()=> {
                modalSectionName.value = target.value;
                modalSelectList.classList.remove('modal-select-list--active')
            })
        })
    })
    
});

