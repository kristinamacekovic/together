import { ArrowRight, CheckCircle, Zap, BrainCircuit, Users, ShieldCheck, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Section = ({ children, className = '', id }: { children: React.ReactNode; className?: string, id?: string }) => (
  <section id={id} className={`py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </section>
);

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-experimental-pink mb-12 md:mb-16">
    {children}
  </h2>
);

export function HomePage() {
  const { openAuthModal } = useAuth();

  return (
    <div className="bg-background-primary text-text-primary min-h-screen">

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-12 lg:mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-text-primary">together</h1>
        </div>

        <div className="mb-8 lg:mb-12">
          <h2 className="font-black text-experimental-pink uppercase tracking-tight leading-tight text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Your AI Accountability Partner - Available 24/7, No Video Calls Required
          </h2>
        </div>

        <div className="max-w-2xl">
          <p className="text-xl text-text-tertiary mb-10">
          Instantly start distraction-free focus sessions with an AI agent that adapts to your goals, energy levels, and work style. Our "body doubling app" provides the presence of a partner to help you focus.
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              openAuthModal();
            }}
            className="inline-flex items-center text-lg font-bold text-experimental-electric"
          >
            Start your free trial now{' '}
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <Section id="benefits">
        <SectionHeader>Tired of Unreliable Accountability?</SectionHeader>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Human partners cancel. Video calls drain energy. Generic apps don't adapt.</h3>
            <p className="text-lg text-text-tertiary">These are the pain points we solve.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-experimental-pink mb-4">FocusTogether's AI agents provide consistent, judgment-free support that learns your:</h3>
            <ul className="space-y-3">
              {['Work/study patterns', 'Energy fluctuations', 'Project requirements', 'Personal productivity blockers'].map(item => (
                <li key={item} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-experimental-electric mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* How It Works Section */}
      <Section id="how-it-works">
        <SectionHeader>Your Personalized Focus Session in 20 Seconds</SectionHeader>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { title: "Set Context", description: "Tell your AI agent about your task, focus level, and goals" },
            { title: "Session Launch", description: "Start an on-demand session anytime - no scheduling needed" },
            { title: "Adaptive Support", description: "AI adjusts check-ins based on your progress and focus metrics" },
            { title: "Review Insights", description: "Get session analytics and improvement tips afterward" }
          ].map((step, index) => (
            <div key={step.title} className="bg-surface-elevated p-6 rounded-lg shadow-elegant-lg transition-transform hover:-translate-y-2">
              <div className="text-5xl font-black text-experimental-pink mb-4">0{index + 1}</div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-text-tertiary">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Key Features Section */}
      <Section id="features">
        <SectionHeader>Why 10,000+ Users Choose Our AI Partners</SectionHeader>
        <div className="max-w-4xl mx-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-surface-border/20">
                <th className="p-4 text-lg font-bold text-experimental-pink">Feature</th>
                <th className="p-4 text-lg font-bold text-experimental-pink">Benefit</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "Context-Aware Sessions", benefit: "AI remembers your projects and learning style" },
                { feature: "Energy-Level Matching", benefit: "Adapts interaction frequency to your current focus" },
                { feature: "Progress Prediction", benefit: "Forecasts completion times based on your history" },
                { feature: "Zero-Video Privacy", benefit: "Full accountability without camera anxiety" },
                { feature: "ADHD Focus Session", benefit: "Tailored for neurodivergent minds to enhance productivity" }
              ].map(({feature, benefit}) => (
                <tr key={feature} className="border-b border-surface-border/20 last:border-b-0">
                  <td className="p-4 font-semibold text-white">{feature}</td>
                  <td className="p-4 text-text-tertiary">{benefit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Who It's For Section */}
      <Section id="who-its-for">
        <SectionHeader>Who It's For</SectionHeader>
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {[
            { icon: <BrainCircuit className="w-12 h-12 mx-auto text-experimental-pink mb-4" />, title: "For ADHD Professionals", points: ["Detect focus drift in real-time", "Break tasks into micro-sessions", "Celebrate small wins with dopamine-triggering feedback"] },
            { icon: <Users className="w-12 h-12 mx-auto text-experimental-pink mb-4" />, title: "For Remote Workers", points: ["Virtual 'coworker' presence", "Meeting-prep focus boosts", "Deep work mode scheduling"] },
            { icon: <Zap className="w-12 h-12 mx-auto text-experimental-pink mb-4" />, title: "For Students", points: ["Adapt to your course load", "Simulate library accountability", "Predict exam prep timelines"] }
          ].map(({icon, title, points}) => (
            <div key={title} className="bg-surface-elevated p-8 rounded-lg shadow-elegant-xl">
              {icon}
              <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
              <ul className="space-y-2 text-text-tertiary">
                {points.map(point => <li key={point}>{point}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing Section */}
      <Section id="pricing">
        <SectionHeader>Risk-Free Focus Transformation</SectionHeader>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { plan: "Free Tier", price: "0", features: ["3 sessions/week", "Basic AI agent"], cta: "Start Now" },
            { plan: "Pro Plan", price: "$9/month", features: ["Unlimited sessions", "Adaptive AI", "Progress analytics"], cta: "Start Free Trial", popular: true },
            { plan: "Team Plan", price: "$25/5 users", features: ["Shared accountability metrics", "Group focus mode"], cta: "Contact Sales" }
          ].map(({plan, price, features, cta, popular}) => (
            <div key={plan} className={`relative p-8 rounded-lg ${popular ? 'border-2 border-experimental-pink bg-surface-elevated' : 'bg-surface-elevated'}`}>
              {popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-experimental-pink text-background-primary text-sm font-bold px-3 py-1 rounded-full">MOST POPULAR</div>}
              <h3 className="text-2xl font-bold text-white mb-2">{plan}</h3>
              <p className="text-4xl font-bold text-experimental-electric mb-6">{price}</p>
              <ul className="space-y-3 text-text-tertiary mb-8">
                {features.map(feat => <li key={feat} className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2"/>{feat}</li>)}
              </ul>
              <button onClick={openAuthModal} className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-colors ${popular ? 'bg-experimental-pink text-background-primary hover:bg-pink-400' : 'bg-surface-hover text-white hover:bg-surface-active'}`}>
                {cta}
              </button>
            </div>
          ))}
        </div>
        <p className="text-center mt-8 text-text-tertiary">7-day free trial - cancel anytime</p>
        <div className="flex justify-center items-center gap-4 mt-4 text-sm text-text-muted">
          <ShieldCheck className="w-5 h-5"/><span>SOC2 Compliant</span>
          <span>•</span>
          <ShieldCheck className="w-5 h-5"/><span>Data Encrypted</span>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section id="faq">
        <SectionHeader>Frequently Asked Questions</SectionHeader>
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            { q: "How does AI differ from human partners?", a: "Our agents never cancel, adapt to your energy in real-time, and provide data-driven insights human partners can't." },
            { q: "Can it replace my therapist/ADHD coach?", a: "No. This is a productivity tool, not a medical one. It's designed to complement, not replace, professional support systems." }
          ].map(({ q, a }) => (
            <details key={q} className="bg-surface-elevated rounded-lg p-6 cursor-pointer">
              <summary className="flex items-center justify-between font-bold text-white text-lg">
                {q}
                <ArrowRight className="details-arrow w-5 h-5 transition-transform" />
              </summary>
              <p className="mt-4 text-text-tertiary animate-slide-down">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-experimental-pink mb-6">Ready for Guilt-Free Productivity?</h2>
        <p className="text-xl text-text-tertiary max-w-2xl mx-auto mb-8">Stop fighting distractions. Start your free trial and get an AI partner that finally gets you.</p>
        <div className="mt-8">
          <button
            onClick={openAuthModal}
            className="rounded-lg bg-experimental-electric px-8 py-4 text-lg font-bold text-background-primary"
          >
            Start your free trial
          </button>
        </div>
      </Section>
    </div>
  );
}