!function(a) {
    a.fn.extend({goTop: function(b) {
            if (a(this).is(":animated"))
                return !1;
            var c = a(this).offset().top;
            return b = b || 400, a("html,body").animate({scrollTop: c}, b), this
        },createGoTop: function(b) {
            var c = this, d = c.parent(), e = a.extend({reference: d,actor: d}, b), f = a(e.reference), g = a(e.actor), h = f.offset().top;
            "fixed" !== c.css("position") ? c.css({display: "none",position: "fixed",left: e.left || f.offset().left + f.outerWidth() + "px",bottom: e.bottom || "0px",margin: "0"}) : (e.left && c.css("left", e.left), e.bottom && c.css("left", e.bottom)), c.on("click", function(a) {
                g.goTop(), a.preventDefault()
            }), a(window).on("scroll", function() {
                a(this).scrollTop() >= h ? c.css("display", "block").stop().animate({opacity: 1}) : c.stop().animate({opacity: 0}, function() {
                    c.css("display", "none")
                })
            })
        },createPlaceholder: function() {
            return "placeholder" in document.createElement("input") ? !1 : this.each(function() {
                var b = a(this), c = a("<label>" + b.attr("placeholder") + "</label>");
                c.css({height: b.innerHeight() + "px","line-height": b.innerHeight() + "px",position: "absolute",left: b.position().left,top: b.position().top,"z-index": "1000",color: "#b8bcc2",cursor: "text"}).css(b.css(["margin-top", "margin-left", "padding-top", "padding-left", "font-size"])).attr("for", b.attr("id")).insertBefore(b), b.data("placeholder", c).on("keydown keyup", function() {
                    var b = a(this), c = b.data("placeholder");
                    b.val() ? c.css("visibility", "hidden") : c.css("visibility", "visible")
                }).triggerHandler("keyup")
            })
        },bindDropDownList: function(b) {
            var c = a.extend({DDList: this.siblings("ul"),"class": "dropDownButton" + (new Date).getTime(),start: null,stop: null}, b);
            return this.each(function(b) {
                var d = a(this);
                if (!d.data("DDList")) {
                    d.data("DDList", a(c.DDList).eq(b));
                    var e = d.data("DDList");
                    d.on("click", c.start).on("click", function() {
                        var b = a(this), d = b.data("DDList");
                        if (d.is(":animated"))
                            return !1;
                        if (b.hasClass(c.class))
                            b.removeClass(c.class), a(document).off("click." + c.class);
                        else {
                            var e = a("." + c.class);
                            e.length && e.triggerHandler("click"), b.addClass(c.class), a(document).on("click." + c.class, function() {
                                var b = a("." + c.class);
                                b.length && b.triggerHandler("click")
                            })
                        }
                        return d.fadeToggle(100, c.stop), !1
                    }), e.on("click", function(a) {
                        a.stopPropagation()
                    }).on("click", "a", function() {
                        a("." + c.class).triggerHandler("click")
                    })
                }
            })
        },offsetContent: function() {
            var a = this, b = a.offset().left + parseFloat(a.css("border-left-width")), c = a.offset().top + parseFloat(a.css("border-top-width"));
            return {left: b,top: c}
        },realOffsetParent: function() {
            var a, b = this, c = "none" === b.css("display") ? !0 : !1;
            if (c) {
                var d = b.css("display");
                b.css("display", "block")
            }
            return a = b.offsetParent(), c && b.css("display", d), a
        },draggable: function(b) {
            return this.each(function() {
                var c = a(this), d = c.realOffsetParent(), e = a.extend({container: d,dragHandler: c,lockX: !1,lockY: !1,start: null}, b);
                c.css({margin: 0}), "absolute" !== c.css("position") && c.css("position", "absolute");
                var f = d.offsetContent().left, g = d.offsetContent().top, h = e.container.offsetContent().left, i = e.container.offsetContent().top, j = h - f, k = i - g, l = e.container.innerWidth() + j - c.outerWidth(), m = e.container.innerHeight() + k - c.outerHeight();
                c.on("move", function(b, c, d) {
                    var f = a(this);
                    e.lockX || (c > l ? f.css("left", l) : j > c ? f.css("left", j) : f.css("left", c)), e.lockY || (d > m ? f.css("top", m) : k > d ? f.css("top", k) : f.css("top", d))
                }).on("move", e.drag), e.dragHandler.on("mousedown.drag", e.start).on("mousedown.drag", function(b) {
                    var d = b.pageX - c.offset().left, h = b.pageY - c.offset().top;
                    a(document).on("mousemove.drag", {dLeft: d,dTop: h}, function(b) {
                        var d = b.pageX - f - b.data.dLeft, e = b.pageY - g - b.data.dTop;
                        c.triggerHandler("move", [d, e]), a.clearSlct()
                    }).on("mouseup.drag", e.stop).on("mouseup.drag", function() {
                        a(this).off("mousemove.drag mouseup.drag")
                    }), b.preventDefault()
                })
            })
        },mousewheel: function(b) {
            return this.each(function() {
                function c(a) {
                    a = a || window.event, "detail" in a && (a.wheelDelta = -a.detail), "cancelBubble" in a && (a.stopPropagation = function() {
                        a.cancelBubble = !0
                    }), "returnValue" in a && (a.preventDefault = function() {
                        a.returnValue = !1
                    }), b.call(d, a)
                }
                var d = (a(this), this);
                window.addEventListener ? (this.addEventListener("DOMMouseScroll", c, !1), this.addEventListener("mousewheel", c, !1)) : this.attachEvent("onmousewheel", c)
            })
        },createScroll: function(b) {
            var c = a.extend({alwaysVisible: !0,height: "300px",size: "8px",color: "#000",railColor: "#666",railVisible: !0,wheelStep: 10,containerClass: "scroll-container",barClass: "scroll-bar",railClass: "scroll-rail"}, b);
            return this.each(function() {
                function b() {
                    l.stop(!0, !0).fadeIn(), c.railVisible && m.stop(!0, !0).fadeIn()
                }
                function d() {
                    n || o || c.alwaysVisible || (l.stop(!0, !0).delay(1e3).fadeOut(), c.railVisible && m.stop(!0, !0).delay(1e3).fadeOut())
                }
                var e = a(this), f = parseFloat(c.height), g = this.scrollHeight, h = c.wheelStep, i = f / g, j = g / f;
                if (e.css({height: f + "px",overflow: "hidden"}), !(f >= g)) {
                    c.alwaysVisible && "0px" === e.css("padding-right") && e.css("padding-right", c.size);
                    var k = a("<div></div>").addClass(c.containerClass).css({width: "auto",height: f + "px",position: "relative",overflow: "hidden"}), l = a("<div></div>").addClass(c.barClass).css({display: c.alwaysVisible ? "block" : "none",width: c.size,height: f * i + "px",position: "absolute",right: 0,top: 0,"z-index": 100,"background-color": c.color,opacity: .4,"-webkit-border-radius": c.size,"-moz-border-radius": c.size,"border-radius": c.size}), m = a("<div></div>").addClass(c.railClass).css({display: c.railVisible && c.alwaysVisible ? "block" : "none",width: c.size,height: f + "px",position: "absolute",right: 0,top: 0,"z-index": 99,"background-color": c.railColor,opacity: .4,"-webkit-border-radius": c.size,"-moz-border-radius": c.size,"border-radius": c.size});
                    e.wrap(k);
                    var k = e.parent().append(l).append(m), l = k.find(".scroll-bar"), m = k.find(".scroll-rail");
                    if (!c.alwaysVisible) {
                        var n = !1, o = !1;
                        k.on("mouseenter", function() {
                            o = !0, b()
                        }).on("mouseleave", function() {
                            o = !1, d()
                        })
                    }
                    var p = 0;
                    l.draggable({lockX: !0,start: c.alwaysVisible ? null : function() {
                            n = !0
                        },stop: c.alwaysVisible ? null : function() {
                            n = !1, d()
                        },drag: function() {
                            p = a(this).position().top * j, e.scrollTop(p)
                        }}), k.mousewheel(function(b) {
                        a(this);
                        p = b.wheelDelta > 0 ? Math.max(0, p - h) : Math.min(g - f, p + h), e.scrollTop(p), l.css("top", p * i + "px"), b.stopPropagation(), b.preventDefault()
                    })
                }
            })
        },createWindow: function(b) {
            var c = a.extend({draggable: !1}, b);
            return this.each(function() {
                var b = a(this), d = a(".window-overlay");
                d.length ? (b.appendTo(d), d.css("display", "none")) : (b.wrap('<div class="window-overlay"></div>'), d = b.parent().appendTo("body").css({display: "none",width: "100%",height: "100%",position: "absolute",left: "0",top: "0","z-index": "1000","background-color": "rgba(0,0,0,.6)"}));
                var e = b.outerWidth(), f = b.outerHeight();
                if (c.draggable) {
                    var g = b.find(".window-handler");
                    b.draggable({dragHandler: g.length ? g : b})
                }
                b.css({display: "none",position: "absolute"}).on("click", function(a) {
                    a.stopPropagation()
                }).on("locate", function() {
                    var b = a(this), c = a(window).height(), d = a(window).width();
                    f >= c ? b.css("top", "40px") : b.css("top", a("body").scrollTop() + (c - f) / 2 + "px"), b.css("left", a("body").scrollLeft() + (d - e) / 2 + "px")
                }).on("open", function() {
                    a(this).fadeIn(), d.fadeIn(), a(window).on("resize.window", function() {
                        b.triggerHandler("locate")
                    }).triggerHandler("resize.window"), d.on("click.window", function() {
                        return b.triggerHandler("close"), !1
                    })
                }).on("close", function() {
                    a(this).fadeOut(), d.fadeOut(), a("window").off("resize.window"), d.on("click.window")
                }).triggerHandler("locate");
                var h = b.find(".window-close-button");
                h.length && h.on("click", function() {
                    return b.triggerHandler("close"), !1
                })
            })
        },bindFileButton: function(b) {
            var c = a.extend({fileButton: this.siblings("input:file").eq(0),textArea: this.siblings("input:text").eq(0)}, b), d = this, e = c.fileButton, f = c.textArea;
            d.on("click", function() {
                e.trigger("click")
            }), e.on("change", function() {
                f.val(a(this).val())
            })
        },validate: function(b) {
            function c(b, c) {
                var e = a.extend({}, c);
                delete e.target, delete e.on, a(b).each(function() {
                    var b = a(this), f = b.data("_validation_");
                    f || (b.data("_validation_", e), f = b.data("_validation_"), f.id = (new Date).getTime(), "submit" !== b.prop("type") ? (b.on(c.on + ".validate", function() {
                        var b = a(this), c = b.data("_validation_"), e = d.data("_validation_"), f = new RegExp(c.reg).test(b.val()) === c.expect, g = a.indexOf(e.idBox, c.id);
                        if (f ? -1 !== g && (e.idBox.splice(g, 1), e.infoBox.splice(g, 1)) : -1 === g && (e.idBox.push(c.id), e.infoBox.push(c.info)), e.passed = e.idBox.length ? !1 : !0, "function" == typeof c.always && c.always.call(this, f, e.passed, c.info), f) {
                            if ("function" == typeof c.succeed)
                                return c.succeed.call(this, e.passed)
                        } else if ("function" == typeof c.fail)
                            return c.fail.call(this, c.info)
                    }), b.triggerHandler(c.on + ".validate")) : b.on(c.on + ".validate", function() {
                        var b = a(this), c = b.data("_validation_"), e = d.data("_validation_");
                        if ("function" == typeof c.always && c.always.call(this, e.passed, e.infoBox), e.passed) {
                            if ("function" == typeof c.succeed)
                                return result = c.succeed.call(this)
                        } else if ("function" == typeof c.fail)
                            return result = c.fail.call(this, e.infoBox)
                    }))
                })
            }
            var d = a(this), e = a.extend(!0, {isEmpty: {reg: /^\s*$/,expect: !0,info: "It should be empty!",on: "change"},isEmail: {reg: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,expect: !0,info: "It is not a Email address!",on: "change"},isNum: {reg: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,expect: !0,info: "It is not a number!",on: "change"},isInt: {reg: /^\d+$/,expect: !0,info: "It is not a integer!",on: "change"},submit: {on: "click"}}, a.fn.validate.setup), f = function(b, c) {
                var d = {}, e = "";
                for (e in c)
                    d[e] = {expect: !0,on: "change"}, a.extend(d[e], b[e], c[e]);
                return d
            }(e, b);
            return function(a, b) {
                a.data("_validation_", {passed: !0,idBox: [],infoBox: []});
                var d, e = "";
                for (e in b)
                    d = b[e], c(d.target, d)
            }(d, f), d
        }}), a.extend({clearSlct: "getSelection" in window ? function() {
            window.getSelection().removeAllRanges()
        } : function() {
            document.selection.empty()
        },indexOf: function(a, b, c) {
            if (!(!a instanceof Array)) {
                var d;
                if (c = c || 0, Array.prototype.indexOf)
                    d = a.indexOf(b, c);
                else {
                    for (var e = c, f = a.length; f > e; e++)
                        if (a[e] === b) {
                            d = e;
                            break
                        }
                    void 0 === d && (d = -1)
                }
                return d
            }
        }})
}(jQuery);
