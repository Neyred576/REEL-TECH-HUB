import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Mail, MessageSquare, Send, CheckCircle2, Building, Radio } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Enterprise Digital Transformation",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState("");

  const WHATSAPP_NUMBER = "2348067029444";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Please fill in your name and corporate email.");
      return;
    }

    setIsSubmitting(true);

    const formattedMessage = `*NEW INQUIRY — REEL TECH HUB*
━━━━━━━━━━━━━━━━━━━━
👤 *Full Name:* ${formData.name.trim()}
📧 *Corporate Email:* ${formData.email.trim()}
📞 *Phone Number:* ${formData.phone.trim() || "Not provided"}
🎯 *Area of Interest:* ${formData.interest}

📝 *Project / Procurement Details:*
${formData.message.trim() || "No specific details provided."}
━━━━━━━━━━━━━━━━━━━━
_Sent via REEL Tech Hub Online Portal_`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(formattedMessage)}`;
    setLastWhatsappUrl(whatsappUrl);

    toast.success("Opening WhatsApp with your formatted inquiry...");

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <section id="contact" className="py-28 lg:py-36 bg-background relative" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3 block font-semibold">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-foreground tracking-tight">
            Consult With REEL Tech Hub
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
            Ready to modernize your operations or procure commercial-grade computing?
            Connect directly with our technology and hardware leads.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Corporate Information Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-foreground text-[11px] uppercase tracking-wider font-medium mb-6">
                <Building className="w-3.5 h-3.5" />
                Royalty Executive Empire Limited
              </div>

              <h3 className="text-2xl font-light text-foreground tracking-tight mb-4">
                Institutional Integrity & Flawless Execution
              </h3>
              <p className="text-xs text-muted-foreground font-light leading-relaxed mb-8">
                Every client engagement carries REEL's commitment to premium quality,
                dedicated support, and measurable business impact across Nigeria, Africa, and global markets.
              </p>

              {/* Contact Details List */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-foreground uppercase tracking-wider">
                      Head Office &mdash; Nigeria
                    </h4>
                    <p className="text-xs text-muted-foreground font-light mt-1 leading-relaxed">
                      Plaza 30, Alatishe, Along Lekki-Epe Expressway, Ibeju-Lekki, Lagos State, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-foreground uppercase tracking-wider">
                      Direct Telephones
                    </h4>
                    <p className="text-xs text-muted-foreground font-light mt-1">
                      <a href="tel:+2348067029444" className="hover:text-foreground transition-colors">
                        +234 806 702 9444
                      </a>{" "}
                      &bull;{" "}
                      <a href="tel:+2349118024521" className="hover:text-foreground transition-colors">
                        +234 911 802 4521
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-foreground uppercase tracking-wider">
                      Official Inquiries
                    </h4>
                    <p className="text-xs text-muted-foreground font-light mt-1">
                      <a href="mailto:admin@reelholding.com.ng" className="hover:text-foreground transition-colors">
                        admin@reelholding.com.ng
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp & Channel Actions */}
            <div className="mt-8 pt-6 border-t border-border space-y-3">
              <a
                href="https://wa.me/2348067029444?text=Hello%20REEL%20Tech%20Hub,%20I%20would%20like%20to%20inquire%20about%20your%20services%20and%20hardware"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] text-white py-3 px-6 rounded-full text-xs font-semibold hover:bg-[#20ba59] transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Chat Instantly on WhatsApp (+234 806 702 9444)
              </a>

              <a
                href="https://whatsapp.com/channel/0029Vb8f98uFsn0ZxQtIix05"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-foreground/5 hover:bg-foreground/10 text-foreground border border-border py-3 px-6 rounded-full text-xs font-medium transition-all"
              >
                <Radio className="w-4 h-4 text-[#25D366]" />
                Join Our WhatsApp Channel for Daily Tech & Hardware Updates
              </a>
            </div>
          </motion.div>

          {/* Interactive Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="bg-card border border-border rounded-2xl p-8 lg:p-10 shadow-soft">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-12 h-12 text-[#25D366] mx-auto mb-4" />
                  <h3 className="text-xl font-normal text-foreground mb-2">
                    Inquiry Directed to WhatsApp
                  </h3>
                  <p className="text-xs text-muted-foreground font-light max-w-sm mx-auto mb-6 leading-relaxed">
                    Your inquiry details have been formatted and directed to our official WhatsApp line (+234 806 702 9444).
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    {lastWhatsappUrl && (
                      <a
                        href={lastWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#20ba59] transition-all shadow-sm"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Re-open WhatsApp
                      </a>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          interest: "Enterprise Digital Transformation",
                          message: "",
                        });
                      }}
                    >
                      Send Another Inquiry
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="c-name" className="text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
                        Full Name *
                      </Label>
                      <Input
                        id="c-name"
                        placeholder="e.g. Adebayo Williams"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="c-email" className="text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
                        Corporate Email *
                      </Label>
                      <Input
                        id="c-email"
                        type="email"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="c-phone" className="text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
                        Phone Number
                      </Label>
                      <Input
                        id="c-phone"
                        type="tel"
                        placeholder="+234 ..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="c-interest" className="text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
                        Area of Interest
                      </Label>
                      <Select
                        value={formData.interest}
                        onValueChange={(val) => setFormData({ ...formData, interest: val })}
                      >
                        <SelectTrigger className="text-xs">
                          <SelectValue placeholder="Select Area" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Enterprise Digital Transformation">
                            Enterprise Digital Transformation
                          </SelectItem>
                          <SelectItem value="Enterprise Hardware Procurement">
                            Hardware & Computing Procurement
                          </SelectItem>
                          <SelectItem value="Technical Skills Training">
                            Technical Skills Training
                          </SelectItem>
                          <SelectItem value="Smart Office Solutions">
                            Smart Office & IoT Solutions
                          </SelectItem>
                          <SelectItem value="General Strategic Inquiry">
                            General Strategic Inquiry
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="c-message" className="text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
                      Project or Procurement Details
                    </Label>
                    <Textarea
                      id="c-message"
                      rows={4}
                      placeholder="Tell us about your organization's technical needs, timeline, or equipment requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="text-xs resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full py-3 text-xs uppercase tracking-wider font-medium bg-foreground text-background hover:bg-foreground/90 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Inquiry to REEL Tech Hub"}
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

