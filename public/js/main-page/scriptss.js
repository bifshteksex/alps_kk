var App = {
    doc: $(document),
    win: $(window)
};
!function(a, b) {
    function c() {
        return "ontouchstart"in document.documentElement && "undefined" != typeof window.orientation
    }
    function d() {
        var a = document.createElement("p")
          , b = document.getElementsByTagName("BODY")[0]
          , c = {
            webkitTransformStyle: "-webkit-transform-style",
            transformStyle: "transform-style"
        };
        b.insertBefore(a, null);
        for (var d in c)
            void 0 !== a.style[d] && (a.style[d] = "preserve-3d");
        var e = window.getComputedStyle(a, null)
          , f = e.getPropertyValue("-webkit-transform-style") || e.getPropertyValue("transform-style");
        return document.body.removeChild(a),
        "preserve-3d" === f
    }
    function e() {
        return !b.isTouchDevice || window.screen.width > 800
    }
    b.doc.ready(function() {
        b.isTouchDevice = c(),
        a("HTML").addClass("mod-" + (b.isTouchDevice ? "" : "no-") + "touchdevice"),
        b.isSupportReal3D = d(),
        a("HTML").addClass("mod-" + (b.isSupportReal3D ? "" : "no-") + "supportreal3d"),
        b.isAcceptablePerformance = e(),
        a("HTML").addClass("mod-" + (b.isAcceptablePerformance ? "" : "no-") + "acceptableperf"),
        b.isSupportCSS3Filter = !1
    }),
    b.win.load(function() {
        b.iHistory = window.History,
        b.iSidebar = new b.Sidebar,
        b.iSearch = new b.Search,
        new b.Main({
            pageTitle: document.title
        })
    }),
    b.win.unload(function() {
        document.cookie = "mobile-disable1=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/"
    }),
    b.win.resize(function() {
        b.doc.trigger("win:resizeBefore"),
        this.resizeTO && clearTimeout(this.resizeTO),
        this.resizeTO = setTimeout(function() {
            b.doc.trigger("win:resizeAfter")
        }, 500)
    }),
    "undefined" != typeof document.hidden && b.doc.on("visibilitychange", function() {
        b.doc.trigger("doc:visibilityChange", {
            visibility: !document.hidden
        })
    })
}(jQuery, App),
App.Cube = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {},
        this.options = {
            alias: "js-cube",
            selector: ".js-cube",
            sides: {
                front: {
                    idx: 0,
                    axis: [0, 0, 0]
                },
                bottom: {
                    idx: 1,
                    axis: [-90, 0, 0]
                },
                back: {
                    idx: 2,
                    axis: [0, 180, 180]
                },
                top: {
                    idx: 3,
                    axis: [90, 0, 0]
                }
            },
            mainAngle: 0,
            perspective: 600,
            depth: 100,
            duration: 1e3,
            currentIdx: 0,
            parallaxRange: 50,
            parallaxSides: {
                front: 0,
                bottom: 0,
                back: 0,
                top: 0
            }
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            this.elements.main = a('[data-role="main"]', this.elements.root),
            this.elements.sides = {},
            this.elements.sidesContent = {};
            for (var c in this.options.sides)
                this.elements.sides[c] = a('[data-role="side-' + c + '"]', this.elements.root),
                this.elements.sidesContent[c] = a('[data-role="side-content"]', this.elements.sides[c]);
            b.isSupportReal3D ? (this.elements.main.css({
                "transform-style": "preserve-3d"
            }),
            this.elements.wrap = a('[data-role="wrap"]', this.elements.root),
            this.elements.wrap.css({
                "transform-style": "preserve-3d"
            })) : this.elements.main.css({
                "transform-origin": "50% 50% 0"
            }),
            this.elements.sides.front.addClass("_active")
        },
        construct: function() {
            return this.objects.assistant = a.Deferred(),
            this.preloadImages(),
            this.objects.assistant.promise()
        },
        preloadImages: function() {
            var b = [];
            for (var c in this.options.sides) {
                var d = this.elements.sides[c].data("src");
                this.options.sides[c].src = d,
                b.push(d)
            }
            a.preload(b).done(a.proxy(this.preloadImagesComplete, this))
        },
        preloadImagesComplete: function() {
            this.resize(),
            b.isSupportReal3D ? this.createReal3D() : this.removeFront3D();
            var a = this;
            a.objects.assistant.resolve()
        },
        setImages: function() {
            for (var a in this.options.sides)
                this.elements.sides[a].css({
                    backgroundImage: "url(" + this.options.sides[a].src + ")"
                })
        },
        activate: function() {
            this.options.demoMode && (this.options.demoMode = !1,
            this.elements.root.removeClass("_demo"),
            this.elements.root.removeAttr("data-step")),
            this.setImages(),
            this.elements.root.addClass("_active"),
            this.bind()
        },
        deactivate: function() {
            this.elements.root.removeClass("_active"),
            this.unbind()
        },
        bind: function() {
            b.doc.on("win:resizeAfter", a.proxy(this.resize, this))
        },
        unbind: function() {
            b.doc.off("win:resizeAfter", a.proxy(this.resize, this))
        },
        resize: function() {
            var a = this.elements.root.height();
            if (this.options.depth = Math.round(a / 2),
            b.isSupportReal3D)
                this.options.perspective = 4 * a,
                this.elements.root.css({
                    perspective: this.options.perspective + "px"
                }),
                this.drawReal3D();
            else {
                this.options.perspective = 3 * a;
                for (var c in this.options.sides)
                    this.elements.sides[c].css({
                        "transform-origin": "50% 50% -" + this.options.depth + "px"
                    });
                this.elements.main.css({
                    transform: "perspective(" + (this.options.perspective - this.options.depth) + "px) translateZ(-" + this.options.depth + "px)"
                }),
                this.redraw()
            }
        },
        addFront3D: function() {
            for (var a in this.options.sides)
                this.options.currentIdx == this.options.sides[a].idx && this.elements.sides[a].css({
                    "transform-origin": "50% 50% -" + this.options.depth + "px",
                    transform: "perspective(" + this.options.perspective + "px) rotateX(" + this.options.sides[a].axis[0] + "deg) rotateY(" + this.options.sides[a].axis[1] + "deg) rotateZ(" + this.options.sides[a].axis[2] + "deg)"
                });
            this.elements.main.css({
                transform: "perspective(" + (this.options.perspective - this.options.depth) + "px) translateZ(-" + this.options.depth + "px)"
            })
        },
        removeFront3D: function() {
            for (var a in this.options.sides)
                this.options.currentIdx == this.options.sides[a].idx && this.elements.sides[a].css({
                    "transform-origin": "50% 50% 0",
                    transform: "none"
                });
            this.elements.main.css({
                transform: "none"
            })
        },
        createReal3D: function() {
            for (var a in this.options.sides)
                this.elements.sides[a].addClass("_visible"),
                "top" == a && this.elements.sides[a].css({
                    "transform-origin": "top center"
                }),
                "bottom" == a && this.elements.sides[a].css({
                    "transform-origin": "bottom center"
                })
        },
        drawReal3D: function() {
            this.elements.wrap.css({
                transform: "translateZ(-" + this.options.depth + "px)"
            }),
            this.elements.sides.front.css({
                transform: "translateZ(" + this.options.depth + "px)"
            }),
            this.elements.sides.bottom.css({
                transform: "rotateX(-90deg) translateY(" + this.options.depth + "px)"
            }),
            this.elements.sides.back.css({
                transform: "translateZ(-" + this.options.depth + "px) rotateX(180deg)"
            }),
            this.elements.sides.top.css({
                transform: "rotateX(-270deg) translateY(-" + this.options.depth + "px)"
            })
        },
        redraw: function() {
            for (var a in this.options.sides)
                this.elements.sides[a].css({
                    transform: "perspective(" + this.options.perspective + "px) rotateX(" + this.options.sides[a].axis[0] + "deg) rotateY(" + this.options.sides[a].axis[1] + "deg) rotateZ(" + this.options.sides[a].axis[2] + "deg)"
                }).toggleClass("_visible", this.options.currentIdx == this.options.sides[a].idx)
        },
        rotate: function(c, d) {
            this.objects.assistant = a.Deferred(),
            b.isSupportReal3D || (this.addFront3D(),
            d = 1),
            this.resetIdx(c, d),
            this.elements.root.addClass(c ? "_down" : "_up"),
            b.isSupportReal3D && this.resetSideParallax(c);
            var e = c ? 90 * d : -90 * d;
            return this.options.mainAngle += e,
            b.isSupportReal3D || this.recalcAxis(e),
            setTimeout(a.proxy(this.animate, this), 50),
            setTimeout(a.proxy(this.reset, this), this.options.duration + 50),
            this.objects.assistant.promise()
        },
        resetIdx: function(a, b) {
            "undefined" == typeof b && (b = 1);
            for (var c = this.options.currentIdx, d = 0; b > d; d++)
                c += a ? 1 : -1,
                0 > c && (c = 3),
                c > 3 && (c = 0);
            this.options.currentIdx = c;
            for (var e in this.options.sides)
                this.elements.sides[e].toggleClass("_active", this.options.currentIdx == this.options.sides[e].idx)
        },
        recalcAxis: function(a) {
            for (var b in this.options.sides) {
                var c = this.options.sides[b].axis;
                c[0] += a,
                this.options.sides[b].axis = c
            }
        },
        setReal3DAngle: function() {
            this.elements.main.css({
                transform: "rotateX(" + this.options.mainAngle + "deg)"
            })
        },
        rotateByAngle: function(c, d) {
            return b.isSupportReal3D ? d ? (this.objects.assistant = a.Deferred(),
            this.elements.root.addClass("_anim"),
            this.elements.main.css({
                transform: "rotateX(" + c + "deg)"
            }),
            this.clearSideParallax(),
            setTimeout(a.proxy(this.reset, this), this.options.duration),
            this.objects.assistant.promise()) : (this.elements.main.css({
                transform: "rotateX(" + c + "deg)"
            }),
            void this.resetParallax(c)) : void 0
        },
        animate: function() {
            this.elements.root.addClass("_anim"),
            b.isSupportReal3D ? (this.setReal3DAngle(),
            this.clearSideParallax()) : this.redraw()
        },
        reset: function() {
            if (this.elements.root.removeClass("_anim"),
            this.elements.root.removeClass("_up _down"),
            (this.options.mainAngle >= 360 || this.options.mainAngle <= -360) && (this.options.mainAngle = this.options.mainAngle % 360),
            b.isSupportReal3D)
                this.setReal3DAngle(),
                this.clearParallax();
            else {
                for (var a in this.options.sides) {
                    var c = this.options.sides[a].axis;
                    for (var d in c)
                        (c[d] >= 360 || c[d] <= -360) && (c[d] = c[d] % 360);
                    this.options.sides[a].axis = c
                }
                this.redraw(),
                this.removeFront3D()
            }
            this.objects.assistant.resolve()
        },
        resetParallax: function(a) {
            var b = (this.options.parallaxSides,
            a / 180 * Math.PI)
              , c = 0;
            for (var d in this.options.parallaxSides) {
                var e = 0;
                switch (d) {
                case "front":
                    e = -1 * Math.sin(b);
                    break;
                case "bottom":
                    e = Math.cos(b);
                    break;
                case "back":
                    e = Math.sin(b);
                    break;
                case "top":
                    e = -1 * Math.cos(b)
                }
                c = Math.round(e * this.options.parallaxRange * 1e3) / 1e3,
                this.options.parallaxSides[d] != c && (this.options.parallaxSides[d] = c,
                this.elements.sidesContent[d].css({
                    transform: "translateY(" + c + "%)"
                }))
            }
        },
        clearParallax: function() {
            var a = 0;
            for (var b in this.options.parallaxSides)
                this.options.parallaxSides[b] != a && (this.options.parallaxSides[b] = a,
                this.elements.sidesContent[b].css({
                    transform: "translateY(" + a + "%)"
                }))
        },
        resetSideParallax: function(a) {
            for (var b in this.options.sides)
                if (this.options.currentIdx == this.options.sides[b].idx && 0 == this.options.parallaxSides[b]) {
                    var c = a ? this.options.parallaxRange : -this.options.parallaxRange;
                    this.options.parallaxSides[b] = c,
                    this.elements.sidesContent[b].css({
                        transform: "translateY(" + c + "%)"
                    })
                }
        },
        clearSideParallax: function() {
            var a = 0;
            for (var b in this.options.sides)
                this.options.currentIdx == this.options.sides[b].idx && (this.options.parallaxSides[b] = a,
                this.elements.sidesContent[b].css({
                    transform: "translateY(" + a + "%)"
                }))
        },
        getImageSrc: function() {
            for (var a in this.options.sides)
                if (this.options.currentIdx == this.options.sides[a].idx)
                    return this.options.sides[a].src
        }
    },
    c
}(jQuery, App),
App.Loader = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {},
        this.options = {
            alias: "js-loader",
            selector: ".js-loader",
            step: 0,
            repeats: 2,
            rotateDuration: 500,
            moveDuration: 0,
            isActive: !1
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            this.elements.root.addClass(b.isSupportReal3D ? "_real3d" : "_fake3d")
        },
        activate: function(a) {
            this.elements.root.addClass("_active"),
            this.options.isActive = !0,
            this.elements.root.attr("data-step", 0),
            this.elements.root[0].offsetHeight,
            a && this.start()
        },
        deactivate: function() {
            this.elements.root.removeClass("_active"),
            this.options.isActive = !1
        },
        start: function() {
            this.stop(),
            this.options.resetTimeout && clearTimeout(this.options.resetTimeout),
            this.options.step = 0,
            this.rotate()
        },
        rotate: function() {
            this.elements.root.addClass("_anim").attr("data-step", this.options.step++),
            this.options.resetTimeout = setTimeout(a.proxy(this.reset, this), this.options.rotateDuration + 100),
            this.options.rotateTimeout = setTimeout(a.proxy(this.rotate, this), 2 * this.options.rotateDuration)
        },
        reset: function() {
            this.elements.root.removeClass("_anim"),
            this.elements.root[0].offsetHeight;
            var a = !1;
            5 == this.options.step && (this.options.step = 1,
            a = !0),
            this.options.isActive || (a = !0),
            a && this.elements.root.attr("data-step", 0)
        },
        stop: function() {
            this.options.rotateTimeout && clearTimeout(this.options.rotateTimeout)
        },
        onDemo: function() {
            return this.objects.assistant = a.Deferred(),
            this.elements.root.addClass("_demo"),
            setTimeout(a.proxy(this.onDemoComplete, this), this.options.repeats * this.options.rotateDuration * 2),
            this.objects.assistant.promise()
        },
        onDemoComplete: function() {
            setTimeout(a.proxy(this.onDemoCompleteResolve, this), this.options.rotateDuration + 100)
        },
        onDemoCompleteResolve: function() {
            this.objects.assistant.resolve()
        },
        offDemo: function() {
            return b.isSupportReal3D ? (this.objects.assistant = a.Deferred(),
            setTimeout(a.proxy(this.offDemoRotation, this), this.options.rotateDuration),
            this.objects.assistant.promise()) : (this.elements.root.removeClass("_demo"),
            !0)
        },
        offDemoRotation: function() {
            this.elements.root.removeClass("_anim").addClass("_lastrotation"),
            setTimeout(a.proxy(this.offDemoComplete, this), 5 * this.options.rotateDuration)
        },
        offDemoComplete: function() {
            this.elements.root.removeClass("_demo _lastrotation"),
            this.objects.assistant.resolve()
        },
        move: function() {
            return this.objects.assistant = a.Deferred(),
            this.elements.root.addClass("_move _shift"),
            setTimeout(a.proxy(this.moveComplete, this), this.options.moveDuration),
            this.objects.assistant.promise()
        },
        moveComplete: function() {
            this.elements.root.removeClass("_active _move"),
            setTimeout(a.proxy(this.moveCompleteResolve, this), 100),
            this.objects.assistant.resolve()
        },
        moveCompleteResolve: function() {
            this.elements.root.removeClass("_shift")
        }
    },
    c
}(jQuery, App),
App.Main = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {},
        this.options = {
            selector: ".js-main",
            urlPath: "",
            pageName: "",
            pageTitle: "",
            gridDuration: 0,
            scrollbarWidth: 0,
            canScroll: !1,
            scrollDuration: 500,
            isSearchMode: !1,
            isPopupOpened: !1,
            lang: "",
            loadedContentData: null
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            this.elements.rootContainer = a(".js-container"),
            this.options.lang = document.documentElement.getAttribute("lang"),
            this.objects.loader = new b.Loader,
            this.elements.page = a('[data-role="page"]', this.elements.root),
            this.options.isInitialPage = !0,
            b.isTouchDevice || (this.calcScroll(),
            this.setScroll());
            var c = a.cookie("rd_rotator_demo");
            a.cookie("rd_rotator_demo", 1, {
                expires: 365,
                path: "/"
            }),
            b.demoCookie = "undefined" != typeof c && 1 == c,
            setTimeout(a.proxy(this.renderFirst, this), 100)
        },
        renderFirst: function() {
            this.objects.loader.activate(!0);
            var c = b.iHistory.getState();
            this.options.urlPath = a.url("path"),
            c.data.pathurl = this.options.urlPath,
            c.data.searchquery = this.elements.rootContainer[0].getAttribute("data-searchquery");
            var d = a("._active[data-sidebarnav]");
            d.length && (c.data.sidebarnav = d.data("navidx")),
            null === c.data.searchquery && (this.options.isInitialPage = !1),
            b.iHistory.replaceState(c.data, c.title, c.url),
            this.create() || this.createInterrupted()
        },
        setPageTitle: function(a) {
            var c = b.iHistory.getState();
            b.iHistory.replaceState(c.data, a, c.url),
            document.title = a
        },
        create: function() {
            var c = a('[data-role="pagecontent"]', this.elements.page);
            if (0 == c.length)
                return console.error("App: Content element not found"),
                !1;
            var d = c.data("name");
            if ("undefined" == typeof d)
                return console.error("App: Content name undefined"),
                !1;
            var e = "js-" + d;
            switch (c.attr("id", e),
            d) {
            case "index":
                this.objects.page = new b.Index({
                    selector: "#" + e,
                    alias: e
                });
                break;
            case "projects":
                this.objects.page = new b.PageProjects({
                    selector: "#" + e,
                    alias: e
                });
                break;
            case "project":
                this.objects.page = new b.PageProject({
                    selector: "#" + e,
                    alias: e
                });
                break;
            case "services":
                this.objects.page = new b.PageServices({
                    selector: "#" + e,
                    alias: e
                });
                break;
            case "about":
                this.objects.page = new b.PageAbout({
                    selector: "#" + e,
                    alias: e
                });
                break;
            case "team":
                this.objects.page = new b.PageTeam({
                    selector: "#" + e,
                    alias: e
                });
                break;
            case "media":
                this.objects.page = new b.PageMedia({
                    selector: "#" + e,
                    alias: e
                });
                break;
            case "news":
                this.objects.page = new b.PageNews({
                    selector: "#" + e,
                    alias: e
                });
                break;
            case "rdnews":
                this.objects.page = new b.PageRDNews({
                    selector: "#" + e,
                    alias: e
                });
                break;
            case "contacts":
                this.objects.page = new b.PageContacts({
                    selector: "#" + e,
                    alias: e
                });
                break;
            case "generic":
                this.objects.page = new b.PageGeneric({
                    selector: "#" + e,
                    alias: e
                });
                break;
            default:
                this.objects.page = new b.PageError({
                    selector: "#" + e,
                    alias: e
                })
            }
            if (null == this.objects.page)
                return console.error("App: Content type unknown"),
                !1;
            this.options.pageName = d;
            var f = c.data("title");
            return "undefined" == typeof f && (f = this.options.pageTitle),
            this.setPageTitle(f),
            this.options.isShowDemo = "index" == this.options.pageName && this.options.isInitialPage && !b.isTouchDevice && !b.demoCookie,
            this.options.isShowDemo ? a.when(this._pageConstruct(), this._loaderOnDemo()).done(a.proxy(this.createComplete, this)) : a.when(this._pageConstruct()).done(a.proxy(this.createComplete, this)),
            !0
        },
        _pageConstruct: function() {
            return this.objects.page.construct()
        },
        createComplete: function() {
            this.objects.loader.stop(),
            this.options.isShowDemo ? a.when(this._loaderOffDemo()).done(a.proxy(this._showGridThenActivate, this)) : ("index" != this.options.pageName && this.objects.loader.deactivate(),
            this._showGridThenActivate())
        },
        createInterrupted: function() {
            this.elements.root.addClass("_showgrid"),
            this.objects.loader.stop(),
            this.objects.loader.deactivate(),
            b.iSidebar.activate(),
            b.iSearch.activate(),
            this.elements.page.scrollTop(0),
            this.bind()
        },
        _loaderOnDemo: function() {
            return this.objects.loader.onDemo()
        },
        _loaderMove: function() {
            return this.objects.loader.move()
        },
        _loaderOffDemo: function() {
            return this.objects.loader.offDemo()
        },
        _showGridThenActivate: function() {
            this.elements.root.addClass("_showgrid"),
            setTimeout(a.proxy(this._pageActivate, this), this.options.gridDuration)
        },
        _pageActivate: function() {
            this.elements.page.addClass("_contentvisible"),
            "index" == this.options.pageName ? a.when(this._loaderMove()).done(a.proxy(this._pageActivateComplete, this)) : this._pageActivateComplete()
        },
        _pageActivateComplete: function() {
            b.iSidebar.activate(),
            b.iSearch.activate(),
            this.elements.page.scrollTop(0),
            this.objects.page.activate(),
            this.bind();
            var a = b.iHistory.getState();
            "undefined" != typeof a.data.searchquery && null != a.data.searchquery ? b.iSearch.showWithQuery(a.data.searchquery) : b.iSearch.clearAll()
        },
        bind: function() {
            this.bindPageLinks(),
            b.win.on("statechange", a.proxy(this.historyChange, this)),
            b.doc.on("page:scrollTo", a.proxy(this.scrollTo, this)),
            b.doc.on("popup:onshowBefore", a.proxy(this.popupOnShow, this)),
            b.doc.on("popup:onhideAfter", a.proxy(this.popupOnHide, this)),
            this.elements.page.on("scroll", a.proxy(this.onPageScroll, this)),
            this.elements.page.on("click", '[data-role="scrolltop"]', a.proxy(this.clickScrolltop, this))
        },
        unbind: function() {
            this.unbindPageLinks(),
            b.win.off("statechange", a.proxy(this.historyChange, this)),
            b.doc.off("page:scrollTo", a.proxy(this.scrollTo, this)),
            b.doc.off("popup:onshowBefore", a.proxy(this.popupOnShow, this)),
            b.doc.off("popup:onhideAfter", a.proxy(this.popupOnHide, this)),
            this.elements.page.off()
        },
        bindPageLinks: function() {
            b.doc.on("click", 'A[data-role="pagelink"]', a.proxy(this.clickPagelink, this, ""));
            var c = b.iSidebar.getRoot();
            c.on("click", 'A[data-role="pagelink"]', a.proxy(this.clickPagelink, this, "sidebar"));
            var d = b.iSearch.getRoot();
            d.on("click", 'A[data-role="pagelink"]', a.proxy(this.clickPagelink, this, "search"))
        },
        unbindPageLinks: function() {
            b.doc.off("click", 'A[data-role="pagelink"]', a.proxy(this.clickPagelink, this, ""));
            var c = b.iSidebar.getRoot();
            c.off("click", 'A[data-role="pagelink"]', a.proxy(this.clickPagelink, this, "sidebar"));
            var d = b.iSearch.getRoot();
            d.off("click", 'A[data-role="pagelink"]', a.proxy(this.clickPagelink, this, "search"))
        },
        clickPagelink: function(c, d) {
            d.stopPropagation(),
            d.preventDefault();
            var e = a(d.target).closest('[data-role="pagelink"]')
              , f = e.attr("href")
              , g = e.data("type")
              , h = {
                pathurl: f,
                searchquery: null
            };
            if ("search" == c && (h.reload = !0),
            "undefined" != typeof g && "back" == g) {
                var i = b.iHistory.getCurrentIndex();
                if (i > 0)
                    return b.iHistory.back(),
                    !1
            }
            return e.hasClass("_active _current") || b.iHistory.pushState(h, null, f),
            !1
        },
        clickScrolltop: function(a) {
            a.stopPropagation(),
            this.scrollToOffset(0)
        },
        historyChange: function() {
            var c = b.iHistory.getState();
            if ("undefined" == typeof c.data.pathurl)
                return void console.error("App: Unknown history path");
            if (this.options.urlPath != c.data.pathurl || c.data.reload) {
                this.options.urlPath = c.data.pathurl,
                this.options.urlPathChanges = {},
                "undefined" != typeof c.data.changes && (this.options.urlPathChanges = c.data.changes);
                var d = ""
                  , e = !1;
                if ("/_html/01_main.html" == a(".b-logo").attr("href")) {
                    var f = "/" == this.options.urlPath.substr(0, 1) ? this.options.urlPath.substr(7, 2) : this.options.urlPath.substr(0, 2);
                    -1 != a.inArray(f, ["01", "02", "05", "06", "07", "09", "12"]) ? (d = ("/" == this.options.urlPath.substr(0, 1) ? "" : "/_html/") + this.options.urlPath,
                    e = !0) : (-1 != a.inArray(f, ["03", "04"]) && (d = "/_html/02_about.html"),
                    -1 != a.inArray(f, ["08"]) && (d = "/_html/07_projects.html"))
                } else {
                    var g = this.options.urlPath;
                    -1 != g.indexOf("?") && (g = g.substr(0, g.indexOf("?"))),
                    "/" == g.substr(0, 1) && (g = g.substr(1));
                    var h = this.options.lang;
                    if ("ru" != h && (g = g.substr(3)),
                    "" == g)
                        d = "/",
                        e = !0;
                    else {
                        var i = g.split("/");
                        (1 == i.length || "" == i[1]) && (e = !0),
                        d = "/" + i[0] + "/"
                    }
                    "ru" != h && (d = "/" + h + d)
                }
                b.iSidebar.resetNav(d, e),
                a.when(this._closeSidebar(), this._hideSearch()).done(a.proxy(this.transitToNewPage, this))
            }
        },
        _closeSidebar: function() {
            return b.iSidebar.closeIfOpened()
        },
        _hideSearch: function() {
            return b.iSearch.hideIfOpened()
        },
        transitToNewPage: function() {
            b.iSidebar.deactivate(),
            b.iSearch.deactivate(),
            this.unbind(),
            a.when(this._preloadContent(), this._preparePage()).done(a.proxy(this.renderContent, this))
        },
        _preparePage: function() {
            return this.objects.prepareAssistant = a.Deferred(),
            null != this.objects.page ? a.when(this._pageDestruct()).done(a.proxy(this.resetPage, this)) : this.resetPage(),
            this.objects.prepareAssistant.promise()
        },
        _pageDestruct: function() {
            return this.objects.page.destruct()
        },
        resetPage: function() {
            this.options.isPopupOpened && this.popupOnHide(),
            this.options.isInitialPage = !1,
            this.objects.page = null,
            this.elements.page.scrollTop(0).scrollLeft(0).empty().removeClass("_contentvisible"),
            b.iSidebar.scrollTop(),
            b.iSidebar.setInvert(!1),
            this.elements.root.removeClass("_showgrid"),
            setTimeout(a.proxy(this._preparePageComplete, this), this.options.gridDuration)
        },
        _preparePageComplete: function() {
            return this.objects.loader.activate(!0),
            this.objects.prepareAssistant.resolve()
        },
        _preloadContent: function() {
            return this.objects.preloadAssistant = a.Deferred(),
            this.loadContent(),
            this.objects.preloadAssistant.promise()
        },
        loadContent: function() {
            a.isEmptyObject(this.options.urlPathChanges) ? a.get(this.options.urlPath).done(a.proxy(this.loadContentComplete, this)).fail(a.proxy(this.loadContentFail, this)) : a.post(this.options.urlPath, {
                changes: this.options.urlPathChanges
            }).done(a.proxy(this.loadContentComplete, this)).fail(a.proxy(this.loadContentFail, this))
        },
        loadContentComplete: function(a) {
            this.options.loadedContentData = a,
            this.objects.preloadAssistant.resolve()
        },
        loadContentFail: function() {
            this.options.loadedContentData = null,
            this.objects.preloadAssistant.resolve()
        },
        renderContent: function() {
            return null == this.options.loadedContentData ? void this.createInterrupted() : (this.elements.page.html(this.options.loadedContentData),
            this.options.loadedContentData = null,
            void (this.create() || this.createInterrupted()))
        },
        calcScroll: function() {
            var b = a("<DIV/>");
            this.elements.page.append(b),
            this.options.scrollbarWidth = this.elements.page.width() - b.width(),
            b.remove()
        },
        setScroll: function() {
            var a = this.options.scrollbarWidth;
            this.elements.page.css({
                right: -1 * a + "px"
            }),
            this.elements.root.css({
                right: a + "px"
            }),
            b.iSidebar.setRightOffset(a)
        },
        onPageScroll: function() {
            this.options.isPopupOpened || b.doc.trigger("page:scrolled", {
                scrollTop: this.elements.page.scrollTop()
            })
        },
        scrollTo: function(a, b) {
            var c = this.options.scrollDuration;
            "undefined" != typeof b.duration && (c = b.duration),
            "undefined" != typeof b.top && this.scrollToOffset(b.top, c)
        },
        scrollToOffset: function(a, b) {
            this.elements.page.animate({
                scrollTop: a
            }, b)
        },
        popupOnShow: function() {
            this.options.isPopupOpened = !0,
            this.options.freezeOnTop = this.elements.page.scrollTop(),
            this.elements.rootContainer.addClass("_freeze")
        },
        popupOnHide: function() {
            this.elements.rootContainer.removeClass("_freeze"),
            this.elements.page.scrollTop(this.options.freezeOnTop),
            this.options.isPopupOpened = !1
        }
    },
    c
}(jQuery, App),
App.Rotator = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {},
        this.options = {
            alias: "js-rotator",
            selector: ".js-rotator",
            sides: {
                front: {
                    idx: 0,
                    axis: [0, 0, 0]
                },
                bottom: {
                    idx: 1,
                    axis: [-90, 0, 0]
                },
                back: {
                    idx: 2,
                    axis: [0, 180, 180]
                },
                top: {
                    idx: 3,
                    axis: [90, 0, 0]
                }
            },
            mainAngle: 0,
            dragData: {
                active: !1,
                start: 0,
                distance: 0,
                angle: 0
            },
            height: 8,
            perspective: 21,
            depth: 3.5,
            rotateDuration: 1e3,
            moveDuration: 500,
            closeDuration: 300,
            has3D: !0,
            isOpened: !0,
            isLocked: !1,
            currentIdx: 0
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            this.elements.container = a('[data-role="container"]', this.elements.root),
            this.elements.main = a('[data-role="main"]', this.elements.root),
            this.elements.sides = {};
            for (var c in this.options.sides)
                this.elements.sides[c] = a('[data-role="side-' + c + '"]', this.elements.root),
                this.elements.sides[c].toggleClass("_active", this.options.currentIdx == this.options.sides[c].idx);
            b.isSupportReal3D ? (this.elements.main.css({
                "transform-style": "preserve-3d"
            }),
            this.elements.wrap = a('[data-role="wrap"]', this.elements.root),
            this.elements.wrap.css({
                "transform-style": "preserve-3d"
            })) : this.elements.main.css({
                "transform-origin": "50% 50% 0"
            }),
            this.resize(),
            b.isSupportReal3D || this.removeFront3D()
        },
        resize: function() {
            var a = this.options.height;
            if (b.isSupportReal3D)
                this.options.perspective = 5 * a,
                this.options.depth = a / 2,
                this.elements.container.css({
                    perspective: this.options.perspective + "rem"
                }),
                this.drawReal3D();
            else {
                this.options.perspective = 3 * a,
                this.options.depth = a / 2;
                for (var c in this.options.sides)
                    this.elements.sides[c].css({
                        "transform-origin": "50% 50% -" + this.options.depth + "rem"
                    });
                this.elements.main.css({
                    transform: "perspective(" + (this.options.perspective - this.options.depth) + "rem) translateZ(-" + this.options.depth + "rem)"
                }),
                this.redraw()
            }
        },
        activate: function() {
            return this.objects.assistant = a.Deferred(),
            this.elements.root.addClass("_active"),
            this.close(),
            setTimeout(a.proxy(this.activateComplete, this), this.options.closeDuration),
            this.objects.assistant.promise()
        },
        activateComplete: function() {
            this.objects.assistant.resolve(),
            this.bind()
        },
        bind: function() {
            b.isTouchDevice ? (this.elements.root.on("touchstart", a.proxy(this.dragStart, this)),
            this.elements.root.on("touchmove", a.proxy(this.dragMove, this)),
            this.elements.root.on("touchend touchcancel", a.proxy(this.dragEnd, this))) : (this.elements.root.on("mousedown", a.proxy(this.dragStart, this)),
            this.elements.root.on("mousemove", a.proxy(this.dragMove, this)),
            this.elements.root.on("mouseup", a.proxy(this.dragEnd, this))),
            this.elements.root.on("click", '[data-role="arr-up"]', a.proxy(this.clickArrUp, this)),
            this.elements.root.on("click", '[data-role="arr-down"]', a.proxy(this.clickArrDown, this)),
            this.elements.root.on("click", a.proxy(this.clickRoot, this)),
            b.isTouchDevice || (this.elements.root.on("mouseenter", a.proxy(this.enterRoot, this)),
            this.elements.root.on("mouseleave", a.proxy(this.leaveRoot, this)))
        },
        unbind: function() {
            this.elements.root.off()
        },
        clickRoot: function(a) {
            a.stopPropagation(),
            b.isTouchDevice && this.open()
        },
        enterRoot: function() {
            this.open()
        },
        leaveRoot: function() {
            this.close()
        },
        open: function() {
            this.options.closeAfterRelease = !1,
            this.options.isOpened || (this.options.openTimeout && clearTimeout(this.options.openTimeout),
            this.options.openTimeout = setTimeout(a.proxy(this.openComplete, this), 300),
            this.elements.root.removeClass("_closed"))
        },
        openComplete: function() {
            this.options.isOpened = !0
        },
        close: function() {
            return this.options.isLocked ? void (this.options.closeAfterRelease = !0) : void (this.options.isOpened && (this.options.openTimeout && clearTimeout(this.options.openTimeout),
            this.options.isOpened = !1,
            this.elements.root.addClass("_closed")))
        },
        closeIfOpened: function() {
            this.options.isOpened && this.close()
        },
        lock: function() {
            this.options.isLocked = !0
        },
        release: function() {
            this.options.isLocked = !1,
            this.options.closeAfterRelease && (this.close(),
            this.options.closeAfterRelease = !1)
        },
        clickArrUp: function(a) {
            this.options.isOpened && (a.stopPropagation(),
            this.clickArr(!1))
        },
        clickArrDown: function(a) {
            this.options.isOpened && (a.stopPropagation(),
            this.clickArr(!0))
        },
        clickArr: function(a) {
            this.options.isLocked || this.options.dragData.active && this.options.dragData.distance > 0 || (this.rotate(a),
            b.doc.trigger("rotator:move", {
                fwd: a
            }))
        },
        dragStart: function(a) {
            if (a.stopPropagation(),
            this.options.isOpened && !this.options.isLocked) {
                this.lock(),
                this.elements.root.addClass("_draggable"),
                b.isSupportReal3D || this.addFront3D();
                var c = this._pointerEventToXY(a);
                this.options.dragData.active = !0,
                this.options.dragData.start = c.y / 10,
                this.options.dragData.distance = 0,
                this.options.dragData.angle = 0
            }
        },
        dragMove: function(a) {
            if (a.preventDefault(),
            a.stopPropagation(),
            this.options.dragData.active) {
                var c = this._pointerEventToXY(a);
                if (this.options.dragData.distance = c.y / 10 - this.options.dragData.start,
                0 != Math.round(this.options.dragData.distance)) {
                    var d = this.options.dragData.angle
                      , e = 4 * this.options.height / 5;
                    if (b.isSupportReal3D && (e = 4 * this.options.height),
                    Math.abs(this.options.dragData.distance) > e)
                        return this.dragEnd(),
                        !1;
                    this.options.dragData.angle = Math.round(this.options.dragData.distance / this.options.height * -90),
                    this.recalc3DAngle(this.options.dragData.angle - d),
                    b.isSupportReal3D ? this.setReal3DAngle() : (this.recalcAxis(this.options.dragData.angle - d),
                    this.redraw()),
                    b.doc.trigger("rotator:moveByAngle", {
                        angle: this.options.mainAngle,
                        anim: !1
                    })
                }
            }
        },
        dragEnd: function(a) {
            if (a && a.stopPropagation(),
            this.options.dragData.active) {
                this.elements.root.removeClass("_draggable");
                var c = Math.abs(this.options.dragData.distance);
                if (c > 0)
                    if (c < 2 * this.options.height / 5)
                        this.rotateByAngle(-this.options.dragData.angle),
                        b.doc.trigger("rotator:moveByAngle", {
                            angle: this.options.mainAngle,
                            anim: !0
                        });
                    else {
                        var d, e, f = Math.abs(this.options.dragData.angle), g = this.options.dragData.angle > 0;
                        b.isSupportReal3D ? (e = Math.floor(f / 90),
                        f - 90 * e >= 36 && e++,
                        f = 90 * e - f,
                        d = g ? f : -f) : (e = 1,
                        f = 90 - f,
                        d = g ? f : -f),
                        this.resetIdx(g, e),
                        this.rotateByAngle(d),
                        b.doc.trigger("rotator:move", {
                            fwd: g,
                            cnt: e
                        })
                    }
                else
                    b.isSupportReal3D || this.removeFront3D(),
                    this.release();
                this.options.dragData.active = !1,
                this.options.dragData.start = 0,
                this.options.dragData.distance = 0,
                this.options.dragData.angle = 0
            }
        },
        _pointerEventToXY: function(a) {
            var b = {
                x: 0,
                y: 0
            };
            if ("touchstart" == a.type || "touchmove" == a.type || "touchend" == a.type || "touchcancel" == a.type) {
                var c = a.originalEvent.touches[0] || a.originalEvent.changedTouches[0];
                b.x = c.pageX,
                b.y = c.pageY
            } else
                ("mousedown" == a.type || "mouseup" == a.type || "mousemove" == a.type || "mouseover" == a.type || "mouseout" == a.type || "mouseenter" == a.type || "mouseleave" == a.type) && (b.x = a.pageX,
                b.y = a.pageY);
            return b
        },
        addFront3D: function() {
            if (!this.options.has3D) {
                this.options.has3D = !0;
                for (var a in this.options.sides)
                    this.options.currentIdx == this.options.sides[a].idx && this.elements.sides[a].css({
                        "transform-origin": "50% 50% -" + this.options.depth + "rem",
                        transform: "perspective(" + this.options.perspective + "rem) rotateX(" + this.options.sides[a].axis[0] + "deg) rotateY(" + this.options.sides[a].axis[1] + "deg) rotateZ(" + this.options.sides[a].axis[2] + "deg)"
                    });
                this.elements.main.css({
                    transform: "perspective(" + (this.options.perspective - this.options.depth) + "rem) translateZ(-" + this.options.depth + "rem)"
                })
            }
        },
        removeFront3D: function() {
            if (this.options.has3D) {
                this.options.has3D = !1;
                for (var a in this.options.sides)
                    this.options.currentIdx == this.options.sides[a].idx && this.elements.sides[a].css({
                        "transform-origin": "50% 50% 0",
                        transform: "none"
                    });
                this.elements.main.css({
                    transform: "none"
                })
            }
        },
        drawReal3D: function() {
            this.elements.wrap.css({
                transform: "translateZ(" + 4 * this.options.depth + "rem) scale(0.5)"
            }),
            this.elements.sides.front.css({
                transform: "translateZ(" + this.options.depth + "rem)"
            }),
            this.elements.sides.bottom.css({
                transform: "rotateX(-90deg) translateY(" + this.options.depth + "rem)",
                "transform-origin": "bottom center"
            }),
            this.elements.sides.back.css({
                transform: "translateZ(-" + this.options.depth + "rem) rotateX(180deg)"
            }),
            this.elements.sides.top.css({
                transform: "rotateX(-270deg) translateY(-" + this.options.depth + "rem)",
                "transform-origin": "top center"
            })
        },
        redraw: function() {
            for (var a in this.options.sides)
                this.elements.sides[a].css({
                    transform: "perspective(" + this.options.perspective + "rem) rotateX(" + this.options.sides[a].axis[0] + "deg) rotateY(" + this.options.sides[a].axis[1] + "deg) rotateZ(" + this.options.sides[a].axis[2] + "deg)"
                })
        },
        rotate: function(a) {
            return this.options.isOpened ? (this.lock(),
            b.isSupportReal3D || this.addFront3D(),
            this.resetIdx(a),
            void this.rotateByAngle(a ? 90 : -90)) : void this.hiddenRotate(a)
        },
        hiddenRotate: function(a) {
            b.isSupportReal3D || this.addFront3D(),
            this.resetIdx(a);
            var c = a ? 90 : -90;
            this.recalc3DAngle(c),
            b.isSupportReal3D ? (this.setReal3DAngle(),
            this.reset()) : (this.recalcAxis(c),
            this.reset())
        },
        resetIdx: function(a, b) {
            "undefined" == typeof b && (b = 1);
            for (var c = this.options.currentIdx, d = 0; b > d; d++)
                c += a ? 1 : -1,
                0 > c && (c = 3),
                c > 3 && (c = 0);
            this.options.currentIdx = c;
            for (var e in this.options.sides)
                this.elements.sides[e].toggleClass("_active", this.options.currentIdx == this.options.sides[e].idx)
        },
        recalcAxis: function(a) {
            for (var b in this.options.sides) {
                var c = this.options.sides[b].axis;
                c[0] += a,
                this.options.sides[b].axis = c
            }
        },
        recalc3DAngle: function(a) {
            this.options.mainAngle += a
        },
        setReal3DAngle: function() {
            this.elements.main.css({
                transform: "rotateX(" + this.options.mainAngle + "deg)"
            })
        },
        rotateByAngle: function(c) {
            this.recalc3DAngle(c),
            b.isSupportReal3D || this.recalcAxis(c),
            setTimeout(a.proxy(this.animate, this), 50),
            setTimeout(a.proxy(this.reset, this), this.options.rotateDuration + 50),
            setTimeout(a.proxy(this.release, this), this.options.rotateDuration + 100)
        },
        animate: function() {
            this.elements.root.addClass("_anim"),
            b.isSupportReal3D ? this.setReal3DAngle() : this.redraw()
        },
        reset: function() {
            if (this.elements.root.removeClass("_anim"),
            (this.options.mainAngle >= 360 || this.options.mainAngle <= -360) && (this.options.mainAngle = this.options.mainAngle % 360),
            b.isSupportReal3D)
                this.setReal3DAngle();
            else {
                for (var a in this.options.sides) {
                    var c = this.options.sides[a].axis;
                    for (var d in c)
                        (c[d] >= 360 || c[d] <= -360) && (c[d] = c[d] % 360);
                    this.options.sides[a].axis = c
                }
                this.redraw(),
                this.removeFront3D()
            }
        },
        deactivate: function() {
            this.elements.root.removeClass("_active"),
            this.unbind()
        }
    },
    c
}(jQuery, App),
App.Search = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {
            scroll: null
        },
        this.options = {
            name: "",
            alias: "js-search",
            selector: ".js-search",
            queryName: "searchquery",
            duration: 500,
            lastQuery: "",
            offset: 0,
            remains: 0,
            lastScrollTop: 0
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            this.options.isOpened = !1,
            this.options.rootHeight = 0,
            this.elements.form = a('[data-role="form"]', this.elements.root),
            this.elements.query = a('[data-role="query"]', this.elements.form),
            this.elements.content = a('[data-role="content"]', this.elements.root),
            this.elements.scroller = a('[data-role="scroller"]', this.elements.root),
            this.elements.list = a('[data-role="list"]', this.elements.content),
            this.options.queryName = this.elements.query.attr("name"),
            this.options.actionURL = this.elements.form.data("action"),
            this.options.template = a("#tmpl-search-list").html(),
            Mustache.parse(this.options.template),
            this.renderScroller()
        },
        renderScroller: function() {
            this.elements.content.append('<div class="track"><div class="bar"></div></div>')
        },
        bind: function() {
            this.objects.scroll = this.elements.content.baron({
                root: this.elements.content,
                scroller: ".scroller",
                bar: ".bar",
                track: ".track",
                barOnCls: "baron"
            }),
            this.elements.root.on("click", '[data-role="close"]', a.proxy(this.onClickClose, this)),
            this.elements.scroller.on("scroll", a.proxy(this.onScroll, this)),
            this.elements.form.on("submit", a.proxy(this.onSubmit, this)),
            this.elements.query.on("keyup", a.proxy(this.onKeyUp, this)),
            b.doc.on("win:resizeAfter", a.proxy(this.resize, this))
        },
        unbind: function() {
            this.hideInstantly(),
            null != this.objects.scroll && this.objects.scroll.dispose(),
            this.objects.scroll = null,
            this.elements.root.off(),
            this.elements.scroller.off(),
            this.elements.form.off(),
            this.elements.query.off(),
            b.doc.off("win:resizeAfter", a.proxy(this.resize, this))
        },
        getRoot: function() {
            return this.elements.root
        },
        setQuery: function(a) {
            this.options.lastQuery != a && (this.elements.query.val(a),
            this.applyQuery())
        },
        activate: function() {
            this.elements.root.addClass("_active"),
            this.bind()
        },
        deactivate: function() {
            this.elements.root.removeClass("_active"),
            this.unbind()
        },
        resize: function() {
            this.options.rootHeight = this.elements.root.height(),
            this.elements.scroller.css({
                height: this.elements.content.height() + "px"
            }),
            null != this.objects.scroll && this.objects.scroll.update(),
            this.elements.scroller.scrollTop(this.options.lastScrollTop)
        },
        showWithQuery: function(a) {
            this.show(),
            this.setQuery(a)
        },
        show: function() {
            this.options.isOpened || (this.options.isOpened = !0,
            b.doc.trigger("popup:onshowBefore", {
                name: this.options.name
            }),
            this.elements.root.addClass("_opened"),
            setTimeout(a.proxy(this.showComplete, this), this.options.duration))
        },
        showComplete: function() {
            this.options.isOpened && (this.resize(),
            this.elements.query.focus(),
            b.doc.trigger("popup:onshowAfter", {
                name: this.options.name
            }))
        },
        hide: function(c) {
            c && (c.stopPropagation(),
            c.preventDefault()),
            this.options.isOpened && (this.options.isOpened = !1,
            this.options.lastScrollTop = this.elements.scroller.scrollTop(),
            this.clearURL(),
            this.elements.root.removeClass("_opened"),
            setTimeout(a.proxy(this.hideComplete, this), this.options.duration),
            b.doc.trigger("popup:onhideBefore", {
                name: this.options.name
            }))
        },
        hideInstantly: function() {
            this.options.isOpened && (this.options.isOpened = !1,
            this.options.lastScrollTop = this.elements.scroller.scrollTop(),
            this.clearURL(),
            this.elements.root.removeClass("_opened"),
            b.doc.trigger("popup:onhideBefore", {
                name: this.options.name
            }),
            b.doc.trigger("popup:onhideAfter", {
                name: this.options.name
            }))
        },
        hideComplete: function() {
            this.options.isOpened || b.doc.trigger("popup:onhideAfter", {
                name: this.options.name
            })
        },
        hideIfOpened: function() {
            return this.options.isOpened ? (this.objects.assistant = a.Deferred(),
            this.hide(),
            setTimeout(a.proxy(this.hideResolve, this), this.options.duration),
            this.objects.assistant.promise()) : !0
        },
        hideResolve: function() {
            this.objects.assistant.resolve()
        },
        onClickClose: function() {
            this.hide(),
            setTimeout(a.proxy(this.clearAll, this), 500)
        },
        onScroll: function() {
            if (this.elements.content.toggleClass("_scrolling", this.elements.scroller.scrollTop() > 0),
            0 != this.options.remains) {
                var a = this.elements.list[0].getBoundingClientRect();
                Math.ceil(a.bottom) == this.options.rootHeight && (this.loadMore(),
                this.options.isLoading = !0)
            }
        },
        onKeyUp: function() {
            return this.options.keyTimeout && clearTimeout(this.options.keyTimeout),
            this.elements.query.val().length < 2 ? void this.clearList() : void (this.options.lastQuery != this.elements.query.val() && (this.options.keyTimeout = setTimeout(a.proxy(this.applyQuery, this), 500)))
        },
        onSubmit: function(a) {
            return a.preventDefault(),
            this.options.lastQuery != this.elements.query.val() ? (this.applyQuery(),
            !1) : void 0
        },
        applyQuery: function() {
            this.options.isLoading = !0,
            this.options.isReseting = !0,
            this.options.lastQuery = this.elements.query.val(),
            this.options.offset = 0,
            this.options.remains = 0,
            this.replaceURL(),
            this.elements.content.addClass("_reseting"),
            this.elements.content.removeClass("_empty"),
            setTimeout(a.proxy(this.loadNew, this), 500)
        },
        replaceURL: function() {
            var a = b.iHistory.getState();
            if (a.data.searchquery != this.options.lastQuery) {
                a.data.searchquery = this.options.lastQuery,
                a.data.reload = !1;
                var c = a.url.split("?", 2);
                a.url = c[0] + "?" + this.options.queryName + "=" + this.options.lastQuery,
                b.iHistory.replaceState(a.data, a.title, a.url)
            }
        },
        clearURL: function() {
            var a = b.iHistory.getState();
            a.data.searchquery = null,
            a.data.reload = !1;
            var c = a.url.split("?", 2);
            a.url = c[0],
            b.iHistory.replaceState(a.data, a.title, a.url)
        },
        loadNew: function() {
            this.elements.content.addClass("_loading"),
            this.elements.scroller.scrollTop(0),
            setTimeout(a.proxy(this.loadData, this), 500)
        },
        loadMore: function() {
            this.options.isLoading || (this.options.isReseting = !1,
            this.elements.content.addClass("_loading"),
            setTimeout(a.proxy(this.loadData, this), 500))
        },
        loadData: function() {
            var b = {
                query: this.options.lastQuery,
                offset: this.options.offset
            };
            this.options.xhr && 4 != this.options.xhr.readystate && this.options.xhr.abort(),
            this.options.xhr = a.ajax({
                url: this.options.actionURL,
                type: "POST",
                dataType: "json",
                cache: !1,
                data: b,
                success: a.proxy(this.loadDataSuccess, this),
                error: a.proxy(this.loadDataError, this)
            })
        },
        loadDataSuccess: function(a) {
            this.options.isReseting && this.elements.list.empty();
            var b = a.list.length;
            b > 0 && (this.elements.list.append(Mustache.render(this.options.template, {
                list: a.list
            })),
            this.options.offset += b,
            this.options.remains = a.remains),
            this.elements.content.removeClass("_loading _reseting"),
            0 == b && this.elements.content.addClass("_empty"),
            this.options.isLoading = !1
        },
        loadDataError: function() {
            this.elements.list.empty(),
            this.elements.content.removeClass("_loading _reseting"),
            this.options.isLoading = !1
        },
        clearList: function() {
            "" != this.options.lastQuery && (this.options.lastQuery = "",
            this.options.lastScrollTop = 0,
            this.elements.content.addClass("_reseting"),
            this.elements.content.removeClass("_empty"))
        },
        clearAll: function() {
            "" != this.options.lastQuery && (this.elements.query.val(""),
            this.clearList())
        }
    },
    c
}(jQuery, App),
App.Sidebar = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {},
        this.options = {
            alias: "js-sidebar",
            selector: ".js-sidebar",
            duration: 500,
            isInvert: !1,
            isCollapse: !1,
            hasImages: !1,
            rightOffset: 0,
            toggleHeight: 0,
            hasGap: !1
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            null != window.mozInnerScreenX && navigator.platform.indexOf("Win") >= 0 && this.elements.root.addClass("_ffwin"),
            this.elements.back = a('[data-role="back"]', this.elements.root),
            this.objects.images = {},
            this.elements.links = a('[data-role="pagelink"]', this.elements.root),
            this.options.isOpened = !1
        },
        getRoot: function() {
            return this.elements.root
        },
        setRightOffset: function(a) {
            this.options.rightOffset = a,
            this.elements.root.css({
                right: this.options.rightOffset + "px"
            })
        },
        getRightOffset: function() {
            return this.options.rightOffset
        },
        getToggleHeight: function() {
            return this.options.toggleHeight
        },
        bind: function() {
            b.doc.on("win:resizeAfter", a.proxy(this.resize, this)),
            b.doc.on("page:scrolled", a.proxy(this.pageScroll, this)),
            this.elements.root.on("click", '[data-role="main"]', a.proxy(this.clickMain, this)),
            this.elements.root.on("click", '[data-role="overlay"]', a.proxy(this.toggle, this)),
            this.elements.root.on("click", '[data-role="toggle"]', a.proxy(this.toggle, this)),
            this.elements.root.on("click", '[data-role="search"]', a.proxy(this.showSearch, this))
        },
        unbind: function() {
            b.doc.off("win:resizeAfter", a.proxy(this.resize, this)),
            b.doc.off("page:scrolled", a.proxy(this.pageScroll, this)),
            this.elements.root.off()
        },
        resize: function() {
            this.options.toggleHeight = this.elements.root.find('[data-role="toggle"]').outerHeight(),
            this.options.hasGap && (this.elements.root.css({
                right: this.options.rightOffset + "px"
            }),
            this.options.hasGap = !1),
            this.elements.root.width() % 2 == 1 && (this.elements.root.css({
                right: this.options.rightOffset - 1 + "px"
            }),
            this.options.hasGap = !0)
        },
        activate: function() {
            this.elements.root.addClass("_active"),
            this.options.scrollTop = 0,
            this.scroll(),
            this.resize(),
            this.bind()
        },
        deactivate: function() {
            this.elements.root.removeClass("_active"),
            this.unbind()
        },
        clickMain: function(a) {
            a.stopPropagation()
        },
        toggle: function(a) {
            a && a.stopPropagation(),
            this.elements.root.toggleClass("_opened"),
            this.options.isOpened = !this.options.isOpened
        },
        closeIfOpened: function() {
            return this.options.isOpened ? (this.objects.assistant = a.Deferred(),
            this.toggle(),
            setTimeout(a.proxy(this.closeComplete, this), this.options.duration),
            this.objects.assistant.promise()) : !0
        },
        closeComplete: function() {
            this.objects.assistant.resolve()
        },
        setInvert: function(a) {
            this.options.isInvert != a && (this.options.isInvert = a,
            this.elements.root.toggleClass("_invert", this.options.isInvert))
        },
        setCollapse: function(a) {
            this.options.isCollapse != a && (this.options.isCollapse = a,
            this.elements.root.toggleClass("_collapse", this.options.isCollapse))
        },
        addBackImage: function(a) {
            b.isAcceptablePerformance && (a.create && this.elements.back.append('<DIV class="image" id="' + a.alias + '"></DIV>'),
            this.objects.images[a.alias] = new b.SidebarBackImage({
                selector: "#" + a.alias,
                alias: a.alias,
                sample: a.sample,
                factor: "undefined" != typeof a.factor ? a.factor : 1,
                blurHalf: a.blurHalf
            }),
            this.objects.images[a.alias].setSrc(a.src),
            this.options.hasImages = !0)
        },
        setImageSrc: function(a) {
            this.objects.images[a.alias] && this.objects.images[a.alias].setSrc(a.src)
        },
        createGroup: function(a) {
            b.isAcceptablePerformance && (this.elements.back.append('<DIV class="group" id="' + a.alias + '"></DIV>'),
            this.objects.images[a.alias] = new b.SidebarImagesGroup({
                selector: "#" + a.alias,
                alias: a.alias,
                sample: a.sample
            }),
            this.options.hasImages = !0)
        },
        setGroupImages: function(a) {
            this.objects.images[a.alias] && this.objects.images[a.alias].setImages(a.images)
        },
        setGroupImageDim: function(a) {
            this.objects.images[a.alias] && this.objects.images[a.alias].setImageDim(a.dim)
        },
        resizeGroup: function(a) {
            this.objects.images[a.alias] && this.objects.images[a.alias].resize()
        },
        addGroupImage: function(a) {
            this.objects.images[a.alias] && this.objects.images[a.alias].addImage(a.image)
        },
        removeImages: function() {
            if (this.options.hasImages) {
                for (var a in this.objects.images)
                    this.objects.images[a].destroy(),
                    this.objects.images[a] = null;
                this.objects.images = {},
                this.options.hasImages = !1
            }
        },
        pageScroll: function(a, b) {
            this.options.scrollTop = b.scrollTop,
            this.scroll()
        },
        scroll: function() {
            this.elements.root.toggleClass("_hidelogo", this.options.scrollTop > 0),
            this.elements.back.css("transform", "translateY(" + -1 * this.options.scrollTop + "px)")
        },
        scrollTop: function() {
            this.options.scrollTop = 0,
            this.elements.root.removeClass("_hidelogo"),
            this.elements.back.css("transform", "translateY(0)")
        },
        resetNav: function(a, b) {
            this.elements.links.removeClass("_active _current");
            var c = "_active";
            b && (c += " _current"),
            this.elements.links.filter('[href="' + a + '"]').addClass(c)
        },
        showSearch: function() {
            this.closeIfOpened(),
            b.iSearch.show()
        }
    },
    c
}(jQuery, App),
App.SidebarBackImage = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {},
        this.options = {
            alias: "js-sidebar-backimage",
            selector: ".js-sidebar-backimage",
            factor: 1,
            sample: null,
            blurHalf: !0
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            this.elements.sample = a(this.options.sample),
            this.create()
        },
        create: function() {
            var b = this.options.alias + "-svgimage";
            this.elements.root.html('<svg width="100%" height="125%" xmlns="http://www.w3.org/2000/svg"><defs>\t<filter id="blur">\t<feGaussianBlur x="-2%" y="-2%" width="' + (this.options.blurHalf ? 54 : 104) + '%" height="104%" in="SourceGraphic" stdDeviation="10" />\t</filter></defs><g filter="url(#blur)"><rect x="0" y="0" width="100%" height="100%" fill="#F2F3F5" /><image id="' + b + '" width="100%" height="80%" xlink:href="" /></g></svg>'),
            this.elements.image = a("#" + b),
            this.bind()
        },
        destroy: function() {
            this.elements.sample = null,
            this.elements.image = null,
            this.unbind(),
            this.elements.root.remove()
        },
        bind: function() {
            b.doc.on("win:resizeAfter", a.proxy(this.resize, this))
        },
        unbind: function() {
            b.doc.off("win:resizeAfter", a.proxy(this.resize, this))
        },
        resize: function() {
            var a, b, c, d, e = this.elements.sample.width(), f = this.elements.sample.height(), g = this.options.factor;
            g >= e / f ? (a = Math.round(f * g),
            b = f,
            c = Math.round((e - a) / 2),
            d = 0) : (a = e,
            b = Math.round(e / g),
            c = 0,
            d = Math.round((f - b) / 2)),
            this.elements.root.css({
                width: a + "px",
                height: b + "px",
                margin: d + "px " + c + "px"
            })
        },
        setSrc: function(a) {
            this.elements.image.attr({
                "xlink:href": a
            }),
            this.resize()
        }
    },
    c
}(jQuery, App),
App.SidebarImagesGroup = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {},
        this.options = {
            alias: "js-sidebar-imagesgroup",
            selector: ".js-sidebar-imagesgroup",
            sample: null,
            imageWidth: 0,
            imageHeight: 0,
            rootHeight: 0,
            groupHTML: ""
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            this.elements.sample = a(this.options.sample),
            this.create()
        },
        create: function() {
            this.bind()
        },
        destroy: function() {
            this.elements.sample = null,
            this.options.groupHTML = null,
            this.unbind(),
            this.elements.root.remove()
        },
        bind: function() {
            b.doc.on("win:resizeAfter", a.proxy(this.resize, this))
        },
        unbind: function() {
            b.doc.off("win:resizeAfter", a.proxy(this.resize, this))
        },
        resize: function() {
            var a = this.elements.sample.height();
            a != this.options.rootHeight && (this.options.rootHeight = a,
            this.elements.root.css({
                height: a
            }))
        },
        setImages: function(a) {
            this.options.groupHTML = '<rect x="0" y="0" width="100%" height="100%" fill="#000" />';
            for (var b = 0; b < a.length; b++)
                this.options.groupHTML += '<image x="' + a[b].left + '" y="' + a[b].top + '" width="' + this.options.imageWidth + '" height="' + this.options.imageHeight + '" xlink:href="' + a[b].src + '" opacity="' + a[b].opacity + '" />';
            this.setHTML(),
            this.resize()
        },
        setImageDim: function(a) {
            this.options.imageWidth = a.width,
            this.options.imageHeight = a.height
        },
        addImage: function(a) {
            this.options.groupHTML += '<image x="' + a.left + '" y="' + a.top + '" width="' + this.options.imageWidth + '" height="' + this.options.imageHeight + '" xlink:href="' + a.src + '" opacity="' + a.opacity + '" />',
            this.setHTML(),
            this.resize()
        },
        setHTML: function() {
            this.elements.root.html('<svg width="52%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs>\t<filter id="blur">\t<feGaussianBlur in="SourceGraphic" stdDeviation="10" />\t<feComponentTransfer><feFuncA type="discrete" tableValues="1 1"/></feComponentTransfer>\t</filter></defs><g filter="url(#blur)">' + this.options.groupHTML + '\t<rect x="0" y="100%" transform="translate(0,-50)" width="100%" height="50" fill="#F2F3F5" /></g></svg>')
        }
    },
    c
}(jQuery, App),
App.Index = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {},
        this.options = {
            alias: "js-index",
            selector: ".js-index",
            fadeDuration: 1e3,
            direction: !0,
            rotations: 1
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            this.elements.cube = a(".js-cube", this.elements.root),
            this.objects.cube = new b.Cube,
            this.objects.rotator = new b.Rotator
        },
        construct: function() {
            this.objects.assistant = a.Deferred();
            var c = b.iSidebar.getRoot();
            return c.addClass("_indexpage"),
            a.when(this._initCubeConstruct()).done(a.proxy(this.initialize, this)),
            this.objects.assistant.promise()
        },
        _initCubeConstruct: function() {
            return this.objects.cube.construct()
        },
        destruct: function() {
            return this.objects.assistant = a.Deferred(),
            this.unbind(),
            this.objects.rotator.deactivate(),
            this.objects.cube.deactivate(),
            this.elements.cube = null,
            this.elements.root.removeClass("_active"),
            b.iSidebar.removeImages(),
            setTimeout(a.proxy(this.destructComplete, this), this.options.fadeDuration),
            this.objects.assistant.promise()
        },
        destructComplete: function() {
            var a = b.iSidebar.getRoot();
            a.removeClass("_indexpage"),
            this.objects.rotator = null,
            this.objects.cube = null,
            this.objects.assistant.resolve()
        },
        initialize: function() {
            b.iSidebar.addBackImage({
                alias: "js-sidebar-backimage",
                factor: 2e3 / 1200,
                sample: this.options.selector,
                src: this.objects.cube.getImageSrc(),
                create: !0
            }),
            this.objects.assistant.resolve()
        },
        activate: function() {
            a.when(this._initRotatorActivate()).done(a.proxy(this.activateComplete, this))
        },
        _initRotatorActivate: function() {
            return this.objects.rotator.activate()
        },
        activateComplete: function() {
            this.objects.cube.activate(),
            this.elements.root.addClass("_active"),
            this.bind()
        },
        bind: function() {
            this.elements.root.on("click", a.proxy(this.clickRoot, this)),
            b.doc.on("rotator:move", a.proxy(this.rotatorMove, this)),
            b.doc.on("rotator:moveByAngle", a.proxy(this.rotatorMoveByAngle, this)),
            b.isTouchDevice ? (this.elements.cube.swipe({
                swipeUp: function() {},
                swipeDown: function() {}
            }),
            this.elements.cube.on("swipeUp", a.proxy(this.swipe, this)),
            this.elements.cube.on("swipeDown", a.proxy(this.swipe, this))) : (b.doc.on("keydown", a.proxy(this.keydown, this)),
            this.elements.root.on("mousewheel DOMMouseScroll", a.proxy(this.mousewheel, this)))
        },
        unbind: function() {
            b.isTouchDevice ? this.elements.cube.off() : b.doc.off("keydown", a.proxy(this.keydown, this)),
            this.elements.root.off(),
            b.doc.off("rotator:move", a.proxy(this.rotatorMove, this)),
            b.doc.off("rotator:moveByAngle", a.proxy(this.rotatorMoveByAngle, this))
        },
        lock: function() {
            this.options.isLocked = !0
        },
        release: function() {
            this.options.isLocked = !1
        },
        clickRoot: function(a) {
            a.stopPropagation(),
            b.iSidebar.closeIfOpened(),
            this.objects.rotator.closeIfOpened()
        },
        rotatorMove: function(a, b) {
            a.stopPropagation(),
            this.options.moveRotator = !1,
            this.rotate(b.fwd, "undefined" != typeof b.cnt ? b.cnt : 1)
        },
        rotatorMoveByAngle: function(b, c) {
            b.stopPropagation(),
            c.anim ? (this.lock(),
            a.when(this._rotateCubeByAngle(c.angle)).done(a.proxy(this.rotateSceneComplete, this))) : this.objects.cube.rotateByAngle(c.angle, !1)
        },
        keydown: function(a) {
            var b = a.charCode || a.keyCode || 0;
            (38 == b || 40 == b) && (this.options.moveRotator = !0,
            this.rotate(40 == b, 1))
        },
        mousewheel: function(a) {
            this.options.moveRotator = !0,
            this.rotate(!(a.originalEvent.wheelDelta > 0 || a.originalEvent.detail < 0), 1)
        },
        swipe: function(a, b, c, d, e) {
            ("up" == b || "down" == b) && (e > 1 || (this.options.moveRotator = !0,
            this.rotate("up" == b, 1)))
        },
        rotate: function(b, c) {
            this.options.isLocked || (this.lock(),
            this.options.direction = b,
            this.options.rotations = "undefined" != typeof c ? c : 1,
            a.when(this._closeSidebar()).done(a.proxy(this.rotateScene, this)))
        },
        _closeSidebar: function() {
            return b.iSidebar.closeIfOpened()
        },
        rotateScene: function() {
            a.when(this._rotateCube()).done(a.proxy(this.rotateSceneComplete, this)),
            this.options.moveRotator && this.objects.rotator.rotate(this.options.direction),
            b.iSidebar.setImageSrc({
                alias: "js-sidebar-backimage",
                src: this.objects.cube.getImageSrc()
            })
        },
        _rotateCube: function() {
            return this.objects.cube.rotate(this.options.direction, this.options.rotations)
        },
        _rotateCubeByAngle: function(a) {
            return this.objects.cube.rotateByAngle(a, !0)
        },
        rotateSceneComplete: function() {
            setTimeout(a.proxy(this.release, this), 50)
        }
    },
    c
}(jQuery, App),
App.Articles = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {},
        this.options = {
            alias: "js-articles",
            selector: ".js-articles",
            parentTop: 0,
            headerHeight: 0,
            winHeight: 0,
            conWidth: 0,
            itemWidth: 50,
            itemsTotalCount: 0,
            colCount: 2,
            colHeights: {},
            isLoading: !1,
            isReseting: !1,
            curOffset: 0,
            curPage: 0,
            allDates: [],
            curDate: null,
            isDaySelected: !1,
            tagIdx: null,
            lastClickedItemIdx: -1
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            this.elements.header = a('[data-role="header"]', this.elements.root),
            this.elements.con = a('[data-role="con"]', this.elements.root),
            this.elements.list = a('[data-role="list"]', this.elements.root),
            this.elements.items = a('[data-role="item"]', this.elements.list),
            this.options.itemsTotalCount = this.elements.items.length;
            var b = this.elements.list.data("page");
            "undefined" != typeof b && (this.options.curPage = b);
            var c = this.elements.list.data("date");
            "undefined" != typeof c && (this.options.curDate = c);
            var d = a('[data-role="header-tag"]', this.elements.root);
            d.length && (this.options.tagIdx = d.data("idx"))
        },
        construct: function() {
            this.resize(),
            this.elements.root.addClass("_tiles")
        },
        destruct: function() {
            this.elements.header = null,
            this.elements.con = null,
            this.elements.list = null,
            this.elements.items = null
        },
        bind: function() {
            this.elements.root.on("click", '[data-role="loadmore"]', a.proxy(this.clickLoadmore, this)),
            this.elements.list.on(b.isTouchDevice ? "touchstart" : "mousedown", '[data-role="pagelink"]', a.proxy(this.touchPagelink, this)),
            b.doc.on("win:resizeAfter", a.proxy(this.resize, this)),
            setTimeout(a.proxy(this.scrollToClickedItem, this), 100)
        },
        unbind: function() {
            this.elements.root.off(),
            this.elements.list.off(),
            b.doc.off("win:resizeAfter", a.proxy(this.resize, this))
        },
        resize: function() {
            this.options.headerHeight = this.elements.header.height(),
            this.options.winHeight = b.win.height();
            var a = this.elements.con.width();
            a != this.options.conWidth && (this.options.conWidth = a,
            this.redraw(0))
        },
        setParentTop: function(a, b) {
            this.options.parentTop = a,
            "undefined" != typeof b && b && (this.options.parentTop += this.elements.root.position().top)
        },
        clickLoadmore: function() {
            this.options.isLoading || this.options.isReseting || (this.options.scrollTimeout && clearTimeout(this.options.scrollTimeout),
            this.options.curPage++,
            this.getNewItems())
        },
        reset: function() {
            this.options.xhr && 4 != this.options.xhr.readystate && this.options.xhr.abort(),
            this.options.scrollTimeout && clearTimeout(this.options.scrollTimeout),
            this.options.isReseting = !0,
            this.elements.root.addClass("_reseting"),
            this.options.curPage = 0,
            this.elements.con.css({
                height: this.options.winHeight - this.options.parentTop + "px"
            }),
            b.doc.trigger("page:scrollTo", {
                top: this.options.parentTop,
                duration: 500
            }),
            this.elements.items = null,
            this.options.itemsTotalCount = 0,
            setTimeout(a.proxy(this.getNewItems, this), 500)
        },
        getNewItems: function() {
            this.options.isLoading = !0,
            this.elements.root.addClass("_loading");
            var b = {
                act: "items",
                page: this.options.curPage,
                date: null != this.options.curDate ? this.options.curDate : ""
            };
            null != this.options.tagIdx && (b.tag = this.options.tagIdx),
            this.options.xhr && 4 != this.options.xhr.readystate && this.options.xhr.abort(),
            this.options.xhr = a.ajax({
                url: this.elements.root.data("action"),
                type: "POST",
                dataType: "json",
                cache: !1,
                data: b,
                success: a.proxy(this.getNewItemsSuccess, this),
                error: a.proxy(this.getNewItemsError, this)
            })
        },
        getNewItemsSuccess: function(b) {
            this.options.curOffset = this.options.itemsTotalCount;
            var c = a("<UL/>");
            c.append(b.items);
            var d = a('[data-role="item"]', c);
            d.addClass("_new"),
            this.options.isReseting && this.elements.list.empty(),
            this.elements.list.append(d),
            this.elements.root[0].offsetHeight,
            this.elements.items = a('[data-role="item"]', this.elements.list),
            this.options.itemsTotalCount = this.elements.items.length,
            this.options.itemsTotalCount > 0 && (this.redraw(this.options.curOffset),
            d.removeClass("_new")),
            (0 == b.remains || 0 == this.options.itemsTotalCount) && this.elements.root.addClass("_infull"),
            this.options.isReseting ? this.options.isDaySelected && (this.options.scrollTimeout = setTimeout(a.proxy(this.scrollToCurDay, this), 550)) : this.options.scrollTimeout = setTimeout(a.proxy(this.scrollToNewItem, this), 550),
            this.options.isLoading = !1,
            this.options.isReseting = !1,
            this.elements.root.removeClass("_loading _reseting"),
            this.resetHistory()
        },
        resetHistory: function() {
            var a = b.iHistory.getState();
            a.data.changes = {
                page: this.options.curPage,
                date: null != this.options.curDate ? this.options.curDate : "",
                itemidx: this.options.lastClickedItemIdx
            },
            b.iHistory.replaceState(a.data, a.title, a.url)
        },
        scrollToCurDay: function() {
            var a = parseInt(this.options.curDate.substr(-2))
              , c = this.elements.items.filter('[data-day="' + a + '"]')
              , d = this.options.parentTop;
            c.length && (c.length > 1 && (c = c.eq(0)),
            d += this.options.headerHeight + parseInt(c.position().top)),
            b.doc.trigger("page:scrollTo", {
                top: d,
                duration: 1e3
            })
        },
        scrollToNewItem: function() {
            var a = this.elements.items.eq(this.options.curOffset);
            if (a.length) {
                var c = this.options.parentTop + parseInt(a.position().top);
                b.doc.trigger("page:scrollTo", {
                    top: c,
                    duration: 1e3
                })
            }
        },
        scrollToClickedItem: function() {
            var a = this.elements.list.data("scrolltoitem");
            if ("undefined" != typeof a) {
                var c = this.elements.items.filter('[data-idx="' + a + '"]');
                if (c.length) {
                    var d = this.options.parentTop + parseInt(c.position().top);
                    null != this.options.curDate && (d += this.elements.header.outerHeight()),
                    b.doc.trigger("page:scrollTo", {
                        top: d,
                        duration: 0
                    })
                }
            }
        },
        getNewItemsError: function() {
            this.options.isLoading = !1,
            this.options.isReseting = !1,
            this.elements.root.removeClass("_loading _reseting")
        },
        redraw: function(a) {
            if (0 == a) {
                this.options.colHeights = {};
                for (var b = 0; b < this.options.colCount; b++)
                    this.options.colHeights[b] = 0
            }
            for (var c, d, e, b = a; b < this.options.itemsTotalCount; b++)
                c = this.elements.items.eq(b),
                d = this.getMinCol(),
                e = this.options.colHeights[d],
                this.options.colHeights[d] = e + c.outerHeight(),
                c.css({
                    top: e + "px",
                    left: d * this.options.itemWidth + "%"
                });
            this.elements.con.css({
                height: this.options.colHeights[this.getMaxCol()] + "px"
            })
        },
        getMinCol: function() {
            for (var a = 0, b = this.options.colHeights[0], c = 0; c < this.options.colCount; c++)
                this.options.colHeights[c] < b && (b = this.options.colHeights[c],
                a = c);
            return a
        },
        getMaxCol: function() {
            for (var a = 0, b = this.options.colHeights[0], c = 0; c < this.options.colCount; c++)
                this.options.colHeights[c] > b && (b = this.options.colHeights[c],
                a = c);
            return a
        },
        loadDates: function() {
            return this.objects.assistant = a.Deferred(),
            a.ajax({
                url: this.elements.root.data("action"),
                type: "POST",
                dataType: "json",
                data: {
                    act: "dates"
                },
                cache: !1,
                success: a.proxy(this.loadDatesSuccess, this)
            }),
            this.objects.assistant.promise()
        },
        loadDatesSuccess: function(a) {
            this.options.allDates = a.dates,
            this.objects.assistant.resolve()
        },
        getAllDates: function() {
            return this.options.allDates
        },
        setDateOptions: function(a) {
            var b = null != this.options.curDate ? this.options.curDate.substr(0, 7) : ""
              , c = a.formattedDate.substr(0, 7);
            this.options.curDate = a.formattedDate,
            this.options.isDaySelected = a.isDaySelected,
            b != c ? (this.showHeader(a.titleDate),
            this.reset()) : this.options.isDaySelected && this.scrollToCurDay()
        },
        showHeader: function(b) {
            a('[data-role="header-date"]', this.elements.header).html(b),
            this.elements.header.addClass("_active"),
            this.options.headerHeight = this.elements.header.height()
        },
        touchPagelink: function(b) {
            var c = a(b.target).closest('[data-role="pagelink"]');
            if (c.length) {
                var d = c.parents('[data-role="item"]').data("idx");
                "undefined" != typeof d && (this.options.lastClickedItemIdx = d,
                this.resetHistory())
            }
        }
    },
    c
}(jQuery, App),
App.Buildings = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {},
        this.options = {
            alias: "js-buildings",
            selector: ".js-buildings"
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            this.elements.scene = a('[data-role="scene"]', this.elements.root),
            this.elements.image = a('[data-role="image"]', this.elements.root)
        },
        construct: function() {
            a.preload(this.elements.image.data("src")).done(a.proxy(this.showImage, this)),
            this.objects.scene = this.elements.scene.parallax({
                calibrateX: !0
            }),
            this.resize()
        },
        destruct: function() {
            this.objects.scene.parallax("disable"),
            this.objects.scene = null,
            this.elements.scene = null,
            this.elements.image = null
        },
        bind: function() {
            b.doc.on("win:resizeAfter", a.proxy(this.resize, this))
        },
        unbind: function() {
            b.doc.off("win:resizeAfter", a.proxy(this.resize, this))
        },
        showImage: function() {
            this.elements.image.css({
                backgroundImage: "url(" + this.elements.image.data("src") + ")"
            }).addClass("_active")
        },
        resize: function() {
            var a = this.elements.root.width()
              , b = this.elements.scene.width()
              , c = 0;
            b > a && (c = Math.round(.025 * (b - a))),
            this.objects.scene.parallax("scalar", c, 0)
        }
    },
    c
}(jQuery, App),
App.Calendar = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {},
        this.options = {
            alias: "js-calendar",
            selector: ".js-calendar",
            minDate: new Date,
            maxDate: new Date,
            curDate: new Date,
            savedDate: new Date,
            availableDates: [],
            locale: {
                en: {
                    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                },
                ru: {
                    days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
                    daysShort: ["Вос", "Пон", "Вто", "Сре", "Чет", "Пят", "Суб", "Вос"],
                    daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
                    months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                    monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
                }
            },
            lang: "en",
            isClicked: !1
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            this.elements.main = a('[data-role="main"]', this.elements.root),
            this.elements.button = a('[data-role="button"]', this.elements.root),
            this.elements.nav = a('[data-role="nav"]', this.elements.root),
            this.elements.navItems = a('[data-role="item"]', this.elements.nav)
        },
        construct: function() {
            this.setNavValues(),
            this.options.lang = document.documentElement.getAttribute("lang"),
            "undefined" == typeof this.options.locale[this.options.lang] && (this.options.lang = "en"),
            this.elements.main.pickmeup({
                class_name: "b-pickmeup",
                flat: !0,
                select_month: !1,
                select_year: !1,
                locale: this.options.locale[this.options.lang],
                render: a.proxy(this.renderDate, this),
                change: a.proxy(this.changeDate, this)
            })
        },
        renderDate: function(b) {
            var c = !0
              , d = new Date(b);
            return b >= this.options.minDate.getTime() && b <= this.options.maxDate.getTime() && d.getMonth() == this.options.curDate.getMonth() && -1 != a.inArray(this.parseDate(d, !1), this.options.availableDates) && (c = !1),
            {
                disabled: c
            }
        },
        changeDate: function() {
            this.options.isClicked = !0
        },
        destruct: function() {
            this.elements.main.pickmeup("destroy"),
            this.elements.main = null,
            this.elements.nav = null,
            this.options = null
        },
        bind: function() {
            this.elements.nav.on("click", '[data-role="arrow"]', a.proxy(this.clickArrow, this)),
            this.elements.button.on("click", a.proxy(this.clickButton, this))
        },
        unbind: function() {
            this.elements.nav.off(),
            this.elements.button.off()
        },
        setAvailableDates: function(a) {
            this.options.availableDates = a;
            var b = a[0].split("-", 3);
            this.options.minDate = new Date(parseInt(b[0]),parseInt(b[1]) - 1,parseInt(b[2]));
            var b = a[a.length - 1].split("-", 3);
            this.options.maxDate = new Date(parseInt(b[0]),parseInt(b[1]) - 1,parseInt(b[2]))
        },
        getDate: function() {
            return new Date(this.options.curDate.getTime())
        },
        getMinDate: function() {
            return new Date(this.options.minDate.getTime())
        },
        getMaxDate: function() {
            return new Date(this.options.maxDate.getTime())
        },
        getFormattedDate: function() {
            return this.parseDate(this.options.curDate, !1)
        },
        getTitleDate: function() {
            var a = this.options.curDate.getMonth()
              , b = this.options.curDate.getFullYear();
            return this.options.locale[this.options.lang].months[a] + " " + b
        },
        getIsClicked: function() {
            return this.options.isClicked
        },
        setDate: function(a, b) {
            this.setCurDate(a, !0),
            b && (this.options.isClicked = !1)
        },
        setCurDate: function(b, c) {
            this.options.curDate = new Date(b.getTime()),
            c && (this.options.savedDate = new Date(b.getTime())),
            this.elements.main.pickmeup("set_date", this.parseDate(this.options.curDate, !0)),
            a(".pmu-selected", this.elements.main).removeClass("pmu-selected"),
            this.setNavValues()
        },
        parseDate: function(a, b) {
            var c = new Date(a.getTime())
              , d = c.getFullYear()
              , e = c.getMonth() + 1
              , f = c.getDate();
            return b ? (10 > f ? "0" + f : f) + "-" + (10 > e ? "0" + e : e) + "-" + d : d + "-" + (10 > e ? "0" + e : e) + "-" + (10 > f ? "0" + f : f)
        },
        setNavValues: function() {
            var a = this.elements.navItems.filter('[data-type="month"]')
              , b = this.elements.navItems.filter('[data-type="year"]')
              , c = this.options.curDate.getMonth()
              , d = this.options.curDate.getFullYear();
            a.find('[data-role="value"]').html(this.options.locale[this.options.lang].months[c]),
            b.find('[data-role="value"]').html(d)
        },
        clickArrow: function(b) {
            var c = a(b.target).closest('[data-role="arrow"]')
              , d = c.hasClass("_prev") ? -1 : 1
              , e = c.parents('[data-role="item"]')
              , f = e.data("type")
              , g = this.options.curDate.getMonth()
              , h = this.options.curDate.getFullYear();
            "month" == f && (g += d,
            0 > g && (g = 11,
            h--),
            g > 11 && (g = 0,
            h++)),
            "year" == f && (h += d);
            var i = new Date(this.options.curDate.getTime());
            i.setMonth(g + 1, 0),
            i.setYear(h),
            i.getTime() < this.options.minDate.getTime() || i.getTime() > this.options.maxDate.getTime() || this.setCurDate(i, !1)
        },
        clickButton: function() {
            this.options.curDate = this.elements.main.pickmeup("get_date", !1),
            b.doc.trigger("calendar:dateSelected")
        }
    },
    c
}(jQuery, App),
App.DigestGallery = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {},
        this.options = {
            alias: "js-digestgallery",
            selector: ".js-digestgallery",
            curPage: -1,
            pagesCount: 0,
            itemCurIndex: -1,
            itemsTotalCount: 0,
            itemsLoadedCount: 0,
            baseHeight: 64,
            zoomWidth: 76,
            zoomPadding: 4.7,
            zoomFactor: 1.4,
            isZoomed: !1,
            isTransforming: !1
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            this.elements.items = a('[data-role="item"]', this.elements.root),
            this.options.itemsTotalCount = this.elements.items.length,
            this.options.pagesCount = Math.ceil(this.options.itemsTotalCount / 2),
            this.elements.arrows = a('[data-role="arrow"]', this.elements.root),
            this.elements.zoom = a('[data-role="zoom"]', this.elements.root)
        },
        construct: function() {
            this.gotoPage(0)
        },
        destruct: function() {
            this.elements.items = null,
            this.elements.arrows = null,
            this.elements.zoom = null
        },
        bind: function() {
            this.options.pagesCount <= 1 || (this.elements.items.on("click", a.proxy(this.clickItem, this)),
            this.elements.arrows.on("click", a.proxy(this.clickArrow, this)),
            this.elements.zoom.on("click", a.proxy(this.clickZoom, this)),
            b.isTouchDevice && (this.elements.items.swipe({
                swipeLeft: function() {},
                swipeRight: function() {}
            }),
            this.elements.items.on("swipeLeft", a.proxy(this.swipe, this)),
            this.elements.items.on("swipeRight", a.proxy(this.swipe, this))))
        },
        unbind: function() {
            this.options.pagesCount <= 1 || (this.elements.items.off(),
            this.elements.arrows.off())
        },
        reset: function() {
            this.options.isZoomed && (this.options.transformTimeout && clearTimeout(this.options.transformTimeout),
            this.toggleZoom()),
            this.elements.root.addClass("_reset"),
            this.gotoPage(0);
            var a = this;
            setTimeout(function() {
                a.elements.root.removeClass("_reset")
            }, 50)
        },
        gotoPage: function(a) {
            -1 != this.options.curPage && (this.elements.items.eq(2 * this.options.curPage).removeClass("_active _left"),
            this.elements.items.eq(2 * this.options.curPage + 1).removeClass("_active _right")),
            this.options.curPage = a,
            this.options.itemCurIndex = 2 * this.options.curPage,
            this.elements.items.eq(2 * this.options.curPage).addClass("_active _left"),
            this.elements.items.eq(2 * this.options.curPage + 1).addClass("_active _right"),
            this.loadImage(2 * this.options.curPage),
            this.loadImage(2 * this.options.curPage + 1),
            this.checkArrows()
        },
        gotoItem: function(a) {
            -1 != this.options.itemCurIndex && this.elements.items.eq(this.options.itemCurIndex).removeClass("_active"),
            this.options.itemCurIndex = a,
            this.options.curPage = Math.floor(this.options.itemCurIndex / 2),
            this.elements.items.eq(this.options.itemCurIndex).addClass("_active"),
            this.loadImage(this.options.itemCurIndex),
            this.checkArrows()
        },
        loadImage: function(b) {
            if (this.options.itemsTotalCount != this.options.itemsLoadedCount) {
                var c = this.elements.items.eq(b);
                c.hasClass("_loading") || c.hasClass("_loaded") || (c.addClass("_loading"),
                a.preload({
                    id: b,
                    src: c.data("src")
                }).done(a.proxy(this.loadItemImageComplete, this)))
            }
        },
        loadItemImageComplete: function(a) {
            var b = this.elements.items.eq(a.id);
            0 != b.length && (b.hasClass("_loaded") || (b.css({
                backgroundImage: "url(" + a.src + ")"
            }),
            b[0].offsetHeight,
            b.removeClass("_loading").addClass("_loaded"),
            0 == this.options.itemsLoadedCount && (this.options.zoomFactor = a.height / a.width),
            this.options.itemsLoadedCount++))
        },
        applyDir: function(a) {
            if (this.options.isZoomed) {
                var b = this.options.itemCurIndex;
                b += a,
                0 > b && (b = 0),
                b > this.options.itemsTotalCount - 1 && (b = this.options.itemsTotalCount - 1),
                b != this.options.itemCurIndex && this.gotoItem(b)
            } else {
                var c = this.options.curPage;
                c += a,
                0 > c && (c = 0),
                c > this.options.pagesCount - 1 && (c = this.options.pagesCount - 1),
                c != this.options.curPage && this.gotoPage(c)
            }
        },
        clickItem: function(b) {
            b.stopPropagation();
            var c = a(b.target).closest('[data-role="item"]');
            this.applyDir(this.options.isZoomed ? 1 : c.hasClass("_left") ? -1 : 1)
        },
        clickArrow: function(b) {
            b.stopPropagation();
            var c = a(b.target).closest('[data-role="arrow"]');
            this.applyDir(c.hasClass("_prev") ? -1 : 1)
        },
        checkArrows: function() {
            this.elements.arrows.removeClass("_active"),
            this.options.isZoomed ? (this.options.itemCurIndex > 0 && this.elements.arrows.filter("._prev").addClass("_active"),
            this.options.itemCurIndex < this.options.itemsTotalCount - 1 && this.elements.arrows.filter("._next").addClass("_active")) : (this.options.curPage > 0 && this.elements.arrows.filter("._prev").addClass("_active"),
            this.options.curPage < this.options.pagesCount - 1 && this.elements.arrows.filter("._next").addClass("_active"))
        },
        swipe: function(a, b, c, d, e) {
            ("left" == b || "right" == b) && (e > 1 || this.applyDir("right" == b ? -1 : 1))
        },
        clickZoom: function() {
            this.options.isTransforming || (this.options.isTransforming = !0,
            this.elements.root.addClass("_transform"),
            this.toggleZoom(),
            this.checkArrows(),
            this.options.transformTimeout && clearTimeout(this.options.transformTimeout),
            this.options.transformTimeout = setTimeout(a.proxy(this.transformComplete, this), 1e3))
        },
        toggleZoom: function() {
            this.options.isZoomed = !this.options.isZoomed,
            this.options.isZoomed ? (this.elements.items.eq(2 * this.options.curPage).removeClass("_left"),
            this.elements.items.eq(2 * this.options.curPage + 1).removeClass("_active _right"),
            this.elements.root.css({
                height: Math.round(this.options.zoomFactor * this.options.zoomWidth * 100) / 100 + 2 * this.options.zoomPadding + "rem"
            })) : (this.elements.items.eq(2 * this.options.curPage).addClass("_active _left"),
            this.elements.items.eq(2 * this.options.curPage + 1).addClass("_active _right"),
            this.loadImage(this.options.itemCurIndex % 2 == 1 ? 2 * this.options.curPage : 2 * this.options.curPage + 1),
            this.elements.root.css({
                height: this.options.baseHeight + "rem"
            })),
            this.elements.root.toggleClass("_zoomed", this.options.isZoomed)
        },
        transformComplete: function() {
            this.elements.root.removeClass("_transform"),
            this.options.isTransforming = !1
        }
    },
    c
}(jQuery, App),
App.EmbedVideo = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.options = {
            alias: "js-embedvideo",
            selector: ".js-embedvideo",
            type: "youtube",
            autoplay: !0,
            bgColor: "6988BE",
            inPopup: !1
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            var b = this.elements.root.data("src")
              , c = this.elements.root.data("type")
              , d = this.elements.root.data("autoplay")
              , e = this.elements.root.data("inpopup");
            "undefined" != typeof c && (this.options.type = c),
            "undefined" != typeof b && (this.options.src = b),
            "undefined" != typeof d && (this.options.autoplay = d);
            var f = '<div class="player"></div><div class="content">'
              , g = a('[data-role="video-title"]', this.elements.root);
            g.length && (this.elements.root.addClass("_titled"),
            f += '<div class="title">' + g.html() + "</div>");
            var h = this.elements.root.data("btnttl");
            f += '<div class="button"><svg class="svg" xmlns="http://www.w3.org/2000/svg" width="70" height="70"><path class="path" fill="transparent" stroke="currentColor" stroke-width="3" d="M 3 34.99999999999999 A 32 32 0 1 1 3.000048738774794 35.05585050770876"></path></svg>' + ("undefined" != typeof h ? "<span>" + h + "</span>" : "") + "</div>",
            f += "</div>",
            this.elements.root.addClass("b-embedvideo").html(f),
            this.elements.player = a(".player", this.elements.root),
            this.options.isEmbed = !1,
            this.options.inPopup = e && "undefined" != typeof e,
            this.options.inPopup && (this.options.popupName = e)
        },
        bind: function() {
            this.options.inPopup && b.doc.on("popup:onhideAfter", a.proxy(this.popupOnHide, this))
        },
        unbind: function() {
            this.options.inPopup && b.doc.off("popup:onhideAfter", a.proxy(this.popupOnHide, this))
        },
        embed: function(a) {
            if (console.log(this.options.isEmbed),
            !this.options.isEmbed) {
                this.options.isEmbed = !0;
                var c = this.options.src
                  , d = this.options.type
                  , e = this.options.autoplay;
                "undefined" != typeof a && ("undefined" != typeof a.type && (d = a.type),
                "undefined" != typeof a.src && (c = a.src),
                "undefined" != typeof a.autoplay && (e = a.autoplay));
                var f = this.getHTML({
                    type: d,
                    src: c,
                    autoplay: e
                });
                this.options.inPopup ? b.doc.trigger("popup:show", {
                    name: this.options.popupName,
                    embed: f
                }) : (this.elements.player.html(f),
                this.elements.root.addClass("_embed"))
            }
        },
        remove: function() {
            this.options.isEmbed && (this.options.isEmbed = !1,
            this.options.inPopup ? b.doc.trigger("popup:hide", {
                name: this.options.popupName
            }) : (this.elements.player.empty(),
            this.elements.root.removeClass("_embed")))
        },
        getHTML: function(a) {
            var b = "";
            return "vimeo" == a.type && (b = '<iframe src="http://player.vimeo.com/video/' + a.src + "?title=0&amp;byline=0&amp;portrait=0&amp;color=" + this.options.bgColor + (a.autoplay ? "&amp;autoplay=1" : "") + '" width="100%" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'),
            "youtube" == a.type && (b = '<iframe src="//www.youtube.com/embed/' + a.src + "?rel=0" + (a.autoplay ? "&amp;autoplay=1" : "") + '" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>'),
            b
        },
        destruct: function() {
            this.remove(),
            this.elements.player = null
        },
        popupOnHide: function(a, b) {
            b.name == this.options.popupName && (this.options.isEmbed = !1)
        }
    },
    c
}(jQuery, App),
App.Form = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {},
        this.options = {
            alias: "js-form",
            selector: ".js-form",
            resetAfterSubmit: !0,
            isValid: !1,
            spentTimeStartStarted: !1,
            hasFiles: !1
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            this.elements.form = this.elements.root.find("FORM"),
            this.elements.items = a('[data-role="item"]', this.elements.root),
            this.elements.button = a('[data-role="button"]', this.elements.root),
            this.elements.error = a('[data-role="error"]', this.elements.root),
            this.options.defaultErrorMessage = this.elements.error.html(),
            this.elements.error.empty(),
            this.objects.selects = {};
            for (var c = 0; c < this.elements.items.length; c++) {
                var d = this.elements.items.eq(c).find('[data-role="field"]');
                switch (d.data("type")) {
                case "select":
                    this.objects.selects[c] = new Select({
                        el: d[0]
                    })
                }
            }
            var e = a('[data-role="file"]', this.elements.root);
            if (e.length) {
                this.options.hasFiles = !0,
                this.objects.files = {};
                for (var c = 0; c < e.length; c++) {
                    var f = e.eq(c)
                      , g = this.options.alias + "-file" + c;
                    f.attr({
                        id: g
                    }),
                    this.objects.files[g] = new b.FormFile({
                        selector: "#" + g,
                        alias: g
                    })
                }
            }
        },
        construct: function() {
            this.checkAll(!1)
        },
        destruct: function() {
            if (this.options.hasFiles) {
                for (var a in this.objects.files)
                    this.objects.files[a].destruct(),
                    this.objects.files[a] = null;
                this.objects.files = null
            }
            for (var a in this.objects.selects)
                this.objects.selects[a].close();
            this.elements.form = null,
            this.elements.items = null,
            this.elements.button = null,
            this.elements.error = null
        },
        bind: function() {
            if (this.elements.items.on("focus", '[data-role="field"]', a.proxy(this.focusField, this)),
            this.elements.items.on("keyup", '[data-role="field"]', a.proxy(this.keyupField, this)),
            this.elements.items.on("change", '[data-role="field"]', a.proxy(this.changeField, this)),
            this.elements.items.on("blur", '[data-role="field"]', a.proxy(this.blurField, this)),
            this.elements.form.on("keypress", a.proxy(this.keypressForm, this)),
            this.elements.button.on("click", a.proxy(this.submit, this)),
            this.options.hasFiles)
                for (var c in this.objects.files)
                    this.objects.files[c].bind();
            b.doc.on("page:clicked", a.proxy(this.onPageClicked, this))
        },
        unbind: function() {
            if (this.elements.items.off(),
            this.elements.button.off(),
            this.options.hasFiles)
                for (var c in this.objects.files)
                    this.objects.files[c].unbind();
            b.doc.off("page:clicked", a.proxy(this.onPageClicked, this))
        },
        onPageClicked: function() {
            for (var a in this.objects.selects)
                ;
        },
        keypressForm: function(b) {
            var c = b.charCode || b.keyCode || 0;
            return 13 == c ? "TEXTAREA" == a(b.target).prop("tagName") ? !0 : (b.preventDefault(),
            b.stopPropagation(),
            this.submit(),
            !1) : void 0
        },
        focusField: function(b) {
            var c = a(b.target).closest('[data-role="field"]')
              , d = c.parents('[data-role="item"]');
            d.removeClass("_error"),
            this.options.spentTimeStartStarted || (this.spentTimeStart(),
            this.options.spentTimeStartStarted = !0)
        },
        keyupField: function(b) {
            this.options.typeTimeout && clearTimeout(this.options.typeTimeout);
            var c = b.charCode || b.keyCode || 0;
            if (!(9 == c || c >= 16 && 20 >= c || c >= 35 && 40 >= c)) {
                var d = a(b.target).closest('[data-role="field"]')
                  , e = d.parents('[data-role="item"]');
                "undefined" != typeof e.data("required") && this.checkItem(e),
                this.options.typeTimeout = setTimeout(a.proxy(this.typeField, this), 300)
            }
        },
        changeField: function(b) {
            var c = a(b.target).closest('[data-role="field"]')
              , d = c.parents('[data-role="item"]');
            "undefined" != typeof d.data("required") && ("select" == c.data("type") ? d.toggleClass("_error", !this.checkItem(d)) : this.checkItem(d)),
            this.options.typeTimeout && clearTimeout(this.options.typeTimeout),
            this.options.typeTimeout = setTimeout(a.proxy(this.typeField, this), 300)
        },
        blurField: function(b) {
            var c = a(b.target).closest('[data-role="field"]')
              , d = c.parents('[data-role="item"]');
            ("undefined" != typeof d.data("required") || c.val().length > 0) && d.toggleClass("_error", !this.checkItem(d)),
            this.options.typeTimeout && clearTimeout(this.options.typeTimeout),
            this.typeField()
        },
        typeField: function() {
            this.checkAll(!1),
            this.elements.error.removeClass("_active")
        },
        checkItem: function(a) {
            a.removeClass("_error _valid");
            var b = a.find('[data-role="field"]');
            if (!b.length)
                return !1;
            var c = this.checkField(b);
            return a.toggleClass("_valid", c.completed),
            c.completed ? !0 : void 0
        },
        checkField: function(a) {
            var b = a.data("type")
              , c = a.val()
              , d = {
                completed: !0,
                empty: !1
            };
            if (!c.length)
                return d.completed = !1,
                d.empty = !0,
                d;
            switch (b) {
            case "email":
                d.regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(c),
                d.completed = d.regexp
            }
            return d
        },
        checkAll: function(b) {
            var c, d = !0;
            this.elements.items.each(function() {
                c = !0,
                "undefined" == typeof a(this).data("required") || a(this).hasClass("_valid") ? a(this).hasClass("_error") && (c = !1) : c = !1,
                c || (d = !1),
                b && a(this).toggleClass("_error", !c)
            }),
            this.elements.button.toggleClass("_disabled", !d),
            this.options.isValid = d
        },
        serializeFields: function() {
            return this.elements.form.serialize()
        },
        isValid: function(a) {
            return this.checkAll(a),
            this.options.isValid
        },
        submit: function() {
            if (!this.elements.button.hasClass("_disabled") && !this.elements.button.hasClass("_sending") && (this.checkAll(!0),
            !this.elements.button.hasClass("_disabled") && this.isValid(!0))) {
                if (this.elements.button.hasClass("_noajax"))
                    return void this.elements.form.submit();
                this.elements.button.addClass("_sending"),
                this.options.xhr && 4 != this.options.xhr.readystate && this.options.xhr.abort(),
                this.options.xhr = a.ajax(this.options.hasFiles ? {
                    url: this.elements.form.attr("action"),
                    type: "POST",
                    dataType: "json",
                    contentType: !1,
                    cache: !1,
                    processData: !1,
                    data: new FormData(this.elements.form.get(0)),
                    success: a.proxy(this.submitSuccess, this),
                    error: a.proxy(this.submitError, this)
                } : {
                    url: this.elements.form.attr("action"),
                    type: "POST",
                    dataType: "json",
                    cache: !1,
                    data: this.serializeFields(),
                    success: a.proxy(this.submitSuccess, this),
                    error: a.proxy(this.submitError, this)
                })
            }
        },
        submitSuccess: function(a) {
            this.submitResult(a)
        },
        submitError: function() {
            this.submitResult({
                error: 1
            })
        },
        submitResult: function(a) {
            if (this.elements.button.removeClass("_sending"),
            a.error) {
                var c = this.options.defaultErrorMessage;
                "undefined" != typeof a.message && "" != a.message && (c = a.message),
                this.elements.error.html(c).addClass("_active"),
                b.doc.trigger("form:error", {
                    alias: this.options.alias
                })
            } else
                this.options.resetAfterSubmit && this.reset(),
                this.elements.root.addClass("_completed"),
                this.spentTimeStop(),
                this.options.spentTimeStartStarted = !1
        },
        activate: function() {
            this.elements.root.removeClass("_completed")
        },
        reset: function() {
            if (this.elements.items.each(function() {
                a(this).removeClass("_valid");
                var b = a(this).find('[data-role="field"]');
                b.val("")
            }),
            this.elements.button.addClass("_disabled"),
            this.elements.error.removeClass("_active"),
            this.options.hasFiles)
                for (var b in this.objects.files)
                    this.objects.files[b].clear()
        },
        focusFirstField: function() {
            var a = this.elements.items.eq(0)
              , b = a.find('[data-role="field"]');
            b.length && b.focus()
        },
        spentTimeInit: function() {
            this.elements.spentTimeField = a('<INPUT type="hidden" name="spent_time">'),
            this.elements.form.append(this.elements.spentTimeField),
            this.options.spentTimeInterval = !1,
            this.options.spentTimeValue = 0
        },
        spentTimeStart: function() {
            "undefined" == typeof this.elements.spentTimeField && this.spentTimeInit(),
            this.options.spentTimeInterval = setInterval(a.proxy(this.spentTimeInc, this), 1e3)
        },
        spentTimeInc: function() {
            this.options.spentTimeValue++,
            this.elements.spentTimeField.val(this.options.spentTimeValue)
        },
        spentTimeStop: function() {
            "undefined" != typeof this.elements.spentTimeField && (this.options.spentTimeInterval && clearInterval(this.options.spentTimeInterval),
            this.options.spentTimeValue = 0,
            this.elements.spentTimeField.val(""))
        }
    },
    c
}(jQuery, App),
App.FormFile = function(a) {
    var b = function(b) {
        return this.elements = {},
        this.options = {
            alias: "js-formfile",
            selector: ".js-formfile"
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return b.prototype = {
        constructor: b,
        render: function() {
            this.elements.field = a('[data-role="file-field"]', this.elements.root),
            this.elements.name = a('[data-role="file-name"]', this.elements.root);
            var b = this.elements.field.attr("id");
            "undefined" == typeof b && (b = this.options.alias + "-field",
            this.elements.field.attr({
                id: b
            })),
            a('[data-role="file-label"]', this.elements.root).attr({
                "for": b
            })
        },
        bind: function() {
            this.elements.field.on("change", a.proxy(this.change, this))
        },
        unbind: function() {
            this.elements.field.off()
        },
        destruct: function() {
            this.elements.field = null,
            this.elements.name = null
        },
        change: function() {
            this.elements.field.val().length ? this.select(this.elements.field.val()) : this.clear()
        },
        select: function(a) {
            this.elements.root.addClass("_selected"),
            this.elements.name.html(this.getFileName(a))
        },
        clear: function() {
            this.elements.root.removeClass("_selected"),
            this.elements.name.html(""),
            this.elements.field.val("")
        },
        getFileName: function(a) {
            var b;
            return b = a.lastIndexOf("\\") ? a.lastIndexOf("\\") + 1 : a.lastIndexOf("/") + 1,
            a.slice(b)
        }
    },
    b
}(jQuery, App),
App.Gallery = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {},
        this.options = {
            alias: "js-gallery",
            selector: ".js-gallery",
            itemCurIndex: 0,
            itemsTotalCount: 0,
            itemsLoadedCount: 0,
            hasNav: !1,
            hasArrows: !1,
            hasTitle: !1,
            hasText: !1,
            hasVideo: !1
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            this.elements.main = a('[data-role="main"]', this.elements.root),
            this.elements.mainItems = a('[data-role="item"]', this.elements.main),
            this.options.itemsTotalCount = this.elements.mainItems.length
        },
        construct: function() {
            if (this.options.hasVideo = this.elements.main.find('[data-role="item-video"]').length > 0,
            this.options.hasVideo && (this.objects.embedvideo = {}),
            this.options.itemsTotalCount <= 1)
                return this.elements.mainItems.eq(0).addClass("_active"),
                void this.enterItem();
            if (this.elements.nav = a('[data-role="nav"]', this.elements.root),
            this.options.hasNav = this.elements.nav.length,
            this.options.hasNav) {
                for (var b = "", c = 0; c < this.options.itemsTotalCount; c++)
                    b += '<LI data-role="nav-item"></LI>';
                this.elements.nav.append(b),
                this.elements.navItems = a('[data-role="nav-item"]', this.elements.nav)
            }
            this.elements.arrows = a('[data-role="arrow"]', this.elements.root),
            this.options.hasArrows = this.elements.arrows.length,
            this.elements.title = a('[data-role="title"]', this.elements.root),
            this.options.hasTitle = this.elements.title.length,
            this.elements.text = a('[data-role="text"]', this.elements.root),
            this.options.hasText = this.elements.text.length,
            this.resize(),
            this.options.itemCurIndex = -1,
            this.gotoItem(0)
        },
        destruct: function() {
            if (this.options.hasVideo) {
                for (var a in this.objects.embedvideo)
                    this.objects.embedvideo[a].destruct(),
                    this.objects.embedvideo[a] = null;
                this.objects.embedvideo = null
            }
            this.elements.mainItems = null,
            this.elements.main = null,
            this.options.itemsTotalCount <= 1 || (this.options.hasNav && (this.elements.navItems = null),
            this.elements.nav = null,
            this.elements.arrows = null,
            this.elements.title = null,
            this.elements.text = null)
        },
        bind: function() {
            this.elements.mainItems.on("click", '[data-role="item-video"]', a.proxy(this.embedVideo, this)),
            this.options.itemsTotalCount > 1 && (this.options.hasNav && this.elements.navItems.on("click", a.proxy(this.clickNavItem, this)),
            this.options.hasArrows && this.elements.arrows.on("click", a.proxy(this.clickArrow, this)),
            this.elements.mainItems.on("click", '[data-role="item-image"]', a.proxy(this.clickMainItem, this)),
            b.isTouchDevice && (this.elements.mainItems.swipe({
                swipeLeft: function() {},
                swipeRight: function() {}
            }),
            this.elements.mainItems.on("swipeLeft", a.proxy(this.swipe, this)),
            this.elements.mainItems.on("swipeRight", a.proxy(this.swipe, this)))),
            b.doc.on("win:resizeAfter", a.proxy(this.resize, this))
        },
        unbind: function() {
            if (this.elements.mainItems.off(),
            this.options.itemsTotalCount > 1 && (this.options.hasNav && this.elements.navItems.off(),
            this.options.hasArrows && this.elements.arrows.off()),
            this.options.hasVideo)
                for (var c in this.objects.embedvideo)
                    this.objects.embedvideo[c].unbind();
            b.doc.off("win:resizeAfter", a.proxy(this.resize, this))
        },
        reset: function() {
            if (0 != this.options.itemCurIndex) {
                this.elements.root.addClass("_reset"),
                this.gotoItem(0);
                var a = this;
                setTimeout(function() {
                    a.elements.root.removeClass("_reset")
                }, 50)
            }
        },
        resize: function() {
            this.options.rootWidth = this.elements.root.width(),
            this.options.rootOffsetLeft = this.elements.root.offset().left
        },
        gotoItem: function(a) {
            -1 != this.options.itemCurIndex && (this.options.hasNav && this.elements.navItems.eq(this.options.itemCurIndex).removeClass("_active"),
            this.elements.mainItems.eq(this.options.itemCurIndex).removeClass("_active"),
            this.leaveItem()),
            this.options.itemCurIndex = a,
            this.options.hasNav && this.elements.navItems.eq(this.options.itemCurIndex).addClass("_active"),
            this.elements.mainItems.eq(this.options.itemCurIndex).addClass("_active"),
            this.enterItem(),
            this.options.hasArrows && this.checkArrows()
        },
        enterItem: function() {
            if (this.loadImage(),
            this.options.hasVideo && this.renderVideo(!1),
            this.options.hasTitle) {
                var a = this.elements.mainItems.eq(this.options.itemCurIndex)
                  , b = a.data("title");
                "undefined" == typeof b && (b = ""),
                this.elements.title.html("<span>" + b + "</span>")
            }
            if (this.options.hasText) {
                var a = this.elements.mainItems.eq(this.options.itemCurIndex)
                  , c = ""
                  , d = a.find('[data-role="item-text"]');
                d.length && (c = d.html()),
                this.elements.text.html(c)
            }
        },
        leaveItem: function() {
            this.options.hasVideo && this.removeVideo()
        },
        loadImage: function() {
            if (this.options.itemsTotalCount != this.options.itemsLoadedCount) {
                var b = this.options.itemCurIndex
                  , c = this.elements.mainItems.eq(b)
                  , d = c.find('[data-role="item-image"]');
                d.hasClass("_loading") || d.hasClass("_loaded") || (d.addClass("_loading"),
                a.preload({
                    id: b,
                    src: d.data("src")
                }).done(a.proxy(this.loadItemImageComplete, this)))
            }
        },
        loadItemImageComplete: function(a) {
            var b = this.elements.mainItems.eq(a.id);
            if (0 != b.length) {
                var c = b.find('[data-role="item-image"]');
                c.hasClass("_loaded") || (c.css({
                    backgroundImage: "url(" + a.src + ")"
                }),
                c[0].offsetHeight,
                c.removeClass("_loading").addClass("_loaded"),
                this.options.itemsLoadedCount++)
            }
        },
        embedVideo: function() {
            null != this.objects.embedvideo[this.options.itemCurIndex] && this.objects.embedvideo[this.options.itemCurIndex].embed()
        },
        removeVideo: function() {
            null != this.objects.embedvideo[this.options.itemCurIndex] && this.objects.embedvideo[this.options.itemCurIndex].remove()
        },
        renderVideo: function(a) {
            var c = this.options.itemCurIndex
              , d = this.elements.mainItems.eq(c)
              , e = d.find('[data-role="item-video"]');
            if (e.length && !e.hasClass("_rendered")) {
                e.addClass("_rendered");
                var f = this.options.alias + "-video" + c;
                e.attr({
                    id: f
                }),
                this.objects.embedvideo[c] = new b.EmbedVideo({
                    selector: "#" + f,
                    alias: f
                }),
                this.objects.embedvideo[c].bind(),
                a && this.objects.embedvideo[c].embed()
            }
        },
        clickMainItem: function(a) {
            var b = this.options.itemCurIndex;
            b += a.pageX - this.options.rootOffsetLeft < this.options.rootWidth / 2 ? -1 : 1,
            0 > b && (b = this.options.itemsTotalCount - 1),
            b > this.options.itemsTotalCount - 1 && (b = 0),
            this.gotoItem(b),
            a.stopPropagation()
        },
        clickNavItem: function(b) {
            var c = a(b.target).closest('[data-role="nav-item"]');
            if (!c.hasClass("_active")) {
                var d = c.index();
                this.gotoItem(d)
            }
        },
        clickArrow: function(b) {
            var c = a(b.target).closest('[data-role="arrow"]')
              , d = this.options.itemCurIndex;
            d += c.hasClass("_prev") ? -1 : 1,
            0 > d && (d = this.options.itemsTotalCount - 1),
            d > this.options.itemsTotalCount - 1 && (d = 0),
            this.gotoItem(d),
            b.stopPropagation()
        },
        checkArrows: function() {
            this.elements.arrows.removeClass("_active"),
            this.options.itemCurIndex > 0 && this.elements.arrows.filter("._prev").addClass("_active"),
            this.options.itemCurIndex < this.options.itemsTotalCount - 1 && this.elements.arrows.filter("._next").addClass("_active")
        },
        swipe: function(a, b, c, d, e) {
            if (!("left" != b && "right" != b || e > 1)) {
                var f = this.options.itemCurIndex;
                f += "right" == b ? -1 : 1,
                0 > f && (f = this.options.itemsTotalCount - 1),
                f > this.options.itemsTotalCount - 1 && (f = 0),
                this.gotoItem(f)
            }
        }
    },
    c
}(jQuery, App),
App.MediaNews = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {},
        this.options = {
            alias: "js-medianews",
            selector: ".js-medianews",
            conWidth: 0,
            itemWidth: 50,
            itemsTotalCount: 0,
            colCount: 2,
            colHeights: {},
            lastClickedItemIdx: -1
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            this.elements.con = a('[data-role="con"]', this.elements.root),
            this.elements.header = a('[data-role="header"]', this.elements.root),
            this.elements.list = a('[data-role="list"]', this.elements.root),
            this.elements.items = a('[data-role="item"]', this.elements.list),
            this.options.itemsTotalCount = this.elements.items.length
        },
        construct: function() {
            if (this.resize(),
            this.elements.root.addClass("_tiles"),
            this.elements.videos = this.elements.con.find('[data-role="item-video"]'),
            this.options.hasVideo = this.elements.videos.length > 0,
            this.options.hasVideo) {
                this.objects.embedvideo = {};
                for (var a, c = 0; c < this.elements.videos.length; c++) {
                    a = this.elements.videos.eq(c);
                    var d = this.options.alias + "-video" + c;
                    a.attr({
                        id: d
                    }),
                    this.objects.embedvideo[d] = new b.EmbedVideo({
                        selector: "#" + d,
                        alias: d
                    })
                }
            }
        },
        destruct: function() {
            if (this.options.hasVideo) {
                for (var a in this.objects.embedvideo)
                    this.objects.embedvideo[a].destruct(),
                    this.objects.embedvideo[a] = null;
                this.objects.embedvideo = null,
                this.elements.videos = null
            }
            this.elements.items = null,
            this.elements.con = null
        },
        bind: function() {
            if (this.elements.list.on(b.isTouchDevice ? "touchstart" : "mousedown", '[data-role="pagelink"]', a.proxy(this.touchPagelink, this)),
            this.options.hasVideo) {
                this.elements.videos.on("click", a.proxy(this.embedVideo, this));
                for (var c in this.objects.embedvideo)
                    this.objects.embedvideo[c].bind()
            }
            b.doc.on("win:resizeAfter", a.proxy(this.resize, this)),
            setTimeout(a.proxy(this.scrollToClickedItem, this), 100)
        },
        unbind: function() {
            if (this.elements.list.off(),
            this.options.hasVideo) {
                this.elements.videos.off();
                for (var c in this.objects.embedvideo)
                    this.objects.embedvideo[c].unbind()
            }
            b.doc.off("win:resizeAfter", a.proxy(this.resize, this))
        },
        setParentTop: function(a, b) {
            this.options.parentTop = a,
            "undefined" != typeof b && b && (this.options.parentTop += this.elements.root.position().top)
        },
        resize: function() {
            var a = this.elements.con.width();
            a != this.options.conWidth && (this.options.conWidth = a,
            this.redraw())
        },
        redraw: function() {
            this.options.colHeights = {};
            for (var a = 0; a < this.options.colCount; a++)
                this.options.colHeights[a] = 0;
            for (var b, c, d, e, a = 0; a < this.options.itemsTotalCount; a++)
                b = this.elements.items.eq(a),
                c = this.getMinCol(),
                d = this.options.colHeights[c],
                e = 1,
                b.hasClass("_size2") && (e = 2),
                b.hasClass("_size3") && (e = 3),
                this.options.colHeights[c] = d + e,
                b.css({
                    marginTop: 25 * d + "%",
                    left: c * this.options.itemWidth + "%"
                }).data("top", 25 * d);
            this.elements.con.css({
                paddingTop: 25 * this.options.colHeights[this.getMaxCol()] + "%"
            })
        },
        getMinCol: function() {
            for (var a = 0, b = this.options.colHeights[0], c = 0; c < this.options.colCount; c++)
                this.options.colHeights[c] < b && (b = this.options.colHeights[c],
                a = c);
            return a
        },
        getMaxCol: function() {
            for (var a = 0, b = this.options.colHeights[0], c = 0; c < this.options.colCount; c++)
                this.options.colHeights[c] > b && (b = this.options.colHeights[c],
                a = c);
            return a
        },
        embedVideo: function(b) {
            b.stopPropagation();
            var c = a(b.target).closest('[data-role="item-video"]');
            return this.objects.embedvideo[c.attr("id")].embed(),
            !1
        },
        scrollToClickedItem: function() {
            var a = this.elements.list.data("scrolltoitem");
            if ("undefined" != typeof a) {
                var c = this.elements.items.filter('[data-idx="' + a + '"]');
                if (c.length) {
                    var d = this.options.parentTop + this.elements.header.outerHeight() + parseInt(this.options.conWidth * parseInt(c.data("top")) / 100);
                    b.doc.trigger("page:scrollTo", {
                        top: d,
                        duration: 0
                    })
                }
            }
        },
        resetHistory: function() {
            var a = b.iHistory.getState();
            a.data.changes = {
                itemidx: this.options.lastClickedItemIdx
            },
            b.iHistory.replaceState(a.data, a.title, a.url)
        },
        touchPagelink: function(b) {
            var c = a(b.target).closest('[data-role="pagelink"]');
            if (c.length) {
                var d = c.parents('[data-role="item"]').data("idx");
                "undefined" != typeof d && (this.options.lastClickedItemIdx = d,
                this.resetHistory())
            }
        }
    },
    c
}(jQuery, App),
App.People = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {},
        this.options = {
            alias: "js-people",
            selector: ".js-people",
            hasItems: !1,
            hasAnchors: !1,
            rootTop: 0,
            anchorScroll: !1,
            anchorAlias: null,
            anchorTop: 0
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            this.elements.items = a('[data-role="item"]', this.elements.root),
            this.options.hasItems = this.elements.items.length,
            this.elements.activeItem = null,
            this.options.clickItem = !1,
            this.elements.anchors = a('[data-role="people-anchor"]'),
            this.options.hasAnchors = this.elements.anchors.length,
            this.options.hasAnchors && (this.elements.departments = a('[data-role="department"]', this.elements.root),
            this.options.departmentsCount = this.elements.departments.length)
        },
        construct: function() {
            this.resize()
        },
        destruct: function() {},
        bind: function() {
            this.options.hasItems && (this.elements.items.on("click", '[data-role="item-main"]', a.proxy(this.clickItemMain, this)),
            this.elements.items.on("click", '[data-role="item-close"]', a.proxy(this.clickItemClose, this)),
            this.elements.items.on("click", a.proxy(this.clickItem, this)),
            b.doc.on("page:clicked", a.proxy(this.onPageClick, this))),
            this.options.hasAnchors && (this.elements.anchors.on("click", a.proxy(this.clickAnchor, this)),
            this.checkPresetAnchor()),
            b.doc.on("win:resizeAfter", a.proxy(this.resize, this)),
            b.doc.on("page:scrolled", a.proxy(this.scroll, this))
        },
        unbind: function() {
            this.options.hasItems && (this.elements.items.off(),
            b.doc.off("page:clicked", a.proxy(this.onPageClick, this))),
            this.options.hasAnchors && this.elements.anchors.off(),
            b.doc.off("win:resizeAfter", a.proxy(this.resize, this)),
            b.doc.off("page:scrolled", a.proxy(this.scroll, this))
        },
        resize: function() {
            this.options.hasItems && (this.options.rootTop = parseInt(this.elements.root.offset().top),
            this.options.itemMainHeight = a('[data-role="item-main"]', this.elements.root).eq(0).height()),
            this.options.hasAnchors && (this.options.winHeight = b.win.height())
        },
        setParentTop: function(a) {
            this.options.parentTop = a
        },
        clickItemMain: function(b) {
            this.options.scrollTimeout && clearTimeout(this.options.scrollTimeout);
            var c = a(b.target).closest('[data-role="item"]');
            if (this.elements.root.toggleClass("_active", null != this.elements.activeItem),
            c.hasClass("_opened"))
                this.elements.activeItem = null;
            else {
                var d = 50;
                null != this.elements.activeItem && (this.elements.activeItem.removeClass("_opened"),
                d = 350),
                this.elements.activeItem = c,
                this.options.scrollTimeout = setTimeout(a.proxy(this.scrollToActiveItem, this), d)
            }
            c.toggleClass("_opened")
        },
        clickItemClose: function(b) {
            this.options.scrollTimeout && clearTimeout(this.options.scrollTimeout);
            var c = a(b.target).closest('[data-role="item"]');
            c.removeClass("_opened"),
            this.elements.activeItem = null
        },
        clickItem: function() {
            this.options.clickItem = !0
        },
        scrollToActiveItem: function() {
            null != this.elements.activeItem && b.doc.trigger("page:scrollTo", {
                top: this.options.rootTop + parseInt(this.elements.activeItem.position().top) + this.options.itemMainHeight
            })
        },
        onPageClick: function() {
            return this.options.clickItem ? void (this.options.clickItem = !1) : void (null != this.elements.activeItem && (this.options.scrollTimeout && clearTimeout(this.options.scrollTimeout),
            this.elements.activeItem.removeClass("_opened"),
            this.elements.activeItem = null))
        },
        scroll: function() {
            this.options.hasAnchors && this.checkAnchors()
        },
        clickAnchor: function(b) {
            var c = a(b.target).closest('[data-role="people-anchor"]')
              , d = c.data("alias") + "";
            -1 != d.indexOf(",") && (d = d.substr(0, d.indexOf(","))),
            this.gotoAnchor(d)
        },
        gotoAnchor: function(b) {
            var c = this.elements.departments.filter('[data-alias="' + b + '"]');
            c.length && (this.options.anchorScroll = !0,
            this.options.anchorAlias = b,
            this.options.anchorTop = this.options.parentTop + parseInt(c.position().top),
            this.resetAnchor(b),
            c.hasClass("_loaded") || c.hasClass("_loading") ? a.when(this.scrollToAnchor()).done(a.proxy(this.gotoAnchorComplete, this)) : a.when(this.scrollToAnchor(), this.loadDepartment(b)).done(a.proxy(this.gotoAnchorComplete, this)))
        },
        scrollToAnchor: function() {
            return this.objects.scrollAssistant = a.Deferred(),
            this.options.anchorScrollTimeout && clearTimeout(this.options.anchorScrollTimeout),
            b.doc.trigger("page:scrollTo", {
                top: this.options.anchorTop,
                duration: 500
            }),
            this.options.anchorScrollTimeout = setTimeout(a.proxy(this.scrollToAnchorComplete, this), 550),
            this.objects.scrollAssistant.promise()
        },
        scrollToAnchorComplete: function() {
            this.objects.scrollAssistant.resolve()
        },
        gotoAnchorComplete: function() {
            b.doc.trigger("page:scrollTo", {
                top: this.options.anchorTop,
                duration: 0
            }),
            this.options.anchorScroll = !1,
            this.options.anchorAlias = null,
            this.options.anchorTop = 0
        },
        checkAnchors: function() {
            if (!this.options.anchorScroll) {
                for (var a, b = "", c = 0; c < this.options.departmentsCount; c++) {
                    var d = this.elements.departments.eq(c)
                      , e = d[0].getBoundingClientRect()
                      , a = d.data("alias");
                    e.top < this.options.winHeight / 2 && (b = a),
                    !d.hasClass("_loaded") && !d.hasClass("_loading") && e.top > 0 && e.top < this.options.winHeight - d.outerHeight() && (d.addClass("_loading"),
                    this.loadDepartment(a))
                }
                this.resetAnchor(b)
            }
        },
        resetAnchor: function(b) {
            var c;
            c = "" == b ? this.elements.anchors.eq(0).parent() : this.elements.anchors.filter('[data-alias*="' + b + '"]').parent(),
            c.hasClass("_active") || (this.elements.anchors.each(function() {
                a(this).parent().removeClass("_active")
            }),
            c.addClass("_active"),
            document.location.hash = b)
        },
        checkPresetAnchor: function() {
            "" != document.location.hash && "#" != document.location.hash && this.gotoAnchor(document.location.hash.substr(1))
        },
        loadDepartment: function(b) {
            return this.options.anchorScroll && (this.objects.loadAssistant = a.Deferred()),
            a.ajax({
                url: this.elements.root.data("action"),
                type: "POST",
                dataType: "json",
                cache: !1,
                data: {
                    alias: b
                },
                success: a.proxy(this.loadDepartmentSuccess, this),
                error: a.proxy(this.loadDepartmentError, this)
            }),
            this.options.anchorScroll ? this.objects.loadAssistant.promise() : void 0
        },
        loadDepartmentSuccess: function(a) {
            var b = this.elements.departments.filter('[data-alias="' + a.alias + '"]');
            b.length && (b.find('[data-role="list"]').html(a.items),
            b[0].offsetHeight,
            b.removeClass("_loading").addClass("_loaded"),
            this.options.anchorScroll && this.objects.loadAssistant.resolve())
        },
        loadDepartmentError: function() {
            this.options.anchorScroll && this.objects.loadAssistant.resolve()
        }
    },
    c
}(jQuery, App),
App.Popup = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {},
        this.options = {
            name: "",
            alias: "js-popup",
            selector: ".js-popup",
            hasForm: !1,
            hasGallery: !1
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            this.options.name = this.elements.root.data("name"),
            this.elements.content = a('[data-role="content"]', this.elements.root),
            this.elements.embed = a('[data-role="embed"]', this.elements.root);
            var c = a('[data-role="form"]', this.elements.content);
            if (c.length) {
                this.options.hasForm = !0;
                var d = this.options.alias + "-form";
                c.attr({
                    id: d
                }),
                this.objects.form = new b.Form({
                    selector: "#" + d,
                    alias: d
                }),
                this.options.formAlias = d
            }
            var c = a('[data-role="gallery"]', this.elements.content);
            if (c.length) {
                this.options.hasGallery = !0;
                var d = this.options.alias + "-gallery";
                c.attr({
                    id: d
                }),
                this.objects.gallery = new b.Gallery({
                    selector: "#" + d,
                    alias: d
                }),
                this.options.galleryAlias = d
            }
        },
        construct: function() {
            this.options.hasForm && this.objects.form.construct(),
            this.options.hasGallery && this.objects.gallery.construct(),
            this.options.isActive = !1
        },
        destruct: function() {
            this.options.hasForm && (this.objects.form.destruct(),
            this.objects.form = null),
            this.options.hasGallery && (this.objects.gallery.destruct(),
            this.objects.gallery = null),
            this.elements.embed = null,
            this.elements.content = null
        },
        bind: function() {
            this.elements.content.on("click", '[data-role="close"]', a.proxy(this.hide, this)),
            this.elements.content.on("click", a.proxy(this.keep, this)),
            this.elements.root.on("click", a.proxy(this.hide, this)),
            this.options.hasForm && this.objects.form.bind(),
            this.options.hasGallery && this.objects.gallery.bind(),
            b.doc.on("popup:show", a.proxy(this.callShow, this)),
            b.doc.on("popup:hide", a.proxy(this.callHide, this))
        },
        unbind: function() {
            this.hideInstantly(),
            this.elements.content.off(),
            this.elements.root.off(),
            this.options.hasForm && this.objects.form.unbind(),
            this.options.hasGallery && this.objects.gallery.unbind(),
            b.doc.off("popup:show", a.proxy(this.callShow, this)),
            b.doc.off("popup:hide", a.proxy(this.callHide, this))
        },
        callShow: function(a, b) {
            b.name == this.options.name && (b.embed && "undefined" != typeof b.embed && this.elements.embed.length && (this.elements.embed.html(b.embed),
            this.options.isEmbed = !0),
            this.show())
        },
        callHide: function(a, b) {
            b.name == this.options.name && this.hide()
        },
        show: function() {
            this.options.isActive || (this.options.isActive = !0,
            this.options.hasForm && this.objects.form.activate(),
            this.options.hasGallery && this.objects.gallery.reset(),
            b.doc.trigger("popup:onshowBefore", {
                name: this.options.name
            }),
            this.elements.root.addClass("_active"),
            setTimeout(a.proxy(this.showComplete, this), 500))
        },
        showComplete: function() {
            this.options.isActive && (this.options.hasForm && this.objects.form.focusFirstField(),
            b.doc.trigger("popup:onshowAfter", {
                name: this.options.name
            }))
        },
        hide: function(c) {
            c && (c.stopPropagation(),
            c.preventDefault()),
            this.options.isActive && (this.options.isActive = !1,
            this.options.isEmbed && (this.elements.embed.empty(),
            this.options.isEmbed = !1),
            this.elements.root.removeClass("_active"),
            setTimeout(a.proxy(this.hideComplete, this), 500),
            b.doc.trigger("popup:onhideBefore", {
                name: this.options.name
            }))
        },
        hideInstantly: function() {
            this.options.isActive && (this.options.isActive = !1,
            this.elements.root.removeClass("_active"),
            b.doc.trigger("popup:onhideBefore", {
                name: this.options.name
            }),
            b.doc.trigger("popup:onhideAfter", {
                name: this.options.name
            }))
        },
        hideComplete: function() {
            this.options.isActive || b.doc.trigger("popup:onhideAfter", {
                name: this.options.name
            })
        },
        keep: function(a) {
            a.stopPropagation()
        }
    },
    c
}(jQuery, App),
App.Projects = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {},
        this.options = {
            alias: "js-projects",
            selector: ".js-projects",
            itemsTotalCount: 0,
            itemsLoadedCount: 0,
            itemCurIndex: 0,
            hasNav: !1,
            currentType: 0,
            createSidebarImages: !1
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            this.elements.nav = a('[data-role="nav"]', this.elements.root),
            this.options.hasNav = this.elements.nav.length,
            this.options.hasNav && (this.elements.navItems = a("LI", this.elements.nav)),
            this.elements.main = a('[data-role="main"]', this.elements.root),
            this.elements.items = a('[data-role="item"]', this.elements.main),
            this.options.itemsTotalCount = this.elements.items.length,
            this.elements.main.append('<div data-role="itemsperrow"/>'),
            this.elements.itemsPerRow = a('[data-role="itemsperrow"]', this.elements.main),
            this.options.hasArrows = this.elements.root.hasClass("_oneline"),
            this.options.hasArrows && (this.elements.root.append('<div class="b-arrow _prev" data-role="arrow"><div></div></div><div class="b-arrow _next" data-role="arrow"><div></div></div>'),
            this.elements.arrows = a('[data-role="arrow"]', this.elements.root))
        },
        construct: function() {
            if (this.options.createSidebarImages && (this.options.sidebarImagesKoef = 1,
            this.options.sidebarImagesAlias = "js-sidebar-images",
            b.iSidebar.createGroup({
                alias: this.options.sidebarImagesAlias,
                sample: this.options.selector
            })),
            this.resize(),
            this.options.hasNav) {
                var a = b.iSidebar.getRoot();
                a.after(this.elements.nav),
                this.elements.nav[0].offsetHeight,
                this.elements.nav.addClass("_ready"),
                this.elements.navItems.filter('[data-type="' + this.options.currentType + '"]').addClass("_active")
            }
            this.filterItems()
        },
        destruct: function() {
            this.options.hasNav && (this.elements.main.after(this.elements.nav),
            this.elements.navItems = null,
            this.elements.nav = null),
            this.options.createSidebarImages && b.iSidebar.removeImages(),
            this.elements.items = null,
            this.elements.main = null
        },
        bind: function() {
            this.options.hasNav && (this.elements.navItems.on("mouseenter", a.proxy(this.navEnter, this)),
            this.elements.navItems.on("mouseleave", a.proxy(this.navLeave, this)),
            this.elements.navItems.on("click", a.proxy(this.navClick, this))),
            this.options.hasArrows && this.elements.arrows.on("click", a.proxy(this.clickArrow, this)),
            b.doc.on("win:resizeBefore", a.proxy(this.resizeBefore, this)),
            b.doc.on("win:resizeAfter", a.proxy(this.resize, this)),
            b.doc.on("page:scrolled", a.proxy(this.scroll, this))
        },
        unbind: function() {
            this.options.hasNav && this.elements.navItems.off(),
            this.options.hasArrows && this.elements.arrows.off(),
            b.doc.off("win:resizeBefore", a.proxy(this.resizeBefore, this)),
            b.doc.off("win:resizeAfter", a.proxy(this.resize, this)),
            b.doc.off("page:scrolled", a.proxy(this.scroll, this))
        },
        resize: function() {
            var a = this.elements.main.width()
              , c = this.elements.itemsPerRow.width()
              , d = _mr = 0;
            if (a % c != 0) {
                var e = c - a % c;
                e % 2 != 0 ? (d = _mr = (e - 1) / 2,
                _mr++) : d = _mr = e / 2
            }
            this.elements.main.css({
                margin: "0 -" + _mr + "px 0 -" + d + "px"
            });
            var a = b.win.width()
              , f = a != this.options.winWidth;
            this.options.winWidth = a,
            this.options.winHeight = b.win.height(),
            this.checkItemsImages(),
            this.options.createSidebarImages && this.resetSidebarImages(f),
            this.options.hasArrows && (this.elements.main.css({
                transform: "translateX(0)"
            }),
            this.options.itemCurIndex = 0,
            this.checkArrows(c))
        },
        resizeBefore: function() {
            b.iSidebar.closeIfOpened()
        },
        scroll: function() {
            this.checkItemsImages(),
            this.options.createSidebarImages && this.resizeSidebarGroup()
        },
        prefilterItems: function(a) {
            0 == a ? this.elements.items.addClass("_active") : (this.elements.items.removeClass("_active"),
            this.elements.items.filter('[data-type*="' + a + '"]').addClass("_active"))
        },
        filterItems: function() {
            0 == this.options.currentType ? this.elements.items.addClass("_active") : (this.elements.items.removeClass("_active"),
            this.elements.items.filter('[data-type*="' + this.options.currentType + '"]').addClass("_active")),
            this.options.createSidebarImages && this.resetSidebarImages(!0)
        },
        navEnter: function(b) {
            var c = a(b.target).closest("LI");
            c.hasClass("_active") || (this.elements.root.addClass("_navhover"),
            this.prefilterItems(c.data("type")))
        },
        navLeave: function(b) {
            var c = a(b.target).closest("LI");
            c.hasClass("_active") || (this.elements.root.removeClass("_navhover"),
            this.filterItems())
        },
        navClick: function(b) {
            var c = a(b.target).closest("LI");
            c.hasClass("_active") || (this.elements.navItems.filter('[data-type="' + this.options.currentType + '"]').removeClass("_active"),
            this.options.currentType = c.data("type"),
            this.elements.navItems.filter('[data-type="' + this.options.currentType + '"]').addClass("_active"),
            this.elements.root.removeClass("_navhover"),
            this.filterItems())
        },
        checkItemsImages: function() {
            if (this.options.itemsTotalCount != this.options.itemsLoadedCount)
                for (var b = 0; b < this.options.itemsTotalCount; b++) {
                    var c = this.elements.items.eq(b)
                      , d = c[0].getBoundingClientRect();
                    if (d.top < this.options.winHeight) {
                        var e = c.find('[data-role="item-image"]');
                        e.hasClass("_loading") || e.hasClass("_loaded") || (e.addClass("_loading"),
                        a.preload({
                            id: c.data("idx"),
                            src: e.data("src")
                        }).done(a.proxy(this.loadItemImageComplete, this)))
                    }
                }
        },
        loadItemImageComplete: function(a) {
            var c = this.elements.items.filter('[data-idx="' + a.id + '"]');
            if (0 != c.length) {
                var d = c.find('[data-role="item-image"]');
                if (!d.hasClass("_loaded") && (d.css({
                    backgroundImage: "url(" + a.src + ")"
                }),
                d[0].offsetHeight,
                d.removeClass("_loading").addClass("_loaded"),
                this.options.itemsLoadedCount++,
                this.options.createSidebarImages)) {
                    var e = c.position().left;
                    e < this.options.winWidth / 2 && b.iSidebar.addGroupImage({
                        alias: this.options.sidebarImagesAlias,
                        image: {
                            top: c.position().top,
                            left: e,
                            src: d.data("src"),
                            opacity: c.hasClass("_active") ? .5 : .1
                        }
                    })
                }
            }
        },
        resetSidebarImages: function(a) {
            var c = this.elements.itemsPerRow.width();
            if (a || c != this.options.sidebarImagesKoef) {
                this.options.sidebarImagesKoef = c;
                for (var d = [], e = this.options.winWidth / this.options.sidebarImagesKoef, f = 0; f < this.options.itemsTotalCount; f++) {
                    var g = this.elements.items.eq(f)
                      , h = g.position().left;
                    if (h < this.options.winWidth / 2) {
                        var i = g.find('[data-role="item-image"]');
                        i.hasClass("_loaded") && d.push({
                            top: g.position().top,
                            left: h,
                            src: i.data("src"),
                            opacity: g.hasClass("_active") ? .5 : .1
                        })
                    }
                }
                b.iSidebar.setGroupImageDim({
                    alias: this.options.sidebarImagesAlias,
                    dim: {
                        width: e,
                        height: e
                    }
                }),
                b.iSidebar.setGroupImages({
                    alias: this.options.sidebarImagesAlias,
                    images: d
                })
            }
        },
        resizeSidebarGroup: function() {
            b.iSidebar.resizeGroup({
                alias: this.options.sidebarImagesAlias
            })
        },
        clickArrow: function(b) {
            var c = a(b.target).closest('[data-role="arrow"]')
              , d = this.options.itemCurIndex
              , e = this.elements.itemsPerRow.width();
            d += c.hasClass("_prev") ? -e : e,
            0 > d && (d = 0),
            d > this.options.itemsTotalCount - e && (d = this.options.itemsTotalCount - e);
            var f = 100 / e * d;
            this.elements.main.css({
                transform: "translateX(-" + f + "%)"
            }),
            this.options.itemCurIndex = d,
            this.checkArrows(e),
            b.stopPropagation()
        },
        checkArrows: function(a) {
            this.elements.arrows.removeClass("_active"),
            this.options.itemCurIndex > 0 && this.elements.arrows.filter("._prev").addClass("_active"),
            this.options.itemCurIndex < this.options.itemsTotalCount - a && this.elements.arrows.filter("._next").addClass("_active")
        }
    },
    c
}(jQuery, App),
App.SocShares = function(a) {
    var b = function(b) {
        return this.elements = {},
        this.options = {
            selector: ".js-socshares"
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return b.prototype = {
        constructor: b,
        render: function() {
            this.elements.items = a('[data-role="item"]', this.elements.root)
        },
        construct: function() {},
        bind: function() {
            this.elements.items.on("click", a.proxy(this.clickItem, this))
        },
        unbind: function() {
            this.elements.items.off()
        },
        destruct: function() {
            this.options.sharedata = null,
            this.elements.items = null
        },
        clickItem: function(b) {
            var c = a(b.target).closest('[data-role="item"]');
            window.open(this.getURL(c.data("type")), "", "toolbar=0,status=0,width=626,height=436")
        },
        getURL: function(a) {
            var b = encodeURIComponent(this.options.sharedata.ttl)
              , c = encodeURIComponent(this.options.sharedata.url);
            switch (a) {
            case "twitter":
                return "http://twitter.com/share?text=" + b + "&url=" + c + "&counturl=" + c;
            case "facebook":
                return "http://www.facebook.com/sharer.php?s=100&p[title]=" + b + "&p[url]=" + c
            }
            return ""
        }
    },
    b
}(jQuery, App),
App.Tetris = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {},
        this.options = {
            alias: "js-tetris",
            selector: ".js-tetris",
            isActive: !1,
            isConstructed: !1,
            isPlaying: !1,
            tickInterval: !1,
            drawRequest: !1,
            mainWidth: 600,
            mainHeight: 900,
            blockWidth: 60,
            blockHeight: 60,
            colsCount: 10,
            rowsCount: 16,
            board: [],
            boardSeq: 0,
            currentShape: [],
            currentX: 0,
            currentY: 0,
            shapesCount: 7,
            shapes: {
                1: [0, 0, 0, 0, 1, 1, 1, 1],
                2: [0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
                3: [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
                4: [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1],
                5: [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
                6: [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
                7: [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1]
            },
            colorsCount: 3,
            colors: {
                1: "#000",
                2: "#20AA97",
                3: "#6988BE"
            },
            images: {
                1: "/assets/img/tetris/rd.svg",
                2: "/assets/img/tetris/construction.svg"
            }
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            this.elements.main = a("<canvas></canvas>"),
            this.elements.root.append(this.elements.main),
            this.elements.main.attr({
                width: this.options.mainWidth
            }),
            this.elements.ctx = this.elements.main[0].getContext("2d")
        },
        construct: function() {
            this.resize()
        },
        destruct: function() {
            this.options.isActive = !1,
            this.options.isPlaying = !1,
            this.options.currentShape = [],
            this.options.drawRequest && cancelAnimationFrame(this.options.drawRequest),
            this.options.drawRequest = !1,
            this.options.tickInterval && clearInterval(this.options.tickInterval),
            this.options.board = [],
            this.elements.main = null,
            this.elements.ctx = null
        },
        bind: function() {
            b.doc.on("win:resizeBefore", a.proxy(this.resizeBefore, this)),
            b.doc.on("win:resizeAfter", a.proxy(this.resize, this)),
            b.doc.on("keydown", a.proxy(this.onKeyDown, this)),
            b.isTouchDevice && (this.elements.main.swipe({
                swipeStatus: function() {}
            }),
            this.elements.main.on("swipeStatus", a.proxy(this.swipe, this))),
            b.doc.on("doc:visibilityChange", a.proxy(this.onVisibilityChange, this))
        },
        unbind: function() {
            b.doc.off("win:resizeBefore", a.proxy(this.resizeBefore, this)),
            b.doc.off("win:resizeAfter", a.proxy(this.resize, this)),
            b.doc.off("keydown", a.proxy(this.onKeyDown, this)),
            b.isTouchDevice && this.elements.main.off(),
            b.doc.off("doc:visibilityChange", a.proxy(this.onVisibilityChange, this))
        },
        resizeBefore: function() {
            this.options.isPlaying && (this.options.tickInterval && clearInterval(this.options.tickInterval),
            this.options.drawRequest && cancelAnimationFrame(this.options.drawRequest),
            this.options.drawRequest = !1)
        },
        resize: function() {
            var c = b.win.height();
            this.options.isConstructed || (this.options.blockWidth = Math.round(this.options.mainWidth / this.options.colsCount),
            this.options.blockHeight = this.options.blockWidth,
            this.options.isConstructed = !0);
            var d = this.options.rowsCount;
            if (this.options.rowsCount = Math.ceil(c / this.options.blockHeight) + 1,
            this.options.mainHeight = this.options.rowsCount * this.options.blockHeight,
            this.elements.main.css({
                height: this.options.mainHeight + "px"
            }).attr({
                height: this.options.mainHeight
            }),
            this.options.boardSeq > 0) {
                var e = this.options.rowsCount - d;
                e > 0 && this.addLines(e),
                0 > e && this.removeLines(-e)
            }
            this.options.isPlaying ? (this.options.tickInterval = setInterval(a.proxy(this.tick, this), 500),
            this.options.drawRequest || this.drawLoop()) : this.draw()
        },
        start: function() {
            return this.options.isActive ? void this.startGame() : void this.activate()
        },
        activate: function() {
            this.options.isActive = !0;
            var b = [];
            for (var c in this.options.images)
                b.push(this.options.images[c]);
            a.preload(b).done(a.proxy(this.startGame, this))
        },
        startGame: function() {
            this.options.isActive && (this.options.tickInterval && clearInterval(this.options.tickInterval),
            this.options.drawRequest && cancelAnimationFrame(this.options.drawRequest),
            this.options.drawRequest = !1,
            this.init(),
            setTimeout(a.proxy(this.newGame, this), 500))
        },
        onKeyDown: function(a) {
            if (this.options.isPlaying) {
                var b = {
                    37: "left",
                    39: "right",
                    40: "down",
                    38: "rotate"
                };
                "undefined" != typeof b[a.keyCode] && (this.keyPress(b[a.keyCode]),
                this.draw())
            }
        },
        swipe: function(a, b, c, d, e, f) {
            f > 1 || ("start" == b ? this.options.swipeDistance = 0 : "cancel" == b || "end" == b ? (0 == d && 500 > e && (this.keyPress("rotate"),
            this.draw()),
            this.options.swipeDistance = 0) : ("left" == c || "right" == c || "down" == c) && d - this.options.swipeDistance > 60 && (this.keyPress(c),
            this.draw(),
            this.options.swipeDistance = d))
        },
        draw: function() {
            this.elements.ctx.clearRect(0, 0, this.options.mainWidth, this.options.mainHeight);
            for (var a = 0; a < this.options.colsCount; ++a)
                for (var b = 0; b < this.options.rowsCount; ++b)
                    "undefined" != typeof this.options.board[b] && null != this.options.board[b][a] && this.drawShape(a, b, this.options.board[b][a].slice());
            if (this.options.currentShape.length) {
                this.elements.ctx.fillStyle = this.options.colors[1];
                for (var b = 0; 4 > b; ++b)
                    for (var a = 0; 4 > a; ++a)
                        null != this.options.currentShape[b][a] && this.drawShape(this.options.currentX + a, this.options.currentY + b, this.options.currentShape[b][a].slice())
            }
        },
        drawLoop: function() {
            this.draw(),
            this.options.drawRequest = requestAnimationFrame(a.proxy(this.drawLoop, this))
        },
        drawShape: function(a, b, c) {
            this.elements.ctx.fillStyle = this.options.colors[c[2]],
            this.drawBlock(a, b),
            0 != c[4] && this.drawImage(a, b, c[3], c[4])
        },
        drawBlock: function(a, b) {
            this.elements.ctx.fillRect(a * this.options.blockWidth, b * this.options.blockHeight, this.options.blockWidth, this.options.blockHeight)
        },
        drawImage: function(a, b, c, d) {
            var e = new Image;
            e.src = this.options.images[d],
            this.elements.ctx.save();
            var f = this.options.blockWidth
              , g = this.options.blockHeight;
            if (this.elements.ctx.translate(a * f, b * g),
            c > 0 && this.elements.ctx.rotate(c * Math.PI / 180),
            1 == d)
                try {
                    this.elements.ctx.drawImage(e, -f, -g, 2 * f, 2 * g)
                } catch (h) {}
            if (2 == d) {
                var i = 3 * -f
                  , j = 0;
                90 == c && (j = -g),
                180 == c && (i = -f,
                j = -g),
                270 == c && (i = -f);
                try {
                    this.elements.ctx.drawImage(e, i, j, 4 * f, g)
                } catch (h) {}
            }
            this.elements.ctx.restore()
        },
        newShape: function() {
            for (var a = ++this.options.boardSeq, b = Math.floor(Math.random() * this.options.shapesCount) + 1, c = Math.floor(Math.random() * this.options.colorsCount) + 1, d = this.options.shapes[b].slice(), e = 0, f = 0, g = [], h = 0; 4 > h; ++h) {
                g[h] = [];
                for (var i = 0; 4 > i; ++i) {
                    var j = 4 * h + i;
                    "undefined" != typeof d[j] && d[j] ? (4 == b && 1 == c && 10 == j && (f = 1),
                    1 == b && 2 == c && 7 == j && (f = 2),
                    g[h][i] = [a, b, c, e, f]) : g[h][i] = null
                }
            }
            return this.options.currentShape = this._deepCopy(g),
            this.options.currentX = 3,
            this.options.currentY = 0,
            this.valid(0, 1) ? void (this.valid(0, 0) || (this.options.currentShape = [],
            this.endGame())) : (this.options.currentShape = [],
            void this.endGame())
        },
        newGame: function() {
            this.options.isActive && (this.newShape(),
            this.options.tickInterval = setInterval(a.proxy(this.tick, this), 500),
            this.options.drawRequest || this.drawLoop(),
            this.options.isPlaying = !0)
        },
        endGame: function() {
            this.options.tickInterval && clearInterval(this.options.tickInterval),
            this.options.drawRequest && cancelAnimationFrame(this.options.drawRequest),
            this.options.drawRequest = !1,
            this.options.isPlaying = !1,
            this.freeze(),
            b.doc.trigger("tetris:gameEnded")
        },
        init: function() {
            for (var a = 0; a < this.options.rowsCount; ++a) {
                this.options.board[a] = [];
                for (var b = 0; b < this.options.colsCount; ++b)
                    this.options.board[a][b] = null
            }
            this.options.boardSeq = 0
        },
        tick: function() {
            return this.options.isPlaying ? this.valid(0, 0) ? void (this.valid(0, 1) ? ++this.options.currentY : (this.freeze(),
            this.clearLines(),
            this.newShape())) : (this.options.currentShape = [],
            this.endGame(),
            !1) : (this.options.tickInterval && clearInterval(this.options.tickInterval),
            this.options.drawRequest && cancelAnimationFrame(this.options.drawRequest),
            this.options.drawRequest = !1,
            !1)
        },
        freeze: function() {
            if (this.options.currentShape.length)
                for (var a = 0; 4 > a; ++a)
                    for (var b = 0; 4 > b; ++b)
                        null != this.options.currentShape[a][b] && (this.options.board[a + this.options.currentY][b + this.options.currentX] = this._simpleCopy(this.options.currentShape[a][b]))
        },
        rotate: function() {
            for (var a, b = [], c = 0, d = 0; 4 > d; ++d) {
                b[d] = [];
                for (var e = 0; 4 > e; ++e)
                    b[d][e] = this._simpleCopy(this.options.currentShape[3 - e][d]),
                    null != b[d][e] && (a = b[d][e][3] + 90,
                    360 == a && (a = 0),
                    b[d][e][3] = a,
                    c != b[d][e][4] && 0 != b[d][e][4] && (c = b[d][e][4]))
            }
            if (1 == c && (b[2][1][4] = 0,
            b[2][2][4] = 1),
            2 == c) {
                for (var f = iy = 0, d = 0; 4 > d; ++d)
                    for (var e = 0; 4 > e; ++e)
                        null != b[d][e] && (b[d][e][4] = 0,
                        e + d > f + iy && (f = e,
                        iy = d));
                b[iy][f][4] = 2
            }
            return b
        },
        clearLines: function() {
            for (var b = [], c = this.options.rowsCount - 1; c >= 0; --c) {
                for (var d = !0, e = 0; e < this.options.colsCount; ++e)
                    if (null == this.options.board[c][e]) {
                        d = !1;
                        break
                    }
                if (d) {
                    for (var e = 0; e < this.options.colsCount; ++e)
                        -1 == a.inArray(this.options.board[c][e][0], b) && b.push(this.options.board[c][e][0]);
                    for (var f = c; f > 0; --f)
                        for (var e = 0; e < this.options.colsCount; ++e)
                            this.options.board[f][e] = this._simpleCopy(this.options.board[f - 1][e]);
                    ++c
                }
            }
            if (b.length)
                for (var e = 0; e < this.options.colsCount; ++e)
                    for (var c = 0; c < this.options.rowsCount; ++c)
                        if (null != this.options.board[c][e])
                            for (var g = 0; g < b.length; g++)
                                this.options.board[c][e][0] == b[g] && (this.options.board[c][e][4] = 0)
        },
        addLines: function(a) {
            for (var b = 0; a > b; b++) {
                for (var c = [], d = 0; d < this.options.colsCount; ++d)
                    c[d] = null;
                this.options.board.unshift(c)
            }
        },
        removeLines: function(a) {
            for (var b = !1, c = this.options.rowsCount + a, d = 0; a > d; d++) {
                for (var e = 0; e < this.options.colsCount; ++e) {
                    null != this.options.board[0][e] && (b = !0);
                    for (var f = 0; c - 1 > f; ++f)
                        this.options.board[f][e] = this._simpleCopy(this.options.board[f + 1][e])
                }
                this.options.board.pop(),
                c--
            }
            return this.options.isPlaying ? (this.options.currentY >= a && (this.options.currentY -= a),
            b ? (this.options.currentShape = [],
            void this.endGame()) : void (this.valid(0, 0) || (this.options.currentShape = [],
            this.endGame()))) : void 0
        },
        keyPress: function(a) {
            switch (a) {
            case "left":
                this.valid(-1) && --this.options.currentX;
                break;
            case "right":
                this.valid(1) && ++this.options.currentX;
                break;
            case "down":
                this.valid(0, 1) && ++this.options.currentY;
                break;
            case "rotate":
                var b = this.rotate();
                this.valid(0, 0, b) && (this.options.currentShape = this._deepCopy(b))
            }
        },
        valid: function(a, b, c) {
            if (a = a || 0,
            b = b || 0,
            a = this.options.currentX + a,
            b = this.options.currentY + b,
            c = c || this.options.currentShape,
            !c.length)
                return !0;
            for (var d = 0; 4 > d; ++d)
                for (var e = 0; 4 > e; ++e)
                    if (null != c[d][e] && ("undefined" == typeof this.options.board[d + b] || "undefined" == typeof this.options.board[d + b][e + a] || null != this.options.board[d + b][e + a] || 0 > e + a || d + b >= this.options.rowsCount || e + a >= this.options.colsCount))
                        return !1;
            return !0
        },
        onVisibilityChange: function(b, c) {
            this.options.isPlaying && (c.visibility ? (this.options.tickInterval = setInterval(a.proxy(this.tick, this), 500),
            this.options.drawRequest || this.drawLoop()) : (this.options.tickInterval && clearInterval(this.options.tickInterval),
            this.options.drawRequest && cancelAnimationFrame(this.options.drawRequest),
            this.options.drawRequest = !1))
        },
        _simpleCopy: function(a) {
            return "undefined" == typeof a ? a : null == a ? null : a.slice()
        },
        _deepCopy: function(a) {
            if ("undefined" == typeof a)
                return a;
            if (null == a)
                return null;
            var b = [];
            for (i = 0; i < a.length; i++)
                for (b[i] = [],
                j = 0; j < a[i].length; j++)
                    if (null == a[i][j])
                        b[i][j] = null;
                    else
                        for (b[i][j] = [],
                        k = 0; k < a[i][j].length; k++)
                            b[i][j][k] = a[i][j][k];
            return b
        }
    },
    c
}(jQuery, App),
App.Page = function(a, b) {
    var c = function(b) {
        return this.elements = {},
        this.objects = {},
        this.options = {
            fadeDuration: 1e3,
            hasPopups: !1
        },
        this.options = a.extend(this.options, b),
        this.elements.root = a(this.options.selector),
        this.elements.root.length ? void this.render() : []
    };
    return c.prototype = {
        constructor: c,
        render: function() {
            this.renderPopups(),
            this.renderElements()
        },
        renderPopups: function() {
            var c = a(".js-popup");
            if (c.length) {
                this.options.hasPopups = !0,
                this.objects.popups = {};
                for (var d = 0; d < c.length; d++) {
                    var e = c.eq(d)
                      , f = e.data("name")
                      , g = "js-popup-" + f;
                    e.attr({
                        id: g
                    }),
                    this.objects.popups[f] = new b.Popup({
                        selector: "#" + g,
                        alias: g
                    })
                }
            }
        },
        renderElements: function() {},
        construct: function() {
            var b = this.collectImages(!1);
            return 0 == b.length ? (this.constructPopups(),
            this.constructElements(),
            !0) : (this.objects.assistant = a.Deferred(),
            this.preloadImages(b),
            this.objects.assistant.promise())
        },
        collectImages: function() {
            return []
        },
        applyImages: function() {},
        preloadImages: function(b) {
            a.preload(b).done(a.proxy(this.preloadImagesComplete, this))
        },
        preloadImagesComplete: function() {
            this.applyImages(!0),
            this.constructPopups(),
            this.constructElements();
            var a = this;
            a.objects.assistant.resolve()
        },
        postloadImages: function() {
            var b = this.collectImages(!0);
            0 != b.length && a.preload(b).done(a.proxy(this.postloadImagesComplete, this))
        },
        postloadImagesComplete: function() {
            this.applyImages(!1)
        },
        constructPopups: function() {
            if (this.options.hasPopups)
                for (var a in this.objects.popups)
                    this.objects.popups[a].construct()
        },
        constructElements: function() {},
        activate: function() {
            this.elements.root.addClass("_active"),
            this.resize(),
            this.bind(),
            setTimeout(a.proxy(this.postloadImages, this), 1e3)
        },
        destruct: function() {
            return this.objects.assistant = a.Deferred(),
            this.elements.root.removeClass("_active"),
            this.unbind(),
            this.destructPopups(),
            this.destructElements(),
            setTimeout(a.proxy(this.destructComplete, this), this.options.fadeDuration),
            this.objects.assistant.promise()
        },
        destructPopups: function() {
            if (this.options.hasPopups) {
                for (var a in this.objects.popups)
                    this.objects.popups[a].destruct(),
                    this.objects.popups[a] = null;
                this.objects.popups = null
            }
        },
        destructElements: function() {},
        destructComplete: function() {
            this.objects.assistant.resolve()
        },
        bind: function() {
            this.elements.root.on("click", a.proxy(this.clickRoot, this)),
            this.bindPopups(),
            this.bindElements()
        },
        bindPopups: function() {
            if (this.options.hasPopups) {
                for (var b in this.objects.popups)
                    this.objects.popups[b].bind();
                this.elements.root.on("click", '[data-role="popupanchor"]', a.proxy(this.clickPopupAnchor, this))
            }
        },
        bindElements: function() {},
        unbind: function() {
            this.elements.root.off(),
            this.unbindPopups(),
            this.unbindElements()
        },
        unbindPopups: function() {
            if (this.options.hasPopups)
                for (var a in this.objects.popups)
                    this.objects.popups[a].unbind()
        },
        unbindElements: function() {},
        clickRoot: function() {
            b.iSidebar.closeIfOpened(),
            b.doc.trigger("page:clicked")
        },
        resize: function() {},
        clickPopupAnchor: function(b) {
            var c = a(b.target).closest('[data-role="popupanchor"]')
              , d = c.data("name");
            this.objects.popups[d] && this.objects.popups[d].show()
        }
    },
    c
}(jQuery, App),
App.PageError = function(a, b) {
    var c = function(c) {
        var d = {
            alias: "js-error",
            selector: ".js-error"
        };
        d = a.extend(d, c),
        b.Page.call(this, d)
    };
    return c.prototype = Object.create(b.Page.prototype),
    c.prototype.renderElements = function() {
        this.objects.tetris = new b.Tetris,
        this.elements.control = a('[data-role="control"]', this.elements.root),
        this.options.gameAvailable = !0
    }
    ,
    c.prototype.constructElements = function() {
        this.objects.tetris.construct(),
        b.iSidebar.setInvert(!0)
    }
    ,
    c.prototype.bindElements = function() {
        this.objects.tetris.bind(),
        this.elements.control.on("click", '[data-role="control-newgame"]', a.proxy(this.startGame, this)),
        this.options.gameTimeout = setTimeout(a.proxy(this.startGame, this), 1e3),
        b.doc.on("tetris:gameEnded", a.proxy(this.onGameEnded, this))
    }
    ,
    c.prototype.unbindElements = function() {
        this.options.gameTimeout && clearTimeout(this.options.gameTimeout),
        this.elements.control.off(),
        this.objects.tetris.unbind(),
        b.doc.off("tetris:gameEnded", a.proxy(this.onGameEnded, this))
    }
    ,
    c.prototype.destructElements = function() {
        this.objects.tetris.destruct(),
        this.objects.tetris = null,
        this.elements.control = null,
        b.iSidebar.setInvert(!1)
    }
    ,
    c.prototype.startGame = function() {
        this.options.gameAvailable && (this.elements.control.removeClass("_newgame"),
        this.objects.tetris.start())
    }
    ,
    c.prototype.onGameEnded = function() {
        this.elements.control.addClass("_newgame"),
        this.options.gameAvailable = !0
    }
    ,
    c
}(jQuery, App),
App.PageGeneric = function(a, b) {
    var c = function(c) {
        var d = {
            alias: "js-generic",
            selector: ".js-generic",
            isHeaderInverted: !1,
            headerFactor: 2e3 / 450,
            hasNav: !1,
            navWidth: 0,
            scrollTop: 0,
            headerHeight: 0
        };
        d = a.extend(d, c),
        b.Page.call(this, d)
    };
    return c.prototype = Object.create(b.Page.prototype),
    c.prototype.renderElements = function() {
        if (this.elements.header = a('[data-role="pageheader"]', this.elements.root),
        this.options.isHeaderInverted = null != this.elements.root[0].getAttribute("data-invert"),
        this.elements.nav = a('[data-role="pagenav"]', this.elements.root),
        this.options.hasNav = this.elements.nav.length,
        this.options.hasNav) {
            this.elements.navCon = a('[data-role="pagenav-con"]', this.elements.root),
            this.elements.navFX = a('[data-role="pagenav-fx"]', this.elements.root);
            var c = b.iSidebar.getRoot();
            c.after(this.elements.navFX),
            this.options.isNavFixed = !1
        }
        if (this.elements.galleries = a(".js-gallery", this.elements.root),
        this.elements.galleries.length) {
            this.objects.galleries = {};
            for (var d = 0; d < this.elements.galleries.length; d++) {
                var e = this.elements.galleries.eq(d)
                  , f = this.options.alias + "-gallery" + d;
                e.attr({
                    id: f
                }),
                this.objects.galleries[f] = new b.Gallery({
                    selector: "#" + f,
                    alias: f
                })
            }
        }
        this.elements.socshares = a(".js-socshares", this.elements.root),
        this.options.hasSocShares = this.elements.socshares.length,
        this.options.hasSocShares && (this.objects.socshares = new b.SocShares({
            sharedata: {
                ttl: this.elements.root.data("sharettl"),
                txt: this.elements.root.data("sharetxt"),
                url: this.elements.root.data("shareurl"),
                img: this.elements.root.data("shareimg")
            }
        }))
    }
    ,
    c.prototype.constructElements = function() {
        if (this.elements.galleries.length)
            for (var a in this.objects.galleries)
                this.objects.galleries[a].construct();
        this.options.hasSocShares && this.objects.socshares.construct()
    }
    ,
    c.prototype.collectImages = function(a) {
        var b = [];
        return this.options.headerImageSrc = this.elements.header.data(a ? "src" : "srcsm"),
        b.push(this.options.headerImageSrc),
        b
    }
    ,
    c.prototype.applyImages = function(c) {
        this.elements.header.prepend(a("<DIV/>").addClass("bg").css({
            backgroundImage: "url(" + this.options.headerImageSrc + ")"
        }));
        var d = this.options.alias + "-header";
        this.elements.header.attr({
            id: d
        }),
        b.iSidebar.addBackImage({
            alias: "js-sidebar-backimage",
            factor: this.options.headerFactor,
            sample: "#" + d,
            src: this.options.headerImageSrc,
            create: c
        })
    }
    ,
    c.prototype.bindElements = function() {
        if (b.doc.on("win:resizeAfter", a.proxy(this.resize, this)),
        b.doc.on("page:scrolled", a.proxy(this.scroll, this)),
        this.options.hasNav && this.elements.navFX.on("click", '[data-role="popupanchor"]', a.proxy(this.clickPopupAnchor, this)),
        this.elements.galleries.length)
            for (var c in this.objects.galleries)
                this.objects.galleries[c].bind();
        this.options.hasSocShares && this.objects.socshares.bind()
    }
    ,
    c.prototype.unbindElements = function() {
        if (b.doc.off("win:resizeAfter", a.proxy(this.resize, this)),
        b.doc.off("page:scrolled", a.proxy(this.scroll, this)),
        this.options.hasNav && this.elements.navFX.off(),
        this.elements.galleries.length)
            for (var c in this.objects.galleries)
                this.objects.galleries[c].unbind();
        this.options.hasSocShares && this.objects.socshares.unbind()
    }
    ,
    c.prototype.destructElements = function() {
        if (this.elements.header = null,
        this.options.hasNav) {
            if (this.options.isNavFixed && (this.elements.navCon.appendTo(this.elements.nav),
            this.elements.nav.addClass("_fixed"),
            !b.isTouchDevice)) {
                var a = b.iSidebar.getRightOffset();
                a > 0 && this.elements.navCon.css({
                    right: this.options.navWidth > 1e3 ? a + "px" : 0
                })
            }
            this.elements.navFX.appendTo(this.elements.nav),
            this.elements.nav = null,
            this.elements.navCon = null,
            this.elements.navFX = null,
            this.options.hasNav = !1
        }
        if (this.elements.galleries.length) {
            for (var c in this.objects.galleries)
                this.objects.galleries[c].destruct(),
                this.objects.galleries[c] = null;
            this.objects.galleries = null,
            this.elements.galleries = null
        }
        this.options.hasSocShares && this.objects.socshares.destruct(),
        b.iSidebar.removeImages()
    }
    ,
    c.prototype.resize = function() {
        this.options.navWidth = this.elements.header.width(),
        this.options.headerHeight = this.elements.header.height(),
        this.resetHead(),
        this.options.hasNav && this.resetNav()
    }
    ,
    c.prototype.scroll = function(a, b) {
        this.options.scrollTop = b.scrollTop,
        this.resetHead(),
        this.options.hasNav && this.resetNav()
    }
    ,
    c.prototype.resetHead = function() {
        var a = this.options.scrollTop > this.options.headerHeight - b.iSidebar.getToggleHeight() / 2;
        b.iSidebar.setInvert(this.options.isHeaderInverted || a),
        b.iSidebar.setCollapse(a)
    }
    ,
    c.prototype.resetNav = function() {
        var a = b.iSidebar.getRightOffset();
        this.options.scrollTop > this.options.headerHeight ? this.options.isNavFixed || (this.options.isNavFixed = !0,
        this.elements.navCon.appendTo(this.elements.navFX),
        !b.isTouchDevice && a > 0 && this.elements.navFX.css({
            right: this.options.navWidth > 1e3 ? a + "px" : 0
        })) : this.options.isNavFixed && (this.options.isNavFixed = !1,
        this.elements.navCon.appendTo(this.elements.nav),
        !b.isTouchDevice && a > 0 && this.elements.navFX.css({
            right: "0"
        }))
    }
    ,
    c
}(jQuery, App),
App.PageAbout = function(a, b) {
    var c = function(c) {
        var d = {
            alias: "js-about",
            selector: ".js-about"
        };
        d = a.extend(d, c),
        b.PageGeneric.call(this, d)
    };
    c.prototype = Object.create(b.PageGeneric.prototype);
    var d = c.prototype.renderElements;
    c.prototype.renderElements = function() {
        d.apply(this, arguments),
        this.objects.buildings = new b.Buildings
    }
    ;
    var e = c.prototype.constructElements;
    c.prototype.constructElements = function() {
        e.apply(this, arguments),
        this.objects.buildings.construct()
    }
    ;
    var f = c.prototype.bindElements;
    c.prototype.bindElements = function() {
        f.apply(this, arguments),
        this.objects.buildings.bind()
    }
    ;
    var g = c.prototype.unbindElements;
    c.prototype.unbindElements = function() {
        g.apply(this, arguments),
        this.objects.buildings.unbind()
    }
    ;
    var h = c.prototype.destructElements;
    return c.prototype.destructElements = function() {
        h.apply(this, arguments),
        this.objects.buildings.destruct(),
        this.objects.buildings = null
    }
    ,
    c
}(jQuery, App),
App.PageContacts = function(a, b) {
    var c = function(c) {
        var d = {
            alias: "js-contacts",
            selector: ".js-contacts"
        };
        d = a.extend(d, c),
        b.PageGeneric.call(this, d)
    };
    c.prototype = Object.create(b.PageGeneric.prototype);
    var d = c.prototype.renderElements;
    c.prototype.renderElements = function() {
        if (d.apply(this, arguments),
        this.elements.form = a('[data-role="form"]', this.elements.content),
        this.elements.form.length) {
            var c = this.options.alias + "-form";
            this.elements.form.attr({
                id: c
            }),
            this.objects.form = new b.Form({
                selector: "#" + c,
                alias: c
            }),
            this.options.formAlias = c
        }
        this.elements.divisions = a('[data-role="divisions"]', this.elements.content)
    }
    ;
    var e = c.prototype.constructElements;
    c.prototype.constructElements = function() {
        if (e.apply(this, arguments),
        this.objects.form.construct(),
        this.elements.divisions.length) {
            var b = a(".b-contacts-divisions-item", this.elements.divisions).length;
            this.elements.divisions.addClass("_rows" + Math.ceil(b / 3))
        }
    }
    ;
    var f = c.prototype.bindElements;
    c.prototype.bindElements = function() {
        f.apply(this, arguments),
        this.elements.root.on("click", '[data-role="form-anchor"]', a.proxy(this.scrollToForm, this));
        var b = this;
        setTimeout(function() {
            "#feedback" == document.location.hash && b.scrollToForm()
        }, 500),
        this.objects.form.bind(),
        this.elements.divisions.length && this.elements.divisions.on("click", '[data-role="divisions-toggle"]', a.proxy(this.toggleDivisions, this))
    }
    ;
    var g = c.prototype.unbindElements;
    c.prototype.unbindElements = function() {
        g.apply(this, arguments),
        this.elements.root.off(),
        this.objects.form.unbind(),
        this.elements.divisions.length && this.elements.divisions.off()
    }
    ;
    var h = c.prototype.destructElements;
    return c.prototype.destructElements = function() {
        h.apply(this, arguments),
        this.objects.form.destruct(),
        this.objects.form = null,
        this.elements.form = null,
        this.elements.divisions = null
    }
    ,
    c.prototype.scrollToForm = function() {
        b.doc.trigger("page:scrollTo", {
            top: this.elements.form.position().top
        })
    }
    ,
    c.prototype.toggleDivisions = function() {
        this.elements.divisions.toggleClass("_opened")
    }
    ,
    c
}(jQuery, App),
App.PageMedia = function(a, b) {
    var c = function(c) {
        var d = {
            alias: "js-media",
            selector: ".js-media"
        };
        d = a.extend(d, c),
        b.PageGeneric.call(this, d)
    };
    c.prototype = Object.create(b.PageGeneric.prototype);
    var d = c.prototype.renderElements;
    c.prototype.renderElements = function() {
        if (d.apply(this, arguments),
        this.objects.medianews = new b.MediaNews,
        this.elements.videos = this.elements.root.find('[data-role="movie-video"]'),
        this.options.hasVideo = this.elements.videos.length > 0,
        this.options.hasVideo) {
            this.objects.embedvideo = {};
            for (var c, e = 0; e < this.elements.videos.length; e++) {
                c = this.elements.videos.eq(e);
                var f = this.options.alias + "-movie-video" + e;
                c.attr({
                    id: f
                }),
                this.objects.embedvideo[f] = new b.EmbedVideo({
                    selector: "#" + f,
                    alias: f
                })
            }
        }
        var g = a(".js-digestgallery");
        if (this.objects.digestgalleries = {},
        this.options.digestgalleriesPopups = {},
        g.length)
            for (var e = 0; e < g.length; e++) {
                var h = g.eq(e)
                  , f = "js-digestgallery" + e;
                h.attr({
                    id: f
                }),
                this.objects.digestgalleries[f] = new b.DigestGallery({
                    selector: "#" + f,
                    alias: f
                });
                var i = h.parents(".js-popup");
                this.options.digestgalleriesPopups[f] = i.data("name")
            }
    }
    ;
    var e = c.prototype.constructElements;
    c.prototype.constructElements = function() {
        e.apply(this, arguments),
        this.objects.medianews.construct();
        for (var a in this.objects.digestgalleries)
            this.objects.digestgalleries[a].construct()
    }
    ;
    var f = c.prototype.bindElements;
    c.prototype.bindElements = function() {
        if (f.apply(this, arguments),
        this.objects.medianews.bind(),
        this.options.hasVideo) {
            this.elements.videos.on("click", a.proxy(this.embedMovieVideo, this));
            for (var c in this.objects.embedvideo)
                this.objects.embedvideo[c].bind()
        }
        for (var c in this.objects.digestgalleries)
            this.objects.digestgalleries[c].bind();
        b.doc.on("popup:onshowBefore", a.proxy(this.popupOnShow, this))
    }
    ;
    var g = c.prototype.unbindElements;
    c.prototype.unbindElements = function() {
        if (g.apply(this, arguments),
        this.objects.medianews.unbind(),
        this.options.hasVideo) {
            this.elements.videos.off();
            for (var c in this.objects.embedvideo)
                this.objects.embedvideo[c].unbind()
        }
        for (var c in this.objects.digestgalleries)
            this.objects.digestgalleries[c].unbind();
        b.doc.off("popup:onshowBefore", a.proxy(this.popupOnShow, this))
    }
    ;
    var h = c.prototype.destructElements;
    c.prototype.destructElements = function() {
        if (h.apply(this, arguments),
        this.objects.medianews.destruct(),
        this.objects.medianews = null,
        this.options.hasVideo) {
            for (var a in this.objects.embedvideo)
                this.objects.embedvideo[a].destruct(),
                this.objects.embedvideo[a] = null;
            this.objects.embedvideo = null,
            this.elements.videos = null
        }
        for (var a in this.objects.digestgalleries)
            this.objects.digestgalleries[a].destruct(),
            this.objects.digestgalleries[a] = null
    }
    ;
    var i = c.prototype.resize;
    return c.prototype.resize = function() {
        i.apply(this, arguments),
        this.objects.medianews.setParentTop(this.options.headerHeight, !0)
    }
    ,
    c.prototype.embedMovieVideo = function(b) {
        b.stopPropagation();
        var c = a(b.target).closest('[data-role="movie-video"]');
        return this.objects.embedvideo[c.attr("id")].embed(),
        c.parents('[data-role="movie"]').addClass("_embed"),
        !1
    }
    ,
    c.prototype.popupOnShow = function(a, b) {
        for (var c in this.options.digestgalleriesPopups)
            this.options.digestgalleriesPopups[c] == b.name && this.objects.digestgalleries[c].reset()
    }
    ,
    c
}(jQuery, App),
App.PageNews = function(a, b) {
    var c = function(c) {
        var d = {
            alias: "js-news",
            selector: ".js-news"
        };
        d = a.extend(d, c),
        b.PageGeneric.call(this, d)
    };
    c.prototype = Object.create(b.PageGeneric.prototype);
    var d = c.prototype.renderElements;
    c.prototype.renderElements = function() {
        d.apply(this, arguments),
        this.objects.articles = new b.Articles;
        var c = a('[data-role="news-calendar"]');
        if (c.length) {
            var e = this.options.alias + "-calendar";
            c.attr({
                id: e
            }),
            this.objects.calendar = new b.Calendar({
                selector: "#" + e,
                alias: e
            });
            var f = c.parents(".js-popup");
            this.options.calendarPopupName = f.data("name")
        }
    }
    ;
    var e = c.prototype.constructElements;
    c.prototype.constructElements = function() {
        e.apply(this, arguments),
        this.objects.articles.construct(),
        this.objects.calendar.construct(),
        this.options.curDate = new Date,
        this.options.hasNav && (this.options.pageNavSelected = !0),
        a.when(this.loadDates()).done(a.proxy(this.setDates, this))
    }
    ;
    var f = c.prototype.bindElements;
    c.prototype.bindElements = function() {
        f.apply(this, arguments),
        this.objects.articles.bind(),
        this.objects.calendar.bind(),
        b.doc.on("popup:onshowBefore", a.proxy(this.popupOnShow, this)),
        b.doc.on("calendar:dateSelected", a.proxy(this.calendarDateSelected, this))
    }
    ;
    var g = c.prototype.unbindElements;
    c.prototype.unbindElements = function() {
        g.apply(this, arguments),
        this.objects.articles.unbind(),
        this.objects.calendar.unbind(),
        b.doc.off("popup:onshowBefore", a.proxy(this.popupOnShow, this)),
        b.doc.off("calendar:dateSelected", a.proxy(this.calendarDateSelected, this))
    }
    ;
    var h = c.prototype.destructElements;
    c.prototype.destructElements = function() {
        h.apply(this, arguments),
        this.objects.articles.destruct(),
        this.objects.articles = null,
        this.objects.calendar.destruct(),
        this.objects.calendar = null
    }
    ;
    var i = c.prototype.resize;
    return c.prototype.resize = function() {
        i.apply(this, arguments),
        this.objects.articles.setParentTop(this.options.headerHeight)
    }
    ,
    c.prototype.popupOnShow = function(a, b) {
        b.name == this.options.calendarPopupName && this.objects.calendar.setDate(this.options.curDate, !0)
    }
    ,
    c.prototype.calendarDateSelected = function() {
        if (this.objects.popups[this.options.calendarPopupName].hide(),
        this.options.hasNav && this.options.pageNavSelected) {
            this.options.pageNavSelected = !1,
            this.elements.navCon.find("LI._active").removeClass("_active");
            var b = this.elements.navCon.find('[data-name="calendar"]');
            b.length && b.parents("LI").addClass("_active")
        }
        this.options.resetTimeout && clearTimeout(this.options.resetTimeout),
        this.options.resetTimeout = setTimeout(a.proxy(this.resetDate, this), 500)
    }
    ,
    c.prototype.resetDate = function() {
        this.options.curDate = this.objects.calendar.getDate(),
        this.objects.articles.setDateOptions({
            formattedDate: this.objects.calendar.getFormattedDate(),
            titleDate: this.objects.calendar.getTitleDate(),
            isDaySelected: this.objects.calendar.getIsClicked()
        })
    }
    ,
    c.prototype.loadDates = function() {
        return this.objects.articles.loadDates()
    }
    ,
    c.prototype.setDates = function() {
        this.objects.calendar.setAvailableDates(this.objects.articles.getAllDates()),
        this.options.curDate = this.objects.calendar.getMaxDate()
    }
    ,
    c
}(jQuery, App),
App.PageProject = function(a, b) {
    var c = function(c) {
        var d = {
            alias: "js-project",
            selector: ".js-project",
            headerFactor: 2.5
        };
        d = a.extend(d, c),
        b.PageGeneric.call(this, d)
    };
    c.prototype = Object.create(b.PageGeneric.prototype);
    var d = c.prototype.renderElements;
    c.prototype.renderElements = function() {
        d.apply(this, arguments),
        this.objects.projects = new b.Projects,
        this.objects.articles = new b.Articles,
        this.options.hasProjects = 0 !== this.objects.projects.length,
        this.options.hasArticles = 0 !== this.objects.articles.length
    }
    ;
    var e = c.prototype.constructElements;
    c.prototype.constructElements = function() {
        e.apply(this, arguments),
        this.options.hasProjects && this.objects.projects.construct(),
        this.options.hasArticles && this.objects.articles.construct()
    }
    ;
    var f = c.prototype.bindElements;
    c.prototype.bindElements = function() {
        f.apply(this, arguments),
        this.options.hasProjects && this.objects.projects.bind(),
        this.options.hasArticles && this.objects.articles.bind()
    }
    ;
    var g = c.prototype.unbindElements;
    c.prototype.unbindElements = function() {
        g.apply(this, arguments),
        this.options.hasProjects && this.objects.projects.unbind(),
        this.options.hasArticles && this.objects.articles.unbind()
    }
    ;
    var h = c.prototype.destructElements;
    c.prototype.destructElements = function() {
        h.apply(this, arguments),
        this.options.hasProjects && this.objects.projects.destruct(),
        this.objects.projects = null,
        this.options.hasArticles && this.objects.articles.destruct(),
        this.objects.articles = null
    }
    ;
    var i = c.prototype.resize;
    return c.prototype.resize = function() {
        i.apply(this, arguments),
        this.options.hasArticles && this.objects.articles.setParentTop(this.options.headerHeight, !0)
    }
    ,
    c
}(jQuery, App),
App.PageRDNews = function(a, b) {
    var c = function(c) {
        var d = {
            alias: "js-rdnews",
            selector: ".js-rdnews"
        };
        d = a.extend(d, c),
        b.PageGeneric.call(this, d)
    };
    c.prototype = Object.create(b.PageGeneric.prototype);
    var d = c.prototype.renderElements;
    c.prototype.renderElements = function() {
        d.apply(this, arguments);
        var c = a(".js-digestgallery");
        if (this.objects.digestgalleries = {},
        this.options.digestgalleriesPopups = {},
        c.length)
            for (var e = 0; e < c.length; e++) {
                var f = c.eq(e)
                  , g = "js-digestgallery" + e;
                f.attr({
                    id: g
                }),
                this.objects.digestgalleries[g] = new b.DigestGallery({
                    selector: "#" + g,
                    alias: g
                });
                var h = f.parents(".js-popup");
                this.options.digestgalleriesPopups[g] = h.data("name")
            }
    }
    ;
    var e = c.prototype.constructElements;
    c.prototype.constructElements = function() {
        e.apply(this, arguments);
        for (var a in this.objects.digestgalleries)
            this.objects.digestgalleries[a].construct()
    }
    ;
    var f = c.prototype.bindElements;
    c.prototype.bindElements = function() {
        f.apply(this, arguments);
        for (var c in this.objects.digestgalleries)
            this.objects.digestgalleries[c].bind();
        b.doc.on("popup:onshowBefore", a.proxy(this.popupOnShow, this))
    }
    ;
    var g = c.prototype.unbindElements;
    c.prototype.unbindElements = function() {
        g.apply(this, arguments);
        for (var c in this.objects.digestgalleries)
            this.objects.digestgalleries[c].unbind();
        b.doc.off("popup:onshowBefore", a.proxy(this.popupOnShow, this))
    }
    ;
    var h = c.prototype.destructElements;
    return c.prototype.destructElements = function() {
        h.apply(this, arguments);
        for (var a in this.objects.digestgalleries)
            this.objects.digestgalleries[a].destruct(),
            this.objects.digestgalleries[a] = null
    }
    ,
    c.prototype.popupOnShow = function(a, b) {
        for (var c in this.options.digestgalleriesPopups)
            this.options.digestgalleriesPopups[c] == b.name && this.objects.digestgalleries[c].reset()
    }
    ,
    c
}(jQuery, App),
App.PageTeam = function(a, b) {
    var c = function(c) {
        var d = {
            alias: "js-team",
            selector: ".js-team"
        };
        d = a.extend(d, c),
        b.PageGeneric.call(this, d)
    };
    c.prototype = Object.create(b.PageGeneric.prototype);
    var d = c.prototype.renderElements;
    c.prototype.renderElements = function() {
        d.apply(this, arguments),
        this.objects.people = new b.People
    }
    ;
    var e = c.prototype.constructElements;
    c.prototype.constructElements = function() {
        e.apply(this, arguments),
        this.objects.people.construct()
    }
    ;
    var f = c.prototype.bindElements;
    c.prototype.bindElements = function() {
        f.apply(this, arguments),
        this.objects.people.bind()
    }
    ;
    var g = c.prototype.unbindElements;
    c.prototype.unbindElements = function() {
        g.apply(this, arguments),
        this.objects.people.unbind()
    }
    ;
    var h = c.prototype.destructElements;
    c.prototype.destructElements = function() {
        h.apply(this, arguments),
        this.objects.people.destruct(),
        this.objects.people = null
    }
    ;
    var i = c.prototype.resize;
    return c.prototype.resize = function() {
        i.apply(this, arguments),
        this.objects.people.setParentTop(this.options.headerHeight)
    }
    ,
    c
}(jQuery, App),
App.PageProjects = function(a, b) {
    var c = function(c) {
        var d = {
            alias: "js-projects",
            selector: ".js-projects"
        };
        d = a.extend(d, c),
        b.Page.call(this, d)
    };
    return c.prototype = Object.create(b.Page.prototype),
    c.prototype.renderElements = function() {
        this.elements.root.attr({
            id: this.options.alias
        }),
        this.objects.projects = new b.Projects({
            selector: "#" + this.options.alias,
            createSidebarImages: !0
        })
    }
    ,
    c.prototype.constructElements = function() {
        var a = b.iSidebar.getRoot();
        a.addClass("_projectspage"),
        this.objects.projects.construct()
    }
    ,
    c.prototype.bindElements = function() {
        this.objects.projects.bind()
    }
    ,
    c.prototype.unbindElements = function() {
        this.objects.projects.unbind()
    }
    ,
    c.prototype.destructElements = function() {
        var a = b.iSidebar.getRoot();
        a.removeClass("_projectspage"),
        this.objects.projects.destruct(),
        this.objects.projects = null
    }
    ,
    c
}(jQuery, App),
App.PageServices = function(a, b) {
    var c = function(c) {
        var d = {
            alias: "js-services",
            selector: ".js-services",
            isHeaderInverted: !1,
            headerImageSrc: [],
            scrollTop: 0,
            headerHeight: 0
        };
        d = a.extend(d, c),
        b.Page.call(this, d)
    };
    return c.prototype = Object.create(b.Page.prototype),
    c.prototype.renderElements = function() {
        this.elements.header = a('[data-role="pageheader"]', this.elements.root),
        this.options.isHeaderInverted = null != this.elements.root[0].getAttribute("data-invert"),
        this.elements.principles = a('[data-role="principles"]', this.elements.root),
        this.options.hasPrinciples = this.elements.principles.length,
        this.options.principlesLoaded = !1,
        this.options.principlesLoading = !1
    }
    ,
    c.prototype.collectImages = function(a) {
        var b = [];
        return this.options.headerImageSrc = a ? this.elements.header.data("src").split(";", 2) : this.elements.header.data("srcsm").split(";", 2),
        b.push(this.options.headerImageSrc),
        b
    }
    ,
    c.prototype.applyImages = function(c) {
        this.elements.header.find('[data-role="image-left"]').prepend(a("<DIV/>").addClass("bg").css({
            backgroundImage: "url(" + this.options.headerImageSrc[0] + ")"
        })),
        this.elements.header.find('[data-role="image-right"]').prepend(a("<DIV/>").addClass("bg").css({
            backgroundImage: "url(" + this.options.headerImageSrc[1] + ")"
        }));
        var d = this.options.alias + "-headerleft";
        this.elements.header.find('[data-role="image-left"]').attr({
            id: d
        }),
        b.iSidebar.addBackImage({
            alias: "js-sidebar-backimage",
            factor: 1,
            sample: "#" + d,
            src: this.options.headerImageSrc[0],
            blurHalf: !1,
            create: c
        })
    }
    ,
    c.prototype.bindElements = function() {
        this.elements.root.on("click", '[data-role="scrolldown"]', a.proxy(this.clickScrolldown, this)),
        b.doc.on("win:resizeAfter", a.proxy(this.resize, this)),
        b.doc.on("page:scrolled", a.proxy(this.scroll, this)),
        b.isTouchDevice || (this.elements.header.on("mouseenter", '[data-role="hover"]', a.proxy(this.hoverEnter, this)),
        this.elements.header.on("mouseleave", '[data-role="hover"]', a.proxy(this.hoverLeave, this)))
    }
    ,
    c.prototype.unbindElements = function() {
        b.doc.off("win:resizeAfter", a.proxy(this.resize, this)),
        b.doc.off("page:scrolled", a.proxy(this.scroll, this)),
        b.isTouchDevice || this.elements.header.off()
    }
    ,
    c.prototype.destructElements = function() {
        this.elements.header = null,
        this.elements.principles = null,
        b.iSidebar.removeImages()
    }
    ,
    c.prototype.hoverEnter = function(b) {
        var c = a(b.target).closest('[data-role="hover"]');
        this.elements.header.attr({
            "data-pos": c.data("pos")
        })
    }
    ,
    c.prototype.hoverLeave = function() {
        this.elements.header.removeAttr("data-pos")
    }
    ,
    c.prototype.clickScrolldown = function() {
        b.doc.trigger("page:scrollTo", {
            top: this.options.headerHeight
        })
    }
    ,
    c.prototype.resize = function() {
        this.options.headerHeight = this.elements.header.height(),
        this.resetHead(),
        this.options.hasPrinciples && (this.options.winHeight = b.win.height())
    }
    ,
    c.prototype.scroll = function(a, b) {
        if (this.options.scrollTop = b.scrollTop,
        this.resetHead(),
        this.options.hasPrinciples && !this.options.principlesLoaded && !this.options.principlesLoading) {
            var c = this.elements.principles[0].getBoundingClientRect();
            c.top < this.options.winHeight && this.loadPrinciplesImages()
        }
    }
    ,
    c.prototype.loadPrinciplesImages = function() {
        this.options.principlesLoading = !0;
        var b = [];
        this.elements.principles.find('[data-role="image"]').each(function() {
            b.push(a(this).data("src"))
        }),
        a.preload(b).done(a.proxy(this.loadPrinciplesImagesComplete, this))
    }
    ,
    c.prototype.loadPrinciplesImagesComplete = function() {
        this.options.principlesLoaded = !0,
        this.elements.principles.find('[data-role="image"]').each(function() {
            a(this).append('<img src="' + a(this).data("src") + '" alt="">').addClass("_loaded")
        })
    }
    ,
    c.prototype.resetHead = function() {
        var a = this.options.scrollTop > this.options.headerHeight - b.iSidebar.getToggleHeight() / 2;
        b.iSidebar.setInvert(this.options.isHeaderInverted || a)
    }
    ,
    c
}(jQuery, App),
function(a, b, c) {
    "use strict";
    function d() {
        return (new Date).getTime()
    }
    function e(b, c, d) {
        b._eventHandlers = b._eventHandlers || [{
            element: b.scroller,
            handler: function(a) {
                b.scroll(a)
            },
            type: "scroll"
        }, {
            element: b.root,
            handler: function() {
                b.update()
            },
            type: "transitionend animationend"
        }, {
            element: b.scroller,
            handler: function() {
                b.update()
            },
            type: "keyup"
        }, {
            element: b.bar,
            handler: function(a) {
                a.preventDefault(),
                b.selection(),
                b.drag.now = 1
            },
            type: "touchstart mousedown"
        }, {
            element: document,
            handler: function() {
                b.selection(1),
                b.drag.now = 0
            },
            type: "mouseup blur touchend"
        }, {
            element: document,
            handler: function(a) {
                2 != a.button && b._pos0(a)
            },
            type: "touchstart mousedown"
        }, {
            element: document,
            handler: function(a) {
                b.drag.now && b.drag(a)
            },
            type: "mousemove touchmove"
        }, {
            element: a,
            handler: function() {
                b.update()
            },
            type: "resize"
        }, {
            element: b.root,
            handler: function() {
                b.update()
            },
            type: "sizeChange"
        }],
        n(b._eventHandlers, function(a) {
            a.element && c(a.element, a.type, a.handler, d)
        })
    }
    function f(a, b, c) {
        var d = "data-baron-" + b;
        if ("on" == c)
            a.setAttribute(d, "inited");
        else {
            if ("off" != c)
                return a.getAttribute(d);
            a.removeAttribute(d)
        }
    }
    function g(a) {
        if (f(a.root, a.direction))
            throw new Error("Second baron initialization");
        var b = new p.prototype.constructor(a);
        return e(b, a.event, "on"),
        f(b.root, a.direction, "on"),
        b.update(),
        b
    }
    function h(a) {
        var b = {};
        a = a || {};
        for (var c in a)
            a.hasOwnProperty(c) && (b[c] = a[c]);
        return b
    }
    function i(a) {
        var b = h(a);
        b.direction = b.direction || "v";
        var c = a.event || function(a, c, d, e) {
            b.$(a)[e || "on"](c, d)
        }
        ;
        return b.event = function(a, b, d, e) {
            n(a, function(a) {
                c(a, b, d, e)
            })
        }
        ,
        b
    }
    function j(a) {
        if (this.events && this.events[a])
            for (var b = 0; b < this.events[a].length; b++) {
                var c = Array.prototype.slice.call(arguments, 1);
                this.events[a][b].apply(this, c)
            }
    }
    if (a) {
        var k = o
          , l = ["left", "top", "right", "bottom", "width", "height"]
          , m = {
            v: {
                x: "Y",
                pos: l[1],
                oppos: l[3],
                crossPos: l[0],
                crossOpPos: l[2],
                size: l[5],
                crossSize: l[4],
                client: "clientHeight",
                crossClient: "clientWidth",
                crossScroll: "scrollWidth",
                offset: "offsetHeight",
                crossOffset: "offsetWidth",
                offsetPos: "offsetTop",
                scroll: "scrollTop",
                scrollSize: "scrollHeight"
            },
            h: {
                x: "X",
                pos: l[0],
                oppos: l[2],
                crossPos: l[1],
                crossOpPos: l[3],
                size: l[4],
                crossSize: l[5],
                client: "clientWidth",
                crossClient: "clientHeight",
                crossScroll: "scrollHeight",
                offset: "offsetWidth",
                crossOffset: "offsetHeight",
                offsetPos: "offsetLeft",
                scroll: "scrollLeft",
                scrollSize: "scrollWidth"
            }
        }
          , n = function(b, d) {
            var e = 0;
            for ((b.length === c || b === a) && (b = [b]); b[e]; )
                d.call(this, b[e], e),
                e++
        }
          , o = function(b) {
            var c, d, e;
            b = b || {},
            e = b.$ || e || a.jQuery,
            c = this instanceof e,
            c ? b.root = d = this : d = e(b.root || b.scroller);
            var f = new o.fn.constructor(d,b,e);
            return f.autoUpdate && f.autoUpdate(),
            f
        };
        o.fn = {
            constructor: function(a, b, c) {
                var d = i(b);
                d.$ = c,
                n.call(this, a, function(a, b) {
                    var c = h(d);
                    d.root && d.scroller ? (c.scroller = d.$(d.scroller, a),
                    c.scroller.length || (c.scroller = a)) : c.scroller = a,
                    c.root = a,
                    this[b] = g(c),
                    this.length = b + 1
                }),
                this.params = d
            },
            dispose: function() {
                var a = this.params;
                this[0] && n(this, function(b) {
                    b.dispose(a)
                }),
                this.params = null
            },
            update: function() {
                for (var a = 0; this[a]; )
                    this[a].update.apply(this[a], arguments),
                    a++
            },
            baron: function(a) {
                return a.root = [],
                a.scroller = this.params.scroller,
                n.call(this, this, function(b) {
                    a.root.push(b.root)
                }),
                a.direction = "v" == this.params.direction ? "h" : "v",
                a._chain = !0,
                o(a)
            }
        };
        var p = {};
        p.prototype = {
            _debounce: function(a, b) {
                var c, e, f = this, g = function() {
                    if (f._disposed)
                        return clearTimeout(c),
                        void (c = f = null);
                    var h = d() - e;
                    b > h && h >= 0 ? c = setTimeout(g, b - h) : (c = null,
                    a())
                };
                return function() {
                    e = d(),
                    c || (c = setTimeout(g, b))
                }
            },
            constructor: function(a) {
                function b(a, b) {
                    return l(a, b)[0]
                }
                function e(a) {
                    var b = this.barMinSize || 20;
                    a > 0 && b > a && (a = b),
                    this.bar && l(this.bar).css(this.origin.size, parseInt(a, 10) + "px")
                }
                function f(a) {
                    if (this.bar) {
                        var b = l(this.bar).css(this.origin.pos)
                          , c = +a + "px";
                        c && c != b && l(this.bar).css(this.origin.pos, c)
                    }
                }
                function g() {
                    return p[this.origin.client] - this.barTopLimit - this.bar[this.origin.offset]
                }
                function h(a) {
                    return a * g.call(this) + this.barTopLimit
                }
                function i(a) {
                    return (a - this.barTopLimit) / g.call(this)
                }
                function k() {
                    return !1
                }
                var l, n, o, p, q, r, s, t, u, v, w;
                return v = u = d(),
                l = this.$ = a.$,
                this.event = a.event,
                this.events = {},
                this.root = a.root,
                this.scroller = b(a.scroller),
                this.bar = b(a.bar, this.root),
                p = this.track = b(a.track, this.root),
                !this.track && this.bar && (p = this.bar.parentNode),
                this.clipper = this.scroller.parentNode,
                this.direction = a.direction,
                this.origin = m[this.direction],
                this.barOnCls = a.barOnCls || "_baron",
                this.scrollingCls = a.scrollingCls,
                this.barTopLimit = 0,
                t = 1e3 * a.pause || 0,
                this.cursor = function(a) {
                    return a["client" + this.origin.x] || (((a.originalEvent || a).touches || {})[0] || {})["page" + this.origin.x]
                }
                ,
                this.pos = function(a) {
                    var b = "page" + this.origin.x + "Offset"
                      , d = this.scroller[b] ? b : this.origin.scroll;
                    return a !== c && (this.scroller[d] = a),
                    this.scroller[d]
                }
                ,
                this.rpos = function(a) {
                    var b, c = this.scroller[this.origin.scrollSize] - this.scroller[this.origin.client];
                    return b = a ? this.pos(a * c) : this.pos(),
                    b / (c || 1)
                }
                ,
                this.barOn = function(a) {
                    this.barOnCls && (a || this.scroller[this.origin.client] >= this.scroller[this.origin.scrollSize] ? l(this.root).hasClass(this.barOnCls) && l(this.root).removeClass(this.barOnCls) : l(this.root).hasClass(this.barOnCls) || l(this.root).addClass(this.barOnCls))
                }
                ,
                this._pos0 = function(a) {
                    o = this.cursor(a) - n
                }
                ,
                this.drag = function(a) {
                    this.scroller[this.origin.scroll] = i.call(this, this.cursor(a) - o) * (this.scroller[this.origin.scrollSize] - this.scroller[this.origin.client])
                }
                ,
                this.selection = function(a) {
                    this.event(document, "selectpos selectstart", k, a ? "off" : "on")
                }
                ,
                this.resize = function() {
                    function b() {
                        var b, e, f, g, h;
                        c.barOn(),
                        e = c.scroller[c.origin.crossClient],
                        f = c.scroller[c.origin.crossOffset],
                        b = f - e,
                        f && (a.freeze && !c.clipper.style[c.origin.crossSize] && (g = l(c.clipper).css(c.origin.crossSize),
                        h = c.clipper[c.origin.crossClient] - b + "px",
                        g != h && l(c.clipper).css(c.origin.crossSize, h)),
                        g = l(c.clipper).css(c.origin.crossSize),
                        h = c.clipper[c.origin.crossClient] + b + "px",
                        g != h && l(c.scroller).css(c.origin.crossSize, h)),
                        Array.prototype.unshift.call(arguments, "resize"),
                        j.apply(c, arguments),
                        v = d()
                    }
                    var c = this
                      , e = 0;
                    d() - v < t && (clearTimeout(q),
                    e = t),
                    e ? q = setTimeout(b, e) : b()
                }
                ,
                this.updatePositions = function() {
                    var a, b = this;
                    b.bar && (a = (p[b.origin.client] - b.barTopLimit) * b.scroller[b.origin.client] / b.scroller[b.origin.scrollSize],
                    parseInt(w, 10) != parseInt(a, 10) && (e.call(b, a),
                    w = a),
                    n = h.call(b, b.rpos()),
                    f.call(b, n)),
                    Array.prototype.unshift.call(arguments, "scroll"),
                    j.apply(b, arguments),
                    u = d()
                }
                ,
                this.scroll = function() {
                    var a = 0
                      , b = this;
                    d() - u < t && (clearTimeout(r),
                    a = t),
                    d() - u < t && (clearTimeout(r),
                    a = t),
                    a ? r = setTimeout(function() {
                        b.updatePositions()
                    }, a) : b.updatePositions(),
                    b.scrollingCls && (s || this.$(this.scroller).addClass(this.scrollingCls),
                    clearTimeout(s),
                    s = setTimeout(function() {
                        b.$(b.scroller).removeClass(b.scrollingCls),
                        s = c
                    }, 300))
                }
                ,
                this
            },
            update: function(a) {
                return j.call(this, "upd", a),
                this.resize(1),
                this.updatePositions(),
                this
            },
            dispose: function(a) {
                e(this, this.event, "off"),
                f(this.root, a.direction, "off"),
                b(this.scroller).css(this.origin.crossSize, ""),
                this.barOn(!0),
                j.call(this, "dispose"),
                this._disposed = !0
            },
            on: function(a, b, c) {
                for (var d = a.split(" "), e = 0; e < d.length; e++)
                    "init" == d[e] ? b.call(this, c) : (this.events[d[e]] = this.events[d[e]] || [],
                    this.events[d[e]].push(function(a) {
                        b.call(this, a || c)
                    }))
            }
        },
        o.fn.constructor.prototype = o.fn,
        p.prototype.constructor.prototype = p.prototype,
        o.noConflict = function() {
            return a.baron = k,
            o
        }
        ,
        o.version = "0.7.10",
        b && b.fn && (b.fn.baron = o),
        a.baron = o,
        a.module && module.exports && (module.exports = o.noConflict())
    }
}(window, window.$),
function(a, b) {
    var c = function(a) {
        function c(a, c, d) {
            var e = 1 == d ? "pos" : "oppos";
            g < (h.minView || 0) && (c = b),
            this.$(f[a]).css(this.origin.pos, "").css(this.origin.oppos, "").removeClass(h.outside),
            c !== b && (c += "px",
            this.$(f[a]).css(this.origin[e], c).addClass(h.outside))
        }
        function d(a) {
            try {
                i = document.createEvent("WheelEvent"),
                i.initWebKitWheelEvent(a.originalEvent.wheelDeltaX, a.originalEvent.wheelDeltaY),
                m.dispatchEvent(i),
                a.preventDefault()
            } catch (a) {}
        }
        function e(a) {
            var b;
            for (var c in a)
                h[c] = a[c];
            if (f = this.$(h.elements, this.scroller)) {
                g = this.scroller[this.origin.client];
                for (var e = 0; e < f.length; e++)
                    b = {},
                    b[this.origin.size] = f[e][this.origin.offset],
                    f[e].parentNode !== this.scroller && this.$(f[e].parentNode).css(b),
                    b = {},
                    b[this.origin.crossSize] = f[e].parentNode[this.origin.crossClient],
                    this.$(f[e]).css(b),
                    g -= f[e][this.origin.offset],
                    l[e] = f[e].parentNode[this.origin.offsetPos],
                    j[e] = j[e - 1] || 0,
                    k[e] = k[e - 1] || Math.min(l[e], 0),
                    f[e - 1] && (j[e] += f[e - 1][this.origin.offset],
                    k[e] += f[e - 1][this.origin.offset]),
                    (0 != e || 0 != l[e]) && (this.event(f[e], "mousewheel", d, "off"),
                    this.event(f[e], "mousewheel", d));
                h.limiter && f[0] && (this.track && this.track != this.scroller ? (b = {},
                b[this.origin.pos] = f[0].parentNode[this.origin.offset],
                this.$(this.track).css(b)) : this.barTopLimit = f[0].parentNode[this.origin.offset],
                this.scroll()),
                h.limiter === !1 && (this.barTopLimit = 0)
            }
            var i = {
                element: f,
                handler: function() {
                    for (var a, b = o(this)[0].parentNode, c = b.offsetTop, d = 0; d < f.length; d++)
                        f[d] === this && (a = d);
                    var e = c - j[a];
                    h.scroll ? h.scroll({
                        x1: p.scroller.scrollTop,
                        x2: e
                    }) : p.scroller.scrollTop = e
                },
                type: "click"
            };
            h.clickable && (this._eventHandlers.push(i),
            n(i.element, i.type, i.handler, "on"))
        }
        var f, g, h = {
            outside: "",
            inside: "",
            before: "",
            after: "",
            past: "",
            future: "",
            radius: 0,
            minView: 0
        }, j = [], k = [], l = [], m = this.scroller, n = this.event, o = this.$, p = this;
        this.on("init", e, a);
        var q = []
          , r = [];
        this.on("init scroll", function() {
            var a, d, e;
            if (f) {
                for (var i, m = 0; m < f.length; m++)
                    a = 0,
                    l[m] - this.pos() < k[m] + h.radius ? (a = 1,
                    d = j[m]) : l[m] - this.pos() > k[m] + g - h.radius ? (a = 2,
                    d = this.scroller[this.origin.client] - f[m][this.origin.offset] - j[m] - g) : (a = 3,
                    d = b),
                    e = !1,
                    (l[m] - this.pos() < k[m] || l[m] - this.pos() > k[m] + g) && (e = !0),
                    (a != q[m] || e != r[m]) && (c.call(this, m, d, a),
                    q[m] = a,
                    r[m] = e,
                    i = !0);
                if (i)
                    for (m = 0; m < f.length; m++)
                        1 == q[m] && h.past && this.$(f[m]).addClass(h.past).removeClass(h.future),
                        2 == q[m] && h.future && this.$(f[m]).addClass(h.future).removeClass(h.past),
                        3 == q[m] ? ((h.future || h.past) && this.$(f[m]).removeClass(h.past).removeClass(h.future),
                        h.inside && this.$(f[m]).addClass(h.inside)) : h.inside && this.$(f[m]).removeClass(h.inside),
                        q[m] != q[m + 1] && 1 == q[m] && h.before ? this.$(f[m]).addClass(h.before).removeClass(h.after) : q[m] != q[m - 1] && 2 == q[m] && h.after ? this.$(f[m]).addClass(h.after).removeClass(h.before) : this.$(f[m]).removeClass(h.before).removeClass(h.after),
                        h.grad && (r[m] ? this.$(f[m]).addClass(h.grad) : this.$(f[m]).removeClass(h.grad))
            }
        }),
        this.on("resize upd", function(a) {
            e.call(this, a && a.fix)
        })
    };
    baron.fn.fix = function(a) {
        for (var b = 0; this[b]; )
            c.call(this[b], a),
            b++;
        return this
    }
}(window),
function() {
    var a = function(a) {
        var b, c, d, e, f, g = this;
        e = a.screen || .9,
        a.forward && (b = this.$(a.forward, this.clipper),
        f = {
            element: b,
            handler: function() {
                var b = g.pos() - a.delta || 30;
                g.pos(b)
            },
            type: "click"
        },
        this._eventHandlers.push(f),
        this.event(f.element, f.type, f.handler, "on")),
        a.backward && (c = this.$(a.backward, this.clipper),
        f = {
            element: c,
            handler: function() {
                var b = g.pos() + a.delta || 30;
                g.pos(b)
            },
            type: "click"
        },
        this._eventHandlers.push(f),
        this.event(f.element, f.type, f.handler, "on")),
        a.track && (d = a.track === !0 ? this.track : this.$(a.track, this.clipper)[0],
        d && (f = {
            element: d,
            handler: function(a) {
                var b = a["offset" + g.origin.x]
                  , c = g.bar[g.origin.offsetPos]
                  , d = 0;
                c > b ? d = -1 : b > c + g.bar[g.origin.offset] && (d = 1);
                var f = g.pos() + d * e * g.scroller[g.origin.client];
                g.pos(f)
            },
            type: "mousedown"
        },
        this._eventHandlers.push(f),
        this.event(f.element, f.type, f.handler, "on")))
    };
    baron.fn.controls = function(b) {
        for (var c = 0; this[c]; )
            a.call(this[c], b),
            c++;
        return this
    }
}(window),
function() {
    var a = function(a) {
        function b() {
            return r.scroller[r.origin.scroll] + r.scroller[r.origin.offset]
        }
        function c() {
            return r.scroller[r.origin.scrollSize]
        }
        function d() {
            return r.scroller[r.origin.client]
        }
        function e(a, b) {
            var c = 5e-4 * a;
            return Math.floor(b - c * (a + 550))
        }
        function f(a) {
            k = a,
            a ? (g(),
            h = setInterval(g, 200)) : clearInterval(h)
        }
        function g() {
            var g, h, k = {}, w = b(), x = c(), y = 1 == s;
            if (h = 0,
            s > 0 && (h = 40),
            g = e(u, h),
            w >= x - u && s > -1 ? y && (u += g) : u = 0,
            0 > u && (u = 0),
            k[m] = u + "px",
            d() <= c()) {
                r.$(l).css(k);
                for (var z = 0; z < p.length; z++)
                    r.$(p[z].self).css(p[z].property, Math.min(u / n * 100, 100) + "%")
            }
            q && u && r.$(r.root).addClass(q),
            0 == u && a.onCollapse && a.onCollapse(),
            s = 0,
            i = setTimeout(function() {
                s = -1
            }, v),
            o && u > n && !j && (o(),
            j = !0),
            0 == u ? t++ : t = 0,
            t > 1 && (f(!1),
            j = !1,
            q && r.$(r.root).removeClass(q))
        }
        var h, i, j, k, l = this.$(a.block), m = a.size || this.origin.size, n = a.limit || 80, o = a.onExpand, p = a.elements || [], q = a.inProgress || "", r = this, s = 0, t = 0, u = 0, v = a.waiting || 500;
        this.on("init", function() {
            f(!0)
        }),
        this.on("dispose", function() {
            f(!1)
        }),
        this.event(this.scroller, "mousewheel DOMMouseScroll", function(a) {
            var d = a.wheelDelta < 0 || a.originalEvent && a.originalEvent.wheelDelta < 0 || a.detail > 0;
            d && (s = 1,
            clearTimeout(i),
            !k && b() >= c() && f(!0))
        })
    };
    baron.fn.pull = function(b) {
        for (var c = 0; this[c]; )
            a.call(this[c], b),
            c++;
        return this
    }
}(window),
function(a) {
    var b = a.MutationObserver || a.WebKitMutationObserver || a.MozMutationObserver || null
      , c = function() {
        function a() {
            f.root[f.origin.offset] ? d() : c()
        }
        function c() {
            e || (e = setInterval(function() {
                f.root[f.origin.offset] && (d(),
                f.update())
            }, 300))
        }
        function d() {
            clearInterval(e),
            e = null
        }
        var e, f = this, g = f._debounce(function() {
            f.update()
        }, 300);
        this._observer = new b(function() {
            a(),
            f.update(),
            g()
        }
        ),
        this.on("init", function() {
            f._observer.observe(f.root, {
                childList: !0,
                subtree: !0,
                characterData: !0
            }),
            a()
        }),
        this.on("dispose", function() {
            f._observer.disconnect(),
            d(),
            delete f._observer
        })
    };
    baron.fn.autoUpdate = function(a) {
        if (!b)
            return this;
        for (var d = 0; this[d]; )
            c.call(this[d], a),
            d++;
        return this
    }
}(window),
function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function(a) {
    function b(a) {
        return h.raw ? a : encodeURIComponent(a)
    }
    function c(a) {
        return h.raw ? a : decodeURIComponent(a)
    }
    function d(a) {
        return b(h.json ? JSON.stringify(a) : String(a))
    }
    function e(a) {
        0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return a = decodeURIComponent(a.replace(g, " ")),
            h.json ? JSON.parse(a) : a
        } catch (b) {}
    }
    function f(b, c) {
        var d = h.raw ? b : e(b);
        return a.isFunction(c) ? c(d) : d
    }
    var g = /\+/g
      , h = a.cookie = function(e, g, i) {
        if (arguments.length > 1 && !a.isFunction(g)) {
            if (i = a.extend({}, h.defaults, i),
            "number" == typeof i.expires) {
                var j = i.expires
                  , k = i.expires = new Date;
                k.setTime(+k + 864e5 * j)
            }
            return document.cookie = [b(e), "=", d(g), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join("")
        }
        for (var l = e ? void 0 : {}, m = document.cookie ? document.cookie.split("; ") : [], n = 0, o = m.length; o > n; n++) {
            var p = m[n].split("=")
              , q = c(p.shift())
              , r = p.join("=");
            if (e && e === q) {
                l = f(r, g);
                break
            }
            e || void 0 === (r = f(r)) || (l[q] = r)
        }
        return l
    }
    ;
    h.defaults = {},
    a.removeCookie = function(b, c) {
        return void 0 === a.cookie(b) ? !1 : (a.cookie(b, "", a.extend({}, c, {
            expires: -1
        })),
        !a.cookie(b))
    }
}),
function(a, b) {
    "use strict";
    var c = a.History = a.History || {}
      , d = a.jQuery;
    if ("undefined" != typeof c.Adapter)
        throw new Error("History.js Adapter has already been loaded...");
    c.Adapter = {
        bind: function(a, b, c) {
            d(a).bind(b, c)
        },
        trigger: function(a, b, c) {
            d(a).trigger(b, c)
        },
        extractEventData: function(a, c, d) {
            var e = c && c.originalEvent && c.originalEvent[a] || d && d[a] || b;
            return e
        },
        onDomLoad: function(a) {
            d(a)
        }
    },
    "undefined" != typeof c.init && c.init()
}(window),
function(a, b) {
    "use strict";
    var c = a.console || b
      , d = a.document
      , e = a.navigator
      , f = !1
      , g = a.setTimeout
      , h = a.clearTimeout
      , i = a.setInterval
      , j = a.clearInterval
      , k = a.JSON
      , l = a.alert
      , m = a.History = a.History || {}
      , n = a.history;
    try {
        f = a.sessionStorage,
        f.setItem("TEST", "1"),
        f.removeItem("TEST")
    } catch (o) {
        f = !1
    }
    if (k.stringify = k.stringify || k.encode,
    k.parse = k.parse || k.decode,
    "undefined" != typeof m.init)
        throw new Error("History.js Core has already been loaded...");
    m.init = function() {
        return "undefined" == typeof m.Adapter ? !1 : ("undefined" != typeof m.initCore && m.initCore(),
        "undefined" != typeof m.initHtml4 && m.initHtml4(),
        !0)
    }
    ,
    m.initCore = function() {
        if ("undefined" != typeof m.initCore.initialized)
            return !1;
        if (m.initCore.initialized = !0,
        m.options = m.options || {},
        m.options.hashChangeInterval = m.options.hashChangeInterval || 100,
        m.options.safariPollInterval = m.options.safariPollInterval || 500,
        m.options.doubleCheckInterval = m.options.doubleCheckInterval || 500,
        m.options.disableSuid = m.options.disableSuid || !1,
        m.options.storeInterval = m.options.storeInterval || 1e3,
        m.options.busyDelay = m.options.busyDelay || 250,
        m.options.debug = m.options.debug || !1,
        m.options.initialTitle = m.options.initialTitle || d.title,
        m.options.html4Mode = m.options.html4Mode || !1,
        m.options.delayInit = m.options.delayInit || !1,
        m.intervalList = [],
        m.clearAllIntervals = function() {
            var a, b = m.intervalList;
            if ("undefined" != typeof b && null !== b) {
                for (a = 0; a < b.length; a++)
                    j(b[a]);
                m.intervalList = null
            }
        }
        ,
        m.debug = function() {
            m.options.debug && m.log.apply(m, arguments)
        }
        ,
        m.log = function() {
            var a, b, e, f, g, h = !("undefined" == typeof c || "undefined" == typeof c.log || "undefined" == typeof c.log.apply), i = d.getElementById("log");
            for (h ? (f = Array.prototype.slice.call(arguments),
            a = f.shift(),
            "undefined" != typeof c.debug ? c.debug.apply(c, [a, f]) : c.log.apply(c, [a, f])) : a = "\n" + arguments[0] + "\n",
            b = 1,
            e = arguments.length; e > b; ++b) {
                if (g = arguments[b],
                "object" == typeof g && "undefined" != typeof k)
                    try {
                        g = k.stringify(g)
                    } catch (j) {}
                a += "\n" + g + "\n"
            }
            return i ? (i.value += a + "\n-----\n",
            i.scrollTop = i.scrollHeight - i.clientHeight) : h || l(a),
            !0
        }
        ,
        m.getInternetExplorerMajorVersion = function() {
            var a = m.getInternetExplorerMajorVersion.cached = "undefined" != typeof m.getInternetExplorerMajorVersion.cached ? m.getInternetExplorerMajorVersion.cached : function() {
                for (var a = 3, b = d.createElement("div"), c = b.getElementsByTagName("i"); (b.innerHTML = "\x3c!--[if gt IE " + ++a + "]><i></i><![endif]--\x3e") && c[0]; )
                    ;
                return a > 4 ? a : !1
            }();
            return a
        }
        ,
        m.isInternetExplorer = function() {
            var a = m.isInternetExplorer.cached = "undefined" != typeof m.isInternetExplorer.cached ? m.isInternetExplorer.cached : Boolean(m.getInternetExplorerMajorVersion());
            return a
        }
        ,
        m.emulated = m.options.html4Mode ? {
            pushState: !0,
            hashChange: !0
        } : {
            pushState: !Boolean(a.history && a.history.pushState && a.history.replaceState && !(/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(e.userAgent) || /AppleWebKit\/5([0-2]|3[0-2])/i.test(e.userAgent))),
            hashChange: Boolean(!("onhashchange"in a || "onhashchange"in d) || m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 8)
        },
        m.enabled = !m.emulated.pushState,
        m.bugs = {
            setHash: Boolean(!m.emulated.pushState && "Apple Computer, Inc." === e.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),
            safariPoll: Boolean(!m.emulated.pushState && "Apple Computer, Inc." === e.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),
            ieDoubleCheck: Boolean(m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 8),
            hashEscape: Boolean(m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 7)
        },
        m.isEmptyObject = function(a) {
            for (var b in a)
                if (a.hasOwnProperty(b))
                    return !1;
            return !0
        }
        ,
        m.cloneObject = function(a) {
            var b, c;
            return a ? (b = k.stringify(a),
            c = k.parse(b)) : c = {},
            c
        }
        ,
        m.getRootUrl = function() {
            var a = d.location.protocol + "//" + (d.location.hostname || d.location.host);
            return d.location.port && (a += ":" + d.location.port),
            a += "/"
        }
        ,
        m.getBaseHref = function() {
            var a = d.getElementsByTagName("base")
              , b = null
              , c = "";
            return 1 === a.length && (b = a[0],
            c = b.href.replace(/[^\/]+$/, "")),
            c = c.replace(/\/+$/, ""),
            c && (c += "/"),
            c
        }
        ,
        m.getBaseUrl = function() {
            var a = m.getBaseHref() || m.getBasePageUrl() || m.getRootUrl();
            return a
        }
        ,
        m.getPageUrl = function() {
            var a, b = m.getState(!1, !1), c = (b || {}).url || m.getLocationHref();
            return a = c.replace(/\/+$/, "").replace(/[^\/]+$/, function(a) {
                return /\./.test(a) ? a : a + "/"
            })
        }
        ,
        m.getBasePageUrl = function() {
            var a = m.getLocationHref().replace(/[#\?].*/, "").replace(/[^\/]+$/, function(a) {
                return /[^\/]$/.test(a) ? "" : a
            }).replace(/\/+$/, "") + "/";
            return a
        }
        ,
        m.getFullUrl = function(a, b) {
            var c = a
              , d = a.substring(0, 1);
            return b = "undefined" == typeof b ? !0 : b,
            /[a-z]+\:\/\//.test(a) || (c = "/" === d ? m.getRootUrl() + a.replace(/^\/+/, "") : "#" === d ? m.getPageUrl().replace(/#.*/, "") + a : "?" === d ? m.getPageUrl().replace(/[\?#].*/, "") + a : b ? m.getBaseUrl() + a.replace(/^(\.\/)+/, "") : m.getBasePageUrl() + a.replace(/^(\.\/)+/, "")),
            c.replace(/\#$/, "")
        }
        ,
        m.getShortUrl = function(a) {
            var b = a
              , c = m.getBaseUrl()
              , d = m.getRootUrl();
            return m.emulated.pushState && (b = b.replace(c, "")),
            b = b.replace(d, "/"),
            m.isTraditionalAnchor(b) && (b = "./" + b),
            b = b.replace(/^(\.\/)+/g, "./").replace(/\#$/, "")
        }
        ,
        m.getLocationHref = function(a) {
            return a = a || d,
            a.URL === a.location.href ? a.location.href : a.location.href === decodeURIComponent(a.URL) ? a.URL : a.location.hash && decodeURIComponent(a.location.href.replace(/^[^#]+/, "")) === a.location.hash ? a.location.href : -1 == a.URL.indexOf("#") && -1 != a.location.href.indexOf("#") ? a.location.href : a.URL || a.location.href
        }
        ,
        m.store = {},
        m.idToState = m.idToState || {},
        m.stateToId = m.stateToId || {},
        m.urlToId = m.urlToId || {},
        m.storedStates = m.storedStates || [],
        m.savedStates = m.savedStates || [],
        m.normalizeStore = function() {
            m.store.idToState = m.store.idToState || {},
            m.store.urlToId = m.store.urlToId || {},
            m.store.stateToId = m.store.stateToId || {}
        }
        ,
        m.getState = function(a, b) {
            "undefined" == typeof a && (a = !0),
            "undefined" == typeof b && (b = !0);
            var c = m.getLastSavedState();
            return !c && b && (c = m.createStateObject()),
            a && (c = m.cloneObject(c),
            c.url = c.cleanUrl || c.url),
            c
        }
        ,
        m.getIdByState = function(a) {
            var b, c = m.extractId(a.url);
            if (!c)
                if (b = m.getStateString(a),
                "undefined" != typeof m.stateToId[b])
                    c = m.stateToId[b];
                else if ("undefined" != typeof m.store.stateToId[b])
                    c = m.store.stateToId[b];
                else {
                    for (; ; )
                        if (c = (new Date).getTime() + String(Math.random()).replace(/\D/g, ""),
                        "undefined" == typeof m.idToState[c] && "undefined" == typeof m.store.idToState[c])
                            break;
                    m.stateToId[b] = c,
                    m.idToState[c] = a
                }
            return c
        }
        ,
        m.normalizeState = function(a) {
            var b, c;
            return a && "object" == typeof a || (a = {}),
            "undefined" != typeof a.normalized ? a : (a.data && "object" == typeof a.data || (a.data = {}),
            b = {},
            b.normalized = !0,
            b.title = a.title || "",
            b.url = m.getFullUrl(a.url ? a.url : m.getLocationHref()),
            b.hash = m.getShortUrl(b.url),
            b.data = m.cloneObject(a.data),
            b.id = m.getIdByState(b),
            b.cleanUrl = b.url.replace(/\??\&_suid.*/, ""),
            b.url = b.cleanUrl,
            c = !m.isEmptyObject(b.data),
            (b.title || c) && m.options.disableSuid !== !0 && (b.hash = m.getShortUrl(b.url).replace(/\??\&_suid.*/, ""),
            /\?/.test(b.hash) || (b.hash += "?"),
            b.hash += "&_suid=" + b.id),
            b.hashedUrl = m.getFullUrl(b.hash),
            (m.emulated.pushState || m.bugs.safariPoll) && m.hasUrlDuplicate(b) && (b.url = b.hashedUrl),
            b)
        }
        ,
        m.createStateObject = function(a, b, c) {
            var d = {
                data: a,
                title: b,
                url: c
            };
            return d = m.normalizeState(d)
        }
        ,
        m.getStateById = function(a) {
            a = String(a);
            var c = m.idToState[a] || m.store.idToState[a] || b;
            return c
        }
        ,
        m.getStateString = function(a) {
            var b, c, d;
            return b = m.normalizeState(a),
            c = {
                data: b.data,
                title: a.title,
                url: a.url
            },
            d = k.stringify(c)
        }
        ,
        m.getStateId = function(a) {
            var b, c;
            return b = m.normalizeState(a),
            c = b.id
        }
        ,
        m.getHashByState = function(a) {
            var b, c;
            return b = m.normalizeState(a),
            c = b.hash
        }
        ,
        m.extractId = function(a) {
            var b, c, d, e;
            return e = -1 != a.indexOf("#") ? a.split("#")[0] : a,
            c = /(.*)\&_suid=([0-9]+)$/.exec(e),
            d = c ? c[1] || a : a,
            b = c ? String(c[2] || "") : "",
            b || !1
        }
        ,
        m.isTraditionalAnchor = function(a) {
            var b = !/[\/\?\.]/.test(a);
            return b
        }
        ,
        m.extractState = function(a, b) {
            var c, d, e = null;
            return b = b || !1,
            c = m.extractId(a),
            c && (e = m.getStateById(c)),
            e || (d = m.getFullUrl(a),
            c = m.getIdByUrl(d) || !1,
            c && (e = m.getStateById(c)),
            e || !b || m.isTraditionalAnchor(a) || (e = m.createStateObject(null, null, d))),
            e
        }
        ,
        m.getIdByUrl = function(a) {
            var c = m.urlToId[a] || m.store.urlToId[a] || b;
            return c
        }
        ,
        m.getLastSavedState = function() {
            return m.savedStates[m.savedStates.length - 1] || b
        }
        ,
        m.getLastStoredState = function() {
            return m.storedStates[m.storedStates.length - 1] || b
        }
        ,
        m.hasUrlDuplicate = function(a) {
            var b, c = !1;
            return b = m.extractState(a.url),
            c = b && b.id !== a.id
        }
        ,
        m.storeState = function(a) {
            return m.urlToId[a.url] = a.id,
            m.storedStates.push(m.cloneObject(a)),
            a
        }
        ,
        m.isLastSavedState = function(a) {
            var b, c, d, e = !1;
            return m.savedStates.length && (b = a.id,
            c = m.getLastSavedState(),
            d = c.id,
            e = b === d),
            e
        }
        ,
        m.saveState = function(a) {
            return m.isLastSavedState(a) ? !1 : (m.savedStates.push(m.cloneObject(a)),
            !0)
        }
        ,
        m.getStateByIndex = function(a) {
            var b = null;
            return b = "undefined" == typeof a ? m.savedStates[m.savedStates.length - 1] : 0 > a ? m.savedStates[m.savedStates.length + a] : m.savedStates[a]
        }
        ,
        m.getCurrentIndex = function() {
            var a = null;
            return a = m.savedStates.length < 1 ? 0 : m.savedStates.length - 1
        }
        ,
        m.getHash = function(a) {
            var b, c = m.getLocationHref(a);
            return b = m.getHashByUrl(c)
        }
        ,
        m.unescapeHash = function(a) {
            var b = m.normalizeHash(a);
            return b = decodeURIComponent(b)
        }
        ,
        m.normalizeHash = function(a) {
            var b = a.replace(/[^#]*#/, "").replace(/#.*/, "");
            return b
        }
        ,
        m.setHash = function(a, b) {
            var c, e;
            return b !== !1 && m.busy() ? (m.pushQueue({
                scope: m,
                callback: m.setHash,
                args: arguments,
                queue: b
            }),
            !1) : (m.busy(!0),
            c = m.extractState(a, !0),
            c && !m.emulated.pushState ? m.pushState(c.data, c.title, c.url, !1) : m.getHash() !== a && (m.bugs.setHash ? (e = m.getPageUrl(),
            m.pushState(null, null, e + "#" + a, !1)) : d.location.hash = a),
            m)
        }
        ,
        m.escapeHash = function(b) {
            var c = m.normalizeHash(b);
            return c = a.encodeURIComponent(c),
            m.bugs.hashEscape || (c = c.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")),
            c
        }
        ,
        m.getHashByUrl = function(a) {
            var b = String(a).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
            return b = m.unescapeHash(b)
        }
        ,
        m.setTitle = function(a) {
            var b, c = a.title;
            c || (b = m.getStateByIndex(0),
            b && b.url === a.url && (c = b.title || m.options.initialTitle));
            try {
                d.getElementsByTagName("title")[0].innerHTML = c.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
            } catch (e) {}
            return d.title = c,
            m
        }
        ,
        m.queues = [],
        m.busy = function(a) {
            if ("undefined" != typeof a ? m.busy.flag = a : "undefined" == typeof m.busy.flag && (m.busy.flag = !1),
            !m.busy.flag) {
                h(m.busy.timeout);
                var b = function() {
                    var a, c, d;
                    if (!m.busy.flag)
                        for (a = m.queues.length - 1; a >= 0; --a)
                            c = m.queues[a],
                            0 !== c.length && (d = c.shift(),
                            m.fireQueueItem(d),
                            m.busy.timeout = g(b, m.options.busyDelay))
                };
                m.busy.timeout = g(b, m.options.busyDelay)
            }
            return m.busy.flag
        }
        ,
        m.busy.flag = !1,
        m.fireQueueItem = function(a) {
            return a.callback.apply(a.scope || m, a.args || [])
        }
        ,
        m.pushQueue = function(a) {
            return m.queues[a.queue || 0] = m.queues[a.queue || 0] || [],
            m.queues[a.queue || 0].push(a),
            m
        }
        ,
        m.queue = function(a, b) {
            return "function" == typeof a && (a = {
                callback: a
            }),
            "undefined" != typeof b && (a.queue = b),
            m.busy() ? m.pushQueue(a) : m.fireQueueItem(a),
            m
        }
        ,
        m.clearQueue = function() {
            return m.busy.flag = !1,
            m.queues = [],
            m
        }
        ,
        m.stateChanged = !1,
        m.doubleChecker = !1,
        m.doubleCheckComplete = function() {
            return m.stateChanged = !0,
            m.doubleCheckClear(),
            m
        }
        ,
        m.doubleCheckClear = function() {
            return m.doubleChecker && (h(m.doubleChecker),
            m.doubleChecker = !1),
            m
        }
        ,
        m.doubleCheck = function(a) {
            return m.stateChanged = !1,
            m.doubleCheckClear(),
            m.bugs.ieDoubleCheck && (m.doubleChecker = g(function() {
                return m.doubleCheckClear(),
                m.stateChanged || a(),
                !0
            }, m.options.doubleCheckInterval)),
            m
        }
        ,
        m.safariStatePoll = function() {
            var b, c = m.extractState(m.getLocationHref());
            if (!m.isLastSavedState(c))
                return b = c,
                b || (b = m.createStateObject()),
                m.Adapter.trigger(a, "popstate"),
                m
        }
        ,
        m.back = function(a) {
            return a !== !1 && m.busy() ? (m.pushQueue({
                scope: m,
                callback: m.back,
                args: arguments,
                queue: a
            }),
            !1) : (m.busy(!0),
            m.doubleCheck(function() {
                m.back(!1)
            }),
            n.go(-1),
            !0)
        }
        ,
        m.forward = function(a) {
            return a !== !1 && m.busy() ? (m.pushQueue({
                scope: m,
                callback: m.forward,
                args: arguments,
                queue: a
            }),
            !1) : (m.busy(!0),
            m.doubleCheck(function() {
                m.forward(!1)
            }),
            n.go(1),
            !0)
        }
        ,
        m.go = function(a, b) {
            var c;
            if (a > 0)
                for (c = 1; a >= c; ++c)
                    m.forward(b);
            else {
                if (!(0 > a))
                    throw new Error("History.go: History.go requires a positive or negative integer passed.");
                for (c = -1; c >= a; --c)
                    m.back(b)
            }
            return m
        }
        ,
        m.emulated.pushState) {
            var o = function() {};
            m.pushState = m.pushState || o,
            m.replaceState = m.replaceState || o
        } else
            m.onPopState = function(b, c) {
                var d, e, f = !1, g = !1;
                return m.doubleCheckComplete(),
                (d = m.getHash()) ? (e = m.extractState(d || m.getLocationHref(), !0),
                e ? m.replaceState(e.data, e.title, e.url, !1) : (m.Adapter.trigger(a, "anchorchange"),
                m.busy(!1)),
                m.expectedStateId = !1,
                !1) : (f = m.Adapter.extractEventData("state", b, c) || !1,
                g = f ? m.getStateById(f) : m.expectedStateId ? m.getStateById(m.expectedStateId) : m.extractState(m.getLocationHref()),
                g || (g = m.createStateObject(null, null, m.getLocationHref())),
                m.expectedStateId = !1,
                m.isLastSavedState(g) ? (m.busy(!1),
                !1) : (m.storeState(g),
                m.saveState(g),
                m.setTitle(g),
                m.Adapter.trigger(a, "statechange"),
                m.busy(!1),
                !0))
            }
            ,
            m.Adapter.bind(a, "popstate", m.onPopState),
            m.pushState = function(b, c, d, e) {
                if (m.getHashByUrl(d) && m.emulated.pushState)
                    throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (e !== !1 && m.busy())
                    return m.pushQueue({
                        scope: m,
                        callback: m.pushState,
                        args: arguments,
                        queue: e
                    }),
                    !1;
                m.busy(!0);
                var f = m.createStateObject(b, c, d);
                return m.isLastSavedState(f) ? m.busy(!1) : (m.storeState(f),
                m.expectedStateId = f.id,
                n.pushState(f.id, f.title, f.url),
                m.Adapter.trigger(a, "popstate")),
                !0
            }
            ,
            m.replaceState = function(b, c, d, e) {
                if (m.getHashByUrl(d) && m.emulated.pushState)
                    throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (e !== !1 && m.busy())
                    return m.pushQueue({
                        scope: m,
                        callback: m.replaceState,
                        args: arguments,
                        queue: e
                    }),
                    !1;
                m.busy(!0);
                var f = m.createStateObject(b, c, d);
                return m.isLastSavedState(f) ? m.busy(!1) : (m.storeState(f),
                m.expectedStateId = f.id,
                n.replaceState(f.id, f.title, f.url),
                m.Adapter.trigger(a, "popstate")),
                !0
            }
            ;
        if (f) {
            try {
                m.store = k.parse(f.getItem("History.store")) || {}
            } catch (p) {
                m.store = {}
            }
            m.normalizeStore()
        } else
            m.store = {},
            m.normalizeStore();
        m.Adapter.bind(a, "unload", m.clearAllIntervals),
        m.saveState(m.storeState(m.extractState(m.getLocationHref(), !0))),
        f && (m.onUnload = function() {
            var a, b, c;
            try {
                a = k.parse(f.getItem("History.store")) || {}
            } catch (d) {
                a = {}
            }
            a.idToState = a.idToState || {},
            a.urlToId = a.urlToId || {},
            a.stateToId = a.stateToId || {};
            for (b in m.idToState)
                m.idToState.hasOwnProperty(b) && (a.idToState[b] = m.idToState[b]);
            for (b in m.urlToId)
                m.urlToId.hasOwnProperty(b) && (a.urlToId[b] = m.urlToId[b]);
            for (b in m.stateToId)
                m.stateToId.hasOwnProperty(b) && (a.stateToId[b] = m.stateToId[b]);
            m.store = a,
            m.normalizeStore(),
            c = k.stringify(a);
            try {
                f.setItem("History.store", c)
            } catch (e) {
                if (e.code !== DOMException.QUOTA_EXCEEDED_ERR)
                    throw e;
                f.length && (f.removeItem("History.store"),
                f.setItem("History.store", c))
            }
        }
        ,
        m.intervalList.push(i(m.onUnload, m.options.storeInterval)),
        m.Adapter.bind(a, "beforeunload", m.onUnload),
        m.Adapter.bind(a, "unload", m.onUnload)),
        m.emulated.pushState || (m.bugs.safariPoll && m.intervalList.push(i(m.safariStatePoll, m.options.safariPollInterval)),
        ("Apple Computer, Inc." === e.vendor || "Mozilla" === (e.appCodeName || "")) && (m.Adapter.bind(a, "hashchange", function() {
            m.Adapter.trigger(a, "popstate")
        }),
        m.getHash() && m.Adapter.onDomLoad(function() {
            m.Adapter.trigger(a, "hashchange")
        })))
    }
    ,
    m.options && m.options.delayInit || m.init()
}(window),
function(a, b, c, d) {
    "use strict";
    function e(b, c) {
        this.element = b,
        this.$context = a(b).data("api", this),
        this.$layers = this.$context.find(".layer");
        var d = {
            calibrateX: this.$context.data("calibrate-x") || null,
            calibrateY: this.$context.data("calibrate-y") || null,
            invertX: this.$context.data("invert-x") || null,
            invertY: this.$context.data("invert-y") || null,
            limitX: parseFloat(this.$context.data("limit-x")) || null,
            limitY: parseFloat(this.$context.data("limit-y")) || null,
            scalarX: parseFloat(this.$context.data("scalar-x")) || null,
            scalarY: parseFloat(this.$context.data("scalar-y")) || null,
            frictionX: parseFloat(this.$context.data("friction-x")) || null,
            frictionY: parseFloat(this.$context.data("friction-y")) || null,
            originX: parseFloat(this.$context.data("origin-x")) || null,
            originY: parseFloat(this.$context.data("origin-y")) || null
        };
        for (var e in d)
            null === d[e] && delete d[e];
        a.extend(this, h, c, d),
        this.calibrationTimer = null,
        this.calibrationFlag = !0,
        this.enabled = !1,
        this.depths = [],
        this.raf = null,
        this.bounds = null,
        this.ex = 0,
        this.ey = 0,
        this.ew = 0,
        this.eh = 0,
        this.ecx = 0,
        this.ecy = 0,
        this.erx = 0,
        this.ery = 0,
        this.cx = 0,
        this.cy = 0,
        this.ix = 0,
        this.iy = 0,
        this.mx = 0,
        this.my = 0,
        this.vx = 0,
        this.vy = 0,
        this.onMouseMove = this.onMouseMove.bind(this),
        this.onDeviceOrientation = this.onDeviceOrientation.bind(this),
        this.onOrientationTimer = this.onOrientationTimer.bind(this),
        this.onCalibrationTimer = this.onCalibrationTimer.bind(this),
        this.onAnimationFrame = this.onAnimationFrame.bind(this),
        this.onWindowResize = this.onWindowResize.bind(this),
        this.initialise()
    }
    var f = "parallax"
      , g = 30
      , h = {
        relativeInput: !1,
        clipRelativeInput: !1,
        calibrationThreshold: 100,
        calibrationDelay: 500,
        supportDelay: 500,
        calibrateX: !1,
        calibrateY: !0,
        invertX: !0,
        invertY: !0,
        limitX: !1,
        limitY: !1,
        scalarX: 10,
        scalarY: 10,
        frictionX: .1,
        frictionY: .1,
        originX: .5,
        originY: .5
    };
    e.prototype.transformSupport = function(a) {
        for (var e = c.createElement("div"), f = !1, g = null, h = !1, i = null, j = null, k = 0, l = this.vendors.length; l > k; k++)
            if (null !== this.vendors[k] ? (i = this.vendors[k][0] + "transform",
            j = this.vendors[k][1] + "Transform") : (i = "transform",
            j = "transform"),
            e.style[j] !== d) {
                f = !0;
                break
            }
        switch (a) {
        case "2D":
            h = f;
            break;
        case "3D":
            if (f) {
                var m = c.body || c.createElement("body")
                  , n = c.documentElement
                  , o = n.style.overflow;
                c.body || (n.style.overflow = "hidden",
                n.appendChild(m),
                m.style.overflow = "hidden",
                m.style.background = ""),
                m.appendChild(e),
                e.style[j] = "translate3d(1px,1px,1px)",
                g = b.getComputedStyle(e).getPropertyValue(i),
                h = g !== d && g.length > 0 && "none" !== g,
                n.style.overflow = o,
                m.removeChild(e)
            }
        }
        return h
    }
    ,
    e.prototype.ww = null,
    e.prototype.wh = null,
    e.prototype.wcx = null,
    e.prototype.wcy = null,
    e.prototype.wrx = null,
    e.prototype.wry = null,
    e.prototype.portrait = null,
    e.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i),
    e.prototype.vendors = [null, ["-webkit-", "webkit"], ["-moz-", "Moz"], ["-o-", "O"], ["-ms-", "ms"]],
    e.prototype.motionSupport = !!b.DeviceMotionEvent,
    e.prototype.orientationSupport = !!b.DeviceOrientationEvent,
    e.prototype.orientationStatus = 0,
    e.prototype.transform2DSupport = e.prototype.transformSupport("2D"),
    e.prototype.transform3DSupport = e.prototype.transformSupport("3D"),
    e.prototype.propertyCache = {},
    e.prototype.initialise = function() {
        "static" === this.$context.css("position") && this.$context.css({
            position: "relative"
        }),
        this.accelerate(this.$context),
        this.updateLayers(),
        this.updateDimensions(),
        this.enable(),
        this.queueCalibration(this.calibrationDelay)
    }
    ,
    e.prototype.updateLayers = function() {
        this.$layers = this.$context.find(".layer"),
        this.depths = [],
        this.$layers.css({
            position: "absolute",
            display: "block",
            left: 0,
            top: 0
        }),
        this.$layers.first().css({
            position: "relative"
        }),
        this.accelerate(this.$layers),
        this.$layers.each(a.proxy(function(b, c) {
            this.depths.push(a(c).data("depth") || 0)
        }, this))
    }
    ,
    e.prototype.updateDimensions = function() {
        this.ww = b.innerWidth,
        this.wh = b.innerHeight,
        this.wcx = this.ww * this.originX,
        this.wcy = this.wh * this.originY,
        this.wrx = Math.max(this.wcx, this.ww - this.wcx),
        this.wry = Math.max(this.wcy, this.wh - this.wcy)
    }
    ,
    e.prototype.updateBounds = function() {
        this.bounds = this.element.getBoundingClientRect(),
        this.ex = this.bounds.left,
        this.ey = this.bounds.top,
        this.ew = this.bounds.width,
        this.eh = this.bounds.height,
        this.ecx = this.ew * this.originX,
        this.ecy = this.eh * this.originY,
        this.erx = Math.max(this.ecx, this.ew - this.ecx),
        this.ery = Math.max(this.ecy, this.eh - this.ecy)
    }
    ,
    e.prototype.queueCalibration = function(a) {
        clearTimeout(this.calibrationTimer),
        this.calibrationTimer = setTimeout(this.onCalibrationTimer, a)
    }
    ,
    e.prototype.enable = function() {
        this.enabled || (this.enabled = !0,
        this.orientationSupport ? (this.portrait = null,
        b.addEventListener("deviceorientation", this.onDeviceOrientation),
        setTimeout(this.onOrientationTimer, this.supportDelay)) : (this.cx = 0,
        this.cy = 0,
        this.portrait = !1,
        b.addEventListener("mousemove", this.onMouseMove)),
        b.addEventListener("resize", this.onWindowResize),
        this.raf = requestAnimationFrame(this.onAnimationFrame))
    }
    ,
    e.prototype.disable = function() {
        this.enabled && (this.enabled = !1,
        this.orientationSupport ? b.removeEventListener("deviceorientation", this.onDeviceOrientation) : b.removeEventListener("mousemove", this.onMouseMove),
        b.removeEventListener("resize", this.onWindowResize),
        cancelAnimationFrame(this.raf))
    }
    ,
    e.prototype.calibrate = function(a, b) {
        this.calibrateX = a === d ? this.calibrateX : a,
        this.calibrateY = b === d ? this.calibrateY : b
    }
    ,
    e.prototype.invert = function(a, b) {
        this.invertX = a === d ? this.invertX : a,
        this.invertY = b === d ? this.invertY : b
    }
    ,
    e.prototype.friction = function(a, b) {
        this.frictionX = a === d ? this.frictionX : a,
        this.frictionY = b === d ? this.frictionY : b
    }
    ,
    e.prototype.scalar = function(a, b) {
        this.scalarX = a === d ? this.scalarX : a,
        this.scalarY = b === d ? this.scalarY : b
    }
    ,
    e.prototype.limit = function(a, b) {
        this.limitX = a === d ? this.limitX : a,
        this.limitY = b === d ? this.limitY : b
    }
    ,
    e.prototype.origin = function(a, b) {
        this.originX = a === d ? this.originX : a,
        this.originY = b === d ? this.originY : b
    }
    ,
    e.prototype.clamp = function(a, b, c) {
        return a = Math.max(a, b),
        a = Math.min(a, c)
    }
    ,
    e.prototype.css = function(b, c, e) {
        var f = this.propertyCache[c];
        if (!f)
            for (var g = 0, h = this.vendors.length; h > g; g++)
                if (f = null !== this.vendors[g] ? a.camelCase(this.vendors[g][1] + "-" + c) : c,
                b.style[f] !== d) {
                    this.propertyCache[c] = f;
                    break
                }
        b.style[f] = e
    }
    ,
    e.prototype.accelerate = function(a) {
        for (var b = 0, c = a.length; c > b; b++) {
            var d = a[b];
            this.css(d, "transform", "translate3d(0,0,0)"),
            this.css(d, "transform-style", "preserve-3d"),
            this.css(d, "backface-visibility", "hidden")
        }
    }
    ,
    e.prototype.setPosition = function(a, b, c) {
        b += "px",
        c += "px",
        this.transform3DSupport ? this.css(a, "transform", "translate3d(" + b + "," + c + ",0)") : this.transform2DSupport ? this.css(a, "transform", "translate(" + b + "," + c + ")") : (a.style.left = b,
        a.style.top = c)
    }
    ,
    e.prototype.onOrientationTimer = function() {
        this.orientationSupport && 0 === this.orientationStatus && (this.disable(),
        this.orientationSupport = !1,
        this.enable())
    }
    ,
    e.prototype.onCalibrationTimer = function() {
        this.calibrationFlag = !0
    }
    ,
    e.prototype.onWindowResize = function() {
        this.updateDimensions()
    }
    ,
    e.prototype.onAnimationFrame = function() {
        this.updateBounds();
        var a = this.ix - this.cx
          , b = this.iy - this.cy;
        (Math.abs(a) > this.calibrationThreshold || Math.abs(b) > this.calibrationThreshold) && this.queueCalibration(0),
        this.portrait ? (this.mx = this.calibrateX ? b : this.iy,
        this.my = this.calibrateY ? a : this.ix) : (this.mx = this.calibrateX ? a : this.ix,
        this.my = this.calibrateY ? b : this.iy),
        this.mx *= this.ew * (this.scalarX / 100),
        this.my *= this.eh * (this.scalarY / 100),
        isNaN(parseFloat(this.limitX)) || (this.mx = this.clamp(this.mx, -this.limitX, this.limitX)),
        isNaN(parseFloat(this.limitY)) || (this.my = this.clamp(this.my, -this.limitY, this.limitY)),
        this.vx += (this.mx - this.vx) * this.frictionX,
        this.vy += (this.my - this.vy) * this.frictionY;
        for (var c = 0, d = this.$layers.length; d > c; c++) {
            var e = this.depths[c]
              , f = this.$layers[c]
              , g = this.vx * e * (this.invertX ? -1 : 1)
              , h = this.vy * e * (this.invertY ? -1 : 1);
            this.setPosition(f, g, h)
        }
        this.raf = requestAnimationFrame(this.onAnimationFrame)
    }
    ,
    e.prototype.onDeviceOrientation = function(a) {
        if (!this.desktop && null !== a.beta && null !== a.gamma) {
            this.orientationStatus = 1;
            var c = (a.beta || 0) / g
              , d = (a.gamma || 0) / g
              , e = b.innerHeight > b.innerWidth;
            this.portrait !== e && (this.portrait = e,
            this.calibrationFlag = !0),
            this.calibrationFlag && (this.calibrationFlag = !1,
            this.cx = c,
            this.cy = d),
            this.ix = c,
            this.iy = d
        }
    }
    ,
    e.prototype.onMouseMove = function(a) {
        var b = a.clientX
          , c = a.clientY;
        !this.orientationSupport && this.relativeInput ? (this.clipRelativeInput && (b = Math.max(b, this.ex),
        b = Math.min(b, this.ex + this.ew),
        c = Math.max(c, this.ey),
        c = Math.min(c, this.ey + this.eh)),
        this.ix = (b - this.ex - this.ecx) / this.erx,
        this.iy = (c - this.ey - this.ecy) / this.ery) : (this.ix = (b - this.wcx) / this.wrx,
        this.iy = (c - this.wcy) / this.wry)
    }
    ;
    var i = {
        enable: e.prototype.enable,
        disable: e.prototype.disable,
        updateLayers: e.prototype.updateLayers,
        calibrate: e.prototype.calibrate,
        friction: e.prototype.friction,
        invert: e.prototype.invert,
        scalar: e.prototype.scalar,
        limit: e.prototype.limit,
        origin: e.prototype.origin
    };
    a.fn[f] = function(b) {
        var c = arguments;
        return this.each(function() {
            var d = a(this)
              , g = d.data(f);
            g || (g = new e(this,b),
            d.data(f, g)),
            i[b] && g[b].apply(g, Array.prototype.slice.call(c, 1))
        })
    }
}(window.jQuery || window.Zepto, window, document),
function() {
    for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c)
        window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"],
        window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(b) {
        var c = (new Date).getTime()
          , d = Math.max(0, 16 - (c - a))
          , e = window.setTimeout(function() {
            b(c + d)
        }, d);
        return a = c + d,
        e
    }
    ),
    window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
        clearTimeout(a)
    }
    )
}(),
function(a) {
    function b() {
        for (var a = new Date(this.toString()), b = 28, c = a.getMonth(); a.getMonth() == c; )
            ++b,
            a.setDate(b);
        return b - 1
    }
    a.addDays = function(a) {
        this.setDate(this.getDate() + a)
    }
    ,
    a.addMonths = function(a) {
        var c = this.getDate();
        this.setDate(1),
        this.setMonth(this.getMonth() + a),
        this.setDate(Math.min(c, b.apply(this)))
    }
    ,
    a.addYears = function(a) {
        var c = this.getDate();
        this.setDate(1),
        this.setFullYear(this.getFullYear() + a),
        this.setDate(Math.min(c, b.apply(this)))
    }
    ,
    a.getDayOfYear = function() {
        var a = new Date(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0)
          , b = new Date(this.getFullYear(),0,0,0,0,0)
          , c = a - b;
        return Math.floor(c / 24 * 60 * 60 * 1e3)
    }
}(Date.prototype),
function(a) {
    function b() {
        var b, c, e, f, g, h, i, j = a(this).data("pickmeup-options"), k = this.pickmeup, l = Math.floor(j.calendars / 2), m = j.date, n = j.current, o = j.min ? new Date(j.min) : null, p = j.max ? new Date(j.max) : null, q = (new Date).setHours(0, 0, 0, 0).valueOf();
        o && (o.setDate(1),
        o.addMonths(1),
        o.addDays(-1)),
        p && (p.setDate(1),
        p.addMonths(1),
        p.addDays(-1)),
        k.find(".pmu-instance > :not(nav)").remove();
        for (var r = 0; r < j.calendars; r++)
            if (b = new Date(n),
            f = k.find(".pmu-instance").eq(r),
            k.hasClass("pmu-view-years") ? (b.addYears(12 * (r - l)),
            c = b.getFullYear() - 6 + " - " + (b.getFullYear() + 5)) : k.hasClass("pmu-view-months") ? (b.addYears(r - l),
            c = b.getFullYear()) : k.hasClass("pmu-view-days") && (b.addMonths(r - l),
            c = d(b, "B, Y", j.locale)),
            !h && p && (i = new Date(b),
            j.select_day ? i.addMonths(j.calendars - 1) : i.addYears(j.select_month ? j.calendars - 1 : 12 * (j.calendars - 1)),
            i > p))
                --r,
                n.addMonths(-1),
                h = void 0;
            else if (h = new Date(b),
            !g && (g = new Date(b),
            g.setDate(1),
            g.addMonths(1),
            g.addDays(-1),
            o && o > g))
                --r,
                n.addMonths(1),
                g = void 0;
            else {
                f.find(".pmu-month").text(c),
                e = "";
                var s = function(a) {
                    return "range" == j.mode && a >= new Date(m[0]).getFullYear() && a <= new Date(m[1]).getFullYear() || "multiple" == j.mode && -1 !== m.reduce(function(a, b) {
                        return a.push(new Date(b).getFullYear()),
                        a
                    }, []).indexOf(a) || new Date(m).getFullYear() == a
                }
                  , u = function(a, b) {
                    var c = new Date(m[0]).getFullYear()
                      , d = new Date(m[1]).getFullYear()
                      , e = new Date(m[0]).getMonth()
                      , f = new Date(m[1]).getMonth();
                    return "range" == j.mode && a > c && d > a || "range" == j.mode && a == c && d > a && b >= e || "range" == j.mode && a > c && a == d && f >= b || "range" == j.mode && a == c && a == d && b >= e && f >= b || "multiple" == j.mode && -1 !== m.reduce(function(a, b) {
                        return b = new Date(b),
                        a.push(b.getFullYear() + "-" + b.getMonth()),
                        a
                    }, []).indexOf(a + "-" + b) || new Date(m).getFullYear() == a && new Date(m).getMonth() == b
                };
                !function() {
                    for (var a, c = [], d = b.getFullYear() - 6, f = new Date(j.min).getFullYear(), g = new Date(j.max).getFullYear(), h = 0; 12 > h; ++h)
                        a = {
                            text: d + h,
                            class_name: []
                        },
                        j.min && a.text < f || j.max && a.text > g ? a.class_name.push("pmu-disabled") : s(a.text) && a.class_name.push("pmu-selected"),
                        a.class_name = a.class_name.join(" "),
                        c.push(a);
                    e += t.body(c, "pmu-years")
                }(),
                function() {
                    for (var a, c = [], d = b.getFullYear(), f = new Date(j.min).getFullYear(), g = new Date(j.min).getMonth(), h = new Date(j.max).getFullYear(), i = new Date(j.max).getMonth(), k = 0; 12 > k; ++k)
                        a = {
                            text: j.locale.monthsShort[k],
                            class_name: []
                        },
                        j.min && (f > d || g > k && d == f) || j.max && (d > h || k > i && d >= h) ? a.class_name.push("pmu-disabled") : u(d, k) && a.class_name.push("pmu-selected"),
                        a.class_name = a.class_name.join(" "),
                        c.push(a);
                    e += t.body(c, "pmu-months")
                }(),
                function() {
                    var c, d = [], f = b.getMonth();
                    !function() {
                        b.setDate(1);
                        var a = (b.getDay() - j.first_day) % 7;
                        b.addDays(-(a + (0 > a ? 7 : 0)))
                    }();
                    for (var g = 0; 42 > g; ++g) {
                        c = {
                            text: b.getDate(),
                            class_name: []
                        },
                        f != b.getMonth() && c.class_name.push("pmu-not-in-month"),
                        0 == b.getDay() ? c.class_name.push("pmu-sunday") : 6 == b.getDay() && c.class_name.push("pmu-saturday");
                        var h = j.render(b) || {}
                          , i = b.valueOf()
                          , k = j.min && j.min > b || j.max && j.max < b;
                        h.disabled || k ? c.class_name.push("pmu-disabled") : (h.selected || j.date == i || -1 !== a.inArray(i, j.date) || "range" == j.mode && i >= j.date[0] && i <= j.date[1]) && c.class_name.push("pmu-selected"),
                        i == q && c.class_name.push("pmu-today"),
                        h.class_name && c.class_name.push(h.class_name),
                        c.class_name = c.class_name.join(" "),
                        d.push(c),
                        b.addDays(1)
                    }
                    e += t.body(d, "pmu-days")
                }(),
                f.append(e)
            }
        g.setDate(1),
        h.setDate(1),
        h.addMonths(1),
        h.addDays(-1),
        k.find(".pmu-prev").css("visibility", j.min && j.min >= g ? "hidden" : "visible"),
        k.find(".pmu-next").css("visibility", j.max && j.max <= h ? "hidden" : "visible"),
        j.fill.apply(this)
    }
    function c(b, d, e, f) {
        if (b.constructor == Date)
            return b;
        if (!b)
            return new Date;
        var g = b.split(e);
        if (g.length > 1)
            return g.forEach(function(b, g, h) {
                h[g] = c(a.trim(b), d, e, f)
            }),
            g;
        for (var h, i, j, k, l, m = f.monthsShort.join(")(") + ")(" + f.months.join(")("), e = new RegExp("[^0-9a-zA-Z(" + m + ")]+"), n = b.split(e), o = d.split(e), p = new Date, q = 0; q < n.length; q++)
            switch (o[q]) {
            case "b":
                i = f.monthsShort.indexOf(n[q]);
                break;
            case "B":
                i = f.months.indexOf(n[q]);
                break;
            case "d":
            case "e":
                h = parseInt(n[q], 10);
                break;
            case "m":
                i = parseInt(n[q], 10) - 1;
                break;
            case "Y":
            case "y":
                j = parseInt(n[q], 10),
                j += j > 100 ? 0 : 29 > j ? 2e3 : 1900;
                break;
            case "H":
            case "I":
            case "k":
            case "l":
                k = parseInt(n[q], 10);
                break;
            case "P":
            case "p":
                /pm/i.test(n[q]) && 12 > k ? k += 12 : /am/i.test(n[q]) && k >= 12 && (k -= 12);
                break;
            case "M":
                l = parseInt(n[q], 10)
            }
        var r = new Date(void 0 === j ? p.getFullYear() : j,void 0 === i ? p.getMonth() : i,void 0 === h ? p.getDate() : h,void 0 === k ? p.getHours() : k,void 0 === l ? p.getMinutes() : l,0);
        return isNaN(1 * r) && (r = new Date),
        r
    }
    function d(a, b, c) {
        var d = a.getMonth()
          , e = a.getDate()
          , f = a.getFullYear()
          , g = a.getDay()
          , h = a.getHours()
          , i = h >= 12
          , j = i ? h - 12 : h
          , k = a.getDayOfYear();
        0 == j && (j = 12);
        for (var l, m = a.getMinutes(), n = a.getSeconds(), o = b.split(""), p = 0; p < o.length; p++) {
            switch (l = o[p]) {
            case "a":
                l = c.daysShort[g];
                break;
            case "A":
                l = c.days[g];
                break;
            case "b":
                l = c.monthsShort[d];
                break;
            case "B":
                l = c.months[d];
                break;
            case "C":
                l = 1 + Math.floor(f / 100);
                break;
            case "d":
                l = 10 > e ? "0" + e : e;
                break;
            case "e":
                l = e;
                break;
            case "H":
                l = 10 > h ? "0" + h : h;
                break;
            case "I":
                l = 10 > j ? "0" + j : j;
                break;
            case "j":
                l = 100 > k ? 10 > k ? "00" + k : "0" + k : k;
                break;
            case "k":
                l = h;
                break;
            case "l":
                l = j;
                break;
            case "m":
                l = 9 > d ? "0" + (1 + d) : 1 + d;
                break;
            case "M":
                l = 10 > m ? "0" + m : m;
                break;
            case "p":
            case "P":
                l = i ? "PM" : "AM";
                break;
            case "s":
                l = Math.floor(a.getTime() / 1e3);
                break;
            case "S":
                l = 10 > n ? "0" + n : n;
                break;
            case "u":
                l = g + 1;
                break;
            case "w":
                l = g;
                break;
            case "y":
                l = ("" + f).substr(2, 2);
                break;
            case "Y":
                l = f
            }
            o[p] = l
        }
        return o.join("")
    }
    function e() {
        var b, c = a(this), d = c.data("pickmeup-options"), e = d.current;
        switch (d.mode) {
        case "multiple":
            b = e.setHours(0, 0, 0, 0).valueOf(),
            -1 !== a.inArray(b, d.date) ? a.each(d.date, function(a, c) {
                return c == b ? (d.date.splice(a, 1),
                !1) : !0
            }) : d.date.push(b);
            break;
        case "range":
            d.lastSel || (d.date[0] = e.setHours(0, 0, 0, 0).valueOf()),
            b = e.setHours(0, 0, 0, 0).valueOf(),
            b <= d.date[0] ? (d.date[1] = d.date[0],
            d.date[0] = b) : d.date[1] = b,
            d.lastSel = !d.lastSel;
            break;
        default:
            d.date = e.valueOf()
        }
        var f = g(d);
        return c.is("input") && c.val("single" == d.mode ? f[0] : f[0].join(d.separator)),
        d.change.apply(this, f),
        !d.hide_on_select || "range" == d.mode && d.lastSel ? void 0 : (d.binded.hide(),
        !1)
    }
    function f(b) {
        var c = a(b.target);
        if (c.hasClass("pmu-button") || (c = c.closest(".pmu-button")),
        c.length) {
            if (c.hasClass("pmu-disabled"))
                return !1;
            var d = a(this)
              , e = d.data("pickmeup-options")
              , f = c.parents(".pmu-instance").eq(0)
              , g = f.parent()
              , h = a(".pmu-instance", g).index(f);
            if (c.parent().is("nav"))
                c.hasClass("pmu-month") ? (e.current.addMonths(h - Math.floor(e.calendars / 2)),
                g.hasClass("pmu-view-years") ? (e.current = new Date("single" != e.mode ? e.date[e.date.length - 1] : e.date),
                e.select_day ? g.removeClass("pmu-view-years").addClass("pmu-view-days") : e.select_month && g.removeClass("pmu-view-years").addClass("pmu-view-months")) : g.hasClass("pmu-view-months") ? e.select_year ? g.removeClass("pmu-view-months").addClass("pmu-view-years") : e.select_day && g.removeClass("pmu-view-months").addClass("pmu-view-days") : g.hasClass("pmu-view-days") && (e.select_month ? g.removeClass("pmu-view-days").addClass("pmu-view-months") : e.select_year && g.removeClass("pmu-view-days").addClass("pmu-view-years"))) : c.hasClass("pmu-prev") ? e.binded.prev(!1) : e.binded.next(!1);
            else if (!c.hasClass("pmu-disabled"))
                if (g.hasClass("pmu-view-years"))
                    e.current.setFullYear(parseInt(c.text(), 10)),
                    e.select_month ? g.removeClass("pmu-view-years").addClass("pmu-view-months") : e.select_day ? g.removeClass("pmu-view-years").addClass("pmu-view-days") : e.binded.update_date();
                else if (g.hasClass("pmu-view-months"))
                    e.current.setMonth(f.find(".pmu-months .pmu-button").index(c)),
                    e.current.setFullYear(parseInt(f.find(".pmu-month").text(), 10)),
                    e.select_day ? g.removeClass("pmu-view-months").addClass("pmu-view-days") : e.binded.update_date(),
                    e.current.addMonths(Math.floor(e.calendars / 2) - h);
                else {
                    var i = parseInt(c.text(), 10);
                    e.current.addMonths(h - Math.floor(e.calendars / 2)),
                    c.hasClass("pmu-not-in-month") && e.current.addMonths(i > 15 ? -1 : 1),
                    e.current.setDate(i),
                    e.binded.update_date()
                }
            e.binded.fill()
        }
        return !1
    }
    function g(b) {
        var c;
        return "single" == b.mode ? (c = new Date(b.date),
        [d(c, b.format, b.locale), c]) : (c = [[], []],
        a.each(b.date, function(a, e) {
            var f = new Date(e);
            c[0].push(d(f, b.format, b.locale)),
            c[1].push(f)
        }),
        c)
    }
    function h(b) {
        var d = this.pickmeup;
        if (b || !d.is(":visible")) {
            var e = a(this)
              , f = e.data("pickmeup-options")
              , g = e.offset()
              , h = {
                l: document.documentElement.scrollLeft,
                t: document.documentElement.scrollTop,
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
              , i = g.top
              , j = g.left;
            switch (f.binded.fill(),
            e.is("input") && e.pickmeup("set_date", c(e.val() ? e.val() : f.default_date, f.format, f.separator, f.locale)).keydown(function(a) {
                9 == a.which && e.pickmeup("hide")
            }),
            f.before_show(),
            f.position) {
            case "top":
                i -= d.outerHeight();
                break;
            case "left":
                j -= d.outerWidth();
                break;
            case "right":
                j += this.offsetWidth;
                break;
            case "bottom":
                i += this.offsetHeight
            }
            if (i + d.offsetHeight > h.t + h.h && (i = g.top - d.offsetHeight),
            i < h.t && (i = g.top + this.offsetHeight + d.offsetHeight),
            j + d.offsetWidth > h.l + h.w && (j = g.left - d.offsetWidth),
            j < h.l && (j = g.left + this.offsetWidth),
            0 == f.show())
                return;
            d.css({
                display: "inline-block",
                top: i + "px",
                left: j + "px"
            }),
            a(document).on("mousedown" + f.events_namespace, f.binded.hide).on("resize" + f.events_namespace, [!0], f.binded.forced_show)
        }
    }
    function i() {
        h.call(this, !0)
    }
    function j(b) {
        if (!b || !b.target || b.target != this && !(16 & this.pickmeup.get(0).compareDocumentPosition(b.target))) {
            var c = this.pickmeup
              , d = a(this).data("pickmeup-options");
            0 != d.hide() && (c.hide(),
            a(document).off("mousedown", d.binded.hide).off("resize", d.binded.forced_show),
            d.lastSel = !1)
        }
    }
    function k() {
        var b = a(this).data("pickmeup-options");
        a(document).off("mousedown", b.binded.hide).off("resize", b.binded.forced_show),
        b.binded.forced_show()
    }
    function l() {
        var b = a(this).data("pickmeup-options");
        "single" != b.mode && (b.date = [],
        b.lastSel = !1,
        b.binded.fill())
    }
    function m(b) {
        "undefined" == typeof b && (b = !0);
        var c = this.pickmeup
          , d = a(this).data("pickmeup-options");
        c.hasClass("pmu-view-years") ? d.current.addYears(-12) : c.hasClass("pmu-view-months") ? d.current.addYears(-1) : c.hasClass("pmu-view-days") && d.current.addMonths(-1),
        b && d.binded.fill()
    }
    function n(b) {
        "undefined" == typeof b && (b = !0);
        var c = this.pickmeup
          , d = a(this).data("pickmeup-options");
        c.hasClass("pmu-view-years") ? d.current.addYears(12) : c.hasClass("pmu-view-months") ? d.current.addYears(1) : c.hasClass("pmu-view-days") && d.current.addMonths(1),
        b && d.binded.fill()
    }
    function o(b) {
        var c = a(this).data("pickmeup-options")
          , e = g(c);
        if ("string" == typeof b) {
            var f = e[1];
            return f.constructor == Date ? d(f, b, c.locale) : f.map(function(a) {
                return d(a, b, c.locale)
            })
        }
        return e[b ? 0 : 1]
    }
    function p(b) {
        var d = a(this).data("pickmeup-options");
        if (d.date = b,
        "string" == typeof d.date ? d.date = c(d.date, d.format, d.separator, d.locale).setHours(0, 0, 0, 0) : d.date.constructor == Date && d.date.setHours(0, 0, 0, 0),
        d.date || (d.date = new Date,
        d.date.setHours(0, 0, 0, 0)),
        "single" != d.mode)
            if (d.date.constructor != Array)
                d.date = [d.date.valueOf()],
                "range" == d.mode && d.date.push(new Date(d.date[0]).setHours(0, 0, 0, 0).valueOf());
            else {
                for (var e = 0; e < d.date.length; e++)
                    d.date[e] = c(d.date[e], d.format, d.separator, d.locale).setHours(0, 0, 0, 0).valueOf();
                "range" == d.mode && (d.date[1] = new Date(d.date[1]).setHours(0, 0, 0, 0).valueOf())
            }
        else
            d.date = d.date.constructor == Array ? d.date[0].valueOf() : d.date.valueOf();
        d.current = new Date("single" != d.mode ? d.date[0] : d.date),
        d.binded.fill()
    }
    function q() {
        var b = a(this)
          , c = b.data("pickmeup-options");
        b.removeData("pickmeup-options"),
        b.off(c.events_namespace),
        a(document).off(c.events_namespace),
        a(this.pickmeup).remove()
    }
    var r = 0;
    a.pickmeup = a.extend(a.pickmeup || {}, {
        date: new Date,
        default_date: new Date,
        flat: !1,
        first_day: 1,
        prev: "&#9664;",
        next: "&#9654;",
        mode: "single",
        select_year: !0,
        select_month: !0,
        select_day: !0,
        view: "days",
        calendars: 1,
        format: "d-m-Y",
        position: "bottom",
        trigger_event: "click touchstart",
        class_name: "",
        separator: " - ",
        hide_on_select: !1,
        min: null,
        max: null,
        render: function() {},
        change: function() {
            return !0
        },
        before_show: function() {
            return !0
        },
        show: function() {
            return !0
        },
        hide: function() {
            return !0
        },
        fill: function() {
            return !0
        },
        locale: {}
    });
    var s = {
        years: "pmu-view-years",
        months: "pmu-view-months",
        days: "pmu-view-days"
    }
      , t = {
        wrapper: '<div class="pickmeup" />',
        head: function(a) {
            for (var b = "", c = 0; 7 > c; ++c)
                b += "<div>" + a.day[c] + "</div>";
            return '<div class="pmu-instance"><nav><div class="pmu-prev pmu-button">' + a.prev + '</div><div class="pmu-month pmu-button" /><div class="pmu-next pmu-button">' + a.next + '</div></nav><nav class="pmu-day-of-week">' + b + "</nav></div>"
        },
        body: function(a, b) {
            for (var c = "", d = 0; d < a.length; ++d)
                c += '<div class="' + a[d].class_name + ' pmu-button">' + a[d].text + "</div>";
            return '<div class="' + b + '">' + c + "</div>"
        }
    };
    a.fn.pickmeup = function(d) {
        if ("string" == typeof d) {
            var g, u = Array.prototype.slice.call(arguments, 1);
            switch (d) {
            case "hide":
            case "show":
            case "clear":
            case "update":
            case "prev":
            case "next":
            case "destroy":
                this.each(function() {
                    g = a(this).data("pickmeup-options"),
                    g && g.binded[d]()
                });
                break;
            case "get_date":
                return g = this.data("pickmeup-options"),
                g ? g.binded.get_date(u[0]) : null;
            case "set_date":
                this.each(function() {
                    g = a(this).data("pickmeup-options"),
                    g && g.binded[d].apply(this, u)
                })
            }
            return this
        }
        return this.each(function() {
            var g = a(this);
            if (!g.data("pickmeup-options")) {
                var u, v, w = a.extend({}, a.pickmeup, d || {});
                for (u in w)
                    v = g.data("pmu-" + u),
                    "undefined" != typeof v && (w[u] = v);
                if ("days" != w.view || w.select_day || (w.view = "months"),
                "months" != w.view || w.select_month || (w.view = "years"),
                "years" != w.view || w.select_year || (w.view = "days"),
                "days" != w.view || w.select_day || (w.view = "months"),
                w.calendars = Math.max(1, parseInt(w.calendars, 10) || 1),
                w.mode = /single|multiple|range/.test(w.mode) ? w.mode : "single",
                "string" == typeof w.min ? w.min = c(w.min, w.format, w.separator, w.locale).setHours(0, 0, 0, 0) : w.min && w.min.constructor == Date && w.min.setHours(0, 0, 0, 0),
                "string" == typeof w.max ? w.max = c(w.max, w.format, w.separator, w.locale).setHours(0, 0, 0, 0) : w.max && w.max.constructor == Date && w.max.setHours(0, 0, 0, 0),
                w.select_day || (w.min && (w.min = new Date(w.min),
                w.min.setDate(1),
                w.min = w.min.valueOf()),
                w.max && (w.max = new Date(w.max),
                w.max.setDate(1),
                w.max = w.max.valueOf())),
                "string" == typeof w.date ? w.date = c(w.date, w.format, w.separator, w.locale).setHours(0, 0, 0, 0) : w.date.constructor == Date && w.date.setHours(0, 0, 0, 0),
                w.date || (w.date = new Date,
                w.date.setHours(0, 0, 0, 0)),
                "single" != w.mode) {
                    if (w.date.constructor != Array)
                        w.date = [w.date.valueOf()],
                        "range" == w.mode && w.date.push(new Date(w.date[0]).setHours(0, 0, 0, 0).valueOf());
                    else {
                        for (u = 0; u < w.date.length; u++)
                            w.date[u] = c(w.date[u], w.format, w.separator, w.locale).setHours(0, 0, 0, 0).valueOf();
                        "range" == w.mode && (w.date[1] = new Date(w.date[1]).setHours(0, 0, 0, 0).valueOf())
                    }
                    if (w.current = new Date(w.date[0]),
                    !w.select_day)
                        for (u = 0; u < w.date.length; ++u)
                            w.date[u] = new Date(w.date[u]),
                            w.date[u].setDate(1),
                            w.date[u] = w.date[u].valueOf(),
                            "range" != w.mode && w.date.indexOf(w.date[u]) !== u && (delete w.date.splice(u, 1),
                            --u)
                } else
                    w.date = w.date.valueOf(),
                    w.current = new Date(w.date),
                    w.select_day || (w.date = new Date(w.date),
                    w.date.setDate(1),
                    w.date = w.date.valueOf());
                w.current.setDate(1),
                w.current.setHours(0, 0, 0, 0);
                var x, y = a(t.wrapper);
                this.pickmeup = y,
                w.class_name && y.addClass(w.class_name);
                var z = "";
                for (u = 0; u < w.calendars; u++)
                    x = w.first_day,
                    z += t.head({
                        prev: w.prev,
                        next: w.next,
                        day: [w.locale.daysMin[x++ % 7], w.locale.daysMin[x++ % 7], w.locale.daysMin[x++ % 7], w.locale.daysMin[x++ % 7], w.locale.daysMin[x++ % 7], w.locale.daysMin[x++ % 7], w.locale.daysMin[x++ % 7]]
                    });
                g.data("pickmeup-options", w);
                for (u in w)
                    -1 != ["render", "change", "before_show", "show", "hide"].indexOf(u) && (w[u] = w[u].bind(this));
                if (w.binded = {
                    fill: b.bind(this),
                    update_date: e.bind(this),
                    click: f.bind(this),
                    show: h.bind(this),
                    forced_show: i.bind(this),
                    hide: j.bind(this),
                    update: k.bind(this),
                    clear: l.bind(this),
                    prev: m.bind(this),
                    next: n.bind(this),
                    get_date: o.bind(this),
                    set_date: p.bind(this),
                    destroy: q.bind(this)
                },
                w.events_namespace = ".pickmeup-" + ++r,
                y.on("click touchstart", w.binded.click).addClass(s[w.view]).append(z).on(a.support.selectstart ? "selectstart" : "mousedown", function(a) {
                    a.preventDefault()
                }),
                w.binded.fill(),
                w.flat)
                    y.appendTo(this).css({
                        position: "relative",
                        display: "inline-block"
                    });
                else {
                    y.appendTo(document.body);
                    var A = w.trigger_event.split(" ");
                    for (u = 0; u < A.length; ++u)
                        A[u] += w.events_namespace;
                    A = A.join(" "),
                    g.on(A, w.binded.show)
                }
            }
        })
    }
}(jQuery),
function(a, b) {
    "use strict";
    a.preload = function() {
        var c = arguments.length > 1 ? arguments : arguments[0];
        if (a.isArray(c))
            return a.when.apply(b, a.map(c, function(b) {
                return a.preload(b)
            }));
        var d = a.Deferred()
          , e = new Image;
        return e.onload = function() {
            d.resolve(e)
        }
        ,
        e.onerror = function() {
            d.reject(e)
        }
        ,
        "string" == typeof c ? e.src = c : (e.id = c.id,
        e.src = c.src),
        d.promise()
    }
}(jQuery, window),
function(a) {
    "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], a) : a(jQuery)
}(function(a) {
    "use strict";
    function b(b) {
        return !b || void 0 !== b.allowPageScroll || void 0 === b.swipe && void 0 === b.swipeStatus || (b.allowPageScroll = j),
        void 0 !== b.click && void 0 === b.tap && (b.tap = b.click),
        b || (b = {}),
        b = a.extend({}, a.fn.swipe.defaults, b),
        this.each(function() {
            var d = a(this)
              , e = d.data(B);
            e || (e = new c(this,b),
            d.data(B, e))
        })
    }
    function c(b, c) {
        function C(b) {
            if (!(jb() || a(b.target).closest(c.excludedElements, Sb).length > 0)) {
                var d, e = b.originalEvent ? b.originalEvent : b, f = y ? e.touches[0] : e;
                return Tb = u,
                y ? Ub = e.touches.length : b.preventDefault(),
                Jb = 0,
                Kb = null,
                Qb = null,
                Lb = 0,
                Mb = 0,
                Nb = 0,
                Ob = 1,
                Pb = 0,
                Vb = ob(),
                Rb = rb(),
                hb(),
                !y || Ub === c.fingers || c.fingers === s || R() ? (lb(0, f),
                Wb = Ab(),
                2 == Ub && (lb(1, e.touches[1]),
                Mb = Nb = ub(Vb[0].start, Vb[1].start)),
                (c.swipeStatus || c.pinchStatus) && (d = J(e, Tb))) : d = !1,
                d === !1 ? (Tb = x,
                J(e, Tb),
                d) : (c.hold && (ac = setTimeout(a.proxy(function() {
                    Sb.trigger("hold", [e.target]),
                    c.hold && (d = c.hold.call(Sb, e, e.target))
                }, this), c.longTapThreshold)),
                kb(!0),
                null)
            }
        }
        function D(a) {
            var b = a.originalEvent ? a.originalEvent : a;
            if (Tb !== w && Tb !== x && !ib()) {
                var d, e = y ? b.touches[0] : b, f = mb(e);
                if (Xb = Ab(),
                y && (Ub = b.touches.length),
                c.hold && clearTimeout(ac),
                Tb = v,
                2 == Ub && (0 == Mb ? (lb(1, b.touches[1]),
                Mb = Nb = ub(Vb[0].start, Vb[1].start)) : (mb(b.touches[1]),
                Nb = ub(Vb[0].end, Vb[1].end),
                Qb = wb(Vb[0].end, Vb[1].end)),
                Ob = vb(Mb, Nb),
                Pb = Math.abs(Mb - Nb)),
                Ub === c.fingers || c.fingers === s || !y || R()) {
                    if (Kb = zb(f.start, f.end),
                    P(a, Kb),
                    Jb = xb(f.start, f.end),
                    Lb = tb(),
                    pb(Kb, Jb),
                    (c.swipeStatus || c.pinchStatus) && (d = J(b, Tb)),
                    !c.triggerOnTouchEnd || c.triggerOnTouchLeave) {
                        var g = !0;
                        if (c.triggerOnTouchLeave) {
                            var h = Bb(this);
                            g = Cb(f.end, h)
                        }
                        !c.triggerOnTouchEnd && g ? Tb = I(v) : c.triggerOnTouchLeave && !g && (Tb = I(w)),
                        (Tb == x || Tb == w) && J(b, Tb)
                    }
                } else
                    Tb = x,
                    J(b, Tb);
                d === !1 && (Tb = x,
                J(b, Tb))
            }
        }
        function E(a) {
            var b = a.originalEvent;
            return y && b.touches.length > 0 ? (gb(),
            !0) : (ib() && (Ub = Zb),
            Xb = Ab(),
            Lb = tb(),
            M() || !L() ? (Tb = x,
            J(b, Tb)) : c.triggerOnTouchEnd || 0 == c.triggerOnTouchEnd && Tb === v ? (a.preventDefault(),
            Tb = w,
            J(b, Tb)) : !c.triggerOnTouchEnd && Y() ? (Tb = w,
            K(b, Tb, n)) : Tb === v && (Tb = x,
            J(b, Tb)),
            kb(!1),
            null)
        }
        function F() {
            Ub = 0,
            Xb = 0,
            Wb = 0,
            Mb = 0,
            Nb = 0,
            Ob = 1,
            hb(),
            kb(!1)
        }
        function G(a) {
            var b = a.originalEvent;
            c.triggerOnTouchLeave && (Tb = I(w),
            J(b, Tb))
        }
        function H() {
            Sb.unbind(Eb, C),
            Sb.unbind(Ib, F),
            Sb.unbind(Fb, D),
            Sb.unbind(Gb, E),
            Hb && Sb.unbind(Hb, G),
            kb(!1)
        }
        function I(a) {
            var b = a
              , d = O()
              , e = L()
              , f = M();
            return !d || f ? b = x : !e || a != v || c.triggerOnTouchEnd && !c.triggerOnTouchLeave ? !e && a == w && c.triggerOnTouchLeave && (b = x) : b = w,
            b
        }
        function J(a, b) {
            var c = void 0;
            return V() || U() ? c = K(a, b, l) : (S() || R()) && c !== !1 && (c = K(a, b, m)),
            eb() && c !== !1 ? c = K(a, b, o) : fb() && c !== !1 ? c = K(a, b, p) : db() && c !== !1 && (c = K(a, b, n)),
            b === x && F(a),
            b === w && (y ? 0 == a.touches.length && F(a) : F(a)),
            c
        }
        function K(b, j, k) {
            var q = void 0;
            if (k == l) {
                if (Sb.trigger("swipeStatus", [j, Kb || null, Jb || 0, Lb || 0, Ub, Vb]),
                c.swipeStatus && (q = c.swipeStatus.call(Sb, b, j, Kb || null, Jb || 0, Lb || 0, Ub, Vb),
                q === !1))
                    return !1;
                if (j == w && T()) {
                    if (Sb.trigger("swipe", [Kb, Jb, Lb, Ub, Vb]),
                    c.swipe && (q = c.swipe.call(Sb, b, Kb, Jb, Lb, Ub, Vb),
                    q === !1))
                        return !1;
                    switch (Kb) {
                    case d:
                        Sb.trigger("swipeLeft", [Kb, Jb, Lb, Ub, Vb]),
                        c.swipeLeft && (q = c.swipeLeft.call(Sb, b, Kb, Jb, Lb, Ub, Vb));
                        break;
                    case e:
                        Sb.trigger("swipeRight", [Kb, Jb, Lb, Ub, Vb]),
                        c.swipeRight && (q = c.swipeRight.call(Sb, b, Kb, Jb, Lb, Ub, Vb));
                        break;
                    case f:
                        Sb.trigger("swipeUp", [Kb, Jb, Lb, Ub, Vb]),
                        c.swipeUp && (q = c.swipeUp.call(Sb, b, Kb, Jb, Lb, Ub, Vb));
                        break;
                    case g:
                        Sb.trigger("swipeDown", [Kb, Jb, Lb, Ub, Vb]),
                        c.swipeDown && (q = c.swipeDown.call(Sb, b, Kb, Jb, Lb, Ub, Vb))
                    }
                }
            }
            if (k == m) {
                if (Sb.trigger("pinchStatus", [j, Qb || null, Pb || 0, Lb || 0, Ub, Ob, Vb]),
                c.pinchStatus && (q = c.pinchStatus.call(Sb, b, j, Qb || null, Pb || 0, Lb || 0, Ub, Ob, Vb),
                q === !1))
                    return !1;
                if (j == w && Q())
                    switch (Qb) {
                    case h:
                        Sb.trigger("pinchIn", [Qb || null, Pb || 0, Lb || 0, Ub, Ob, Vb]),
                        c.pinchIn && (q = c.pinchIn.call(Sb, b, Qb || null, Pb || 0, Lb || 0, Ub, Ob, Vb));
                        break;
                    case i:
                        Sb.trigger("pinchOut", [Qb || null, Pb || 0, Lb || 0, Ub, Ob, Vb]),
                        c.pinchOut && (q = c.pinchOut.call(Sb, b, Qb || null, Pb || 0, Lb || 0, Ub, Ob, Vb))
                    }
            }
            return k == n ? (j === x || j === w) && (clearTimeout(_b),
            clearTimeout(ac),
            Z() && !ab() ? ($b = Ab(),
            _b = setTimeout(a.proxy(function() {
                $b = null,
                Sb.trigger("tap", [b.target]),
                c.tap && (q = c.tap.call(Sb, b, b.target))
            }, this), c.doubleTapThreshold)) : ($b = null,
            Sb.trigger("tap", [b.target]),
            c.tap && (q = c.tap.call(Sb, b, b.target)))) : k == o ? (j === x || j === w) && (clearTimeout(_b),
            $b = null,
            Sb.trigger("doubletap", [b.target]),
            c.doubleTap && (q = c.doubleTap.call(Sb, b, b.target))) : k == p && (j === x || j === w) && (clearTimeout(_b),
            $b = null,
            Sb.trigger("longtap", [b.target]),
            c.longTap && (q = c.longTap.call(Sb, b, b.target))),
            q
        }
        function L() {
            var a = !0;
            return null !== c.threshold && (a = Jb >= c.threshold),
            a
        }
        function M() {
            var a = !1;
            return null !== c.cancelThreshold && null !== Kb && (a = qb(Kb) - Jb >= c.cancelThreshold),
            a
        }
        function N() {
            return null !== c.pinchThreshold ? Pb >= c.pinchThreshold : !0
        }
        function O() {
            var a;
            return a = c.maxTimeThreshold && Lb >= c.maxTimeThreshold ? !1 : !0
        }
        function P(a, b) {
            if (c.allowPageScroll === j || R())
                a.preventDefault();
            else {
                var h = c.allowPageScroll === k;
                switch (b) {
                case d:
                    (c.swipeLeft && h || !h && c.allowPageScroll != q) && a.preventDefault();
                    break;
                case e:
                    (c.swipeRight && h || !h && c.allowPageScroll != q) && a.preventDefault();
                    break;
                case f:
                    (c.swipeUp && h || !h && c.allowPageScroll != r) && a.preventDefault();
                    break;
                case g:
                    (c.swipeDown && h || !h && c.allowPageScroll != r) && a.preventDefault()
                }
            }
        }
        function Q() {
            var a = W()
              , b = X()
              , c = N();
            return a && b && c
        }
        function R() {
            return !!(c.pinchStatus || c.pinchIn || c.pinchOut)
        }
        function S() {
            return !(!Q() || !R())
        }
        function T() {
            var a = O()
              , b = L()
              , c = W()
              , d = X()
              , e = M()
              , f = !e && d && c && b && a;
            return f
        }
        function U() {
            return !!(c.swipe || c.swipeStatus || c.swipeLeft || c.swipeRight || c.swipeUp || c.swipeDown)
        }
        function V() {
            return !(!T() || !U())
        }
        function W() {
            return Ub === c.fingers || c.fingers === s || !y
        }
        function X() {
            return 0 !== Vb[0].end.x
        }
        function Y() {
            return !!c.tap
        }
        function Z() {
            return !!c.doubleTap
        }
        function $() {
            return !!c.longTap
        }
        function _() {
            if (null == $b)
                return !1;
            var a = Ab();
            return Z() && a - $b <= c.doubleTapThreshold
        }
        function ab() {
            return _()
        }
        function bb() {
            return (1 === Ub || !y) && (isNaN(Jb) || Jb < c.threshold)
        }
        function cb() {
            return Lb > c.longTapThreshold && t > Jb
        }
        function db() {
            return !(!bb() || !Y())
        }
        function eb() {
            return !(!_() || !Z())
        }
        function fb() {
            return !(!cb() || !$())
        }
        function gb() {
            Yb = Ab(),
            Zb = event.touches.length + 1
        }
        function hb() {
            Yb = 0,
            Zb = 0
        }
        function ib() {
            var a = !1;
            if (Yb) {
                var b = Ab() - Yb;
                b <= c.fingerReleaseThreshold && (a = !0)
            }
            return a
        }
        function jb() {
            return !(Sb.data(B + "_intouch") !== !0)
        }
        function kb(a) {
            a === !0 ? (Sb.bind(Fb, D),
            Sb.bind(Gb, E),
            Hb && Sb.bind(Hb, G)) : (Sb.unbind(Fb, D, !1),
            Sb.unbind(Gb, E, !1),
            Hb && Sb.unbind(Hb, G, !1)),
            Sb.data(B + "_intouch", a === !0)
        }
        function lb(a, b) {
            var c = void 0 !== b.identifier ? b.identifier : 0;
            return Vb[a].identifier = c,
            Vb[a].start.x = Vb[a].end.x = b.pageX || b.clientX,
            Vb[a].start.y = Vb[a].end.y = b.pageY || b.clientY,
            Vb[a]
        }
        function mb(a) {
            var b = void 0 !== a.identifier ? a.identifier : 0
              , c = nb(b);
            return c.end.x = a.pageX || a.clientX,
            c.end.y = a.pageY || a.clientY,
            c
        }
        function nb(a) {
            for (var b = 0; b < Vb.length; b++)
                if (Vb[b].identifier == a)
                    return Vb[b]
        }
        function ob() {
            for (var a = [], b = 0; 5 >= b; b++)
                a.push({
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    },
                    identifier: 0
                });
            return a
        }
        function pb(a, b) {
            b = Math.max(b, qb(a)),
            Rb[a].distance = b
        }
        function qb(a) {
            return Rb[a] ? Rb[a].distance : void 0
        }
        function rb() {
            var a = {};
            return a[d] = sb(d),
            a[e] = sb(e),
            a[f] = sb(f),
            a[g] = sb(g),
            a
        }
        function sb(a) {
            return {
                direction: a,
                distance: 0
            }
        }
        function tb() {
            return Xb - Wb
        }
        function ub(a, b) {
            var c = Math.abs(a.x - b.x)
              , d = Math.abs(a.y - b.y);
            return Math.round(Math.sqrt(c * c + d * d))
        }
        function vb(a, b) {
            var c = b / a * 1;
            return c.toFixed(2)
        }
        function wb() {
            return 1 > Ob ? i : h
        }
        function xb(a, b) {
            return Math.round(Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)))
        }
        function yb(a, b) {
            var c = a.x - b.x
              , d = b.y - a.y
              , e = Math.atan2(d, c)
              , f = Math.round(180 * e / Math.PI);
            return 0 > f && (f = 360 - Math.abs(f)),
            f
        }
        function zb(a, b) {
            var c = yb(a, b);
            return 45 >= c && c >= 0 ? d : 360 >= c && c >= 315 ? d : c >= 135 && 225 >= c ? e : c > 45 && 135 > c ? g : f
        }
        function Ab() {
            var a = new Date;
            return a.getTime()
        }
        function Bb(b) {
            b = a(b);
            var c = b.offset()
              , d = {
                left: c.left,
                right: c.left + b.outerWidth(),
                top: c.top,
                bottom: c.top + b.outerHeight()
            };
            return d
        }
        function Cb(a, b) {
            return a.x > b.left && a.x < b.right && a.y > b.top && a.y < b.bottom
        }
        var Db = y || A || !c.fallbackToMouseEvents
          , Eb = Db ? A ? z ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown"
          , Fb = Db ? A ? z ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove"
          , Gb = Db ? A ? z ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup"
          , Hb = Db ? null : "mouseleave"
          , Ib = A ? z ? "MSPointerCancel" : "pointercancel" : "touchcancel"
          , Jb = 0
          , Kb = null
          , Lb = 0
          , Mb = 0
          , Nb = 0
          , Ob = 1
          , Pb = 0
          , Qb = 0
          , Rb = null
          , Sb = a(b)
          , Tb = "start"
          , Ub = 0
          , Vb = null
          , Wb = 0
          , Xb = 0
          , Yb = 0
          , Zb = 0
          , $b = 0
          , _b = null
          , ac = null;
        try {
            Sb.bind(Eb, C),
            Sb.bind(Ib, F)
        } catch (bc) {
            a.error("events not supported " + Eb + "," + Ib + " on jQuery.swipe")
        }
        this.enable = function() {
            return Sb.bind(Eb, C),
            Sb.bind(Ib, F),
            Sb
        }
        ,
        this.disable = function() {
            return H(),
            Sb
        }
        ,
        this.destroy = function() {
            return H(),
            Sb.data(B, null),
            Sb
        }
        ,
        this.option = function(b, d) {
            if (void 0 !== c[b]) {
                if (void 0 === d)
                    return c[b];
                c[b] = d
            } else
                a.error("Option " + b + " does not exist on jQuery.swipe.options");
            return null
        }
    }
    var d = "left"
      , e = "right"
      , f = "up"
      , g = "down"
      , h = "in"
      , i = "out"
      , j = "none"
      , k = "auto"
      , l = "swipe"
      , m = "pinch"
      , n = "tap"
      , o = "doubletap"
      , p = "longtap"
      , q = "horizontal"
      , r = "vertical"
      , s = "all"
      , t = 10
      , u = "start"
      , v = "move"
      , w = "end"
      , x = "cancel"
      , y = "ontouchstart"in window
      , z = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled
      , A = window.navigator.pointerEnabled || window.navigator.msPointerEnabled
      , B = "TouchSwipe"
      , C = {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        hold: null,
        triggerOnTouchEnd: !0,
        triggerOnTouchLeave: !1,
        allowPageScroll: "auto",
        fallbackToMouseEvents: !0,
        excludedElements: "label, button, input, select, textarea, a, .noSwipe"
    };
    a.fn.swipe = function(c) {
        var d = a(this)
          , e = d.data(B);
        if (e && "string" == typeof c) {
            if (e[c])
                return e[c].apply(this, Array.prototype.slice.call(arguments, 1));
            a.error("Method " + c + " does not exist on jQuery.swipe")
        } else if (!(e || "object" != typeof c && c))
            return b.apply(this, arguments);
        return d
    }
    ,
    a.fn.swipe.defaults = C,
    a.fn.swipe.phases = {
        PHASE_START: u,
        PHASE_MOVE: v,
        PHASE_END: w,
        PHASE_CANCEL: x
    },
    a.fn.swipe.directions = {
        LEFT: d,
        RIGHT: e,
        UP: f,
        DOWN: g,
        IN: h,
        OUT: i
    },
    a.fn.swipe.pageScroll = {
        NONE: j,
        HORIZONTAL: q,
        VERTICAL: r,
        AUTO: k
    },
    a.fn.swipe.fingers = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        ALL: s
    }
}),
function(a, b) {
    "object" == typeof exports && exports ? b(exports) : "function" == typeof define && define.amd ? define(["exports"], b) : (a.Mustache = {},
    b(Mustache))
}(this, function(a) {
    function b(a) {
        return "function" == typeof a
    }
    function c(a) {
        return p(a) ? "array" : typeof a
    }
    function d(a) {
        return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
    }
    function e(a, b) {
        return null != a && "object" == typeof a && b in a
    }
    function f(a, b) {
        return q.call(a, b)
    }
    function g(a) {
        return !f(r, a)
    }
    function h(a) {
        return String(a).replace(/[&<>"'\/]/g, function(a) {
            return s[a]
        })
    }
    function i(b, c) {
        function e() {
            if (r && !s)
                for (; q.length; )
                    delete o[q.pop()];
            else
                q = [];
            r = !1,
            s = !1
        }
        function f(a) {
            if ("string" == typeof a && (a = a.split(u, 2)),
            !p(a) || 2 !== a.length)
                throw new Error("Invalid tags: " + a);
            h = new RegExp(d(a[0]) + "\\s*"),
            i = new RegExp("\\s*" + d(a[1])),
            m = new RegExp("\\s*" + d("}" + a[1]))
        }
        if (!b)
            return [];
        var h, i, m, n = [], o = [], q = [], r = !1, s = !1;
        f(c || a.tags);
        for (var y, z, A, B, C, D, E = new l(b); !E.eos(); ) {
            if (y = E.pos,
            A = E.scanUntil(h))
                for (var F = 0, G = A.length; G > F; ++F)
                    B = A.charAt(F),
                    g(B) ? q.push(o.length) : s = !0,
                    o.push(["text", B, y, y + 1]),
                    y += 1,
                    "\n" === B && e();
            if (!E.scan(h))
                break;
            if (r = !0,
            z = E.scan(x) || "name",
            E.scan(t),
            "=" === z ? (A = E.scanUntil(v),
            E.scan(v),
            E.scanUntil(i)) : "{" === z ? (A = E.scanUntil(m),
            E.scan(w),
            E.scanUntil(i),
            z = "&") : A = E.scanUntil(i),
            !E.scan(i))
                throw new Error("Unclosed tag at " + E.pos);
            if (C = [z, A, y, E.pos],
            o.push(C),
            "#" === z || "^" === z)
                n.push(C);
            else if ("/" === z) {
                if (D = n.pop(),
                !D)
                    throw new Error('Unopened section "' + A + '" at ' + y);
                if (D[1] !== A)
                    throw new Error('Unclosed section "' + D[1] + '" at ' + y)
            } else
                "name" === z || "{" === z || "&" === z ? s = !0 : "=" === z && f(A)
        }
        if (D = n.pop())
            throw new Error('Unclosed section "' + D[1] + '" at ' + E.pos);
        return k(j(o))
    }
    function j(a) {
        for (var b, c, d = [], e = 0, f = a.length; f > e; ++e)
            b = a[e],
            b && ("text" === b[0] && c && "text" === c[0] ? (c[1] += b[1],
            c[3] = b[3]) : (d.push(b),
            c = b));
        return d
    }
    function k(a) {
        for (var b, c, d = [], e = d, f = [], g = 0, h = a.length; h > g; ++g)
            switch (b = a[g],
            b[0]) {
            case "#":
            case "^":
                e.push(b),
                f.push(b),
                e = b[4] = [];
                break;
            case "/":
                c = f.pop(),
                c[5] = b[2],
                e = f.length > 0 ? f[f.length - 1][4] : d;
                break;
            default:
                e.push(b)
            }
        return d
    }
    function l(a) {
        this.string = a,
        this.tail = a,
        this.pos = 0
    }
    function m(a, b) {
        this.view = a,
        this.cache = {
            ".": this.view
        },
        this.parent = b
    }
    function n() {
        this.cache = {}
    }
    var o = Object.prototype.toString
      , p = Array.isArray || function(a) {
        return "[object Array]" === o.call(a)
    }
      , q = RegExp.prototype.test
      , r = /\S/
      , s = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;"
    }
      , t = /\s*/
      , u = /\s+/
      , v = /\s*=/
      , w = /\s*\}/
      , x = /#|\^|\/|>|\{|&|=|!/;
    l.prototype.eos = function() {
        return "" === this.tail
    }
    ,
    l.prototype.scan = function(a) {
        var b = this.tail.match(a);
        if (!b || 0 !== b.index)
            return "";
        var c = b[0];
        return this.tail = this.tail.substring(c.length),
        this.pos += c.length,
        c
    }
    ,
    l.prototype.scanUntil = function(a) {
        var b, c = this.tail.search(a);
        switch (c) {
        case -1:
            b = this.tail,
            this.tail = "";
            break;
        case 0:
            b = "";
            break;
        default:
            b = this.tail.substring(0, c),
            this.tail = this.tail.substring(c)
        }
        return this.pos += b.length,
        b
    }
    ,
    m.prototype.push = function(a) {
        return new m(a,this)
    }
    ,
    m.prototype.lookup = function(a) {
        var c, d = this.cache;
        if (d.hasOwnProperty(a))
            c = d[a];
        else {
            for (var f, g, h = this, i = !1; h; ) {
                if (a.indexOf(".") > 0)
                    for (c = h.view,
                    f = a.split("."),
                    g = 0; null != c && g < f.length; )
                        g === f.length - 1 && (i = e(c, f[g])),
                        c = c[f[g++]];
                else
                    c = h.view[a],
                    i = e(h.view, a);
                if (i)
                    break;
                h = h.parent
            }
            d[a] = c
        }
        return b(c) && (c = c.call(this.view)),
        c
    }
    ,
    n.prototype.clearCache = function() {
        this.cache = {}
    }
    ,
    n.prototype.parse = function(a, b) {
        var c = this.cache
          , d = c[a];
        return null == d && (d = c[a] = i(a, b)),
        d
    }
    ,
    n.prototype.render = function(a, b, c) {
        var d = this.parse(a)
          , e = b instanceof m ? b : new m(b);
        return this.renderTokens(d, e, c, a)
    }
    ,
    n.prototype.renderTokens = function(a, b, c, d) {
        for (var e, f, g, h = "", i = 0, j = a.length; j > i; ++i)
            g = void 0,
            e = a[i],
            f = e[0],
            "#" === f ? g = this.renderSection(e, b, c, d) : "^" === f ? g = this.renderInverted(e, b, c, d) : ">" === f ? g = this.renderPartial(e, b, c, d) : "&" === f ? g = this.unescapedValue(e, b) : "name" === f ? g = this.escapedValue(e, b) : "text" === f && (g = this.rawValue(e)),
            void 0 !== g && (h += g);
        return h
    }
    ,
    n.prototype.renderSection = function(a, c, d, e) {
        function f(a) {
            return g.render(a, c, d)
        }
        var g = this
          , h = ""
          , i = c.lookup(a[1]);
        if (i) {
            if (p(i))
                for (var j = 0, k = i.length; k > j; ++j)
                    h += this.renderTokens(a[4], c.push(i[j]), d, e);
            else if ("object" == typeof i || "string" == typeof i || "number" == typeof i)
                h += this.renderTokens(a[4], c.push(i), d, e);
            else if (b(i)) {
                if ("string" != typeof e)
                    throw new Error("Cannot use higher-order sections without the original template");
                i = i.call(c.view, e.slice(a[3], a[5]), f),
                null != i && (h += i)
            } else
                h += this.renderTokens(a[4], c, d, e);
            return h
        }
    }
    ,
    n.prototype.renderInverted = function(a, b, c, d) {
        var e = b.lookup(a[1]);
        return !e || p(e) && 0 === e.length ? this.renderTokens(a[4], b, c, d) : void 0
    }
    ,
    n.prototype.renderPartial = function(a, c, d) {
        if (d) {
            var e = b(d) ? d(a[1]) : d[a[1]];
            return null != e ? this.renderTokens(this.parse(e), c, d, e) : void 0
        }
    }
    ,
    n.prototype.unescapedValue = function(a, b) {
        var c = b.lookup(a[1]);
        return null != c ? c : void 0
    }
    ,
    n.prototype.escapedValue = function(b, c) {
        var d = c.lookup(b[1]);
        return null != d ? a.escape(d) : void 0
    }
    ,
    n.prototype.rawValue = function(a) {
        return a[1]
    }
    ,
    a.name = "mustache.js",
    a.version = "2.1.2",
    a.tags = ["{{", "}}"];
    var y = new n;
    a.clearCache = function() {
        return y.clearCache()
    }
    ,
    a.parse = function(a, b) {
        return y.parse(a, b)
    }
    ,
    a.render = function(a, b, d) {
        if ("string" != typeof a)
            throw new TypeError('Invalid template! Template should be a "string" but "' + c(a) + '" was given as the first argument for mustache#render(template, view, partials)');
        return y.render(a, b, d)
    }
    ,
    a.to_html = function(c, d, e, f) {
        var g = a.render(c, d, e);
        return b(f) ? void f(g) : g
    }
    ,
    a.escape = h,
    a.Scanner = l,
    a.Context = m,
    a.Writer = n
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b(require, exports, module) : a.Tether = b()
}(this, function() {
    return function() {
        var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r = {}.hasOwnProperty, s = [].indexOf || function(a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (b in this && this[b] === a)
                    return b;
            return -1
        }
        , t = [].slice;
        null == this.Tether && (this.Tether = {
            modules: []
        }),
        k = function(a) {
            return document.querySelector('[data-role="page"]')
        }
        ,
        o = function() {
            var a;
            return a = 0,
            function() {
                return a++
            }
        }(),
        q = {},
        i = function(a) {
            var b, d, f, g, h;
            if (f = a._tetherZeroElement,
            null == f && (f = a.createElement("div"),
            f.setAttribute("data-tether-id", o()),
            e(f.style, {
                top: 0,
                left: 0,
                position: "absolute"
            }),
            a.body.appendChild(f),
            a._tetherZeroElement = f),
            b = f.getAttribute("data-tether-id"),
            null == q[b]) {
                q[b] = {},
                h = f.getBoundingClientRect();
                for (d in h)
                    g = h[d],
                    q[b][d] = g;
                c(function() {
                    return q[b] = void 0
                })
            }
            return q[b]
        }
        ,
        m = null,
        g = function(a) {
            var b, c, d, e, f, g, h;
            a === document ? (c = document,
            a = document.documentElement) : c = a.ownerDocument,
            d = c.documentElement,
            b = {},
            h = a.getBoundingClientRect();
            for (e in h)
                g = h[e],
                b[e] = g;
            return f = i(c),
            b.top -= f.top,
            b.left -= f.left,
            null == b.width && (b.width = document.body.scrollWidth - b.left - b.right),
            null == b.height && (b.height = document.body.scrollHeight - b.top - b.bottom),
            b.top = b.top - d.clientTop,
            b.left = b.left - d.clientLeft,
            b.right = c.body.clientWidth - b.width - b.left,
            b.bottom = c.body.clientHeight - b.height - b.top,
            b
        }
        ,
        h = function(a) {
            return a.offsetParent || document.documentElement
        }
        ,
        j = function() {
            var a, b, c, d, f;
            return a = document.createElement("div"),
            a.style.width = "100%",
            a.style.height = "200px",
            b = document.createElement("div"),
            e(b.style, {
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
                visibility: "hidden",
                width: "200px",
                height: "150px",
                overflow: "hidden"
            }),
            b.appendChild(a),
            document.body.appendChild(b),
            d = a.offsetWidth,
            b.style.overflow = "scroll",
            f = a.offsetWidth,
            d === f && (f = b.clientWidth),
            document.body.removeChild(b),
            c = d - f,
            {
                width: c,
                height: c
            }
        }
        ,
        e = function(a) {
            var b, c, d, e, f, g, h;
            for (null == a && (a = {}),
            b = [],
            Array.prototype.push.apply(b, arguments),
            h = b.slice(1),
            f = 0,
            g = h.length; g > f; f++)
                if (d = h[f])
                    for (c in d)
                        r.call(d, c) && (e = d[c],
                        a[c] = e);
            return a
        }
        ,
        n = function(a, b) {
            var c, d, e, f, g;
            if (null != a.classList) {
                for (f = b.split(" "),
                g = [],
                d = 0,
                e = f.length; e > d; d++)
                    c = f[d],
                    c.trim() && g.push(a.classList.remove(c));
                return g
            }
            return a.className = a.className.replace(new RegExp("(^| )" + b.split(" ").join("|") + "( |$)","gi"), " ")
        }
        ,
        b = function(a, b) {
            var c, d, e, f, g;
            if (null != a.classList) {
                for (f = b.split(" "),
                g = [],
                d = 0,
                e = f.length; e > d; d++)
                    c = f[d],
                    c.trim() && g.push(a.classList.add(c));
                return g
            }
            return n(a, b),
            a.className += " " + b
        }
        ,
        l = function(a, b) {
            return null != a.classList ? a.classList.contains(b) : new RegExp("(^| )" + b + "( |$)","gi").test(a.className)
        }
        ,
        p = function(a, c, d) {
            var e, f, g, h, i, j;
            for (f = 0,
            h = d.length; h > f; f++)
                e = d[f],
                s.call(c, e) < 0 && l(a, e) && n(a, e);
            for (j = [],
            g = 0,
            i = c.length; i > g; g++)
                e = c[g],
                j.push(l(a, e) ? void 0 : b(a, e));
            return j
        }
        ,
        d = [],
        c = function(a) {
            return d.push(a)
        }
        ,
        f = function() {
            var a, b;
            for (b = []; a = d.pop(); )
                b.push(a());
            return b
        }
        ,
        a = function() {
            function a() {}
            return a.prototype.on = function(a, b, c, d) {
                var e;
                return null == d && (d = !1),
                null == this.bindings && (this.bindings = {}),
                null == (e = this.bindings)[a] && (e[a] = []),
                this.bindings[a].push({
                    handler: b,
                    ctx: c,
                    once: d
                })
            }
            ,
            a.prototype.once = function(a, b, c) {
                return this.on(a, b, c, !0)
            }
            ,
            a.prototype.off = function(a, b) {
                var c, d, e;
                if (null != (null != (d = this.bindings) ? d[a] : void 0)) {
                    if (null == b)
                        return delete this.bindings[a];
                    for (c = 0,
                    e = []; c < this.bindings[a].length; )
                        e.push(this.bindings[a][c].handler === b ? this.bindings[a].splice(c, 1) : c++);
                    return e
                }
            }
            ,
            a.prototype.trigger = function() {
                var a, b, c, d, e, f, g, h, i;
                if (c = arguments[0],
                a = 2 <= arguments.length ? t.call(arguments, 1) : [],
                null != (g = this.bindings) ? g[c] : void 0) {
                    for (e = 0,
                    i = []; e < this.bindings[c].length; )
                        h = this.bindings[c][e],
                        d = h.handler,
                        b = h.ctx,
                        f = h.once,
                        d.apply(null != b ? b : this, a),
                        i.push(f ? this.bindings[c].splice(e, 1) : e++);
                    return i
                }
            }
            ,
            a
        }(),
        this.Tether.Utils = {
            getScrollParent: k,
            getBounds: g,
            getOffsetParent: h,
            extend: e,
            addClass: b,
            removeClass: n,
            hasClass: l,
            updateClasses: p,
            defer: c,
            flush: f,
            uniqueId: o,
            Evented: a,
            getScrollBarSize: j
        }
    }
    .call(this),
    function() {
        var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D = [].slice, E = function(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        };
        if (null == this.Tether)
            throw new Error("You must include the utils.js file before tether.js");
        d = this.Tether,
        C = d.Utils,
        p = C.getScrollParent,
        q = C.getSize,
        n = C.getOuterSize,
        l = C.getBounds,
        m = C.getOffsetParent,
        j = C.extend,
        e = C.addClass,
        w = C.removeClass,
        z = C.updateClasses,
        i = C.defer,
        k = C.flush,
        o = C.getScrollBarSize,
        A = function(a, b, c) {
            return null == c && (c = 1),
            a + c >= b && b >= a - c
        }
        ,
        y = function() {
            var a, b, c, d, e;
            for (a = document.createElement("div"),
            e = ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"],
            c = 0,
            d = e.length; d > c; c++)
                if (b = e[c],
                void 0 !== a.style[b])
                    return b
        }(),
        x = [],
        v = function() {
            var a, b, c;
            for (b = 0,
            c = x.length; c > b; b++)
                a = x[b],
                a.position(!1);
            return k()
        }
        ,
        r = function() {
            var a;
            return null != (a = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? a : +new Date
        }
        ,
        function() {
            var a, b, c, d, e, f, g, h, i;
            for (b = null,
            c = null,
            d = null,
            e = function() {
                if (null != c && c > 16)
                    return c = Math.min(c - 16, 250),
                    void (d = setTimeout(e, 250));
                if (!(null != b && r() - b < 10))
                    return null != d && (clearTimeout(d),
                    d = null),
                    b = r(),
                    v(),
                    c = r() - b
            }
            ,
            h = ["resize", "scroll", "touchmove"],
            i = [],
            f = 0,
            g = h.length; g > f; f++)
                a = h[f],
                i.push(window.addEventListener(a, e));
            return i
        }(),
        a = {
            center: "center",
            left: "right",
            right: "left"
        },
        b = {
            middle: "middle",
            top: "bottom",
            bottom: "top"
        },
        c = {
            top: 0,
            left: 0,
            middle: "50%",
            center: "50%",
            bottom: "100%",
            right: "100%"
        },
        h = function(c, d) {
            var e, f;
            return e = c.left,
            f = c.top,
            "auto" === e && (e = a[d.left]),
            "auto" === f && (f = b[d.top]),
            {
                left: e,
                top: f
            }
        }
        ,
        g = function(a) {
            var b, d;
            return {
                left: null != (b = c[a.left]) ? b : a.left,
                top: null != (d = c[a.top]) ? d : a.top
            }
        }
        ,
        f = function() {
            var a, b, c, d, e, f, g;
            for (b = 1 <= arguments.length ? D.call(arguments, 0) : [],
            c = {
                top: 0,
                left: 0
            },
            e = 0,
            f = b.length; f > e; e++)
                g = b[e],
                d = g.top,
                a = g.left,
                "string" == typeof d && (d = parseFloat(d, 10)),
                "string" == typeof a && (a = parseFloat(a, 10)),
                c.top += d,
                c.left += a;
            return c
        }
        ,
        s = function(a, b) {
            return "string" == typeof a.left && -1 !== a.left.indexOf("%") && (a.left = parseFloat(a.left, 10) / 100 * b.width),
            "string" == typeof a.top && -1 !== a.top.indexOf("%") && (a.top = parseFloat(a.top, 10) / 100 * b.height),
            a
        }
        ,
        t = u = function(a) {
            var b, c, d;
            return d = a.split(" "),
            c = d[0],
            b = d[1],
            {
                top: c,
                left: b
            }
        }
        ,
        B = function() {
            function a(a) {
                this.position = E(this.position, this);
                var b, c, e, f, g;
                for (x.push(this),
                this.history = [],
                this.setOptions(a, !1),
                f = d.modules,
                c = 0,
                e = f.length; e > c; c++)
                    b = f[c],
                    null != (g = b.initialize) && g.call(this);
                this.position()
            }
            return a.modules = [],
            a.prototype.getClass = function(a) {
                var b, c;
                return (null != (b = this.options.classes) ? b[a] : void 0) ? this.options.classes[a] : (null != (c = this.options.classes) ? c[a] : void 0) !== !1 ? this.options.classPrefix ? "" + this.options.classPrefix + "-" + a : a : ""
            }
            ,
            a.prototype.setOptions = function(a, b) {
                var c, d, f, g, h, i;
                for (this.options = a,
                null == b && (b = !0),
                c = {
                    offset: "0 0",
                    targetOffset: "0 0",
                    targetAttachment: "auto auto",
                    classPrefix: "tether"
                },
                this.options = j(c, this.options),
                h = this.options,
                this.element = h.element,
                this.target = h.target,
                this.targetModifier = h.targetModifier,
                "viewport" === this.target ? (this.target = document.body,
                this.targetModifier = "visible") : "scroll-handle" === this.target && (this.target = document.body,
                this.targetModifier = "scroll-handle"),
                i = ["element", "target"],
                f = 0,
                g = i.length; g > f; f++) {
                    if (d = i[f],
                    null == this[d])
                        throw new Error("Tether Error: Both element and target must be defined");
                    null != this[d].jquery ? this[d] = this[d][0] : "string" == typeof this[d] && (this[d] = document.querySelector(this[d]))
                }
                if (e(this.element, this.getClass("element")),
                e(this.target, this.getClass("target")),
                !this.options.attachment)
                    throw new Error("Tether Error: You must provide an attachment");
                return this.targetAttachment = t(this.options.targetAttachment),
                this.attachment = t(this.options.attachment),
                this.offset = u(this.options.offset),
                this.targetOffset = u(this.options.targetOffset),
                null != this.scrollParent && this.disable(),
                this.scrollParent = "scroll-handle" === this.targetModifier ? this.target : p(this.target),
                this.options.enabled !== !1 ? this.enable(b) : void 0
            }
            ,
            a.prototype.getTargetBounds = function() {
                var a, b, c, d, e, f, g, h, i;
                if (null == this.targetModifier)
                    return l(this.target);
                switch (this.targetModifier) {
                case "visible":
                    return this.target === document.body ? {
                        top: pageYOffset,
                        left: pageXOffset,
                        height: innerHeight,
                        width: innerWidth
                    } : (a = l(this.target),
                    e = {
                        height: a.height,
                        width: a.width,
                        top: a.top,
                        left: a.left
                    },
                    e.height = Math.min(e.height, a.height - (pageYOffset - a.top)),
                    e.height = Math.min(e.height, a.height - (a.top + a.height - (pageYOffset + innerHeight))),
                    e.height = Math.min(innerHeight, e.height),
                    e.height -= 2,
                    e.width = Math.min(e.width, a.width - (pageXOffset - a.left)),
                    e.width = Math.min(e.width, a.width - (a.left + a.width - (pageXOffset + innerWidth))),
                    e.width = Math.min(innerWidth, e.width),
                    e.width -= 2,
                    e.top < pageYOffset && (e.top = pageYOffset),
                    e.left < pageXOffset && (e.left = pageXOffset),
                    e);
                case "scroll-handle":
                    return i = this.target,
                    i === document.body ? (i = document.documentElement,
                    a = {
                        left: pageXOffset,
                        top: pageYOffset,
                        height: innerHeight,
                        width: innerWidth
                    }) : a = l(i),
                    h = getComputedStyle(i),
                    c = i.scrollWidth > i.clientWidth || "scroll" === [h.overflow, h.overflowX] || this.target !== document.body,
                    f = 0,
                    c && (f = 15),
                    d = a.height - parseFloat(h.borderTopWidth) - parseFloat(h.borderBottomWidth) - f,
                    e = {
                        width: 15,
                        height: .975 * d * (d / i.scrollHeight),
                        left: a.left + a.width - parseFloat(h.borderLeftWidth) - 15
                    },
                    b = 0,
                    408 > d && this.target === document.body && (b = -11e-5 * Math.pow(d, 2) - .00727 * d + 22.58),
                    this.target !== document.body && (e.height = Math.max(e.height, 24)),
                    g = this.target.scrollTop / (i.scrollHeight - d),
                    e.top = g * (d - e.height - b) + a.top + parseFloat(h.borderTopWidth),
                    this.target === document.body && (e.height = Math.max(e.height, 24)),
                    e
                }
            }
            ,
            a.prototype.clearCache = function() {
                return this._cache = {}
            }
            ,
            a.prototype.cache = function(a, b) {
                return null == this._cache && (this._cache = {}),
                null == this._cache[a] && (this._cache[a] = b.call(this)),
                this._cache[a]
            }
            ,
            a.prototype.enable = function(a) {
                return null == a && (a = !0),
                e(this.target, this.getClass("enabled")),
                e(this.element, this.getClass("enabled")),
                this.enabled = !0,
                this.scrollParent !== document && this.scrollParent.addEventListener("scroll", this.position),
                a ? this.position() : void 0
            }
            ,
            a.prototype.disable = function() {
                return w(this.target, this.getClass("enabled")),
                w(this.element, this.getClass("enabled")),
                this.enabled = !1,
                null != this.scrollParent ? this.scrollParent.removeEventListener("scroll", this.position) : void 0
            }
            ,
            a.prototype.destroy = function() {
                var a, b, c, d, e;
                for (this.disable(),
                e = [],
                a = c = 0,
                d = x.length; d > c; a = ++c) {
                    if (b = x[a],
                    b === this) {
                        x.splice(a, 1);
                        break
                    }
                    e.push(void 0)
                }
                return e
            }
            ,
            a.prototype.updateAttachClasses = function(a, b) {
                var c, d, e, f, g, h, j, k, l, m = this;
                for (null == a && (a = this.attachment),
                null == b && (b = this.targetAttachment),
                f = ["left", "top", "bottom", "right", "middle", "center"],
                (null != (l = this._addAttachClasses) ? l.length : void 0) && this._addAttachClasses.splice(0, this._addAttachClasses.length),
                c = null != this._addAttachClasses ? this._addAttachClasses : this._addAttachClasses = [],
                a.top && c.push("" + this.getClass("element-attached") + "-" + a.top),
                a.left && c.push("" + this.getClass("element-attached") + "-" + a.left),
                b.top && c.push("" + this.getClass("target-attached") + "-" + b.top),
                b.left && c.push("" + this.getClass("target-attached") + "-" + b.left),
                d = [],
                g = 0,
                j = f.length; j > g; g++)
                    e = f[g],
                    d.push("" + this.getClass("element-attached") + "-" + e);
                for (h = 0,
                k = f.length; k > h; h++)
                    e = f[h],
                    d.push("" + this.getClass("target-attached") + "-" + e);
                return i(function() {
                    return null != m._addAttachClasses ? (z(m.element, m._addAttachClasses, d),
                    z(m.target, m._addAttachClasses, d),
                    m._addAttachClasses = void 0) : void 0
                })
            }
            ,
            a.prototype.position = function(a) {
                var b, c, e, i, j, n, p, q, r, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T = this;
                if (null == a && (a = !0),
                this.enabled) {
                    for (this.clearCache(),
                    D = h(this.targetAttachment, this.attachment),
                    this.updateAttachClasses(this.attachment, D),
                    b = this.cache("element-bounds", function() {
                        return l(T.element)
                    }),
                    I = b.width,
                    e = b.height,
                    0 === I && 0 === e && null != this.lastSize ? (N = this.lastSize,
                    I = N.width,
                    e = N.height) : this.lastSize = {
                        width: I,
                        height: e
                    },
                    G = F = this.cache("target-bounds", function() {
                        return T.getTargetBounds()
                    }),
                    r = s(g(this.attachment), {
                        width: I,
                        height: e
                    }),
                    E = s(g(D), G),
                    j = s(this.offset, {
                        width: I,
                        height: e
                    }),
                    n = s(this.targetOffset, G),
                    r = f(r, j),
                    E = f(E, n),
                    i = F.left + E.left - r.left,
                    H = F.top + E.top - r.top,
                    O = d.modules,
                    J = 0,
                    L = O.length; L > J; J++)
                        if (p = O[J],
                        y = p.position.call(this, {
                            left: i,
                            top: H,
                            targetAttachment: D,
                            targetPos: F,
                            attachment: this.attachment,
                            elementPos: b,
                            offset: r,
                            targetOffset: E,
                            manualOffset: j,
                            manualTargetOffset: n,
                            scrollbarSize: B
                        }),
                        null != y && "object" == typeof y) {
                            if (y === !1)
                                return !1;
                            H = y.top,
                            i = y.left
                        }
                    if (q = {
                        page: {
                            top: H,
                            left: i
                        },
                        viewport: {
                            top: H - pageYOffset,
                            bottom: pageYOffset - H - e + innerHeight,
                            left: i - pageXOffset,
                            right: pageXOffset - i - I + innerWidth
                        }
                    },
                    document.body.scrollWidth > window.innerWidth && (B = this.cache("scrollbar-size", o),
                    q.viewport.bottom -= B.height),
                    document.body.scrollHeight > window.innerHeight && (B = this.cache("scrollbar-size", o),
                    q.viewport.right -= B.width),
                    ("" !== (P = document.body.style.position) && "static" !== P || "" !== (Q = document.body.parentElement.style.position) && "static" !== Q) && (q.page.bottom = document.body.scrollHeight - H - e,
                    q.page.right = document.body.scrollWidth - i - I),
                    (null != (R = this.options.optimizations) ? R.moveElement : void 0) !== !1 && null == this.targetModifier) {
                        for (u = this.cache("target-offsetparent", function() {
                            return m(T.target)
                        }),
                        x = this.cache("target-offsetparent-bounds", function() {
                            return l(u)
                        }),
                        w = getComputedStyle(u),
                        c = getComputedStyle(this.element),
                        v = x,
                        t = {},
                        S = ["Top", "Left", "Bottom", "Right"],
                        K = 0,
                        M = S.length; M > K; K++)
                            C = S[K],
                            t[C.toLowerCase()] = parseFloat(w["border" + C + "Width"]);
                        x.right = document.body.scrollWidth - x.left - v.width + t.right,
                        x.bottom = document.body.scrollHeight - x.top - v.height + t.bottom,
                        q.page.top >= x.top + t.top && q.page.bottom >= x.bottom && q.page.left >= x.left + t.left && q.page.right >= x.right && (A = u.scrollTop,
                        z = u.scrollLeft,
                        q.offset = {
                            top: q.page.top - x.top + A - t.top,
                            left: q.page.left - x.left + z - t.left
                        })
                    }
                    return this.move(q),
                    this.history.unshift(q),
                    this.history.length > 3 && this.history.pop(),
                    a && k(),
                    !0
                }
            }
            ,
            a.prototype.move = function(a) {
                var b, c, d, e, f, g, h, k, l, n, o, p, q, r, s, t, u, v = this;
                if (null != this.element.parentNode) {
                    k = {};
                    for (n in a) {
                        k[n] = {};
                        for (e in a[n]) {
                            for (d = !1,
                            t = this.history,
                            r = 0,
                            s = t.length; s > r; r++)
                                if (h = t[r],
                                !A(null != (u = h[n]) ? u[e] : void 0, a[n][e])) {
                                    d = !0;
                                    break
                                }
                            d || (k[n][e] = !0)
                        }
                    }
                    b = {
                        top: "",
                        left: "",
                        right: "",
                        bottom: ""
                    },
                    l = function(a, c) {
                        var d, e, f;
                        return (null != (f = v.options.optimizations) ? f.gpu : void 0) === !1 ? (a.top ? b.top = "" + c.top + "px" : b.bottom = "" + c.bottom + "px",
                        a.left ? b.left = "" + c.left + "px" : b.right = "" + c.right + "px") : (a.top ? (b.top = 0,
                        e = c.top) : (b.bottom = 0,
                        e = -c.bottom),
                        a.left ? (b.left = 0,
                        d = c.left) : (b.right = 0,
                        d = -c.right),
                        b[y] = "translateX(" + Math.round(d) + "px) translateY(" + Math.round(e) + "px)",
                        "msTransform" !== y ? b[y] += " translateZ(0)" : void 0)
                    }
                    ,
                    f = !1,
                    (k.page.top || k.page.bottom) && (k.page.left || k.page.right) ? (b.position = "absolute",
                    l(k.page, a.page)) : (k.viewport.top || k.viewport.bottom) && (k.viewport.left || k.viewport.right) ? (b.position = "fixed",
                    l(k.viewport, a.viewport)) : null != k.offset && k.offset.top && k.offset.left ? (b.position = "absolute",
                    g = this.cache("target-offsetparent", function() {
                        return m(v.target)
                    }),
                    m(this.element) !== g && i(function() {
                        return v.element.parentNode.removeChild(v.element),
                        g.appendChild(v.element)
                    }),
                    l(k.offset, a.offset),
                    f = !0) : (b.position = "absolute",
                    l({
                        top: !0,
                        left: !0
                    }, a.page)),
                    f || "BODY" === this.element.parentNode.tagName || (this.element.parentNode.removeChild(this.element),
                    document.body.appendChild(this.element)),
                    q = {},
                    p = !1;
                    for (e in b)
                        o = b[e],
                        c = this.element.style[e],
                        "" === c || "" === o || "top" !== e && "left" !== e && "bottom" !== e && "right" !== e || (c = parseFloat(c),
                        o = parseFloat(o)),
                        c !== o && (p = !0,
                        q[e] = b[e]);
                    return p ? i(function() {
                        return j(v.element.style, q)
                    }) : void 0
                }
            }
            ,
            a
        }(),
        d.position = v,
        this.Tether = j(B, d)
    }
    .call(this),
    function() {
        var a, b, c, d, e, f, g, h, i, j, k = [].indexOf || function(a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (b in this && this[b] === a)
                    return b;
            return -1
        }
        ;
        j = this.Tether.Utils,
        g = j.getOuterSize,
        f = j.getBounds,
        h = j.getSize,
        d = j.extend,
        i = j.updateClasses,
        c = j.defer,
        b = {
            left: "right",
            right: "left",
            top: "bottom",
            bottom: "top",
            middle: "middle"
        },
        a = ["left", "top", "right", "bottom"],
        e = function(b, c) {
            var d, e, g, h, i, j, k;
            if ("scrollParent" === c ? c = b.scrollParent : "window" === c && (c = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset]),
            c === document && (c = c.documentElement),
            null != c.nodeType)
                for (e = h = f(c),
                i = getComputedStyle(c),
                c = [e.left, e.top, h.width + e.left, h.height + e.top],
                d = j = 0,
                k = a.length; k > j; d = ++j)
                    g = a[d],
                    g = g[0].toUpperCase() + g.substr(1),
                    "Top" === g || "Left" === g ? c[d] += parseFloat(i["border" + g + "Width"]) : c[d] -= parseFloat(i["border" + g + "Width"]);
            return c
        }
        ,
        this.Tether.modules.push({
            position: function(b) {
                var g, h, j, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, ab, bb = this;
                if (H = b.top,
                s = b.left,
                C = b.targetAttachment,
                !this.options.constraints)
                    return !0;
                for (z = function(b) {
                    var c, d, e, f;
                    for (bb.removeClass(b),
                    f = [],
                    d = 0,
                    e = a.length; e > d; d++)
                        c = a[d],
                        f.push(bb.removeClass("" + b + "-" + c));
                    return f
                }
                ,
                V = this.cache("element-bounds", function() {
                    return f(bb.element)
                }),
                r = V.height,
                I = V.width,
                0 === I && 0 === r && null != this.lastSize && (W = this.lastSize,
                I = W.width,
                r = W.height),
                E = this.cache("target-bounds", function() {
                    return bb.getTargetBounds()
                }),
                D = E.height,
                F = E.width,
                B = {},
                q = {},
                h = [this.getClass("pinned"), this.getClass("out-of-bounds")],
                X = this.options.constraints,
                J = 0,
                N = X.length; N > J; J++)
                    p = X[J],
                    p.outOfBoundsClass && h.push(p.outOfBoundsClass),
                    p.pinnedClass && h.push(p.pinnedClass);
                for (K = 0,
                O = h.length; O > K; K++)
                    for (o = h[K],
                    Y = ["left", "top", "right", "bottom"],
                    L = 0,
                    P = Y.length; P > L; L++)
                        A = Y[L],
                        h.push("" + o + "-" + A);
                for (g = [],
                B = d({}, C),
                q = d({}, this.attachment),
                Z = this.options.constraints,
                M = 0,
                Q = Z.length; Q > M; M++) {
                    if (p = Z[M],
                    G = p.to,
                    j = p.attachment,
                    w = p.pin,
                    null == j && (j = ""),
                    k.call(j, " ") >= 0 ? ($ = j.split(" "),
                    n = $[0],
                    m = $[1]) : m = n = j,
                    l = e(this, G),
                    ("target" === n || "both" === n) && (H < l[1] && "top" === B.top && (H += D,
                    B.top = "bottom"),
                    H + r > l[3] && "bottom" === B.top && (H -= D,
                    B.top = "top")),
                    "together" === n && (H < l[1] && "top" === B.top && ("bottom" === q.top ? (H += D,
                    B.top = "bottom",
                    H += r,
                    q.top = "top") : "top" === q.top && (H += D,
                    B.top = "bottom",
                    H -= r,
                    q.top = "bottom")),
                    H + r > l[3] && "bottom" === B.top && ("top" === q.top ? (H -= D,
                    B.top = "top",
                    H -= r,
                    q.top = "bottom") : "bottom" === q.top && (H -= D,
                    B.top = "top",
                    H += r,
                    q.top = "top")),
                    "middle" === B.top && (H + r > l[3] && "top" === q.top ? (H -= r,
                    q.top = "bottom") : H < l[1] && "bottom" === q.top && (H += r,
                    q.top = "top"))),
                    ("target" === m || "both" === m) && (s < l[0] && "left" === B.left && (s += F,
                    B.left = "right"),
                    s + I > l[2] && "right" === B.left && (s -= F,
                    B.left = "left")),
                    "together" === m && (s < l[0] && "left" === B.left ? "right" === q.left ? (s += F,
                    B.left = "right",
                    s += I,
                    q.left = "left") : "left" === q.left && (s += F,
                    B.left = "right",
                    s -= I,
                    q.left = "right") : s + I > l[2] && "right" === B.left ? "left" === q.left ? (s -= F,
                    B.left = "left",
                    s -= I,
                    q.left = "right") : "right" === q.left && (s -= F,
                    B.left = "left",
                    s += I,
                    q.left = "left") : "center" === B.left && (s + I > l[2] && "left" === q.left ? (s -= I,
                    q.left = "right") : s < l[0] && "right" === q.left && (s += I,
                    q.left = "left"))),
                    ("element" === n || "both" === n) && (H < l[1] && "bottom" === q.top && (H += r,
                    q.top = "top"),
                    H + r > l[3] && "top" === q.top && (H -= r,
                    q.top = "bottom")),
                    ("element" === m || "both" === m) && (s < l[0] && "right" === q.left && (s += I,
                    q.left = "left"),
                    s + I > l[2] && "left" === q.left && (s -= I,
                    q.left = "right")),
                    "string" == typeof w ? w = function() {
                        var a, b, c, d;
                        for (c = w.split(","),
                        d = [],
                        b = 0,
                        a = c.length; a > b; b++)
                            v = c[b],
                            d.push(v.trim());
                        return d
                    }() : w === !0 && (w = ["top", "left", "right", "bottom"]),
                    w || (w = []),
                    x = [],
                    t = [],
                    H < l[1] && (k.call(w, "top") >= 0 ? (H = l[1],
                    x.push("top")) : t.push("top")),
                    H + r > l[3] && (k.call(w, "bottom") >= 0 ? (H = l[3] - r,
                    x.push("bottom")) : t.push("bottom")),
                    s < l[0] && (k.call(w, "left") >= 0 ? (s = l[0],
                    x.push("left")) : t.push("left")),
                    s + I > l[2] && (k.call(w, "right") >= 0 ? (s = l[2] - I,
                    x.push("right")) : t.push("right")),
                    x.length)
                        for (y = null != (_ = this.options.pinnedClass) ? _ : this.getClass("pinned"),
                        g.push(y),
                        T = 0,
                        R = x.length; R > T; T++)
                            A = x[T],
                            g.push("" + y + "-" + A);
                    if (t.length)
                        for (u = null != (ab = this.options.outOfBoundsClass) ? ab : this.getClass("out-of-bounds"),
                        g.push(u),
                        U = 0,
                        S = t.length; S > U; U++)
                            A = t[U],
                            g.push("" + u + "-" + A);
                    (k.call(x, "left") >= 0 || k.call(x, "right") >= 0) && (q.left = B.left = !1),
                    (k.call(x, "top") >= 0 || k.call(x, "bottom") >= 0) && (q.top = B.top = !1),
                    (B.top !== C.top || B.left !== C.left || q.top !== this.attachment.top || q.left !== this.attachment.left) && this.updateAttachClasses(q, B)
                }
                return c(function() {
                    return i(bb.target, g, h),
                    i(bb.element, g, h)
                }),
                {
                    top: H,
                    left: s
                }
            }
        })
    }
    .call(this),
    function() {
        var a, b, c, d;
        d = this.Tether.Utils,
        b = d.getBounds,
        c = d.updateClasses,
        a = d.defer,
        this.Tether.modules.push({
            position: function(d) {
                var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D = this;
                if (o = d.top,
                j = d.left,
                y = this.cache("element-bounds", function() {
                    return b(D.element)
                }),
                i = y.height,
                p = y.width,
                n = this.getTargetBounds(),
                h = o + i,
                k = j + p,
                e = [],
                o <= n.bottom && h >= n.top)
                    for (z = ["left", "right"],
                    q = 0,
                    u = z.length; u > q; q++)
                        l = z[q],
                        ((A = n[l]) === j || A === k) && e.push(l);
                if (j <= n.right && k >= n.left)
                    for (B = ["top", "bottom"],
                    r = 0,
                    v = B.length; v > r; r++)
                        l = B[r],
                        ((C = n[l]) === o || C === h) && e.push(l);
                for (g = [],
                f = [],
                m = ["left", "top", "right", "bottom"],
                g.push(this.getClass("abutted")),
                s = 0,
                w = m.length; w > s; s++)
                    l = m[s],
                    g.push("" + this.getClass("abutted") + "-" + l);
                for (e.length && f.push(this.getClass("abutted")),
                t = 0,
                x = e.length; x > t; t++)
                    l = e[t],
                    f.push("" + this.getClass("abutted") + "-" + l);
                return a(function() {
                    return c(D.target, f, g),
                    c(D.element, f, g)
                }),
                !0
            }
        })
    }
    .call(this),
    function() {
        this.Tether.modules.push({
            position: function(a) {
                var b, c, d, e, f, g, h;
                return g = a.top,
                b = a.left,
                this.options.shift ? (c = function(a) {
                    return "function" == typeof a ? a.call(this, {
                        top: g,
                        left: b
                    }) : a
                }
                ,
                d = c(this.options.shift),
                "string" == typeof d ? (d = d.split(" "),
                d[1] || (d[1] = d[0]),
                f = d[0],
                e = d[1],
                f = parseFloat(f, 10),
                e = parseFloat(e, 10)) : (h = [d.top, d.left],
                f = h[0],
                e = h[1]),
                g += f,
                b += e,
                {
                    top: g,
                    left: b
                }) : void 0
            }
        })
    }
    .call(this),
    this.Tether
}),
function() {
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v = function(a, b) {
        return function() {
            return a.apply(b, arguments)
        }
    }, w = {}.hasOwnProperty, x = function(a, b) {
        function c() {
            this.constructor = a
        }
        for (var d in b)
            w.call(b, d) && (a[d] = b[d]);
        return c.prototype = b.prototype,
        a.prototype = new c,
        a.__super__ = b.prototype,
        a
    };
    u = Tether.Utils,
    j = u.extend,
    h = u.addClass,
    p = u.removeClass,
    m = u.hasClass,
    k = u.getBounds,
    d = u.Evented,
    b = 13,
    c = 27,
    e = 32,
    g = 38,
    a = 40,
    s = "ontouchstart"in document.documentElement,
    i = s ? "touchstart" : "click",
    t = function() {
        return s && (innerWidth <= 640 || innerHeight <= 640)
    }
    ,
    n = function(a) {
        return Array.prototype.reduce.call(a, function(a, b) {
            return a === b ? b : !1
        })
    }
    ,
    l = function() {
        var a;
        return null != (a = document.querySelector(".select-target-focused")) ? a.selectInstance : void 0
    }
    ,
    q = "",
    r = void 0,
    o = void 0,
    document.addEventListener("keypress", function(a) {
        var b, c, d, f;
        if ((d = l()) && 0 !== a.charCode)
            return a.keyCode === e && a.preventDefault(),
            clearTimeout(r),
            r = setTimeout(function() {
                return q = ""
            }, 500),
            q += String.fromCharCode(a.charCode),
            b = d.findOptionsByPrefix(q),
            1 === b.length ? void d.selectOption(b[0]) : q.length > 1 && n(q) && (c = d.findOptionsByPrefix(q[0]),
            c.length) ? (f = c.indexOf(d.getChosen()),
            f += 1,
            f %= c.length,
            void d.selectOption(c[f])) : void (b.length && d.selectOption(b[0]))
    }),
    document.addEventListener("keydown", function(d) {
        var f, h, i;
        if (f = l())
            if (((h = d.keyCode) === g || h === a || h === c) && d.preventDefault(),
            f.isOpen())
                switch (d.keyCode) {
                case g:
                case a:
                    return f.moveHighlight(d.keyCode);
                case b:
                    return f.selectHighlightedOption();
                case c:
                    return f.close(),
                    f.target.focus()
                }
            else if ((i = d.keyCode) === g || i === a || i === e)
                return f.open()
    }),
    f = function(a) {
        function b(a) {
            if (this.options = a,
            this.update = v(this.update, this),
            this.options = j({}, b.defaults, this.options),
            this.select = this.options.el,
            null != this.select.selectInstance)
                throw new Error("This element has already been turned into a Select");
            this.setupTarget(),
            this.renderTarget(),
            this.setupDrop(),
            this.renderDrop(),
            this.setupSelect(),
            this.setupTether(),
            this.bindClick(),
            this.bindMutationEvents(),
            this.value = this.select.value
        }
        return x(b, a),
        b.defaults = {
            alignToHighlighed: "auto",
            className: ""
        },
        b.prototype.useNative = function() {
            return this.options.useNative === !0 || t() && this.options.useNative !== !1
        }
        ,
        b.prototype.setupTarget = function() {
            var a, b = this;
            return this.target = document.createElement("div"),
            h(this.target, "select-target"),
            a = this.select.getAttribute("tabindex") || 0,
            this.target.setAttribute("tabindex", a),
            this.options.className && h(this.target, this.options.className),
            this.target.selectInstance = this,
            this.target.addEventListener("click", function() {
                return b.isOpen() ? b.target.blur() : b.target.focus()
            }),
            this.target.addEventListener("focus", function() {
                return h(b.target, "select-target-focused")
            }),
            this.target.addEventListener("blur", function(a) {
                return b.isOpen() && a.relatedTarget && !b.drop.contains(a.relatedTarget) && b.close(),
                p(b.target, "select-target-focused")
            }),
            this.select.parentNode.insertBefore(this.target, this.select.nextSibling)
        }
        ,
        b.prototype.setupDrop = function() {
            var a = this;
            return this.drop = document.createElement("div"),
            h(this.drop, "select"),
            this.options.className && h(this.drop, this.options.className),
            document.body.appendChild(this.drop),
            this.drop.addEventListener("click", function(b) {
                return m(b.target, "select-option") && a.pickOption(b.target),
                b.stopPropagation()
            }),
            this.drop.addEventListener("mousemove", function(b) {
                return m(b.target, "select-option") ? a.highlightOption(b.target) : void 0
            }),
            this.content = document.createElement("div"),
            h(this.content, "select-content"),
            this.drop.appendChild(this.content)
        }
        ,
        b.prototype.open = function() {
            var a, b, c = this;
            return h(this.target, "select-open"),
            this.useNative() ? (this.select.style.display = "block",
            void setTimeout(function() {
                var a;
                return a = document.createEvent("MouseEvents"),
                a.initEvent("mousedown", !0, !0),
                c.select.dispatchEvent(a)
            })) : (h(this.drop, "select-open"),
            setTimeout(function() {
                return c.tether.enable()
            }),
            (b = this.drop.querySelector(".select-option-selected")) ? (this.highlightOption(b),
            this.scrollDropContentToOption(b),
            a = function() {
                var a, d, e;
                return m(c.drop, "tether-abutted-left") || m(c.drop, "tether-abutted-bottom") ? (a = k(c.drop),
                e = k(b),
                d = a.top - (e.top + e.height),
                c.drop.style.top = (parseFloat(c.drop.style.top) || 0) + d + "px") : void 0
            }
            ,
            ("always" === this.options.alignToHighlighted || "auto" === this.options.alignToHighlighted && this.content.scrollHeight <= this.content.clientHeight) && setTimeout(a),
            this.trigger("open")) : void 0)
        }
        ,
        b.prototype.close = function() {
            return p(this.target, "select-open"),
            this.useNative() ? void (this.select.style.display = "none") : (this.tether.disable(),
            p(this.drop, "select-open"),
            this.trigger("close"))
        }
        ,
        b.prototype.toggle = function() {
            return this.isOpen() ? this.close() : this.open()
        }
        ,
        b.prototype.isOpen = function() {
            return m(this.drop, "select-open")
        }
        ,
        b.prototype.bindClick = function() {
            var a = this;
            return this.target.addEventListener(i, function(b) {
                return b.preventDefault(),
                a.toggle()
            }),
            document.addEventListener(i, function(b) {
                return !a.isOpen() || b.target === a.drop || a.drop.contains(b.target) || b.target === a.target || a.target.contains(b.target) ? void 0 : a.close()
            })
        }
        ,
        b.prototype.setupTether = function() {
            return this.tether = new Tether(j({
                element: this.drop,
                target: this.target,
                attachment: "top left",
                targetAttachment: "bottom left",
                classPrefix: "select",
                constraints: [{
                    to: "window",
                    attachment: "together"
                }]
            }, this.options.tetherOptions))
        }
        ,
        b.prototype.renderTarget = function() {
            var a, b, c, d;
            for (this.target.innerHTML = "",
            d = this.select.querySelectorAll("option"),
            b = 0,
            c = d.length; c > b; b++)
                if (a = d[b],
                a.selected) {
                    this.target.innerHTML = "<span>" + a.innerHTML + "</span>";
                    break
                }
            return this.target.appendChild(document.createElement("b"))
        }
        ,
        b.prototype.renderDrop = function() {
            var a, b, c, d, e, f;
            for (c = document.createElement("ul"),
            h(c, "select-options"),
            f = this.select.querySelectorAll("option"),
            d = 0,
            e = f.length; e > d; d++)
                a = f[d],
                b = document.createElement("li"),
                h(b, "select-option"),
                b.setAttribute("data-value", a.value),
                b.innerHTML = a.innerHTML,
                a.selected && h(b, "select-option-selected"),
                c.appendChild(b);
            return this.content.innerHTML = "",
            this.content.appendChild(c)
        }
        ,
        b.prototype.update = function() {
            return this.renderDrop(),
            this.renderTarget()
        }
        ,
        b.prototype.setupSelect = function() {
            return this.select.selectInstance = this,
            h(this.select, "select-select"),
            this.select.addEventListener("change", this.update)
        }
        ,
        b.prototype.bindMutationEvents = function() {
            return null != window.MutationObserver ? (this.observer = new MutationObserver(this.update),
            this.observer.observe(this.select, {
                childList: !0,
                attributes: !0,
                characterData: !0,
                subtree: !0
            })) : this.select.addEventListener("DOMSubtreeModified", this.update)
        }
        ,
        b.prototype.findOptionsByPrefix = function(a) {
            var b;
            return b = this.drop.querySelectorAll(".select-option"),
            a = a.toLowerCase(),
            Array.prototype.filter.call(b, function(b) {
                return b.innerHTML.toLowerCase().substr(0, a.length) === a
            })
        }
        ,
        b.prototype.findOptionsByValue = function(a) {
            var b;
            return b = this.drop.querySelectorAll(".select-option"),
            Array.prototype.filter.call(b, function(b) {
                return b.getAttribute("data-value") === a
            })
        }
        ,
        b.prototype.getChosen = function() {
            return this.drop.querySelector(this.isOpen() ? ".select-option-highlight" : ".select-option-selected")
        }
        ,
        b.prototype.selectOption = function(a) {
            return this.isOpen() ? (this.highlightOption(a),
            this.scrollDropContentToOption(a)) : this.pickOption(a, !1)
        }
        ,
        b.prototype.resetSelection = function() {
            return this.selectOption(this.drop.querySelector(".select-option"))
        }
        ,
        b.prototype.highlightOption = function(a) {
            var b;
            return b = this.drop.querySelector(".select-option-highlight"),
            null != b && p(b, "select-option-highlight"),
            h(a, "select-option-highlight"),
            this.trigger("highlight", {
                option: a
            })
        }
        ,
        b.prototype.moveHighlight = function(a) {
            var b, c, d, e;
            return (b = this.drop.querySelector(".select-option-highlight")) ? (e = this.drop.querySelectorAll(".select-option"),
            c = Array.prototype.indexOf.call(e, b),
            c >= 0 && (a === g ? c -= 1 : c += 1,
            !(0 > c || c >= e.length)) ? (d = e[c],
            this.highlightOption(d),
            this.scrollDropContentToOption(d)) : void 0) : void this.highlightOption(this.drop.querySelector(".select-option"))
        }
        ,
        b.prototype.scrollDropContentToOption = function(a) {
            var b, c;
            return this.content.scrollHeight > this.content.clientHeight ? (b = k(this.content),
            c = k(a),
            this.content.scrollTop = c.top - (b.top - this.content.scrollTop)) : void 0
        }
        ,
        b.prototype.selectHighlightedOption = function() {
            return this.pickOption(this.drop.querySelector(".select-option-highlight"))
        }
        ,
        b.prototype.pickOption = function(a, b) {
            var c = this;
            return null == b && (b = !0),
            this.value = this.select.value = a.getAttribute("data-value"),
            this.triggerChange(),
            b ? setTimeout(function() {
                return c.close(),
                c.target.focus()
            }) : void 0
        }
        ,
        b.prototype.triggerChange = function() {
            var a;
            return a = document.createEvent("HTMLEvents"),
            a.initEvent("change", !0, !1),
            this.select.dispatchEvent(a),
            this.trigger("change", {
                value: this.select.value
            })
        }
        ,
        b.prototype.change = function(a) {
            var b;
            if (b = this.findOptionsByValue(a),
            !b.length)
                throw new Error('Select Error: An option with the value "' + a + "\" doesn't exist");
            return this.pickOption(b[0], !1)
        }
        ,
        b
    }(d),
    f.init = function(a) {
        var b, c, d, e, g;
        if (null == a && (a = {}),
        "loading" === document.readyState)
            return void document.addEventListener("DOMContentLoaded", function() {
                return f.init(a)
            });
        for (null == a.selector && (a.selector = "select"),
        e = document.querySelectorAll(a.selector),
        g = [],
        c = 0,
        d = e.length; d > c; c++)
            b = e[c],
            g.push(b.selectInstance ? void 0 : new f(j({
                el: b
            }, a)));
        return g
    }
    ,
    window.Select = f
}
.call(this),
window.url = function() {
    function a(a) {
        return !isNaN(parseFloat(a)) && isFinite(a)
    }
    return function(b, c) {
        var d = c || window.location.toString();
        if (!b)
            return d;
        b = b.toString(),
        "//" === d.substring(0, 2) ? d = "http:" + d : 1 === d.split("://").length && (d = "http://" + d),
        c = d.split("/");
        var e = {
            auth: ""
        }
          , f = c[2].split("@");
        1 === f.length ? f = f[0].split(":") : (e.auth = f[0],
        f = f[1].split(":")),
        e.protocol = c[0],
        e.hostname = f[0],
        e.port = f[1] || ("https" === e.protocol.split(":")[0].toLowerCase() ? "443" : "80"),
        e.pathname = (c.length > 3 ? "/" : "") + c.slice(3, c.length).join("/").split("?")[0].split("#")[0];
        var g = e.pathname;
        "/" === g.charAt(g.length - 1) && (g = g.substring(0, g.length - 1));
        var h = e.hostname
          , i = h.split(".")
          , j = g.split("/");
        if ("hostname" === b)
            return h;
        if ("domain" === b)
            return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(h) ? h : i.slice(-2).join(".");
        if ("sub" === b)
            return i.slice(0, i.length - 2).join(".");
        if ("port" === b)
            return e.port;
        if ("protocol" === b)
            return e.protocol.split(":")[0];
        if ("auth" === b)
            return e.auth;
        if ("user" === b)
            return e.auth.split(":")[0];
        if ("pass" === b)
            return e.auth.split(":")[1] || "";
        if ("path" === b)
            return e.pathname;
        if ("." === b.charAt(0)) {
            if (b = b.substring(1),
            a(b))
                return b = parseInt(b, 10),
                i[0 > b ? i.length + b : b - 1] || ""
        } else {
            if (a(b))
                return b = parseInt(b, 10),
                j[0 > b ? j.length + b : b] || "";
            if ("file" === b)
                return j.slice(-1)[0];
            if ("filename" === b)
                return j.slice(-1)[0].split(".")[0];
            if ("fileext" === b)
                return j.slice(-1)[0].split(".")[1] || "";
            if ("?" === b.charAt(0) || "#" === b.charAt(0)) {
                var k = d
                  , l = null;
                if ("?" === b.charAt(0) ? k = (k.split("?")[1] || "").split("#")[0] : "#" === b.charAt(0) && (k = k.split("#")[1] || ""),
                !b.charAt(1))
                    return k;
                b = b.substring(1),
                k = k.split("&");
                for (var m = 0, n = k.length; n > m; m++)
                    if (l = k[m].split("="),
                    l[0] === b)
                        return l[1] || "";
                return null
            }
        }
        return ""
    }
}(),
"undefined" != typeof jQuery && jQuery.extend({
    url: function(a, b) {
        return window.url(a, b)
    }
});
