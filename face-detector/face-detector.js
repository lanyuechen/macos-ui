class FD {
  constructor(container, width, height) {
    if(!window.FaceDetector) {
      throw('Face Detection not supported');
    }
    this.container = container;
    this.video = document.createElement('video');
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'red';

    this._canvas = this.canvas.cloneNode();
    this._ctx = this._canvas.getContext('2d');

    this.faceDetector = new FaceDetector();
    this.faces = [];

    this.stats = new Stats();
    this.stats.showPanel(0);
    this.container.appendChild(this.stats.dom);
  }

  start() {
    console.log('>>>>>>>', navigator.mediaDevices)
    navigator.mediaDevices.getUserMedia({
      video: {
        width: this.canvas.width,
        height: this.canvas.height
      }
    }).then((mediaStream) => {
      this.video.srcObject = mediaStream;
      this.video.play();
      this.detect();
      this.refresh();
    }).catch(err => {
      console.log(err);
    });
  }

  refresh() {
    this.ctx.drawImage(this.video, 0, 0);
    this.drawFaces(this.faces);
    requestAnimationFrame(() => {
      this.refresh();
    });
  }

  detect() {
    this.stats.begin();
    this._ctx.drawImage(this.video, 0, 0);
    this.faceDetector.detect(this._canvas).then(faces => {
      this.faces = faces;
      this.stats.end();
      this.detect();
    });
  }

  drawFaces(faces) {
    for (let face of faces) {
      const { x, y, width, height } = face.boundingBox;
      this.ctx.beginPath();
      this.ctx.rect(x, y, width, height);
      this.ctx.stroke();
    }
  }
}