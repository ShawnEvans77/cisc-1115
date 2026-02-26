// src/pages/Contact.tsx

function Contact() {
  return (
    <div className="page-root">

      <div className="page-header">
        <p className="page-eyebrow">Brooklyn College · CISC 1115</p>
        <h1 className="page-title">contact</h1>
        <p className="page-subtitle">get in touch, report an issue, or contribute exam data</p>
      </div>

      <div className="page-section" style={{ paddingTop: "0.5rem" }}>

        {/* About */}
        <div className="content-block">
          <div className="content-block-header">
            <p className="content-block-label">the person</p>
          </div>
          <p className="content-block-body">
            Hi, I'm Shawn Evans, a a CS grad at Brooklyn College. I built this site to make studying for CISC 1115 easier. If you have past exams, corrections, or feedback, I'd love to hear from you.
          </p>
        </div>

        {/* Contact links */}
        <div className="content-block">
          <div className="content-block-header">
            <p className="content-block-label">reach me</p>
          </div>

          <div className="contact-rows">

            <a href="mailto:shawnevans328@gmail.com" className="contact-row">
              <span className="contact-row-label">personal email</span>
              <span className="contact-row-value">shawnevans328@gmail.com</span>
              <span className="contact-row-arrow">→</span>
            </a>

            <a href="mailto:shawn.evans75@bcmail.cuny.edu" className="contact-row">
              <span className="contact-row-label">cuny email</span>
              <span className="contact-row-value">shawn.evans75@bcmail.cuny.edu</span>
              <span className="contact-row-arrow">→</span>
            </a>

            <a href="https://github.com/ShawnEvans77" target="_blank" rel="noopener noreferrer" className="contact-row">
              <span className="contact-row-label">github</span>
              <span className="contact-row-value">github.com/ShawnEvans77</span>
              <span className="contact-row-arrow">→</span>
            </a>

            <a href="https://github.com/ShawnEvans77/cisc-1115" target="_blank" rel="noopener noreferrer" className="contact-row contact-row--last">
              <span className="contact-row-label">this repo</span>
              <span className="contact-row-value">ShawnEvans77/cisc-1115</span>
              <span className="contact-row-arrow">→</span>
            </a>

          </div>
        </div>

        {/* Contribute */}
        <div className="content-block">
          <div className="content-block-header">
            <p className="content-block-label">contribute</p>
          </div>
          <p className="content-block-body">
            Missing a semester? Have a past exam or solutions not yet on the site? Open a pull request on the repo or send me an email — every contribution helps the next student.
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <a
              href="https://github.com/ShawnEvans77/cisc-1115/pulls"
              target="_blank"
              rel="noopener noreferrer"
              className="solution-link"
            >
              open a pull request
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Contact;