'use strict';
(() => {
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const menu=document.querySelector('.menu-toggle'),nav=document.getElementById('site-navigation');
 if(menu&&nav){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open)});document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open')}})}
 const frames=[...document.querySelectorAll('.hero-frame')],dots=[...document.querySelectorAll('[data-slide]')],toggle=document.querySelector('.motion-toggle');
 let current=0,paused=reduced.matches,timer;
 const captions=['GEAR TRAIN · PHOTO 29 / 33','HELICAL GEAR · PHOTO 19 / 33','LOWER HOUSING · PHOTO 28 / 33','ASSEMBLED UNIT · PHOTO 33 / 33'];
 function show(n){current=(n+frames.length)%frames.length;frames.forEach((f,i)=>f.classList.toggle('is-active',i===current));dots.forEach((d,i)=>d.setAttribute('aria-pressed',String(i===current)));const c=document.querySelector('.hero-caption');if(c)c.textContent=captions[current]}
 function schedule(){clearInterval(timer);if(!paused&&!reduced.matches&&frames.length&&!document.hidden)timer=setInterval(()=>{show(current+1);if(shots.length)showEquipment(equipmentCurrent+1)},2000)}
 function setPause(value){paused=value;document.body.classList.toggle('motion-paused',paused);if(toggle){toggle.textContent=paused?'Play motion ▷':'Pause motion Ⅱ';toggle.setAttribute('aria-pressed',String(paused))}schedule()}
 dots.forEach(d=>d.addEventListener('click',()=>{show(Number(d.dataset.slide));schedule()}));
 if(toggle)toggle.addEventListener('click',()=>setPause(!paused));
 document.addEventListener('visibilitychange',schedule);reduced.addEventListener('change',()=>setPause(reduced.matches));setPause(paused);
 const tabs=[...document.querySelectorAll('[data-equipment]')],shots=[...document.querySelectorAll('.showcase-frame')];
 let equipmentCurrent=0;
 function showEquipment(i){equipmentCurrent=(i+shots.length)%shots.length;tabs.forEach((b,j)=>b.setAttribute('aria-pressed',String(j===equipmentCurrent)));shots.forEach((f,j)=>{f.hidden=j!==equipmentCurrent;f.classList.toggle('is-active',j===equipmentCurrent)})}
 tabs.forEach((t,i)=>t.addEventListener('click',()=>{showEquipment(i);schedule()}));
 if('IntersectionObserver'in window&&!reduced.matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('is-pending');e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.06});document.querySelectorAll('.editorial-card,.visual-service,.company-feature,.section-head').forEach(el=>{el.classList.add('reveal','is-pending');observer.observe(el)})}
 const form=document.querySelector('.resource-search'),input=document.getElementById('resource-query'),results=document.getElementById('resource-results');
 if(form&&input&&results){let index=null;async function search(){results.replaceChildren();const q=input.value.trim().toLowerCase();if(!q){input.focus();return}try{if(!index){const response=await fetch('resource-index.json');if(!response.ok)throw new Error();index=await response.json()}const words=q.split(/\s+/);const matches=index.filter(x=>words.every(w=>(x.title+' '+x.url).toLowerCase().includes(w))).slice(0,7);if(matches.length){matches.forEach(x=>{const a=document.createElement('a');a.href=x.url;a.textContent=x.title+' →';results.append(a)})}else{const p=document.createElement('p');p.textContent='No matching page. Try repair, rebuilding, gears, shipping or a manufacturer name.';results.append(p)}}catch{const a=document.createElement('a');a.href='gearbox-brand-guides.html';a.textContent='Browse the gearbox brand directory →';results.append(a)}}form.addEventListener('submit',e=>{e.preventDefault();search()});input.addEventListener('input',()=>{if(!input.value.trim())results.replaceChildren()});document.addEventListener('click',e=>{if(!form.contains(e.target))results.replaceChildren()});input.addEventListener('keydown',e=>{if(e.key==='Escape')results.replaceChildren()})}
})();
