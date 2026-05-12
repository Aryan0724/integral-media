import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Services } from "@/components/home/Services";
import { CaseStudies } from "@/components/home/CaseStudies";
import { Process } from "@/components/home/Process";
import { Vision } from "@/components/home/Vision";
import { Insights } from "@/components/home/Insights";
import { LeadGen } from "@/components/home/LeadGen";
import { CustomCursor } from "@/components/shared/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      
      <Hero />
      <About />
      <Services />
      <Process />
      <CaseStudies />
      <Vision />
      <Insights />
      <LeadGen />
      
      <Footer />
    </>
  );
}
