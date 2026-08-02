export default function EducationPage() {
  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-mono font-bold">04. Education & Background</h2>
        <div className="h-px bg-border flex-1"></div>
      </div>

      <div className="border border-border p-8 hover:border-primary transition-colors bg-muted/20 space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <h3 className="text-2xl font-bold font-mono">B.Tech in Geo-Informatics & AI</h3>
            <p className="text-primary font-mono mt-1 text-lg">Andhra University College of Engineering</p>
          </div>
          <div className="text-muted-foreground font-mono mt-4 md:mt-0 md:text-right">
            <div className="text-primary font-semibold text-lg">Graduated</div>
            <div>2022 — 2026</div>
            <div className="text-foreground font-bold mt-1">CGPA: 7.94 / 10</div>
          </div>
        </div>

        <div className="pt-6 border-t border-border/50 grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-mono text-sm text-primary mb-3 uppercase tracking-wider">Key Coursework</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-mono">
              <li className="flex items-center gap-2"><span className="text-primary">▹</span> Remote Sensing & Image Interpretation</li>
              <li className="flex items-center gap-2"><span className="text-primary">▹</span> Geographic Information Systems (GIS)</li>
              <li className="flex items-center gap-2"><span className="text-primary">▹</span> Geospatial Machine & Deep Learning</li>
              <li className="flex items-center gap-2"><span className="text-primary">▹</span> Photogrammetry & UAV Surveying</li>
              <li className="flex items-center gap-2"><span className="text-primary">▹</span> Spatial Data Infrastructures & Analysis</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm text-primary mb-3 uppercase tracking-wider">Focus & Specialization</h4>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              Specialized in combining classical spatial analysis methods with modern deep learning computer vision architectures (Segment Anything Model, ViT, U-Net) for automated spatial extraction and high-resolution Earth observation data processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
