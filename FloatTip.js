/**
 * Created by HuangChuan on 2016/6/22 0022.
 *  用法：  new FloatTip(d, {
 *               width: 300,
 *               backgroundColor: '#FAFCFD',
 *               borderColor: '#000',
 *               textColor: '#666',
 *               maxWidth: 250,
 *               mouseFollow: true
 *           }, title);
 */
;
(function (win, doc) {
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
                width: 150
            };
        }
        that.el = typeof el == "object" ? el : doc.getElementById(el);
        that.content = message;

        that.show = function (e) {
            that.xCord = e.x;
            that.yCord = e.y;
            that.appear();
        }
        that.hide = function (e) {
            if (that.initialized) {
                if (that.options.mouseFollow)
                    that.addEvent(that.el, "mousemove", that.update);
                that.tooltip.parentNode.removeChild(that.tooltip);
            }
        }
        that.update = function (e) {
            that.xCord = e.x;
            that.yCord = e.y;
            that.setup();
        }
        that.appear = function () {
            that.tooltip = doc.createElement("div");
            with (that.tooltip) {
                that.tooltip.style.backgroundColor = that.options.backgroundColor;
                that.tooltip.style.border = "1px solid " + that.options.borderColor;
                that.tooltip.style.color = ((that.options.textColor != '') ? that.options.textColor : "");
                that.tooltip.style.width = that.options.width;
                that.tooltip.style.fontSize = '12px';
                that.tooltip.style.display = "none";
                that.tooltip.style.zIndex = 99;
                that.tooltip.style.textAlign = "left";
                that.tooltip.style.position = "absolute";
                that.tooltip.style.padding = "2px";
            }
            that.tooltip.innerHTML = that.content;
            doc.body.insertBefore(that.tooltip, doc.body.childNodes[0]);
            that.setup();
            if (that.options.mouseFollow) {
                that.addEvent(that.el, "mousemove", that.update);
            }
            that.initialized = true;
            that.tooltip.style.display = "";
        }
        that.setup = function () {
            if (that.options.width > that.options.maxWidth) {
                that.options.width = that.options.maxWidth;
                that.tooltip.style.width = that.options.width + 'px';
            }
            that.tooltip.style.left = that.xCord + 10 + "px";
            that.tooltip.style.top = that.yCord + 12 + "px";
        }


        this.addEvent(that.el, "mouseover", that.show);
        this.addEvent(that.el, "mouseout", that.hide);
    };
    FloatTip.prototype = {
        version: '1.0.1',
        addEvent: function (el, eventType, handler) {
            if (el.addEventListener) {
                el.addEventListener(eventType, handler,false);
            } else if (el.attachEvent) {
                el.attachEvent("on" + eventType,handler);
            } else {
                el["on" + eventType] = handler;
            }
        }
    };
    win['FloatTip'] = FloatTip;
}(window, document));
