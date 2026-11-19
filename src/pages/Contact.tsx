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
      <PageHeader title="contact" />

      <div className="home-divider-wrap">
        <hr className="home-divider" />
      </div>

      <div className="page-section page-section--contact">
        <ContentBlock label="about">
          <p className="content-block-body">
            I'm Shawn Evans, a CS graduate from Brooklyn College. I built this site because I noticed a gap between what students know and what they are expected to know. It collects past exams, solutions, and notes for freshman Computer Science students.
          </p>
        </ContentBlock>

        <ContentBlock label="reach me">
          <div className="contact-rows">
            {contactLinks.map(link => <ContactRow key={link.label} {...link} />)}
          </div>
        </ContentBlock>

        <ContentBlock label="contribute">
          <a
            href="https://github.com/ShawnEvans77/cisc-1115"
            target="_blank"
            rel="noopener noreferrer"
            className="solution-link"
          >
            open a pull request
          </a>
        </ContentBlock>

      </div>
    </div>
  );
}

export default Contact;
