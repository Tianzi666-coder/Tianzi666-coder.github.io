/* 鼠标跟随光点（触屏设备不启用） */
(function () {
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
  if (document.getElementById('cursor-glow')) return;

  var d = document.createElement('div');
  d.id = 'cursor-glow';
  document.body.appendChild(d);

  var x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y, raf = null;
  function loop() {
    x += (tx - x) * 0.12;
    y += (ty - y) * 0.12;
    d.style.transform = 'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%)';
    raf = requestAnimationFrame(loop);
  }
  document.addEventListener('mousemove', function (e) {
    tx = e.clientX; ty = e.clientY;
    d.style.opacity = 1;
    if (!raf) loop();
  });
  document.addEventListener('mouseleave', function () { d.style.opacity = 0; });
})();
