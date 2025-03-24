export default function Contact() {
    return (
      <div className="min-h-screen bg-red-900 text-white flex flex-col">
        {/* En-tête de la page */}
        <header className="py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nous Contacter
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Vous avez une question ou besoin d’assistance ? Le Service Incendie de Rivière-du-Loup est là pour vous répondre. Contactez-nous dès aujourd’hui !
          </p>
        </header>
  
        {/* Section principale */}
        <section className="py-12 flex-grow">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Formulaire de contact */}
              <div className="bg-blue-900 rounded-lg border-4 border-yellow-400 p-8 shadow-xl">
                <h2 className="text-3xl font-semibold text-yellow-400 mb-6">
                  Envoyez-nous un message
                </h2>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-lg font-medium mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-3 rounded border border-yellow-400 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-lg font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-3 rounded border border-yellow-400 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Votre email"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-lg font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="w-full p-3 rounded border border-yellow-400 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Votre message"
                      rows={5}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded border-2 border-yellow-400 transition duration-300"
                  >
                    Envoyer
                  </button>
                </form>
              </div>
  
              {/* Informations de contact */}
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-semibold mb-6">
                  Nos Coordonnées
                </h2>
                <p className="text-lg mb-4">
                  Service Incendie Rivière-du-Loup
                </p>
                <p className="text-lg mb-4">
                  123 Rue des Pompiers, Rivière-du-Loup, QC G5R 0A1
                </p>
                <p className="text-lg mb-4">
                  Téléphone :{" "}
                  <a
                    href="tel:+14185551234"
                    className="text-yellow-400 hover:text-yellow-300 transition duration-300"
                  >
                    (418) 555-1234
                  </a>
                </p>
                <p className="text-lg mb-4">
                  Email :{" "}
                  <a
                    href="mailto:contact@serviceincendie-rdl.ca"
                    className="text-yellow-400 hover:text-yellow-300 transition duration-300"
                  >
                    contact@serviceincendie-rdl.ca
                  </a>
                </p>
                <p className="text-lg">
                  Heures d’ouverture : Lundi au Vendredi, 8h00 - 17h00
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }