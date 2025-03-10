import ProduitItem from "../types/ProduitItem";
export default function ProductComponent({ product }: { product: ProduitItem }) {
    return (
        <div>
            <div >
                <p>No D'article : {product.noAtricle}</p>
                <p>Nom : {product.name}</p>
                <p>Points : {product.points}</p>
                <p>Description : {product.description}</p>
            </div>
        </div>
    )

}