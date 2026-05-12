import { AboutGearLink } from "@/components/AboutGearLink";
import { ABOUT_GEAR_CATEGORIES } from "@/data/about-gears";

export function AboutGearsSection() {
  return (
    <section
      className="aboutpage__gears"
      aria-labelledby="about-gears-heading"
    >
      <div className="aboutpage__gears-container">
        <h2 id="about-gears-heading" className="heading-2-l aboutpage__gears-title">
          Gears I own
        </h2>
        <div className="aboutpage__gears-list-container">
          {ABOUT_GEAR_CATEGORIES.map((cat) => (
            <div key={cat.id} className="aboutpage__gears-category">
              <h3 className="heading-3 aboutpage__gears-category-title">
                {cat.title}
              </h3>
              <div className="aboutpage__gears-category-grid">
                {cat.items.map((item, index) => (
                  <AboutGearLink
                    key={`${cat.id}-${index}`}
                    href={item.href}
                    text={item.text}
                    icon={cat.icon}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
