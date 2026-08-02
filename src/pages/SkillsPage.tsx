import SkillCategory from '../components/SkillCategory';

export default function SkillsPage() {
  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-mono font-bold">03. Technical Capabilities & Arsenal</h2>
        <div className="h-px bg-border flex-1"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <SkillCategory
          index={0}
          title="Geospatial / GIS"
          items={["ArcGIS Pro", "QGIS", "Google Earth Engine", "ERDAS Imagine", "GeoPandas"]}
        />
        <SkillCategory
          index={1}
          title="Remote Sensing"
          items={["UAV Processing", "Satellite Imagery", "Orthorectification", "OBIA", "LULC Analytics"]}
        />
        <SkillCategory
          index={2}
          title="Programming"
          items={["Python", "SQL / MySQL", "Java", "HTML / CSS / JS", "TypeScript"]}
        />
        <SkillCategory
          index={3}
          title="ML & Deep Learning"
          items={["SAM 3 (ViT-H)", "U-Net ResNet34", "Geospatial Clustering", "Predictive Modeling", "PyTorch"]}
        />
      </div>
    </div>
  );
}
