import React, { useEffect, useState, useCallback } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  TechStack: string[];
  [key: string]: any;
}

interface CertificateData {
  id: string;
  Img: string;
  [key: string]: any;
}

type ToggleType = "projects" | "certificates";

interface ToggleButtonProps {
  onClick: () => void;
  isShowingMore: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="group px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm overflow-hidden"
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${isShowingMore ? "-translate-y-0.5" : "translate-y-0.5"} group-hover:translate-y-0`}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400/50 transition-all duration-300 group-hover:w-full" />
  </button>
);

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
  dir?: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, dir, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      dir={dir}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 1, sm: 3 } }}>{children}</Box>}
    </div>
  );
};

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "java.svg", language: "Java" },
  { icon: "typescript.svg", language: "TypeScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "lua.svg", language: "Lua" },
  { icon: "csharp.svg", language: "C#" },
  { icon: "cplusplus.svg", language: "C++" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "mui.svg", language: "Material UI" },
  { icon: "nodejs.svg", language: "NodeJS" },
  { icon: "appsscript.svg", language: "Apps Script" },
];

const FullWidthTabs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const initialItems = isMobile ? 4 : 6;

  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const projectCollection = collection(db, "projects");
      const certificateCollection = collection(db, "certificates");

      const [projectSnapshot, certificateSnapshot] = await Promise.all([
        getDocs(projectCollection),
        getDocs(certificateCollection),
      ]);

      const projectData: Project[] = projectSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        TechStack: doc.data().TechStack || [],
      } as Project));

      const certificateData: CertificateData[] = certificateSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as CertificateData));

      setProjects(projectData);
      setCertificates(certificateData);

      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const toggleShowMore = (type: ToggleType) => {
    if (type === "projects") setShowAllProjects(prev => !prev);
    else setShowAllCertificates(prev => !prev);
  };

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <section className="md:px-10 px-5 w-full mt-12 overflow-hidden" id="Portfolio">
      <div className="text-center pb-10" data-aos="fade-up">
        <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
          Portfolio Showcase
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-base mt-2">
          Discover my projects, certifications, and technical expertise in Full-Stack development.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: 70,
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: 600,
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s",
                padding: "20px 0",
                zIndex: 1,
                margin: 1,
                borderRadius: "12px",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "rgba(34,197,94,0.1)",
                  transform: "translateY(-2px)",
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(14,165,233,0.2))",
                  boxShadow: "0 4px 15px -3px rgba(34,197,94,0.2)",
                },
              },
              "& .MuiTabs-indicator": { height: 0 },
              "& .MuiTabs-flexContainer": { gap: 1 },
            }}
          >
            <Tab icon={<Code className="mb-2 w-5 h-5" />} label="Projects" />
            <Tab icon={<Award className="mb-2 w-5 h-5" />} label="Certificates" />
            <Tab icon={<Boxes className="mb-2 w-5 h-5" />} label="Tech Stack" />
          </Tabs>
        </AppBar>

        <SwipeableViews index={value} onChangeIndex={setValue} axis={theme.direction === "rtl" ? "x-reverse" : "x"}>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedProjects.map((project, idx) => (
                <div
                  key={project.id}
                  data-aos={idx % 3 === 0 ? "fade-up-right" : idx % 3 === 1 ? "fade-up" : "fade-up-left"}
                  data-aos-duration={1000 + (idx % 3) * 200}
                >
                  <CardProject Img={""} Title={""} Description={""} {...project} />
                </div>
              ))}
            </div>
            {projects.length > initialItems && (
              <div className="mt-6">
                <ToggleButton onClick={() => toggleShowMore("projects")} isShowingMore={showAllProjects} />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {displayedCertificates.map((cert, idx) => (
                <div
                  key={cert.id}
                  data-aos={idx % 3 === 0 ? "fade-up-right" : idx % 3 === 1 ? "fade-up" : "fade-up-left"}
                  data-aos-duration={1000 + (idx % 3) * 200}
                >
                  <Certificate ImgSertif={cert.Img} />
                </div>
              ))}
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6">
                <ToggleButton onClick={() => toggleShowMore("certificates")} isShowingMore={showAllCertificates} />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {techStacks.map((stack, idx) => (
                <div
                  key={stack.language}
                  data-aos={idx % 3 === 0 ? "fade-up-right" : idx % 3 === 1 ? "fade-up" : "fade-up-left"}
                  data-aos-duration={1000 + (idx % 3) * 200}
                >
                  <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                </div>
              ))}
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </section>
  );
};

export default FullWidthTabs;