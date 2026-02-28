// src/pages/Contact.tsx

function Contact() {
  return (
    <div className="page-root">

      <div className="page-header page-header--contact">
        <p className="page-eyebrow">Brooklyn College · CISC 1115</p>
        <h1 className="page-title">contact</h1>
        <p className="page-subtitle page-subtitle--flush">
          get in touch with me
        </p>
      </div>

      <div className="home-divider-wrap">
        <hr className="home-divider" />
      </div>

      <div className="page-section page-section--contact">

        {/* About */}
        <div className="content-block">
          <div className="content-block-header">
            <p className="content-block-label">the person</p>
          </div>
          <p className="content-block-body">
            Hi, I'm Shawn Evans, a CS Grad from Brooklyn College. I built this platform because I noticed a gap between what students know compared to what they are expected to know. If you have past exams, corrections, or feedback, I'd love to hear from you.
          </p>
        </div>

        {/* Contact info */}
        <div className="content-block">
          <div className="content-block-header">
            <p className="content-block-label">reach me</p>
          </div>

          <div className="contact-rows">

            <div className="contact-row">
              <span className="contact-row-label">personal email</span>
              <a href="mailto:shawnevans328@gmail.com" className="contact-row-link">
                shawnevans328@gmail.com
              </a>
            </div>

            <div className="contact-row">
              <span className="contact-row-label">cuny email</span>
              <a href="mailto:shawn.evans75@bcmail.cuny.edu" className="contact-row-link">
                shawn.evans75@bcmail.cuny.edu
              </a>
            </div>

            <div className="contact-row">
              <span className="contact-row-label">github</span>
              <a href="https://github.com/ShawnEvans77" target="_blank" rel="noopener noreferrer" className="contact-row-link">
                github.com/ShawnEvans77
              </a>
            </div>

            <div className="contact-row">
              <span className="contact-row-label">portfolio</span>
              <a href="https://shawnevans.vercel.app/" target="_blank" rel="noopener noreferrer" className="contact-row-link">
                shawnevans.vercel.app
              </a>
            </div>

            <div className="contact-row">
              <span className="contact-row-label">this repo</span>
              <a href="https://github.com/ShawnEvans77/cisc-1115" target="_blank" rel="noopener noreferrer" className="contact-row-link">
                github.com/ShawnEvans77/cisc-1115
              </a>
            </div>

            <div className="contact-row contact-row--last">
              <span className="contact-row-label">solutions repo</span>
              <a href="https://github.com/ShawnEvans77/cisc-1115-final-key" target="_blank" rel="noopener noreferrer" className="contact-row-link">
                github.com/ShawnEvans77/cisc-1115-final-key
              </a>
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
        </div>

      </div>
    </div>
  );
}

export default Contact;