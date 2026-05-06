import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect } from "react";
import { 
  Truck, 
  Shield, 
  Headphones, 
  ArrowRight, 
  Users, 
  BarChart3, 
  Globe, 
  Package, 
  CheckCircle2, 
  Settings,
  Mail,
  Building2,
  ChevronRight,
  Menu,
  X,
  MessageCircle,
  MapPin,
  ShoppingBag,
  Handshake,
  Store,
  PlaneLanding
} from "lucide-react";

// Types
type Tab = "Serviços" | "Soluções" | "Sobre" | "Contato";

// --- Components ---

const Logo = () => (
  <div className="w-10 h-10 flex items-center justify-center">
    <img 
      src="/novologo.png" 
      alt="União Flex Logo" 
      className="w-full h-full object-contain"
      referrerPolicy="no-referrer"
    />
  </div>
);

const Navbar = ({ activeTab, setActiveTab }: { activeTab: Tab; setActiveTab: (t: Tab) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const tabs: Tab[] = ["Serviços", "Soluções", "Sobre", "Contato"];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-2xl border-b border-white/10 h-20 px-6 flex justify-between items-center">
      <div className="text-xl font-bold tracking-tighter text-white flex items-center gap-3">
        <Logo />
        <span className="uppercase">União Flex</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 items-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-medium transition-all relative py-1 ${
              activeTab === tab ? "text-primary font-semibold" : "text-gray-400 hover:text-white"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
        <button 
          onClick={() => setActiveTab("Contato")}
          className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full text-sm font-bold active:scale-95 transition-transform hover:shadow-[0_0_20px_rgba(62,144,255,0.4)]"
        >
          Suporte E-mail
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-surface-container border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setIsOpen(false); }}
                className={`text-left text-lg font-medium ${activeTab === tab ? "text-primary" : "text-gray-400"}`}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, badge, centered = false }: { children: React.ReactNode; badge?: string; centered?: boolean }) => (
  <div className={`mb-12 ${centered ? "text-center" : ""}`}>
    {badge && (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
        {badge}
      </div>
    )}
    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
      {children}
    </h2>
  </div>
);

// --- Pages ---

const HomeServices = ({ setActiveTab }: { setActiveTab: (t: Tab) => void; key?: string }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/imagem.jpg" 
            alt="Logistics background"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6">
              Liderança em Logística Inteligente
            </div>
            <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-6 leading-tight tracking-tighter">
              União <span className="text-gradient">FLEX</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-lg leading-relaxed">
              Soluções inteligentes de frete e suporte logístico de alta precisão. Conectamos seu negócio ao mundo com tecnologia de ponta.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveTab("Contato"); }}
                className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg active:scale-95"
              >
                Suporte E-mail <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveTab("Soluções"); }}
                className="glass px-8 py-4 rounded-xl font-bold text-white hover:bg-white/10 transition-all active:scale-95"
              >
                Nossas Soluções
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="hidden lg:block"
          >
            <div className="glass p-8 rounded-3xl border-white/20 relative">
              <div className="flex items-center justify-between mb-8">
                <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-on-surface-variant font-medium">Status Global</div>
                  <div className="text-secondary font-bold">Operação Normal</div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-on-surface-variant">Última Entrega</div>
                    <div className="text-sm font-bold">São Paulo, BR — 12min atrás</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-on-surface-variant">Em Trânsito</div>
                    <div className="text-sm font-bold">1,240 Remessas Ativas</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-surface-container/30">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { label: "Entregas no Prazo", value: "99.7%", icon: CheckCircle2 },
            { label: "Parceiros Regionais", value: "25+", icon: Building2 },
            { label: "Envios/Ano", value: "2.5M+", icon: Package },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="glass glass-hover p-10 rounded-3xl text-center group cursor-default"
            >
              <stat.icon className="w-12 h-12 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Partners Logos Section */}
      <section className="py-16 border-y border-white/5 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-10">
            <h4 className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4">Integrado com os Maiores</h4>
            <div className="h-px w-12 bg-primary/30" />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30">
            {[
              { icon: ShoppingBag, label: "Shopee" },
              { icon: Handshake, label: "Mercado Livre" },
              { icon: Store, label: "Magalu" },
              { icon: Globe, label: "Aliexpress" },
              { icon: Truck, label: "Transportes" },
            ].map((p, i) => (
              <div key={i} className="flex flex-col items-center gap-3 group hover:opacity-100 transition-all cursor-default">
                <p.icon className="w-10 h-10 text-white stroke-1" />
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest group-hover:text-white transition-colors">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <SectionHeading badge="Logística Sem Fronteiras" centered>
            Excelência em cada operação
          </SectionHeading>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="md:col-span-2 glass p-8 rounded-3xl min-h-[400px] flex flex-col justify-end relative overflow-hidden group"
            >
              <img 
                src="/imagem.jpg" 
                alt="Monitoramento 24/7"
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="relative z-10">
                <BarChart3 className="w-10 h-10 text-primary mb-4" />
                <h4 className="text-2xl font-bold text-white mb-2">Monitoramento 24/7</h4>
                <p className="text-on-surface-variant max-w-md">Rastreamento em tempo real com telemetria avançada e visibilidade total da carga em qualquer parte do globo.</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="glass p-8 rounded-3xl flex flex-col justify-center gap-6 group hover:border-primary/40 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">Segurança</h4>
                <p className="text-on-surface-variant">Protocolos rígidos e seguros para mercadorias de alto valor e sensibilidade.</p>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="md:col-span-3 glass p-10 rounded-3xl relative overflow-hidden group min-h-[400px] flex flex-col justify-center"
            >
              <img 
                src="/Suporte.png" 
                alt="Suporte Especializado"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 max-w-2xl">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                  <Headphones className="w-8 h-8" />
                </div>
                <h4 className="text-3xl font-bold text-white mb-2">Suporte Especializado</h4>
                <p className="text-lg text-on-surface-variant mb-4">Equipe dedicada para resolver qualquer imprevisto em minutos, garantindo que sua carga nunca pare.</p>
                <button className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                  Falar com um Especialista <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="glass p-12 md:p-20 rounded-[40px] text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/5 blur-[120px]" />
            <SectionHeading badge="Pronto para elevar sua logística?">
              Vamos levar seu negócio mais longe
            </SectionHeading>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
              Junte-se a centenas de empresas que confiam na União Flex para suas operações mais críticas.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => setActiveTab("Contato")}
                className="bg-primary-container text-on-primary-container px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(62,144,255,0.3)] active:scale-95"
              >
                Suporte E-mail
              </button>
              <button 
                id="cta-servicos-btn"
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setActiveTab("Serviços");
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="glass px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-colors active:scale-95"
              >
                Nossos Serviços
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const AboutView = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-32 pb-24"
    >
      <div className="container mx-auto px-6">
        <SectionHeading centered badge="Sobre Nós">
          Potencializando o Futuro da <span className="text-primary">Logística</span>
        </SectionHeading>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white">Liderança em cada quilômetro percorrido.</h3>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Na União Flex, transformamos a complexidade do transporte em vantagem competitiva através de tecnologia de ponta e precisão operacional. Nossa missão é fornecer soluções logísticas integradas que superem as expectativas de eficiência e confiabilidade.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="glass p-6 rounded-2xl">
                <div className="text-secondary text-3xl font-bold mb-1">99.8%</div>
                <div className="text-xs font-bold text-on-surface-variant uppercase">Precisão na Entrega</div>
              </div>
              <div className="glass p-6 rounded-2xl">
                <div className="text-primary text-3xl font-bold mb-1">24/7</div>
                <div className="text-xs font-bold text-on-surface-variant uppercase">Monitoramento</div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
            <img 
              src="/Lider.png" 
              alt="Liderança"
              className="glass p-2 w-full rounded-3xl relative z-10"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-white mb-12">Serviços Especializados</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Redespacho de Carga", desc: "Otimização de rotas com conexões estratégicas para menor custo e tempo.", icon: Truck },
              { title: "Coleta Programada", desc: "Agendamento inteligente integrado ao seu ERP para pontualidade absoluta.", icon: CheckCircle2 },
              { title: "Gestão de Frota", desc: "Controle total sobre ativos, manutenção preventiva e telemetria avançada.", icon: Settings },
            ].map((s, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="glass p-10 rounded-3xl text-left flex flex-col border-white/5 hover:border-primary/30 transition-colors"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <s.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{s.title}</h4>
                <p className="text-on-surface-variant mb-10 flex-grow">{s.desc}</p>
                <button className="text-primary font-bold flex items-center gap-2">
                  Saiba Mais <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const WhatsappForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    assunto: "Frete",
    mensagem: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { nome, empresa, assunto, mensagem } = formData;
    
    const text = `*Nova Mensagem via WhatsApp - União Flex*
    
*Nome:* ${nome}
*Empresa:* ${empresa || "Não informada"}
*Assunto:* ${assunto}

*Mensagem:* 
${mensagem}`;

    const encodedText = encodeURIComponent(text);
    // User requested specifically this link: https://wa.me/message/64RKZML25TME01
    // Usually deep links with /message/ don't support custom text via query param in all clients,
    // but we will follow the user's link request. If it fails to pre-fill, 
    // it's a limitation of the "message" ID type link vs deep link by phone number.
    const whatsappUrl = `https://wa.me/message/64RKZML25TME01?text=${encodedText}`;
    
    window.open(whatsappUrl, "_blank");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="glass p-10 rounded-3xl border-white/5 relative bg-white/5 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
          <MessageCircle className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white">Suporte via WhatsApp</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-on-surface-variant">Nome</label>
          <input 
            type="text" 
            name="nome"
            required
            value={formData.nome}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-green-500 transition-colors text-white" 
            placeholder="Seu nome" 
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface-variant">Empresa</label>
            <input 
              type="text" 
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-green-500 transition-colors text-white" 
              placeholder="Nome da empresa" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface-variant">Assunto</label>
            <select 
              name="assunto"
              value={formData.assunto}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-green-500 transition-colors text-white appearance-none"
            >
              <option className="bg-surface">Frete</option>
              <option className="bg-surface">Suporte</option>
              <option className="bg-surface">Entregas</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-on-surface-variant">Mensagem</label>
          <textarea 
            name="mensagem"
            required
            value={formData.mensagem}
            onChange={handleChange}
            rows={4} 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-green-500 transition-colors text-white resize-none" 
            placeholder="Como podemos ajudar no WhatsApp?" 
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-500 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(34,197,94,0.2)]"
        >
          Enviar via WhatsApp <MessageCircle className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

const ContactView = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "Suporte",
    mensagem: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ nome: "", email: "", assunto: "Suporte", mensagem: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="pt-32 pb-24"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12 mb-16 items-start">
          <div className="lg:col-span-1">
            <SectionHeading badge="Fale Conosco">
              Canais de <span className="text-primary">Atendimento</span>
            </SectionHeading>
            <p className="text-lg text-on-surface-variant mb-10">
              Escolha o canal de sua preferência. Nossa equipe está pronta para oferecer suporte técnico e comercial de alta precisão.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-white">Presença Nacional</div>
                  <div className="text-sm text-on-surface-variant">Logística inteligente em todo o Brasil</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-400">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-white">WhatsApp Business</div>
                  <div className="text-sm text-on-surface-variant">Resposta rápida via celular</div>
                </div>
              </div>
              <div className="pt-8 space-y-4">
                <div className="flex items-center gap-4 text-on-surface-variant">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>uniaoflexcomercial@outlook.com</span>
                </div>
                <div className="flex items-center gap-4 text-on-surface-variant">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>São Paulo - Atendimento Nacional</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
            {/* Email Form */}
            <div className="glass p-10 rounded-3xl border-white/5 relative bg-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Suporte via E-mail</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface-variant">Nome</label>
                  <input 
                    type="text" 
                    name="nome"
                    required
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-primary transition-colors text-white" 
                    placeholder="Seu nome" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface-variant">E-mail</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-primary transition-colors text-white" 
                    placeholder="Seu e-mail" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface-variant">Assunto</label>
                  <select 
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-primary transition-colors text-white appearance-none"
                  >
                    <option className="bg-surface">Suporte</option>
                    <option className="bg-surface">Dúvidas</option>
                    <option className="bg-surface">Financeiro</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface-variant">Mensagem</label>
                  <textarea 
                    name="mensagem"
                    required
                    value={formData.mensagem}
                    onChange={handleChange}
                    rows={4} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-primary transition-colors text-white resize-none" 
                    placeholder="Mensagem para e-mail" 
                  />
                </div>
                <button 
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-primary-container text-on-primary-container py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {status === "loading" ? "Enviando..." : "Enviar E-mail"} <ArrowRight className="w-5 h-5" />
                </button>
                {status === "success" && (
                  <p className="text-sm text-green-400 font-bold text-center">E-mail enviado com sucesso!</p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-400 font-bold text-center">Erro ao enviar. Tente novamente.</p>
                )}
              </form>
            </div>

            {/* WhatsApp Form Section */}
            <WhatsappForm />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("Serviços");
  const [isZoomed, setIsZoomed] = useState(false);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [activeTab]);

  const handlePageClick = () => {
    setIsZoomed(true);
    setTimeout(() => setIsZoomed(false), 200);
  };

  return (
    <div 
      className="min-h-screen overflow-x-hidden selection:bg-primary/30"
      onClick={handlePageClick}
    >
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <motion.main
        animate={{ scale: isZoomed ? 0.99 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {activeTab === "Serviços" && <HomeServices key="servicos" setActiveTab={setActiveTab} />}
          {activeTab === "Sobre" && <AboutView key="sobre" />}
          {activeTab === "Contato" && <ContactView key="contato" />}
          {activeTab === "Soluções" && (
            <motion.div 
               key="solucoes"
               initial={{ opacity: 0, scale: 0.9 }} 
               animate={{ opacity: 1, scale: 1 }} 
               exit={{ opacity: 0, scale: 1.1 }}
               className="pt-32 pb-24 text-center min-h-[70vh] flex flex-col justify-center items-center relative overflow-hidden"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[150px] -z-10 animate-pulse" />
              <div className="glass p-12 rounded-[40px] border-white/20 max-w-2xl mx-auto backdrop-blur-3xl">
                <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center text-primary mx-auto mb-8 animate-bounce">
                  <Shield className="w-10 h-10" />
                </div>
                <SectionHeading centered badge="Em Desenvolvimento">Plataforma Logística 4.0</SectionHeading>
                <div className="space-y-6 text-on-surface-variant mb-10">
                  <p className="text-lg">
                    Estamos criando uma suite completa de inteligência artificial para revolucionar sua cadeia de suprimentos.
                  </p>
                  <ul className="grid grid-cols-2 gap-4 text-left">
                    <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-secondary" /> Otimização de Rotas</li>
                    <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-secondary" /> Predição de Fretes</li>
                    <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-secondary" /> Gestão de Risco</li>
                    <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-secondary" /> IA Conversacional</li>
                  </ul>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveTab("Serviços"); }}
                  className="bg-primary text-on-primary px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl active:scale-95"
                >
                  Voltar ao Início
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      <footer className="bg-black py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="text-2xl font-bold text-white flex items-center gap-3">
                 <Logo /> União Flex
              </div>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                Elevando os padrões de transporte e logística global com inteligência e precisão operacional.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Empresa</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li>Sobre Nós</li>
                <li>Carreiras</li>
                <li>Imprensa</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Soluções</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li>Frete Rodoviário</li>
                <li>Expresso</li>
                <li>Distribuição</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li>Privacidade</li>
                <li>Termos</li>
                <li>Suporte</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-xs text-gray-500">© 2024 União Flex Logistics. Todos os direitos reservados.</span>
            <div className="flex gap-6">
              <Globe className="w-5 h-5 text-gray-500 hover:text-primary transition-colors cursor-pointer" />
              <div className="text-xs text-gray-500 font-bold tracking-widest uppercase">ENGENHARIA DE PRECISÃO</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
