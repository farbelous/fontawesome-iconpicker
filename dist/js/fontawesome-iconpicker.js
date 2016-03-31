!function(a, b) {
    function c(a, b, c) {
        return [ parseFloat(a[0]) * (n.test(a[0]) ? b / 100 : 1), parseFloat(a[1]) * (n.test(a[1]) ? c / 100 : 1) ];
    }
    function d(b, c) {
        return parseInt(a.css(b, c), 10) || 0;
    }
    function e(b) {
        var c = b[0];
        return 9 === c.nodeType ? {
            width: b.width(),
            height: b.height(),
            offset: {
                top: 0,
                left: 0
            }
        } : a.isWindow(c) ? {
            width: b.width(),
            height: b.height(),
            offset: {
                top: b.scrollTop(),
                left: b.scrollLeft()
            }
        } : c.preventDefault ? {
            width: 0,
            height: 0,
            offset: {
                top: c.pageY,
                left: c.pageX
            }
        } : {
            width: b.outerWidth(),
            height: b.outerHeight(),
            offset: b.offset()
        };
    }
    a.ui = a.ui || {};
    var f, g = Math.max, h = Math.abs, i = Math.round, j = /left|center|right/, k = /top|center|bottom/, l = /[\+\-]\d+(\.[\d]+)?%?/, m = /^\w+/, n = /%$/, o = a.fn.pos;
    a.pos = {
        scrollbarWidth: function() {
            if (f !== b) return f;
            var c, d, e = a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), g = e.children()[0];
            return a("body").append(e), c = g.offsetWidth, e.css("overflow", "scroll"), d = g.offsetWidth, 
            c === d && (d = e[0].clientWidth), e.remove(), f = c - d;
        },
        getScrollInfo: function(b) {
            var c = b.isWindow || b.isDocument ? "" : b.element.css("overflow-x"), d = b.isWindow || b.isDocument ? "" : b.element.css("overflow-y"), e = "scroll" === c || "auto" === c && b.width < b.element[0].scrollWidth, f = "scroll" === d || "auto" === d && b.height < b.element[0].scrollHeight;
            return {
                width: f ? a.pos.scrollbarWidth() : 0,
                height: e ? a.pos.scrollbarWidth() : 0
            };
        },
        getWithinInfo: function(b) {
            var c = a(b || window), d = a.isWindow(c[0]), e = !!c[0] && 9 === c[0].nodeType;
            return {
                element: c,
                isWindow: d,
                isDocument: e,
                offset: c.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: c.scrollLeft(),
                scrollTop: c.scrollTop(),
                width: d ? c.width() : c.outerWidth(),
                height: d ? c.height() : c.outerHeight()
            };
        }
    }, a.fn.pos = function(b) {
        if (!b || !b.of) return o.apply(this, arguments);
        b = a.extend({}, b);
        var f, n, p, q, r, s, t = a(b.of), u = a.pos.getWithinInfo(b.within), v = a.pos.getScrollInfo(u), w = (b.collision || "flip").split(" "), x = {};
        return s = e(t), t[0].preventDefault && (b.at = "left top"), n = s.width, p = s.height, 
        q = s.offset, r = a.extend({}, q), a.each([ "my", "at" ], function() {
            var a, c, d = (b[this] || "").split(" ");
            1 === d.length && (d = j.test(d[0]) ? d.concat([ "center" ]) : k.test(d[0]) ? [ "center" ].concat(d) : [ "center", "center" ]), 
            d[0] = j.test(d[0]) ? d[0] : "center", d[1] = k.test(d[1]) ? d[1] : "center", a = l.exec(d[0]), 
            c = l.exec(d[1]), x[this] = [ a ? a[0] : 0, c ? c[0] : 0 ], b[this] = [ m.exec(d[0])[0], m.exec(d[1])[0] ];
        }), 1 === w.length && (w[1] = w[0]), "right" === b.at[0] ? r.left += n : "center" === b.at[0] && (r.left += n / 2), 
        "bottom" === b.at[1] ? r.top += p : "center" === b.at[1] && (r.top += p / 2), f = c(x.at, n, p), 
        r.left += f[0], r.top += f[1], this.each(function() {
            var e, j, k = a(this), l = k.outerWidth(), m = k.outerHeight(), o = d(this, "marginLeft"), s = d(this, "marginTop"), y = l + o + d(this, "marginRight") + v.width, z = m + s + d(this, "marginBottom") + v.height, A = a.extend({}, r), B = c(x.my, k.outerWidth(), k.outerHeight());
            "right" === b.my[0] ? A.left -= l : "center" === b.my[0] && (A.left -= l / 2), "bottom" === b.my[1] ? A.top -= m : "center" === b.my[1] && (A.top -= m / 2), 
            A.left += B[0], A.top += B[1], a.support.offsetFractions || (A.left = i(A.left), 
            A.top = i(A.top)), e = {
                marginLeft: o,
                marginTop: s
            }, a.each([ "left", "top" ], function(c, d) {
                a.ui.pos[w[c]] && a.ui.pos[w[c]][d](A, {
                    targetWidth: n,
                    targetHeight: p,
                    elemWidth: l,
                    elemHeight: m,
                    collisionPosition: e,
                    collisionWidth: y,
                    collisionHeight: z,
                    offset: [ f[0] + B[0], f[1] + B[1] ],
                    my: b.my,
                    at: b.at,
                    within: u,
                    elem: k
                });
            }), b.using && (j = function(a) {
                var c = q.left - A.left, d = c + n - l, e = q.top - A.top, f = e + p - m, i = {
                    target: {
                        element: t,
                        left: q.left,
                        top: q.top,
                        width: n,
                        height: p
                    },
                    element: {
                        element: k,
                        left: A.left,
                        top: A.top,
                        width: l,
                        height: m
                    },
                    horizontal: 0 > d ? "left" : c > 0 ? "right" : "center",
                    vertical: 0 > f ? "top" : e > 0 ? "bottom" : "middle"
                };
                l > n && h(c + d) < n && (i.horizontal = "center"), m > p && h(e + f) < p && (i.vertical = "middle"), 
                g(h(c), h(d)) > g(h(e), h(f)) ? i.important = "horizontal" : i.important = "vertical", 
                b.using.call(this, a, i);
            }), k.offset(a.extend(A, {
                using: j
            }));
        });
    }, a.ui.pos = {
        _trigger: function(a, b, c, d) {
            b.elem && b.elem.trigger({
                type: c,
                position: a,
                positionData: b,
                triggered: d
            });
        },
        fit: {
            left: function(b, c) {
                a.ui.pos._trigger(b, c, "posCollide", "fitLeft");
                var d, e = c.within, f = e.isWindow ? e.scrollLeft : e.offset.left, h = e.width, i = b.left - c.collisionPosition.marginLeft, j = f - i, k = i + c.collisionWidth - h - f;
                c.collisionWidth > h ? j > 0 && 0 >= k ? (d = b.left + j + c.collisionWidth - h - f, 
                b.left += j - d) : k > 0 && 0 >= j ? b.left = f : j > k ? b.left = f + h - c.collisionWidth : b.left = f : j > 0 ? b.left += j : k > 0 ? b.left -= k : b.left = g(b.left - i, b.left), 
                a.ui.pos._trigger(b, c, "posCollided", "fitLeft");
            },
            top: function(b, c) {
                a.ui.pos._trigger(b, c, "posCollide", "fitTop");
                var d, e = c.within, f = e.isWindow ? e.scrollTop : e.offset.top, h = c.within.height, i = b.top - c.collisionPosition.marginTop, j = f - i, k = i + c.collisionHeight - h - f;
                c.collisionHeight > h ? j > 0 && 0 >= k ? (d = b.top + j + c.collisionHeight - h - f, 
                b.top += j - d) : k > 0 && 0 >= j ? b.top = f : j > k ? b.top = f + h - c.collisionHeight : b.top = f : j > 0 ? b.top += j : k > 0 ? b.top -= k : b.top = g(b.top - i, b.top), 
                a.ui.pos._trigger(b, c, "posCollided", "fitTop");
            }
        },
        flip: {
            left: function(b, c) {
                a.ui.pos._trigger(b, c, "posCollide", "flipLeft");
                var d, e, f = c.within, g = f.offset.left + f.scrollLeft, i = f.width, j = f.isWindow ? f.scrollLeft : f.offset.left, k = b.left - c.collisionPosition.marginLeft, l = k - j, m = k + c.collisionWidth - i - j, n = "left" === c.my[0] ? -c.elemWidth : "right" === c.my[0] ? c.elemWidth : 0, o = "left" === c.at[0] ? c.targetWidth : "right" === c.at[0] ? -c.targetWidth : 0, p = -2 * c.offset[0];
                0 > l ? (d = b.left + n + o + p + c.collisionWidth - i - g, (0 > d || d < h(l)) && (b.left += n + o + p)) : m > 0 && (e = b.left - c.collisionPosition.marginLeft + n + o + p - j, 
                (e > 0 || h(e) < m) && (b.left += n + o + p)), a.ui.pos._trigger(b, c, "posCollided", "flipLeft");
            },
            top: function(b, c) {
                a.ui.pos._trigger(b, c, "posCollide", "flipTop");
                var d, e, f = c.within, g = f.offset.top + f.scrollTop, i = f.height, j = f.isWindow ? f.scrollTop : f.offset.top, k = b.top - c.collisionPosition.marginTop, l = k - j, m = k + c.collisionHeight - i - j, n = "top" === c.my[1], o = n ? -c.elemHeight : "bottom" === c.my[1] ? c.elemHeight : 0, p = "top" === c.at[1] ? c.targetHeight : "bottom" === c.at[1] ? -c.targetHeight : 0, q = -2 * c.offset[1];
                0 > l ? (e = b.top + o + p + q + c.collisionHeight - i - g, b.top + o + p + q > l && (0 > e || e < h(l)) && (b.top += o + p + q)) : m > 0 && (d = b.top - c.collisionPosition.marginTop + o + p + q - j, 
                b.top + o + p + q > m && (d > 0 || h(d) < m) && (b.top += o + p + q)), a.ui.pos._trigger(b, c, "posCollided", "flipTop");
            }
        },
        flipfit: {
            left: function() {
                a.ui.pos.flip.left.apply(this, arguments), a.ui.pos.fit.left.apply(this, arguments);
            },
            top: function() {
                a.ui.pos.flip.top.apply(this, arguments), a.ui.pos.fit.top.apply(this, arguments);
            }
        }
    }, function() {
        var b, c, d, e, f, g = document.getElementsByTagName("body")[0], h = document.createElement("div");
        b = document.createElement(g ? "div" : "body"), d = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        }, g && a.extend(d, {
            position: "absolute",
            left: "-1000px",
            top: "-1000px"
        });
        for (f in d) b.style[f] = d[f];
        b.appendChild(h), c = g || document.documentElement, c.insertBefore(b, c.firstChild), 
        h.style.cssText = "position: absolute; left: 10.7432222px;", e = a(h).offset().left, 
        a.support.offsetFractions = e > 10 && 11 > e, b.innerHTML = "", c.removeChild(b);
    }();
}(jQuery), function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "jquery" ], a) : window.jQuery && !window.jQuery.fn.iconpicker && a(window.jQuery);
}(function(a) {
    "use strict";
    var b = {
        isEmpty: function(a) {
            return a === !1 || "" === a || null === a || void 0 === a;
        },
        isEmptyObject: function(a) {
            return this.isEmpty(a) === !0 || 0 === a.length;
        },
        isElement: function(b) {
            return a(b).length > 0;
        },
        isString: function(a) {
            return "string" == typeof a || a instanceof String;
        },
        isArray: function(b) {
            return a.isArray(b);
        },
        inArray: function(b, c) {
            return -1 !== a.inArray(b, c);
        },
        throwError: function(a) {
            throw "Font Awesome Icon Picker Exception: " + a;
        }
    }, c = function(d, e) {
        this._id = c._idCounter++, this.element = a(d).addClass("iconpicker-element"), this._trigger("iconpickerCreate"), 
        this.options = a.extend({}, c.defaultOptions, this.element.data(), e), this.options.templates = a.extend({}, c.defaultOptions.templates, this.options.templates), 
        this.options.originalPlacement = this.options.placement, this.container = b.isElement(this.options.container) ? a(this.options.container) : !1, 
        this.container === !1 && (this.element.is(".dropdown-toggle") ? this.container = a("~ .dropdown-menu:first", this.element) : this.container = this.element.is("input,textarea,button,.btn") ? this.element.parent() : this.element), 
        this.container.addClass("iconpicker-container"), this.isDropdownMenu() && (this.options.templates.search = !1, 
        this.options.templates.buttons = !1, this.options.placement = "inline"), this.input = this.element.is("input,textarea") ? this.element.addClass("iconpicker-input") : !1, 
        this.input === !1 && (this.input = this.container.find(this.options.input), this.input.is("input,textarea") || (this.input = !1)), 
        this.component = this.isDropdownMenu() ? this.container.parent().find(this.options.component) : this.container.find(this.options.component), 
        0 === this.component.length ? this.component = !1 : this.component.find("i").addClass("iconpicker-component"), 
        this._createPopover(), this._createIconpicker(), 0 === this.getAcceptButton().length && (this.options.mustAccept = !1), 
        this.isInputGroup() ? this.container.parent().append(this.popover) : this.container.append(this.popover), 
        this._bindElementEvents(), this._bindWindowEvents(), this.update(this.options.selected), 
        this.isInline() && this.show(), this._trigger("iconpickerCreated");
    };
    c._idCounter = 0, c.defaultOptions = {
        title: !1,
        selected: !1,
        defaultValue: !1,
        placement: "bottom",
        collision: "none",
        animation: !0,
        hideOnSelect: !1,
        showFooter: !1,
        searchInFooter: !1,
        mustAccept: !1,
        selectedCustomClass: "bg-primary",
        icons: [],
        fullClassFormatter: function(a) {
            return "fa " + a;
        },
        input: "input,.iconpicker-input",
        inputSearch: !1,
        container: !1,
        component: ".input-group-addon,.iconpicker-component",
        templates: {
            popover: '<div class="iconpicker-popover popover"><div class="arrow"></div><div class="popover-title"></div><div class="popover-content"></div></div>',
            footer: '<div class="popover-footer"></div>',
            buttons: '<button class="iconpicker-btn iconpicker-btn-cancel btn btn-default btn-sm">Cancel</button> <button class="iconpicker-btn iconpicker-btn-accept btn btn-primary btn-sm">Accept</button>',
            search: '<input type="search" class="form-control iconpicker-search" placeholder="Type to filter" />',
            iconpicker: '<div class="iconpicker"><div class="iconpicker-items"></div></div>',
            iconpickerItem: '<a role="button" href="#" class="iconpicker-item"><i></i></a>'
        }
    }, c.batch = function(b, c) {
        var d = Array.prototype.slice.call(arguments, 2);
        return a(b).each(function() {
            var b = a(this).data("iconpicker");
            b && b[c].apply(b, d);
        });
    }, c.prototype = {
        constructor: c,
        options: {},
        _id: 0,
        _trigger: function(b, c) {
            c = c || {}, this.element.trigger(a.extend({
                type: b,
                iconpickerInstance: this
            }, c));
        },
        _createPopover: function() {
            this.popover = a(this.options.templates.popover);
            var c = this.popover.find(".popover-title");
            if (this.options.title && c.append(a('<div class="popover-title-text">' + this.options.title + "</div>")), 
            this.hasSeparatedSearchInput() && !this.options.searchInFooter ? c.append(this.options.templates.search) : this.options.title || c.remove(), 
            this.options.showFooter && !b.isEmpty(this.options.templates.footer)) {
                var d = a(this.options.templates.footer);
                this.hasSeparatedSearchInput() && this.options.searchInFooter && d.append(a(this.options.templates.search)), 
                b.isEmpty(this.options.templates.buttons) || d.append(a(this.options.templates.buttons)), 
                this.popover.append(d);
            }
            return this.options.animation === !0 && this.popover.addClass("fade"), this.popover;
        },
        _createIconpicker: function() {
            var b = this;
            this.iconpicker = a(this.options.templates.iconpicker);
            var c = function(c) {
                var d = a(this);
                return d.is("i") && (d = d.parent()), b._trigger("iconpickerSelect", {
                    iconpickerItem: d,
                    iconpickerValue: b.iconpickerValue
                }), b.options.mustAccept === !1 ? (b.update(d.data("iconpickerValue")), b._trigger("iconpickerSelected", {
                    iconpickerItem: this,
                    iconpickerValue: b.iconpickerValue
                })) : b.update(d.data("iconpickerValue"), !0), b.options.hideOnSelect && b.options.mustAccept === !1 && b.hide(), 
                c.preventDefault(), !1;
            };
            for (var d in this.options.icons) {
                var e = a(this.options.templates.iconpickerItem);
                e.find("i").addClass(this.options.fullClassFormatter(this.options.icons[d])), e.data("iconpickerValue", this.options.icons[d]).on("click.iconpicker", c), 
                this.iconpicker.find(".iconpicker-items").append(e.attr("title", "." + this.options.icons[d]));
            }
            return this.popover.find(".popover-content").append(this.iconpicker), this.iconpicker;
        },
        _isEventInsideIconpicker: function(b) {
            var c = a(b.target);
            return !((!c.hasClass("iconpicker-element") || c.hasClass("iconpicker-element") && !c.is(this.element)) && 0 === c.parents(".iconpicker-popover").length);
        },
        _bindElementEvents: function() {
            var c = this;
            this.getSearchInput().on("keyup.iconpicker", function() {
                c.filter(a(this).val().toLowerCase());
            }), this.getAcceptButton().on("click.iconpicker", function() {
                var a = c.iconpicker.find(".iconpicker-selected").get(0);
                c.update(c.iconpickerValue), c._trigger("iconpickerSelected", {
                    iconpickerItem: a,
                    iconpickerValue: c.iconpickerValue
                }), c.isInline() || c.hide();
            }), this.getCancelButton().on("click.iconpicker", function() {
                c.isInline() || c.hide();
            }), this.element.on("focus.iconpicker", function(a) {
                c.show(), a.stopPropagation();
            }), this.hasComponent() && this.component.on("click.iconpicker", function() {
                c.toggle();
            }), this.hasInput() && this.input.on("keyup.iconpicker", function(d) {
                b.inArray(d.keyCode, [ 38, 40, 37, 39, 16, 17, 18, 9, 8, 91, 93, 20, 46, 186, 190, 46, 78, 188, 44, 86 ]) ? c._updateFormGroupStatus(c.getValid(this.value) !== !1) : c.update(), 
                c.options.inputSearch === !0 && c.filter(a(this).val().toLowerCase());
            });
        },
        _bindWindowEvents: function() {
            var b = a(window.document), c = this, d = ".iconpicker.inst" + this._id;
            return a(window).on("resize.iconpicker" + d + " orientationchange.iconpicker" + d, function(a) {
                c.popover.hasClass("in") && c.updatePlacement();
            }), c.isInline() || b.on("mouseup" + d, function(a) {
                return c._isEventInsideIconpicker(a) || c.isInline() || c.hide(), a.stopPropagation(), 
                a.preventDefault(), !1;
            }), !1;
        },
        _unbindElementEvents: function() {
            this.popover.off(".iconpicker"), this.element.off(".iconpicker"), this.hasInput() && this.input.off(".iconpicker"), 
            this.hasComponent() && this.component.off(".iconpicker"), this.hasContainer() && this.container.off(".iconpicker");
        },
        _unbindWindowEvents: function() {
            a(window).off(".iconpicker.inst" + this._id), a(window.document).off(".iconpicker.inst" + this._id);
        },
        updatePlacement: function(b, c) {
            b = b || this.options.placement, this.options.placement = b, c = c || this.options.collision, 
            c = c === !0 ? "flip" : c;
            var d = {
                at: "right bottom",
                my: "right top",
                of: this.hasInput() && !this.isInputGroup() ? this.input : this.container,
                collision: c === !0 ? "flip" : c,
                within: window
            };
            if (this.popover.removeClass("inline topLeftCorner topLeft top topRight topRightCorner rightTop right rightBottom bottomRight bottomRightCorner bottom bottomLeft bottomLeftCorner leftBottom left leftTop"), 
            "object" == typeof b) return this.popover.pos(a.extend({}, d, b));
            switch (b) {
              case "inline":
                d = !1;
                break;

              case "topLeftCorner":
                d.my = "right bottom", d.at = "left top";
                break;

              case "topLeft":
                d.my = "left bottom", d.at = "left top";
                break;

              case "top":
                d.my = "center bottom", d.at = "center top";
                break;

              case "topRight":
                d.my = "right bottom", d.at = "right top";
                break;

              case "topRightCorner":
                d.my = "left bottom", d.at = "right top";
                break;

              case "rightTop":
                d.my = "left bottom", d.at = "right center";
                break;

              case "right":
                d.my = "left center", d.at = "right center";
                break;

              case "rightBottom":
                d.my = "left top", d.at = "right center";
                break;

              case "bottomRightCorner":
                d.my = "left top", d.at = "right bottom";
                break;

              case "bottomRight":
                d.my = "right top", d.at = "right bottom";
                break;

              case "bottom":
                d.my = "center top", d.at = "center bottom";
                break;

              case "bottomLeft":
                d.my = "left top", d.at = "left bottom";
                break;

              case "bottomLeftCorner":
                d.my = "right top", d.at = "left bottom";
                break;

              case "leftBottom":
                d.my = "right top", d.at = "left center";
                break;

              case "left":
                d.my = "right center", d.at = "left center";
                break;

              case "leftTop":
                d.my = "right bottom", d.at = "left center";
                break;

              default:
                return !1;
            }
            return this.popover.css({
                display: "inline" === this.options.placement ? "" : "block"
            }), d !== !1 ? this.popover.pos(d).css("maxWidth", a(window).width() - this.container.offset().left - 5) : this.popover.css({
                top: "auto",
                right: "auto",
                bottom: "auto",
                left: "auto",
                maxWidth: "none"
            }), this.popover.addClass(this.options.placement), !0;
        },
        _updateComponents: function() {
            if (this.iconpicker.find(".iconpicker-item.iconpicker-selected").removeClass("iconpicker-selected " + this.options.selectedCustomClass), 
            this.iconpickerValue && this.iconpicker.find("." + this.options.fullClassFormatter(this.iconpickerValue).replace(/ /g, ".")).parent().addClass("iconpicker-selected " + this.options.selectedCustomClass), 
            this.hasComponent()) {
                var a = this.component.find("i");
                a.length > 0 ? a.attr("class", this.options.fullClassFormatter(this.iconpickerValue)) : this.component.html(this.getHtml());
            }
        },
        _updateFormGroupStatus: function(a) {
            return this.hasInput() ? (a !== !1 ? this.input.parents(".form-group:first").removeClass("has-error") : this.input.parents(".form-group:first").addClass("has-error"), 
            !0) : !1;
        },
        getValid: function(c) {
            b.isString(c) || (c = "");
            var d = "" === c;
            return c = a.trim(c), b.inArray(c, this.options.icons) || d ? c : !1;
        },
        setValue: function(a) {
            var b = this.getValid(a);
            return b !== !1 ? (this.iconpickerValue = b, this._trigger("iconpickerSetValue", {
                iconpickerValue: b
            }), this.iconpickerValue) : (this._trigger("iconpickerInvalid", {
                iconpickerValue: a
            }), !1);
        },
        getHtml: function() {
            return '<i class="' + this.options.fullClassFormatter(this.iconpickerValue) + '"></i>';
        },
        setSourceValue: function(a) {
            return a = this.setValue(a), a !== !1 && "" !== a && (this.hasInput() ? this.input.val(this.iconpickerValue) : this.element.data("iconpickerValue", this.iconpickerValue), 
            this._trigger("iconpickerSetSourceValue", {
                iconpickerValue: a
            })), a;
        },
        getSourceValue: function(a) {
            a = a || this.options.defaultValue;
            var b = a;
            return b = this.hasInput() ? this.input.val() : this.element.data("iconpickerValue"), 
            void 0 !== b && "" !== b && null !== b && b !== !1 || (b = a), b;
        },
        hasInput: function() {
            return this.input !== !1;
        },
        isInputSearch: function() {
            return this.hasInput() && this.options.inputSearch === !0;
        },
        isInputGroup: function() {
            return this.container.is(".input-group");
        },
        isDropdownMenu: function() {
            return this.container.is(".dropdown-menu");
        },
        hasSeparatedSearchInput: function() {
            return this.options.templates.search !== !1 && !this.isInputSearch();
        },
        hasComponent: function() {
            return this.component !== !1;
        },
        hasContainer: function() {
            return this.container !== !1;
        },
        getAcceptButton: function() {
            return this.popover.find(".iconpicker-btn-accept");
        },
        getCancelButton: function() {
            return this.popover.find(".iconpicker-btn-cancel");
        },
        getSearchInput: function() {
            return this.popover.find(".iconpicker-search");
        },
        filter: function(c) {
            if (b.isEmpty(c)) return this.iconpicker.find(".iconpicker-item").show(), a(!1);
            var d = [];
            return this.iconpicker.find(".iconpicker-item").each(function() {
                var b = a(this), e = b.attr("title").toLowerCase(), f = !1;
                try {
                    f = new RegExp(c, "g");
                } catch (g) {
                    f = !1;
                }
                f !== !1 && e.match(f) ? (d.push(b), b.show()) : b.hide();
            }), d;
        },
        show: function() {
            return this.popover.hasClass("in") ? !1 : (a.iconpicker.batch(a(".iconpicker-popover.in:not(.inline)").not(this.popover), "hide"), 
            this._trigger("iconpickerShow"), this.updatePlacement(), this.popover.addClass("in"), 
            void setTimeout(a.proxy(function() {
                this.popover.css("display", this.isInline() ? "" : "block"), this._trigger("iconpickerShown");
            }, this), this.options.animation ? 300 : 1));
        },
        hide: function() {
            return this.popover.hasClass("in") ? (this._trigger("iconpickerHide"), this.popover.removeClass("in"), 
            void setTimeout(a.proxy(function() {
                this.popover.css("display", "none"), this.getSearchInput().val(""), this.filter(""), 
                this._trigger("iconpickerHidden");
            }, this), this.options.animation ? 300 : 1)) : !1;
        },
        toggle: function() {
            this.popover.is(":visible") ? this.hide() : this.show(!0);
        },
        update: function(a, b) {
            return a = a ? a : this.getSourceValue(this.iconpickerValue), this._trigger("iconpickerUpdate"), 
            b === !0 ? a = this.setValue(a) : (a = this.setSourceValue(a), this._updateFormGroupStatus(a !== !1)), 
            a !== !1 && this._updateComponents(), this._trigger("iconpickerUpdated"), a;
        },
        destroy: function() {
            this._trigger("iconpickerDestroy"), this.element.removeData("iconpicker").removeData("iconpickerValue").removeClass("iconpicker-element"), 
            this._unbindElementEvents(), this._unbindWindowEvents(), a(this.popover).remove(), 
            this._trigger("iconpickerDestroyed");
        },
        disable: function() {
            return this.hasInput() ? (this.input.prop("disabled", !0), !0) : !1;
        },
        enable: function() {
            return this.hasInput() ? (this.input.prop("disabled", !1), !0) : !1;
        },
        isDisabled: function() {
            return this.hasInput() ? this.input.prop("disabled") === !0 : !1;
        },
        isInline: function() {
            return "inline" === this.options.placement || this.popover.hasClass("inline");
        }
    }, a.iconpicker = c, a.fn.iconpicker = function(b) {
        return this.each(function() {
            var d = a(this);
            d.data("iconpicker") || d.data("iconpicker", new c(this, "object" == typeof b ? b : {}));
        });
    }, c.defaultOptions.icons = [ "fa-500px", "fa-adjust", "fa-adn", "fa-align-center", "fa-align-justify", "fa-align-left", "fa-align-right", "fa-amazon", "fa-ambulance", "fa-anchor", "fa-android", "fa-angellist", "fa-angle-double-down", "fa-angle-double-left", "fa-angle-double-right", "fa-angle-double-up", "fa-angle-down", "fa-angle-left", "fa-angle-right", "fa-angle-up", "fa-apple", "fa-archive", "fa-area-chart", "fa-arrow-circle-down", "fa-arrow-circle-left", "fa-arrow-circle-o-down", "fa-arrow-circle-o-left", "fa-arrow-circle-o-right", "fa-arrow-circle-o-up", "fa-arrow-circle-right", "fa-arrow-circle-up", "fa-arrow-down", "fa-arrow-left", "fa-arrow-right", "fa-arrow-up", "fa-arrows", "fa-arrows-alt", "fa-arrows-h", "fa-arrows-v", "fa-asterisk", "fa-at", "fa-automobile", "fa-backward", "fa-balance-scale", "fa-ban", "fa-bank", "fa-bar-chart", "fa-bar-chart-o", "fa-barcode", "fa-bars", "fa-battery-0", "fa-battery-1", "fa-battery-2", "fa-battery-3", "fa-battery-4", "fa-battery-empty", "fa-battery-full", "fa-battery-half", "fa-battery-quarter", "fa-battery-three-quarters", "fa-bed", "fa-beer", "fa-behance", "fa-behance-square", "fa-bell", "fa-bell-o", "fa-bell-slash", "fa-bell-slash-o", "fa-bicycle", "fa-binoculars", "fa-birthday-cake", "fa-bitbucket", "fa-bitbucket-square", "fa-bitcoin", "fa-black-tie", "fa-bluetooth", "fa-bluetooth-b", "fa-bold", "fa-bolt", "fa-bomb", "fa-book", "fa-bookmark", "fa-bookmark-o", "fa-briefcase", "fa-btc", "fa-bug", "fa-building", "fa-building-o", "fa-bullhorn", "fa-bullseye", "fa-bus", "fa-buysellads", "fa-cab", "fa-calculator", "fa-calendar", "fa-calendar-check-o", "fa-calendar-minus-o", "fa-calendar-o", "fa-calendar-plus-o", "fa-calendar-times-o", "fa-camera", "fa-camera-retro", "fa-car", "fa-caret-down", "fa-caret-left", "fa-caret-right", "fa-caret-square-o-down", "fa-caret-square-o-left", "fa-caret-square-o-right", "fa-caret-square-o-up", "fa-caret-up", "fa-cart-arrow-down", "fa-cart-plus", "fa-cc", "fa-cc-amex", "fa-cc-diners-club", "fa-cc-discover", "fa-cc-jcb", "fa-cc-mastercard", "fa-cc-paypal", "fa-cc-stripe", "fa-cc-visa", "fa-certificate", "fa-chain", "fa-chain-broken", "fa-check", "fa-check-circle", "fa-check-circle-o", "fa-check-square", "fa-check-square-o", "fa-chevron-circle-down", "fa-chevron-circle-left", "fa-chevron-circle-right", "fa-chevron-circle-up", "fa-chevron-down", "fa-chevron-left", "fa-chevron-right", "fa-chevron-up", "fa-child", "fa-chrome", "fa-circle", "fa-circle-o", "fa-circle-o-notch", "fa-circle-thin", "fa-clipboard", "fa-clock-o", "fa-clone", "fa-close", "fa-cloud", "fa-cloud-download", "fa-cloud-upload", "fa-cny", "fa-code", "fa-code-fork", "fa-codepen", "fa-codiepie", "fa-coffee", "fa-cog", "fa-cogs", "fa-columns", "fa-comment", "fa-comment-o", "fa-commenting", "fa-commenting-o", "fa-comments", "fa-comments-o", "fa-compass", "fa-compress", "fa-connectdevelop", "fa-contao", "fa-copy", "fa-copyright", "fa-creative-commons", "fa-credit-card", "fa-credit-card-alt", "fa-crop", "fa-crosshairs", "fa-css3", "fa-cube", "fa-cubes", "fa-cut", "fa-cutlery", "fa-dashboard", "fa-dashcube", "fa-database", "fa-dedent", "fa-delicious", "fa-desktop", "fa-deviantart", "fa-diamond", "fa-digg", "fa-dollar", "fa-dot-circle-o", "fa-download", "fa-dribbble", "fa-dropbox", "fa-drupal", "fa-edge", "fa-edit", "fa-eject", "fa-ellipsis-h", "fa-ellipsis-v", "fa-empire", "fa-envelope", "fa-envelope-o", "fa-envelope-square", "fa-eraser", "fa-eur", "fa-euro", "fa-exchange", "fa-exclamation", "fa-exclamation-circle", "fa-exclamation-triangle", "fa-expand", "fa-expeditedssl", "fa-external-link", "fa-external-link-square", "fa-eye", "fa-eye-slash", "fa-eyedropper", "fa-facebook", "fa-facebook-f", "fa-facebook-official", "fa-facebook-square", "fa-fast-backward", "fa-fast-forward", "fa-fax", "fa-feed", "fa-female", "fa-fighter-jet", "fa-file", "fa-file-archive-o", "fa-file-audio-o", "fa-file-code-o", "fa-file-excel-o", "fa-file-image-o", "fa-file-movie-o", "fa-file-o", "fa-file-pdf-o", "fa-file-photo-o", "fa-file-picture-o", "fa-file-powerpoint-o", "fa-file-sound-o", "fa-file-text", "fa-file-text-o", "fa-file-video-o", "fa-file-word-o", "fa-file-zip-o", "fa-files-o", "fa-film", "fa-filter", "fa-fire", "fa-fire-extinguisher", "fa-firefox", "fa-flag", "fa-flag-checkered", "fa-flag-o", "fa-flash", "fa-flask", "fa-flickr", "fa-floppy-o", "fa-folder", "fa-folder-o", "fa-folder-open", "fa-folder-open-o", "fa-font", "fa-fonticons", "fa-fort-awesome", "fa-forumbee", "fa-forward", "fa-foursquare", "fa-frown-o", "fa-futbol-o", "fa-gamepad", "fa-gavel", "fa-gbp", "fa-ge", "fa-gear", "fa-gears", "fa-genderless", "fa-get-pocket", "fa-gg", "fa-gg-circle", "fa-gift", "fa-git", "fa-git-square", "fa-github", "fa-github-alt", "fa-github-square", "fa-gittip", "fa-glass", "fa-globe", "fa-google", "fa-google-plus", "fa-google-plus-square", "fa-google-wallet", "fa-graduation-cap", "fa-gratipay", "fa-group", "fa-h-square", "fa-hacker-news", "fa-hand-grab-o", "fa-hand-lizard-o", "fa-hand-o-down", "fa-hand-o-left", "fa-hand-o-right", "fa-hand-o-up", "fa-hand-paper-o", "fa-hand-peace-o", "fa-hand-pointer-o", "fa-hand-rock-o", "fa-hand-scissors-o", "fa-hand-spock-o", "fa-hand-stop-o", "fa-hashtag", "fa-hdd-o", "fa-header", "fa-headphones", "fa-heart", "fa-heart-o", "fa-heartbeat", "fa-history", "fa-home", "fa-hospital-o", "fa-hotel", "fa-hourglass", "fa-hourglass-1", "fa-hourglass-2", "fa-hourglass-3", "fa-hourglass-end", "fa-hourglass-half", "fa-hourglass-o", "fa-hourglass-start", "fa-houzz", "fa-html5", "fa-i-cursor", "fa-ils", "fa-image", "fa-inbox", "fa-indent", "fa-industry", "fa-info", "fa-info-circle", "fa-inr", "fa-instagram", "fa-institution", "fa-internet-explorer", "fa-intersex", "fa-ioxhost", "fa-italic", "fa-joomla", "fa-jpy", "fa-jsfiddle", "fa-key", "fa-keyboard-o", "fa-krw", "fa-language", "fa-laptop", "fa-lastfm", "fa-lastfm-square", "fa-leaf", "fa-leanpub", "fa-legal", "fa-lemon-o", "fa-level-down", "fa-level-up", "fa-life-bouy", "fa-life-buoy", "fa-life-ring", "fa-life-saver", "fa-lightbulb-o", "fa-line-chart", "fa-link", "fa-linkedin", "fa-linkedin-square", "fa-linux", "fa-list", "fa-list-alt", "fa-list-ol", "fa-list-ul", "fa-location-arrow", "fa-lock", "fa-long-arrow-down", "fa-long-arrow-left", "fa-long-arrow-right", "fa-long-arrow-up", "fa-magic", "fa-magnet", "fa-mail-forward", "fa-mail-reply", "fa-mail-reply-all", "fa-male", "fa-map", "fa-map-marker", "fa-map-o", "fa-map-pin", "fa-map-signs", "fa-mars", "fa-mars-double", "fa-mars-stroke", "fa-mars-stroke-h", "fa-mars-stroke-v", "fa-maxcdn", "fa-meanpath", "fa-medium", "fa-medkit", "fa-meh-o", "fa-mercury", "fa-microphone", "fa-microphone-slash", "fa-minus", "fa-minus-circle", "fa-minus-square", "fa-minus-square-o", "fa-mixcloud", "fa-mobile", "fa-mobile-phone", "fa-modx", "fa-money", "fa-moon-o", "fa-mortar-board", "fa-motorcycle", "fa-mouse-pointer", "fa-music", "fa-navicon", "fa-neuter", "fa-newspaper-o", "fa-object-group", "fa-object-ungroup", "fa-odnoklassniki", "fa-odnoklassniki-square", "fa-opencart", "fa-openid", "fa-opera", "fa-optin-monster", "fa-outdent", "fa-pagelines", "fa-paint-brush", "fa-paper-plane", "fa-paper-plane-o", "fa-paperclip", "fa-paragraph", "fa-paste", "fa-pause", "fa-pause-circle", "fa-pause-circle-o", "fa-paw", "fa-paypal", "fa-pencil", "fa-pencil-square", "fa-pencil-square-o", "fa-percent", "fa-phone", "fa-phone-square", "fa-photo", "fa-picture-o", "fa-pie-chart", "fa-pied-piper", "fa-pied-piper-alt", "fa-pinterest", "fa-pinterest-p", "fa-pinterest-square", "fa-plane", "fa-play", "fa-play-circle", "fa-play-circle-o", "fa-plug", "fa-plus", "fa-plus-circle", "fa-plus-square", "fa-plus-square-o", "fa-power-off", "fa-print", "fa-product-hunt", "fa-puzzle-piece", "fa-qq", "fa-qrcode", "fa-question", "fa-question-circle", "fa-quote-left", "fa-quote-right", "fa-ra", "fa-random", "fa-rebel", "fa-recycle", "fa-reddit", "fa-reddit-alien", "fa-reddit-square", "fa-refresh", "fa-registered", "fa-remove", "fa-renren", "fa-reorder", "fa-repeat", "fa-reply", "fa-reply-all", "fa-retweet", "fa-rmb", "fa-road", "fa-rocket", "fa-rotate-left", "fa-rotate-right", "fa-rouble", "fa-rss", "fa-rss-square", "fa-rub", "fa-ruble", "fa-rupee", "fa-safari", "fa-save", "fa-scissors", "fa-scribd", "fa-search", "fa-search-minus", "fa-search-plus", "fa-sellsy", "fa-send", "fa-send-o", "fa-server", "fa-share", "fa-share-alt", "fa-share-alt-square", "fa-share-square", "fa-share-square-o", "fa-shekel", "fa-sheqel", "fa-shield", "fa-ship", "fa-shirtsinbulk", "fa-shopping-bag", "fa-shopping-basket", "fa-shopping-cart", "fa-sign-in", "fa-sign-out", "fa-signal", "fa-simplybuilt", "fa-sitemap", "fa-skyatlas", "fa-skype", "fa-slack", "fa-sliders", "fa-slideshare", "fa-smile-o", "fa-soccer-ball-o", "fa-sort", "fa-sort-alpha-asc", "fa-sort-alpha-desc", "fa-sort-amount-asc", "fa-sort-amount-desc", "fa-sort-asc", "fa-sort-desc", "fa-sort-down", "fa-sort-numeric-asc", "fa-sort-numeric-desc", "fa-sort-up", "fa-soundcloud", "fa-space-shuttle", "fa-spinner", "fa-spoon", "fa-spotify", "fa-square", "fa-square-o", "fa-stack-exchange", "fa-stack-overflow", "fa-star", "fa-star-half", "fa-star-half-empty", "fa-star-half-full", "fa-star-half-o", "fa-star-o", "fa-steam", "fa-steam-square", "fa-step-backward", "fa-step-forward", "fa-stethoscope", "fa-sticky-note", "fa-sticky-note-o", "fa-stop", "fa-stop-circle", "fa-stop-circle-o", "fa-street-view", "fa-strikethrough", "fa-stumbleupon", "fa-stumbleupon-circle", "fa-subscript", "fa-subway", "fa-suitcase", "fa-sun-o", "fa-superscript", "fa-support", "fa-table", "fa-tablet", "fa-tachometer", "fa-tag", "fa-tags", "fa-tasks", "fa-taxi", "fa-television", "fa-tencent-weibo", "fa-terminal", "fa-text-height", "fa-text-width", "fa-th", "fa-th-large", "fa-th-list", "fa-thumb-tack", "fa-thumbs-down", "fa-thumbs-o-down", "fa-thumbs-o-up", "fa-thumbs-up", "fa-ticket", "fa-times", "fa-times-circle", "fa-times-circle-o", "fa-tint", "fa-toggle-down", "fa-toggle-left", "fa-toggle-off", "fa-toggle-on", "fa-toggle-right", "fa-toggle-up", "fa-trademark", "fa-train", "fa-transgender", "fa-transgender-alt", "fa-trash", "fa-trash-o", "fa-tree", "fa-trello", "fa-tripadvisor", "fa-trophy", "fa-truck", "fa-try", "fa-tty", "fa-tumblr", "fa-tumblr-square", "fa-turkish-lira", "fa-tv", "fa-twitch", "fa-twitter", "fa-twitter-square", "fa-umbrella", "fa-underline", "fa-undo", "fa-university", "fa-unlink", "fa-unlock", "fa-unlock-alt", "fa-unsorted", "fa-upload", "fa-usb", "fa-usd", "fa-user", "fa-user-md", "fa-user-plus", "fa-user-secret", "fa-user-times", "fa-users", "fa-venus", "fa-venus-double", "fa-venus-mars", "fa-viacoin", "fa-video-camera", "fa-vimeo", "fa-vimeo-square", "fa-vine", "fa-vk", "fa-volume-down", "fa-volume-off", "fa-volume-up", "fa-warning", "fa-wechat", "fa-weibo", "fa-weixin", "fa-whatsapp", "fa-wheelchair", "fa-wifi", "fa-wikipedia-w", "fa-windows", "fa-won", "fa-wordpress", "fa-wrench", "fa-xing", "fa-xing-square", "fa-y-combinator", "fa-y-combinator-square", "fa-yahoo", "fa-yc", "fa-yc-square", "fa-yelp", "fa-yen", "fa-youtube", "fa-youtube-play", "fa-youtube-square" ];
});