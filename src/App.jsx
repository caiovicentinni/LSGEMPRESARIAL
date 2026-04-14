import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ArrowUpRight, CheckCircle, Send, ChevronDown, ChevronUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ── NOISE OVERLAY (GEMINI.MD: opacity 0.05) ───────────────────────────────
const NoiseOverlay = () => (
  <svg className="fixed inset-0 pointer-events-none z-[9999] w-full h-full" style={{ opacity: 0.05 }} aria-hidden="true">
    <filter id="lsg-noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#lsg-noise)" />
  </svg>
);

// ── LOGO SVG ──────────────────────────────────────────────────────────────
const LSGLogo = ({ height = 36 }) => (
  <svg height={height} viewBox="0 0 220 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="LSG Empresarial">
    <polyline points="4,38 4,10 28,10" stroke="#00D4AA" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />
    <polyline points="8,36 16,22 22,28 32,12" stroke="#00D4AA" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
    <polygon points="32,12 38,12 38,18" fill="#00D4AA" />
    <line x1="50" y1="6" x2="50" y2="42" stroke="rgba(0,212,170,0.2)" strokeWidth="1" />
    <text x="60" y="36" fontFamily="'Inter',sans-serif" fontWeight="900" fontSize="28" letterSpacing="-1" fill="#EEEAE3">LSG</text>
    <text x="61" y="46" fontFamily="'JetBrains Mono',monospace" fontWeight="400" fontSize="7" letterSpacing="3.5" fill="#00D4AA" opacity="0.75">EMPRESARIAL</text>
  </svg>
);

// ── TICKER ────────────────────────────────────────────────────────────────
const tickerItems = ['BPO Financeiro', '///', 'Gestão de Tesouraria', '///', 'Conciliação Bancária', '///', 'DRE e Fluxo de Caixa', '///', 'Emissão de NFs', '///', 'Departamento Pessoal', '///', 'Sem CLT', '///', 'Decisões com Dados', '///'];
const Ticker = () => (
  <div className="w-full overflow-hidden border-y border-ivory/[0.06] py-3 bg-deep/60">
    <div className="marquee-track">
      {[...tickerItems, ...tickerItems].map((t, i) => (
        <span key={i} className={`px-5 text-[0.58rem] uppercase tracking-[0.18em] whitespace-nowrap font-mono ${t === '///' ? 'text-teal/35' : 'text-ivory/30'}`}>{t}</span>
      ))}
    </div>
  </div>
);

// ── NAVBAR — Pill floating (GEMINI.MD spec) ───────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = [['Serviços', '#servicos'], ['Processo', '#processo'], ['FAQ', '#faq'], ['Contato', '#contato']];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <div className={`hidden md:flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full transition-all duration-500 ${scrolled ? 'bg-abyss/85 backdrop-blur-xl border border-ivory/[0.07] shadow-2xl' : ''}`}>
        <a href="#"><LSGLogo height={28} /></a>
        <div className="flex items-center gap-8">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-ivory/55 hover:text-teal transition-colors">{l}</a>
          ))}
        </div>
        <a href="#contato" className="btn-magnetic rounded-full px-5 py-2.5 text-[0.65rem]">
          <span className="btn-bg rounded-full" />
          <span className="relative z-10 flex items-center gap-1.5">Diagnóstico Grátis <ArrowUpRight size={12} /></span>
        </a>
      </div>
      {/* mobile */}
      <div className={`md:hidden flex w-full items-center justify-between px-4 py-3 rounded-full transition-all duration-500 ${scrolled ? 'bg-abyss/90 backdrop-blur-xl border border-ivory/[0.07]' : ''}`}>
        <a href="#"><LSGLogo height={24} /></a>
        <button onClick={() => setOpen(!open)} className="p-2 flex flex-col gap-1.5 items-center">
          <span className={`w-5 h-px bg-ivory transition-all ${open ? 'rotate-45 translate-y-[5px]' : ''}`} />
          <span className={`w-5 h-px bg-ivory transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-px bg-ivory transition-all ${open ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </div>
      {open && (
        <div className="md:hidden absolute top-20 left-4 right-4 bg-deep/95 backdrop-blur-xl rounded-[2rem] border border-ivory/10 p-8 flex flex-col gap-5 shadow-2xl">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="font-mono text-xs uppercase tracking-widest text-ivory/60 hover:text-teal transition-colors">{l}</a>
          ))}
          <a href="#contato" onClick={() => setOpen(false)} className="btn-magnetic rounded-full px-6 py-3 text-[0.65rem] text-center mt-2">
            <span className="btn-bg rounded-full" />
            <span className="relative z-10">Diagnóstico Grátis</span>
          </a>
        </div>
      )}
    </nav>
  );
};

// ── HERO ──────────────────────────────────────────────────────────────────
const Hero = () => {
  const ref = useRef(null);
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.3 })
        .from('.h-badge', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' })
        .from('.h-l1', { y: 80, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
        .from('.h-l2', { y: 60, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.7')
        .from('.h-l3', { y: 80, opacity: 0, duration: 1.1, ease: 'power3.out' }, '-=0.7')
        .from('.h-sub', { y: 25, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .from('.h-cta', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .from('.h-stat', { y: 16, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' }, '-=0.3');
      gsap.to('.hero-bg', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img className="hero-bg w-full h-[115%] object-cover opacity-20"
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop"
          alt="Financial precision" />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/75 to-abyss/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-abyss/60 to-transparent" />
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,212,170,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,170,0.02) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 flex flex-col justify-end flex-1 pb-16 md:pb-24 pt-28 px-5 md:px-12 max-w-screen-xl mx-auto w-full">
        <div className="h-badge mb-8 flex items-center gap-3">
          <div className="flex items-center gap-2 border border-teal/30 bg-teal/[0.06] px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-teal">BPO Financeiro Premium</span>
          </div>
        </div>

        {/* GEMINI.MD Preset B hero pattern: "[Substantivo] encontra a" / "[Precisão]." */}
        <div className="overflow-hidden"><div className="h-l1 font-sans font-black uppercase tracking-tighter text-ivory" style={{ fontSize: 'clamp(2.5rem,7.5vw,9rem)', lineHeight: '0.92' }}>SEU FINANCEIRO</div></div>
        <div className="overflow-hidden my-1 md:my-2"><div className="h-l2 font-sans font-light uppercase tracking-[0.05em] text-ivory/40" style={{ fontSize: 'clamp(1rem,2.2vw,2.5rem)' }}>encontra a</div></div>
        <div className="overflow-hidden mb-8 md:mb-10"><div className="h-l3 font-display italic text-teal" style={{ fontSize: 'clamp(3rem,9.5vw,12rem)', lineHeight: '0.9' }}>Clareza.</div></div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-12 md:items-end">
          <p className="h-sub text-ivory/60 text-sm md:text-base font-light leading-relaxed max-w-sm border-l-2 border-teal/30 pl-4">
            Terceirize seu departamento financeiro completo — sem CLT, sem encargos, sem incêndio todo fim de mês.
          </p>
          <div className="h-cta flex flex-col sm:flex-row gap-3">
            <a href="#contato" className="btn-magnetic rounded-full px-7 py-4 text-[0.7rem]">
              <span className="btn-bg rounded-full" />
              <span className="relative z-10 flex items-center gap-2">Solicitar Diagnóstico <ArrowRight size={14} /></span>
            </a>
            <a href="#processo" className="btn-ghost rounded-full px-7 py-4 text-[0.7rem]">Como Funciona</a>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-ivory/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{ n: '100%', l: 'Documentação pronta pro contador' }, { n: 'Zero', l: 'Encargos trabalhistas extras' }, { n: '+4', l: 'Módulos inclusos' }, { n: 'Bônus', l: 'Depto. Pessoal incluso' }].map((s, i) => (
            <div key={i} className="h-stat">
              <div className="font-mono font-bold text-xl md:text-2xl text-teal">{s.n}</div>
              <div className="font-mono text-[0.52rem] uppercase tracking-[0.15em] text-ivory/40 mt-1 leading-tight">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── BEFORE / AFTER ────────────────────────────────────────────────────────
const BeforeAfter = () => {
  const ref = useRef(null);
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ba-hd', { scrollTrigger: { trigger: ref.current, start: 'top 82%' }, y: 35, opacity: 0, duration: 0.9, ease: 'power3.out' });
      gsap.from('.ba-col', { scrollTrigger: { trigger: ref.current, start: 'top 72%' }, y: 40, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out' });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const before = ['Boletos e NFs atrasados todo mês', 'Planilha bagunçada e desatualizada', 'Não sabe para onde o dinheiro vai', 'Funcionário CLT caro e inexperiente', 'Apagando incêndio toda semana', 'Inadimplência sem cobrança ativa'];
  const after = ['NFs e boletos emitidos no prazo', 'DRE e Fluxo de Caixa atualizados', 'Clareza total sobre cada centavo', 'Analista dedicado sem encargo', 'Decisões com dados confiáveis', 'Régua de cobrança automatizada'];

  return (
    <section ref={ref} className="py-20 md:py-36 px-5 md:px-10 max-w-screen-xl mx-auto">
      <div className="ba-hd mb-12">
        <span className="section-label">A Transformação</span>
        <h2 className="font-sans font-black uppercase tracking-tighter text-ivory leading-[0.92]" style={{ fontSize: 'clamp(1.8rem,4.5vw,5rem)' }}>
          DO CAOS À <span className="font-display italic font-normal text-teal tracking-normal" style={{ lineHeight: '1.1' }}>Clareza Total.</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="ba-col bg-deep rounded-[2rem] p-8 border border-red-500/10">
          <div className="flex items-center gap-2 mb-6"><div className="w-2 h-2 rounded-full bg-red-500/60" /><span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-red-400/60">Sem a LSG</span></div>
          <ul className="flex flex-col gap-4">{before.map((b, i) => (<li key={i} className="flex items-start gap-3"><span className="text-red-500/50 mt-0.5 flex-shrink-0 text-xs">✕</span><span className="font-sans text-sm text-ivory/55 leading-snug">{b}</span></li>))}</ul>
        </div>
        <div className="ba-col bg-deep rounded-[2rem] p-8 border border-teal/15">
          <div className="flex items-center gap-2 mb-6"><div className="w-2 h-2 rounded-full bg-teal animate-pulse" /><span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-teal">Com a LSG</span></div>
          <ul className="flex flex-col gap-4">{after.map((a, i) => (<li key={i} className="flex items-start gap-3"><CheckCircle size={14} className="text-teal flex-shrink-0 mt-0.5" /><span className="font-sans text-sm text-ivory/80 leading-snug">{a}</span></li>))}</ul>
        </div>
      </div>
      <div className="mt-4 bg-teal/[0.06] border border-teal/20 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-teal animate-pulse" /><span className="font-mono text-xs text-teal uppercase tracking-[0.15em]">Risco ZERO</span></div>
        <p className="font-sans text-sm text-ivory/65 text-center">Primeiro pagamento somente após <strong className="text-ivory">30 dias de operação.</strong></p>
        <a href="#contato" className="btn-magnetic rounded-full px-5 py-2.5 text-[0.65rem] flex-shrink-0"><span className="btn-bg rounded-full" /><span className="relative z-10 flex items-center gap-1.5">Começar Agora <ArrowRight size={12} /></span></a>
      </div>
    </section>
  );
};

// ── FEATURE CARDS ─────────────────────────────────────────────────────────
const DiagnosticShuffler = () => {
  const items = [
    { label: 'CLT Eliminado', sub: 'Sem vínculo empregatício', icon: '◈' },
    { label: 'Encargos Zerados', sub: 'Sem FGTS, INSS, 13º, férias', icon: '◉' },
    { label: 'Time Especializado', sub: 'Analistas financeiros dedicados', icon: '◇' },
  ];
  const [stack, setStack] = useState(items);
  useEffect(() => {
    const id = setInterval(() => setStack(p => { const n = [...p]; n.unshift(n.pop()); return n; }), 2800);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative h-[150px] select-none">
      {stack.map((item, i) => (
        <div key={item.label} className="absolute inset-x-0 h-[110px] bg-abyss border border-ivory/[0.07] rounded-[1.5rem] px-5 py-4 flex items-center gap-3"
          style={{ top: i * 14, zIndex: stack.length - i, transform: `scale(${1 - i * 0.04})`, opacity: i === 0 ? 1 : i === 1 ? 0.6 : 0.3, transition: 'all 0.6s cubic-bezier(0.34,1.56,0.64,1)', boxShadow: i === 0 ? '0 20px 40px rgba(0,0,0,0.4)' : 'none' }}>
          <div className="w-9 h-9 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0 text-teal">{item.icon}</div>
          <div><div className="font-sans font-semibold text-sm text-ivory">{item.label}</div><div className="font-mono text-[0.55rem] text-ivory/35 mt-0.5">{item.sub}</div></div>
          {i === 0 && <CheckCircle size={13} className="text-teal ml-auto flex-shrink-0" />}
        </div>
      ))}
    </div>
  );
};

const TypewriterFeed = () => {
  const messages = ['DRE_UPDATE: Receita R$87.420,00 ✓', 'CONCILIAÇÃO: 312 lançamentos OK ✓', 'INADIMPLÊNCIA: 2 clientes notificados ✓', 'FLUXO_CAIXA: Saldo R$14.800 positivo ✓', 'NF_EMITIDA: #4021 — R$3.200,00 ✓'];
  const [lines, setLines] = useState([]);
  const [cur, setCur] = useState('');
  const [mi, setMi] = useState(0);
  const [ci, setCi] = useState(0);
  useEffect(() => {
    const msg = messages[mi % messages.length];
    if (ci < msg.length) {
      const t = setTimeout(() => { setCur(p => p + msg[ci]); setCi(c => c + 1); }, 40);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setLines(p => [...p.slice(-3), cur]); setCur(''); setCi(0); setMi(m => m + 1); }, 900);
    return () => clearTimeout(t);
  }, [ci, mi]);
  return (
    <div className="h-[140px] font-mono text-[0.58rem] leading-loose overflow-hidden">
      <div className="flex items-center gap-2 text-[0.52rem] text-ivory/25 uppercase tracking-widest mb-3"><span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />Live Feed</div>
      {lines.map((l, i) => <div key={i} className="text-ivory/30 truncate">&gt; {l}</div>)}
      <div className="text-teal">&gt; {cur}<span className="tw-cursor" /></div>
    </div>
  );
};

const SchedulerCard = () => {
  const [activeDay, setActiveDay] = useState(null);
  const [cursor, setCursor] = useState(null);
  useEffect(() => {
    const seq = () => {
      setCursor(2);
      setTimeout(() => setActiveDay(2), 700);
      setTimeout(() => setActiveDay(null), 2200);
      setTimeout(() => setCursor(4), 2500);
      setTimeout(() => setActiveDay(4), 3200);
      setTimeout(() => { setActiveDay(null); setCursor(null); }, 5000);
    };
    seq();
    const id = setInterval(seq, 6000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="h-[140px] flex flex-col gap-3">
      <div className="flex items-center gap-2 text-[0.52rem] text-ivory/25 uppercase tracking-widest font-mono mb-1"><span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />Agenda Delegada</div>
      <div className="grid grid-cols-7 gap-1">
        {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="font-mono text-[0.48rem] uppercase text-ivory/25">{d}</div>
            <div className="w-full h-8 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{ background: activeDay === i ? 'rgba(0,212,170,0.15)' : 'rgba(238,234,227,0.04)', border: activeDay === i ? '1px solid rgba(0,212,170,0.4)' : '1px solid rgba(238,234,227,0.05)', transform: cursor === i ? 'scale(0.9)' : 'scale(1)', boxShadow: cursor === i ? '0 0 0 2px rgba(0,212,170,0.3)' : 'none' }}>
              {activeDay === i && <CheckCircle size={11} className="text-teal" />}
            </div>
          </div>
        ))}
      </div>
      <div className="font-mono text-[0.52rem] text-ivory/20">Delegando operações financeiras...</div>
    </div>
  );
};

const Features = () => {
  const ref = useRef(null);
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feat-hd', { scrollTrigger: { trigger: ref.current, start: 'top 82%' }, y: 35, opacity: 0, duration: 0.9, ease: 'power3.out' });
      gsap.from('.feat-card', { scrollTrigger: { trigger: ref.current, start: 'top 72%' }, y: 40, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out' });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const cards = [
    { id: '01', title: 'Redução de Custos', desc: 'Expertise financeira especializada sem encargos trabalhistas — sem CLT, FGTS, INSS, 13º ou férias.', ui: <DiagnosticShuffler /> },
    { id: '02', title: 'Tomada de Decisão', desc: 'DRE e Fluxo de Caixa precisos entregues mensalmente. Dados reais, zero achismo.', ui: <TypewriterFeed /> },
    { id: '03', title: 'Foco no Core Business', desc: 'Você vende e cresce. A LSG cuida de cada operação financeira do seu dia a dia.', ui: <SchedulerCard /> },
  ];

  return (
    <section id="servicos" ref={ref} className="py-20 md:py-36 px-5 md:px-10 max-w-screen-xl mx-auto">
      <div className="feat-hd mb-12 md:mb-20">
        <span className="section-label">Funcionalidades</span>
        <h2 className="font-sans font-black uppercase tracking-tighter text-ivory leading-[0.92]" style={{ fontSize: 'clamp(2rem,5vw,5.5rem)' }}>
          ACELERAÇÃO COM <br /><span className="font-display italic font-normal text-teal tracking-normal" style={{ lineHeight: '1.1' }}>Segurança.</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        {cards.map(c => (
          <div key={c.id} className="feat-card bg-deep border border-ivory/[0.07] rounded-[2rem] p-7 flex flex-col gap-5 hover:border-teal/25 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.55rem] text-ivory/20 tracking-widest">{c.id}</span>
              <div className="w-5 h-px bg-teal/30" />
            </div>
            <div className="flex-1">{c.ui}</div>
            <div className="border-t border-ivory/[0.05] pt-5">
              <h3 className="font-sans font-bold text-base text-ivory mb-1.5">{c.title}</h3>
              <p className="font-sans font-light text-sm text-ivory/55 leading-relaxed">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 rounded-[2rem] overflow-hidden border border-ivory/[0.05]">
        {[['⬡', 'Gestão de Tesouraria', 'Contas a pagar e receber'], ['⬢', 'Conciliação Bancária', 'Conferência diária'], ['⬣', 'Emissão de Documentos', 'NFs e boletos'], ['⬤', 'Relatórios Financeiros', 'DRE e Fluxo de Caixa']].map(([ic, lb, sb]) => (
          <div key={lb} className="bg-deep p-6 flex flex-col gap-2 hover:bg-abyss/60 transition-colors border-r border-b border-ivory/[0.04] last:border-r-0">
            <span className="text-teal text-xl">{ic}</span>
            <div className="font-sans font-semibold text-sm text-ivory mt-1">{lb}</div>
            <div className="font-mono text-[0.52rem] text-ivory/35 uppercase tracking-wider">{sb}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ── PHILOSOPHY ────────────────────────────────────────────────────────────
const Philosophy = () => {
  const ref = useRef(null);
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-a', { scrollTrigger: { trigger: ref.current, start: 'top 78%' }, y: 35, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.phil-w', { scrollTrigger: { trigger: ref.current, start: 'top 62%' }, y: 50, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out' });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full bg-deep overflow-hidden py-24 md:py-44">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop" alt="Texture" className="w-full h-full object-cover opacity-[0.04]" />
      </div>
      <div className="relative z-10 px-5 md:px-12 max-w-screen-xl mx-auto">
        <span className="section-label">Manifesto</span>
        <div className="phil-a mb-14 md:mb-20">
          <p className="font-sans text-lg md:text-2xl text-ivory/25 max-w-xl leading-relaxed font-light">A maioria dos gestores foca em registrar o que já aconteceu.</p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 md:gap-x-7">
          {['Nós', 'focamos', 'na', 'Clareza', 'que', 'transforma.'].map((w, i) => (
            <div key={i} className="overflow-hidden">
              <span className={`phil-w block font-black uppercase tracking-tighter ${w === 'Clareza' ? 'font-display italic normal-case text-teal font-normal tracking-normal' : 'font-sans text-ivory'}`}
                style={{ fontSize: 'clamp(2rem,6vw,7.5rem)', lineHeight: '0.9' }}>{w}</span>
            </div>
          ))}
        </div>
        <div className="mt-16 h-px w-1/3 bg-gradient-to-r from-teal to-transparent" />
      </div>
    </section>
  );
};

// ── PROTOCOL — Sticky Stacking (GEMINI.MD spec) ───────────────────────────
const Protocol = () => {
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);
  const steps = [
    {
      num: '01', title: 'DIAGNÓSTICO', desc: 'Mapeamos sua gestão financeira atual, entendemos seus desafios e desenhamos a solução ideal — sem compromisso.',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full opacity-40">
          {[70, 55, 40, 25].map((r, i) => (
            <circle key={i} cx="100" cy="100" r={r} fill="none" stroke="#00D4AA" strokeWidth="1"
              style={{ animation: `spin ${10 + i * 6}s linear infinite ${i % 2 ? 'reverse' : ''}`, transformOrigin: '100px 100px' }} />
          ))}
          <circle cx="100" cy="100" r="5" fill="#00D4AA" className="animate-pulse" />
        </svg>
      ),
    },
    {
      num: '02', title: 'SETUP', desc: 'Implementamos os processos, organizamos os dados e integramos com o sistema do seu contador — sem interrupção.',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full opacity-40">
          {Array.from({ length: 6 }).map((_, r) => Array.from({ length: 8 }).map((__, c) => (
            <circle key={`${r}-${c}`} cx={20 + c * 24} cy={30 + r * 28} r="2.5" fill="#00D4AA" opacity="0.5" />
          )))}
          <rect x="0" y="0" width="200" height="4" fill="url(#laser)" style={{ animation: 'scanLaser 2s linear infinite' }}>
            <animateTransform attributeName="transform" type="translate" values="0,0;0,196" dur="2s" repeatCount="indefinite" />
          </rect>
          <defs>
            <linearGradient id="laser" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#00D4AA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      num: '03', title: 'OPERAÇÃO', desc: 'Executamos o operacional diário, entregamos relatórios gerenciais e evoluímos junto com o seu negócio.',
      svg: (
        <svg viewBox="0 0 200 80" className="w-full h-16 opacity-40">
          <path d="M0,40 L25,40 L35,10 L45,70 L55,30 L65,50 L75,40 L85,20 L95,60 L105,40 L130,40 L200,40"
            fill="none" stroke="#00D4AA" strokeWidth="2" strokeLinecap="round"
            style={{ strokeDasharray: 300, animation: 'ekgDraw 2s ease-in-out infinite' }} />
          <defs>
            <style>{`@keyframes ekgDraw { 0%{stroke-dashoffset:300} 100%{stroke-dashoffset:0} }`}</style>
          </defs>
        </svg>
      ),
    },
  ];

  return (
    <section id="processo" ref={containerRef} className="py-20 md:py-36 px-5 md:px-10 max-w-screen-xl mx-auto">
      <div className="mb-12 md:mb-20">
        <span className="section-label">Protocolo</span>
        <h2 className="font-sans font-black uppercase tracking-tighter text-ivory leading-[0.92]" style={{ fontSize: 'clamp(2rem,5vw,5.5rem)' }}>
          DE ZERO A <br /><span className="font-display italic font-normal text-teal tracking-normal" style={{ lineHeight: '1.1' }}>Operação Plena.</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7 flex flex-col gap-4">
          {steps.map((s, i) => (
            <div key={i} className={`bg-deep border rounded-[2rem] p-7 cursor-pointer transition-all duration-300 ${active === i ? 'border-teal/30' : 'border-ivory/[0.06] opacity-60'}`} onClick={() => setActive(i)}>
              <div className="flex items-start gap-5">
                <div className="font-mono font-bold text-2xl text-teal/20 flex-shrink-0">{s.num}</div>
                <div className="flex-1">
                  <h3 className="font-sans font-bold text-sm uppercase tracking-wide text-ivory mb-1.5">{s.title}</h3>
                  <p className="font-sans font-light text-sm text-ivory/55 leading-relaxed">{s.desc}</p>
                </div>
                <CheckCircle size={14} className={`flex-shrink-0 mt-1 transition-colors ${active === i ? 'text-teal' : 'text-ivory/10'}`} />
              </div>
            </div>
          ))}
        </div>
        <div className="md:col-span-5">
          <div className="bg-deep border border-teal/15 rounded-[2rem] p-8 sticky top-28 flex flex-col gap-6">
            <div className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-ivory/25">{steps[active].num} / {steps[active].title}</div>
            <div className="h-48 flex items-center justify-center">{steps[active].svg}</div>
            <a href="#contato" className="btn-magnetic rounded-full px-5 py-3 w-full flex items-center justify-center gap-2 text-[0.65rem]">
              <span className="btn-bg rounded-full" /><span className="relative z-10 flex items-center gap-2">Agendar Diagnóstico <ArrowRight size={13} /></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── FAQ ───────────────────────────────────────────────────────────────────
const FAQ = () => {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: 'O que é BPO Financeiro?', a: 'É a terceirização do departamento financeiro. Em vez de contratar um CLT, você contrata a LSG — que executa todas as rotinas com mais especialização, menos custo e zero dor de cabeça.' },
    { q: 'Preciso mudar meu contador?', a: 'Não. A LSG organiza tudo e entrega a documentação 100% pronta para o seu contador. Ele só exporta e gera as guias.' },
    { q: 'Como funciona o onboarding?', a: 'Diagnóstico gratuito → Setup e migração gradual → Operação plena. Em média, estamos 100% operacionais em 30 dias.' },
    { q: 'Quanto custa?', a: 'O valor é personalizado conforme o volume de operações da sua empresa. Solicite um diagnóstico e receba uma proposta em 24h.' },
    { q: 'Meus dados ficam seguros?', a: 'Sim. Operamos com NDA, acesso restrito e conformidade com a LGPD. Todos os dados são sempre seus.' },
    { q: 'Posso cancelar?', a: 'Sim. Contratos flexíveis com aviso prévio de 30 dias, sem multa. Na saída, entregamos toda a documentação organizada.' },
  ];
  return (
    <section id="faq" className="py-20 md:py-36 px-5 md:px-10 max-w-screen-xl mx-auto">
      <div className="mb-12">
        <span className="section-label">Perguntas Frequentes</span>
        <h2 className="font-sans font-black uppercase tracking-tighter text-ivory leading-[0.92]" style={{ fontSize: 'clamp(2rem,5vw,5rem)' }}>
          SUAS DÚVIDAS, <br /><span className="font-display italic font-normal text-teal tracking-normal" style={{ lineHeight: '1.1' }}>Respondidas.</span>
        </h2>
      </div>
      <div className="flex flex-col divide-y divide-ivory/[0.06]">
        {faqs.map((f, i) => (
          <div key={i} className="py-5 cursor-pointer group" onClick={() => setOpen(open === i ? null : i)}>
            <div className="flex items-start justify-between gap-5">
              <div className="flex items-start gap-4">
                <span className="font-mono text-[0.58rem] text-teal/40 mt-1 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span className={`font-sans font-semibold text-sm md:text-base transition-colors ${open === i ? 'text-teal' : 'text-ivory/75 group-hover:text-ivory'}`}>{f.q}</span>
              </div>
              {open === i ? <ChevronUp size={15} className="text-teal flex-shrink-0 mt-1" /> : <ChevronDown size={15} className="text-ivory/25 flex-shrink-0 mt-1" />}
            </div>
            {open === i && <p className="font-sans font-light text-ivory/55 text-sm leading-relaxed mt-4 ml-8 pl-4 border-l border-teal/25">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

// ── LEAD FORM ─────────────────────────────────────────────────────────────
const LeadForm = () => {
  const [form, setForm] = useState({ nome: '', email: '', tel: '', empresa: '', fat: '' });
  const [sent, setSent] = useState(false);
  const set = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  return (
    <section id="contato" className="py-20 md:py-36 px-5 md:px-10 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div className="flex flex-col justify-center">
          <span className="section-label">Diagnóstico Gratuito</span>
          <h2 className="font-sans font-black uppercase tracking-tighter text-ivory leading-[0.92] mb-6" style={{ fontSize: 'clamp(1.8rem,4vw,4.5rem)' }}>
            PRONTO PARA <br /><span className="font-display italic font-normal text-teal tracking-normal" style={{ lineHeight: '1.1' }}>Delegar?</span>
          </h2>
          <p className="font-sans font-light text-sm text-ivory/55 leading-relaxed mb-8 max-w-sm">Preencha o formulário e receba em até 24h uma proposta personalizada para o seu negócio.</p>
          <div className="flex flex-col gap-3">
            {['Primeiro pagamento após 30 dias', 'Sem contrato de longa duração', 'Cancele quando quiser, sem multa', 'Diagnóstico 100% gratuito'].map(g => (
              <div key={g} className="flex items-center gap-3"><CheckCircle size={13} className="text-teal flex-shrink-0" /><span className="font-sans text-sm text-ivory/60">{g}</span></div>
            ))}
          </div>
        </div>
        <div>
          {sent ? (
            <div className="bg-deep border border-teal/25 rounded-[2rem] p-10 flex flex-col items-center justify-center gap-5 min-h-[400px]">
              <CheckCircle size={48} className="text-teal" />
              <h3 className="font-sans font-bold text-xl text-ivory text-center">Mensagem Enviada!</h3>
              <p className="font-sans text-sm text-ivory/55 text-center max-w-xs leading-relaxed">Em até 24h nossa equipe entrará em contato para entender o seu negócio.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="bg-deep border border-ivory/[0.07] rounded-[2rem] p-8 flex flex-col gap-4">
              <div className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-ivory/25 mb-2">Proposta Personalizada</div>
              {[['nome', 'Nome completo', 'text', 'Seu nome'], ['email', 'Email', 'email', 'seu@email.com'], ['tel', 'WhatsApp', 'tel', '(11) 99999-9999'], ['empresa', 'Nome da empresa', 'text', 'Razão social']].map(([n, l, t, p]) => (
                <div key={n} className="flex flex-col gap-1.5">
                  <label className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-ivory/40">{l}*</label>
                  <input type={t} name={n} required placeholder={p} value={form[n]} onChange={set} className="bg-abyss border border-ivory/[0.08] rounded-xl px-4 py-3 text-ivory text-sm placeholder:text-ivory/20 focus:outline-none focus:border-teal/40 transition-colors" />
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-ivory/40">Faturamento mensal*</label>
                <select name="fat" required value={form.fat} onChange={set} className="bg-abyss border border-ivory/[0.08] rounded-xl px-4 py-3 text-ivory text-sm focus:outline-none focus:border-teal/40 transition-colors appearance-none">
                  <option value="" disabled>Selecione</option>
                  <option value="ate50k">Até R$50 mil/mês</option>
                  <option value="50-200k">R$50k a R$200k/mês</option>
                  <option value="200-500k">R$200k a R$500k/mês</option>
                  <option value="acima500k">Acima de R$500k/mês</option>
                </select>
              </div>
              <button type="submit" className="btn-magnetic rounded-full w-full flex items-center justify-center gap-2 mt-2 py-4 text-[0.7rem]">
                <span className="btn-bg rounded-full" /><span className="relative z-10 flex items-center gap-2">Solicitar Proposta Gratuita <Send size={14} /></span>
              </button>
              <p className="font-mono text-[0.52rem] text-ivory/18 text-center tracking-wider">Retorno em até 24h · Sem compromisso</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

// ── FOOTER ────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="w-full bg-deep border-t border-ivory/[0.06] rounded-t-[4rem] px-5 md:px-10 pt-14 pb-8">
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 mb-14">
        <div className="sm:col-span-2 md:col-span-5">
          <div className="mb-5"><LSGLogo height={30} /></div>
          <p className="font-mono text-xs text-ivory/25 leading-relaxed max-w-xs tracking-wide">Departamento financeiro completo por assinatura. Menos encargo, mais controle, mais crescimento.</p>
        </div>
        <div className="md:col-span-3">
          <h4 className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-teal/50 mb-5">Serviços</h4>
          <ul className="flex flex-col gap-3">{['Gestão de Tesouraria', 'Conciliação Bancária', 'Emissão de Documentos', 'Relatórios Financeiros', 'Departamento Pessoal'].map(l => (<li key={l}><a href="#servicos" className="font-sans text-sm text-ivory/35 hover:text-teal transition-colors">{l}</a></li>))}</ul>
        </div>
        <div className="md:col-span-4">
          <h4 className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-teal/50 mb-5">Contato</h4>
          <div className="flex flex-col gap-2 font-mono text-xs text-ivory/25 tracking-wide"><span>contato@lsgsolucoes.com.br</span><span>Recife, PE — Brasil</span></div>
          <a href="#contato" className="btn-magnetic rounded-full px-5 py-2.5 mt-6 inline-flex items-center gap-1.5 text-[0.65rem]">
            <span className="btn-bg rounded-full" /><span className="relative z-10 flex items-center gap-1.5">Solicitar Diagnóstico <ArrowUpRight size={12} /></span>
          </a>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-teal/25 to-transparent mb-7" />
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-mono text-[0.52rem] text-ivory/18 tracking-[0.12em] uppercase">© 2026 LSG Soluções Empresariais · Todos os direitos reservados</p>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[0.52rem] uppercase tracking-[0.18em] text-ivory/18">Sistema Operacional</span>
        </div>
      </div>
    </div>
  </footer>
);

// ── APP ROOT ──────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-abyss min-h-screen font-sans">
      <NoiseOverlay />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <BeforeAfter />
        <Features />
        <Philosophy />
        <Protocol />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
