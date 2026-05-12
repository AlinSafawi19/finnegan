import { AboutAwardItem } from "@/components/AboutAwardItem";
import { ABOUT_AWARDS } from "@/data/about-awards";

export function AboutAwardsSection() {
  return (
    <section
      className="aboutpage__awards"
      aria-labelledby="about-awards-heading"
    >
      <div className="aboutpage__awards-container">
        <div className="aboutpage__awards-contents">
          <div className="aboutpage__awards-heading-wrap">
            <h2 id="about-awards-heading" className="aboutpage__awards-headline">
              <span className="heading-2-s aboutpage__awards-title-s">
                Shining Moments of Glory
              </span>
              <span className="heading-2-l aboutpage__awards-title-l">
                Awards I got
              </span>
            </h2>
          </div>
          <div className="aboutpage__awards-content-wrap">
            {ABOUT_AWARDS.map((award, index) => (
              <AboutAwardItem
                key={award.serial}
                defaultOpen={index === 0}
                serial={award.serial}
                title={award.title}
                year={award.year}
                imageSrc={award.imageSrc}
                imageAlt={award.imageAlt}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
