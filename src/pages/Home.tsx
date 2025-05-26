export default function Home() {
  return (
    <div className="min-h-full w-full flex flex-col">
      <main className="flex-grow bg-red-800 text-white">
        <section className="py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bienvenue au Service Incendie de Rivière-du-Loup
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Échangez vos points pour des vêtements et équipements incendie. Un service dédié aux pompiers pour gérer vos besoins avec efficacité et fierté !
            </p>
            <a
              href="/Home/Catalogue"
              className="inline-block bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500 transition"
            >
              Découvrir le Catalogue
            </a>
          </div>
        </section>

        <section className="py-12 bg-red-700">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-8">
              Nos Équipements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <img
                src="https://thumbs.dreamstime.com/z/sapeur-pompier-icons-set-de-profession-avec-l-%C3%A9quipement-de-sapeurs-pompiers-77815884.jpg"
                alt="Équipements de pompiers"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <p className="text-lg">
                Nos équipements sont conçus pour garantir votre sécurité et votre efficacité sur le terrain. Découvrez une sélection rigoureuse pour tous les pompiers de Rivière-du-Loup.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-4">
              Comment ça fonctionne ?
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-8">
              Accumulez des points grâce à votre engagement et échangez-les contre des équipements ou vêtements. La direction peut également suivre les transactions pour une gestion optimale.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}