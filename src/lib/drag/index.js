export default class Drag {
  constructor({dom, onDrag, onDragEnd}) {
    this.onDrag = onDrag;
    this.onDragEnd = onDragEnd;
    dom.addEventListener('mousedown', this.dragStart);
  }

  dragStart = (e) => {
    this.lx = e.pageX;
    this.ly = e.pageY;
    window.addEventListener('mousemove', this.drag);
    window.addEventListener('mouseup', this.dragEnd);
  };

  dragEnd = (e) => {
    window.removeEventListener('mousemove', this.drag);
    window.removeEventListener('mouseup', this.dragEnd);
    this.cb(e, this.onDragEnd);
  };

  drag = (e) => {
    this.cb(e, this.onDrag);
  };

  cb(e, f) {
    if (f) {
      const dx = e.pageX - this.lx;
      const dy = e.pageY - this.ly;
      this.lx = e.pageX;
      this.ly = e.pageY;
      f(dx, dy);
    }
  }
}