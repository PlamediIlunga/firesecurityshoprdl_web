import '../styles/home.scss';

export default function Home() {
  return (
    <div className="home-wrapper">
      <main className="home-main">

        {/* HERO */}
        <section className="home-hero">
          <div className="home-hero__inner">
            <span className="home-hero__badge">Service Incendie — Rivière-du-Loup</span>
            <h1 className="home-hero__title">
              Bienvenue au Service Incendie de <em>Rivière-du-Loup</em>
            </h1>
            <p className="home-hero__subtitle">
              Échangez vos points pour des vêtements et équipements incendie. Un service dédié aux pompiers pour gérer vos besoins avec efficacité et fierté !
            </p>
            <a href="/Home/Catalogue" className="btn-gold">
              Découvrir le Catalogue
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </section>

        {/* NOS ÉQUIPEMENTS */}
        <section className="home-equip">
          <div className="home-equip__inner">
            <div className="home-equip__text">
              <p className="section-eyebrow">Nos équipements</p>
              <h2 className="section-title">Du matériel sélectionné pour le terrain</h2>
              <div className="gold-rule" />
              <p className="section-body">
                Nos équipements sont conçus pour garantir votre sécurité et votre efficacité sur le terrain. Découvrez une sélection rigoureuse pour tous les pompiers de Rivière-du-Loup.
              </p>
            </div>
            <div className="home-equip__img-wrap">
              <img
                src="https://thumbs.dreamstime.com/z/sapeur-pompier-icons-set-de-profession-avec-l-%C3%A9quipement-de-sapeurs-pompiers-77815884.jpg"
                alt="Équipements de pompiers"
                className="home-equip__img"
              />
            </div>
          </div>
        </section>

        {/* COMMENT ÇA FONCTIONNE */}
        <section className="home-how">
          <div className="home-how__inner">
            <div className="home-how__header">
              <p className="section-eyebrow">Fonctionnement</p>
              <h2 className="section-title section-title--light">Comment ça fonctionne ?</h2>
              <div className="gold-rule gold-rule--center" />
            </div>
            <div className="home-how__steps">
              <div className="step-card">
                <span className="step-card__num">01</span>
                <h3 className="step-card__title">Accumulez des points</h3>
                <p className="step-card__body">
                  Accumulez des points grâce à votre engagement et échangez-les contre des équipements ou vêtements.
                </p>
              </div>
              <div className="step-card">
                <span className="step-card__num">02</span>
                <h3 className="step-card__title">Choisissez vos articles</h3>
                <p className="step-card__body">
                  Parcourez le catalogue et sélectionnez les équipements ou vêtements dont vous avez besoin.
                </p>
              </div>
              <div className="step-card">
                <span className="step-card__num">03</span>
                <h3 className="step-card__title">Passez commande</h3>
                <p className="step-card__body">
                  La direction peut également suivre les transactions pour une gestion optimale.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
