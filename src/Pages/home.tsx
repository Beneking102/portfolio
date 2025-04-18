import React, { useState, useEffect, useCallback, memo } from "react";
import { Github, Linkedin, Mail, ExternalLink, Mouse } from "lucide-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

interface TechStackProps { tech: string }
const TechStackComponent: React.FC<TechStackProps> = ({ tech }) => (
  <div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:scale-105 transition-all duration-300">
    {tech}
  </div>
);
const TechStack = memo(TechStackComponent);

interface CTAButtonProps { href?: string; onClick?: () => void; text: string; icon: React.ComponentType<any> }
const CTAButtonComponent: React.FC<CTAButtonProps> = ({ href, onClick, text, icon: Icon }) => {
  const content = (
    <span className="relative flex items-center gap-2 px-6 py-3 bg-[#001f0e]/80 backdrop-blur-lg rounded-lg border border-white/10 text-white font-medium">
      {text} <Icon className="w-5 h-5" />
    </span>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="relative group inline-block">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-teal-400 rounded-lg opacity-50 blur-md group-hover:opacity-80 transition-all"></div>
      {content}
    </a>
  ) : (
    <button onClick={onClick} className="relative group inline-block">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-teal-400 rounded-lg opacity-50 blur-md group-hover:opacity-80 transition-all"></div>
      {content}
    </button>
  );
};
const CTAButton = memo(CTAButtonComponent);

interface SocialLinkProps { icon: React.ComponentType<any>; link: string }
const SocialLinkComponent: React.FC<SocialLinkProps> = ({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="relative group p-2">
    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-400 rounded-full blur opacity-20 group-hover:opacity-40 transition-all"></div>
    <div className="relative flex items-center justify-center w-10 h-10 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 group-hover:border-white/20 transition-all duration-300">
      <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
    </div>
  </a>
);
const SocialLink = memo(SocialLinkComponent);

const WORDS = ["Full-Stack", "Developer mit Herz", "Schachmeister"];
const TECH_STACK = ["React", "TypeScript", "Java", "(Tailwind)-CSS", "Lua", "C#", "C++"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/Beneking102" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/benedikt-pankratz-a6694b360" },
  { icon: Mail, link: "mailto:contact@benedikt-pkr.info" }
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, offset: 20 });
  }, []);

  const type = useCallback(() => {
    const current = WORDS[wordIndex];
    if (isTyping) {
      if (charIndex < current.length) {
        setText(prev => prev + current[charIndex]);
        setCharIndex(i => i + 1);
      } else {
        setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(i => i - 1);
      } else {
        setWordIndex(i => (i + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timer = setTimeout(type, isTyping ? 100 : 50);
    return () => clearTimeout(timer);
  }, [type, isTyping]);

  const lottieOptions = { src: "https://lottie.host/58753882-bb6a-49f5-a2c0-950eda1e135a/NLbpVqGegK.lottie", loop: true, autoplay: true, style: { width: '100%', height: '100%' } };

  const scrollToPortfolio = () => {
    const el = document.getElementById('About');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-hidden" id="Home">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 lg:w-1/2" data-aos="fade-right">
            <div className="inline-block animate-float" data-aos="zoom-in">
              <div className="relative group top-2">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-teal-400 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-300 font-medium">Junior Full-Stack Developer</span>
                </div>
              </div>
            </div>
            <div className="space-y-2" data-aos="fade-up" data-aos-delay="200">
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
                <span className="block bg-clip-text text-transparent lg:text-5xl bg-gradient-to-r from-white via-green-100 to-teal-100">Willkommen zu meinem</span>
                <span className="block mt-2 bg-clip-text text-transparent lg:text-7xl bg-gradient-to-r from-green-400 to-teal-400">Portfolio</span>
              </h1>
            </div>
            <div className="h-8 flex items-center" data-aos="fade-up" data-aos-delay="400">
              <span className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-300">{text}</span>
              <span className="w-[3px] h-6 bg-gradient-to-t from-green-400 to-teal-300 ml-1 animate-blink"></span>
            </div>
            <div className="flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="800">
              {TECH_STACK.map((t, i) => <TechStack key={i} tech={t} />)}
            </div>
            <div className="flex gap-4" data-aos="fade-up" data-aos-delay="1000">
              <CTAButton onClick={scrollToPortfolio} text="Projekte" icon={ExternalLink} />
              <CTAButton href="/CV_BenediktPankratz.pdf" text="CV herunterladen" icon={ExternalLink} />
            </div>
            <div className="flex gap-4" data-aos="fade-up" data-aos-delay="1200">
              {SOCIAL_LINKS.map((s, i) => <SocialLink key={i} {...s} />)}
            </div>
          </div>
          <div className="relative lg:w-1/2 h-96" data-aos="fade-left" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <div className={`absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-400/20 rounded-3xl blur-3xl transition-transform ${hovering ? 'scale-105 opacity-50' : 'scale-100 opacity-20'}`}></div>
            <div className={`relative w-full h-full transition-transform ${hovering ? 'scale-105' : 'scale-100'}`}>
              <DotLottieReact {...lottieOptions} />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-12" data-aos="fade-up" data-aos-delay="1400">
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [0, 12, 0], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            onClick={scrollToPortfolio}
          >
            <Mouse className="w-8 h-8 text-white" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
