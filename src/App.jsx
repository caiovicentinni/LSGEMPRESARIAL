import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ArrowUpRight, CheckCircle, XCircle, Send, ChevronDown, ChevronUp, TrendingUp, TrendingDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ── LOGO ──────────────────────────────────────────────────────────────────
const LSGLogo = ({ height = 34, dark = false }) => (
  <svg height={height} viewBox="0 0 220 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="LSG Empresarial">
    <polyline points="4,38 4,10 28,10" stroke="#00C49A" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />
    <polyline points="8,36 16,22 22,28 32,12" stroke="#00C49A" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
    <polygon points="32,12 38,12 38,18" fill="#00C49A" />
    <line x1="50" y1="6" x2="50" y2="42" stroke="rgba(0,196,154,0.25)" strokeWidth="1" />
    <text x="60" y="36" fontFamily="'Inter',sans-serif" fontWeight="900" fontSize="28" letterSpacing="-1" fill={dark ? '#111318' : '#EEEAE3'}>LSG</text>
    <text x="61" y="46" fontFamily="'JetBrains Mono',monospace" fontWeight="400" fontSize="7" letterSpacing="3.5" fill="#00C49A" opacity="0.8">EMPRESARIAL</text>
  </svg>
);

// ── NAVBAR ────────────────────────────────────────────────────────────────
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
      <div className={`hidden md:flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl border border-border shadow-lg shadow-black/5' : 'bg-dark/30 backdrop-blur-sm'}`}>
        <a href="#"><LSGLogo height={28} dark={scrolled} /></a>
        <div className="flex items-center gap-8">
          {links.map(([l, h]) => (
            <a key={h} href={h} className={`font-mono text-[0.58rem] uppercase tracking-[0.2em] transition-colors ${scrolled ? 'text-ink/50 hover:text-teal' : 'text-ivory/55 hover:text-teal'}`}>{l}</a>
          ))}
        </div>
        <a href="#contato" className={`btn-primary rounded-full px-5 py-2.5 text-[0.65rem] ${scrolled ? '' : 'bg-white text-ink hover:bg-teal hover:text-white'}`}>
          <span className="btn-slide rounded-full" /><span className="relative z-10 flex items-center gap-1.5">Diagnóstico Grátis <ArrowUpRight size={12} /></span>
        </a>
      </div>
      {/* mobile */}
      <div className={`md:hidden flex w-full items-center justify-between px-4 py-3 rounded-full transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl border border-border shadow-md' : 'bg-dark/20 backdrop-blur-sm'}`}>
        <a href="#"><LSGLogo height={24} dark={scrolled} /></a>
        <button onClick={() => setOpen(!open)} className="p-2 flex flex-col gap-1 items-center">
          {[0, 1, 2].map(i => <span key={i} className={`w-5 h-px transition-all ${scrolled ? 'bg-ink' : 'bg-ivory'} ${open && i === 0 ? 'rotate-45 translate-y-[5px]' : ''} ${open && i === 1 ? 'opacity-0' : ''} ${open && i === 2 ? '-rotate-45 -translate-y-[5px]' : ''}`} />)}
        </button>
      </div>
      {open && (
        <div className="md:hidden absolute top-20 left-4 right-4 bg-white/96 backdrop-blur-xl rounded-[2rem] border border-border p-8 flex flex-col gap-5 shadow-xl">
          {links.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="font-mono text-xs uppercase tracking-widest text-ink/55 hover:text-teal transition-colors">{l}</a>)}
          <a href="#contato" onClick={() => setOpen(false)} className="btn-primary rounded-full px-6 py-3 text-[0.65rem] text-center mt-1"><span className="btn-slide rounded-full" /><span className="relative z-10">Diagnóstico Grátis</span></a>
        </div>
      )}
    </nav>
  );
};

// ── TICKER ────────────────────────────────────────────────────────────────
const tickerItems = ['BPO Financeiro', '·', 'Gestão de Tesouraria', '·', 'Conciliação Bancária', '·', 'DRE & Fluxo de Caixa', '·', 'Emissão de NFs', '·', 'Departamento Pessoal', '·', 'Zero CLT', '·'];
const Ticker = () => (
  <div className="w-full overflow-hidden border-y border-ink/[0.06] py-3 bg-surface">
    <div className="marquee-track">
      {[...tickerItems, ...tickerItems].map((t, i) => (
        <span key={i} className={`px-5 text-[0.58rem] uppercase tracking-[0.18em] whitespace-nowrap font-mono ${t === '·' ? 'text-teal' : 'text-ink/35'}`}>{t}</span>
      ))}
    </div>
  </div>
);

// ── HERO — dark section ────────────────────────────────────────────────────
const Hero = () => {
  const ref = useRef(null);
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.25 })
        .from('.h-badge', { y: 18, opacity: 0, duration: 0.7, ease: 'power3.out' })
        .from('.h-l1', { y: 90, opacity: 0, duration: 1.1, ease: 'power3.out' }, '-=0.4')
        .from('.h-l2', { y: 60, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.75')
        .from('.h-l3', { y: 90, opacity: 0, duration: 1.2, ease: 'power3.out' }, '-=0.8')
        .from('.h-sub', { y: 22, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.55')
        .from('.h-cta', { y: 18, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .from('.h-stat', { y: 14, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' }, '-=0.35');
      gsap.to('.hero-img', { yPercent: 20, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-dark">
      <div className="absolute inset-0 z-0">
        <img className="hero-img w-full h-[115%] object-cover opacity-15"
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop"
          alt="Financial precision" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/70 to-transparent" />
      </div>
      <div className="absolute inset-0 z-0" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(0,196,154,0.04) 0%, transparent 60%)' }} />

      <div className="relative z-10 flex flex-col justify-end flex-1 pb-16 md:pb-24 pt-28 px-5 md:px-12 max-w-screen-xl mx-auto w-full">
        <div className="h-badge mb-8">
          <div className="inline-flex items-center gap-2 border border-teal/30 bg-teal/8 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-teal">BPO Financeiro Premium</span>
          </div>
        </div>

        <div className="overflow-hidden"><div className="h-l1 font-sans font-black uppercase tracking-tighter text-ivory leading-none" style={{ fontSize: 'clamp(2.5rem,7.5vw,9rem)' }}>SEU FINANCEIRO</div></div>
        <div className="overflow-hidden my-1.5"><div className="h-l2 font-sans font-light uppercase tracking-[0.06em] text-ivory/35" style={{ fontSize: 'clamp(1rem,2.2vw,2.5rem)' }}>encontra a</div></div>
        <div className="overflow-hidden mb-8 md:mb-10"><div className="h-l3 font-display italic text-teal" style={{ fontSize: 'clamp(3rem,9.5vw,12rem)', lineHeight: '0.9' }}>Clareza.</div></div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-12 md:items-end">
          <p className="h-sub text-ivory/55 text-sm md:text-base font-light leading-relaxed max-w-xs border-l-2 border-teal/30 pl-4">
            Terceirize seu departamento financeiro — sem CLT, sem encargos, sem incêndio todo fim de mês.
          </p>
          <div className="h-cta flex flex-col sm:flex-row gap-3">
            <a href="#contato" className="btn-primary-dark rounded-full px-7 py-4 text-[0.7rem]"><span className="btn-slide rounded-full" /><span className="relative z-10 flex items-center gap-2">Solicitar Diagnóstico <ArrowRight size={14} /></span></a>
            <a href="#processo" className="btn-ghost-dark rounded-full px-7 py-4 text-[0.7rem]">Como Funciona</a>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-ivory/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{ n: '100%', l: 'Doc. pronta pro contador' }, { n: 'Zero', l: 'Encargos trabalhistas' }, { n: '+4', l: 'Módulos inclusos' }, { n: 'Bônus', l: 'Depto. Pessoal incluso' }].map((s, i) => (
            <div key={i} className="h-stat"><div className="font-mono font-bold text-xl md:text-2xl text-teal">{s.n}</div><div className="font-mono text-[0.5rem] uppercase tracking-[0.15em] text-ivory/35 mt-1 leading-tight">{s.l}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── BEFORE / AFTER — light bg ─────────────────────────────────────────────
const BeforeAfter = () => {
  const ref = useRef(null);
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ba-hd', { scrollTrigger: { trigger: ref.current, start: 'top 82%' }, y: 30, opacity: 0, duration: 0.9, ease: 'power3.out' });
      gsap.from('.ba-col', { scrollTrigger: { trigger: ref.current, start: 'top 72%' }, y: 35, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out' });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const before = ['Boletos e NFs atrasados todo mês', 'Planilha bagunçada e desatualizada', 'Não sabe para onde o dinheiro vai', 'Depende de CLT caro e inexperiente', 'Apagando incêndio toda semana', 'Inadimplência sem régua de cobrança'];
  const after = ['NFs e boletos emitidos no prazo', 'DRE e Fluxo de Caixa atualizados', 'Visibilidade total sobre cada centavo', 'Analista dedicado sem encargo nenhum', 'Decisões com dados precisos e confiáveis', 'Régua de cobrança ativa e automatizada'];

  return (
    <section ref={ref} className="py-20 md:py-36 px-5 md:px-10 max-w-screen-xl mx-auto">
      <div className="ba-hd mb-10">
        <span className="label">A Transformação</span>
        <h2 className="font-sans font-black uppercase tracking-tighter text-ink leading-[0.92]" style={{ fontSize: 'clamp(2rem,5vw,5rem)' }}>
          DO CAOS À<br /><span className="font-display italic font-normal text-teal tracking-normal" style={{ lineHeight: '1.1' }}>Clareza Total.</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="ba-col card border-red-200/60 bg-red-50/30">
          <div className="flex items-center gap-2 mb-6"><div className="w-2 h-2 rounded-full bg-red-400" /><span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-red-500">Sem a LSG</span></div>
          <ul className="flex flex-col gap-3">{before.map((b, i) => (<li key={i} className="flex items-start gap-3"><XCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" /><span className="font-sans text-sm text-ink/55 leading-snug">{b}</span></li>))}</ul>
        </div>
        <div className="ba-col card border-teal/20 bg-teal/[0.03]">
          <div className="flex items-center gap-2 mb-6"><div className="w-2 h-2 rounded-full bg-teal animate-pulse" /><span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-teal">Com a LSG</span></div>
          <ul className="flex flex-col gap-3">{after.map((a, i) => (<li key={i} className="flex items-start gap-3"><CheckCircle size={14} className="text-teal flex-shrink-0 mt-0.5" /><span className="font-sans text-sm text-ink/80 leading-snug">{a}</span></li>))}</ul>
        </div>
      </div>
      <div className="mt-4 bg-teal/[0.06] border border-teal/20 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-teal animate-pulse" /><span className="font-mono text-xs text-teal uppercase tracking-[0.15em]">Risco ZERO</span></div>
        <p className="font-sans text-sm text-ink/60 text-center">Primeiro pagamento somente após <strong className="text-ink">30 dias de operação.</strong></p>
        <a href="#contato" className="btn-primary rounded-full px-5 py-2.5 text-[0.65rem] flex-shrink-0"><span className="btn-slide rounded-full" /><span className="relative z-10 flex items-center gap-1.5">Começar <ArrowRight size={12} /></span></a>
      </div>
    </section>
  );
};

// ── FEATURE CARD ANIMATIONS ───────────────────────────────────────────────
// Card 1: Animated cost comparison bars
const CostCompareCard = () => {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 600);
    return () => clearTimeout(t);
  }, []);

  const items = [
    { label: 'Salário CLT', before: 4800, saving: 4800 },
    { label: 'Encargos (75%)', before: 3600, saving: 3600 },
    { label: 'Benefícios', before: 1200, saving: 1200 },
  ];
  const total = items.reduce((s, i) => s + i.saving, 0);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-[0.55rem] uppercase tracking-widest text-ink/30">Custo mensal estimado</span>
        <div className="flex items-center gap-1.5 bg-teal/10 rounded-full px-2.5 py-1">
          <TrendingDown size={11} className="text-teal" />
          <span className="font-mono text-[0.58rem] font-bold text-teal">Economia real</span>
        </div>
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs text-ink/60">{item.label}</span>
            <span className="font-mono text-xs font-semibold text-red-400">R${item.before.toLocaleString('pt-BR')}</span>
          </div>
          <div className="h-2 bg-ink/[0.06] rounded-full overflow-hidden">
            <div className="h-full bg-red-300/70 rounded-full transition-all duration-1000 ease-out" style={{ width: animate ? '100%' : '0%', transitionDelay: `${i * 150}ms` }} />
          </div>
        </div>
      ))}
      <div className="mt-2 py-3 px-4 bg-teal/10 rounded-xl border border-teal/20 flex items-center justify-between">
        <div>
          <div className="font-mono text-[0.55rem] uppercase tracking-widest text-ink/40 mb-0.5">Com a LSG você economiza</div>
          <div className="font-mono font-bold text-xl text-teal">R${total.toLocaleString('pt-BR')}<span className="text-xs font-normal text-teal/60">/mês</span></div>
        </div>
        <TrendingDown size={28} className="text-teal opacity-40" />
      </div>
    </div>
  );
};

// Card 2: Live financial dashboard
const LiveDashboard = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  const metrics = [
    { label: 'Receita', value: [87420, 91200, 89150, 94600], positive: true },
    { label: 'Despesas', value: [52100, 49800, 53400, 51200], positive: false },
    { label: 'Resultado', value: [35320, 41400, 35750, 43400], positive: true },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-[0.55rem] uppercase tracking-widest text-ink/30">DRE — Tempo Real</span>
        <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" /><span className="font-mono text-[0.52rem] text-teal uppercase tracking-widest">Ao Vivo</span></div>
      </div>
      {metrics.map((m, i) => {
        const v = m.value[tick % m.value.length];
        const prev = m.value[(tick - 1 + m.value.length) % m.value.length];
        const up = v >= prev;
        return (
          <div key={i} className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl border ${i === 2 ? 'bg-teal/[0.06] border-teal/20' : 'bg-canvas border-border'}`}>
            <span className="font-sans text-xs text-ink/60">{m.label}</span>
            <div className="flex items-center gap-2">
              {up ? <TrendingUp size={12} className="text-teal" /> : <TrendingDown size={12} className="text-red-400" />}
              <span className={`font-mono text-sm font-bold transition-all duration-500 ${i === 2 ? 'text-teal' : 'text-ink'}`}>
                R${v.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Card 3: Task delegation kanban
const DelegationCard = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % 5), 1400);
    return () => clearInterval(id);
  }, []);

  const tasks = ['Conciliar banco', 'Emitir NFs', 'Pagar forneces.', 'Gerar DRE'];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 mb-1">
        <div className="flex-1 text-center">
          <div className="font-mono text-[0.52rem] uppercase tracking-widest text-ink/30 mb-2">Você</div>
          <div className="bg-red-50 border border-red-200/60 rounded-xl p-3 min-h-[90px] flex flex-col gap-1.5">
            {tasks.slice(step).map((t, i) => (
              <div key={t} className="text-[0.65rem] text-red-600/70 bg-red-100/60 rounded-lg px-2.5 py-1.5 font-sans">{t}</div>
            ))}
            {tasks.slice(step).length === 0 && <div className="flex items-center justify-center h-full"><span className="font-mono text-[0.6rem] text-teal">Livre! ✓</span></div>}
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ArrowRight size={16} className="text-teal animate-pulse" />
          <span className="font-mono text-[0.45rem] text-muted uppercase tracking-widest">delega</span>
        </div>
        <div className="flex-1 text-center">
          <div className="font-mono text-[0.52rem] uppercase tracking-widest text-teal mb-2">LSG</div>
          <div className="bg-teal/[0.06] border border-teal/20 rounded-xl p-3 min-h-[90px] flex flex-col gap-1.5">
            {tasks.slice(0, step).map((t, i) => (
              <div key={t} className="text-[0.65rem] text-teal bg-teal/10 rounded-lg px-2.5 py-1.5 font-sans flex items-center gap-1.5"><CheckCircle size={9} />{t}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="font-mono text-[0.52rem] text-ink/25 text-center">{step === 0 ? 'Iniciando delegação...' : step < 4 ? `Delegando ${tasks[step - 1]}...` : 'Operacional 100% delegado ✓'}</div>
    </div>
  );
};

// ── FEATURES SECTION ──────────────────────────────────────────────────────
const Features = () => {
  const ref = useRef(null);
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feat-hd', { scrollTrigger: { trigger: ref.current, start: 'top 82%' }, y: 30, opacity: 0, duration: 0.9, ease: 'power3.out' });
      gsap.from('.feat-card', { scrollTrigger: { trigger: ref.current, start: 'top 72%' }, y: 40, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out' });
      gsap.from('.svc-item', { scrollTrigger: { trigger: '.svc-grid', start: 'top 80%' }, y: 25, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out' });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const cards = [
    { id: '01', title: 'Redução de Custos', desc: 'Pare de pagar CLT, FGTS, INSS, 13º e férias. Acesse expertise financeira com muito menos custo.', ui: <CostCompareCard /> },
    { id: '02', title: 'Tomada de Decisão', desc: 'DRE e Fluxo de Caixa precisos. Dados reais atualizados para você decidir com confiança.', ui: <LiveDashboard /> },
    { id: '03', title: 'Foco no Negócio', desc: 'Delegue 100% do operacional financeiro. Você vende, cresce e a LSG cuida de cada centavo.', ui: <DelegationCard /> },
  ];

  return (
    <section id="servicos" ref={ref} className="py-20 md:py-36 px-5 md:px-10 max-w-screen-xl mx-auto">
      <div className="feat-hd mb-12 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <div>
          <span className="label">Funcionalidades</span>
          <h2 className="font-sans font-black uppercase tracking-tighter text-ink leading-[0.92]" style={{ fontSize: 'clamp(2rem,5vw,5.5rem)' }}>
            ACELERAÇÃO COM<br /><span className="font-display italic font-normal text-teal tracking-normal" style={{ lineHeight: '1.1' }}>Segurança.</span>
          </h2>
        </div>
        <p className="font-mono text-xs text-muted leading-relaxed max-w-xs md:text-right">Um departamento financeiro completo — sem CLT, sem encargos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        {cards.map(c => (
          <div key={c.id} className="feat-card card flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.55rem] text-ink/20 tracking-widest">{c.id}</span>
              <div className="w-5 h-px bg-teal/30" />
            </div>
            <div className="flex-1">{c.ui}</div>
            <div className="border-t border-border pt-5">
              <h3 className="font-sans font-bold text-base text-ink mb-1.5">{c.title}</h3>
              <p className="font-sans font-light text-sm text-muted leading-relaxed">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="svc-grid grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden border border-border">
        {[['⬡', 'Gestão de Tesouraria', 'Contas a pagar e receber'], ['⬢', 'Conciliação Bancária', 'Conferência diária'], ['⬣', 'Emissão de Documentos', 'NFs e boletos'], ['⬤', 'Relatórios Financeiros', 'DRE e Fluxo de Caixa']].map(([ic, lb, sb]) => (
          <div key={lb} className="svc-item bg-surface p-6 flex flex-col gap-2 hover:bg-teal/[0.04] transition-colors border-r border-b border-border last:border-r-0 group">
            <span className="text-teal/60 text-xl group-hover:text-teal transition-colors">{ic}</span>
            <div className="font-sans font-semibold text-sm text-ink mt-1">{lb}</div>
            <div className="font-mono text-[0.5rem] text-muted uppercase tracking-wider">{sb}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ── PHILOSOPHY — dark section ─────────────────────────────────────────────
const Philosophy = () => {
  const ref = useRef(null);
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-a', { scrollTrigger: { trigger: ref.current, start: 'top 78%' }, y: 30, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.phil-w', { scrollTrigger: { trigger: ref.current, start: 'top 62%' }, y: 50, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out' });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full bg-dark overflow-hidden py-24 md:py-44">
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(0,196,154,0.05) 0%, transparent 60%)' }} />
      <div className="relative z-10 px-5 md:px-12 max-w-screen-xl mx-auto">
        <span className="label-dark">Manifesto</span>
        <div className="phil-a mb-14 md:mb-20">
          <p className="font-sans text-lg md:text-2xl text-ivory/20 max-w-xl leading-relaxed font-light">A maioria dos gestores financeiros foca em registrar o que já aconteceu.</p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 md:gap-x-7">
          {['Nós', 'focamos', 'na', 'Clareza', 'que', 'transforma.'].map((w, i) => (
            <div key={i} className="overflow-hidden">
              <span className={`phil-w block font-black uppercase tracking-tighter ${w === 'Clareza' ? 'font-display italic normal-case text-teal font-normal tracking-normal' : 'font-sans text-ivory'}`}
                style={{ fontSize: 'clamp(2.2rem,6vw,8rem)', lineHeight: '0.9' }}>{w}</span>
            </div>
          ))}
        </div>
        <div className="mt-16 h-px w-1/3 bg-gradient-to-r from-teal to-transparent" />
      </div>
    </section>
  );
};

// ── PROTOCOL — light section ───────────────────────────────────────────────
const Protocol = () => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proc-hd', { scrollTrigger: { trigger: ref.current, start: 'top 82%' }, y: 30, opacity: 0, duration: 0.9, ease: 'power3.out' });
      gsap.from('.proc-step', { scrollTrigger: { trigger: ref.current, start: 'top 72%' }, y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const steps = [
    { num: '01', title: 'DIAGNÓSTICO', desc: 'Reunião gratuita de 30 minutos para mapear a situação financeira atual e desenhar a solução ideal.', detail: 'Sem compromisso. Você sai com clareza sobre o que precisa ser ajustado.' },
    { num: '02', title: 'SETUP', desc: 'Parametrizamos processos, organizamos o histórico e integramos com o sistema do seu contador.', detail: 'Migração gradual, sem interrupção. Em média, operacional pleno em 30 dias.' },
    { num: '03', title: 'OPERAÇÃO', desc: 'A LSG executa o dia a dia financeiro. Relatórios semanais e DRE mensal entregues com pontualidade.', detail: 'Comunicação direta via WhatsApp. Seu contador recebe tudo pronto para exportar.' },
  ];

  const svgs = [
    <svg key="a" viewBox="0 0 200 200" className="w-32 h-32 md:w-44 md:h-44">
      {[70, 55, 40, 25].map((r, i) => (<circle key={i} cx="100" cy="100" r={r} fill="none" stroke="#00C49A" strokeWidth="1.5" opacity={0.3 + i * 0.15} style={{ animation: `spin ${10 + i * 5}s linear infinite ${i % 2 ? 'reverse' : ''}`, transformOrigin: '100px 100px' }} />))}
      <circle cx="100" cy="100" r="6" fill="#00C49A" className="animate-pulse" />
    </svg>,
    <svg key="b" viewBox="0 0 200 200" className="w-32 h-32 md:w-44 md:h-44">
      {Array.from({ length: 5 }).map((_, r) => Array.from({ length: 7 }).map((__, c) => (<circle key={`${r}-${c}`} cx={22 + c * 26} cy={35 + r * 32} r="3" fill="#00C49A" opacity="0.3" />)))}
      <rect x="10" y="0" width="180" height="6" opacity="0.6" fill="url(#lg)">
        <animateTransform attributeName="transform" type="translate" values="0,0;0,168" dur="1.8s" repeatCount="indefinite" />
      </rect>
      <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="transparent" /><stop offset="50%" stopColor="#00C49A" /><stop offset="100%" stopColor="transparent" /></linearGradient></defs>
    </svg>,
    <svg key="c" viewBox="0 0 200 80" className="w-40 h-16 md:w-56 md:h-20">
      <path d="M0,40 L20,40 L30,12 L40,68 L50,28 L60,52 L70,40 L82,18 L94,62 L106,40 L130,40 L200,40"
        fill="none" stroke="#00C49A" strokeWidth="2.5" strokeLinecap="round">
        <animate attributeName="stroke-dasharray" values="0 300;300 0" dur="2s" repeatCount="indefinite" />
      </path>
    </svg>,
  ];

  return (
    <section id="processo" ref={ref} className="py-20 md:py-36 px-5 md:px-10 max-w-screen-xl mx-auto">
      <div className="proc-hd mb-12 md:mb-20">
        <span className="label">Protocolo</span>
        <h2 className="font-sans font-black uppercase tracking-tighter text-ink leading-[0.92]" style={{ fontSize: 'clamp(2rem,5vw,5.5rem)' }}>
          DE ZERO A<br /><span className="font-display italic font-normal text-teal tracking-normal" style={{ lineHeight: '1.1' }}>Operação Plena.</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7 flex flex-col gap-4">
          {steps.map((s, i) => (
            <div key={i} className={`proc-step card cursor-pointer transition-all duration-300 ${active === i ? 'border-teal/30 shadow-lg shadow-teal/5' : 'opacity-60 shadow-none'}`} onClick={() => setActive(i)}>
              <div className="flex items-start gap-5">
                <div className="font-mono font-bold text-2xl text-teal/25 flex-shrink-0">{s.num}</div>
                <div className="flex-1">
                  <h3 className="font-sans font-bold text-sm uppercase tracking-wide text-ink mb-1.5">{s.title}</h3>
                  <p className="font-sans font-light text-sm text-muted leading-relaxed">{s.desc}</p>
                  {active === i && <p className="font-mono text-[0.62rem] text-teal/70 mt-3 leading-relaxed border-l-2 border-teal/25 pl-3">{s.detail}</p>}
                </div>
                <CheckCircle size={14} className={`flex-shrink-0 mt-1 transition-colors ${active === i ? 'text-teal' : 'text-ink/10'}`} />
              </div>
            </div>
          ))}
        </div>
        <div className="md:col-span-5">
          <div className="card border-teal/20 sticky top-28 flex flex-col items-center gap-6 py-10">
            <div className="font-mono text-[0.55rem] uppercase tracking-widest text-muted">{steps[active].num} — {steps[active].title}</div>
            <div className="flex items-center justify-center">{svgs[active]}</div>
            <a href="#contato" className="btn-primary rounded-full px-6 py-3 w-full flex items-center justify-center gap-2 text-[0.65rem]">
              <span className="btn-slide rounded-full" /><span className="relative z-10 flex items-center gap-2">Agendar Diagnóstico <ArrowRight size={13} /></span>
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
    { q: 'O que é BPO Financeiro?', a: 'É a terceirização do departamento financeiro. Em vez de contratar um CLT, você contrata a LSG — com mais especialização, menos custo e zero dor de cabeça.' },
    { q: 'Preciso mudar meu contador?', a: 'Não. A LSG organiza tudo e entrega a documentação 100% pronta para o seu contador. Ele só exporta e gera as guias.' },
    { q: 'Como funciona o onboarding?', a: 'Diagnóstico gratuito → Setup gradual → Operação plena. Em média 30 dias para estar 100% operacional.' },
    { q: 'Quanto custa?', a: 'O valor é personalizado por volume de operações. Solicite um diagnóstico gratuito e receba proposta em até 24h.' },
    { q: 'Meus dados ficam seguros?', a: 'Sim. Operamos com NDA, acesso restrito com credenciais seguras e conformidade total com a LGPD.' },
    { q: 'Posso cancelar?', a: 'Sim. Contratos flexíveis com aviso de 30 dias, sem multa. Entregamos toda a documentação organizada na saída.' },
  ];
  return (
    <section id="faq" className="py-20 md:py-36 px-5 md:px-10 max-w-screen-xl mx-auto">
      <div className="mb-12">
        <span className="label">Perguntas Frequentes</span>
        <h2 className="font-sans font-black uppercase tracking-tighter text-ink leading-[0.92]" style={{ fontSize: 'clamp(2rem,5vw,5rem)' }}>
          SUAS DÚVIDAS,<br /><span className="font-display italic font-normal text-teal tracking-normal" style={{ lineHeight: '1.1' }}>Respondidas.</span>
        </h2>
      </div>
      <div className="flex flex-col divide-y divide-border">
        {faqs.map((f, i) => (
          <div key={i} className="py-5 cursor-pointer group" onClick={() => setOpen(open === i ? null : i)}>
            <div className="flex items-start justify-between gap-5">
              <div className="flex items-start gap-4">
                <span className="font-mono text-[0.58rem] text-teal/50 mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span className={`font-sans font-semibold text-sm md:text-base transition-colors ${open === i ? 'text-teal' : 'text-ink/75 group-hover:text-ink'}`}>{f.q}</span>
              </div>
              {open === i ? <ChevronUp size={15} className="text-teal flex-shrink-0 mt-1" /> : <ChevronDown size={15} className="text-ink/25 flex-shrink-0 mt-1" />}
            </div>
            {open === i && <p className="font-sans font-light text-ink/55 text-sm leading-relaxed mt-4 ml-8 pl-4 border-l-2 border-teal/25">{f.a}</p>}
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
  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  return (
    <section id="contato" className="py-20 md:py-36 px-5 md:px-10 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        <div className="flex flex-col justify-center">
          <span className="label">Diagnóstico Gratuito</span>
          <h2 className="font-sans font-black uppercase tracking-tighter text-ink leading-[0.92] mb-6" style={{ fontSize: 'clamp(1.8rem,4.5vw,4.5rem)' }}>
            PRONTO PARA<br /><span className="font-display italic font-normal text-teal tracking-normal" style={{ lineHeight: '1.1' }}>Delegar?</span>
          </h2>
          <p className="font-sans font-light text-sm text-muted leading-relaxed mb-8 max-w-sm">Preencha o formulário e receba em até 24h uma proposta personalizada.</p>
          <div className="flex flex-col gap-3">
            {['Primeiro pagamento após 30 dias', 'Contrato flexível sem multa', 'Cancele com 30 dias de aviso', 'Diagnóstico 100% gratuito'].map(g => (
              <div key={g} className="flex items-center gap-3"><CheckCircle size={14} className="text-teal flex-shrink-0" /><span className="font-sans text-sm text-ink/65">{g}</span></div>
            ))}
          </div>
        </div>
        <div>
          {sent ? (
            <div className="card flex flex-col items-center justify-center gap-5 min-h-[400px] border-teal/25 bg-teal/[0.03]">
              <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center"><CheckCircle size={32} className="text-teal" /></div>
              <h3 className="font-sans font-bold text-xl text-ink text-center">Mensagem Enviada!</h3>
              <p className="font-sans text-sm text-muted text-center max-w-xs leading-relaxed">Em até 24h nossa equipe entrará em contato.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="card flex flex-col gap-4">
              <div className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted mb-1">Proposta Personalizada</div>
              {[['nome', 'Nome completo', 'text', 'Seu nome'], ['email', 'Email', 'email', 'seu@email.com'], ['tel', 'WhatsApp', 'tel', '(11) 99999-9999'], ['empresa', 'Empresa', 'text', 'Razão social']].map(([n, l, t, p]) => (
                <div key={n} className="flex flex-col gap-1.5">
                  <label className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-muted">{l}*</label>
                  <input type={t} name={n} required placeholder={p} value={form[n]} onChange={set} className="bg-canvas border border-border rounded-xl px-4 py-3 text-ink text-sm placeholder:text-ink/25 focus:outline-none focus:border-teal/50 transition-colors" />
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-muted">Faturamento mensal*</label>
                <select name="fat" required value={form.fat} onChange={set} className="bg-canvas border border-border rounded-xl px-4 py-3 text-ink text-sm focus:outline-none focus:border-teal/50 transition-colors appearance-none">
                  <option value="" disabled>Selecione</option>
                  <option>Até R$50 mil/mês</option>
                  <option>R$50k a R$200k/mês</option>
                  <option>R$200k a R$500k/mês</option>
                  <option>Acima de R$500k/mês</option>
                </select>
              </div>
              <button type="submit" className="btn-primary rounded-full w-full flex items-center justify-center gap-2 mt-2 py-4 text-[0.7rem]">
                <span className="btn-slide rounded-full" /><span className="relative z-10 flex items-center gap-2">Solicitar Proposta Gratuita <Send size={14} /></span>
              </button>
              <p className="font-mono text-[0.52rem] text-muted text-center tracking-wider">Retorno em até 24h · Sem compromisso</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

// ── FOOTER — dark section ─────────────────────────────────────────────────
const Footer = () => (
  <footer className="w-full bg-darker rounded-t-[4rem] border-t border-ivory/[0.05] px-5 md:px-10 pt-14 pb-8">
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 mb-14">
        <div className="sm:col-span-2 md:col-span-5">
          <div className="mb-5"><LSGLogo height={30} /></div>
          <p className="font-mono text-xs text-ivory/25 leading-relaxed max-w-xs tracking-wide">Departamento financeiro completo por assinatura. Menos encargo, mais controle, mais crescimento.</p>
        </div>
        <div className="md:col-span-3">
          <h4 className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-teal/50 mb-5">Serviços</h4>
          <ul className="flex flex-col gap-3">{['Gestão de Tesouraria', 'Conciliação Bancária', 'Emissão de Documentos', 'Relatórios Financeiros', 'Departamento Pessoal'].map(l => (<li key={l}><a href="#servicos" className="font-sans text-sm text-ivory/30 hover:text-teal transition-colors">{l}</a></li>))}</ul>
        </div>
        <div className="md:col-span-4">
          <h4 className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-teal/50 mb-5">Contato</h4>
          <div className="flex flex-col gap-2 font-mono text-xs text-ivory/25 tracking-wide"><span>contato@lsgsolucoes.com.br</span><span>Recife, PE — Brasil</span></div>
          <a href="#contato" className="btn-primary-dark rounded-full px-5 py-2.5 mt-6 inline-flex items-center gap-1.5 text-[0.65rem]">
            <span className="btn-slide rounded-full" /><span className="relative z-10 flex items-center gap-1.5">Solicitar Diagnóstico <ArrowUpRight size={12} /></span>
          </a>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-teal/20 to-transparent mb-7" />
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-mono text-[0.5rem] text-ivory/15 tracking-[0.12em] uppercase">© 2026 LSG Soluções Empresariais · Todos os direitos reservados</p>
        <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /><span className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-ivory/15">Sistema Operacional</span></div>
      </div>
    </div>
  </footer>
);

// ── ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-canvas min-h-screen font-sans">
      <svg className="fixed inset-0 pointer-events-none z-[9999] w-full h-full" style={{ opacity: 0.035 }} aria-hidden>
        <filter id="lsg-noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter="url(#lsg-noise)" />
      </svg>
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
