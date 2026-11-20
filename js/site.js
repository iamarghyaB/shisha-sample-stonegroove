/* No network calls, services, analytics, storage of form fields, or modules. */
(function () {
  'use strict';
  var doc=document, dialog=doc.getElementById('demo-dialog'), gallery=doc.getElementById('gallery-dialog');
  var priorFocus=null, galleryIndex=0, galleryItems=[];
  function close(d){if(d&&d.open)d.close();}
  function openDialog(title){
    priorFocus=doc.activeElement;
    dialog.classList.remove('sgdl-dialog');
    var body=dialog.querySelector('.dialog-body');body.textContent='';
    var heading=doc.createElement('h2');heading.id='dialog-title';heading.textContent=title;body.append(heading);
    if(/reserv|book/i.test(title))body.insertAdjacentHTML('beforeend','<p>Plan your evening at SHISHA SAMPLE.</p><form data-local-form><div class="form-grid"><label>Your name<input name="name" autocomplete="name" required></label><label>Email<input type="email" name="email" autocomplete="email" required></label><label>Date<input type="date" name="date" required></label><label>Time<select name="time"><option>17:00</option><option>18:00</option><option>19:00</option><option>20:00</option><option>21:00</option><option>22:00</option></select></label><label>Party size<select name="guests"><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5 guests</option><option>6 guests</option></select></label></div><button type="submit">Preview reservation</button><small>Private design demo. No booking is made and no information is sent.</small></form>');
    else if(/drop list|subscribe|newsletter/i.test(title)){if(doc.body.dataset.design==='stonegroove'){dialog.classList.add('sgdl-dialog');heading.className='drop-live-heading';heading.innerHTML='THE<br>DROP LIST.';body.insertAdjacentHTML('beforeend','<p class="sgdl-topline">SHISHA SAMPLE PRESENTS</p><p class="sgdl-intro">Get first word on new whiskey releases, limited bottlings, artist collaborations, and where to find SHISHA SAMPLE.</p><form class="sgdl-form" data-local-form><label class="sgdl-sr-only" for="drop-email">Email address</label><input class="sgdl-email" id="drop-email" type="email" name="email" placeholder="YOUR EMAIL ADDRESS" required autocomplete="email"><div class="sgdl-consent"><label class="sgdl-checkline"><input type="checkbox" required><span>I confirm I am 21 years of age or older.</span></label><label class="sgdl-checkline"><input type="checkbox" required><span>I agree to receive marketing emails from SHISHA SAMPLE about products, releases, collaborations, and availability.</span></label></div><button class="sgdl-submit" type="submit">GET ON THE LIST</button><p class="sgdl-legal">21+ only. No noise. Just the good stuff.</p><small>Private demo. You are not subscribed; no information is sent or stored.</small></form>');}else body.insertAdjacentHTML('beforeend','<p>New releases. Fresh tracks. Stay in the loop.</p><form data-local-form><label>Email address<input type="email" name="email" required autocomplete="email"></label><button type="submit">Join the list</button><small>Demo only. You will not be subscribed and no information is sent.</small></form>');}
    else if(/contact|email|whatsapp/i.test(title))body.insertAdjacentHTML('beforeend','<p>Get in touch with SHISHA SAMPLE.</p><form data-local-form><label>Email<input type="email" name="email" required></label><label>Message<textarea name="message" required rows="4"></textarea></label><button type="submit">Preview message</button><small>This is a local demonstration. No message is sent.</small></form>');
    else if(/privacy|analytics/i.test(title))body.insertAdjacentHTML('beforeend','<p>This private static demo uses no analytics, tracking cookies or external services. The introduction uses session storage only to avoid replaying on internal pages. Form data is never transmitted or saved.</p><button class="dialog-confirm" type="button">Close</button>');
    else body.insertAdjacentHTML('beforeend','<p>This action is shown as part of a private SHISHA SAMPLE design demonstration. Live ordering, purchases, directions and external social services are not connected.</p><button class="dialog-confirm" type="button">Back to the experience</button>');
    dialog.showModal();
  }
  function renderGallery(){var item=galleryItems[galleryIndex],img=gallery.querySelector('img');img.src=item.getAttribute('href')||item.querySelector('img').src;img.alt=item.querySelector('img')?.alt||'SHISHA SAMPLE gallery';gallery.querySelector('figcaption').textContent=(galleryIndex+1)+' / '+galleryItems.length;}
  doc.addEventListener('click',function(e){
    var target=e.target.closest('[data-demo-action]');if(target){e.preventDefault();openDialog(target.dataset.demoAction);return;}
    var photo=e.target.closest('[data-gallery]');if(photo){e.preventDefault();galleryItems=Array.from(doc.querySelectorAll('[data-gallery]'));galleryIndex=galleryItems.indexOf(photo);priorFocus=photo;renderGallery();gallery.showModal();return;}
    if(e.target.closest('.dialog-close,.dialog-confirm'))close(dialog);
    if(e.target.closest('.gallery-close'))close(gallery);
    if(e.target.closest('.gallery-next')){galleryIndex=(galleryIndex+1)%galleryItems.length;renderGallery();}
    if(e.target.closest('.gallery-prev')){galleryIndex=(galleryIndex+galleryItems.length-1)%galleryItems.length;renderGallery();}
    var tab=e.target.closest('.w-tab-link');if(tab){e.preventDefault();activateTab(tab);history.replaceState(null,'',tab.getAttribute('href'));}
    var navToggle=e.target.closest('.menu-btn-mob,.pipa-menu,.nav-toggle,#menu-toggle,#sgmh-menu');if(navToggle){var nav=doc.getElementById(navToggle.getAttribute('aria-controls'))||doc.querySelector('.nav-menu-wrapper,.nav-links,.site-nav,#nav,#sgmh-links');if(nav){var isOpen=nav.classList.toggle('demo-nav-open');navToggle.setAttribute('aria-expanded',String(isOpen));navToggle.setAttribute('aria-label',isOpen?'Close menu':'Open menu');}}
    if(e.target.closest('.nav-links a,.nav-menu-wrapper a,.site-nav a,.sgmh-links a')){doc.querySelectorAll('.demo-nav-open').forEach(x=>x.classList.remove('demo-nav-open'));doc.querySelectorAll('[aria-expanded="true"]').forEach(x=>x.setAttribute('aria-expanded','false'));var state=doc.getElementById('sg-menu-state');if(state)state.checked=false;}
  });
  doc.addEventListener('submit',function(e){e.preventDefault();var form=e.target;if(!form.checkValidity()){form.reportValidity();return;}var old=form.querySelector('.form-feedback');if(old)old.remove();var message=doc.createElement('p');message.className='form-feedback';message.setAttribute('role','status');message.textContent=/reserv|booking/.test(location.pathname)||form.querySelector('[name="guests"]')?'Reservation preview complete. This is a demo; no table has been booked.':'Demo preview complete. No information has been sent or saved.';form.append(message);});
  function activateTab(tab){var root=tab.closest('.w-tabs');if(!root)return;root.querySelectorAll('.w-tab-link').forEach(x=>{var active=x===tab;x.classList.toggle('w--current',active);x.setAttribute('aria-selected',String(active));x.tabIndex=active?0:-1;});root.querySelectorAll('.w-tab-pane').forEach(x=>{var active=x.dataset.wTab===tab.dataset.wTab;x.classList.toggle('w--tab-active',active);x.hidden=!active;});}
  function hashTab(){var hash=location.hash.slice(1);if(!hash)return;var t=doc.querySelector('.w-tab-link[data-tab="'+CSS.escape(hash)+'"],.w-tab-link[id="'+CSS.escape(hash)+'-tab"]');if(t)activateTab(t);}
  doc.querySelectorAll('.w-tabs').forEach(x=>{var t=x.querySelector('.w--current')||x.querySelector('.w-tab-link');if(t)activateTab(t);});hashTab();window.addEventListener('hashchange',hashTab);
  doc.addEventListener('keydown',function(e){if(e.key==='Escape'){doc.querySelectorAll('.demo-nav-open').forEach(x=>x.classList.remove('demo-nav-open'));doc.querySelectorAll('[aria-expanded="true"]').forEach(x=>x.setAttribute('aria-expanded','false'));var menuState=doc.getElementById('sg-menu-state');if(menuState)menuState.checked=false;}
    if((e.key==='Enter'||e.key===' ')&&e.target.matches('.sg-menu-toggle')){e.preventDefault();e.target.click();}
    if(gallery.open&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){galleryIndex=(galleryIndex+(e.key==='ArrowLeft'?-1:1)+galleryItems.length)%galleryItems.length;renderGallery();}
    var tab=e.target.closest('.w-tab-link');if(tab&&['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();var tabs=Array.from(tab.closest('.w-tab-menu').querySelectorAll('.w-tab-link'));var i=tabs.indexOf(tab);i=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;activateTab(tabs[i]);tabs[i].focus();}
  });
  [dialog,gallery].forEach(function(d){d.addEventListener('click',function(e){if(e.target===d){var r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});d.addEventListener('close',function(){if(priorFocus)priorFocus.focus();});});
  doc.querySelectorAll('input[type="date"]').forEach(x=>{var d=new Date();x.min=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');});
  doc.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)doc.querySelectorAll('details').forEach(other=>{if(other!==d)other.open=false;});}));
  doc.querySelectorAll('.sg-menu-toggle').forEach(function(label){label.tabIndex=0;label.setAttribute('role','button');label.setAttribute('aria-expanded','false');var control=doc.getElementById(label.htmlFor);if(control)control.addEventListener('change',function(){label.setAttribute('aria-expanded',String(control.checked));});});
  /* Original local background films and reels; no streaming or embed services. */
  if ('IntersectionObserver' in window) {
    var films = new IntersectionObserver(function(entries){entries.forEach(function(entry){var v=entry.target;if(entry.isIntersecting){v.muted=true;v.play().catch(function(){});}else v.pause();});},{threshold:.1});
    doc.querySelectorAll('video[autoplay]').forEach(function(v){films.observe(v);});
  }
  /* Reproduce the spirits reference's voluntary 21+ introduction locally. */
  if(doc.body.dataset.design==='stonegroove'){
    var ageKey='shisha-sample-age-affirmed',ageAllowed=false;
    try{ageAllowed=Date.now()-Number(sessionStorage.getItem(ageKey))<7200000;}catch(error){}
    if(!ageAllowed)window.setTimeout(function(){
      var gate=doc.createElement('div');gate.id='sg-age-gate';gate.setAttribute('role','dialog');gate.setAttribute('aria-modal','true');gate.setAttribute('aria-labelledby','sgag-title');
      gate.innerHTML='<div class="sgag-panel"><span class="sample-wordmark sgag-logo">SHISHA<br>SAMPLE<small>SPIRITS</small></span><p class="sgag-eyebrow">The Spirit of Music™</p><div class="sgag-rule"></div><h2 class="sgag-title" id="sgag-title">Are you 21 or older?</h2><p class="sgag-body">Please confirm that you are of legal drinking age to explore SHISHA SAMPLE.</p><div class="sgag-actions"><button class="sgag-btn sgag-yes" type="button">Yes, enter site</button><button class="sgag-btn sgag-no" type="button">No, I am under 21</button></div><p class="sgag-foot">Must be 21 or older to enter. Please enjoy responsibly.</p></div>';
      doc.body.append(gate);doc.documentElement.classList.add('sg-age-pending');
      var inerted=[];Array.from(doc.body.children).forEach(function(child){if(child!==gate&&child.tagName!=='SCRIPT'&&!child.inert){child.inert=true;inerted.push(child);}});
      gate.querySelector('.sgag-yes').addEventListener('click',function(){try{sessionStorage.setItem(ageKey,String(Date.now()));}catch(error){}doc.documentElement.classList.remove('sg-age-pending');inerted.forEach(function(child){child.inert=false;});gate.remove();});
      gate.querySelector('.sgag-no').addEventListener('click',function(){gate.querySelector('.sgag-title').textContent='Access is limited to adults 21+';gate.querySelector('.sgag-body').textContent='SHISHA SAMPLE is intended for adults of legal drinking age. Thank you for understanding.';gate.querySelector('.sgag-actions').remove();});
      gate.querySelector('.sgag-yes').focus();
      gate.addEventListener('keydown',function(e){if(e.key==='Tab'){var buttons=gate.querySelectorAll('button');if(buttons.length&&((e.shiftKey&&doc.activeElement===buttons[0])||(!e.shiftKey&&doc.activeElement===buttons[buttons.length-1]))){e.preventDefault();buttons[e.shiftKey?buttons.length-1:0].focus();}}});
    },doc.documentElement.classList.contains('intro-active')?2450:0);
  }
}());
