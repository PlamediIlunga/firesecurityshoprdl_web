import ProduitItem from "../types/ProduitItem";
import { CiImageOn } from "react-icons/ci";
export default function ProductComponent({ product }: { product: ProduitItem }) {
    return (
        <div>
            <p>{product.imageUrl ? (
                <img
                    src={product.imageUrl}
                    className="w-20 h-20 object-cover rounded-lg"
                />
            ) : (<CiImageOn className="text-6xl text-gray-400 h-10 w-10 flex items-center" />)}</p>
            <p className="text-lg font-semibold">Nom : {product.name}</p>
            <p className="text-md">No D'article : {product.noArticle}</p>
            <p className="text-md">Points : {product.points}</p>
            <p className="text-md">Description : {product.description}</p>
        </div>
    )
}