// src/pages/Contact.tsx

function Contact() {
  return (
    <div className="page-root">

      <div className="page-header" style={{ paddingBottom: "1.5rem" }}>
        <p className="page-eyebrow">Brooklyn College · CISC 1115</p>
        <h1 className="page-title">contact</h1>
        <p className="page-subtitle" style={{ marginBottom: 0 }}>
          get in touch with me
        </p>
      </div>

      <div className="home-divider-wrap">
        <hr className="home-divider" />
      </div>

      <div className="page-section" style={{ paddingTop: "2rem" }}>

        {/* About */}
        <div className="content-block">
          <div className="content-block-header">
            <p className="content-block-label">the person</p>
          </div>
          <p className="content-block-body">
            Hi, I'm Shawn Evans, a CS Grad from Brooklyn College. I built this platform because I noticed a gap between what students know compared to what they are expected to know. If you have past exams, corrections, or feedback, I'd love to hear from you.
          </p>
        </div>

        {/* Contact info — plain text, copy/pastable */}
        <div className="content-block">
          <div className="content-block-header">
            <p className="content-block-label">reach me</p>
          </div>

          <div className="contact-rows">

            <div className="contact-row">
              <span className="contact-row-label">personal email</span>
              <span className="contact-row-value">shawnevans328@gmail.com</span>
            </div>

            <div className="contact-row">
              <span className="contact-row-label">cuny email</span>
              <span className="contact-row-value">shawn.evans75@bcmail.cuny.edu</span>
            </div>

            <div className="contact-row">
              <span className="contact-row-label">github</span>
              <span className="contact-row-value">github.com/ShawnEvans77</span>
            </div>

            <div className="contact-row contact-row">
              <span className="contact-row-label">this repo</span>
              <span className="contact-row-value">github.com/ShawnEvans77/cisc-1115</span>
            </div>

            <div className="contact-row contact-row--last">
              <span className="contact-row-label">solutions repo</span>
              <span className="contact-row-value">https://github.com/ShawnEvans77/cisc-1115-final-key</span>
            </div>

          </div>
        </div>

        {/* Contribute */}
        <div className="content-block">
          <div className="content-block-header">
            <p className="content-block-label">contribute</p>
          </div>
          <p className="content-block-body">
            Missing a semester? Have a past exam or solutions not yet on the site? Open a pull request on the repo or send me an email, every contribution helps the next student.
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <a
              href="https://github.com/ShawnEvans77/cisc-1115"
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