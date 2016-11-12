# FloatTip
## 用法1：  

```javascript
var d=document.getElementById(el);
var floatTips=new Tooltip(d, {
              width: 300,
              backgroundColor: '#FAFCFD',
              borderColor: '#000',
              textColor: '#666',
              maxWidth: 250,
              mouseFollow: true
          }, title);
 floatTips.destory();//全部销毁
```
## 用法2：
```javascript
  var floatTips = new FloatTip($("#id"), {
            mouseFollow: true,
            className: "filedName-tips"
        }, $(this).html());
   floatTips.destory();//全部销毁
```
