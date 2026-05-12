import { Body1 } from "@/components/Body1";
import { Body3 } from "@/components/Body3";
import { ContactForm } from "@/components/ContactForm";
import { ContactHoverScale } from "@/components/ContactHoverScale";
import { Heading1 } from "@/components/Heading1";
import { SocialContactCard } from "@/components/SocialContactCard";
import "./contact.css";

const SOCIAL_HOVER_STILL = { hoverTranslateX: 0, hoverTranslateY: 0 } as const;

export default function ContactPage() {
  return (
    <div className="contact-page">
      <main className="contact-page__main">
        <header className="contact-page__heading">
          <Heading1 className="contact-page__heading-title" size="large">
            Let&apos;s talk
          </Heading1>
        </header>

        <section className="contact-page__contact-info" aria-label="Contact information">
          <div className="contact-page__container">
            <ContactHoverScale className="contact-page__channel">
              <Body1 className="contact-page__channel-label">EMAIL</Body1>
              <Body3 className="contact-page__channel-value" size="large">
                <a
                  className="link-light"
                  href="mailto:finneganmonroe@email.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  finneganmonroe@email.com
                </a>
              </Body3>
            </ContactHoverScale>

            <ContactHoverScale className="contact-page__channel">
              <Body1 className="contact-page__channel-label">PHONE</Body1>
              <Body3 className="contact-page__channel-value" size="large">
                <a
                  className="link-light"
                  href="tel:+1458741139"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +1458741139
                </a>
              </Body3>
            </ContactHoverScale>

            <div className="contact-page__social-row">
              <div className="contact-page__social-slot">
                <SocialContactCard
                  href="https://instagram.com"
                  label="Instagram"
                  icon="InstagramLogo"
                  {...SOCIAL_HOVER_STILL}
                />
              </div>
              <div className="contact-page__social-slot">
                <SocialContactCard
                  href="https://facebook.com"
                  label="Facebook"
                  icon="FacebookLogo"
                  {...SOCIAL_HOVER_STILL}
                />
              </div>
              <div className="contact-page__social-slot">
                <SocialContactCard
                  href="https://twitter.com"
                  label="Twitter"
                  icon="X"
                  {...SOCIAL_HOVER_STILL}
                />
              </div>
            </div>

            <div className="contact-page__social-row">
              <div className="contact-page__social-slot">
                <SocialContactCard
                  href="https://behance.net"
                  label="Behance"
                  icon="BehanceLogo"
                  {...SOCIAL_HOVER_STILL}
                />
              </div>
              <div className="contact-page__social-slot">
                <SocialContactCard
                  href="https://youtube.com"
                  label="Youtube"
                  icon="YoutubeLogo"
                  {...SOCIAL_HOVER_STILL}
                />
              </div>
              <div className="contact-page__social-slot">
                <SocialContactCard
                  href="https://linkedin.com"
                  label="Linkedin"
                  icon="LinkedinLogo"
                  {...SOCIAL_HOVER_STILL}
                />
              </div>
            </div>

            <div className="contact-page__form-block">
              <Body1 className="contact-page__form-lead">Send Me a Message</Body1>
              <ContactForm className="contact-page__form" noValidate />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
