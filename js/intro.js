/* Start the fallback clock before touching storage or any page behaviour. */
(function () {
  'use strict';
  var root = document.documentElement;
  var script = document.currentScript;
  var key = 'octetec-makezaa-intro-' + (script ? script.dataset.design : 'demo');
  try { if (sessionStorage.getItem(key) === 'seen') return; } catch (error) { /* file:// storage may be unavailable */ }
  root.classList.add('intro-active');
  var started=Date.now();
  function keepIntro(event){if(root.classList.contains('intro-active')&&Date.now()-started<2000){event.preventDefault();event.stopImmediatePropagation();}}
  document.addEventListener('keydown',keepIntro,true);
  document.addEventListener('click',keepIntro,true);
  window.setTimeout(function () {
    root.classList.remove('intro-active');
    document.removeEventListener('keydown',keepIntro,true);
    document.removeEventListener('click',keepIntro,true);
    try { sessionStorage.setItem(key, 'seen'); } catch (error) { /* no storage is required */ }
  }, 2000);
}());
