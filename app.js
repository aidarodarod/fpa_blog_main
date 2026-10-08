const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],node=id=>$(`[data-node-id="${id}"]`);
function show(title,paragraphs){$('#dialog-title').textContent=title;$('#dialog-body').replaceChildren();for(const text of paragraphs){const p=document.createElement('p');p.textContent=text;$('#dialog-body').append(p)}$('#dialog').showModal()}
function action(el,label,callback){if(!el)return;el.classList.add('ui-action');el.setAttribute('role','button');el.setAttribute('tabindex','0');el.setAttribute('aria-label',label);el.addEventListener('click',callback);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();callback()}})}
const articleCards=$$('.top-posts .post-card,.lower-posts .post-card');
for(const card of articleCards){const title=[...card.querySelectorAll('p')].find(p=>/font-size:18.5px/.test(p.getAttribute('style')||''));if(title&&card.tagName!=='A')action(title,title.textContent.trim(),()=>show(title.textContent.trim(),['Превью статьи. Полный текст можно подключить при наполнении блога.']))}
function goToFeed(){const feed=$('.top-posts');if(feed)feed.scrollIntoView({block:'start'});else location.href='index.html'}
for(const el of $$('.sidebar [data-name="Menu item"]')){const label=el.textContent.trim();action(el,label,()=>{if(label==='Поиск')openSearch();else if(label==='Калькуляторы')show('Расчёт стоимости',['Для расчёта стоимости нужна консультация юриста. Форма заявки пока не подключена.']);else if(label==='Вопросы')show('Вопрос юристу',['Форма обращения пока не подключена.']);else goToFeed()})}
function openSearch(){show('Поиск по блогу',[]);const input=document.createElement('input');input.type='search';input.placeholder='Найти статью…';input.setAttribute('aria-label','Поиск по блогу');const results=document.createElement('div');$('#dialog-body').append(input,results);input.addEventListener('input',()=>{results.replaceChildren();const q=input.value.trim().toLowerCase();if(!q)return;for(const card of articleCards){const title=[...card.querySelectorAll('p')].find(p=>/font-size:18.5px/.test(p.getAttribute('style')||''));if(title&&title.textContent.toLowerCase().includes(q)){const b=document.createElement('button');b.className='search-result';b.textContent=title.textContent.trim();b.onclick=()=>{$('#dialog').close();card.scrollIntoView({block:'center'});card.classList.add('search-match');setTimeout(()=>card.classList.remove('search-match'),2000)};results.append(b)}}if(!results.childElementCount)results.textContent='Ничего не найдено.'});input.focus()}
const rubles=value=>new Intl.NumberFormat('ru-RU').format(value)+' ₽';
const debtField=node('7323:2005'),debtAmount=node('7323:2007').querySelector('span');
node('7323:2009').hidden=true;
const debtSlider=document.createElement('input');
debtSlider.type='range';debtSlider.id='debt-slider';debtSlider.className='debt-slider';
debtSlider.min='0';debtSlider.max='10000000';debtSlider.step='1000';debtSlider.value='1539000';
debtSlider.setAttribute('aria-label','Сумма долга');
function updateDebt(){const value=Number(debtSlider.value);debtAmount.textContent=new Intl.NumberFormat('ru-RU').format(value)+' ';debtSlider.style.setProperty('--debt-progress',value/100000+'%');debtSlider.setAttribute('aria-valuetext',rubles(value))}
debtSlider.addEventListener('input',updateDebt);debtField.append(debtSlider);updateDebt();
action(node('7323:2015'),'Рассчитать стоимость',()=>show('Расчёт стоимости',['Сумма долга: '+rubles(Number(debtSlider.value))+'.','Для точного расчёта нужна консультация юриста. Форма заявки пока не подключена.']));
action(node('7323:2070'),'Задать вопрос',()=>show('Вопрос Марии Смирновой',['Это демонстрация страницы. Форма обращения пока не подключена.']));
for(const id of ['7323:2411','7323:2413','7323:2415','7323:2417','7323:2419','7323:2421']){const el=node(id);action(el,el.textContent.trim(),()=>id==='7323:2419'?($('#news')?$('#news').scrollIntoView():location.href='index.html#news'):show(el.textContent.trim(),['Здесь можно подключить соответствующую страницу основного сайта.']))}
$('#close-dialog').onclick=$('#dialog-done').onclick=()=>$('#dialog').close();
$('#dialog').addEventListener('click',e=>{if(e.target!==$('#dialog'))return;const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close()});

for(const reading of $$('[data-name="image 1459"]')){
reading.classList.add('reading-status');reading.setAttribute('aria-label','2 человека читают');
const readingDot=document.createElement('span');readingDot.className='reading-dot';readingDot.setAttribute('aria-hidden','true');
const readingText=document.createElement('span');readingText.textContent='2 читают';reading.replaceChildren(readingDot,readingText);
}

const topicList=node('7323:1594'),topicToggle=node('7323:1655'),topicSection=node('7323:1590');
const topicNames=['Банкротство через МФЦ','Выплаты и стоимость','Документы','Законы','Имущество','Инструкции','ИП','Коллекторы','Кредит','Кредиторы','МФО','Недвижимость/ипотека','Приставы','Разбор ситуации','Советы должникам','Списание долгов','Суд','Финансовый управляющий','Юрист'];
const originalTopics=[...topicList.children],topicTemplates=new Map(originalTopics.map(row=>[row.textContent.trim(),row.cloneNode(true)]));
const topicAliases={'Банкротство МФЦ':'Банкротство через МФЦ','Недвижимость':'Недвижимость/ипотека'};
const visibleTopics=new Set();
for(const row of originalTopics){const label=topicAliases[row.textContent.trim()]||row.textContent.trim();if(visibleTopics.has(label)){row.remove();continue}visibleTopics.add(label);row.querySelector('p').textContent=label;row.classList.add('topic-row');row.setAttribute('aria-label',label)}
const extraTopics=document.createElement('div');extraTopics.id='extra-topics';extraTopics.className='extra-topics';extraTopics.hidden=true;
const topicIcons={'Выплаты и стоимость':'Банкротство МФЦ','Законы':'Документы','Имущество':'Недвижимость','Инструкции':'Документы','ИП':'Банкротство МФЦ','Кредит':'Банкротство','Кредиторы':'Коллекторы','МФО':'Банкротство МФЦ','Приставы':'Коллекторы','Советы должникам':'Разбор ситуации','Списание долгов':'Документы','Суд':'Документы','Финансовый управляющий':'Банкротство МФЦ','Юрист':'Документы'};
for(const label of topicNames){if(visibleTopics.has(label))continue;const row=topicTemplates.get(topicIcons[label]||'Документы').cloneNode(true);for(const el of [row,...row.querySelectorAll('[data-node-id]')])el.removeAttribute('data-node-id');row.classList.add('topic-row');row.querySelector('p').textContent=label;action(row,label,goToFeed);if(topicList.childElementCount<10)topicList.append(row);else extraTopics.append(row);visibleTopics.add(label)}
topicList.after(extraTopics);topicToggle.setAttribute('aria-controls','extra-topics');topicToggle.setAttribute('aria-expanded','false');
action(topicToggle,'Показать ещё темы',()=>{const expanded=topicToggle.getAttribute('aria-expanded')!=='true';extraTopics.hidden=!expanded;topicToggle.setAttribute('aria-expanded',String(expanded));topicToggle.setAttribute('aria-label',expanded?'Свернуть темы':'Показать ещё темы');node('7323:1656').textContent=expanded?'Свернуть':'Показать еще';topicSection.classList.toggle('topics-expanded',expanded);$('.sidebar').classList.toggle('topics-expanded',expanded)});
