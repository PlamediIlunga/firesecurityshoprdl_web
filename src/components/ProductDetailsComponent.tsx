import ProduitItem from "../types/ProduitItem";

export default function ProductDetailsComponent({ product }: { product: ProduitItem }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4 uppercase">
        {product.name}
      </h2>
      <p className="text-lg mb-2">
        <span className="font-semibold">Numéro d'article :</span> {product.noArticle}
      </p>
      <p className="text-lg mb-2">
        <span className="font-semibold">Points requis :</span>{' '}
        <span className="text-yellow-600">{product.points}</span>
      </p>
      <h3 className="text-xl font-semibold text-yellow-600 mt-4 mb-2">
        Spécifications
      </h3>
      <p className="text-md">{product.description}</p>
    </div>
  );
}