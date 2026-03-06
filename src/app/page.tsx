import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Stats } from "@/components/sections/Stats";
import { Candidates } from "@/components/sections/Candidates";
import { Platform } from "@/components/sections/Platform";
import { Campus } from "@/components/sections/Campus";
import { CTA } from "@/components/sections/CTA";
import { GetInvolved } from "@/components/sections/GetInvolved";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Candidates />
        <Platform />
        <Campus />
        <CTA />
        <GetInvolved />
      </main>
      <Footer />
    </>
  );
}
