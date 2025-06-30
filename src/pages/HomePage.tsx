import { ArrowRight, CheckCircle, Zap, BrainCircuit, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

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

  // Handle anchor scrolling when page loads with hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure the page is fully rendered
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="bg-background-primary text-text-primary min-h-screen">

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-12 lg:mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-text-primary">together</h1>
        </div>

        <div className="mb-8 lg:mb-12">
          <h2 className="font-black text-experimental-pink uppercase tracking-tight leading-tight text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Your AI Accountability Partner - Available 24/7
          </h2>
        </div>

        <div className="max-w-2xl">
          <p className="text-xl text-text-tertiary mb-10">
          Instantly start distraction-free focus sessions with an AI agent that adapts to you. Our "body doubling app" provides the presence of a partner to help you focus, when and how you need it.
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              openAuthModal();
            }}
            className="group inline-flex items-center text-lg font-bold text-experimental-electric"
          >
            <ArrowRight className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            Start free today
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
            <h3 className="text-2xl font-bold text-experimental-pink mb-4">Together's AI agents provide consistent, judgment-free support that learns your:</h3>
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
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { title: "Set Context", description: "Tell your AI agent about your task, focus level, and goals" },
            { title: "Session Launch", description: "Start an on-demand session anytime - no scheduling needed" },
            { title: "Adaptive Support", description: "AI adjusts check-ins based on your progress and focus metrics" }
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
        <SectionHeader>Why Users Choose Our AI Partners</SectionHeader>
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
            { icon: <Zap className="w-12 h-12 mx-auto text-experimental-pink mb-4" />, title: "For Students", points: ["Adapt to your interests", "Simulate library accountability", "Practice for exams"] }
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
        <SectionHeader>Alpha Release - Try for Free</SectionHeader>
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-surface-elevated p-12 rounded-lg shadow-elegant-xl border border-experimental-pink/20">
            <div className="inline-flex items-center justify-center bg-experimental-pink/10 text-experimental-pink text-sm font-bold px-4 py-2 rounded-full mb-6">
              🚀 ALPHA RELEASE
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">Currently in Alpha - Free Access Available</h3>
            <p className="text-xl text-text-tertiary mb-8 max-w-2xl mx-auto">
              We're in our alpha phase and adding users based on interest and feedback. 
              Try our AI accountability partner completely free as we refine the experience together.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-experimental-electric mr-3" />
                <span className="text-lg">Full access to all features</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-experimental-electric mr-3" />
                <span className="text-lg">Direct feedback channel to our team</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-experimental-electric mr-3" />
                <span className="text-lg">Help shape the future of AI accountability</span>
              </div>
            </div>
            <button 
              onClick={openAuthModal} 
              className="bg-experimental-pink text-background-primary hover:bg-pink-400 transition-colors py-4 px-8 rounded-lg font-bold text-lg mb-6"
            >
              Request Alpha Access
            </button>
            <p className="text-sm text-text-muted">
              We review requests quickly and add users based on capacity and feedback needs.
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section id="faq">
        <SectionHeader>Frequently Asked Questions</SectionHeader>
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            { q: "How does AI differ from human partners?", a: "Our agents never cancel, adapt to your energy in real-time, and are able to hold a conversation in any topic of your need." },
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
        <p className="text-xl text-text-tertiary max-w-2xl mx-auto mb-8">Stop fighting distractions. Start free today with a partner that finally gets you.</p>
        <div className="mt-8">
          <button
            onClick={openAuthModal}
            className="rounded-lg bg-experimental-electric px-8 py-4 text-lg font-bold text-background-primary"
          >
            Focus Together
          </button>
        </div>
      </Section>
    </div>
  );
}