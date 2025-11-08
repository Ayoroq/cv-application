import { DotLottieReact } from "@lottiefiles/dotlottie-react";
export default function LandingPage({onCtaClick}) {
  return (
    <main className="main-page">
      <section className="hero">
        <h1 className="hero-title">Build your résumé in minutes!</h1>
        <p>
          Create, edit, and download beautiful resumes right from your browser.
        </p>
        <button className="cta-button" onClick={onCtaClick}>Start building now - It's free!</button>
      </section>
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
            <DotLottieReact className="lottie" src="/src/assets/checkmark.json" autoplay /> Choose
            from modern and classic templates
          </li>
          <li className="feature">
            <DotLottieReact className="lottie" src="/src/assets/checkmark.json" autoplay />
            Drag and drop to rearrange education and experience
          </li>
          <li className="feature">
            <DotLottieReact className="lottie" src="/src/assets/checkmark.json" autoplay />
            Multiple export options
          </li>
          <li className="feature">
            <DotLottieReact className="lottie" src="/src/assets/checkmark.json" autoplay />
            Mobile Responsiveness
          </li>
          <li className="feature">
            <DotLottieReact className="lottie" src="/src/assets/checkmark.json" autoplay />
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
        <h3 className="section-title">
          Open Source. No Ads. No Tracking.
        </h3>
        <p>
          Vitae is completely free and open source — built by a single developer
          with a focus on privacy and simplicity. No ads, no tracking, and no
          subscriptions. Just a clean, fast résumé builder you can trust.
        </p>
        <p>Ready to start building?</p>
        <button className="cta-button" onClick={onCtaClick}>Get Started — It's Free!</button>
      </section>
      <footer className="footer">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Vitae. All rights reserved.
        </p>
        <div className="footer-links">
          <a href="https://github.com/Ayoroq/cv-application">GitHub</a>
          <a href="#">Privacy Policy</a>
          <a href="www.linkedin.com/in/roqeeb">LinkedIn</a>
        </div>
      </footer>
    </main>
  );
}
