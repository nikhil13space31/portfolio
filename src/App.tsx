import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, MapPin, Map, Layers, MonitorPlay } from 'lucide-react';
import GeoCursor from './components/GeoCursor';
import WaterRipples from './components/WaterRipples';
import ExperienceItem from './components/ExperienceItem';
import NigstImageGallery from './components/NigstImageGallery';
import ProjectCard from './components/ProjectCard';
import SkillCategory from './components/SkillCategory';
import ContactSection from './components/ContactSection';

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <GeoCursor />
      <WaterRipples />

      {/* Grid Background Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-screen"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Header Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-mono text-primary font-bold tracking-tighter text-lg">
            NK_
          </a>
          <nav className="hidden md:flex gap-6 font-mono text-sm">
            <a href="#experience" className="hover:text-primary transition-colors">
              01. Experience
            </a>
            <a href="#projects" className="hover:text-primary transition-colors">
              02. Projects
            </a>
            <a href="#skills" className="hover:text-primary transition-colors">
              03. Skills
            </a>
            <a href="#education" className="hover:text-primary transition-colors">
              04. Education
            </a>
            <a href="#contact" className="hover:text-primary transition-colors">
              05. Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Main Single Page Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24 space-y-32">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col justify-center relative">
          {/* Floating decorative elements */}
          <motion.div
            className="absolute top-1/4 right-[10%] w-32 h-32 border border-primary/30 rounded-full z-0"
            animate={{ y: [0, -30, 0], rotate: [0, 45, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/3 left-[5%] w-24 h-24 border border-border/50 rotate-45 z-0"
            animate={{ y: [0, 20, 0], rotate: [45, 90, 45] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          <motion.div style={{ opacity, y }} className="relative z-10">
            <div className="font-mono text-primary mb-4">&gt; Hello, world. I am</div>
            <h1 className="text-5xl md:text-7xl font-bold font-mono tracking-tighter mb-4 uppercase leading-tight">
              Nikhil Satya<br />Vardhan Kada
            </h1>
            <h2 className="text-2xl md:text-4xl text-muted-foreground font-mono mb-8">
              Geo-Informatics Engineer & AI Specialist.
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed mb-10">
              Geo-Informatics Engineer specializing in geospatial analysis, remote sensing, and deep learning for location intelligence. Building scalable GeoAI pipelines and processing UAV/satellite imagery to solve real-world analytical problems.
            </p>

            <div className="flex flex-wrap gap-4 font-mono">
              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors z-20 relative"
              >
                <Mail className="w-4 h-4" /> Reach Out
              </a>
              <a
                href="https://github.com/nikhil13space31"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-border hover:border-primary hover:text-primary transition-colors z-20 relative bg-background/50"
              >
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.082.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/nikhil-satya-vardhan-kada/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-border hover:border-primary hover:text-primary transition-colors z-20 relative bg-background/50"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <div className="flex items-center gap-2 px-6 py-3 text-muted-foreground z-20 relative bg-background/50">
                <MapPin className="w-4 h-4" /> Kakinada, AP, India
              </div>
            </div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience">
          <div className="flex items-center gap-4 mb-12">
            <h3 className="text-3xl font-mono font-bold">01. Experience</h3>
            <div className="h-px bg-border flex-1"></div>
          </div>

          <div className="space-y-12 border-l border-border pl-6 md:pl-10 ml-2 md:ml-4">
            <ExperienceItem
              title="Geospatial Deep Learning Intern"
              company="NIGST, Survey of India"
              date="Jan 2026 – Mar 2026"
              description={[
                "Designed an end-to-end deep learning pipeline for automated road network and building footprint extraction from UAV orthorectified imagery (106.76 km², ~7 cm GSD).",
                "Fine-tuned SAM 3 ViT-H and U-Net ResNet34 using PEFT, achieving 91.33% building IoU and 96.61% recall on unseen test regions.",
                "Generated georeferenced GeoJSON outputs (EPSG:32644) validating scalable geospatial analytics on NVIDIA RTX A5000 GPUs.",
              ]}
              customEmbed={<NigstImageGallery />}
            />

            <ExperienceItem
              title="GIS Analyst Intern"
              company="VMRDA – Govt. of Andhra Pradesh"
              date="May 2025 – Jul 2025"
              description={[
                "Supported GIS-based spatial analysis and geospatial data management for Master Plan 2041 urban development planning using ArcGIS Pro.",
                "Analyzed public objections and policy inputs through spatial overlays while ensuring QA/QC and data integrity across planning layers.",
              ]}
            />

            <ExperienceItem
              title="AI & Cloud Intern"
              company="Edunet Foundation (AICTE)"
              date="Jun 2024 – Jul 2024"
              description={[
                "Deployed a college Chatbot leveraging IBM Cloud AI services.",
                "Gained exposure to AI workflows, cloud-based data pipelines, and enterprise-grade deployment practices.",
              ]}
            />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <div className="flex items-center gap-4 mb-12">
            <h3 className="text-3xl font-mono font-bold">02. Selected Work</h3>
            <div className="h-px bg-border flex-1"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard
              index={0}
              title="OrbisNik — GeoAI Platform"
              tags={["Next.js", "FastAPI", "Google Earth Engine", "Gemini API"]}
              description="Developed a full-stack GeoAI web platform enabling natural language querying of satellite imagery for spatial and temporal parameter extraction. Built a Google Earth Engine pipeline supporting Sentinel/Landsat analysis, NDVI, EVI, and LULC classification."
              link="https://orbisnik.vercel.app"
              icon={<Map className="w-8 h-8 text-primary" />}
            />

            <ProjectCard
              index={1}
              title="Groundwater Quality Assessment"
              tags={["ArcGIS", "MCDM", "AHP", "Spatial Analysis"]}
              description="Applied Analytical Hierarchy Process and multi-criteria GIS overlay analysis to map groundwater suitability and contamination risk. Produced thematic risk maps enabling data-driven identification of high-risk zones."
              icon={<Layers className="w-8 h-8 text-primary" />}
            />

            <ProjectCard
              index={2}
              title="Cyclone Susceptibility Mapping"
              tags={["ArcGIS Pro", "Predictive Analytics", "Hackathon"]}
              description="Developed a multi-hazard susceptibility model using AHP-weighted geospatial overlays in ArcGIS Pro for disaster risk analytics. Designed an interactive tool integrating layers for real-time risk communication."
              icon={<MonitorPlay className="w-8 h-8 text-primary" />}
            />
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <div className="flex items-center gap-4 mb-12">
            <h3 className="text-3xl font-mono font-bold">03. Technical Arsenal</h3>
            <div className="h-px bg-border flex-1"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <SkillCategory
              index={0}
              title="Geospatial / GIS"
              items={["ArcGIS Pro", "QGIS", "Google Earth Engine", "ERDAS Imagine", "GeoPandas"]}
            />
            <SkillCategory
              index={1}
              title="Remote Sensing"
              items={["UAV Processing", "Satellite Imagery", "Orthorectification", "OBIA"]}
            />
            <SkillCategory
              index={2}
              title="Programming"
              items={["Python", "SQL / MySQL", "Java", "HTML / CSS / JS"]}
            />
            <SkillCategory
              index={3}
              title="ML & Analytics"
              items={["Deep Learning", "Geospatial Clustering", "Predictive Modeling"]}
            />
          </div>
        </section>

        {/* Education Section */}
        <section id="education">
          <div className="flex items-center gap-4 mb-12">
            <h3 className="text-3xl font-mono font-bold">04. Education</h3>
            <div className="h-px bg-border flex-1"></div>
          </div>

          <div className="border border-border p-8 hover:border-primary transition-colors bg-muted/20">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
              <div>
                <h4 className="text-xl font-bold">B.Tech in Geo-Informatics</h4>
                <p className="text-primary font-mono mt-1">Andhra University College of Engineering</p>
              </div>
              <div className="text-muted-foreground font-mono mt-4 md:mt-0 md:text-right">
                <div className="text-primary font-semibold">Graduated</div>
                <div>2022 — 2026</div>
                <div>CGPA: 7.94 / 10</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </main>

      <footer className="border-t border-border/50 py-8 text-center text-muted-foreground font-mono text-sm">
        <p>Built by Nikhil Satya Vardhan Kada</p>
      </footer>
    </div>
  );
}
