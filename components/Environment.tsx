'use client';

import { useEffect, useRef, useState } from 'react';
const slides = [
  {image:'01-reception.png',title:'接待休息区',description:'暖光、沙发与宠物休息窝，让等待也自在。',alt:'高端宠物洗护店接待休息区'},
  {image:'02-bathing.png',title:'专业洗浴区',description:'独立洗浴空间，整洁有序，温柔清洁。',alt:'高端宠物洗护店专业洗浴区'},
  {image:'03-grooming.png',title:'美容护理区',description:'明亮开阔，细心打理每一处蓬松与可爱。',alt:'高端宠物洗护店美容护理区'}
];
export default function Environment() {
  const [index,setIndex] = useState(0);
  const [paused,setPaused] = useState(false);
  const [hovering,setHovering] = useState(false);
  const [focused,setFocused] = useState(false);
  const [visible,setVisible] = useState(false);
  const [revision,setRevision] = useState(0);
  const start = useRef<{x:number;y:number}|null>(null);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setPaused(motion.matches);
    const updateVisibility = () => setVisible(!document.hidden);
    updateMotion();updateVisibility();
    motion.addEventListener('change',updateMotion);
    document.addEventListener('visibilitychange',updateVisibility);
    return () => {motion.removeEventListener('change',updateMotion);document.removeEventListener('visibilitychange',updateVisibility);};
  },[]);
  useEffect(() => {
    if (paused || hovering || focused || !visible) return;
    const timer = window.setInterval(() => setIndex(value => (value+1)%slides.length),5000);
    return () => window.clearInterval(timer);
  },[paused,hovering,focused,visible,revision]);
  function select(next:number) {setIndex((next+slides.length)%slides.length);setRevision(value => value+1);}
  return <section className="section environment" id="environment" aria-labelledby="environment-title" aria-roledescription="轮播"
    onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
    onFocus={() => setFocused(true)} onBlur={event => {if(!event.currentTarget.contains(event.relatedTarget)) setFocused(false);}}
    onKeyDown={event => {if(event.key === 'ArrowLeft' || event.key === 'ArrowRight'){event.preventDefault();select(index+(event.key === 'ArrowRight'?1:-1));}}}>
    <div className="section-top"><div><span className="kicker">OUR SPACE</span><h2 id="environment-title">每一处，都为舒适而准备</h2></div><p>从进门休息，到洗护造型，给毛孩子自在的空间。</p></div>
    <div className="salon-carousel" aria-live={paused || hovering || focused?'polite':'off'} aria-atomic="true"
      onTouchStart={event => {start.current={x:event.touches[0].clientX,y:event.touches[0].clientY};}}
      onTouchEnd={event => {if(!start.current)return;const dx=event.changedTouches[0].clientX-start.current.x,dy=event.changedTouches[0].clientY-start.current.y;if(Math.abs(dx)>50 && Math.abs(dx)>Math.abs(dy))select(index+(dx<0?1:-1));start.current=null;}}
      onTouchCancel={() => {start.current=null;}}>
      {slides.map((slide,i) => <figure className="salon-slide" key={slide.image} role="group" aria-label={`第 ${i+1} 张，共 ${slides.length} 张`} hidden={i!==index}><img src={`/images/${slide.image}`} alt={slide.alt} width={1672} height={941} loading="lazy" /><figcaption><h3>{slide.title}</h3><p>{slide.description}</p></figcaption></figure>)}
    </div><div className="salon-controls"><div className="salon-arrows"><button className="round" onClick={() => select(index-1)} aria-label="上一张环境图">←</button><button className="round" onClick={() => select(index+1)} aria-label="下一张环境图">→</button></div>
      <div className="salon-dots" aria-label="选择环境图片">{slides.map((slide,i) => <button className="salon-dot" key={slide.image} aria-label={`查看${slide.title}`} aria-current={i===index} onClick={() => select(i)} />)}</div>
      <button className="salon-play" onClick={() => setPaused(value => !value)}>{paused?'播放轮播':'暂停轮播'}</button>
    </div><p className="environment-note">空间效果示意 · AI 生成</p>
  </section>;
}
