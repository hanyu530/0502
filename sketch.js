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
