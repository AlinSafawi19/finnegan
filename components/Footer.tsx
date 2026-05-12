import { AlbumCorner } from "@/components/AlbumCorner";
import { ApertureCta } from "@/components/ApertureCta";
import { FooterCtaLinks } from "@/components/FooterCtaLinks";
import { FooterNavLink } from "@/components/FooterNavLink";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__cta">
        <div className="site-footer__cta-inner">
          <AlbumCorner variant="dark" placement="tl" positionPreset="dark" />
          <AlbumCorner variant="dark" placement="tr" positionPreset="dark" />
          <AlbumCorner variant="dark" placement="br" positionPreset="dark" />
          <AlbumCorner variant="dark" placement="bl" positionPreset="dark" />
          <div className="site-footer__cta-btn">
            <ApertureCta />
          </div>
          <FooterCtaLinks />
        </div>
      </div>
      <nav className="site-footer__nav" aria-label="Footer">
        <div className="site-footer__nav-stack">
          <FooterNavLink href="/">Home</FooterNavLink>
          <FooterNavLink href="/about">About</FooterNavLink>
          <FooterNavLink href="/albums">Works</FooterNavLink>
          <FooterNavLink href="/reviews">Reviews</FooterNavLink>
          <FooterNavLink href="/blog">Blogs</FooterNavLink>
          <FooterNavLink href="/contact">Contact</FooterNavLink>
          <FooterNavLink
            href="https://framer.link/XzKISjl"
            target="_blank"
            rel="noopener noreferrer"
          >
            More Templates
          </FooterNavLink>
        </div>
        <div className="site-footer__nav-ticker-shell" aria-hidden>
          <div className="site-footer__nav-ticker-viewport">
            <div className="site-footer__nav-ticker-track">
              <div className="site-footer__nav-ticker-strip">
                <div className="site-footer__nav-ticker-pair">
                  <span className="footer-text-xxl site-footer__nav-ticker-text">
                    Finnegan Monroe
                  </span>
                  <span className="footer-text-xxl site-footer__nav-ticker-text">
                    Finnegan Monroe
                  </span>
                </div>
                <div className="site-footer__nav-ticker-pair">
                  <span className="footer-text-xxl site-footer__nav-ticker-text">
                    Finnegan Monroe
                  </span>
                  <span className="footer-text-xxl site-footer__nav-ticker-text">
                    Finnegan Monroe
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </footer>
  );
}
