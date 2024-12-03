<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>О Компании</title>

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
    @livewireStyles
    @livewireScripts


    <link
        href="https://fonts.googleapis.com/css?family=DM+Sans:400,400i,500,500i,700,700i&display=swap&subset=latin-ext"
        rel="stylesheet">
    <link
        href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow:400,700|PT+Sans:400,400i,700,700i&display=swap&subset=cyrillic,cyrillic-ext,latin-ext"
        rel="stylesheet">

    <meta property="og:title" content="Юридические и бухгалтерские услуги в России, странах СНГ и Балтии" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://alpschase.com/" />
    <meta property="og:image" content="https://alpschase.com/img/logo.png" />

    <script type="application/ld+json">
        {
            "@context" : "http://schema.org",
            "@type" : "LocalBusiness",
            "name": "ALPS & CHASE",
            "url": "https://alpschase.com",
            "image": "https://alpschase.com/img/logo.png", 
            "telephone" : ["+7 (499) 921 0222"],
            "email" : "moscow@alpschase.com",									
            "address" : {
                "@type" : "PostalAddress",
                "streetAddress" : "1-й Спасоналивковский пер., 16",
                "addressLocality" : "Москва",
                "addressRegion": "Московская область",
                "addressCountry": "Россия"
          }
        }
</script>

</head>

<body>

    <header class="header" id="header">
        <div class="header__top">
            <div class="container">
                <div class="header__top-content">
                    <button type="button" class="header__btn menu-toggle menu-toggle--open border-0">
                        <svg
                            class="menu-toggle__icon menu-toggle__icon--open header__btn-icon main-menu-toggle_icon main-menu-toggle_icon--active">
                            <use xlink:href="./images/sprite.svg#i-menu-open"></use>
                        </svg>
                        <svg class="menu-toggle__icon menu-toggle__icon--close main-menu-toggle_icon">
                            <use xlink:href="./images/sprite.svg#i-menu-close"></use>
                        </svg>

                        <div class="menu-toggle__text menu-toggle__text--open">Меню</div>
                    </button>
                    <div class="header-phones header-dropdown dropdown">
                        <button type="button"
                            class="dropdown-btn header-phones__btn header-dropdown__btn header__btn border-0">
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
                            <div class="dropdown-content__about">
                                <a href="tel:+44 (778) 9023053" class="dropdown-content__link">Великобритания +44 (778)
                                    9023053</a>
                                <a href="tel:+7 (499) 921-02-22" class="dropdown-content__link">Россия +7 (499)
                                    921-02-22</a>
                                <a href="tel:+7 (7172) 727-783" class="dropdown-content__link">Казахстан +7 (7172)
                                    727-783</a>
                                <a href="tel:+998 (90) 901-177" class="dropdown-content__link">Узбекистан +998 (90)
                                    901-177</a>
                                <a href="tel:+994 (50) 719 1545" class="dropdown-content__link">Азербайджан +994 (50)
                                    719 1545</a>
                                <a href="tel:+371 (2) 9340617" class="dropdown-content__link">Латвия +371 (2)
                                    9340617</a>
                                <a href="tel:+374 (91) 190494" class="dropdown-content__link">Армения +374 (91)
                                    190494</a>

                            </div>
                            <div class="dropdown-content__all">Смотреть все</div>
                        </div>
                    </div>
                    <a href="/" class="header-logo">
                        <img src="./images/logo.png" alt="" class="header-logo__img">
                    </a>
                    <div class="header-search">
                        <button type="button" class="header-search__btn header__btn border-0">
                            <svg class="header-search__icon header__btn-icon">
                                <use xlink:href="./images/sprite.svg#i-search"></use>
                            </svg>
                            <span class="header__btn-text">Поиск</span>
                        </button>
                    </div>
                    <div class="header-countries header-dropdown dropdown">
                        <button type="button"
                            class="dropdown-btn header-countries__btn header-dropdown__btn header__btn border-0">
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
                    <div class="header-signin header__btn" data-modal=".modal--login">
                        <span class="header__btn-text">Вход в кабинет</span>
                        <svg class="header-signin__icon header__btn-icon">
                            <use xlink:href="./images/sprite.svg#i-signin"></use>
                        </svg>
                    </div>
                    <div class="menu">
                        <div class="menu__content main-menu__content">
                            <!-- <div class="menu__top">
                                <button type="button" class="header__btn menu-toggle menu-toggle--close">
                                    <svg class="menu-toggle__icon menu-toggle__icon--close">
                                        <use xlink:href="./images/sprite.svg#i-menu-close"></use>
                                    </svg>
                                    <div class="menu-toggle__text">Закрыть</div>
                                </button>
                                
                                <div class="menu__phones header-dropdown dropdown">
                                    <button type="button" class="menu__phones-btn dropdown-btn header-phones__btn header-dropdown__btn header__btn">
                                        <span class="header-phones__btn-text menu__phones-text">Телефоны</span>
                                        <svg class="menu__phones-icon dropdown-icon header-phones__icon header-phones__icon--arrow header__btn-icon header__btn-icon--arrow">
                                            <use xlink:href="./images/sprite.svg#i-arrow-down"></use>
                                        </svg>
                                        <svg class="header-phones__icon header-phones__icon--phone header__btn-icon">
                                            <use xlink:href="./images/sprite.svg#i-phone"></use>
                                        </svg>
                                    </button>
                                    <div class="dropdown-content">
                                        <a href="tel:+44 (778) 9023053" class="dropdown-content__link">Великобритания +44 (778) 9023053</a>
                                        <a href="tel:+7 (499) 921-02-22" class="dropdown-content__link">Россия +7 (499) 921-02-22</a>
                                        <a href="tel:+7 (7172) 727-783" class="dropdown-content__link">Казахстан +7 (7172) 727-783</a>
                                        <a href="tel:+998 (90) 901-177" class="dropdown-content__link">Узбекистан +998 (90) 901-177</a>
                                        <a href="tel:+994 (50) 719 1545" class="dropdown-content__link">Азербайджан +994 (50) 719 1545</a>
                                        <a href="tel:+371 (2) 9340617" class="dropdown-content__link">Латвия +371 (2) 9340617</a>
                                        <a href="tel:+374 (91) 190494" class="dropdown-content__link">Армения +374 (91) 190494</a>
                                    </div>
                                </div>
                            </div> -->
                            <nav class="menu-nav">
                                <ul class="menu-nav-list">
                                    <li class="menu-nav-item">
                                        <a href="about-company.html" class="menu-nav-item__link">О компании</a>
                                    </li>
                                    <li class="menu-nav-item">
                                        <a href="services.html" class="menu-nav-item__link">Услуги</a>
                                    </li>
                                    <li class="menu-nav-item">
                                        <a href="sity.html" class="menu-nav-item__link">Страны</a>
                                    </li>
                                    <li class="menu-nav-item">
                                        <a href="publications.html" class="menu-nav-item__link">Пресс-центр</a>
                                    </li>
                                    <li class="menu-nav-item">
                                        <a href="all-vebinar2.html" class="menu-nav-item__link">Мероприятия</a>
                                    </li>
                                    <li class="menu-nav-item">
                                        <a href="office.html" class="menu-nav-item__link">Контакты</a>
                                    </li>
                                    <li class="menu-nav-item header-search header-search-mobile">
                                        <button type="button" class="header-search__btn header__btn">
                                            <svg class="header-search__icon header__btn-icon">
                                                <use xlink:href="./images/sprite.svg#i-search"></use>
                                            </svg>

                                        </button>
                                    </li </ul>
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
                    </div>
                </div>
            </div>
        </div>
        <div class="header__bottom">
            <div class="header__bottom-container container">
                <div class="header__bottom-content">
                    <nav class="nav">
                        <ul class="nav-list">
                            <li class="nav-list-item">
                                <a href="about-company.html" class="nav-list-item__separator">О компании</a>
                            </li>
                            <li class="nav-list-item">
                                <a href="services.html" class="nav-list-item__link">
                                    Услуги
                                    <svg class="nav-list-item__link-icon">
                                        <use xlink:href="./images/sprite.svg#i-arrow-down"></use>
                                    </svg>
                                </a>
                                <ul class="nav-list-more">
                                    <li class="nav-list-more__item">
                                        <a href="legal-services.html" class="nav-list-more__link">Юридические
                                            услуги</a>
                                    </li>
                                    <li class="nav-list-more__item">
                                        <a href="accounting-services.html" class="nav-list-more__link">Бухгалтерский
                                            учет</a>
                                    </li>
                                    <li class="nav-list-more__item">
                                        <a href="support-construction-projects.html"
                                            class="nav-list-more__link">Сопровождение строительных проектов</a>
                                    </li>
                                    <li class="nav-list-more__item">
                                        <a href="fintech-services.html" class="nav-list-more__link">Услуги для IT и
                                            Fintech компаний</a>
                                    </li>
                                    <!-- <li class="nav-list-more__item">
                                    <a href="#" class="nav-list-more__link">IT аутсорсинг</a>
                                </li> -->
                                </ul>
                            </li>
                            <li class="nav-list-item">
                                <a href="sity.html" class="nav-list-item__link">
                                    Страны
                                    <svg class="nav-list-item__link-icon">
                                        <use xlink:href="./images/sprite.svg#i-arrow-down"></use>
                                    </svg>
                                </a>
                                <ul class="nav-list-more nav-list-more--countries">
                                    <li class="nav-list-more__item">
                                        <a href="#" class="nav-list-more__link">Россия</a>
                                    </li>
                                    <li class="nav-list-more__item">
                                        <a href="#" class="nav-list-more__link">Армения</a>
                                    </li>
                                    <li class="nav-list-more__item">
                                        <a href="#" class="nav-list-more__link">Казахстан</a>
                                    </li>
                                    <li class="nav-list-more__item">
                                        <a href="#" class="nav-list-more__link">Узбекистан</a>
                                    </li>
                                    <li class="nav-list-more__item">
                                        <a href="#" class="nav-list-more__link">Беларусь</a>
                                    </li>
                                    <li class="nav-list-more__item">
                                        <a href="#" class="nav-list-more__link">Азербайджан</a>
                                    </li>
                                    <li class="nav-list-more__item">
                                        <a href="#" class="nav-list-more__link">Грузия</a>
                                    </li>
                                    <li class="nav-list-more__item">
                                        <a href="#" class="nav-list-more__link">Таджикистан</a>
                                    </li>
                                    <li class="nav-list-more__item">
                                        <a href="#" class="nav-list-more__link">Кыргызстан</a>
                                    </li>
                                    <li class="nav-list-more__item">
                                        <a href="#" class="nav-list-more__link">Молдова</a>
                                    </li>
                                    <li class="nav-list-more__item">
                                        <a href="#" class="nav-list-more__link">Туркменистан</a>
                                    </li>
                                    <li class="nav-list-more__item">
                                        <a href="#" class="nav-list-more__link">Латвия</a>
                                    </li>
                                    <li class="nav-list-more__item">
                                        <a href="#" class="nav-list-more__link">Литва</a>
                                    </li>
                                    <li class="nav-list-more__item">
                                        <a href="#" class="nav-list-more__link">Эстония</a>
                                    </li>
                                    <li class="nav-list-more__item">
                                        <a href="#" class="nav-list-more__link">Монголия</a>
                                    </li>
                                    <li class="nav-list-more__item">
                                        <a href="#" class="nav-list-more__link">Украина</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-list-item">
                                <a href="all-employee.html" class="nav-list-item__separator">Команда</a>
                            </li>
                            <li class="nav-list-item">
                                <a href="publications.html" class="nav-list-item__link">
                                    Пресс-центр
                                    <svg class="nav-list-item__link-icon">
                                        <use xlink:href="./images/sprite.svg#i-arrow-down"></use>
                                    </svg>
                                </a>
                                <ul class="nav-list-more">
                                    <li class="nav-list-more__item">
                                        <a href="publications.html" class="nav-list-more__link">Публикации</a>
                                    </li>
                                    <li class="nav-list-more__item">
                                        <a href="all-news.html" class="nav-list-more__link">Новости</a>
                                    </li>
                                    <li class="nav-list-more__item">
                                        <a href="#" class="nav-list-more__link">Вопрос ответ</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-list-item">
                                <a href="##" class="nav-list-item__link">
                                    Мероприятия
                                    <!-- <svg class="nav-list-item__link-icon">
                                    <use xlink:href="./images/sprite.svg#i-arrow-down"></use>
                                </svg> -->
                                </a>
                                <!-- <ul class="nav-list-more">
                                <li class="nav-list-more__item">
                                    <a href="all-vebinar2.html" class="nav-list-more__link">Вебинары</a>
                                </li>
                                <li class="nav-list-more__item">
                                    <a href="#" class="nav-list-more__link">Zoom-конференции</a>
                                </li>
                                <!-- <li class="nav-list-more__item">
                                    <a href="#" class="nav-list-more__link">Чат-рум в clubhouse</a>
                                </li>
                            </ul> -->
                            </li>
                            <li class="nav-list-item">
                                <a href="office.html" class="nav-list-item__link">Контакты</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>

    </header>
    <div class="breadcrumbs-content">
        <div class="container">
            <ul class="breadcrumbs">
                <li class="breadcrumbs-item">
                    <a href="#" class="breadcrumbs-item__text breadcrumbs-item__text--link">Главная страница</a>
                </li>
                <li class="breadcrumbs-item">
                    <span class="breadcrumbs-item__text">О компании</span>
                </li>
            </ul>
        </div>
    </div>
    <!-- <section class="hero">
        <div class="container">
            <div class="hero__content">
                <div class="hero-info">
                    <div class="hero-info__desc">
                        <p class="hero-info__text">ALPS & CHASE International Law Firm</p>
                        <p class="hero-info__title">15 лет работы</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="breadcrumbs-content">
            <div class="container">
                <ul class="breadcrumbs">
                    <li class="breadcrumbs-item">
                        <a href="#" class="breadcrumbs-item__text breadcrumbs-item__text--link">Главная страница</a>
                    </li>
                    <li class="breadcrumbs-item">
                        <span class="breadcrumbs-item__text">О компании</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="hero__parallax parallax-window" data-parallax="scroll" data-image-src="./images/hero-bg.jpg"></div>
    </section> -->



    <section class="search">
        <div class="search__container container">
            <div class="search__content">
                <!-- <h3 class="search__title">Поиск по сайту</h3> -->
                <form action="" class="search-form">
                    <input type="text" class="search-form__input" placeholder="Поиск по сайту">
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
    <section class="about-section">
        <div class="container">
            <div class="about-section__content">
                <div class="about-section__employee">
                    <div class="about-section__employee-list">
                        <div class="about-section__employee-item">
                            <img src="./images/employee-img-new.png" class="about-section__employee-img"
                                alt="">
                            <p class="about-section__employee-name">Александрова Анна</p>
                            <p class="about-section__employee-position">
                                Учредитель<br> юрист-международник
                            </p>
                        </div>
                        <div class="about-section__employee-item">
                            <img src="./images/employee-img-2.jpg" class="about-section__employee-img"
                                alt="">
                            <p class="about-section__employee-name">Коваленко Павел</p>
                            <p class="about-section__employee-position">
                                Генеральный Директор
                            </p>
                        </div>
                    </div>
                    <!-- <div class="about-section__buttons about-section__buttons--mob">
                        <a href="#" class="about-section__btn page-about-btn">Наши услуги</a>
                        <a href="#" class="about-section__btn page-about-btn page-about-btn--fill" data-modal=".modal--request">Связаться с нами</a>
                    </div> -->
                </div>
                <div class="about-section__info">
                    <h2 class="about-section__title page-about-title page-about-title--big">
                        О нас
                    </h2>
                    <h3 class="about-section__subtitle page-about-title page-about-title--line">ALPS & CHASE -
                        международная группа компаний</h3>
                    <div class="about-section__desc">
                        <p>Уже более 15 лет ALPS & CHASE является единым брендом международной группы компаний,
                            работающих в странах СНГ и Балтии. </p>
                        <p>Наша команда оказывает профессиональные услуги по <a href="legal-services.html"
                                class="link-text__to-page">юридическому</a> и <a href="accounting-services.html"
                                class="link-text__to-page">бухгалтерскому</a> сопровождению проектов любого уровня
                            сложности. </p>
                        <p>Наши специалисты консультируют и представляют интересы клиентов из разных стран мира в
                            различных секторах экономики по вопросам корпоративного, налогового, миграционного и
                            трудового права, в сфере регулирования строительства и недвижимости, получения лицензий,
                            документирования инвестиций, а также проведения <a href="#"
                                class="link-text__to-page"> дью дилидженс </a>, подготовки <a href="#"
                                class="link-text__to-page">правовых заключений</a> и <a href="#"
                                class="link-text__to-page">договоров. </a></p>
                        <p>При работе над проектами мы стремимся к максимальной автоматизации рутинных процессов, в том
                            числе путем внедрения технологий искусственного интеллекта (Legal Tech, Accounting Tech).
                        </p>
                    </div>

                    <div class="about-section__buttons about-section__buttons--desktop">
                        <a href="services.html" class="about-section__btn page-about-btn">Наши услуги</a>
                        <a href="#" class="about-section__btn page-about-btn page-about-btn--fill"
                            data-modal=".modal--request">Связаться с нами</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="specialization">
        <div class="container">
            <h2 class="specialization__title specialization__title--mob page-about-title page-about-title--big">Наша
                специализация</h2>
            <h3 class="specialization__subtitle page-about-title page-about-title--line">Комплексная юридическая и
                бухгалтерская поддержка по странам СНГ и Балтии</h3>
            <div class="specialization__content">

                <div class="specialization__info">
                    <div class="specialization__desc">
                        <p>Наши юристы и бухгалтера обладают детальным знанием законодательств разных стран, имеют
                            необходимый опыт, навыки и технологии для предоставления выверенных практических решений по
                            текущим бизнес-задачам клиентов. </p>
                        <p>Каждый специалист из нашей команды предоставляет услуги по определенным стандартам качества и
                            в соответствии с регламентами работ. </p>
                        <p>Мы осуществляем координацию наших специалистов при работе с трансграничными и мноотраслевыми
                            проектами для достижения нужных результатов. Выберите интересующие Вас страны и услуги.</p>
                    </div>
                    <!-- <a href="#" class="specialization__all-countries specialization__all-countries--desktop">Услуги по странам</a> -->
                </div>
                <div class="specialization__more">
                    <h3
                        class="specialization__title specialization__title--desktop page-about-title page-about-title--big">
                        Наша специализация</h3>
                    <a href="office.html" class="specialization__btn specialization__btn--desktop page-about-btn">Наши
                        офисы</a>
                </div>
            </div>
        </div>

        <div class="countries-container">
            <div class="countries-slider page-about-slider">
                <div class="countries-slider-item">
                    <div class="countries-slider-item__content">
                        <img src="./images/countries/1.jpg" class="countries-slider-item__img" alt="">
                        <p class="countries-slider-item__title">Россия</p>
                    </div>
                </div>
                <div class="countries-slider-item">
                    <div class="countries-slider-item__content">
                        <img src="./images/countries/2.jpg" class="countries-slider-item__img" alt="">
                        <p class="countries-slider-item__title">Казахстан</p>
                    </div>
                </div>
                <div class="countries-slider-item">
                    <div class="countries-slider-item__content">
                        <img src="./images/countries/3.jpg" class="countries-slider-item__img" alt="">
                        <p class="countries-slider-item__title">Узбекистан</p>
                    </div>
                </div>
                <!-- <div class="countries-slider-item">
                    <div class="countries-slider-item__content">
                        <img src="./images/countries/4.jpg" class="countries-slider-item__img" alt="">
                        <p class="countries-slider-item__title">Азербайджан</p>
                    </div>
                </div> -->
                <div class="countries-slider-item">
                    <div class="countries-slider-item__content">
                        <img src="./images/countries/5.jpg" class="countries-slider-item__img" alt="">
                        <p class="countries-slider-item__title">Беларусь</p>
                    </div>
                </div>
                <!-- <div class="countries-slider-item">
                    <div class="countries-slider-item__content">
                        <img src="./images/countries/6.jpg" class="countries-slider-item__img" alt="">
                        <p class="countries-slider-item__title">Украина</p>
                    </div>
                </div> -->
                <div class="countries-slider-item">
                    <div class="countries-slider-item__content">
                        <img src="./images/5-1.jpg" class="countries-slider-item__img" alt="">
                        <p class="countries-slider-item__title">Армения</p>
                    </div>
                </div>
                <div class="countries-slider-item">
                    <div class="countries-slider-item__content">
                        <img src="./images/8.jpg" class="countries-slider-item__img" alt="">
                        <p class="countries-slider-item__title">Грузия</p>
                    </div>
                </div>
                <div class="countries-slider-item">
                    <div class="countries-slider-item__content">
                        <img src="./images/8.jpg" class="countries-slider-item__img" alt="">
                        <p class="countries-slider-item__title">Кыргызстан</p>
                    </div>
                </div>
                <div class="countries-slider-item">
                    <div class="countries-slider-item__content">
                        <img src="./images/9.jpg" class="countries-slider-item__img" alt="">
                        <p class="countries-slider-item__title">Таджикистан</p>
                    </div>
                </div>
                <div class="countries-slider-item">
                    <div class="countries-slider-item__content">
                        <img src="./images/countries/10.jpg" class="countries-slider-item__img" alt="">
                        <p class="countries-slider-item__title">Молдова</p>
                    </div>
                </div>
                <div class="countries-slider-item">
                    <div class="countries-slider-item__content">
                        <img src="./images/10.jpg" class="countries-slider-item__img" alt="">
                        <p class="countries-slider-item__title">Туркменистан</p>
                    </div>
                </div>
                <div class="countries-slider-item">
                    <div class="countries-slider-item__content">
                        <img src="./images/10.jpg" class="countries-slider-item__img" alt="">
                        <p class="countries-slider-item__title">Латвия</p>
                    </div>
                </div>
                <div class="countries-slider-item">
                    <div class="countries-slider-item__content">
                        <img src="./images/10.jpg" class="countries-slider-item__img" alt="">
                        <p class="countries-slider-item__title">Литва</p>
                    </div>
                </div>
                <div class="countries-slider-item">
                    <div class="countries-slider-item__content">
                        <img src="./images/10.jpg" class="countries-slider-item__img" alt="">
                        <p class="countries-slider-item__title">Эстония</p>
                    </div>
                </div>
            </div>

            <a href="#" class="specialization__all-countries specialization__all-countries--mob">Услуги по
                странам</a>
            <!-- <a href="#" class="specialization__btn specialization__btn--mob page-about-btn">Наши офисы</a> -->
        </div>
    </section>

    <section class="benefits">
        <div class="benefits__content">
            <h2 class="benefits__title page-about-title page-about-title--big">
                12 причин<br>
                Начать работать<br>
                с нами
            </h2>
            <div class="benefits-slider page-about-slider">
                <div class="benefits-slider__item">
                    <div class="benefits-list">
                        <div class="benefits-list-item">
                            <span class="benefits-list-item__num">1</span>
                            <p class="benefits-list-item__text">Высокий уровень профессионализма специалистов в странах
                                СНГ и Балтии.</p>
                        </div>
                        <div class="benefits-list-item">
                            <span class="benefits-list-item__num">2</span>
                            <p class="benefits-list-item__text">Предоставление услуг юристами/бухгалтерами по единым
                                стандартам качества</p>
                        </div>
                        <div class="benefits-list-item">
                            <span class="benefits-list-item__num">3</span>
                            <p class="benefits-list-item__text">Применение современных технологий Legal Tech,
                                Accounting Tech</p>
                        </div>
                        <div class="benefits-list-item">
                            <span class="benefits-list-item__num">4</span>
                            <p class="benefits-list-item__text">Детальное знание законодательств и практики работы в
                                разных странах</p>
                        </div>
                        <div class="benefits-list-item">
                            <span class="benefits-list-item__num">5</span>
                            <p class="benefits-list-item__text">Поиск действенных решений для бизнеса конкретного
                                клиента</p>
                        </div>
                        <div class="benefits-list-item">
                            <span class="benefits-list-item__num">6</span>
                            <p class="benefits-list-item__text">Информационная безопасность с использованием
                                дата-центров</p>
                        </div>
                    </div>
                </div>
                <div class="benefits-slider__item">
                    <div class="benefits-list">
                        <div class="benefits-list-item">
                            <span class="benefits-list-item__num">7</span>
                            <p class="benefits-list-item__text">Страхование ответственности по международным стандартам
                            </p>
                        </div>
                        <div class="benefits-list-item">
                            <span class="benefits-list-item__num">8</span>
                            <p class="benefits-list-item__text">Возможность проводить оплаты услуг в разных странах и
                                валютах</p>
                        </div>
                        <div class="benefits-list-item">
                            <span class="benefits-list-item__num">9</span>
                            <p class="benefits-list-item__text">Все налоги уже включены в стоимость услуг</p>
                        </div>
                        <div class="benefits-list-item">
                            <span class="benefits-list-item__num">10</span>
                            <p class="benefits-list-item__text">Строгое соблюдение конфиденциальности (NDA)</p>
                        </div>
                        <div class="benefits-list-item">
                            <span class="benefits-list-item__num">11</span>
                            <p class="benefits-list-item__text">Внимательное отношение к бизнес- задачам клиента</p>
                        </div>
                        <div class="benefits-list-item">
                            <span class="benefits-list-item__num">12</span>
                            <p class="benefits-list-item__text">Опыт работы с проектами разного уровня сложности</p>
                        </div>
                    </div>
                </div>
            </div>
            <a href="./images/presentation.pdf" class="benefits__btn page-about-btn" target="blank">Презентация</a>
        </div>

        <div class="benefits__parallax parallax-window" data-parallax="scroll"
            data-image-src="./images/benefits-bg.png"></div>
    </section>

    <section class="teame">
        <div class="team__container container">
            <h2 class="team__title page-about-title">НАША КОМАНДА</h2>
            <div class="team__desc">
                Наши специалисты индивидуально проговаривают с каждым клиентом его потребности и пожелания и грамотно
                организуют процессы выполнения работ. Умение вникнуть в суть проблемы, структурировать отдельные
                составляющие, нацеленность на качественный результат и индивидуальный подход – это то, что отличает нашу
                команду в работе по проектам.
            </div>

            <div class="team-list team-list--desktop page-about-slider">
                <a href="employee.html" class="team-list-item">
                    <div class="team-list-item__content">
                        <img src="./images/specialist-1.png" alt="" class="team-list-item__img">
                        <p class="team-list-item__name">Ирина Шахнабатова</p>
                        <p class="team-list-item__position">Руководитель бухгалтерской практики.</p>
                        <span class="team-list-item__city">Узбекистан. Ташкент</span>
                        <button type="button" class="team-list-item__btn">+</button>
                    </div>
                </a>
                <a href="amanzholova.html" class="team-list-item">
                    <div class="team-list-item__content">
                        <img src="./images/specialist-4.png" alt="" class="team-list-item__img">
                        <p class="team-list-item__name">Айжан АМанжолова</p>
                        <p class="team-list-item__position">Руководитель бухгалтерской практики.</p>
                        <span class="team-list-item__city">Узбекистан. Ташкент</span>
                        <button type="button" class="team-list-item__btn">+</button>
                    </div>
                </a>
                <a href="magerramova.html" class="team-list-item">
                    <div class="team-list-item__content">
                        <img src="./images/specialist-5.png" alt="" class="team-list-item__img">
                        <p class="team-list-item__name">Тарана Магеррамова</p>
                        <p class="team-list-item__position">Руководитель бухгалтерской практики.</p>
                        <span class="team-list-item__city">Азербайджан. Баку</span>
                        <button type="button" class="team-list-item__btn">+</button>
                    </div>
                </a>
                <a href="yugaj.html" class="team-list-item">
                    <div class="team-list-item__content">
                        <img src="./images/specialist-2.png" alt="" class="team-list-item__img">
                        <p class="team-list-item__name">Югай Станислав</p>
                        <p class="team-list-item__position">Руководитель бухгалтерской практики.</p>
                        <span class="team-list-item__city">Узбекистан. Ташкент</span>
                        <button type="button" class="team-list-item__btn">+</button>
                    </div>
                </a>
                <a href="kravchenko.html" class="team-list-item">
                    <div class="team-list-item__content">
                        <img src="./images/specialist-3.png" alt="" class="team-list-item__img">
                        <p class="team-list-item__name">Клавдия Кравченко</p>
                        <p class="team-list-item__position">Руководитель бухгалтерской практики.</p>
                        <span class="team-list-item__city">Молдова.Кишинёв</span>
                        <button type="button" class="team-list-item__btn">+</button>
                    </div>
                </a>
                <a href="##" class="team-list-item">
                    <div class="team-list-item__content">
                        <img src="./images/team-item-img-4.png" alt="" class="team-list-item__img">
                        <p class="team-list-item__name">Александрова Анна</p>
                        <p class="team-list-item__position">Управляющий партнер.</p>
                        <span class="team-list-item__city">Россия. Москва</span>
                        <button type="button" class="team-list-item__btn">+</button>
                    </div>
                </a>
                <a href="##" class="team-list-item">
                    <div class="team-list-item__content">
                        <img src="./images/team-item-img-2.png" alt="" class="team-list-item__img">
                        <p class="team-list-item__name">Калинина Светлана</p>
                        <p class="team-list-item__position">Главный менеджер</p>
                        <span class="team-list-item__city">г. Москва</span>
                        <button type="button" class="team-list-item__btn">+</button>
                    </div>
                </a>
            </div>

            <div class="team-list team-list--mob page-about-slider">
                <a href="employee.html" class="team-list__items">
                    <div class="team-list__items-content">
                        <div class="team-list-item">
                            <div class="team-list-item__content">
                                <img src="./images//specialist-1.png" alt="" class="team-list-item__img">
                                <p class="team-list-item__name">Ирина Шахнабатова</p>
                                <p class="team-list-item__position">Руководитель бухгалтерской практики.</p>
                                <span class="team-list-item__city">Узбекистан. Ташкент</span>
                                <button type="button" class="team-list-item__btn">+</button>
                            </div>
                        </div>
                        <div class="team-list-item">
                            <div class="team-list-item__content">
                                <img src="./images//specialist-4.png" alt="" class="team-list-item__img">
                                <p class="team-list-item__name">Айжан АМанжолова</p>
                                <p class="team-list-item__position">Руководитель бухгалтерской практики.</p>
                                <span class="team-list-item__city">Узбекистан. Ташкент</span>
                                <button type="button" class="team-list-item__btn">+</button>
                            </div>
                        </div>
                        <div class="team-list-item">
                            <div class="team-list-item__content">
                                <img src="./images//specialist-5.png" alt="" class="team-list-item__img">
                                <p class="team-list-item__name">Тарана Магеррамова</p>
                                <p class="team-list-item__position">Руководитель бухгалтерской практики.</p>
                                <span class="team-list-item__city">Азербайджан. Баку</span>
                                <button type="button" class="team-list-item__btn">+</button>
                            </div>
                        </div>
                        <div class="team-list-item">
                            <div class="team-list-item__content">
                                <img src="./images/specialist-2.png" alt="" class="team-list-item__img">
                                <p class="team-list-item__name">Югай Станислав</p>
                                <p class="team-list-item__position">Руководитель бухгалтерской практики.</p>
                                <span class="team-list-item__city">Узбекистан. Ташкент</span>
                                <button type="button" class="team-list-item__btn">+</button>
                            </div>
                        </div>

                    </div>
                </a>
                <a href="employee.html" class="team-list__items">
                    <div class="team-list__items-content">
                        <div class="team-list-item">
                            <div class="team-list-item__content">
                                <img src="./images/team-item-img-1.png" alt="" class="team-list-item__img">
                                <p class="team-list-item__name">Калинина Светлана</p>
                                <p class="team-list-item__position">Руководитель бухгалтерской практики.</p>
                                <span class="team-list-item__city">Узбекистан. Ташкент</span>
                                <button type="button" class="team-list-item__btn">+</button>
                            </div>
                        </div>
                        <div class="team-list-item">
                            <div class="team-list-item__content">
                                <img src="./images/specialist-4.png" alt="" class="team-list-item__img">
                                <p class="team-list-item__name">АМанжолова Айжан</p>
                                <p class="team-list-item__position">Руководитель бухгалтерской практики.</p>
                                <span class="team-list-item__city">Узбекистан. Ташкент</span>
                                <button type="button" class="team-list-item__btn">+</button>
                            </div>
                        </div>
                        <div class="team-list-item">
                            <div class="team-list-item__content">
                                <img src="./images/specialist-4.png" alt="" class="team-list-item__img">
                                <p class="team-list-item__name">Югай Станислав</p>
                                <p class="team-list-item__position">Руководитель бухгалтерской практики.</p>
                                <span class="team-list-item__city">Узбекистан. Ташкент</span>
                                <button type="button" class="team-list-item__btn">+</button>
                            </div>
                        </div>
                        <div class="team-list-item">
                            <div class="team-list-item__content">
                                <img src="./images/team-item-img-4.png" alt="" class="team-list-item__img">
                                <p class="team-list-item__name">Александрова Анна</p>
                                <p class="team-list-item__position">Управляющий партнер.</p>
                                <span class="team-list-item__city">Россия. Москва</span>
                                <button type="button" class="team-list-item__btn">+</button>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <div class="team-bottom">
                <a href="all-employee.html" class="team-bottom__link">Все специалисты</a>
                <a href="publications.html" class="team-bottom__publications page-about-btn">Смотреть публикации</a>
            </div>
        </div>
    </section>

    <section class="news">
        <h2 class="news__title news__title--desktop page-about-title">НОВОСТИ И СОБЫТИЯ</h2>
        <div class="news__content">
            <div class="container">
                <div class="news__info">
                    <h2 class="news__title news__title--mob page-about-title">НОВОСТИ И СОБЫТИЯ</h2>
                    <div class="news-list">
                        <div class="news-list-1">
                            <div class="news-item">
                                <div class="news-item__wrap">
                                    <a href="news-item.html" class="news-item__title">В России ввели новые правила
                                        выхода участников из ООО</a>
                                    <div class="news-item__info">
                                        <span class="news-item__date">15.07.2020</span>

                                        <span class="news-item__view">
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                viewBox="0 0 24 15" style="enable-background:new 0 0 24 15;"
                                                xml:space="preserve" width="22px" fill="#448D78">
                                                <path class="st0"
                                                    d="M23.6,7C23.4,6.8,18.4,0,12,0S0.6,6.8,0.4,7C0.2,7.3,0.2,7.7,0.4,8c0.2,0.3,5.2,7,11.6,7s11.4-6.8,11.6-7
                                                            C23.8,7.7,23.8,7.3,23.6,7z M12,13.4C7.3,13.4,3.2,9,2,7.5C3.2,6,7.3,1.6,12,1.6c4.7,0,8.8,4.5,10,5.9C20.8,9,16.7,13.4,12,13.4z" />
                                                <path class="st0"
                                                    d="M12,2.8c-2.6,0-4.7,2.1-4.7,4.7s2.1,4.7,4.7,4.7s4.7-2.1,4.7-4.7S14.6,2.8,12,2.8z M12,10.6
                                                           c-1.7,0-3.1-1.4-3.1-3.1s1.4-3.1,3.1-3.1c1.7,0,3.1,1.4,3.1,3.1S13.7,10.6,12,10.6z" />
                                            </svg>
                                            <i>243</i>
                                        </span>
                                        <span class="news-item__country">Россия</span>
                                    </div>
                                    <div class="news-item__desc">
                                        Если учредитель планирует выход из ООО по собственному желанию, юрист должен
                                        проконтролировать несколько важных моментов. Мы составили пошаговую инструкцию
                                        по выходу участника из ООО и распределению его доли по правилам 2020 года.
                                        <div class="news-item__hashtags">
                                            <span class="news-item__hashtags-item">продажа доли участников</span>
                                            <a href="search-tags.html" class="news-item__hashtags-item">ооо в
                                                россии</a>
                                            <span class="news-item__hashtags-item">ооо в москве</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="news-item">
                                <div class="news-item__wrap">
                                    <a href="news-item.html" class="news-item__title">В России ввели новые правила
                                        выхода участников из ООО</a>
                                    <div class="news-item__info">
                                        <span class="news-item__date">15.07.2021</span>

                                        <span class="news-item__view">
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                viewBox="0 0 24 15" style="enable-background:new 0 0 24 15;"
                                                xml:space="preserve" width="22px" fill="#448D78">
                                                <path class="st0"
                                                    d="M23.6,7C23.4,6.8,18.4,0,12,0S0.6,6.8,0.4,7C0.2,7.3,0.2,7.7,0.4,8c0.2,0.3,5.2,7,11.6,7s11.4-6.8,11.6-7
                                                            C23.8,7.7,23.8,7.3,23.6,7z M12,13.4C7.3,13.4,3.2,9,2,7.5C3.2,6,7.3,1.6,12,1.6c4.7,0,8.8,4.5,10,5.9C20.8,9,16.7,13.4,12,13.4z" />
                                                <path class="st0"
                                                    d="M12,2.8c-2.6,0-4.7,2.1-4.7,4.7s2.1,4.7,4.7,4.7s4.7-2.1,4.7-4.7S14.6,2.8,12,2.8z M12,10.6
                                                           c-1.7,0-3.1-1.4-3.1-3.1s1.4-3.1,3.1-3.1c1.7,0,3.1,1.4,3.1,3.1S13.7,10.6,12,10.6z" />
                                            </svg>
                                            <i>243</i>
                                        </span>
                                        <span class="news-item__country">Россия</span>
                                    </div>
                                    <div class="news-item__desc">
                                        Если учредитель планирует выход из ООО по собственному желанию, юрист должен
                                        проконтролировать несколько важных моментов. Мы составили пошаговую инструкцию
                                        по выходу участника из ООО и распределению его доли по правилам 2020 года.
                                        <div class="news-item__hashtags">
                                            <span class="news-item__hashtags-item">продажа доли участников</span>
                                            <span class="news-item__hashtags-item">ооо в россии</span>
                                            <span class="news-item__hashtags-item">ооо в москве</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="news-list-2">
                            <div class="news-item">
                                <div class="news-item__wrap">
                                    <a href="news-item.html" class="news-item__title">Защита торговых знаков при
                                        глобализации и локализации производства</a>
                                    <div class="news-item__info">
                                        <span class="news-item__date">02.08.2020</span>

                                        <span class="news-item__view">
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                viewBox="0 0 24 15" style="enable-background:new 0 0 24 15;"
                                                xml:space="preserve" width="22px" fill="#448D78">
                                                <path class="st0"
                                                    d="M23.6,7C23.4,6.8,18.4,0,12,0S0.6,6.8,0.4,7C0.2,7.3,0.2,7.7,0.4,8c0.2,0.3,5.2,7,11.6,7s11.4-6.8,11.6-7
                                                            C23.8,7.7,23.8,7.3,23.6,7z M12,13.4C7.3,13.4,3.2,9,2,7.5C3.2,6,7.3,1.6,12,1.6c4.7,0,8.8,4.5,10,5.9C20.8,9,16.7,13.4,12,13.4z" />
                                                <path class="st0"
                                                    d="M12,2.8c-2.6,0-4.7,2.1-4.7,4.7s2.1,4.7,4.7,4.7s4.7-2.1,4.7-4.7S14.6,2.8,12,2.8z M12,10.6
                                                           c-1.7,0-3.1-1.4-3.1-3.1s1.4-3.1,3.1-3.1c1.7,0,3.1,1.4,3.1,3.1S13.7,10.6,12,10.6z" />
                                            </svg>
                                            <i>243</i>
                                        </span>
                                        <span class="news-item__country">Казахстан</span>
                                    </div>
                                    <div class="news-item__desc">
                                        Вследствие изменений в глобализации и локализации производств казахстанские
                                        предприниматели должны активнее регистрировать и защищать свои товарные знаки.
                                        <div class="news-item__hashtags">
                                            <span class="news-item__hashtags-item">регистрация торгового знака</span>
                                            <span class="news-item__hashtags-item">локализация производства</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="news-item ">
                                <div class="news-item__wrap">
                                    <a href="news-item.html" class="news-item__title">Защита торговых знаков при
                                        глобализации и локализации производства</a>
                                    <div class="news-item__info">
                                        <span class="news-item__date">02.08.2021</span>
                                        <span class="news-item__view">
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                viewBox="0 0 24 15" style="enable-background:new 0 0 24 15;"
                                                xml:space="preserve" width="22px" fill="#448D78">
                                                <path class="st0"
                                                    d="M23.6,7C23.4,6.8,18.4,0,12,0S0.6,6.8,0.4,7C0.2,7.3,0.2,7.7,0.4,8c0.2,0.3,5.2,7,11.6,7s11.4-6.8,11.6-7
                                                            C23.8,7.7,23.8,7.3,23.6,7z M12,13.4C7.3,13.4,3.2,9,2,7.5C3.2,6,7.3,1.6,12,1.6c4.7,0,8.8,4.5,10,5.9C20.8,9,16.7,13.4,12,13.4z" />
                                                <path class="st0"
                                                    d="M12,2.8c-2.6,0-4.7,2.1-4.7,4.7s2.1,4.7,4.7,4.7s4.7-2.1,4.7-4.7S14.6,2.8,12,2.8z M12,10.6
                                                           c-1.7,0-3.1-1.4-3.1-3.1s1.4-3.1,3.1-3.1c1.7,0,3.1,1.4,3.1,3.1S13.7,10.6,12,10.6z" />
                                            </svg>
                                            <i>243</i>
                                        </span>
                                        <span class="news-item__country">Казахстан</span>
                                    </div>
                                    <div class="news-item__desc">
                                        Вследствие изменений в глобализации и локализации производств казахстанские
                                        предприниматели должны активнее регистрировать и защищать свои товарные знаки.
                                        <div class="news-item__hashtags">
                                            <span class="news-item__hashtags-item">регистрация торгового знака</span>
                                            <span class="news-item__hashtags-item">локализация производства</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="news-buttons">
                        <a href="all-news.html" class="news__btn page-about-btn">Все новости</a>
                        <a href="all-vebinar2.html" class="news__btn page-about-btn">Все вебинары</a>
                    </div>
                </div>
            </div>
            <div class="news__parallax parallax-window" data-parallax="scroll" data-image-src="./images/news-bg.png">
            </div>
        </div>
    </section>

    <section class="clients">
        <div class="container">
            <div class="clients__content">
                <div class="clients__info">
                    <h2 class="clients__title page-about-title">НАШИ КЛИЕНТЫ</h2>
                    <div class="clients__desc">
                        Показателем доверия и удовлетворенности качеством нашей работы является то, что многие клиенты
                        сотрудничают с нами уже на протяжении многих лет. Мы всегда внимательны к их повседневным
                        задачам и работаем в режиме наибольшего благоприятствования по отношению к каждому из них.
                    </div>
                </div>
                <div class="clients-slider page-about-slider">

                    <div class="clients-slider-item">
                        <div class="clients-slider-item__content">
                            <img src="./images/logo/Adidas.svg" class="clients-slider-item__img" alt="">
                            <img src="./images/logo/new/maccaferri.svg" class="clients-slider-item__img"
                                alt="">
                        </div>
                    </div>
                    <div class="clients-slider-item">
                        <div class="clients-slider-item__content">
                            <img src="./images/logo/elama.svg" class="clients-slider-item__img" alt="">
                            <img src="./images/logo/гемотест.svg" class="clients-slider-item__img" alt="">
                        </div>
                    </div>
                    <div class="clients-slider-item">
                        <div class="clients-slider-item__content">
                            <img src="./images/logo/Raiffeisen_Bank.svg" class="clients-slider-item__img"
                                alt="">
                            <img src="./images/logo/Сест.svg" class="clients-slider-item__img" alt="">
                        </div>
                    </div>
                    <div class="clients-slider-item">
                        <div class="clients-slider-item__content">
                            <img src="./images/logo/ATDI.svg" class="clients-slider-item__img" alt="">
                            <img src="./images/logo/indesit-1.svg" class="clients-slider-item__img" alt="">
                        </div>
                    </div>
                    <div class="clients-slider-item">
                        <div class="clients-slider-item__content">
                            <img src="./images/logo/технониколь.svg" class="clients-slider-item__img" alt="">
                            <img src="./images/logo/Epson.svg" class="clients-slider-item__img" alt="">
                        </div>
                    </div>
                    <div class="clients-slider-item">
                        <div class="clients-slider-item__content">
                            <img src="./images/logo/тд-вик-2.svg" class="clients-slider-item__img" alt="">
                            <img src="./images/logo/strategy Partners.svg" class="clients-slider-item__img"
                                alt="">
                        </div>
                    </div>
                    <div class="clients-slider-item">
                        <div class="clients-slider-item__content">
                            <img src="./images/logo/Still.svg" class="clients-slider-item__img" alt="">
                            <img src="./images/logo/nurol.svg" class="clients-slider-item__img" alt="">
                        </div>
                    </div>
                    <div class="clients-slider-item">
                        <div class="clients-slider-item__content">
                            <img src="./images/logo/svyaznoy.svg" class="clients-slider-item__img" alt="">
                            <img src="./images/logo/геокосмос.svg" class="clients-slider-item__img" alt="">
                        </div>
                    </div>
                    <div class="clients-slider-item">
                        <div class="clients-slider-item__content">
                            <img src="./images/logo/Дива.svg" class="clients-slider-item__img" alt="">
                            <img src="./images/logo/NVision.svg" class="clients-slider-item__img" alt="">
                        </div>
                    </div>
                    <div class="clients-slider-item">
                        <div class="clients-slider-item__content">
                            <img src="./images/logo/А-транс.svg" class="clients-slider-item__img" alt="">
                            <img src="./images/logo/fonbet.svg" class="clients-slider-item__img" alt="">
                        </div>
                    </div>
                    <div class="clients-slider-item">
                        <div class="clients-slider-item__content">
                            <img src="./images/logo/Императорский дом.svg" class="clients-slider-item__img"
                                alt="">
                            <img src="./images/logo/совфрахт.svg" class="clients-slider-item__img" alt="">
                        </div>
                    </div>
                    <div class="clients-slider-item">
                        <div class="clients-slider-item__content">
                            <img src="./images/logo/astellas.svg" class="clients-slider-item__img" alt="">
                            <img src="./images/logo/dupont.svg" class="clients-slider-item__img" alt="">
                        </div>
                    </div>
                    <!-- <div class="clients-slider-item">
                        <div class="clients-slider-item__content">
                            <img src="./images/logo" class="clients-slider-item__img" alt="">
                            <img src="./images/logo" class="clients-slider-item__img" alt="">
                        </div>
                    </div> -->
                    <div class="clients-slider-item">
                        <div class="clients-slider-item__content">
                            <img src="./images/logo/Детский мир.svg" class="clients-slider-item__img" alt="">
                            <img src="./images/logo/Рольф.svg" class="clients-slider-item__img" alt="">
                        </div>
                    </div>
                    <!-- <div class="clients-slider-item">
                        <div class="clients-slider-item__content">
                            <img src="./images/logo" class="clients-slider-item__img" alt="">
                            <img src="./images/logo/dupont.svg" class="clients-slider-item__img" alt="">
                        </div>
                    </div> -->
                </div>

            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <div class="footer__top">
                <div class="footer-col">
                    <a href="index.html" class="footer-logo">
                        <!-- <img src="./images/logo-footer.png" class="footer-logo__img" alt=""> -->
                        <svg class="footer-logo__img">
                            <use xlink:href="./images/sprite.svg#i-logo-white"></use>
                        </svg>
                    </a>
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
                    <a href="mailto:info@alpschase.com" class="footer__email">info@alpschase.com</a>
                    <a href="#" class="footer__whatsapp footer__whatsapp--mob">
                        CВЯЗАТЬСЯ В WHATSAPP
                    </a>
                </div>
                <div class="footer-col">
                    <nav class="footer-nav">
                        <ul class="footer-nav-list">
                            <li class="footer-nav-item">
                                <a href="index.html" class="footer-nav__link">
                                    О компании
                                </a>
                            </li>
                            <li class="footer-nav-item footer-nav-item--whatsapp">
                                <a href="#"
                                    class="footer-nav__link footer-nav__link--whatsapp footer__whatsapp">
                                    CВЯЗАТЬСЯ В WHATSAPP
                                </a>
                            </li>
                            <li class="footer-nav-item">
                                <a href="#" class="footer-nav__link">
                                    Страны
                                </a>
                            </li>
                            <li class="footer-nav-item">
                                <a href="#" class="footer-nav__link">
                                    Услуги
                                </a>
                            </li>
                            <li class="footer-nav-item">
                                <a href="publications.html" class="footer-nav__link">
                                    Пресс-центр
                                </a>
                            </li>
                            <li class="footer-nav-item">
                                <a href="vebinar.html" class="footer-nav__link">
                                    Мероприятия
                                </a>
                            </li>

                            <li class="footer-nav-item">
                                <a href="site-map.html" class="footer-nav__link">
                                    Карта сайта
                                </a>
                            </li>
                            <li class="footer-nav-item">
                                <a href="career.html" class="footer-nav__link">
                                    Карьера
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="footer-col">
                    <div class="footer-form">
                        <h4 class="footer-form__title">Новостная рассылка</h4>
                        <p class="footer-form__text">Подпишитесь на нашу новостную рассылку, чтобы всегда располагать
                            актуальной информацией</p>
                        <div class="footer-form__controls">
                            <input type="email" class="footer-form__input" placeholder="Ваш E-mail" required>
                            <button type="submit" class="footer-form__btn">
                                <svg class="footer-form__btn-icon">
                                    <use xlink:href="./images/sprite.svg#i-plane"></use>
                                </svg>
                                <span class="sr-only">
                                    Отправить
                                </span>
                            </button>
                        </div>
                        <p class="footer-form__text">Перепечатка материалов только с письменного разрешения компании
                            ALPS & CHASE</p>
                    </div>
                </div>
            </div>
            <div class="footer__bottom">
                <p class="footer__copyright">@ALPS&CHASE 2020</p>
                <div class="footer__links">
                    <button href="#" class="footer__link" data-modal=".modal--liability">Заявления об
                        ограничении ответственности</button>
                    <button class="footer__link" data-modal=".modal--privacy">Политика конфиденциальности</button>
                </div>
            </div>
        </div>
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
                                условиях и
                                <a href="#" class="modal-form__pp-link" target="blank"> Соглашения</a>
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

    <div class="modal modal--privacy">
        <div class="container">
            <div class="modal__content">
                <h3 class="modal__title">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</h3>
                <p class="privacy-madal-text privacy-madal-text--line">Сайт <a href="main.html"> www.alpschase.com
                    </a> является дополнением к услугам, оказываемых группой компаний «ALPS & CHASE», объединенных
                    единым брендом. В данном разделе опубликованы наши правила обеспечения конфиденциальности и защиты
                    информации для фирм по оказанию профессиональных услуг, входящих в нашу глобальную организацию, а
                    также для аффилированных и ассоциированных с ними компаний.</p>
                <p class="privacy-madal-text privacy-madal-text--line">Здесь вы найдете описание процедур,
                    направленных на обеспечение конфиденциальности информации всех посетителей нашего сайта. Мы
                    придерживаемся строгих правил работы с информацией, разработанных для защиты конфиденциальных
                    данных.</p>
                <p class="privacy-madal-text privacy-madal-text--line">Если у вас есть вопросы или вы считаете, что в
                    настоящем разделе представлена не вся интересующая вас информация, свяжитесь с нами по общим мейлам
                    для связи с компанией.</p>
                <p class="privacy-madal-text privacy-madal-text__title">Сбор, использование, раскрытие и выбор
                    информации</p>
                <p class="privacy-madal-text privacy-madal-text--line">Для пользования нашим сайтом регистрация не
                    требуется.</p>
                <p class="privacy-madal-text privacy-madal-text--line">Если вы просто являетесь посетителем сайта
                    www.alpschase.com, компания «ALPS & CHASE» не собирает о вас никакую персональную информацию за
                    исключением данных с использованием файлов cookies. Однако в некоторых случаях Вам может
                    потребоваться регистрация на нашем сайте, например, для получения регулярных рассылок компании «ALPS
                    & CHASE» или для работы с Личным кабинетом.</p>
                <p class="privacy-madal-text privacy-madal-text--line">В таких случаях компания «ALPS & CHASE» может
                    связываться с зарегистрированными лицами для того, чтобы предоставлять им рассылку, приглашать на
                    специализированные мероприятия, предоставлять информацию о наших услугах, направлять публикации или
                    маркетинговые материалы и тому подобное.</p>
                <p class="privacy-madal-text privacy-madal-text--line">Для защиты информации, полученной при
                    регистрации, используется стандартная технология кодирования, поскольку данные направляются через
                    Интернет. Регистрация, в частности, может потребоваться в следующих случаях:</p>
                <ul class="privacy-madal-list">
                    <li class="privacy-madal-text privacy-madal-item privacy-madal-text--line">Подписка на электронные
                        анонсы
                        <p class="privacy-madal-text">Компания ALPS & CHASE предлагает посетителям своего сайта услугу
                            электронных анонсов, т. е. уведомлений по электронной почте о размещении новой информации.
                            Если вы решите подписаться на данную услугу, вам потребуется представить базовую контактную
                            информацию, а именно: имя, фамилию и адрес электронной почты.</p>
                    </li>
                    <li class="privacy-madal-text privacy-madal-item privacy-madal-text--line">Поиск работы в ALPS &
                        CHASE
                        <p class="privacy-madal-text"> Наш сайт предлагает вам возможность заявить о своей
                            заинтересованности найти работу в нашей компании, а также откликнуться на объявление об
                            открытой вакансии. Чтобы получить более подробную информацию о процессе набора персонала,
                            посетите раздел нашего сайта «Карьера».</p>
                    </li>
                    <li class="privacy-madal-text privacy-madal-item privacy-madal-text--line">Проведение опросов
                        <p class="privacy-madal-text"> Компания ALPS & CHASE может использовать свой веб-сайт для
                            проведения опросов. Узнавая у респондентов их мнения, сотрудники компании могут попросить их
                            также предоставить личную информацию (имя, фамилию, контактные данные, и т. д.). Характер
                            информации, собираемой в рамках опросов, варьируется.</p>
                    </li>
                    <li class="privacy-madal-text privacy-madal-item privacy-madal-text--line">Предоставление
                        аналитических материалов
                        <p class="privacy-madal-text"> В отдельных случаях регистрация требуется для доступа к
                            аналитическим материалам ALPS & CHASE: статьям, правовым и бухгалтерским исследованиям,
                            брошюрам, и т. п. Персональные данные, которые необходимо указывать в форме регистрации, а
                            также характер собираемой информации могут варьироваться. Компания ALPS & CHASE оставляет за
                            собой право предоставлять определенные аналитические материалы лишь лицам, указавшим
                            соответствующую информацию.</p>
                    </li>
                    <li class="privacy-madal-text privacy-madal-item privacy-madal-text--line">Участие в вебинарах
                        <p class="privacy-madal-text"> Компания ALPS & CHASE предоставляет возможность регистрации для
                            участия в вебинарах как на своем веб-сайте, так и на сайтах сторонних компаний.
                            Регистрационные формы могут содержать требования указать персональные данные. Характер
                            запрашиваемой информации варьируется.</p>
                    </li>
                    <li class="privacy-madal-text privacy-madal-item privacy-madal-text--line">ALPS & CHASE Личный
                        кабинет
                        <p class="privacy-madal-text"> При предоставлении доступа к ALPS & CHASE Личный кабинет, у
                            нашей компании сохраняются некоторые Ваши личные данные. Узнать подробнее можно об этом
                            написав нам запрос.</p>
                    </li>
                    <li class="privacy-madal-text privacy-madal-item privacy-madal-text--line">Персональные данные
                        конфиденциального характера
                        <p class="privacy-madal-text"> Компания ALPS & CHASE не занимается целенаправленным сбором
                            каких-либо личных данных конфиденциального характера посредством своего веб-сайта, за
                            исключением случаев, предписанных законодательством (например, при наборе персонала). Личные
                            данные конфиденциального характера включают информацию о расовой или национальной
                            принадлежности, политических убеждениях, религиозных и прочих взглядах, членстве в
                            профсоюзах, физическом или психическом здоровье, судимостях. Компания ALPS & CHASE прилагает
                            все возможные усилия для сохранения конфиденциальности и защиты указанных данных
                            пользователей в ходе своей деятельности. Введены регламенты и процедуры, обеспечивающие
                            защиту информации от потери, ее неправильного использования или неправомерного раскрытия.
                        </p>
                    </li>
                    <li class="privacy-madal-text privacy-madal-item privacy-madal-text--line">Раскрытие информации
                        <p class="privacy-madal-text"> Компания ALPS & CHASE соблюдает Принципы защиты
                            конфиденциальности персональных данных и раскрывает личную информацию только тем третьим
                            лицам, с которыми была достигнута письменная договоренность об обеспечении соответствующего
                            уровня защиты конфиденциальных данных. Таким образом, мы можем раскрывать кому-либо ваши
                            персональные данные в следующих случаях:</p>
                        <ul>
                            <li class="privacy-madal-text privacy-madal-sub-item">Если раскрытие требуется для
                                выполнения вашего запроса, который предполагает участие сторонней организации,
                                сотрудничающей с компанией ALPS & CHASE) или</li>
                            <li class="privacy-madal-text privacy-madal-sub-item">Если об этом в прямой форме
                                попросили Вы (посетитель сайта) или</li>
                            <li class="privacy-madal-text privacy-madal-sub-item">В соответствии с судебным ордером
                                или каким-либо другим законодательным или нормативно-правовым требованием или</li>
                            <li class="privacy-madal-text privacy-madal-sub-item">Если раскрытие обусловлено продажей
                                или реализацией иным способом нашего бизнеса или его части.</li>
                        </ul>
                        <p class="privacy-madal-text">Примечание: Компания ALPS & CHASE не собирает и не хранит
                            персональные данные или информацию, получаемую посредством своего сайта, для распространения
                            или продажи сторонним компаниям в маркетинговых целях или для использования в массовой
                            рассылке от имени третьих лиц. </p>
                    </li>
                    <li class="privacy-madal-text privacy-madal-item privacy-madal-text--line">Изменение и хранение
                        данных
                        <p class="privacy-madal-text"> Компания ALPS & CHASE хранит информацию, полученную от
                            посетителей сайта, исключительно в целях предоставления соответствующих услуг. Если вам
                            необходимо изменить свои данные или удалить их из нашей базы, свяжитесь с нами по
                            электронной почте и изложите ваши требования.</p>
                    </li>
                    <li class="privacy-madal-text privacy-madal-item privacy-madal-text--line">Ссылки на сайты третьих
                        лиц
                        <p class="privacy-madal-text"> Пользователи должны учитывать, что на <a
                                href="main-copy.html"> www.alpschase.com </a> могут быть опубликованы ссылки на сайты,
                            которые не регулируются данной политикой конфиденциальности. Пользователи нашего сайта могут
                            получить на сайтах третьих лиц и в социальных сетях дополнительную информацию об
                            исследованиях и публикациях ALPS & CHASE. Компания ALPS & CHASE не предоставляет никаких
                            заверений или гарантий относительно безопасности хранения или использования информации
                            пользователей на серверах третьих лиц. Мы рекомендуем пользователям перед размещением своей
                            личной информации внимательно ознакомиться с политикой конфиденциальности сайтов третьих
                            сторон. </p>
                    </li>
                    <li class="privacy-madal-text privacy-madal-item privacy-madal-text--line">Cookies
                        <p class="privacy-madal-text"> Применение технологий cookies позволяет оптимизировать работу
                            нашего сайта и делает его более удобным для пользователя. Использование файлов сookies в
                            некоторых разделах помогает нам лучше понять интересы пользователей и сделать сайт
                            максимально полезным для каждого. Если вы не хотите, чтобы ваш браузер сохранял файлы
                            cookies с нашего сайта, Вы можете отключить эту функцию в настройках. Если вы не знаете, как
                            это сделать, обратитесь за помощью в службу поддержки вашего браузера. Обращаем ваше
                            внимание на то, что, отключив cookies в настройках вашего браузера, вы не сможете
                            воспользоваться всеми возможностями сайта.</p>
                    </li>
                    <li class="privacy-madal-text privacy-madal-item privacy-madal-text--line">Социальные сети
                        <p class="privacy-madal-text"> Компания ALPS & CHASE предоставляет вам возможность получать
                            информацию из блогов, форумов, вики-сайтов и других сетевых ресурсов (далее «Социальные
                            сети»), на которых представлена наша компания. Главная цель социальных сетей – возможность
                            поделиться полученной информацией с другими пользователями. Вместе с тем, ALPS & CHASE не
                            несет ответственности за последствия размещения вами личной информации в социальных сетях в
                            случае ее использования другими пользователями, в том числе со злым умыслом.</p>
                        <p class="privacy-madal-text">На сайте компании ALPS & CHASE могут быть опубликованы ссылки на
                            социальные сети других физических или юридических лиц, размещенные на сторонних серверах,
                            которые не находятся под контролем нашей компании. Компания ALPS & CHASE не предоставляет
                            никаких заверений или гарантий относительно точности и прочих аспектов информации,
                            хранящейся на этих ресурсах. Компания ALPS & CHASE также не предоставляет никаких заверений
                            или гарантий относительно безопасности хранения или использования информации пользователей
                            на серверах третьих сторон. Мы рекомендуем пользователям перед размещением своей личной
                            информации внимательно ознакомиться с политикой конфиденциальности сайтов третьих сторон.
                        </p>
                    </li>
                    <li class="privacy-madal-text privacy-madal-item privacy-madal-text--line">Внесение изменений в
                        настоящую политику
                        <p class="privacy-madal-text"> При необходимости компания ALPS & CHASE может вносить изменения
                            в настоящую политику. При внесении таких изменений просьба обратить внимание на то, что на
                            внедрение нового порядка обеспечения конфиденциальности может потребоваться до 30 рабочих
                            дней. Если вы хотите отслеживать изменения, регулярно проверяйте данную страницу.</p>
                    </li>
                    <li class="privacy-madal-text privacy-madal-item privacy-madal-text--line">Отказ от подписки
                        <p class="privacy-madal-text">Компания ALPS & CHASE оставляет за Вами выбор в отношении сбора
                            и использования Ваших персональных данных. Если вы зарегистрировались на рассылку
                            информационных/новостных бюллетеней ALPS & CHASE через наш сайт, но больше не хотите
                            получать электронные сообщения, зайдите на страницу «Отказ от подписки» на отправленной Вами
                            заявке.</p>
                    </li>
                    <li class="privacy-madal-text privacy-madal-item privacy-madal-text--line">Подробная информация
                        <p class="privacy-madal-text">Более подробная информация о сфере применения политики
                            конфиденциальности изложена в <span class="modal-disclaimer"> «Заявлении об ограничении
                                ответственности».</span> </p>
                    </li>
                </ul>


            </div>
        </div>
        <button type="button" class="modal__close">
            <svg class="modal__close-icon">
                <use xlink:href="./images/sprite.svg#i-menu-close"></use>
            </svg>
            <span class="sr-only">Закрыть</span>
        </button>
    </div>

    <div class="modal modal--liability">
        <div class="container">
            <div class="modal__content">
                <div class="modal-wrapp">
                    <h3 class="modal__title">ЗАЯВЛЕНИЯ ОБ ОГРАНИЧЕНИИ ОТВЕТСТВЕННОСТИ</h3>
                    <p class="privacy-madal-text">Веб-сайт <a href="main.html" class="link-text__to-page">
                            www.alpschase.com </a> </p>
                    <p class="privacy-madal-text">Веб-сайт <a href="main.html" class="link-text__to-page">
                            www.alpschase.com </a> (далее – «сайт») включает в себя как общий контент, информирующий о
                        международной деятельности компании ALPS & CHASE, так и региональный контент, который посвящен
                        каждой отдельной компании в составе группы компаний, действующих и оказывающих услуги в
                        конкретной стране.</p>
                    <p class="privacy-madal-text privacy-madal-text--line">Правообладателем и оператором общего
                        контента сайта является Общество с ограниченной ответственностью «АЛПС энд ЧЕЙС» Юридический
                        адрес: 117452, Россия, г. Москва, ул. Азовская, д.31., которое действует в качестве
                        координационного центра.</p>
                    <p class="privacy-madal-text privacy-madal-text__title">Заявление об ограничении ответственности
                    </p>
                    <p class="privacy-madal-text privacy-madal-text--line">ALPS & CHASE НЕ НЕСЕТ КАКИХ-ЛИБО
                        ОБЯЗАТЕЛЬСТВ ИЛИ ОТВЕТСТВЕННОСТИ ЗА НЕДОСТОВЕРНОСТЬ ИЛИ НЕПОЛНОТУ ИНФОРМАЦИИ, РАЗМЕЩЕННОЙ НА
                        ЭТОМ САЙТЕ.</p>
                    <p class="privacy-madal-text privacy-madal-text--line">Содержание данного сайта и все услуги,
                        оказываемые с его помощью, предоставляются без каких-либо гарантий относительно их полноты,
                        точности и своевременности, а также без заверений, поручительств или каких-либо других прямых
                        или подразумеваемых договорных условий. ALPS & CHASE не гарантирует, что данный сайт, различные
                        услуги, оказываемые с его помощью, и/или прочая информация, программное обеспечение или другие
                        материалы, загружаемые с сайта, будут достоверными, актуальными, работающими бесперебойно,
                        корректными, полными и не будут содержать вирусов или других вредоносных компонентов.</p>
                    <p class="privacy-madal-text privacy-madal-text--line">ООО «АЛПС энд ЧЕЙС» (ALPS & CHASE)
                        ОТКАЗЫВАЕТСЯ ОТ ЛЮБОЙ ОТВЕТСТВЕННОСТИ ПЕРЕД КЕМ БЫ ТО НИ БЫЛО В МАКСИМАЛЬНОМ ОБЪЕМЕ, ДОПУСКАЕМОМ
                        ДЕЙСТВУЮЩИМ ЗАКОНОДАТЕЛЬСТВОМ, ЗА СОДЕРЖАНИЕ МАТЕРИАЛОВ ДАННОГО САЙТА, А ТАКЖЕ ЛЮБЫЕ УСЛУГИ,
                        ОКАЗЫВАЕМЫЕ С ЕГО ПОМОЩЬЮ. ЭТО ПРАВИЛО ДЕЙСТВУЕТ В РАМКАХ ТЕОРИИ НАРУШЕНИЙ, ПРАКТИКИ ДОГОВОРОВ,
                        ГАРАНТИЙ, БЕЗУСЛОВНЫХ ОБЯЗАТЕЛЬСТВ И ИХ ВОЗМОЖНОГО НЕВЫПОЛНЕНИЯ В РЕЗУЛЬТАТЕ НЕБРЕЖНОСТИ, А
                        ТАКЖЕ ПРИ ВОЗНИКНОВЕНИИ ПРЯМЫХ, КОСВЕННЫХ, НЕСТАНДАРТНЫХ, ШТРАФНЫХ И АНАЛОГИЧНЫХ ИМ УБЫТКОВ,
                        ДАЖЕ В ТЕХ СЛУЧАЯХ, КОГДА КОМПАНИЯ ALPS & CHASE БЫЛА ПРОИНФОРМИРОВАНА ИЛИ ПРЕДВИДЕЛА ВОЗМОЖНОСТЬ
                        ВОЗНИКНОВЕНИЯ ТАКИХ УБЫТКОВ.</p>
                    <p class="privacy-madal-text privacy-madal-text--line">Информация, представленная на данном сайте,
                        не может рассматриваться в качестве профессиональных рекомендаций или услуг в области права,
                        налогообложения, бухгалтерского учета и других услуг. Прежде чем принять какое-либо решение, Вы
                        должны обратиться за консультацией по налоговым и прочим вопросам к специалисту компании ALPS &
                        CHASE или другому профессиональному консультанту, знакомому с особенностями Вашей конкретной
                        ситуации. Не следует направлять ALPS & CHASE какую-либо конфиденциальную информацию до тех пор,
                        пока фирма не подтвердит свое согласие на оказание услуг в ответ на Ваш запрос.</p>
                    <p class="privacy-madal-text privacy-madal-text__title">Система ссылок</p>
                    <p class="privacy-madal-text privacy-madal-text--line"> ALPS & CHASE в прямой форме запрещает
                        следующие действия с сетевыми ссылками, которые могут расцениваться как нарушение прав на
                        товарный знак, а также авторского права: установление ссылок на любые страницы сайта, за
                        исключением главной ( <a href="main.html" class="link-text__to-page"> www.alpschase.com
                        </a>), кроме случаев, когда фирма дала свое прямое согласие на иные действия; установление
                        ссылок, предусматривающих несанкционированное использование нашего логотипа; фрейминг и
                        мета-тэги</p>
                    <p class="privacy-madal-text privacy-madal-text--line">ALPS & CHASE не несет какой-либо
                        ответственности за содержание, точность информации и безопасность каких-либо интернет-сайтов,
                        соединенных (посредством гиперссылки или иным способом) с данным сайтом.</p>
                    <p class="privacy-madal-text privacy-madal-text--line">Некоторые ссылки на данном сайте могут
                        вести на серверы частных лиц или организаций, не контролируемые ALPS & CHASE. ALPS & CHASE не
                        дает каких-либо заверений или гарантий относительно точности или любого другого аспекта
                        информации, размещенной на таких серверах. Ссылка на интернет-сайт третьего лица не может
                        рассматриваться как одобренная ALPS & CHASE или третьей стороной. </p>
                    <p class="privacy-madal-text privacy-madal-text__title">Информация для пользователей в Российской
                        Федерации </p>
                    <p class="privacy-madal-text privacy-madal-text--line"> Серверы, на которых размещается настоящий
                        сайт, располагаются за пределами Российской Федерации. В связи с требованиями российского
                        законодательства, начиная с 1 сентября 2015 года, хранение, запись, систематизация, накопление,
                        уточнение (обновление, изменение) и извлечение ваших персональных данных (ПД) на данном сайте/в
                        базе данных могут нарушать положения законодательства РФ. Начиная с 1 сентября 2015 года, вы не
                        можете размещать ПД на настоящем сайте. Несоблюдение указанного требования, а именно размещение
                        вами ПД на настоящем сайте после 1 сентября 2015 года, производится исключительно на ваш страх и
                        риск и под вашу личную ответственность. ALPS & CHASE не занимается организацией сбора ваших ПД;
                        вы участвуете в таком сборе данных исключительно по собственному усмотрению. Настоящим ALPS &
                        CHASE однозначно отказывается от какой бы то ни было материальной или иной ответственности либо
                        обязательств в отношении передачи вами ПД за пределы Российской Федерации. Компания сохраняет за
                        собой право без уведомления удалить или организовать удаление ПД, размещенных вами на настоящем
                        сайте.</p>
                    <p class="privacy-madal-text privacy-madal-text__title">Информация об авторском праве </p>
                    <p class="privacy-madal-text privacy-madal-text--line">Если не указано иное, все общие материалы
                        сайта охраняются авторским правом, принадлежащим ALPS & CHASE. Все права защищены. Любая часть
                        материалов данного сайта, включая тексты, графические изображения и код html, не подлежит
                        воспроизведению или передаче в какой бы то ни было форме при помощи каких бы то ни было средств
                        без письменного разрешения компании ALPS & CHASE или, в случае местного контента сайта
                        конкретной страны ― без письменного разрешения соответствующего(их) участника(ов) компании
                        конкретного региона. </p>
                    <p class="privacy-madal-text privacy-madal-text--line">Название ALPS& CHASE и визуальный образ
                        бренда “ALPS & CHASE” зарегистрированы или ожидают регистрации в Патентном ведомстве России и
                        других стран мира. </p>
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

    <script src="./js/jquery-3.4.1.min.js"></script>
    <script src="./js/slick.min.js"></script>
    <script src="./js/swiper.min.js"></script>
    <script src="./js/parallax.min.js"></script>
    <script src="./js/index.js?v=30"></script>
    <script src="./js/cube.main.js"></script>

</body>

</html>
