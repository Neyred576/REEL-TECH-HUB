import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, MessageSquare, FileText, MapPin, Phone, Building } from "lucide-react";
import bannerImage from "@/assets/detail-meadow-1.jpg";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const WHATSAPP_NUMBER = "2348067029444";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your name and email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const formattedMessage = `*NEW INQUIRY — REEL TECH HUB*
━━━━━━━━━━━━━━━━━━━━
👤 *Full Name:* ${formData.name.trim()}
📧 *Corporate Email:* ${formData.email.trim()}
📌 *Subject / Focus:* ${formData.subject.trim() || "General Inquiry"}

📝 *Inquiry Details:*
${formData.message.trim() || "No specific details provided."}
━━━━━━━━━━━━━━━━━━━━
_Sent via REEL Tech Hub Contact Page_`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(formattedMessage)}`;

    toast({
      title: "Opening WhatsApp",
      description: "Transferring your inquiry to our technology desk on WhatsApp.",
    });

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />

      {/* Hero Header with Parallax */}
      <div className="relative w-full h-[45vh] overflow-hidden bg-black">
        <motion.img
          src={bannerImage}
          alt="REEL Tech Hub Contact"
          style={{ y }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-[120%] object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10">
          <span className="text-[11px] uppercase tracking-widest text-white/80 font-semibold mb-2">
            A Royalty Executive Empire Division
          </span>
          <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Contact REEL Tech Hub
          </h1>
        </div>
      </div>

      <main className="py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-foreground text-[11px] uppercase tracking-wider font-medium mb-4">
                <Building className="w-3.5 h-3.5" />
                Headquarters
              </div>
              <h2 className="text-2xl font-light text-foreground tracking-tight mb-3">
                Let's Discuss Your Technology Roadmap
              </h2>
              <p className="text-xs text-muted-foreground font-light leading-relaxed mb-6">
                Whether you need enterprise IT modernization, staff capacity building,
                or commercial-grade laptop and workstation procurement, our team is at your service.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground font-light">
                  Plaza 30, Alatishe, Along Lekki-Epe Expressway, Ibeju-Lekki, Lagos State, Nigeria
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-foreground shrink-0" />
                <p className="text-xs text-muted-foreground font-light">
                  <a href="tel:+2348067029444" className="hover:text-foreground">
                    +234 806 702 9444
                  </a>{" "}
                  &bull;{" "}
                  <a href="tel:+2349118024521" className="hover:text-foreground">
                    +234 911 802 4521
                  </a>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-foreground shrink-0" />
                <p className="text-xs text-muted-foreground font-light">
                  <a href="mailto:admin@reelholding.com.ng" className="hover:text-foreground">
                    admin@reelholding.com.ng
                  </a>
                </p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="https://wa.me/2348067029444?text=Hello%20REEL%20Tech%20Hub,%20I%20would%20like%20to%20inquire%20about%20your%20services%20and%20hardware"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-6 rounded-full text-xs font-semibold hover:bg-[#20ba59] transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Direct (+234 806 702 9444)
              </a>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-7">
            <Card className="p-8 lg:p-10 shadow-soft border border-border bg-card">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-1.5 mb-2 text-card-foreground text-[11px] uppercase tracking-wider font-normal">
                    <User className="h-3 w-3" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. Adebayo Williams"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    className="rounded-md text-xs font-light"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-1.5 mb-2 text-card-foreground text-[11px] uppercase tracking-wider font-normal">
                    <Mail className="h-3 w-3" />
                    Corporate Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={255}
                    className="rounded-md text-xs font-light"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="flex items-center gap-1.5 mb-2 text-card-foreground text-[11px] uppercase tracking-wider font-normal">
                    <MessageSquare className="h-3 w-3" />
                    Subject / Project Focus
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="e.g. Enterprise Hardware Procurement or Digital Training"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    maxLength={200}
                    className="rounded-md text-xs font-light"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="flex items-center gap-1.5 mb-2 text-card-foreground text-[11px] uppercase tracking-wider font-normal">
                    <FileText className="h-3 w-3" />
                    Inquiry Details
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Describe your organization's technical needs..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    maxLength={1000}
                    rows={4}
                    className="rounded-md resize-none text-xs font-light"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90 text-[11px] uppercase tracking-wider font-medium py-3"
                >
                  {isSubmitting ? "Sending..." : "Submit Inquiry"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
