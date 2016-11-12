/**
 * Created with IntelliJ IDEA.
 * User: 黄川
 * https://github.com/threefish/FloatTip/
 * 用法1：  new FloatTip(d, {
 *              width: 300,
 *              backgroundColor: '#FAFCFD',
 *              borderColor: '#000',
 *              textColor: '#666',
 *              maxWidth: 250,
 *              mouseFollow: true
 *          }, title);
 *   用法2：
 *   var floatTips = new FloatTip($(this), {
 *              mouseFollow: true,
 *              className: "filedName-tips"
 *          }, $(this).html());
 *    全部销毁 floatTips.destory();
 */
;
(function (win, doc) {
    var elments = new Array();
    var FloatTip = function FloatTip(el, options, message) {
        var that = this;
        that.initialized = false;
        if (typeof options == "object") {
            that.options = options;
        } else {
            that.options = {
                backgroundColor: '#F2FDDB',
                borderColor: '#ADCD3C',
                textColor: '#999999',
                maxWidth: 300,
                mouseFollow: true,
                width: 150,
                className: ''
            };
        }
        if (typeof el == "object" && el instanceof jQuery) {
            that.el = el.get(0);
        } else if (typeof el == "object") {
            that.el = el;
        } else {
            that.el = doc.getElementById(el)
        }
        that.content = message;

        that.show = function (e) {
            that.xCord = e.pageX;
            that.yCord = e.pageY;
            that.tooltip.style.display = "block";
            that.update();
        }
        that.hide = function (e) {
            if (that.initialized) {
                if (that.options.mouseFollow)
                    that.addEvent(that.el, "mousemove", that.update);
                that.tooltip.style.display = "none";
            }
        }
        that.update = function () {
            that.setup();
        }
        that.destory = function () {
            for (var i in elments) {
                elments[i].parentNode.removeChild(elments[i]);
            }
            elments=new Array();
        }
        that.init = function () {
            that.tooltip = doc.createElement("div");
            with (that.tooltip) {
                that.tooltip.style.display = "none";
                that.tooltip.style.position = "absolute";
                that.tooltip.style.zIndex = 99;

                if (that.options.className !== "") {
                    that.tooltip.setAttribute("class", that.options.className);
                } else {
                    that.tooltip.style.backgroundColor = that.options.backgroundColor;
                    that.tooltip.style.border = "1px solid " + that.options.borderColor;
                    that.tooltip.style.color = ((that.options.textColor != '') ? that.options.textColor : "");
                    that.tooltip.style.width = that.options.width;
                    that.tooltip.style.fontSize = '12px';
                    that.tooltip.style.textAlign = "left";
                    that.tooltip.style.padding = "2px";
                }
            }
            that.tooltip.innerHTML = that.content;
            doc.body.insertBefore(that.tooltip, doc.body.childNodes[0]);
            that.setup();
            if (that.options.mouseFollow) {
                that.addEvent(that.el, "mousemove", that.update);
            }
            that.initialized = true;
            elments.push(that.tooltip);
        }
        that.setup = function () {
            if (that.options.className === "") {
                if (that.options.width > that.options.maxWidth) {
                    that.options.width = that.options.maxWidth;
                    that.tooltip.style.width = that.options.width + 'px';
                }
            }
            that.tooltip.style.left = that.xCord + 10 + "px";
            that.tooltip.style.top = that.yCord + 12 + "px";
        }
        that.init();
        this.addEvent(that.el, "mouseover", that.show);
        this.addEvent(that.el, "mouseout", that.hide);
    };
    FloatTip.prototype = {
        version: '1.0.1',
        addEvent: function (el, eventType, handler) {
            if (el.addEventListener) {
                el.addEventListener(eventType, handler, false);
            } else if (el.attachEvent) {
                el.attachEvent("on" + eventType, handler);
            } else {
                el["on" + eventType] = handler;
            }
        }
    };
    win['FloatTip'] = FloatTip;
}(window, document));
