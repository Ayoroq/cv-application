import Lottie from "lottie-react";
import checkmarkAnimation from "../assets/checkmark.json";
import coralTemplateImage from "../templates/previews/coral.png";
import modernTemplateImage from "../templates/previews/modern.png";
import serifTemplateImage from "../templates/previews/serif.png";
import swissTemplateImage from "../templates/previews/swiss.png";
import spearmintTemplateImage from "../templates/previews/spearmint.png";
export default function LandingPage({ onCtaClick }) {
  const heroTemplates = [
    coralTemplateImage,
    modernTemplateImage,
    serifTemplateImage,
    swissTemplateImage,
    spearmintTemplateImage,
  ];

  return (
    <main className="main-page">
      <div className="container">
        <div className="hero-container">
          <section className="hero">
            <h1 className="hero-title">Build your résumé in minutes!</h1>
            <p>
              Create, edit, and download beautiful resumes right from your
              browser.
            </p>
            <div className="cta-container">
              {" "}
              <button className="cta-button" onClick={onCtaClick}>
                Start building now - It's free!
              </button>
            </div>
          </section>
        </div>
        <div className="image-container">
          <div className="hero-image-container">
            <img
              src={
                heroTemplates[Math.floor(Math.random() * heroTemplates.length)]
              }
              alt="Hero Image"
              className="hero-image"
            />
          </div>
        </div>
      </div>
      <section className="features-section">
        <h3 className="section-title">Simple. Fast. Customizable</h3>
        <p>
          Vitae is a simple, fast, and customizable résumé builder that allows
          you to create a beautiful résumé in minutes. Free and open-source,
          it's built to help anyone design a résumé that's uniquely theirs. With
          a wide array of templates and flexible editing options, Vitae makes
          the process of building your résumé effortless, enjoyable, and
          efficient.
        </p>
        <ul className="features">
          <li className="feature">
            <Lottie
              className="lottie"
              animationData={checkmarkAnimation}
              loop={false}
            />
            Choose from modern and classic templates
          </li>
          <li className="feature">
            <Lottie
              className="lottie"
              animationData={checkmarkAnimation}
              loop={false}
            />
            Drag and drop functionality for easy editing
          </li>
          <li className="feature">
            <Lottie
              className="lottie"
              animationData={checkmarkAnimation}
              loop={false}
            />
            Multiple export options
          </li>
          <li className="feature">
            <Lottie
              className="lottie"
              animationData={checkmarkAnimation}
              loop={false}
            />
            Mobile Responsiveness
          </li>
          <li className="feature">
            <Lottie
              className="lottie"
              animationData={checkmarkAnimation}
              loop={false}
            />
            Auto Saves your progress
          </li>
        </ul>
      </section>
      <section className="testimonials">
        <p className="testimonial">
          “The builder turned my scattered job history into something
          professional and cohesive. Total game-changer.”
          <span className="name">- Ayo O.</span>
        </p>
        <p className="testimonial">
          "I landed my dream job within two weeks of using this resume builder.
          The templates are clean and professional."
          <span className="name">- Morin O.</span>
        </p>
        <p className="testimonial">
          "Finally, a resume builder that doesn't require a subscription.
          Simple, effective, and completely free!"
          <span className="name">- Marcus R.</span>
        </p>
        <p className="testimonial">
          "The drag-and-drop feature made organizing my experience so easy.
          Saved me hours of formatting."
          <span className="name">- Jesse I.</span>
        </p>
      </section>
      <section className="about">
        <h3 className="section-title">Open Source. No Ads. No Tracking.</h3>
        <p>
          Vitae is completely free and open source — built by a single developer
          with a focus on privacy and simplicity. No ads, no tracking, and no
          subscriptions. Just a clean, fast résumé builder you can trust.
        </p>
        <p>Ready to start building?</p>
        <div className="cta-container">
          <button className="cta-button last-btn" onClick={onCtaClick}>
            Get Started — It's Free!
          </button>
        </div>
      </section>
      <footer className="footer">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Vitae. All rights reserved.
        </p>
        <div className="footer-links">
          <a
            href="https://github.com/Ayoroq/cv-application"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a href="#" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          <a
            href="www.linkedin.com/in/roqeeb"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </main>
  );
}
