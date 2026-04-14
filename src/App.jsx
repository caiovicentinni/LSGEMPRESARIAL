import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ArrowUpRight, Activity, Database, ShieldCheck, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// LSG LOGO — Inline SVG (sem fundo, combina com qualquer cor)
// ─────────────────────────────────────────────
const LSGLogo = ({ height = 36 }) => (
  <svg
    height={height}
    viewBox="0 0 220 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="LSG Empresarial"
  >
    {/* Icon mark — gráfico financeiro ascendente */}
    <polyline
      points="4,38 4,10 28,10"
      stroke="#5BC0BE" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"
    />
    <polyline
      points="8,36 16,22 22,28 32,12"
      stroke="#5BC0BE" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"
    />
    <polygon points="32,12 38,12 38,18" fill="#5BC0BE" />

    {/* Separator */}
    <line x1="50" y1="6" x2="50" y2="42" stroke="rgba(91,192,190,0.25)" strokeWidth="1" />

    {/* "LSG" — bold condensed */}
    <text
      x="60" y="36"
      fontFamily="'Space Grotesk', sans-serif"
      fontWeight="900"
      fontSize="30"
      letterSpacing="-1"
      fill="#E8E4DD"
    >
      LSG
    </text>

    {/* "EMPRESARIAL" — mono tracking */}
    <text
      x="61" y="46"
      fontFamily="'Space Mono', monospace"
      fontWeight="400"
      fontSize="7.5"
      letterSpacing="3"
      fill="#5BC0BE"
      opacity="0.8"
    >
      EMPRESARIAL
    </text>
  </svg>
);

// ─────────────────────────────────────────────
// SIGNAL TICKER
// ─────────────────────────────────────────────
const tickerItems = [
  'BPO Financeiro', '///', 'Conciliação Bancária', '///',
  'DRE em Tempo Real', '///', 'Fluxo de Caixa Preditivo', '///',
  'Analista Dedicado', '///', 'Onboarding em 10 Dias', '///',
  'Contabilidade Digital', '///', 'Zero Planilhas Quebradas', '///',
];

const Ticker = () => (
  <div className="w-full overflow-hidden border-y border-teal/15 py-3 bg-deep">
    <div className="marquee-track">
      {[...tickerItems, ...tickerItems].map((t, i) => (
        <span
          key={i}
          className={`px-5 font-mono text-[0.6rem] uppercase tracking-[0.18em] whitespace-nowrap ${
            t === '///' ? 'text-teal/30' : 'text-ivory/30'
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-abyss/95 backdrop-blur-xl border-b border-teal/10' : 'bg-abyss/60 backdrop-blur-sm'
    }`}>
      <div className="max-w-screen-xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex-shrink-0 cursor-pointer">
          <LSGLogo height={34} />
        </a>

        {/* Nav Links — desktop */}
        <div className="hidden md:flex items-center gap-8">
          {[['Soluções','solucoes'], ['Método','metodo'], ['Manifesto','filosofia']].map(([l, id]) => (
            <a key={id} href={`#${id}`}
              className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ivory/40 hover:text-teal transition-colors duration-200">
              {l}
            </a>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center gap-2 btn-brutal py-2.5 px-5 text-[0.65rem]">
            Agendar Reunião <ArrowUpRight size={13} />
          </button>
          {/* Hamburger */}
          <button className="md:hidden flex flex-col gap-1.5 p-1.5" onClick={() => setMobileOpen(!mobileOpen)}>
            <span className={`w-5 h-px bg-ivory transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`w-5 h-px bg-ivory transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-px bg-ivory transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-abyss border-t border-teal/10 px-5 py-6 flex flex-col gap-5">
          {[['Soluções','solucoes'], ['Método','metodo'], ['Manifesto','filosofia']].map(([l, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMobileOpen(false)}
              className="font-mono text-xs uppercase tracking-widest text-ivory/50 hover:text-teal transition-colors">
              {l}
            </a>
          ))}
          <button className="btn-brutal text-[0.65rem] py-3 px-5 self-start mt-1 flex items-center gap-2">
            Agendar Reunião <ArrowUpRight size={13} />
          </button>
        </div>
      )}
    </nav>
  );
};

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
const Hero = () => {
  const ref = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from('.hero-badge',  { y: 16, opacity: 0, duration: 0.7, ease: 'power3.out' })
        .from('.hero-h1 > div', { y: 60, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out' }, '-=0.4')
        .from('.hero-sub',   { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .from('.hero-cta',   { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .from('.hero-stat',  { y: 16, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, '-=0.4');

      gsap.to('.hero-bg', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex flex-col overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          className="hero-bg w-full h-[115%] object-cover opacity-25"
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
          alt="Financial workspace"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/70 via-abyss/60 to-abyss" />
        <div className="absolute inset-0 bg-gradient-to-r from-abyss/50 to-transparent" />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(91,192,190,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(91,192,190,0.04) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      {/* Content — pushed below navbar with pt */}
      <div className="relative z-10 flex flex-col justify-between flex-1 pt-28 md:pt-32 pb-12 md:pb-20 px-5 md:px-10 max-w-screen-xl mx-auto w-full">

        {/* Badge */}
        <div className="hero-badge flex items-center gap-3 mb-8 md:mb-12">
          <div className="flex items-center gap-2 border border-teal/30 bg-teal/5 px-3 py-1.5">
            <span className="w-1.5 h-1.5 bg-teal animate-pulse" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-teal">BPO Financeiro Premium</span>
          </div>
          <span className="hidden sm:block font-mono text-[0.6rem] text-ivory/20 tracking-[0.15em] uppercase">Excl. R$30K+/mês</span>
        </div>

        {/* Headline */}
        <div className="hero-h1 flex flex-col gap-0">
          <div className="overflow-hidden">
            <div className="font-sans font-black uppercase tracking-tighter leading-[0.9] text-ivory"
              style={{ fontSize: 'clamp(2.4rem, 7vw, 7.5rem)' }}>
              A GESTÃO DO
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="font-display italic text-teal leading-[1.0]"
              style={{ fontSize: 'clamp(2.4rem, 7vw, 7.5rem)' }}>
              Seu Caixa
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="font-sans font-black uppercase tracking-tighter leading-[0.9] text-ivory"
              style={{ fontSize: 'clamp(2.4rem, 7vw, 7.5rem)' }}>
              ENCONTRA A
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="font-display italic text-ivory/20 leading-[1.0]"
              style={{ fontSize: 'clamp(2.4rem, 7vw, 7.5rem)' }}>
              Previsibilidade.
            </div>
          </div>
        </div>

        {/* Sub + CTAs */}
        <div className="mt-8 md:mt-10 flex flex-col md:flex-row gap-6 md:gap-16 md:items-end">
          <p className="hero-sub text-ivory/50 text-sm md:text-base leading-relaxed font-light max-w-sm border-l-2 border-teal/30 pl-4">
            Departamento financeiro corporativo por assinatura. Terceirizamos o operacional — você foca no crescimento exponencial.
          </p>
          <div className="hero-cta flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button className="btn-brutal text-[0.7rem] py-3.5 px-7 flex items-center gap-2">
              Terceirizar Meu Financeiro <ArrowRight size={14} />
            </button>
            <button className="btn-ghost text-[0.7rem] py-3.5 px-7">
              Ver o Método
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 md:mt-14 pt-8 border-t border-ivory/[0.07] grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: '+700', label: 'Operações Delegadas' },
            { num: '10',   label: 'Dias p/ Onboarding' },
            { num: '100%', label: 'Analista Dedicado' },
            { num: 'R$30K+', label: 'Ticket mínimo/mês' },
          ].map((s, i) => (
            <div key={i} className="hero-stat">
              <div className="font-mono font-bold text-xl md:text-3xl text-ivory tracking-tighter">{s.num}</div>
              <div className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ivory/25 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// LIVE FEED
// ─────────────────────────────────────────────
const LiveFeed = () => {
  const logs = [
    '>> CONCILIAÇÃO BANCÁRIA ... OK',
    '>> NFs EMITIDAS: 47 ... OK',
    '>> DRE CONSOLIDADO: +18% LUCRO',
    '>> PAGAMENTOS AGENDADOS: LIMPO',
    '>> INADIMPLÊNCIA: 2 COBRANÇAS ENVIADAS',
    '>> FLUXO DE CAIXA: ATUALIZADO',
    '>> SYNC CONTÁBIL ... COMPLETO',
    '>> STATUS GERAL: OPERACIONAL',
  ];
  const [lines, setLines] = useState(['']);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentLine = logs[lineIdx % logs.length];
      if (charIdx < currentLine.length) {
        setLines(prev => {
          const next = [...prev];
          next[next.length - 1] = currentLine.slice(0, charIdx + 1);
          return next;
        });
        setCharIdx(c => c + 1);
      } else {
        setTimeout(() => {
          setLines(prev => [...prev.slice(-4), '']);
          setLineIdx(l => l + 1);
          setCharIdx(0);
        }, 500);
      }
    }, 38);
    return () => clearInterval(interval);
  }, [charIdx, lineIdx]);

  return (
    <div className="bg-deep border border-teal/10 p-5 h-full flex flex-col min-h-[200px]">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-teal/50">// live_operations.log</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-teal animate-pulse" />
          <span className="font-mono text-[0.55rem] text-teal/50 uppercase tracking-wider">LIVE</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        {lines.map((l, i) => (
          <div key={i} className={`font-mono text-[0.65rem] leading-relaxed ${i === lines.length - 1 ? 'text-teal' : 'text-ivory/20'}`}>
            {l}{i === lines.length - 1 && <span className="tw-cursor" />}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ROTATING GEO
// ─────────────────────────────────────────────
const RotatingGeo = () => (
  <div className="w-full h-full min-h-[200px] flex items-center justify-center bg-deep border border-teal/10 p-8">
    <svg width="110" height="110" viewBox="0 0 110 110" style={{ animation: 'spin 14s linear infinite', transformOrigin: 'center' }}>
      <circle cx="55" cy="55" r="50" stroke="rgba(91,192,190,0.1)"  strokeWidth="1" fill="none" />
      <circle cx="55" cy="55" r="36" stroke="rgba(91,192,190,0.2)"  strokeWidth="1" fill="none" strokeDasharray="5 4" />
      <circle cx="55" cy="55" r="22" stroke="rgba(91,192,190,0.45)" strokeWidth="1" fill="none" />
      <circle cx="55" cy="5"  r="3" fill="rgba(91,192,190,0.9)" />
      <circle cx="105" cy="55" r="2" fill="rgba(91,192,190,0.4)" />
      <circle cx="55" cy="105" r="2" fill="rgba(91,192,190,0.4)" />
      <line x1="55" y1="55" x2="55" y2="2"  stroke="rgba(91,192,190,0.4)" strokeWidth="1" />
      <line x1="55" y1="55" x2="103" y2="55" stroke="rgba(91,192,190,0.2)" strokeWidth="1" />
    </svg>
    <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
  </div>
);

// ─────────────────────────────────────────────
// FEATURES
// ─────────────────────────────────────────────
const Features = () => {
  const ref = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feat-title', {
        scrollTrigger: { trigger: '.feat-title', start: 'top 82%' },
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out'
      });
      gsap.from('.feat-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out'
      });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const cards = [
    { id: '01', icon: Database, title: 'Terceirização de Rotinas',
      desc: 'Livramos você de conciliações, emissão de NFs, boletos, agendamentos e cobranças diárias.',
      tags: ['Conciliação', 'NFs & Boletos', 'Cobrança'], span: 'md:col-span-4' },
    { id: '02', icon: Activity, title: 'Contabilidade Digital',
      desc: 'Integração entre financeiro e contábil. DRE, balanço e apuração fiscal em tempo real.',
      tags: ['DRE', 'Balancete', 'Fiscal'], span: 'md:col-span-4' },
    { id: '03', icon: ShieldCheck, title: 'Software Inteligente',
      desc: 'Operamos 100% em plataformas de alta performance. Dados atualizados diariamente.',
      tags: ['Dashboard', 'Analítica', 'Alertas'], span: 'md:col-span-4' },
  ];

  return (
    <section id="solucoes" ref={ref} className="py-20 md:py-36 px-5 md:px-10 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="feat-title mb-12 md:mb-20">
        <span className="section-label">Módulos de Operação</span>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <h2 className="font-sans font-black uppercase tracking-tighter text-ivory leading-[0.92]"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 5.5rem)' }}>
            ACELERAÇÃO COM<br />
            <span className="font-display italic font-normal text-teal tracking-normal capitalize" style={{lineHeight:'1.1', fontSize:'1em'}}>
              Segurança Absoluta
            </span>
          </h2>
          <p className="font-mono text-xs text-ivory/25 leading-relaxed max-w-xs md:text-right tracking-wide">
            Transformamos seu centre de custo invisível em um painel de controle preditivo.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-teal/10">
        {cards.map((c) => (
          <div key={c.id} className={`feat-card card-brutal bg-abyss ${c.span}`}>
            <div className="font-mono font-bold text-[2.5rem] text-transparent mb-5 leading-none"
              style={{ WebkitTextStroke: '1px rgba(91,192,190,0.25)' }}>
              {c.id}
            </div>
            <c.icon size={18} className="text-teal mb-3 opacity-60" />
            <h3 className="font-sans font-bold text-base text-ivory mb-3 leading-snug">{c.title}</h3>
            <p className="text-ivory/35 text-sm leading-relaxed mb-6 font-light">{c.desc}</p>
            <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-teal/10">
              {c.tags.map(t => (
                <span key={t} className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-teal/45 border border-teal/15 px-2 py-1">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Live strip */}
      <div className="mt-px grid grid-cols-1 md:grid-cols-2 gap-px bg-teal/10">
        <LiveFeed />
        <RotatingGeo />
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// PHILOSOPHY
// ─────────────────────────────────────────────
const Philosophy = () => {
  const ref = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-a', {
        scrollTrigger: { trigger: ref.current, start: 'top 78%' },
        y: 35, opacity: 0, duration: 0.9, ease: 'power3.out'
      });
      gsap.from('.phil-b', {
        scrollTrigger: { trigger: ref.current, start: 'top 65%' },
        y: 50, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.15
      });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <section id="filosofia" ref={ref} className="relative w-full bg-deep overflow-hidden py-24 md:py-40">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop"
          alt="Dark texture"
          className="w-full h-full object-cover opacity-[0.04]"
        />
      </div>

      <div className="relative z-10 px-5 md:px-10 max-w-screen-xl mx-auto">
        <span className="section-label">Manifesto</span>

        <div className="phil-a mb-12 md:mb-20">
          <p className="font-sans text-lg md:text-2xl text-ivory/20 max-w-2xl leading-relaxed font-light">
            A maioria do mercado foca em observar o retrovisor: apurar impostos atrasados e registrar o que já aconteceu.
          </p>
        </div>

        <div className="phil-b">
          <p className="font-sans font-black uppercase tracking-tighter text-ivory leading-[0.9]"
            style={{ fontSize: 'clamp(2rem, 5vw, 5.5rem)' }}>
            NÓS FOCAMOS EM<br />
            <span className="font-display italic font-normal text-teal tracking-normal capitalize"
              style={{ fontSize: '1em', lineHeight: '1.15' }}>
              Inteligência de Caixa
            </span>
            <br />
            EM TEMPO REAL.
          </p>
        </div>

        <div className="mt-16 md:mt-24 h-px w-1/3 bg-gradient-to-r from-teal to-transparent" />
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// PROTOCOL
// ─────────────────────────────────────────────
const Protocol = () => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proto-header', {
        scrollTrigger: { trigger: '.proto-header', start: 'top 82%' },
        y: 35, opacity: 0, duration: 0.9, ease: 'power3.out'
      });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const steps = [
    { num: '01', title: 'ALINHAMENTO & SETUP',
      desc: 'Mapeamos toda a sua realidade operacional. Coletamos os acessos e preparamos o ambiente seguro no nosso software.' },
    { num: '02', title: 'ONBOARDING EM 10 DIAS',
      desc: 'Nossa equipe parametriza DREs, categorias financeiras e histórico. A máquina fica pronta para rodar sem falhas.' },
    { num: '03', title: 'OPERAÇÃO DELEGADA',
      desc: 'Analista Dedicado LSG assume as rédeas. Relatórios, boletos, cobranças e suporte diário via WhatsApp.' },
  ];

  return (
    <section id="metodo" ref={ref} className="py-20 md:py-36 px-5 md:px-10 max-w-screen-xl mx-auto">
      <div className="proto-header mb-12 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <div>
          <span className="section-label">Processo</span>
          <h2 className="font-sans font-black uppercase tracking-tighter text-ivory leading-[0.92]"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 5.5rem)' }}>
            MIGRAÇÃO<br />
            <span className="font-display italic font-normal text-teal tracking-normal capitalize" style={{lineHeight:'1.1'}}>
              Frictionless
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-2 border border-teal/20 px-4 py-2 self-start md:self-auto">
          <span className="w-1.5 h-1.5 bg-teal animate-pulse" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-teal">Protocolos Ativos</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Steps */}
        <div className="md:col-span-7 flex flex-col gap-6">
          {steps.map((s, i) => (
            <div key={i}
              className={`card-brutal cursor-pointer transition-all duration-300 ${active === i ? 'border-teal/30' : 'opacity-50'}`}
              onClick={() => setActive(i)}
            >
              <div className="flex items-start gap-5">
                <div className="font-mono font-bold text-3xl text-transparent flex-shrink-0"
                  style={{ WebkitTextStroke: '1px rgba(91,192,190,0.3)' }}>
                  {s.num}
                </div>
                <div className="flex-1">
                  <h3 className="font-sans font-bold text-sm md:text-base uppercase tracking-wide text-ivory mb-2">
                    {s.title}
                  </h3>
                  <p className="font-sans font-light text-ivory/35 text-sm leading-relaxed">{s.desc}</p>
                </div>
                <CheckCircle size={14} className={`flex-shrink-0 mt-1 transition-colors ${active === i ? 'text-teal' : 'text-ivory/10'}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Info panel */}
        <div className="md:col-span-5">
          <div className="card-brutal border-teal/15 sticky top-28">
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ivory/20 mb-5">
              Status / {steps[active]?.num}
            </div>
            <div className="flex flex-col gap-3 mb-8">
              {steps.map((s, i) => (
                <div key={i} className={`flex items-center gap-3 transition-all duration-300 ${i === active ? 'opacity-100' : 'opacity-20'}`}>
                  <div className={`w-1.5 h-1.5 flex-shrink-0 ${i === active ? 'bg-teal' : 'bg-ivory/20'}`} />
                  <span className={`font-mono text-[0.65rem] tracking-wide ${i === active ? 'text-teal' : 'text-ivory/40'}`}>
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
            <svg viewBox="0 0 200 50" className="w-full opacity-30 mb-5">
              <polyline
                points="0,25 20,8 40,42 60,15 80,35 100,10 120,30 140,20 160,40 180,8 200,25"
                fill="none" stroke="#5BC0BE" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
            <div className="font-mono text-[0.55rem] text-ivory/15 tracking-widest uppercase">
              Tempo médio de onboarding: 10 dias
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────
const CTASection = () => {
  const ref = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-inner', {
        scrollTrigger: { trigger: ref.current, start: 'top 78%' },
        y: 35, opacity: 0, duration: 0.9, ease: 'power3.out'
      });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="px-5 md:px-10 pb-24 max-w-screen-xl mx-auto">
      <div className="cta-inner relative overflow-hidden border-2 border-teal bg-deep p-8 md:p-16"
        style={{ boxShadow: '10px 10px 0px rgba(91,192,190,0.2)' }}>
        {/* BG icon */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.04] pointer-events-none select-none">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#5BC0BE" strokeWidth="0.5">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>

        <span className="section-label">Pronto para terceirizar?</span>
        <h2 className="font-sans font-black uppercase tracking-tighter text-ivory leading-[0.92] mb-6 max-w-2xl"
          style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4.5rem)' }}>
          SUA EMPRESA FATURA<br />
          <span className="font-display italic font-normal text-teal tracking-normal capitalize" style={{lineHeight:'1.1'}}>
            mais de
          </span>{' '}
          R$ 30.000/MÊS?
        </h2>

        <p className="font-sans font-light text-ivory/35 text-sm md:text-base max-w-lg mb-10 leading-relaxed">
          Não limite o crescimento apagando incêndios do fluxo de caixa. Marque uma reunião de diagnóstico e inicie a terceirização.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="btn-brutal text-[0.7rem] py-3.5 px-7 flex items-center gap-2">
            Solicitar Diagnóstico <ArrowRight size={14} />
          </button>
          <button className="btn-ghost text-[0.7rem] py-3.5 px-7">
            Ver o Método
          </button>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
const Footer = () => (
  <footer className="w-full bg-deep border-t border-teal/10 px-5 md:px-10 pt-14 pb-8">
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 mb-14">
        {/* Brand */}
        <div className="sm:col-span-2 md:col-span-5">
          <div className="mb-5">
            <LSGLogo height={30} />
          </div>
          <p className="font-mono text-xs text-ivory/20 leading-relaxed max-w-xs tracking-wide">
            Elevando departamentos financeiros ao padrão enterprise. Menos burocracia. Mais escala.
          </p>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-teal/50 mb-5">Plataforma</h4>
          <ul className="flex flex-col gap-3">
            {['BPO Financeiro', 'Contabilidade Digital', 'Software de Gestão', 'Analista Dedicado'].map(l => (
              <li key={l}>
                <a href="#" className="font-sans text-sm text-ivory/25 hover:text-teal transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-teal/50 mb-5">Contato</h4>
          <div className="flex flex-col gap-3 font-mono text-xs text-ivory/20 tracking-wide">
            <span>contato@lsgsolucoes.com</span>
            <span>Recife, PE — Brasil</span>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-teal/30 to-transparent mb-7" />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-mono text-[0.55rem] text-ivory/15 tracking-[0.15em] uppercase">
          © 2026 LSG Empresarial · Todos os direitos reservados
        </p>
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 bg-green-500 animate-pulse" />
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ivory/20">Sistema Operacional</span>
        </div>
      </div>
    </div>
  </footer>
);

// ─────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-abyss min-h-screen font-sans">
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Features />
        <Philosophy />
        <Protocol />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
