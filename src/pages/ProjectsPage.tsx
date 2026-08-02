import { Map, Layers, MonitorPlay } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-mono font-bold">02. Selected Work & GeoAI Platforms</h2>
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
    </div>
  );
}
