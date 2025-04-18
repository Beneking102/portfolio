import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, Github, Code2,
  ChevronRight, Layers, Star,
} from "lucide-react";
import Swal from 'sweetalert2';

// Icon-Mapping bleibt generisch, Farben im Badge an Theme angepasst
const TECH_ICONS: Record<string, React.FC<any>> = {
  React: Code2,
  Tailwind: Code2,
  Express: Code2,
  Python: Code2,
  Javascript: Code2,
  HTML: Code2,
  CSS: Code2,
  default: Code2,
};

const TechBadge: React.FC<{ tech: string }> = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS.default;
  return (
    <div className="group relative overflow-hidden px-3 py-2 bg-gradient-to-r from-green-500/10 to-teal-400/10 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-teal-400/0 group-hover:from-green-500/20 group-hover:to-teal-400/20 transition-all duration-500" />
      <div className="relative flex items-center gap-2">
        <Icon className="w-4 h-4 text-green-400 group-hover:text-green-300 transition-colors" />
        <span className="text-sm font-medium text-green-300 group-hover:text-green-200 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{ feature: string }> = ({ feature }) => (
  <li className="group flex items-start space-x-3 p-2 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
    <div className="relative mt-1">
      <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-teal-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-teal-300 group-hover:scale-125 transition-transform duration-300" />
    </div>
    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
      {feature}
    </span>
  </li>
);

const ProjectStats: React.FC<{ project: any }> = ({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-[#001f0e] rounded-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-teal-900/20 opacity-50 blur-2xl" />
      <div className="relative z-10 flex items-center space-x-3 bg-white/5 p-3 rounded-lg border border-green-500/20 transition-all duration-300 hover:scale-105 hover:border-green-500/40 hover:shadow-lg">
        <div className="bg-green-500/20 p-2 rounded-full">
          <Code2 className="text-green-300 w-5 h-5" strokeWidth={1.5} />
        </div>
        <div>
          <div className="text-xl font-semibold text-green-200">{techStackCount}</div>
          <div className="text-xs text-gray-400">Gesamt Technologien</div>
        </div>
      </div>
      <div className="relative z-10 flex items-center space-x-3 bg-white/5 p-3 rounded-lg border border-green-500/20 transition-all duration-300 hover:scale-105 hover:border-green-500/40 hover:shadow-lg">
        <div className="bg-green-500/20 p-2 rounded-full">
          <Layers className="text-teal-300 w-5 h-5" strokeWidth={1.5} />
        </div>
        <div>
          <div className="text-xl font-semibold text-teal-200">{featuresCount}</div>
          <div className="text-xs text-gray-400">Hauptmerkmale</div>
        </div>
      </div>
    </div>
  );
};

function handleGithubClick(githubLink?: string) {
  if (!githubLink || githubLink === 'Private') {
    Swal.fire({
      icon: 'info',
      title: 'Quellcode privat',
      text: 'Dieser Projektcode ist privat und kann nicht angezeigt werden.',
      confirmButtonText: 'Verstanden',
      confirmButtonColor: '#22c55e',
      background: '#001f0e',
      color: '#ffffff',
    });
    return false;
  }
  return true;
}

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const stored = JSON.parse(localStorage.getItem('projects') || '[]');
    const sel = stored.find((p: any) => String(p.id) === id);
    if (sel) setProject({ ...sel, Features: sel.Features || [], TechStack: sel.TechStack || [], Github: sel.Github || '' });
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#001f0e] flex items-center justify-center">
        <div className="text-center space-y-4 animate-pulse">
          <div className="w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto" />
          <h2 className="text-2xl font-bold text-white">Projekt wird geladen...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#001f0e] px-4 sm:px-0 overflow-hidden relative">
      {/* Hintergrund-Animationen & Grid-Overlay bewusst unverändert */}
      <div className="relative max-w-6xl mx-auto py-12">
        <div className="flex items-center mb-8 space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-white/90 hover:bg-white/10 transition duration-300"
          >
            <ArrowLeft className="w-5 h-5 text-green-300" />
            <span>Zurück</span>
          </button>
          <div className="flex items-center text-sm text-white/50">
            <span>Projekte</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white truncate">{project.Title}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-300">
              {project.Title}
            </h1>
            <p className="text-gray-300 leading-relaxed">
              {project.Description}
            </p>

            <ProjectStats project={project} />

            <div className="flex flex-wrap gap-4">
              <a
                href={project.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/10 to-teal-400/10 hover:from-green-500/20 hover:to-teal-400/20 text-green-300 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Live-Demo</span>
              </a>
              <a
                href={project.Github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()}
                className="group relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-400/10 to-green-500/10 hover:from-teal-400/20 hover:to-green-500/20 text-teal-300 rounded-xl border border-teal-400/20 hover:border-teal-400/40 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
                <span>Github</span>
              </a>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-white/90">
                <Code2 className="w-5 h-5 text-green-300" />
                Verwendete Technologien
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.TechStack.length > 0 ? project.TechStack.map((t: string, i: number) => (
                  <TechBadge key={i} tech={t} />
                )) : (
                  <p className="text-gray-400 opacity-50">Keine Technologien hinterlegt.</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl">
              <img
                src={project.Img}
                alt={project.Title}
                className="w-full object-cover transform transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-white/90">
                <Star className="w-5 h-5 text-teal-300" />
                Hauptmerkmale
              </h3>
              {project.Features.length > 0 ? (
                <ul className="space-y-2">
                  {project.Features.map((f: string, i: number) => (
                    <FeatureItem key={i} feature={f} />
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 opacity-50">Keine Merkmale hinterlegt.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
