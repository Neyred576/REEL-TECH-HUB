import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Locations from "@/components/Locations";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navigation />
      <Hero />
      <Locations />
      <Experience />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
