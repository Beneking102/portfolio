import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Github, Globe, Linkedin, Mail, Loader } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 200);
    return () => clearInterval(timer);
  }, [text]);
  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-teal-600/20 blur-3xl animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-tr from-green-600/10 via-transparent to-teal-600/10 blur-2xl animate-float" />
  </div>
);

const IconButton = ({ Icon, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="relative group hover:scale-110 transition-transform duration-300">
    <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-teal-400 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
    <div className="relative p-2 sm:p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
      <Icon className="w-6 h-6 text-white" />
    </div>
  </a>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => onLoadingComplete?.(), 800);
    }, 5000);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.05,
      filter: 'blur(8px)',
      transition: { duration: 0.6, ease: 'easeInOut', when: 'beforeChildren', staggerChildren: 0.1 }
    }
  };

  const childVariants = {
    exit: { y: -15, opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#001f0e]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />
          <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
            <motion.div className="flex justify-center gap-6 mb-8" variants={childVariants}>
              <IconButton Icon={Globe} href="https://benedikt-pkr.info" />
              <IconButton Icon={Github} href="https://github.com/Beneking102" />
              <IconButton Icon={Linkedin} href="https://www.linkedin.com/in/benedikt-pankratz-a6694b360" />
              <IconButton Icon={Mail} href="mailto:contact@benedikt-pkr.info" />
            </motion.div>

            <motion.div className="text-center mb-6" variants={childVariants}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight">
                <span data-aos="fade-right" className="inline-block px-2 bg-gradient-to-r from-white via-green-100 to-teal-100 bg-clip-text text-transparent">Willkommen</span>{' '}
                <span data-aos="fade-right" data-aos-delay="150" className="inline-block px-2 bg-gradient-to-r from-white via-green-100 to-teal-100 bg-clip-text text-transparent">bei</span>{' '}
                <span data-aos="fade-right" data-aos-delay="300" className="inline-block px-2 bg-gradient-to-r from-white via-green-100 to-teal-100 bg-clip-text text-transparent">Benedikt Pankratz</span>
              </h1>
              <h2 data-aos="fade-up" data-aos-delay="450" className="text-2xl sm:text-3xl md:text-5xl font-semibold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">Portfolio</h2>
            </motion.div>

            <motion.div variants={childVariants} data-aos="fade-up" data-aos-delay="600">
              <a
                href="https://benedikt-pkr.info"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full relative group hover:scale-105 transition-transform duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                <div className="relative flex items-center gap-2 text-xl font-medium text-white">
                  <TypewriterEffect text="benedikt-pkr.info" />
                </div>
              </a>
            </motion.div>

            <motion.div className="mt-12" variants={childVariants} data-aos="fade-up" data-aos-delay="750">
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: [0, 12, 0], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              >
                <Loader className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
