import Link from "next/link";
import { publicServices, publicSite } from "@/lib/publicSite";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="site-footer-grid">
          <div>
            <Link className="site-footer-wordmark" href="/">
              MS LEGACY
            </Link>
            <p className="site-footer-descriptor">
              PROPERTY ADVISORY & SERVICES
            </p>
            <p>
              Property sourcing, construction coordination, property care and
              document-review support.
            </p>
            <a href={publicSite.phoneHref}>{publicSite.phone}</a>
            <a href={publicSite.emailHref}>{publicSite.email}</a>
            <address>{publicSite.address}</address>
          </div>
          <div>
            <h2>Our services</h2>
            <ul>
              {publicServices.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`}>
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/nri-support">NRI property support</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Explore</h2>
            <ul>
              <li>
                <Link href="/projects">Property information</Link>
              </li>
              <li>
                <Link href="/about">About MS LEGACY</Link>
              </li>
              <li>
                <Link href="/resources">Guides & resources</Link>
              </li>
              <li>
                <Link href="/government-links">Official property portals</Link>
              </li>
              <li>
                <Link href="/contact">Contact us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Work with us</h2>
            <ul>
              <li>
                <Link href="/project-participation">
                  Landowner & developer enquiries
                </Link>
              </li>
              <li>
                <Link href="/channel-partners">Channel partner enquiries</Link>
              </li>
              <li>
                <Link href="/developers">Developer directory</Link>
              </li>
            </ul>
            <p className="site-footer-small">
              Service scope, professional responsibilities and fees are agreed
              before engagement. Property information needs current
              confirmation.
            </p>
          </div>
        </div>
        <div className="site-footer-bottom">
          <span>
            © {new Date().getFullYear()} MS LEGACY. All rights reserved.
          </span>
          <div>
            <Link href="/privacy">Privacy notice</Link>
            <Link href="/terms">Terms of use</Link>
            <Link href="/project-disclaimer">Property information notice</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
