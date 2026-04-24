// src/pages/Contact.tsx

import { ContentBlock } from "../components/ui/ContentBlock";
import { PageHeader } from "../components/ui/PageHeader";

type ContactLink = {
  label: string;
  href?: string;
  value: string;
};

const contactLinks: ContactLink[] = [
  { label: "personal email", value: "shawnevans328@gmail.com" },
  { label: "cuny email", value: "shawn.evans75@bcmail.cuny.edu" },
  { label: "github", value: "github.com/ShawnEvans77", href: "https://github.com/ShawnEvans77" },
  { label: "portfolio", value: "shawnevans.vercel.app", href: "https://shawnevans.vercel.app/" },
  { label: "this repo", value: "github.com/ShawnEvans77/cisc-1115", href: "https://github.com/ShawnEvans77/cisc-1115" },
  { label: "solutions repo", value: "github.com/ShawnEvans77/cisc-1115-final-key", href: "https://github.com/ShawnEvans77/cisc-1115-final-key" },
];

function ContactRow({ label, href, value }: ContactLink) {
  return (
    <div className="contact-row">
      <span className="contact-row-label">{label}</span>
      <div className="contact-row-value">
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="contact-row-link">
            {value}
          </a>
        ) : (
          <span className="contact-row-text">{value}</span>
        )}
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="page-root">
      <PageHeader title="contact" subtitle="get in touch with me" compactSubtitle />

      <div className="home-divider-wrap">
        <hr className="home-divider" />
      </div>

      <div className="page-section page-section--contact">
        <ContentBlock label="the person">
          <p className="content-block-body">
            Hi, I'm Shawn Evans, a CS Grad from Brooklyn College. I built this platform because I noticed a gap between what students know compared to what they are expected to know. This platform aims to be an all in one resource for freshman Computer Science students.
          </p>
        </ContentBlock>

        <ContentBlock label="reach me">
          <div className="contact-rows">
            {contactLinks.map(link => <ContactRow key={link.label} {...link} />)}
          </div>
        </ContentBlock>

        <ContentBlock label="contribute">
          <p className="content-block-body">
            Click here if you'd like to contribute to the site:
          </p>
          <div className="contribute-action">
            <a
              href="https://github.com/ShawnEvans77/cisc-1115"
              target="_blank"
              rel="noopener noreferrer"
              className="solution-link"
            >
              open a pull request
            </a>
          </div>
        </ContentBlock>

      </div>
    </div>
  );
}

export default Contact;
