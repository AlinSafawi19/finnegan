import { AboutBelowHeroScroll } from "@/components/AboutBelowHeroScroll";
import { AboutHeroScrollBar } from "@/components/AboutHeroScrollBar";
import { AboutPageHeading } from "@/components/AboutPageHeading";
import { AboutPageImage } from "@/components/AboutPageImage";
import { AboutAwardsSection } from "@/components/AboutAwardsSection";
import { AboutGearsSection } from "@/components/AboutGearsSection";
import { AboutValuesSection } from "@/components/AboutValuesSection";
import "./aboutpage.css";

export default function AboutPage() {
  return (
    <main className="aboutpage__main">
      <div className="aboutpage__hero">
        <div className="aboutpage__stack">
          <AboutPageHeading>
            <AboutPageImage />
          </AboutPageHeading>
        </div>
        <AboutHeroScrollBar />
      </div>
      <div className="aboutpage__below-hero">
        <AboutBelowHeroScroll />
      </div>
      <AboutValuesSection />
      <AboutAwardsSection />
      <AboutGearsSection />
    </main>
  );
}
