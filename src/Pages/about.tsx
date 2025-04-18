import React, { useEffect, memo, useMemo } from "react"
import { FileText, Code, Award, UserCheck, ArrowUpRight } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'

interface StatCardProps {
  icon: React.ComponentType<any>
  color: string
  value: number
  label: string
  description: string
  animation: string
}

const Header: React.FC = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Code className="w-5 h-5 text-green-400" />
      Bringing digital visions to life
      <Code className="w-5 h-5 text-green-400" />
    </p>
  </div>
))

const ProfileImage: React.FC = memo(() => (
  <div className="flex justify-end items-center sm:p-12 p-0 py-2 pb-2">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      <div className="absolute -inset-6 opacity-25 z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-teal-400 to-green-500 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-teal-300 via-green-300 to-teal-300 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-300 via-teal-400 to-green-300 rounded-full blur-2xl animate-float opacity-50" />
      </div>
      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(0,128,64,0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 via-transparent to-teal-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />
          <img
            src="/Photo.png"
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
))

const StatCard: React.FC<StatCardProps> = memo(({ icon: Icon, color, value, label, description, animation }) => (
  <div data-aos={animation} data-aos-duration={1300} className="relative group">
    <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <span className="text-4xl font-bold text-white" data-aos="fade-up-left" data-aos-duration="1500" data-aos-anchor-placement="top-bottom">
          {value}
        </span>
      </div>
      <div>
        <p className="text-sm uppercase tracking-wider text-gray-300 mb-2" data-aos="fade-up" data-aos-duration="800" data-aos-anchor-placement="top-bottom">
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400" data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-bottom">
            {description}
          </p>
          <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
))

const AboutPage = () => {
  const { totalProjects, apprenticeshipYears, hobbyCount } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]")
    const startDate = new Date("2021-11-06")
    const today = new Date()
    const years = today.getFullYear() - startDate.getFullYear() - (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0)
    return { totalProjects: storedProjects.length, apprenticeshipYears: years, hobbyCount: 3 }
  }, [])

  useEffect(() => {
    AOS.init({ once: false })
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => AOS.refresh(), 250)
    }
    window.addEventListener('resize', handleResize)
    return () => { window.removeEventListener('resize', handleResize); clearTimeout(resizeTimer) }
  }, [])

  const statsData = useMemo<StatCardProps[]>(() => [
    { icon: Code, color: "from-green-400 to-teal-400", value: totalProjects, label: "Projects", description: "Games, bots & web apps", animation: "fade-right" },
    { icon: Award, color: "from-teal-400 to-green-400", value: apprenticeshipYears, label: "Developing", description: "Years of Developing experience", animation: "fade-up" },
    { icon: UserCheck, color: "from-green-400 to-teal-400", value: hobbyCount, label: "Hobbies", description: "Gaming, Chess, Gym", animation: "fade-left" }
  ], [totalProjects, apprenticeshipYears, hobbyCount])

  return (
    <div className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10" id="About">
      <Header />
      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" data-aos="fade-right" data-aos-duration="1000">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">Hello, I'm</span>
              <span className="block mt-2 text-gray-200" data-aos="fade-right" data-aos-duration="1300">Benedikt Pankratz, 19</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4" data-aos="fade-right" data-aos-duration="1500">
              Junior Full-Stack Developer mit Herz. Erfahrung in Spieleentwicklung (C++, Lua), Bot-Entwicklung und vielseitigen TypeScript-Projekten. Während meiner 3-jährigen Fachinformatiker-Ausbildung übernahm ich Projektleitungen und arbeitete in interdisziplinären Teams. Passioniert bei Gaming, Schach und im Gym.
            </p>
            <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
              <a href="/CV_BenediktPankratz.pdf" className="w-full lg:w-auto">
                <button data-aos="fade-up" data-aos-duration="800" className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                  <FileText className="w-5 h-5" />Download CV
                </button>
              </a>
              <a href="#Portofolio" className="w-full lg:w-auto">
                <button data-aos="fade-up" data-aos-duration="1000" className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-teal-400/50 text-teal-400 font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 hover:bg-teal-400/10">
                  <Code className="w-5 h-5" />View Projects
                </button>
              </a>
            </div>
          </div>
          <ProfileImage />
        </div>
        <a href="#Portofolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
            {statsData.map((stat) => <StatCard key={stat.label} {...stat} />)}
          </div>
        </a>
      </div>
      <style>{`
        @keyframes float {0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
        @keyframes spin-slower{to{transform:rotate(360deg)}}
        .animate-bounce-slow{animation:bounce 3s infinite}
        .animate-pulse-slow{animation:pulse 3s infinite}
        .animate-spin-slower{animation:spin-slower 8s linear infinite}
      `}</style>
    </div>
  )
}

export default memo(AboutPage)
