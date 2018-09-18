export default class Drag {
  constructor({dom, onDrag, onDragEnd}) {
    this.onDrag = onDrag;
    this.onDragEnd = onDragEnd;
    dom.addEventListener('mousedown', this.dragStart);
  }

  dragStart(e) {
    this.offsetX = e.offsetX;
    this.offsetY = e.offsetY;
    window.addEventListener('mousemove', this.drag);
    window.addEventListener('mouseup', this.dragEnd);
  }

  dragEnd(e) {
    window.removeEventListener('mousemove', this.drag);
    window.removeEventListener('mouseup', this.dragEnd);
    this.cb(e, this.onDragEnd);
  }

  drag(e) {
    this.cb(e, this.onDrag);
  }

  cb(e, f) {
    if (f) {
      const dx = e.offsetX - this.offsetX;
      const dy = e.offsetY - this.offsetY;
      this.offsetX = e.offsetX;
      this.offsetY = e.offsetY;
      f(dx, dy);
    }
  }
}