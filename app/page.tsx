"use client";

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowUpRight, ArrowRight, Menu, X, Plus, Check } from 'lucide-react';
import { AnimatedSphere } from '@/components/landing/animated-sphere';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const telegram = 'https://t.me/bigbagfilms_ceo';
const experts = [
  ['Макс Уваров', 'Стратегия и тактика продвижения личного бренда', 'image29.webp'],
  ['Рита Алисова', 'Маркетинг и коммуникация брендов', 'image31.webp'],
  ['Алексей Стасюк', 'Креативное мышление и аналитика данных', 'image30.webp'],
];
const creators = [
  ['Евгения Антропова', 'Танец · йога · фото и видео', 'image48.webp', 'https://www.instagram.com/jenya.antropova/'],
  ['Meylischa', 'Лайфстайл · мода · юмор', 'image49.webp', 'https://www.tiktok.com/@meylischa'],
  ['Елена Мальта', 'Питание · творчество · лайфстайл', 'image52.webp', 'https://www.instagram.com/lena__malta/'],
  ['Кирилл Bimool', 'Продюсирование · кейсы · спорт', 'image53.webp', 'https://www.instagram.com/bimoool/'],
];
const weeks = [
  ['Бриф и тестовые ролики', 'Разбираем задачу бренда и референсы: как снят ролик и почему он работает. Креаторы отрабатывают эти приёмы в первых видео.'],
  ['Работа с брендом', 'Креаторы изучают продукт и стиль общения бренда. На встрече с заказчиком разбираем тестовые ролики и референсы.'],
  ['Разбор результатов', 'Сравниваем просмотры, разбираем сценарии. Эксперты рекомендуют, что изменить в съёмке и монтаже и какие приёмы использовать дальше.'],
  ['Масштабирование', 'Масштабируем удачные решения, пробуем новые технологии и приёмы для повышения просмотров. Подводим итоги проекта.'],
];
const plans = [
  {name:'Эксклюзив', tag:'Один бренд в проекте', price:'1 500 000', text:'Все 30 авторов работают с одним партнёром.', videos:'До 900 роликов', views:'От 1,5 млн просмотров', label:'Обсудить эксклюзив'},
  {name:'Шеринг', tag:'Два бренда в проекте', price:'850 000', text:'Проект делят два неконкурирующих бренда.', videos:'До 450 роликов', views:'От 750 тыс. просмотров', label:'Обсудить шеринг'},
  {name:'1 / 3', tag:'Три бренда в проекте', price:'650 000', text:'Вы участвуете вместе с двумя другими брендами.', videos:'До 300 роликов', views:'От 500 тыс. просмотров', label:'Обсудить участие'},
];

function Counter({ end, prefix = '', suffix = '', fraction = 0 }: { end: number; prefix?: string; suffix?: string; fraction?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        if (entry.boundingClientRect.bottom < 0) {
          setValue(end);
          observer.disconnect();
        }
        return;
      }
      observer.disconnect();
      if (reduceMotion) {
        setValue(end);
        return;
      }
      const started = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - started) / 1600, 1);
        setValue(end * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.45 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [end]);

  const formatted = value.toLocaleString('ru-RU', {
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  });

  return <span ref={ref} aria-label={`${prefix}${end.toLocaleString('ru-RU')}${suffix}`}><span aria-hidden="true">{prefix}{formatted}{suffix}</span></span>;
}

function AnimatedWord({ children }: { children: string }) {
  return <span className="hero-word" aria-label={children}>{[...children].map((letter, index) => <span className="hero-char" aria-hidden="true" key={`${letter}-${index}`} style={{'--char-delay': `${200 + index * 45}ms`} as CSSProperties}>{letter}</span>)}</span>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [week, setWeek] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (reduceMotion) {
      nodes.forEach(node => node.dataset.visible = 'true');
      return () => window.removeEventListener('scroll', onScroll);
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.visible = 'true';
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    nodes.forEach(node => observer.observe(node));
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return <>
    <a className="skip" href="#main">К содержанию</a>
    <header className={scrolled ? 'header compact' : 'header'}>
      <a className="logo" href="#" aria-label="Шери — на главную">шери<span>✳</span></a>
      <nav className={menu ? 'nav open' : 'nav'} aria-label="Основная навигация">
        {[['#ecosystem','Экосистема'],['#people','Люди'],['#process','Как работаем'],['#partnership','Партнёрство']].map(([href,label])=><a key={href} href={href} onClick={()=>setMenu(false)}>{label}</a>)}
      </nav>
      <a className="header-cta" href="#contact">Обсудить проект <ArrowUpRight size={16}/></a>
      <button className="menu" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label={menu?'Закрыть меню':'Открыть меню'}>{menu?<X/>:<Menu/>}</button>
    </header>
    <main id="main">
      <section className="hero grid-paper">
        <div className="hero-top"><span className="eyebrow">UGC-АГЕНТСТВО / АКАДЕМИЯ / ЭКОСИСТЕМА</span></div>
        <div className="hero-layout">
          <div className="hero-copy"><h1 className="hero-title"><span>UGC-контент</span><span>для вашего</span><em><AnimatedWord>бренда</AnimatedWord></em></h1>
          <p className="hero-intro">Собираем креаторов, обучаем их под бренд и организуем съёмки. Выпускаем обзоры и бренд-контент на нескольких площадках, проверяем гипотезы и разбираем результаты.</p>
          <div className="actions hero-actions"><a className="button dark" href="#contact">Запустить проект <ArrowUpRight size={19}/></a><a className="text-link" href="#ecosystem">Как устроена Шери <ArrowRight size={18}/></a></div></div>
          <div className="hero-art" aria-label="Креаторы экосистемы Шери"><div className="sphere" aria-hidden="true"><AnimatedSphere/></div><div className="orbit-label">КРЕАТОРЫ ШЕРИ</div><figure className="portrait portrait-a"><img src="/media/image49.webp" alt="Креатор Meylischa"/><figcaption>Meylischa <span>↗</span></figcaption></figure><figure className="portrait portrait-b"><img src="/media/image53.webp" alt="Креатор Кирилл Bimool"/><figcaption>Кирилл Bimool <span>↗</span></figcaption></figure><span className="art-stamp">UGC<br/>агентство <Plus size={24}/></span></div>
        </div>
        <div className="hero-bottom"><span>Работаем с новыми и опытными креаторами</span><a href="#ecosystem">Об агентстве ↓</a></div>
      </section>
      <section className="stats wrap" aria-label="Параметры эксклюзивного партнёрства" data-reveal><div className="stats-note">ПАРАМЕТРЫ<br/>ПРОЕКТА<small>Формат «Эксклюзив»</small></div><div className="stat"><strong><Counter end={30}/></strong><span>новых креаторов</span></div><div className="stat"><strong><Counter end={45}/></strong><span>дней активных упоминаний</span></div><div className="stat"><strong><Counter end={900} prefix="до "/></strong><span>роликов</span></div><div className="stat"><strong><Counter end={1.5} prefix="от " suffix=" млн" fraction={1}/></strong><span>просмотров</span></div></section>
      <section id="ecosystem" className="section wrap"><div className="section-heading" data-reveal><span className="eyebrow">01 / ЭКОСИСТЕМА</span><h2>Организуем<br/><em>UGC-проекты</em></h2><p>Шери работает как внешнее UGC-агентство. Мы отвечаем за работу с креаторами: от подготовки и съёмок до публикаций и аналитики. Во время кампании авторов обучают эксперты и сопровождает куратор.</p></div>
      <div className="services">{[
        ['01','Подключаем креаторов','Привлекаем новых и опытных авторов к работе над проектом бренда.'],
        ['02','Готовим к съёмкам','Знакомим авторов с продуктом и стилем общения бренда. Разбираем референсы и отрабатываем приёмы съёмки.'],
        ['03','Производим контент','Снимаем бренд-контент и обзоры товаров. Тестируем гипотезы: сюжеты, подачу и приёмы монтажа.'],
        ['04','Публикуем и анализируем','Публикуем на нескольких площадках, анализируем результаты и масштабируем лучшие механики.'],
      ].map(([n,h,p],i)=><article key={n} data-reveal style={{'--delay': `${i * 80}ms`} as CSSProperties}><span className="service-number">{n} <Plus size={18}/></span><h3>{h}</h3><p>{p}</p></article>)}</div>
      </section>
      <section id="people" className="people section"><div className="wrap"><div className="section-heading" data-reveal><span className="eyebrow">02 / ЛЮДИ ШЕРИ</span><h2>Знакомьтесь<br/><em>с креаторами</em></h2><p>Танец, спорт, питание, мода и юмор. Вот несколько авторов Шери и темы, с которыми они работают.</p></div><div className="creators">{creators.map(([n,t,img,url],i)=><a className="creator" href={url} key={n} target="_blank" rel="noreferrer" data-reveal style={{'--delay': `${i * 90}ms`} as CSSProperties}><div className="creator-image"><img loading="lazy" src={'/media/'+img} alt={n}/><span><ArrowUpRight size={22}/></span></div><h3>{n}</h3><p>{t}</p></a>)}</div>
      <div className="motivation"><h3>Что мотивирует<br/>креаторов</h3><div><span>01 / ПРОФЕССИЯ</span><p>Оплачивают обучение, чтобы освоить профессию и получить опыт работы с брендом.</p></div><div><span>02 / АЗАРТ</span><p>Участвуют в соревновании за призовые места.</p></div><div><span>03 / ЗАРАБОТОК</span><p>Получают оплату за просмотры по условиям контракта.</p></div></div>
      <div className="experts-head" data-reveal><h2>Эксперты <em>Шери</em></h2><p>Обучают авторов и разбирают их работу во время кампании.</p></div><div className="experts">{experts.map(([n,t,img],i)=><article key={n} data-reveal style={{'--delay': `${i * 100}ms`} as CSSProperties}><img loading="lazy" src={'/media/'+img} alt={n}/><div><span className="eyebrow">ЭКСПЕРТ ШЕРИ</span><h3>{n}</h3><p>{t}</p></div></article>)}</div></div></section>
      <section id="process" className="section wrap"><div className="section-heading" data-reveal><span className="eyebrow">03 / ЭТАПЫ ПРОЕКТА</span><h2>Программа<br/><em>на четыре недели</em></h2><p>Креаторы учатся на задачах вашего бренда: снимают ролики, получают обратную связь и дорабатывают их.</p></div><div className="timeline" data-reveal><div className="week-tabs" role="tablist" aria-label="Недели проекта">{weeks.map(([h],i)=><button role="tab" aria-selected={week===i} aria-controls={'week-panel'} id={'week-'+i} tabIndex={week===i?0:-1} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const next=(i+(e.key==='ArrowRight'?1:3))%4;setWeek(next);document.getElementById('week-'+next)?.focus()}}} onClick={()=>setWeek(i)} key={h}><span>НЕДЕЛЯ 0{i+1}</span><strong>{h}</strong><ArrowUpRight size={20}/></button>)}</div><div className="week-panel" id="week-panel" role="tabpanel" aria-labelledby={'week-'+week}><span className="week-big" key={week}>0{week+1}</span><div key={`copy-${week}`} className="week-copy"><h3>{weeks[week][0]}</h3><p>{weeks[week][1]}</p><span className="week-foot">КРЕАТОРЫ + ЭКСПЕРТЫ + КУРАТОР</span></div></div></div><p className="footnote">Четыре недели — программа работы с креаторами. Период активных упоминаний в форматах партнёрства — 45 дней.</p></section>
      <section id="references" className="references section"><div className="wrap reference-layout" data-reveal><div><span className="eyebrow">04 / ПРИМЕРЫ И РЕФЕРЕНСЫ</span><h2>Как можно<br/><em>показать продукт</em></h2><p>Вкус LAB: автор показывает продукт как перекус на каждый день. Такой сюжет можно повторять и развивать в серию роликов.</p><div className="reference-tags"><span>Обзор продукта</span><span>Личный опыт</span><span>Серийный формат</span></div><p className="footnote">Примеры и рекомендации из презентации Шери. Иллюстрируют подход к контенту; не представлены как результаты клиентской кампании.</p></div><div className="reference-images"><figure><img loading="lazy" src="/media/image64.webp" alt="Референс подачи продукта: перекус на тарелке"/><figcaption>01 / ПРОДУКТ В КАДРЕ</figcaption></figure><figure><img loading="lazy" src="/media/image65.webp" alt="Примеры обзоров продукта креаторами"/><figcaption>02 / ЛИЧНЫЙ ОПЫТ</figcaption></figure></div></div></section>
      <section id="partnership" className="section wrap"><div className="section-heading" data-reveal><span className="eyebrow">05 / ПАРТНЁРСТВО</span><h2>Форматы<br/><em>партнёрства</em></h2><p>В эксклюзивном формате все авторы работают с вашим брендом. В двух других форматах проект делится между партнёрами.</p></div><div className="plans">{plans.map((p,i)=><article className={'plan '+(i===0?'featured':'')} key={p.name} data-reveal style={{'--delay': `${i * 100}ms`} as CSSProperties}><span className="eyebrow">{p.tag}</span><h3>{p.name}</h3><p>{p.text}</p><div className="price">{p.price}<span> ₽</span></div><span className="price-caption">за проект</span><ul>{['45 дней активных упоминаний',p.videos,p.views].map(t=><li key={t}><Check size={17}/>{t}</li>)}</ul><a className={'button '+(i===0?'lime':'outline')} target="_blank" rel="noreferrer" href={telegram+'?text='+encodeURIComponent('Здравствуйте! Интересует партнёрство с Шери: '+p.name+'.')}>{p.label}<ArrowUpRight size={18}/></a></article>)}</div></section>
      <section className="faq section wrap"><div><span className="eyebrow">06 / ВОПРОСЫ</span><h2>Остались<br/><em>вопросы?</em></h2></div><Accordion type="single" collapsible>{[
        ['Как бренд работает с Шери?', 'Вы работаете с Шери как с внешним агентством. Мы организуем работу креаторов, их обучение, съёмки и публикации, ведём аналитику.'],
        ['С какими креаторами вы работаете?', 'С новыми и опытными авторами. Во время проекта их обучают эксперты и сопровождает куратор.'],
        ['Как связаны 4 недели и 45 дней?', 'Программа работы с креаторами рассчитана на четыре недели. В форматах партнёрства указаны 45 дней активных упоминаний.'],
        ['Где будет выходить контент?', 'Публикуем ролики на нескольких площадках.'],
        ['С чего начать?', 'Расскажите, какой продукт хотите продвигать и какую задачу решить. Обсудим подходящий формат партнёрства.'],
      ].map(([q,a],i)=><AccordionItem value={'q'+i} key={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}</Accordion></section>
      <section id="contact" className="contact grid-paper"><div className="wrap"><span className="eyebrow">СВЯЗАТЬСЯ С ШЕРИ</span><h2>Обсудим<br/><em>ваш проект?</em></h2><div className="contact-row"><p>Напишите нам о продукте,<br/>для которого нужен контент.</p><a className="button dark" href={telegram} target="_blank" rel="noreferrer">Написать в Telegram <ArrowUpRight size={20}/></a><a className="text-link" href="mailto:st@bigbagfilms.ru">st@bigbagfilms.ru <ArrowUpRight size={17}/></a></div></div></section>
    </main>
    <footer className="wrap footer"><a className="logo" href="#">шери<span>✳</span></a><span>UGC-агентство · Академия · Экосистема</span><a href="tel:+79676393759">+7 967 639-37-59</a><span>© Шери, {new Date().getFullYear()}</span></footer>
  </>;
}
