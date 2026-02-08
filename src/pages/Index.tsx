import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import WaveBackground from '@/components/WaveBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import SkillsSection from '@/components/SkillsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ChatbotSection from '@/components/ChatbotSection';
import AwardsSection from '@/components/AwardsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollButtons from '@/components/ScrollButtons';

const Index = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <WaveBackground />
        <div className="relative z-[2]">
          <Navbar />
          <HeroSection />
          <ScrollButtons />
          <div className="container mx-auto px-4 md:px-6 py-12 space-y-8 md:space-y-16">
            <AboutSection />
            <ExperienceSection />
            <EducationSection />
            <SkillsSection />
            <CertificationsSection />
            <ProjectsSection />
            <ChatbotSection />
            <AwardsSection />
            <ContactSection />
          </div>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
