import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BestSellers from "@/components/BestSellers";
import CategorySection from "@/components/CategorySection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <BestSellers />
        <CategorySection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
