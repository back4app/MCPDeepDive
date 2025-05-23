
import { Navbar } from '@/components/navigation/Navbar';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { ChallengeShowcase } from '@/components/home/ChallengeShowcase';
import { Testimonials } from '@/components/home/Testimonials';
import { HowItWorks } from '@/components/home/HowItWorks';
import { CallToAction } from '@/components/home/CallToAction';
import { Footer } from '@/components/navigation/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <ChallengeShowcase />
        <HowItWorks />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
