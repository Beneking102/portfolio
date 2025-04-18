import React, { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const navItems = [
    { href: "#Home", label: "Home" },
    { href: "#About", label: "About" },
    { href: "#Portfolio", label: "Portfolio" },
    { href: "#Contact", label: "Kontakt" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems
        .map(({ href }) => {
          const sectionEl = document.querySelector(href);
          if (!(sectionEl instanceof HTMLElement)) return null;
          return {
            id: href.slice(1),
            top: sectionEl.offsetTop - 100,
            bottom: sectionEl.offsetTop + sectionEl.offsetHeight - 100,
          };
        })
        .filter(
          (sec): sec is { id: string; top: number; bottom: number } => sec !== null
        );

      const currentY = window.scrollY;
      const current = sections.find(
        (sec) => currentY >= sec.top && currentY < sec.bottom
      );

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const sectionEl = document.querySelector(href);
      if (!(sectionEl instanceof HTMLElement)) return;

      const offset = sectionEl.offsetTop - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
      setIsOpen(false);
    },
    []
  );

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-500 ${
        isOpen
          ? "bg-[#030014] opacity-100"
          : scrolled
          ? "bg-[#030014]/50 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-[10%]">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#Home"
            onClick={(e) => scrollToSection(e, "#Home")}
            className="text-xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent"
          >
            Benedikt Pankratz
          </a>

          <div className="hidden md:flex space-x-8">
            {navItems.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => scrollToSection(e, href)}
                className={`relative group px-1 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeSection === href.slice(1)
                    ? "bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent font-semibold"
                    : "text-[#e2d3fd] hover:text-white"
                }`}
              >
                {label}
                <span
                  className={`absolute bottom-0 left-0 block h-0.5 w-full transform origin-left transition-transform duration-300 ${
                    activeSection === href.slice(1)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  } bg-gradient-to-r from-green-400 to-teal-400`}
                />
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={`md:hidden p-2 transition-transform duration-300 ${
              isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
            } text-[#e2d3fd] hover:text-white`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-x-0 top-16 bg-[#030014] transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-4 p-6">
          {navItems.map(({ href, label }, idx) => (
            <a
              key={href}
              href={href}
              onClick={(e) => scrollToSection(e, href)}
              className={`transition-all duration-300 ease ${
                activeSection === href.slice(1)
                  ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                  : "text-[#e2d3fd] hover:text-white"
              }`}
              style={{
                transitionDelay: `${idx * 100}ms`,
                transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                opacity: isOpen ? 1 : 0,
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
