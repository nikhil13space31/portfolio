import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Map, Layers, ExternalLink, Code2, MonitorPlay, Mail, MapPin, Send, Check, Copy, MessageSquare, Sparkles, X, Maximize2, Phone } from 'lucide-react';

import img1 from './imports/1774869242215.jpg';
import img2 from './imports/1774869242357.jpg';
import img3 from './imports/1774869246661.jpg';
import img4 from './imports/1774869248707.jpg';
import img5 from './imports/1774869274403.jpg';
import img6 from './imports/1774869274954.jpg';

function GeoCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('a') ||
          target.closest('button'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Small Glowing Green Ball Cursor */}
      <motion.div
        className="fixed bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#00ff66,0_0_5px_#00ff66]"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          scale: isHovered ? 1.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 900, damping: 40, mass: 0.1 }}
        style={{ left: 0, top: 0, width: 12, height: 12 }}
      />
    </div>
  );
}

function WaterRipples() {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let lastSpawnTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Spawn a ripple every 60ms to create a smooth trail
      if (now - lastSpawnTime > 60) {
        lastSpawnTime = now;
        setRipples((prev) => [
          ...prev.slice(-15), // Keep max 15 ripples at a time to prevent lag
          { x: e.clientX, y: e.clientY, id: now },
        ]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0.5, scale: 0, borderWidth: '2px' }}
            animate={{ opacity: 0, scale: 2.5, borderWidth: '0px' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute w-16 h-16 border-primary rounded-full mix-blend-screen"
            style={{ left: r.x - 32, top: r.y - 32 }}
            onAnimationComplete={() => {
              setRipples((prev) => prev.filter((item) => item.id !== r.id));
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <GeoCursor />
      <WaterRipples />
      
      {/* Grid Background Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-screen"
           style={{ backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-mono text-primary font-bold tracking-tighter text-lg">NK_</span>
          <nav className="hidden md:flex gap-6 font-mono text-sm">
            <a href="#experience" className="hover:text-primary transition-colors">01. Experience</a>
            <a href="#projects" className="hover:text-primary transition-colors">02. Projects</a>
            <a href="#skills" className="hover:text-primary transition-colors">03. Skills</a>
            <a href="#education" className="hover:text-primary transition-colors">04. Education</a>
            <a href="#contact" className="hover:text-primary transition-colors">05. Contact</a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24 space-y-32">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col justify-center relative">
          {/* Floating decorative elements */}
          <motion.div 
            className="absolute top-1/4 right-[10%] w-32 h-32 border border-primary/30 rounded-full z-0"
            animate={{ y: [0, -30, 0], rotate: [0, 45, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/3 left-[5%] w-24 h-24 border border-border/50 rotate-45 z-0"
            animate={{ y: [0, 20, 0], rotate: [45, 90, 45] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <motion.div style={{ opacity, y }} className="relative z-10">
            <div className="font-mono text-primary mb-4">&gt; Hello, world. I am</div>
            <h1 className="text-5xl md:text-7xl font-bold font-mono tracking-tighter mb-4 uppercase leading-tight">
              Nikhil Satya<br/>Vardhan Kada
            </h1>
            <h2 className="text-2xl md:text-4xl text-muted-foreground font-mono mb-8">
              Geo-Informatics Engineer & AI Specialist.
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed mb-10">
              Geo-Informatics Engineer specializing in geospatial analysis, remote sensing, and deep learning for location intelligence. Building scalable GeoAI pipelines and processing UAV/satellite imagery to solve real-world analytical problems.
            </p>
            <div className="flex flex-wrap gap-4 font-mono">
              <a href="#contact" className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors z-20 relative">
                <Mail className="w-4 h-4" /> Reach Out
              </a>
              <a href="https://github.com/nikhil13space31" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 border border-border hover:border-primary hover:text-primary transition-colors z-20 relative bg-background/50">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.082.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/nikhil-satya-vardhan-kada/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 border border-border hover:border-primary hover:text-primary transition-colors z-20 relative bg-background/50">
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
                "Generated georeferenced GeoJSON outputs (EPSG:32644) validating scalable geospatial analytics on NVIDIA RTX A5000 GPUs."
              ]}
              customEmbed={<NigstImageGallery />}
            />
            
            <ExperienceItem 
              title="GIS Analyst Intern"
              company="VMRDA – Govt. of Andhra Pradesh"
              date="May 2025 – Jul 2025"
              description={[
                "Supported GIS-based spatial analysis and geospatial data management for Master Plan 2041 urban development planning using ArcGIS Pro.",
                "Analyzed public objections and policy inputs through spatial overlays while ensuring QA/QC and data integrity across planning layers."
              ]}
            />

            <ExperienceItem 
              title="AI & Cloud Intern"
              company="Edunet Foundation (AICTE)"
              date="Jun 2024 – Jul 2024"
              description={[
                "Deployed a college Chatbot leveraging IBM Cloud AI services.",
                "Gained exposure to AI workflows, cloud-based data pipelines, and enterprise-grade deployment practices."
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
            <SkillCategory index={0} title="Geospatial / GIS" items={["ArcGIS Pro", "QGIS", "Google Earth Engine", "ERDAS Imagine", "GeoPandas"]} />
            <SkillCategory index={1} title="Remote Sensing" items={["UAV Processing", "Satellite Imagery", "Orthorectification", "OBIA"]} />
            <SkillCategory index={2} title="Programming" items={["Python", "SQL / MySQL", "Java", "HTML / CSS / JS"]} />
            <SkillCategory index={3} title="ML & Analytics" items={["Deep Learning", "Geospatial Clustering", "Predictive Modeling"]} />
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
              <div className="text-muted-foreground font-mono mt-4 md:mt-0 text-right">
                <div className="text-primary font-semibold">Graduated</div>
                <div>2022 — 2026</div>
                <div>CGPA: 7.94 / 10</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact / Reach Out Section */}
        <ContactSection />
      </main>
      
      <footer className="border-t border-border/50 py-8 text-center text-muted-foreground font-mono text-sm">
        <p>Built for Nikhil Satya Vardhan Kada</p>
      </footer>
    </div>
  );
}

function NigstImageGallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const images = [
    { src: img1, alt: "NIGST Survey of India - UAV Orthorectified Imagery Processing" },
    { src: img2, alt: "NIGST Survey of India - Building Footprint Segmentation Results" },
    { src: img3, alt: "NIGST Survey of India - Deep Learning Pipeline Architecture" },
    { src: img4, alt: "NIGST Survey of India - Road Network Extraction Validation" },
    { src: img5, alt: "NIGST Survey of India - Georeferenced GeoJSON Spatial Outputs" },
    { src: img6, alt: "NIGST Survey of India - Model Evaluation on NVIDIA RTX A5000" },
  ];

  return (
    <div className="mt-6 space-y-4 w-full">
      {/* 3x2 Grid Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImg(img.src)}
            className="group relative h-40 overflow-hidden border border-border bg-black/50 cursor-pointer hover:border-primary transition-all duration-300"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="p-2 bg-background/80 text-primary border border-primary/40 rounded-full backdrop-blur-sm">
                <Maximize2 className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Direct LinkedIn Post Button */}
      <div className="pt-2 flex items-center gap-3">
        <a
          href="https://lnkd.in/p/gizsSsGQ"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-mono font-bold text-xs hover:bg-primary/90 transition-colors z-20 relative shadow-sm"
        >
          <ExternalLink className="w-4 h-4" /> View it on LinkedIn
        </a>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative max-w-5xl max-h-[90vh] overflow-hidden border border-primary/50 bg-background/95 p-2">
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 p-2 bg-background/80 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors z-50 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <img src={selectedImg} alt="Enlarged view" className="max-w-full max-h-[82vh] object-contain mx-auto" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ExperienceItem({ title, company, date, description, imagePlaceholder, customEmbed }: { title: string, company: string, date: string, description: string[], imagePlaceholder?: string, customEmbed?: React.ReactNode }) {
  return (
    <div className="relative group">
      {/* Timeline dot */}
      <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3 h-3 bg-background border-2 border-primary rounded-full group-hover:bg-primary transition-colors z-10" />
      
      <div className="mb-2 flex flex-col md:flex-row md:justify-between md:items-baseline">
        <h4 className="text-xl font-bold text-foreground">
          {title} <span className="text-primary">@ {company}</span>
        </h4>
        <span className="text-sm font-mono text-muted-foreground mt-1 md:mt-0">{date}</span>
      </div>
      
      <ul className="space-y-3 mt-4">
        {description.map((item, i) => (
          <li key={i} className="text-muted-foreground flex items-start">
            <span className="text-primary mr-2 mt-1">▹</span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>

      {customEmbed && (
        <div className="mt-6 z-20 relative">
          {customEmbed}
        </div>
      )}

      {imagePlaceholder && !customEmbed && (
        <div className="mt-6 border border-border border-dashed p-12 flex flex-col items-center justify-center text-center bg-muted/10 z-20 relative">
          <Layers className="w-8 h-8 text-muted-foreground mb-4" />
          <p className="text-sm font-mono text-muted-foreground max-w-sm">
            {imagePlaceholder}
            <br/><br/>
            (Please upload the results/photos so I can update this component!)
          </p>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ title, tags, description, link, icon, index = 0 }: { title: string, tags: string[], description: string, link?: string, icon: React.ReactNode, index?: number }) {
  return (
    <motion.div 
      animate={{ y: [0, -8, 0] }}
      transition={{ 
        duration: 5 + (index % 3), 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: index * 0.5
      }}
      className="border border-border bg-muted/20 p-6 flex flex-col group hover:border-primary transition-colors h-full"
    >
      <div className="flex justify-between items-start mb-6">
        {icon}
        {link && (
          <a href={link} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-1" title="Open Link">
            <ExternalLink className="w-5 h-5" />
          </a>
        )}
      </div>
      
      <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-3 font-mono text-xs text-primary mb-4">
        {tags.map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
      </div>

      {link && (
        <div className="pt-2 border-t border-border/50">
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-primary hover:underline group-hover:translate-x-1 transition-all"
          >
            Visit Live Platform <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </motion.div>
  );
}

function SkillCategory({ title, items, index = 0 }: { title: string, items: string[], index?: number }) {
  return (
    <motion.div 
      animate={{ y: [0, -6, 0] }}
      transition={{ 
        duration: 4 + (index % 2), 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: index * 0.3
      }}
      className="border border-border p-4 bg-background h-full"
    >
      <h4 className="font-mono text-sm text-primary mb-4 border-b border-border/50 pb-2">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-muted-foreground flex items-center before:content-['▹'] before:text-primary before:mr-2">
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'GeoAI Collaboration', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('nikhilsatyavardhan@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+91 8309531498');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      const mailtoUrl = `mailto:nikhilsatyavardhan@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Inquiry] ${formData.subject} - ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.subject}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <section id="contact" className="mb-12">
      <div className="flex items-center gap-4 mb-12">
        <h3 className="text-3xl font-mono font-bold">05. Reach Out</h3>
        <div className="h-px bg-border flex-1"></div>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Information & Social Cards */}
        <div className="md:col-span-5 space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Interested in geospatial AI models, remote sensing pipelines, or research collaboration? Send me a message or connect directly.
          </p>

          {/* Availability Badge */}
          <div className="p-4 border border-primary/30 bg-primary/5 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="font-mono text-xs text-primary font-medium">
              Open for AI/ML & Geo-Informatics Opportunities
            </span>
          </div>

          {/* Direct Email */}
          <div className="border border-border p-5 bg-muted/10 hover:border-primary/50 transition-colors">
            <div className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">Direct Email</div>
            <div className="flex items-center justify-between gap-2 mt-1">
              <span className="font-mono text-sm font-semibold truncate text-foreground">nikhilsatyavardhan@gmail.com</span>
              <button
                onClick={handleCopyEmail}
                className="p-2 border border-border hover:border-primary hover:text-primary transition-colors flex items-center gap-1 font-mono text-xs cursor-pointer shrink-0"
                title="Copy Email"
              >
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* GitHub Repository */}
          <a
            href="https://github.com/nikhil13space31"
            target="_blank"
            rel="noreferrer"
            className="border border-border p-5 bg-muted/10 hover:border-primary transition-colors flex items-center justify-between group"
          >
            <div>
              <div className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">GitHub Profile</div>
              <div className="font-mono text-sm font-semibold group-hover:text-primary transition-colors flex items-center gap-2">
                github.com/nikhil13space31 <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="p-2 border border-border group-hover:border-primary text-muted-foreground group-hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.082.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </div>
          </a>

          {/* LinkedIn Profile */}
          <a
            href="https://www.linkedin.com/in/nikhil-satya-vardhan-kada/"
            target="_blank"
            rel="noreferrer"
            className="border border-border p-5 bg-muted/10 hover:border-primary transition-colors flex items-center justify-between group"
          >
            <div>
              <div className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">LinkedIn Profile</div>
              <div className="font-mono text-sm font-semibold group-hover:text-primary transition-colors flex items-center gap-2">
                nikhil-satya-vardhan-kada <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="p-2 border border-border group-hover:border-primary text-muted-foreground group-hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </div>
          </a>

          {/* Location & Geo Coordinates */}
          <div className="border border-border p-5 bg-muted/10">
            <div className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">Location & Coordinates</div>
            <div className="font-mono text-sm font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Kakinada, Andhra Pradesh, India
            </div>
            <div className="font-mono text-xs text-primary/80 mt-2">
              [LAT: 16.9891° N | LON: 82.2475° E]
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7">
          <div className="border border-border p-6 md:p-8 bg-muted/10 relative">
            <h4 className="text-xl font-mono font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" /> Direct Communication Pipeline
            </h4>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center border border-primary/40 bg-primary/10 space-y-4"
              >
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h5 className="font-mono text-xl font-bold text-primary">Email Client Dispatch Ready!</h5>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Your message was formatted and dispatched to your email client. If it didn't open automatically, you can email directly at <span className="text-primary font-mono">nikhilsatyavardhan@gmail.com</span>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'GeoAI Collaboration', message: '' });
                  }}
                  className="px-4 py-2 border border-border text-xs font-mono hover:border-primary hover:text-primary transition-colors mt-2 cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Alex Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-3 text-sm font-sans focus:outline-none focus:border-primary text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-3 text-sm font-sans focus:outline-none focus:border-primary text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase">Topic / Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-background border border-border px-4 py-3 text-sm font-sans focus:outline-none focus:border-primary text-foreground cursor-pointer"
                  >
                    <option value="GeoAI Collaboration">GeoAI / Deep Learning Collaboration</option>
                    <option value="Job / Internship Opportunity">Job / Internship Opportunity</option>
                    <option value="GIS & UAV Query">GIS & UAV Data Processing Query</option>
                    <option value="General Inquiry">General Networking / Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your project, inquiry, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-background border border-border px-4 py-3 text-sm font-sans focus:outline-none focus:border-primary text-foreground resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-primary text-primary-foreground font-mono font-bold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" /> Transmitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
