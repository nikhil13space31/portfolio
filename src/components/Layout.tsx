import React, { useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import GeoCursor from './GeoCursor';
import WaterRipples from './WaterRipples';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-mono text-primary font-bold tracking-tighter text-lg flex items-center gap-1 hover:opacity-80 transition-opacity">
            NK_ <span className="text-xs text-muted-foreground font-normal hidden sm:inline">| GeoAI Portfolio</span>
          </Link>
          <nav className="flex gap-4 md:gap-6 font-mono text-xs md:text-sm overflow-x-auto py-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `transition-colors whitespace-nowrap ${isActive ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-muted-foreground hover:text-primary'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/experience"
              className={({ isActive }) =>
                `transition-colors whitespace-nowrap ${isActive ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-muted-foreground hover:text-primary'}`
              }
            >
              01. Experience
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `transition-colors whitespace-nowrap ${isActive ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-muted-foreground hover:text-primary'}`
              }
            >
              02. Projects
            </NavLink>
            <NavLink
              to="/skills"
              className={({ isActive }) =>
                `transition-colors whitespace-nowrap ${isActive ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-muted-foreground hover:text-primary'}`
              }
            >
              03. Skills
            </NavLink>
            <NavLink
              to="/education"
              className={({ isActive }) =>
                `transition-colors whitespace-nowrap ${isActive ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-muted-foreground hover:text-primary'}`
              }
            >
              04. Education
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `transition-colors whitespace-nowrap ${isActive ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-muted-foreground hover:text-primary'}`
              }
            >
              05. Contact
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24">
        {children}
      </main>

      <footer className="border-t border-border/50 py-8 text-center text-muted-foreground font-mono text-sm">
        <p>Built for Nikhil Satya Vardhan Kada — Geo-Informatics & AI Engineer</p>
      </footer>
    </div>
  );
}
