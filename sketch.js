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

  // 計算影像置中的位置
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;

  // 水平翻轉畫布
  push();
  translate(width, 0); // 將畫布的原點移到右上角
  scale(-1, 1); // 水平翻轉畫布

  // 將攝影機影像繪製在畫布上，並置中
//  image(capture, -x - capture.width, y, capture.width, capture.height);

  pop(); // 恢復畫布的原始狀態
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 同步調整攝影機影像大小
}
