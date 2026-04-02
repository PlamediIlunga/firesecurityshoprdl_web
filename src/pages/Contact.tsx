import '../styles/contact.scss';

export default function Contact() {
  return (
    <div className="contact-page">

      {/* HEADER */}
      <header className="contact-header">
        <div className="contact-header__inner">
          <div className="contact-header__badge">Support &amp; Communication</div>
          <h1 className="contact-header__title">Nous Contacter</h1>
          <div className="gold-rule" />
          <p className="contact-header__subtitle">
            Vous avez une question ou besoin d'assistance ? Le Service Incendie de Rivière-du-Loup est là pour vous répondre. Contactez-nous dès aujourd'hui !
          </p>
        </div>
      </header>

      {/* SECTION PRINCIPALE */}
      <section className="contact-section">
        <div className="contact-section__inner">

          {/* COLONNE GAUCHE — Formulaire */}
          <div className="contact-form-wrap">
            <p className="section-eyebrow section-eyebrow--gold">Formulaire</p>
            <h2 className="contact-form-title">Envoyez-nous un message</h2>
            <div className="gold-rule" />

            <form className="contact-form">
              <div className="form-field">
                <label htmlFor="name" className="form-field__label">Nom</label>
                <input
                  type="text"
                  id="name"
                  className="form-field__input"
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="email" className="form-field__label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-field__input"
                  placeholder="Votre email"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="message" className="form-field__label">Message</label>
                <textarea
                  id="message"
                  className="form-field__input form-field__input--textarea"
                  placeholder="Votre message"
                  rows={5}
                  required
                />
              </div>
              <div className="contact-form__footer">
                <button type="submit" className="contact-submit-btn">
                  Envoyer
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* SÉPARATEUR VERTICAL */}
          <div className="contact-divider" />

          {/* COLONNE DROITE — Coordonnées */}
          <div className="contact-info">
            <p className="section-eyebrow section-eyebrow--gold">Coordonnées</p>
            <h2 className="contact-info__title">Nos Coordonnées</h2>
            <div className="gold-rule" />

            <div className="contact-info__items">

              <div className="contact-info__item">
                <span className="contact-info__icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                  </svg>
                </span>
                <div>
                  <p className="contact-info__label">Adresse</p>
                  <p className="contact-info__value">123 Rue des Pompiers<br />Rivière-du-Loup, QC G5R 0A1</p>
                </div>
              </div>

              <div className="contact-info__item">
                <span className="contact-info__icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="currentColor"/>
                  </svg>
                </span>
                <div>
                  <p className="contact-info__label">Téléphone</p>
                  <a href="tel:+14185551234" className="contact-info__link">(418) 555-1234</a>
                </div>
              </div>

              <div className="contact-info__item">
                <span className="contact-info__icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                  </svg>
                </span>
                <div>
                  <p className="contact-info__label">Email</p>
                  <a href="mailto:contact@serviceincendie-rdl.ca" className="contact-info__link">
                    contact@serviceincendie-rdl.ca
                  </a>
                </div>
              </div>

              <div className="contact-info__item">
                <span className="contact-info__icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor"/>
                  </svg>
                </span>
                <div>
                  <p className="contact-info__label">Heures d'ouverture</p>
                  <p className="contact-info__value">Lundi au Vendredi<br />8h00 – 17h00</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
