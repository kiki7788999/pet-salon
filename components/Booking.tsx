'use client';

import { createContext, useContext, useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
type Service = '基础洗护' | '精致造型' | '深层护理';
const BookingContext = createContext<((service: Service) => void) | null>(null);
function localDate() {
  const now = new Date();
  return [now.getFullYear(), String(now.getMonth()+1).padStart(2,'0'), String(now.getDate()).padStart(2,'0')].join('-');
}
export function BookingButton({service, children, ...props}: ButtonHTMLAttributes<HTMLButtonElement> & {service: Service}) {
  const open = useContext(BookingContext);
  return <button {...props} type="button" onClick={() => open?.(service)}>{children}</button>;
}
export function BookingProvider({children}: {children: ReactNode}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [isOpen,setOpen] = useState(false);
  const [service,setService] = useState<Service>('基础洗护');
  const [minimum,setMinimum] = useState('');
  const [result,setResult] = useState('');
  useEffect(() => {
    if (!isOpen) return;
    const element = dialog.current;
    const wasLocked = document.body.classList.contains('modal-open');
    element?.showModal();
    document.body.classList.add('modal-open');
    return () => {
      if (element?.open) element.close();
      if (!wasLocked) document.body.classList.remove('modal-open');
    };
  },[isOpen]);
  function open(value: Service) { setService(value);setResult('');setMinimum(localDate());setOpen(true); }
  return <BookingContext.Provider value={open}>{children}
    <dialog ref={dialog} id="booking" aria-labelledby="dialog-title" onClose={() => setOpen(false)} onClick={event => {
      if (event.target !== event.currentTarget) return;
      const box = event.currentTarget.getBoundingClientRect();
      if(event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) event.currentTarget.close();
    }}>
      <button className="close" aria-label="关闭预约窗口" onClick={() => dialog.current?.close()}>×</button>
      <span className="kicker">A SPA DAY FOR YOUR PET</span><h2 id="dialog-title">约一场香香的见面</h2>
      <form id="booking-form" hidden={!!result} onSubmit={event => {
        event.preventDefault();
        const form = event.currentTarget;
        const petInput = form.elements.namedItem('pet') as HTMLInputElement;
        const dateInput = form.elements.namedItem('date') as HTMLInputElement;
        const pet = petInput.value;
        const date = dateInput.value;
        if (!pet.trim()) {petInput.setCustomValidity('请输入宠物昵称');petInput.reportValidity();return;}
        if (date < localDate()) {dateInput.setCustomValidity('请选择今天或之后的日期');dateInput.reportValidity();return;}
        setResult(`已生成预约意向：${pet.trim()}，${date}，${service}。此意向仅在当前页面展示，尚未发送至门店，也未确认预约。`);
      }}><div className="form-grid">
        <label>宠物昵称<input name="pet" placeholder="小可爱叫什么名字？" required maxLength={30} onInput={event => event.currentTarget.setCustomValidity('')} /></label>
        <label>选择服务<select name="service" value={service} onChange={event => setService(event.target.value as Service)}><option value="基础洗护">香香基础洗护 · ¥89 起</option><option value="精致造型">元气精致造型 · ¥169 起</option><option value="深层护理">柔柔深层护理 · ¥229 起</option></select></label>
        <label>期望到店日期<input type="date" name="date" required min={minimum} onInput={event => event.currentTarget.setCustomValidity('')} /></label>
        <button className="btn" type="submit">生成预约意向单 ↗</button>
      </div><p className="form-note">这是预约演示，不会发送信息或占用门店时段。正式预约需接入门店联系方式。</p></form>
      <div id="result" hidden={!result} aria-live="polite">{result}</div>
    </dialog>
  </BookingContext.Provider>;
}
