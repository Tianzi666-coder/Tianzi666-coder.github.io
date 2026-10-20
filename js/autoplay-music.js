/* 进入站点自动播放背景音乐（音量很小）
   现代浏览器禁止有声自动播放：能自动就自动，被拦后在首次交互时开始 */
(function () {
  var VOLUME = 0.15;
  var started = false;
  var timer = null;

  function player() {
    var el = document.querySelector('#nav-music meting-js');
    return el && el.aplayer ? el.aplayer : null;
  }

  function tryPlay() {
    if (started) return true;
    var ap = player();
    if (!ap) return false;
    try { ap.volume(VOLUME); } catch (e) {}
    try { ap.play(); started = true; return true; } catch (e) { return false; }
  }

  timer = setInterval(function () {
    if (tryPlay()) { clearInterval(timer); timer = null; }
  }, 700);
  setTimeout(function () { if (timer) { clearInterval(timer); timer = null; } }, 25000);

  function onFirst() {
    tryPlay();
    document.removeEventListener('click', onFirst, true);
    document.removeEventListener('touchstart', onFirst, true);
    document.removeEventListener('scroll', onFirst, true);
    document.removeEventListener('keydown', onFirst, true);
  }
  document.addEventListener('click', onFirst, true);
  document.addEventListener('touchstart', onFirst, true);
  document.addEventListener('scroll', onFirst, true);
  document.addEventListener('keydown', onFirst, true);
})();
