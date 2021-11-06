import { FC, useEffect } from 'react';

const Background: FC = () => {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const style = canvas.style;
    style.width = '100%';
    style.position = 'absolute';
    style.zIndex = '-1';
    style.bottom = '0';
    style.left = '0';
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    let x0: number, y0: number, w: number, h: number, dw: number;

    function drawCircle(radius: number) {
      ctx.beginPath();
      const color = Math.round(255 * (1 - radius / Math.max(w, h)));
      ctx.strokeStyle = 'rgba(' + color + ',' + color + ',' + color + ',0.1)';
      ctx.arc(x0, y0, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.lineWidth = 2;
    }

    let step = 0;

    function drawCircles() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < 8; i++) {
        drawCircle(dw * i + (step % dw));
      }
      step += 1;
    }

    function init() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      let offset = h > 380 ? 100 : 65;
      offset = h > 800 ? 116 : offset;
      x0 = w / 2;
      y0 = h - offset;
      dw = Math.max(w, h, 1000) / 13;
      drawCircles();
    }
    window.onresize = init;

    let loading = true;

    function animate() {
      if (loading || step % dw < dw - 5) {
        requestAnimationFrame(function () {
          drawCircles();
          animate();
        });
      }
    }
    (window as any).animateBackground = function (l: boolean) {
      loading = l;
      animate();
    };
    init();
    animate();
  }, []);

  return null;
};

export default Background;
