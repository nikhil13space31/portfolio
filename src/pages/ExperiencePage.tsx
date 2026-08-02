import ExperienceItem from '../components/ExperienceItem';
import NigstImageGallery from '../components/NigstImageGallery';

export default function ExperiencePage() {
  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-mono font-bold">01. Experience & Research</h2>
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
    </div>
  );
}
