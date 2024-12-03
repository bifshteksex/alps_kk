<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404</title>

    <link
        href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i,900,900i&subset=cyrillic,cyrillic-ext,latin-ext"
        rel="stylesheet">
    <link rel="stylesheet" href="./css/libs.min.css">
    <link rel="stylesheet" href="./css/main.css">
    <link rel="stylesheet" href="./css/style.bundle.css">
    <link rel="stylesheet" href="./css/styles.css">
    <link rel="stylesheet" href="./css/slick.min.css">
    <link rel="stylesheet" href="./css/style.css?v=32">
    <link rel="stylesheet" href="./css/global.css?v=32">
    @vite('resources/css/app.css')


    <link
        href="https://fonts.googleapis.com/css?family=DM+Sans:400,400i,500,500i,700,700i&display=swap&subset=latin-ext"
        rel="stylesheet">
    <link
        href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow:400,700|PT+Sans:400,400i,700,700i&display=swap&subset=cyrillic,cyrillic-ext,latin-ext"
        rel="stylesheet">
</head>

<body>
    <header class="header header-main header-404 " id="header">
        <div class="header__top">
            <div class="header__top-content header__top-content_404">
                <button type="button" class="header__btn menu-toggle menu-toggle--open">
                    <svg class="menu-toggle__icon menu-toggle__icon--open header__btn-icon">
                        <use xlink:href="./images/sprite.svg#i-menu-open"></use>
                    </svg>
                    <svg class="menu-toggle__icon menu-toggle__icon--open">
                        <use xlink:href="#i-ce-menu"></use>
                    </svg>
                    <div class="menu-toggle__text menu-toggle__text--open">Меню</div>
                </button>
                <div class="header-phones header-dropdown dropdown">
                    <button type="button" class="dropdown-btn header-phones__btn header-dropdown__btn header__btn">
                        <span class="header-phones__btn-text">Телефоны</span>
                        <svg
                            class="dropdown-icon header-phones__icon header-phones__icon--arrow header__btn-icon header__btn-icon--arrow">
                            <use xlink:href="./images/sprite.svg#i-arrow-down"></use>
                        </svg>
                        <svg class="header-phones__icon header-phones__icon--phone header__btn-icon">
                            <use xlink:href="./images/sprite.svg#i-phone"></use>
                        </svg>
                    </button>
                    <div class="dropdown-content">
                        <a href="tel:+44 (778) 9023053" class="dropdown-content__link">Великобритания +44 (778)
                            9023053</a>
                        <a href="tel:+7 (499) 921-02-22" class="dropdown-content__link">Россия +7 (499) 921-02-22</a>
                        <a href="tel:+7 (7172) 727-783" class="dropdown-content__link">Казахстан +7 (7172) 727-783</a>
                        <a href="tel:+998 (90) 901-177" class="dropdown-content__link">Узбекистан +998 (90) 901-177</a>
                        <a href="tel:+994 (50) 719 1545" class="dropdown-content__link">Азербайджан +994 (50) 719
                            1545</a>
                        <a href="tel:+371 (2) 9340617" class="dropdown-content__link">Латвия +371 (2) 9340617</a>
                        <a href="tel:+374 (91) 190494" class="dropdown-content__link">Армения +374 (91) 190494</a>
                    </div>
                </div>
                <a href="/" class="header-logo">
                    <img src="./images/main-page/logo.png" alt="" class="header-logo__img">
                </a>
                <div class="header-search">
                    <button type="button" class="header-search__btn header__btn">
                        <svg class="header-search__icon header__btn-icon">
                            <use xlink:href="./images/sprite.svg#i-search"></use>
                        </svg>
                        <span class="header__btn-text">Поиск</span>
                    </button>
                </div>
                <div class="header-countries header-dropdown dropdown">
                    <button type="button" class="dropdown-btn header-countries__btn header-dropdown__btn header__btn">
                        RU
                        <svg class="header-countries__icon header__btn-icon header__btn-icon--arrow">
                            <use xlink:href="./images/sprite.svg#i-arrow-down"></use>
                        </svg>
                    </button>
                    <div class="dropdown-content">
                        <a href="#" class="dropdown-content__link">EN</a>
                        <a href="#" class="dropdown-content__link">DE</a>
                        <a href="#" class="dropdown-content__link">FR</a>
                        <a href="#" class="dropdown-content__link">ES</a>
                        <a href="#" class="dropdown-content__link">IT</a>
                        <a href="#" class="dropdown-content__link">JP</a>
                    </div>
                </div>
                <a href="#" class="header-signin header__btn" data-modal=".modal--login">
                    <span class="header__btn-text">Вход в кабинет</span>
                    <svg class="header-signin__icon header__btn-icon">
                        <use xlink:href="./images/sprite.svg#i-signin"></use>
                    </svg>
                </a>
            </div>
        </div>
    </header>

    <main>
        <section class="menu">
            <div class="menu__content main-menu__content">
                <div class="menu__top">
                    <button type="button" class="header__btn menu-toggle menu-toggle--close">
                        <svg class="menu-toggle__icon menu-toggle__icon--close">
                            <use xlink:href="./images/sprite.svg#i-menu-close"></use>
                        </svg>
                        <div class="menu-toggle__text">Закрыть</div>
                    </button>

                    <div class="menu__phones header-dropdown dropdown">
                        <button type="button"
                            class="menu__phones-btn dropdown-btn header-phones__btn header-dropdown__btn header__btn">
                            <span class="header-phones__btn-text menu__phones-text">Телефоны</span>
                            <svg
                                class="menu__phones-icon dropdown-icon header-phones__icon header-phones__icon--arrow header__btn-icon header__btn-icon--arrow">
                                <use xlink:href="./images/sprite.svg#i-arrow-down"></use>
                            </svg>
                            <svg class="header-phones__icon header-phones__icon--phone header__btn-icon">
                                <use xlink:href="./images/sprite.svg#i-phone"></use>
                            </svg>
                        </button>
                        <div class="dropdown-content">
                            <a href="tel:+44 (778) 9023053" class="dropdown-content__link">Великобритания +44 (778)
                                9023053</a>
                            <a href="tel:+7 (499) 921-02-22" class="dropdown-content__link">Россия +7 (499)
                                921-02-22</a>
                            <a href="tel:+7 (7172) 727-783" class="dropdown-content__link">Казахстан +7 (7172)
                                727-783</a>
                            <a href="tel:+998 (90) 901-177" class="dropdown-content__link">Узбекистан +998 (90)
                                901-177</a>
                            <a href="tel:+994 (50) 719 1545" class="dropdown-content__link">Азербайджан +994 (50) 719
                                1545</a>
                            <a href="tel:+371 (2) 9340617" class="dropdown-content__link">Латвия +371 (2) 9340617</a>
                            <a href="tel:+374 (91) 190494" class="dropdown-content__link">Армения +374 (91) 190494</a>
                        </div>
                    </div>
                </div>
                <nav class="menu-nav">
                    <ul class="menu-nav-list">
                        <li class="menu-nav-item">
                            <a href="index.html" class="menu-nav-item__link">О компании</a>
                        </li>
                        <li class="menu-nav-item">
                            <a href="#" class="menu-nav-item__link">Услуги</a>
                        </li>
                        <li class="menu-nav-item">
                            <a href="#" class="menu-nav-item__link">Страны</a>
                        </li>
                        <li class="menu-nav-item">
                            <a href="publications.html" class="menu-nav-item__link">Публикации</a>
                        </li>
                        <li class="menu-nav-item">
                            <a href="vebinar.html" class="menu-nav-item__link">Мероприятия</a>
                        </li>
                        <li class="menu-nav-item">
                            <a href="#" class="menu-nav-item__link">Контакты</a>
                        </li>
                    </ul>
                </nav>
                <div class="menu-langs">
                    <a href="#" class="menu-langs-item menu-langs-item--current">RU</a>
                    <a href="#" class="menu-langs-item">EN</a>
                    <a href="#" class="menu-langs-item">DE</a>
                    <a href="#" class="menu-langs-item">FR</a>
                    <a href="#" class="menu-langs-item">ES</a>
                    <a href="#" class="menu-langs-item">IT</a>
                    <a href="#" class="menu-langs-item">JP</a>
                </div>
                <a href="mailto:info@alpschase.com" class="menu__email">info@alpschase.com</a>
                <ul class="socials">
                    <li class="socials-item">
                        <a href="#" class="socials-item__link" target="blank">
                            <svg class="socials-item__link-icon">
                                <use xlink:href="./images/sprite.svg#i-fb"></use>
                            </svg>
                        </a>
                    </li>
                    <li class="socials-item">
                        <a href="#" class="socials-item__link" target="blank">
                            <svg class="socials-item__link-icon">
                                <use xlink:href="./images/sprite.svg#i-inst"></use>
                            </svg>
                        </a>
                    </li>
                    <li class="socials-item">
                        <a href="#" class="socials-item__link" target="blank">
                            <svg class="socials-item__link-icon">
                                <use xlink:href="./images/sprite.svg#i-tw"></use>
                            </svg>
                        </a>
                    </li>
                    <li class="socials-item">
                        <a href="#" class="socials-item__link" target="blank">
                            <svg class="socials-item__link-icon">
                                <use xlink:href="./images/sprite.svg#i-youtube"></use>
                            </svg>
                        </a>
                    </li>
                    <li class="socials-item">
                        <a href="#" class="socials-item__link" target="blank">
                            <svg class="socials-item__link-icon">
                                <use xlink:href="./images/sprite.svg#i-in"></use>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
        <section class="search">
            <div class="search__container container">
                <div class="search__content">
                    <h3 class="search__title">Что ищем?</h3>
                    <form action="" class="search-form">
                        <input type="text" class="search-form__input" placeholder="">
                        <button type="submit" class="search-form__btn">
                            <svg class="search-form__btn-icon">
                                <use xlink:href="./images/sprite.svg#i-search"></use>
                            </svg>
                            <span class="sr-only">Найти</span>
                        </button>
                    </form>
                    <button type="button" class="search__close">
                        <svg class="search__close-icon">
                            <use xlink:href="./images/sprite.svg#i-menu-close"></use>
                        </svg>
                        <span class="sr-only">Закрыть поиск</span>
                    </button>
                </div>
            </div>
        </section>
        <section class="error-page">
            <div class="container">
                <div class="error-page__wrap">
                    <a href="/" class="button batton-error">На главную</a>
                    <div class="error-page__content">
                        <div class="error-page__title">
                            <h1>ERROR 404</h1>
                        </div>
                        <p class="error-page__sub-title">К сожалению, страница не найдена. Но юристы с этим разберутся.
                        </p>
                        <svg class="error-page__svg" width="480" height="69" viewBox="0 0 480 69"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M373.116 41.208C373.26 41.88 373.332 43.008 373.332 44.592C373.332 46.176 373.26 47.304 373.116 47.976C372.972 48.648 372.612 49.272 372.036 49.848C371.196 50.688 370.134 51.108 368.85 51.108C367.554 51.108 366.486 50.688 365.646 49.848C365.082 49.284 364.728 48.666 364.584 47.994C364.44 47.322 364.368 46.188 364.368 44.592C364.368 42.996 364.44 41.862 364.584 41.19C364.728 40.518 365.082 39.9 365.646 39.336C366.486 38.496 367.554 38.076 368.85 38.076C370.134 38.076 371.196 38.496 372.036 39.336C372.612 39.912 372.972 40.536 373.116 41.208ZM371.802 47.544C371.91 46.968 371.964 45.984 371.964 44.592C371.964 43.2 371.91 42.222 371.802 41.658C371.694 41.082 371.448 40.596 371.064 40.2C370.464 39.6 369.726 39.3 368.85 39.3C367.974 39.3 367.236 39.6 366.636 40.2C366.252 40.596 366.006 41.082 365.898 41.658C365.79 42.222 365.736 43.2 365.736 44.592C365.736 45.984 365.79 46.968 365.898 47.544C366.006 48.108 366.252 48.588 366.636 48.984C367.236 49.584 367.974 49.884 368.85 49.884C369.726 49.884 370.464 49.584 371.064 48.984C371.448 48.588 371.694 48.108 371.802 47.544Z"
                                fill="#2B2B2B" />
                            <path
                                d="M384.647 41.208C384.791 41.88 384.863 43.008 384.863 44.592C384.863 46.176 384.791 47.304 384.647 47.976C384.503 48.648 384.143 49.272 383.567 49.848C382.727 50.688 381.665 51.108 380.381 51.108C379.085 51.108 378.017 50.688 377.177 49.848C376.613 49.284 376.259 48.666 376.115 47.994C375.971 47.322 375.899 46.188 375.899 44.592C375.899 42.996 375.971 41.862 376.115 41.19C376.259 40.518 376.613 39.9 377.177 39.336C378.017 38.496 379.085 38.076 380.381 38.076C381.665 38.076 382.727 38.496 383.567 39.336C384.143 39.912 384.503 40.536 384.647 41.208ZM383.333 47.544C383.441 46.968 383.495 45.984 383.495 44.592C383.495 43.2 383.441 42.222 383.333 41.658C383.225 41.082 382.979 40.596 382.595 40.2C381.995 39.6 381.257 39.3 380.381 39.3C379.505 39.3 378.767 39.6 378.167 40.2C377.783 40.596 377.537 41.082 377.429 41.658C377.321 42.222 377.267 43.2 377.267 44.592C377.267 45.984 377.321 46.968 377.429 47.544C377.537 48.108 377.783 48.588 378.167 48.984C378.767 49.584 379.505 49.884 380.381 49.884C381.257 49.884 381.995 49.584 382.595 48.984C382.979 48.588 383.225 48.108 383.333 47.544Z"
                                fill="#2B2B2B" />
                            <path
                                d="M396.822 41.946C396.822 43.086 396.45 44.004 395.706 44.7C394.974 45.384 394.026 45.726 392.862 45.726H389.46V51H388.092V38.184H392.862C394.038 38.184 394.992 38.532 395.724 39.228C396.456 39.912 396.822 40.818 396.822 41.946ZM394.716 43.854C395.208 43.41 395.454 42.774 395.454 41.946C395.454 41.118 395.208 40.488 394.716 40.056C394.236 39.624 393.582 39.408 392.754 39.408H389.46V44.502H392.754C393.582 44.502 394.236 44.286 394.716 43.854Z"
                                fill="#2B2B2B" />
                            <path
                                d="M407.152 47.472C407.152 48.588 406.75 49.476 405.946 50.136C405.142 50.784 404.068 51.108 402.724 51.108C401.764 51.108 400.942 50.976 400.258 50.712C399.574 50.448 398.938 50.016 398.35 49.416L399.268 48.498C399.784 49.014 400.306 49.374 400.834 49.578C401.374 49.782 402.016 49.884 402.76 49.884C403.708 49.884 404.452 49.68 404.992 49.272C405.532 48.852 405.802 48.264 405.802 47.508C405.802 46.812 405.592 46.278 405.172 45.906C404.848 45.606 404.29 45.396 403.498 45.276L402.004 45.06C400.996 44.904 400.216 44.58 399.664 44.088C399.004 43.5 398.674 42.696 398.674 41.676C398.674 40.584 399.04 39.714 399.772 39.066C400.516 38.406 401.518 38.076 402.778 38.076C403.582 38.076 404.278 38.19 404.866 38.418C405.466 38.634 406.042 38.988 406.594 39.48L405.712 40.362C404.932 39.618 403.936 39.246 402.724 39.246C401.872 39.246 401.206 39.462 400.726 39.894C400.246 40.326 400.006 40.908 400.006 41.64C400.006 42.3 400.198 42.798 400.582 43.134C400.954 43.458 401.512 43.68 402.256 43.8L403.75 44.034C404.35 44.13 404.812 44.244 405.136 44.376C405.472 44.496 405.784 44.688 406.072 44.952C406.792 45.576 407.152 46.416 407.152 47.472Z"
                                fill="#2B2B2B" />
                            <path
                                d="M412.028 38.184L411.83 47.4H410.714L410.534 38.184H412.028ZM412.046 51H410.498V49.488H412.046V51Z"
                                fill="#2B2B2B" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M479.308 43.6541C479.308 56.1656 469.166 66.3082 456.654 66.3082C444.143 66.3082 434 56.1656 434 43.6541C434 31.1426 444.143 21 456.654 21C469.166 21 479.308 31.1426 479.308 43.6541ZM451.26 43.6541C451.26 45.4415 449.811 46.8904 448.024 46.8904C446.237 46.8904 444.788 45.4415 444.788 43.6541C444.788 41.8667 446.237 40.4178 448.024 40.4178C449.811 40.4178 451.26 41.8667 451.26 43.6541ZM465.284 46.8904C467.072 46.8904 468.521 45.4415 468.521 43.6541C468.521 41.8667 467.072 40.4178 465.284 40.4178C463.497 40.4178 462.048 41.8667 462.048 43.6541C462.048 45.4415 463.497 46.8904 465.284 46.8904Z"
                                fill="#FFFEFE" fill-opacity="0.5" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M324.709 54.816L324.709 63.27H315.421C305.06 63.27 296.661 54.871 296.661 44.5102H247.038C225.199 44.5102 190.739 51.161 158.233 57.4349C136.145 61.6979 114.959 65.7869 99.2466 67.4971C78.8968 69.712 58.3619 69.0254 36.3081 68.288H36.308C24.6917 67.8996 12.654 67.4971 0 67.4971V63.27C5.54243 63.27 14.5939 63.4875 25.354 63.746L25.3543 63.746L25.3546 63.746C41.1225 64.1249 60.5594 64.5918 78 64.5918C93.7661 64.5918 123.023 59.2622 154.373 53.5513C187.375 47.5396 222.695 41.1054 247.038 40.0215H296.661C296.661 29.5162 305.177 21 315.682 21H324.709L324.709 50.589H342.013C343.18 50.589 344.127 51.5353 344.127 52.7025C344.127 53.8698 343.18 54.816 342.013 54.816H324.709ZM324.709 30.5675H342.013C343.181 30.5675 344.127 31.5138 344.127 32.681C344.127 33.8483 343.181 34.7945 342.013 34.7945H324.709V30.5675Z"
                                fill="#FFFEFE" fill-opacity="0.5" />
                            <path d="M373 21.5L362 4" stroke="white" stroke-opacity="0.5" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M416 4L405 21.5" stroke="white" stroke-opacity="0.5" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M389 1V19" stroke="white" stroke-opacity="0.5" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <a href="index.html" class="button batton-error">О компании</a>

                </div>
            </div>
        </section>
        <div class="gif-cursor"></div>
    </main>

    <footer class="footem-main">
        <nav class="footer-main__nav">
            <div class="footer-main__item">
                <a href="services.html">Услуги</a>
            </div>
            <div class="footer-main__item">
                <a href="sity.html">Страны</a>
            </div>
            <div class="footer-main__item">
                <a href="#">Контакты</a>
            </div>
        </nav>
    </footer>
    <button type="button" class="go-top">
        <svg class="go-top__icon">
            <use xlink:href="./images/sprite.svg#i-go-top"></use>
        </svg>
        <span class="go-top__text r-only">Вверх</span>
    </button>

    <div class="progress-bar">
        <div class="progress-bar__line"></div>
    </div>

    <div class="modal modal--request">
        <div class="container">
            <div class="modal__content">
                <div class="modal__info">
                    <h3 class="modal__title">ОТПРАВИТЬ ЗАЯВКУ</h3>
                    <form action="" class="modal-form">
                        <label class="modal-form-field">
                            <span class="modal-form-field__text">Ваше имя</span>
                            <input type="text" class="modal-form__control modal-form__control--name"
                                placeholder="Андрей Петров">
                        </label>
                        <label class="modal-form-field">
                            <span class="modal-form-field__text">Номер телефона</span>
                            <input type="text" class="modal-form__control" placeholder="+">
                        </label>
                        <label class="modal-form-field">
                            <textarea type="text" class="modal-form__control modal-form__control--textarea"
                                placeholder="Сформулируйте ваш запрос"></textarea>
                        </label>
                        <div class="modal-form-row">
                            <button class="modal-form__btn">Отправить</button>
                            <div class="modal-form__pp">
                                Нажимая кнопку "Отправить" я даю своё согласие на обработку моих персональных данных на
                                условиях
                                <a href="#" class="modal-form__pp-link" target="blank">Соглашения</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <button type="button" class="modal__close">
            <svg class="modal__close-icon">
                <use xlink:href="./images/sprite.svg#i-menu-close"></use>
            </svg>
            <span class="sr-only">Закрыть</span>
        </button>
    </div>

    <div class="modal modal-2 modal--registration">
        <div class="container">
            <div class="modal__content">
                <div class="modal__info">
                    <h3 class="modal__title">Личный кабинет <br> ALPS & CHASE</h3>
                    <p class="modal__sub-title">Пожалуйста, зарегистрируйтесь, чтобы войти.</p>
                    <form action="" class="modal-form">
                        <label class="modal-form-field">
                            <span class="modal-form-field__text">Имя</span>
                            <input type="text" class="modal-form__control modal-form__control--name"
                                placeholder="Имя">
                        </label>
                        <label class="modal-form-field">
                            <span class="modal-form-field__text">Фамилия</span>
                            <input type="text" class="modal-form__control  modal-form__control--name"
                                placeholder="Фамилия">
                        </label>
                        <label class="modal-form-field">
                            <span class="modal-form-field__text">E-mail</span>
                            <input type="text" class="modal-form__control modal-form__control--name"
                                placeholder="e-mail">
                        </label>
                        <label class="modal-form-field">
                            <span class="modal-form-field__text">Пароль</span>
                            <input type="password" class="modal-form__control  modal-form__control--name"
                                placeholder="Пароль">
                        </label>
                        <label class="modal-form-field">
                            <span class="modal-form-field__text">Компания</span>
                            <input type="text" class="modal-form__control  modal-form__control--name"
                                placeholder="Пароль">
                        </label>

                        <label class="modal-form-field modal-select">
                            <select name="status" id="status" class="sr-only">
                                <option value="Клиент"></option>
                                <option value="Партнер"></option>
                            </select>
                            <span class="modal-form-field__text">Компания?</span>
                            <input type="text" readonly
                                class="modal-section-name modal-form__control  modal-form__control--name"
                                placeholder="Статус">
                            <div class="modal-select-list">
                                <label for="company" class="modal-select-item">
                                    <input type="checkbox" value="Компания" id="company" class="sr-only">
                                    <span>Компания</span>
                                </label>
                                <label for="private" class="modal-select-item">
                                    <input type="checkbox" value="Частное лицо" id="private" class="sr-only">
                                    <span>Частрое лицо</span>
                                </label>
                            </div>
                        </label>
                        <label class="modal-form-field modal-select">
                            <select name="status" id="status" class="sr-only">
                                <option value="Клиент"></option>
                                <option value="Партнер"></option>
                            </select>
                            <span class="modal-form-field__text">Статус</span>
                            <input type="text" readonly
                                class="modal-section-name modal-form__control  modal-form__control--name"
                                placeholder="Статус">
                            <div class="modal-select-list">
                                <label for="client" class="modal-select-item">
                                    <input type="checkbox" value="Клиент" id="client" class="sr-only">
                                    <span>Клиент</span>
                                </label>
                                <label for="partner" class="modal-select-item">
                                    <input type="checkbox" value="Партнер" id="partner" class="sr-only">
                                    <span>Партнер</span>
                                </label>
                            </div>
                        </label>
                        <label for="personal-data" class="personal-data__label">
                            <input type="checkbox" id="personal-data" class="personal-data__input sr-only">
                            <span class="personal-data__text">Даю согласие на обработку персональных данных</span>
                        </label>

                        <div class="modal-2_-button-list">
                            <button class="modal-2__button">войти</button>
                            <button class="modal-2__button">регистрация</button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
        <button type="button" class="modal__close">
            <svg class="modal__close-icon">
                <use xlink:href="./images/sprite.svg#i-menu-close"></use>
            </svg>
            <span class="sr-only">Закрыть</span>
        </button>
    </div>

    <div class="modal modal-2 modal--login">
        <div class="container">
            <div class="modal__content">
                <div class="modal__info">
                    <h3 class="modal__title">Вход</h3>
                    <p class="modal__sub-title">Пожалуйста, авторизируйтесь, чтобы войти в личный кабинет.</p>
                    <form action="" class="modal-form">
                        <label class="modal-form-field">
                            <span class="modal-form-field__text">Логин</span>
                            <input type="text" class="modal-form__control modal-form__control--name"
                                placeholder="Имя">
                        </label>
                        <label class="modal-form-field">
                            <span class="modal-form-field__text">Пароль</span>
                            <input type="password" class="modal-form__control  modal-form__control--name"
                                placeholder="Пароль">
                        </label>
                        <label for="remain-system" class="personal-data__label">
                            <input type="checkbox" id="remain-system" class="personal-data__input sr-only">
                            <span class="personal-data__text">Оставаться в системе</span>
                            <button class="forgot-pass-button">Забыли пароль?</button>
                        </label>
                        <div class="modal-2_-button-list">
                            <button class="modal-2__button">войти</button>
                            <button class="modal-2__button" data-modal=".modal--registration">регистрация</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <button type="button" class="modal__close">
            <svg class="modal__close-icon">
                <use xlink:href="./images/sprite.svg#i-menu-close"></use>
            </svg>
            <span class="sr-only">Закрыть</span>
        </button>
    </div>


    <!-- <div class="modal-login">
            <div class="container">
                <div class="modal__content">
                    <div class="modal__info">
                        <h3 class="modal__title">ОТПРАВИТЬ ЗАЯВКУ</h3>
                        <form action="" class="modal-form">
                            <label class="modal-form-field">
                                <span class="modal-form-field__text">Ваше имя</span>
                                <input type="text" class="modal-form__control modal-form__control--name" placeholder="Андрей Петров">
                            </label>
                            <label class="modal-form-field">
                                <span class="modal-form-field__text">Номер телефона</span>
                                <input type="text" class="modal-form__control" placeholder="+">
                            </label>
                            <label class="modal-form-field">
                                <textarea type="text" class="modal-form__control modal-form__control--textarea"
                                    placeholder="Сформулируйте ваш запрос"></textarea>
                            </label>
                            <div class="modal-form-row">
                                <button class="modal-form__btn">Отправить</button>
                                <div class="modal-form__pp">
                                    Нажимая кнопку "Отправить" я даю своё согласие на обработку моих персональных данных на условиях
                                    <a href="#" class="modal-form__pp-link" target="blank">Соглашения</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div> -->
    <script src="./js/jquery-3.4.1.min.js"></script>
    <script src="//cdn.jsdelivr.net/gh/ranaroussi/pointjs/dist/point.js"></script>
    <script src="./js/swiper.min.js"></script>
    <script src="./js/slick.min.js"></script>
    <script src="./js/parallax.min.js"></script>
    <script src="./js/index.js?v=30"></script>
</body>

</html>
