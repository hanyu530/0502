# 20250502上課筆記
# 成品
![exported_qrcode_image_600](https://hackmd.io/_uploads/Hy5bgpbgex.png)
## 第一條指令
產生一個全螢幕畫布,背景顏色為0077b6
擷取攝影機的影像,正常的顯示在視窗的中間
影像畫面寬高為視窗大小的80%
請把程式碼寫在sketch.js內

### 說明：
全螢幕畫布：使用 createCanvas(windowWidth, windowHeight) 建立全螢幕畫布。
背景顏色：設定背景顏色為 #0077b6。
攝影機影像：使用 createCapture(VIDEO) 擷取攝影機影像，並將其大小設定為視窗的 80%。
影像置中：計算影像的顯示位置，讓其置於畫布中央。
視窗調整：當視窗大小改變時，自動調整畫布大小。

```javascript=
let capture;

function setup() {
  // 建立全螢幕畫布，背景顏色為 #0077b6
  createCanvas(windowWidth, windowHeight);
  background('#0077b6');

  // 初始化攝影機影像
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像寬高為視窗的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素
}

function draw() {
  background('#0077b6'); // 確保背景顏色維持為 #0077b6

  // 將攝影機影像顯示在畫布中央
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;
  image(capture, x, y, capture.width, capture.height);
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
}

```
## 第二條指令
攝影機顯示的畫面左右顛倒,請調整

### 修改重點：
水平翻轉畫布：

使用 push() 和 pop() 來保存和恢復畫布的狀態。
使用 translate(width, 0) 將畫布的原點移到右上角。
使用 scale(-1, 1) 水平翻轉畫布。
影像位置調整：

水平翻轉後，影像的繪製位置仍然正確，因為翻轉影響的是畫布的方向，而非影像的大小和位置。

```javascript=
let capture;

function setup() {
  // 建立全螢幕畫布，背景顏色為 #0077b6
  createCanvas(windowWidth, windowHeight);
  background('#0077b6');

  // 初始化攝影機影像
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像寬高為視窗的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素
}

function draw() {
  background('#0077b6'); // 確保背景顏色維持為 #0077b6

  // 水平翻轉畫布
  push();
  translate(width, 0); // 將畫布的原點移到右上角
  scale(-1, 1); // 水平翻轉畫布

  // 將攝影機影像顯示在畫布中央
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;
  image(capture, x, y, capture.width, capture.height);

  pop(); // 恢復畫布的原始狀態
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
}
```
## 第三條指令
利用creategraphics指令,產生一個video視訊畫面
一樣的寬高一樣的大小內容,該圖片顯示在視訊畫面的上方


### 說明
createGraphics：

使用 createGraphics 產生一個與攝影機影像相同大小的畫布。
在 graphics 上繪製背景顏色和文字內容。
顯示順序：

使用 image(graphics, ...) 將 graphics 畫布顯示在攝影機影像的上方，位置計算為攝影機影像的正上方。
視窗調整：

當視窗大小改變時，攝影機影像和 graphics 的位置會自動調整。

```javascript=
let capture;
let graphics;

function setup() {
  // 建立全螢幕畫布，背景顏色為 #0077b6
  createCanvas(windowWidth, windowHeight);
  background('#0077b6');

  // 初始化攝影機影像
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像寬高為視窗的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素

  // 使用 createGraphics 產生一個與攝影機影像相同大小的畫布
  graphics = createGraphics(capture.width, capture.height);
  graphics.background(255, 0, 0); // 設定 graphics 的背景顏色為紅色（可自行調整）
  graphics.fill(255);
  graphics.textSize(32);
  graphics.textAlign(CENTER, CENTER);
  graphics.text('Graphics Layer', graphics.width / 2, graphics.height / 2); // 在 graphics 上繪製文字
}

function draw() {
  background('#0077b6'); // 確保背景顏色維持為 #0077b6

  // 水平翻轉畫布
  push();
  translate(width, 0); // 將畫布的原點移到右上角
  scale(-1, 1); // 水平翻轉畫布

  // 將攝影機影像顯示在畫布中央
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;
  image(capture, x, y, capture.width, capture.height);

  pop(); // 恢復畫布的原始狀態

  // 將 graphics 畫布顯示在攝影機影像的上方
  image(graphics, (width - graphics.width) / 2, (height - capture.height) / 2 - graphics.height);
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
}
```
## 第四條指令
把graphics的背景顏色為黑色,graphics在寬與高切成每隔20為一個單位,但每個單位內產生一個寬高為15的圓,圓的顏色採用capture相對位置的顏色

### 說明
graphics 背景設為黑色：

使用 graphics.background(0) 設定背景為黑色。
繪製圓形：

每隔 20 單位繪製一個寬高為 15 的圓形。
圓形的顏色取自 capture.get(x, y)，即攝影機影像對應位置的顏色。
清除舊內容：

在每次繪製前，使用 graphics.clear() 清除之前的內容，並重新繪製。

```javascript=
let capture;
let graphics;

function setup() {
  // 建立全螢幕畫布，背景顏色為 #0077b6
  createCanvas(windowWidth, windowHeight);
  background('#0077b6');

  // 初始化攝影機影像
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像寬高為視窗的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素

  // 使用 createGraphics 產生一個與攝影機影像相同大小的畫布
  graphics = createGraphics(capture.width, capture.height);
  graphics.background(0); // 設定 graphics 的背景顏色為黑色
}

function draw() {
  background('#0077b6'); // 確保背景顏色維持為 #0077b6

  // 在 graphics 上繪製圓形，顏色取自 capture 的相對位置
  graphics.clear(); // 清除之前的繪製內容
  graphics.background(0); // 設定背景為黑色
  for (let x = 0; x < graphics.width; x += 20) {
    for (let y = 0; y < graphics.height; y += 20) {
      // 從 capture 中取樣顏色
      let col = capture.get(x, y);
      graphics.fill(col);
      graphics.noStroke();
      graphics.ellipse(x + 10, y + 10, 15, 15); // 繪製寬高為 15 的圓形
    }
  }

  // 水平翻轉畫布
  push();
  translate(width, 0); // 將畫布的原點移到右上角
  scale(-1, 1); // 水平翻轉畫布

  // 將攝影機影像顯示在畫布中央
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;
  image(capture, x, y, capture.width, capture.height);

  pop(); // 恢復畫布的原始狀態

  // 將 graphics 畫布顯示在攝影機影像的上方
  image(graphics, (width - graphics.width) / 2, (height - capture.height) / 2 - graphics.height);
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
}
```

## 第五條指令
取消graphics每個單位上的圓,改為寬為18的方框,中間有個5的圓,圓的顏色為黑色,方框的顏色採用capture相對位置的顏色
### 說明
方框繪製：

使用 graphics.rect(gx, gy, 18, 18) 繪製寬高為 18 的方框。
方框的顏色取自 capture.get(gx, gy)。
黑色圓繪製：

在方框中間使用 graphics.ellipse(gx + 9, gy + 9, 5, 5) 繪製直徑為 5 的黑色圓。
繪製順序：

先繪製方框，再在方框中間繪製黑色圓。
```javascript=
let capture;
let graphics;

function setup() {
  // 建立全螢幕畫布，背景顏色為 #0077b6
  createCanvas(windowWidth, windowHeight);
  background('#0077b6');

  // 初始化攝影機影像
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像寬高為視窗的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素

  // 使用 createGraphics 產生一個與攝影機影像相同大小的畫布
  graphics = createGraphics(capture.width, capture.height);
  graphics.background(0); // 設定 graphics 的背景顏色為黑色
}

function draw() {
  background('#0077b6'); // 確保背景顏色維持為 #0077b6

  // 計算影像置中的位置
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;

  // 在 graphics 上繪製黑色背景和方框濾鏡效果
  graphics.background(0); // 確保背景為黑色

  // 水平翻轉 graphics 畫布
  graphics.push();
  graphics.translate(graphics.width, 0); // 將原點移到右上角
  graphics.scale(-1, 1); // 水平翻轉畫布

  for (let gx = 0; gx < graphics.width; gx += 20) {
    for (let gy = 0; gy < graphics.height; gy += 20) {
      // 從 capture 中取樣顏色
      let col = capture.get(gx, gy);
      graphics.fill(col);
      graphics.noStroke();
      graphics.rect(gx, gy, 18, 18); // 繪製寬高為 18 的方框

      // 在方框中間繪製黑色圓
      graphics.fill(0); // 設定顏色為黑色
      graphics.ellipse(gx + 9, gy + 9, 5, 5); // 繪製直徑為 5 的圓
    }
  }

  graphics.pop(); // 恢復 graphics 畫布的原始狀態

  // 水平翻轉畫布
  push();
  translate(width, 0); // 將畫布的原點移到右上角
  scale(-1, 1); // 水平翻轉畫布

  // 將攝影機影像繪製在畫布上，並置中
  image(capture, -x - capture.width, y, capture.width, capture.height);

  pop(); // 恢復畫布的原始狀態

  // 將 graphics 畫布顯示在攝影機影像的上方
  image(graphics, x, y, capture.width, capture.height);
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 同步調整攝影機影像大小
}
```


---
tags: 程式設計,第十三章,學生版,互動藝術程式創作入門,Creative Coding
---
# 章節 13_2 - 學生版_即時影像擷取與像素操作

## 使用影像
* P5.createCapture()
    * 使用方式
```javascript=
capture = createCapture(VIDEO)
capture.size(320,240);//設定顯示畫面大小
image(capture,mouseX, mouseY)
```


---
### 實際的程式碼

```javascript=




```

---

### 先儲存 capture 抓到的影像，再去處理儲存起來的影像
#### 產生一個方塊的點

```javascript=



```





---

### 修正攝影機左右相反的問題
```javascript=



```



---
### span依照滑鼠x軸移動變化其方塊大小

```javascript=


```
* 可以把rect(x,y,span)改為圓圈ellipse(x,y,span)

---

### 取得亮度：(pixel[0] + pixel[1] + pixel[2])/3 //RGB 的平均值
```javascript=



```


---
### 不一樣的畫面(方塊的大小跟顏色有相關)
![](https://i.imgur.com/35jTfmE.gif)

```javascript=



```
---
### 按下不同按鈕產生不一樣的畫面

```javascript=



```


---
### 按下1或是2，3都會產生不同的效果

```javascript=



```
---

可以把
rect(0,0,span);
更改為
rect(0,0,span*0.9); //讓方塊與方塊間有更大黑色縫隙

---
### 顏色與pixel[0]有相關
```javascript=


```

---
### 顏色會變化方塊大小
![](https://i.imgur.com/6VvOhiH.gif)

```javascript=




```

---


### 文字雲的創作
#### 取的當前像素的亮度 bk = (pixel[0] + pixel[1] + pixel[2])/3



---
![](https://i.imgur.com/I3DqiNK.gif)
```javascript=
		if(mode=="3")
		{
			fill(pixel)
			textSize(span)
			text("天",x,y)
		}
```

---

### 取得當前亮度對應到的文字（假設共有 10 個字可選擇）：
var txt = "一二三四五田雷電龕龘"
    

---

```javascript=
const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
let txt = "一二三四五田雷電龕龘"
let bkId = int(map(bk, 0, 255, 9, 0))
text(txt[bkId])
```



---
### 最後完整程式碼
```javascript=


```

---



#### 加入材質，產生noise效果
```javascript=
push()
		blendMode(MULTIPLY)
		image(noiseTexture,0,0,width,height)
pop()
```

---



---
## 影片操作進階－追蹤顏色

引用 Tracking.js 的方式，以下則一即可：
在新的 tab 中使用 trackingjs 的程式碼 ，刪掉註解的部分以避免執行錯誤。
參考這個 sketch，在一個新個 tab 裡面新增下列程式碼即可：



---
#### 產生一個新的tab2
![](https://i.imgur.com/0EGnCRS.png)



---

```javascript=

var s = document.createElement("script");
s.type = "text/javascript";
s.src = "https://cdnjs.cloudflare.com/ajax/libs/tracking.js/1.1.3/tracking-min.js";
document.head.appendChild(s);
```


---

### 綁定 capture 的影片
```javascript=
capture = createCapture(VIDEO)
capture.position(0,0)
capture.id("myVideo")
colors = new tracking.ColorTracker(['yellow','magenta','cyan']) //追蹤特定顏色
tracking.track("#myVideo",colors) // 綁定影片
```


---

### tracking 的 colorTracker 可以抓取特定的顏色，並回傳一個有這些色塊位置與大小的陣列。

```json=

[
    {
        color: "yellow"
        height: 473
        width: 543
        x: 96
        y: 0
    },
    {
        color: "yellow"
        height: 472
        width: 541
        x: 98
        y: 0
    }...
]
```
### 綁定資料更新的事件
```javascript=
colors.on('track',updateData) // 綁定事件，畫面更新的時候執行 updateData

function updateData(event){
    data = event.data
}
```
### 把資料繪製到螢幕上
```javascript=
fill('yellow')
if (data){
	for(var i=0;i<data.length;i++){
		fill(data[i].color)
		rect(
            data[i].x,data[i].y,
            data[i].width,data[i].height
            )
	}
}
```


---
章節 13_2 - 學生版_即時影像擷取與像素操作.md
目前顯示的是「章節 13_2 - 學生版_即時影像擷取與像素操作.md」。
