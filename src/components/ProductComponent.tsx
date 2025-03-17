import ProduitItem from "../types/ProduitItem";
export default function ProductComponent({ product }: { product: ProduitItem }) {
    return (
        <div>
            <div>
                <p className="text-lg font-semibold">Nom : {product.name}</p>
                <p className="text-md">No D'article : {product.noArticle}</p>
                <p className="text-md">Points : {product.points}</p>
                <p className="text-md">Description : {product.description}</p>
            </div>
        </div>
    )

}