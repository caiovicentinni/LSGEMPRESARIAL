import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  ArrowRight, ArrowUpRight, CheckCircle, XCircle,
  TrendingUp, Landmark, FileText, BarChart2,
  Users, ChevronDown, ChevronUp, Send
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// LSG LOGO SVG
// ─────────────────────────────────────────────
const LSGLogo = ({ height = 36 }) => (
  <svg height={height} viewBox="0 0 220 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="LSG Empresarial">
    <polyline points="4,38 4,10 28,10" stroke="#5BC0BE" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"/>
    <polyline points="8,36 16,22 22,28 32,12" stroke="#5BC0BE" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
    <polygon points="32,12 38,12 38,18" fill="#5BC0BE"/>
    <line x1="50" y1="6" x2="50" y2="42" stroke="rgba(91,192,190,0.25)" strokeWidth="1"/>
    <text x="60" y="36" fontFamily="'Space Grotesk', sans-serif" fontWeight="900" fontSize="30" letterSpacing="-1" fill="#E8E4DD">LSG</text>
    <text x="61" y="46" fontFamily="'Space Mono', monospace" fontWeight="400" fontSize="7.5" letterSpacing="3" fill="#5BC0BE" opacity="0.8">EMPRESARIAL</text>
  </svg>
);

// ─────────────────────────────────────────────
// TICKER
// ─────────────────────────────────────────────
const tickerItems = [
  'BPO Financeiro', '///', 'Gestão de Tesouraria', '///',
  'Conciliação Bancária', '///', 'DRE em Tempo Real', '///',
  'Emissão de NFs', '///', 'Fluxo de Caixa', '///',
  'Departamento Pessoal', '///', 'Analista Dedicado', '///',
];

const Ticker = () => (
  <div className="w-full overflow-hidden border-y border-teal/15 py-3 bg-deep">
    <div className="marquee-track">
      {[...tickerItems, ...tickerItems].map((t, i) => (
        <span key={i} className={`px-5 font-mono text-[0.6rem] uppercase tracking-[0.18em] whitespace-nowrap ${t === '///' ? 'text-teal/40' : 'text-ivory/40'}`}>
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

  const links = [['Serviços', 'servicos'], ['Processo', 'processo'], ['FAQ', 'faq'], ['Contato', 'contato']];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-abyss/95 backdrop-blur-xl border-b border-teal/10' : 'bg-abyss/60 backdrop-blur-sm'}`}>
      <div className="max-w-screen-xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
        <a href="#" className="flex-shrink-0 cursor-pointer"><LSGLogo height={32} /></a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(([l, id]) => (
            <a key={id} href={`#${id}`} className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ivory/60 hover:text-teal transition-colors duration-200">{l}</a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="#contato" className="hidden md:flex items-center gap-2 btn-brutal py-2.5 px-5 text-[0.65rem]">
            Solicitar Diagnóstico <ArrowUpRight size={13} />
          </a>
          <button className="md:hidden flex flex-col gap-1.5 p-1.5" onClick={() => setMobileOpen(!mobileOpen)}>
            <span className={`w-5 h-px bg-ivory transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`w-5 h-px bg-ivory transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-px bg-ivory transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-abyss border-t border-teal/10 px-5 py-6 flex flex-col gap-5">
          {links.map(([l, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMobileOpen(false)} className="font-mono text-xs uppercase tracking-widest text-ivory/60 hover:text-teal transition-colors">{l}</a>
          ))}
          <a href="#contato" onClick={() => setMobileOpen(false)} className="btn-brutal text-[0.65rem] py-3 px-5 self-start mt-1 flex items-center gap-2">
            Solicitar Diagnóstico <ArrowUpRight size={13} />
          </a>
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
      tl.from('.h-badge',  { y: 16, opacity: 0, duration: 0.7, ease: 'power3.out' })
        .from('.h-line',   { y: 70, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }, '-=0.4')
        .from('.h-sub',    { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .from('.h-cta',    { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .from('.h-stat',   { y: 16, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, '-=0.4');
      gsap.to('.hero-bg', { yPercent: 15, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img className="hero-bg w-full h-[115%] object-cover opacity-20"
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
          alt="Financial workspace" />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/70 via-abyss/60 to-abyss" />
        <div className="absolute inset-0 bg-gradient-to-r from-abyss/60 to-transparent" />
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(91,192,190,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(91,192,190,0.03) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      <div className="relative z-10 flex flex-col justify-between flex-1 pt-28 md:pt-32 pb-12 md:pb-20 px-5 md:px-10 max-w-screen-xl mx-auto w-full">
        <div className="h-badge flex items-center gap-3 mb-8 md:mb-10">
          <div className="flex items-center gap-2 border border-teal/30 bg-teal/5 px-3 py-1.5">
            <span className="w-1.5 h-1.5 bg-teal animate-pulse" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-teal">BPO Financeiro Premium</span>
          </div>
          <span className="hidden sm:block font-mono text-[0.6rem] text-ivory/40 tracking-[0.15em] uppercase">Departamento Financeiro por Assinatura</span>
        </div>

        <div className="flex flex-col gap-0">
          <div className="overflow-hidden">
            <div className="h-line font-sans font-black uppercase tracking-tighter leading-[0.9] text-ivory"
              style={{ fontSize: 'clamp(2.2rem, 6.5vw, 7rem)' }}>
              SEU FINANCEIRO
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="h-line font-display italic text-teal leading-[1.05]"
              style={{ fontSize: 'clamp(2.2rem, 6.5vw, 7rem)' }}>
              Resolvido.
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="h-line font-sans font-black uppercase tracking-tighter leading-[0.9] text-ivory"
              style={{ fontSize: 'clamp(2.2rem, 6.5vw, 7rem)' }}>
              TODO MÊS.
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-10 flex flex-col md:flex-row gap-6 md:gap-16 md:items-end">
          <p className="h-sub text-ivory/70 text-sm md:text-base leading-relaxed font-light max-w-sm border-l-2 border-teal/40 pl-4">
            Terceirize seu departamento financeiro completo. Você foca em vender e crescer — a LSG cuida de cada real que entra e sai da sua empresa.
          </p>
          <div className="h-cta flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a href="#contato" className="btn-brutal text-[0.7rem] py-3.5 px-7 flex items-center gap-2">
              Solicitar Diagnóstico Grátis <ArrowRight size={14} />
            </a>
            <a href="#processo" className="btn-ghost text-[0.7rem] py-3.5 px-7">
              Como Funciona
            </a>
          </div>
        </div>

        <div className="mt-10 md:mt-14 pt-8 border-t border-ivory/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: '100%', label: 'Documentação pronta pro contador' },
            { num: 'Zero', label: 'Encargos trabalhistas extras' },
            { num: '+4', label: 'Módulos financeiros inclusos' },
            { num: 'Bônus', label: 'Departamento Pessoal + Benefícios' },
          ].map((s, i) => (
            <div key={i} className="h-stat">
              <div className="font-mono font-bold text-xl md:text-3xl text-teal tracking-tighter">{s.num}</div>
              <div className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-ivory/50 mt-1 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// BEFORE / AFTER — Dor vs. Solução
// ─────────────────────────────────────────────
const BeforeAfter = () => {
  const ref = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ba-title', { scrollTrigger: { trigger: ref.current, start: 'top 82%' }, y: 35, opacity: 0, duration: 0.9, ease: 'power3.out' });
      gsap.from('.ba-col', { scrollTrigger: { trigger: ref.current, start: 'top 75%' }, y: 40, opacity: 0, stagger: 0.2, duration: 0.8, ease: 'power3.out' });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const before = [
    'Boletos e notas fiscais atrasados todo mês',
    'Planilha do Excel desatualizada e cheia de erro',
    'Não sabe exatamente para onde o dinheiro está indo',
    'Depende de funcionário CLT caro e inexperiente',
    'Vive apagando incêndio no financeiro',
    'Inadimplência acumulando sem cobrança ativa',
    'Contador reclamando da bagunça nos lançamentos',
  ];

  const after = [
    'NFs e boletos emitidos no prazo, automaticamente',
    'DRE e Fluxo de Caixa atualizados diariamente',
    'Visibilidade total: cada real que entra e sai',
    'Analista especialista sem encargo trabalhista',
    'Decisões financeiras com dados precisos e confiança',
    'Régua de cobrança ativa e relatório de inadimplência',
    'Documentação 100% pronta — contador só exporta',
  ];

  return (
    <section ref={ref} className="py-20 md:py-36 px-5 md:px-10 max-w-screen-xl mx-auto">
      <div className="ba-title mb-12 md:mb-16">
        <span className="section-label">A Transformação</span>
        <h2 className="font-sans font-black uppercase tracking-tighter text-ivory leading-[0.92]"
          style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4.5rem)' }}>
          DO CAOS À
          <br />
          <span className="font-display italic font-normal text-teal tracking-normal capitalize" style={{ lineHeight: '1.1' }}>
            Clareza Total.
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-teal/10">
        {/* BEFORE */}
        <div className="ba-col bg-deep p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 bg-red-500/70" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-red-400/70">Sem a LSG</span>
          </div>
          <ul className="flex flex-col gap-4">
            {before.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <XCircle size={15} className="text-red-500/50 flex-shrink-0 mt-0.5" />
                <span className="font-sans text-sm text-ivory/55 leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* AFTER */}
        <div className="ba-col bg-abyss p-8 md:p-10 border-l-0 md:border-l border-teal/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 bg-teal" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-teal">Com a LSG</span>
          </div>
          <ul className="flex flex-col gap-4">
            {after.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle size={15} className="text-teal flex-shrink-0 mt-0.5" />
                <span className="font-sans text-sm text-ivory/80 leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Risk zero strip */}
      <div className="mt-px bg-teal/5 border border-teal/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-teal animate-pulse" />
          <span className="font-mono text-xs text-teal uppercase tracking-[0.15em]">Risco ZERO</span>
        </div>
        <p className="font-sans text-sm text-ivory/70 text-center sm:text-left">
          Primeiro pagamento somente após <strong className="text-ivory">30 dias de operação.</strong> Confiamos 100% na qualidade do nosso serviço.
        </p>
        <a href="#contato" className="btn-brutal text-[0.65rem] py-2.5 px-5 flex-shrink-0 flex items-center gap-2">
          Começar Agora <ArrowRight size={12} />
        </a>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────
const Services = () => {
  const ref = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-title', { scrollTrigger: { trigger: '.svc-title', start: 'top 82%' }, y: 35, opacity: 0, duration: 0.9, ease: 'power3.out' });
      gsap.from('.svc-card', { scrollTrigger: { trigger: ref.current, start: 'top 75%' }, y: 40, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out' });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const services = [
    {
      icon: Landmark,
      id: '01',
      title: 'Gestão de Tesouraria',
      desc: 'Controle diário de todas as contas a pagar e receber. Nenhum vencimento passa despercebido — sua empresa nunca mais paga juros por esquecimento.',
      tags: ['Contas a Pagar', 'Contas a Receber', 'Agendamentos'],
    },
    {
      icon: TrendingUp,
      id: '02',
      title: 'Conciliação Bancária',
      desc: 'Conferência diária de todas as movimentações bancárias. Divergências identificadas antes de virar problema. Você sabe exatamente o que aconteceu com cada centavo.',
      tags: ['Extrato Bancário', 'Divergências', 'Controle Diário'],
    },
    {
      icon: FileText,
      id: '03',
      title: 'Emissão de Documentos',
      desc: 'Emissão de notas fiscais e boletos com pontualidade e precisão. Documentação 100% organizada e pronta — o contador só exporta e gera as guias.',
      tags: ['Notas Fiscais', 'Boletos', 'Régua de Cobrança'],
    },
    {
      icon: BarChart2,
      id: '04',
      title: 'Relatórios Financeiros',
      desc: 'DRE e Fluxo de Caixa elaborados mensalmente com linguagem executiva. Dados precisos para decisões estratégicas — sem achismo, sem surpresa.',
      tags: ['DRE', 'Fluxo de Caixa', 'Dashboard'],
    },
  ];

  return (
    <section id="servicos" ref={ref} className="py-20 md:py-36 px-5 md:px-10 max-w-screen-xl mx-auto">
      <div className="svc-title mb-12 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <div>
          <span className="section-label">Módulos do Serviço</span>
          <h2 className="font-sans font-black uppercase tracking-tighter text-ivory leading-[0.92]"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4.5rem)' }}>
            O QUE A LSG
            <br />
            <span className="font-display italic font-normal text-teal tracking-normal capitalize" style={{ lineHeight: '1.1' }}>
              Executa por Você.
            </span>
          </h2>
        </div>
        <p className="font-mono text-xs text-ivory/50 leading-relaxed max-w-xs md:text-right tracking-wide">
          Um departamento financeiro completo — sem CLT, sem encargos, sem dor de cabeça.
        </p>
      </div>

      {/* 4 cards reais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-teal/10 mb-px">
        {services.map((s) => (
          <div key={s.id} className="svc-card card-brutal bg-abyss">
            <div className="flex items-start justify-between mb-6">
              <div className="font-mono font-bold text-3xl text-transparent" style={{ WebkitTextStroke: '1px rgba(91,192,190,0.25)' }}>{s.id}</div>
              <s.icon size={18} className="text-teal opacity-70" />
            </div>
            <h3 className="font-sans font-bold text-lg text-ivory mb-3 leading-snug">{s.title}</h3>
            <p className="text-ivory/65 text-sm leading-relaxed mb-6 font-light">{s.desc}</p>
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-teal/10">
              {s.tags.map(t => (
                <span key={t} className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-teal/60 border border-teal/15 px-2 py-1">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* BONUS CARD — Departamento Pessoal */}
      <div className="svc-card bg-deep border border-teal/30 p-8 md:p-10" style={{ boxShadow: '6px 6px 0px rgba(91,192,190,0.15)' }}>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 bg-teal animate-pulse" />
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-teal">Bônus Exclusivo</span>
            </div>
            <div className="flex items-center gap-3">
              <Users size={22} className="text-teal" />
              <h3 className="font-sans font-bold text-xl text-ivory">Departamento Pessoal</h3>
            </div>
          </div>
          <div className="h-px md:h-auto md:w-px bg-teal/20 flex-shrink-0" />
          <p className="font-sans text-sm text-ivory/70 leading-relaxed flex-1">
            Junto com a gestão financeira, a LSG cuida também da parte de <strong className="text-ivory">benefícios dos seus funcionários</strong> — VR, VA, plano de saúde, férias e obrigações do Departamento Pessoal. Terceirize tudo de uma vez, com um único parceiro.
          </p>
          <a href="#contato" className="btn-brutal text-[0.65rem] py-3 px-6 flex-shrink-0 flex items-center gap-2">
            Quero isso <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// PROCESS
// ─────────────────────────────────────────────
const Process = () => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proc-title', { scrollTrigger: { trigger: '.proc-title', start: 'top 82%' }, y: 35, opacity: 0, duration: 0.9, ease: 'power3.out' });
      gsap.from('.proc-step', { scrollTrigger: { trigger: ref.current, start: 'top 75%' }, y: 30, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out' });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const steps = [
    {
      num: '01', title: 'DIAGNÓSTICO GRATUITO',
      desc: 'Reunião de 30 minutos para mapear a situação financeira atual da sua empresa. Entendemos seus desafios e desenhamos a solução ideal.',
      detail: 'Sem compromisso. Sem custo. Você sai da reunião com clareza sobre o que precisa ser ajustado — contratar ou não conosco.',
    },
    {
      num: '02', title: 'SETUP & MIGRAÇÃO',
      desc: 'Parametrizamos os processos, organizamos histórico e integramos com o sistema do seu contador. Suporte total até tudo estar 100% operacional.',
      detail: 'Sem bagunça, sem interrupção. A migração é gradual e controlada. Você não precisa parar nada.',
    },
    {
      num: '03', title: 'OPERAÇÃO DELEGADA',
      desc: 'A LSG assume o operacional financeiro diário. Relatórios semanais, entregáveis mensais e comunicação direta via WhatsApp.',
      detail: 'Você recebe o DRE, o Fluxo de Caixa e os relatórios no prazo — e toma decisões com dados reais.',
    },
  ];

  return (
    <section id="processo" ref={ref} className="py-20 md:py-36 px-5 md:px-10 max-w-screen-xl mx-auto">
      <div className="proc-title mb-12 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <div>
          <span className="section-label">Como Funciona</span>
          <h2 className="font-sans font-black uppercase tracking-tighter text-ivory leading-[0.92]"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4.5rem)' }}>
            DE ZERO A
            <br />
            <span className="font-display italic font-normal text-teal tracking-normal capitalize" style={{ lineHeight: '1.1' }}>
              Operação Plena.
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-2 border border-teal/20 px-4 py-2 self-start md:self-auto">
          <span className="w-1.5 h-1.5 bg-teal animate-pulse" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-teal">Sem Burocracia</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7 flex flex-col gap-5">
          {steps.map((s, i) => (
            <div key={i} className={`proc-step card-brutal cursor-pointer transition-all duration-300 ${active === i ? 'border-teal/30' : 'opacity-60'}`}
              onClick={() => setActive(i)}>
              <div className="flex items-start gap-5">
                <div className="font-mono font-bold text-2xl text-transparent flex-shrink-0" style={{ WebkitTextStroke: '1px rgba(91,192,190,0.3)' }}>{s.num}</div>
                <div className="flex-1">
                  <h3 className="font-sans font-bold text-sm uppercase tracking-wide text-ivory mb-1.5">{s.title}</h3>
                  <p className="font-sans font-light text-ivory/60 text-sm leading-relaxed">{s.desc}</p>
                  {active === i && (
                    <p className="font-mono text-[0.65rem] text-teal/70 mt-3 leading-relaxed border-l border-teal/30 pl-3">
                      {s.detail}
                    </p>
                  )}
                </div>
                <CheckCircle size={14} className={`flex-shrink-0 mt-1 transition-colors ${active === i ? 'text-teal' : 'text-ivory/15'}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-5">
          <div className="card-brutal border-teal/15 sticky top-28">
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ivory/30 mb-5">Progresso / {steps[active]?.num}</div>
            <div className="flex flex-col gap-3 mb-8">
              {steps.map((s, i) => (
                <div key={i} className={`flex items-center gap-3 transition-all duration-300 ${i === active ? 'opacity-100' : 'opacity-25'}`}>
                  <div className={`w-1.5 h-1.5 flex-shrink-0 ${i === active ? 'bg-teal' : 'bg-ivory/20'}`} />
                  <span className={`font-mono text-[0.65rem] tracking-wide ${i === active ? 'text-teal' : 'text-ivory/40'}`}>{s.title}</span>
                </div>
              ))}
            </div>
            <svg viewBox="0 0 200 50" className="w-full opacity-30 mb-5">
              <polyline points="0,25 20,8 40,42 60,15 80,35 100,10 120,30 140,20 160,40 180,8 200,25"
                fill="none" stroke="#5BC0BE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="font-mono text-[0.55rem] text-ivory/20 tracking-widest uppercase">
              Diagnóstico gratuito em 30 minutos
            </div>
            <a href="#contato" className="btn-brutal text-[0.65rem] py-3 px-5 mt-5 w-full flex items-center justify-center gap-2">
              Agendar Diagnóstico <ArrowRight size={13} />
            </a>
          </div>
        </div>
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
      gsap.from('.phil-a', { scrollTrigger: { trigger: ref.current, start: 'top 78%' }, y: 35, opacity: 0, duration: 0.9, ease: 'power3.out' });
      gsap.from('.phil-b', { scrollTrigger: { trigger: ref.current, start: 'top 65%' }, y: 50, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.15 });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <section className="relative w-full bg-deep overflow-hidden py-24 md:py-40">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop"
          alt="Dark texture" className="w-full h-full object-cover opacity-[0.04]" />
      </div>
      <div className="relative z-10 px-5 md:px-10 max-w-screen-xl mx-auto">
        <span className="section-label">Manifesto</span>
        <div className="phil-a mb-12 md:mb-20">
          <p className="font-sans text-lg md:text-2xl text-ivory/30 max-w-2xl leading-relaxed font-light">
            O contador registra o que já aconteceu. O software organiza. O banco avisa quando acabou.
          </p>
        </div>
        <div className="phil-b">
          <p className="font-sans font-black uppercase tracking-tighter text-ivory leading-[0.9]"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 5rem)' }}>
            A LSG GARANTE QUE
            <br />
            <span className="font-display italic font-normal text-teal tracking-normal capitalize"
              style={{ fontSize: '1em', lineHeight: '1.15' }}>
              Nunca Chegue a Esse Ponto.
            </span>
          </p>
        </div>
        <div className="mt-16 md:mt-24 h-px w-1/3 bg-gradient-to-r from-teal to-transparent" />
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────
const FAQ = () => {
  const [open, setOpen] = useState(null);
  const ref = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-title', { scrollTrigger: { trigger: '.faq-title', start: 'top 82%' }, y: 35, opacity: 0, duration: 0.9, ease: 'power3.out' });
      gsap.from('.faq-item', { scrollTrigger: { trigger: ref.current, start: 'top 75%' }, y: 25, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out' });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const faqs = [
    {
      q: 'O que é BPO Financeiro?',
      a: 'É a terceirização do departamento financeiro da sua empresa. Em vez de contratar um funcionário CLT (com salário + encargos + benefícios), você contrata a LSG Soluções Empresariais — que executa todas as rotinas financeiras com mais especialização, menos custo e sem dor de cabeça.',
    },
    {
      q: 'Qual a diferença entre Contabilidade e BPO Financeiro?',
      a: 'O contador registra o histórico fiscal e gera os impostos. A LSG executa o operacional do dia a dia — paga contas, emite NFs, concilia banco, cobra inadimplentes, gera DRE. Somos o elo entre a sua empresa e o contador, entregando a documentação 100% organizada para ele só exportar.',
    },
    {
      q: 'Preciso mudar meu contador?',
      a: 'Não. A LSG trabalha junto com o seu contador atual. Organizamos tudo para que ele apenas receba as informações prontas e gere as guias. Sua relação com o contador continua normalmente.',
    },
    {
      q: 'Como funciona o onboarding?',
      a: 'Começamos com um diagnóstico gratuito de 30 minutos. Em seguida, fazemos o mapeamento dos processos, parametrizamos o sistema e fazemos a migração gradual. Em média, a operação plena começa dentro de 30 dias.',
    },
    {
      q: 'Meus dados financeiros ficam seguros?',
      a: 'Sim. Operamos com acordos de confidencialidade (NDA), acesso restrito com credenciais seguras e conformidade com a LGPD. Todos os dados continuam sendo seus — sempre.',
    },
    {
      q: 'Posso cancelar o serviço?',
      a: 'Sim. Trabalhamos com contratos flexíveis. É possível cancelar com aviso prévio de 30 dias, sem multa. Na saída, entregamos toda a documentação organizada para a internalização ou transição para outro parceiro.',
    },
  ];

  return (
    <section id="faq" ref={ref} className="py-20 md:py-36 px-5 md:px-10 max-w-screen-xl mx-auto">
      <div className="faq-title mb-12 md:mb-16">
        <span className="section-label">Perguntas Frequentes</span>
        <h2 className="font-sans font-black uppercase tracking-tighter text-ivory leading-[0.92]"
          style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4.5rem)' }}>
          SUAS DÚVIDAS,
          <br />
          <span className="font-display italic font-normal text-teal tracking-normal capitalize" style={{ lineHeight: '1.1' }}>
            Respondidas.
          </span>
        </h2>
      </div>

      <div className="flex flex-col divide-y divide-teal/10">
        {faqs.map((f, i) => (
          <div key={i} className="faq-item py-5 cursor-pointer group" onClick={() => setOpen(open === i ? null : i)}>
            <div className="flex items-start justify-between gap-5">
              <div className="flex items-start gap-4">
                <span className="font-mono text-[0.6rem] text-teal/50 mt-1 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`font-sans font-semibold text-sm md:text-base transition-colors duration-200 ${open === i ? 'text-teal' : 'text-ivory/80 group-hover:text-ivory'}`}>
                  {f.q}
                </span>
              </div>
              {open === i
                ? <ChevronUp size={16} className="text-teal flex-shrink-0 mt-1" />
                : <ChevronDown size={16} className="text-ivory/30 flex-shrink-0 mt-1 group-hover:text-ivory/60 transition-colors" />
              }
            </div>
            {open === i && (
              <p className="font-sans font-light text-ivory/60 text-sm leading-relaxed mt-4 ml-8 border-l border-teal/20 pl-4">
                {f.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// LEAD FORM
// ─────────────────────────────────────────────
const LeadForm = () => {
  const ref = useRef(null);
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '', empresa: '', faturamento: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.form-title', { scrollTrigger: { trigger: ref.current, start: 'top 80%' }, y: 35, opacity: 0, duration: 0.9, ease: 'power3.out' });
      gsap.from('.form-content', { scrollTrigger: { trigger: ref.current, start: 'top 72%' }, y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <section id="contato" ref={ref} className="py-20 md:py-36 px-5 md:px-10 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* Left */}
        <div className="form-title flex flex-col justify-center">
          <span className="section-label">Diagnóstico Gratuito</span>
          <h2 className="font-sans font-black uppercase tracking-tighter text-ivory leading-[0.92] mb-6"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 4rem)' }}>
            SUA EMPRESA FATURA
            <br />
            <span className="font-display italic font-normal text-teal tracking-normal capitalize" style={{ lineHeight: '1.1' }}>
              mais de R$30k/mês?
            </span>
          </h2>
          <p className="font-sans font-light text-ivory/60 text-sm leading-relaxed mb-8 max-w-sm">
            Preencha o formulário e receba em até 24h uma proposta personalizada para o seu negócio.
          </p>

          {/* Guarantees */}
          <div className="flex flex-col gap-3">
            {[
              'Primeiro pagamento após 30 dias',
              'Sem contrato de longa duração',
              'Cancele quando quiser, sem multa',
              'Diagnóstico 100% gratuito e sem compromisso',
            ].map((g, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle size={14} className="text-teal flex-shrink-0" />
                <span className="font-sans text-sm text-ivory/65">{g}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div className="form-content">
          {sent ? (
            <div className="card-brutal border-teal/30 h-full flex flex-col items-center justify-center gap-5 py-16" style={{ boxShadow: '8px 8px 0px rgba(91,192,190,0.2)' }}>
              <CheckCircle size={48} className="text-teal" />
              <h3 className="font-sans font-bold text-xl text-ivory text-center">Mensagem Enviada!</h3>
              <p className="font-sans text-sm text-ivory/60 text-center max-w-xs leading-relaxed">
                Em até 24h nossa equipe entrará em contato para entender melhor o seu negócio.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card-brutal border-teal/20 flex flex-col gap-5" style={{ boxShadow: '8px 8px 0px rgba(91,192,190,0.15)' }}>
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ivory/30 mb-2">Proposta Personalizada</div>

              {[
                { name: 'nome', label: 'Nome completo', type: 'text', placeholder: 'Seu nome' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'seu@email.com' },
                { name: 'telefone', label: 'WhatsApp', type: 'tel', placeholder: '(11) 99999-9999' },
                { name: 'empresa', label: 'Nome da empresa', type: 'text', placeholder: 'Razão social ou nome fantasia' },
              ].map((f) => (
                <div key={f.name} className="flex flex-col gap-1.5">
                  <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-ivory/50">{f.label}*</label>
                  <input
                    type={f.type}
                    name={f.name}
                    required
                    placeholder={f.placeholder}
                    value={formData[f.name]}
                    onChange={handleChange}
                    className="bg-abyss border border-teal/15 px-4 py-3 text-ivory text-sm font-sans placeholder:text-ivory/25 focus:outline-none focus:border-teal/50 transition-colors"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-ivory/50">Faturamento Mensal*</label>
                <select
                  name="faturamento"
                  required
                  value={formData.faturamento}
                  onChange={handleChange}
                  className="bg-abyss border border-teal/15 px-4 py-3 text-ivory text-sm font-sans focus:outline-none focus:border-teal/50 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled>Selecione o faturamento</option>
                  <option value="ate50k">Até R$50 mil/mês</option>
                  <option value="50-200k">R$50 mil a R$200 mil/mês</option>
                  <option value="200-500k">R$200 mil a R$500 mil/mês</option>
                  <option value="500k-1m">R$500 mil a R$1 milhão/mês</option>
                  <option value="acima1m">Acima de R$1 milhão/mês</option>
                </select>
              </div>

              <button type="submit" className="btn-brutal w-full flex items-center justify-center gap-2 mt-2 text-[0.7rem] py-4">
                Solicitar Proposta Gratuita <Send size={14} />
              </button>

              <p className="font-mono text-[0.55rem] text-ivory/20 text-center tracking-wider">
                Retorno em até 24h · Sem compromisso
              </p>
            </form>
          )}
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
        <div className="sm:col-span-2 md:col-span-5">
          <div className="mb-5"><LSGLogo height={30} /></div>
          <p className="font-mono text-xs text-ivory/30 leading-relaxed max-w-xs tracking-wide">
            Departamento financeiro completo por assinatura. Menos encargo, mais controle, mais crescimento.
          </p>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-teal/60 mb-5">Serviços</h4>
          <ul className="flex flex-col gap-3">
            {['Gestão de Tesouraria', 'Conciliação Bancária', 'Emissão de Documentos', 'Relatórios Financeiros', 'Departamento Pessoal'].map(l => (
              <li key={l}><a href="#servicos" className="font-sans text-sm text-ivory/40 hover:text-teal transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-teal/60 mb-5">Contato</h4>
          <div className="flex flex-col gap-3 font-mono text-xs text-ivory/30 tracking-wide">
            <span>contato@lsgsolucoes.com.br</span>
            <span>Recife, PE — Brasil</span>
          </div>
          <a href="#contato" className="btn-brutal text-[0.65rem] py-3 px-5 mt-6 inline-flex items-center gap-2">
            Solicitar Diagnóstico <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-teal/30 to-transparent mb-7" />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-mono text-[0.55rem] text-ivory/20 tracking-[0.15em] uppercase">
          © 2026 LSG Soluções Empresariais · CNPJ em breve · Todos os direitos reservados
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
        <BeforeAfter />
        <Services />
        <Process />
        <Philosophy />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
