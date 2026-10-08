// These small controls keep the static article usable without a server.
const commentInput=document.querySelector('#comment-text');
const replyThread=document.querySelector('[data-node-id="7417:1196"]');
const replyToggle=document.querySelector('[data-node-id="7416:1020"]');
replyThread.id='reply-konkin';replyThread.hidden=true;
replyToggle.setAttribute('aria-controls',replyThread.id);replyToggle.setAttribute('aria-expanded','false');
action(replyToggle,'Показать ответ Конькина Миши',()=>{const expanded=replyThread.hidden;replyThread.hidden=!expanded;replyToggle.textContent=expanded?'Свернуть':'1 ответ';replyToggle.setAttribute('aria-expanded',String(expanded));replyToggle.setAttribute('aria-label',expanded?'Свернуть ответ Конькина Миши':'Показать ответ Конькина Миши')});
const subscribe=document.querySelector('[data-node-id="7399:1683"]');
action(subscribe,'Подписаться на автора',()=>{const subscribed=subscribe.getAttribute('aria-pressed')!=='true';subscribe.setAttribute('aria-pressed',String(subscribed));subscribe.classList.toggle('is-subscribed',subscribed);subscribe.querySelector('p').textContent=subscribed?'Вы подписаны':'Подписаться'});
subscribe.setAttribute('aria-pressed','false');
for(const id of ['7416:1015','7417:1199','7417:1218']){
  const like=document.querySelector(`[data-node-id="${id}"]`),count=like.querySelector('p'),initial=Number(count.textContent);
  action(like,'Нравится комментарий',()=>{const liked=like.getAttribute('aria-pressed')!=='true';like.setAttribute('aria-pressed',String(liked));like.classList.toggle('is-liked',liked);count.textContent=initial+Number(liked)});
  like.setAttribute('aria-pressed','false');
}
for(const id of ['7416:1021','7416:1044','7417:1224'])action(document.querySelector(`[data-node-id="${id}"]`),'Ответить на комментарий',()=>{commentInput.focus();commentInput.scrollIntoView({block:'center',behavior:'smooth'})});
action(document.querySelector('[data-node-id="7416:969"]'),'Поделиться статьёй',async()=>{try{await navigator.clipboard.writeText(location.href);show('Ссылка скопирована',['Можно отправить ссылку на эту статью.'])}catch{show('Ссылка на статью',[location.href])}});
