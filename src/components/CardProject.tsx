import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface CardProjectProps {
  Img: string;
  Title: string;
  Description: string;
  ProjectLink?: string;
  id?: string;
}

const CardProject: React.FC<CardProjectProps> = ({ Img, Title, Description, ProjectLink, id }) => {
  // Behandlung, wenn kein Demo-Link vorhanden ist
  const handleLiveDemo = (e: React.MouseEvent) => {
    if (!ProjectLink) {
      console.log("Demo-Link nicht verfügbar");
      e.preventDefault();
      alert("Die Live-Demo ist nicht verfügbar.");
    }
  };

  // Behandlung, wenn keine Detailseite vorhanden ist
  const handleDetails = (e: React.MouseEvent) => {
    if (!id) {
      console.log("Projekt-ID nicht vorhanden");
      e.preventDefault();
      alert("Projektdetails sind nicht verfügbar.");
    }
  };

  return (
    <div className="group relative w-full">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-900/70 to-teal-900/70 backdrop-blur-sm border border-white/10 shadow-lg transition-transform duration-300 hover:shadow-green-500/20 hover:scale-105">
        {/* Subtiler Farb-Verlauf im Hintergrund bei Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-400/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300 rounded-2xl"></div>

        <div className="relative p-5 z-10">
          <div className="overflow-hidden rounded-xl">
            <img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 rounded-xl"
            />
          </div>

          <div className="mt-4 space-y-3">
            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-300">
              {Title}
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
              {Description}
            </p>

            <div className="pt-4 flex items-center justify-between">
              {ProjectLink ? (
                <a
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-green-300 hover:text-green-200 transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Live-Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-gray-600 text-sm">Demo nicht verfügbar</span>
              )}

              {id ? (
                <Link
                  to={`/projekt/${id}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400/50"
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-gray-600 text-sm">Details nicht verfügbar</span>
              )}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 border border-transparent group-hover:border-teal-400/50 rounded-2xl transition-colors duration-300"></div>
      </div>
    </div>
  );
};

export default CardProject;
