import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code2, GraduationCap, Building2, ShieldCheck, ArrowRight } from "lucide-react";

const capabilities = [
  {
    icon: Code2,
    title: "Enterprise Digital Transformation",
    tagline: "Modernize Legacy Infrastructure & Workflows",
    description:
      "We partner with organizations to redesign operational processes, modernize legacy databases, build custom digital platforms, and transition enterprise workflows into high-speed, scalable digital environments.",
  },
  {
    icon: GraduationCap,
    title: "Technical Skills Training & Capacity Building",
    tagline: "Workforce Readiness for Modern Africa",
    description:
      "Practical, intensive technical training programs in software engineering, cloud systems, and data analytics designed to upskill corporate teams and produce elite African tech talent.",
  },
  {
    icon: Building2,
    title: "Executive Smart Office & IoT Solutions",
    tagline: "Intelligent Connected Workspaces",
    description:
      "Designing and deploying automated boardroom technology, smart presentation displays, video conferencing hubs, and IoT-driven workplace environments built for modern executives.",
  },
  {
    icon: ShieldCheck,
    title: "Systems Integration & Managed IT Support",
    tagline: "High-Availability Infrastructure",
    description:
      "Enterprise networking, structured cabling, cybersecurity auditing, and 24/7 technical systems integration that eliminate downtime and ensure zero business friction.",
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="solutions" className="py-28 lg:py-36 bg-secondary/30 relative" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3 block font-semibold">
            Our Core Offerings
          </span>
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-foreground tracking-tight">
            Engineered for Modern Enterprise Execution
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
            As the flagship technology division of Royalty Executive Empire Limited (REEL),
            we bridge the gap between strategic corporate intent and robust technical execution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative overflow-hidden bg-card/90 backdrop-blur-md border border-border/80 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:border-foreground/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground group-hover:scale-105 transition-transform">
                      <Icon className="h-6 w-6 stroke-[1.5]" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-foreground tracking-tight">
                        {cap.title}
                      </h3>
                      <span className="text-[11px] font-normal text-muted-foreground">
                        {cap.tagline}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground font-light leading-relaxed mb-6">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                    Royalty Executive Empire
                  </span>
                  <button
                    onClick={() =>
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-xs font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    Consult With Us
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
