class FD {
  constructor(container, config = {width: 200, height: 200}) {
    const { width, height } = config;
    this.width = width;
    this.height = height;

    this.detectFace = true;
    this.detectEye = false;

    this.container = container;
    this.video = document.createElement('video');

    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.canvasBuffer = document.createElement('canvas');
    this.canvasBuffer.width = width;
    this.canvasBuffer.height = height;
    this.ctxBuffer = this.canvasBuffer.getContext('2d');

    this.resolution = {
      video: { width, height }
    }

    this.stats = new Stats();
    this.stats.showPanel(0);
    this.container.appendChild(this.stats.dom);

    this.srcMat = new cv.Mat(height, width, cv.CV_8UC4);
    this.grayMat = new cv.Mat(height, width, cv.CV_8UC1);

    this.faceClassifier = new cv.CascadeClassifier();
    this.faceClassifier.load('haarcascade_frontalface_default.xml');
    
    this.eyeClassifier = new cv.CascadeClassifier();
    this.eyeClassifier.load('haarcascade_eye.xml');

    this.faces = [];
    this.size = 1;
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia(this.resolution).then((mediaStream) => {
      this.video.srcObject = mediaStream;
      this.video.play();
      this.processVideo();
      this.refresh();
    }).catch((err) => {
      console.log('open camera err:' + err);
    });
  }

  refresh() {
    this.ctx.drawImage(this.video, 0, 0);
    this.drawResults();
    requestAnimationFrame(() => {
      this.refresh();
    });
  }

  processVideo() {
    this.stats.begin();
    this.ctxBuffer.drawImage(this.video, 0, 0, this.width, this.height);
    const imageData = this.ctxBuffer.getImageData(0, 0, this.width, this.height);

    this.srcMat.data.set(imageData.data);
    
    cv.cvtColor(this.srcMat, this.grayMat, cv.COLOR_RGBA2GRAY);

    const faceVect = new cv.RectVector();
    const faceMat = new cv.Mat();

    cv.pyrDown(this.grayMat, faceMat);
    if (this.width > 320) {
      cv.pyrDown(faceMat, faceMat);
    }
    this.size = faceMat.size();

    this.faceClassifier.detectMultiScale(faceMat, faceVect);

    this.faces = [];
    for (let i = 0; i < faceVect.size(); i++) {
      let face = faceVect.get(i);
      this.faces.push(new cv.Rect(face.x, face.y, face.width, face.height));
    }
    faceMat.delete();
    faceVect.delete();

    this.stats.end();
    requestAnimationFrame(() => {
      this.processVideo();
    });
  }

  drawResults() {
    for (let d of this.faces) {
      let xr = this.width / this.size.width;
      let yr = this.height / this.size.height;
      this.ctx.beginPath();
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = 'red';
      this.ctx.strokeRect(d.x * xr, d.y * yr, d.width * xr, d.height * yr);
    }
  }
}
