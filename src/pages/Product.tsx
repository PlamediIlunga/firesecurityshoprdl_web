import ProduitItem from '../types/ProduitItem';
import MyProducts from '../components/ProductComponent';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Product() {

    const api_url = "http://localhost:5007/";
    const [products, setProduct] = useState<ProduitItem[]>([]);

    useEffect(() => {

        const getProducts = async () => {
            try {
                const response = await fetch(api_url + "api/Product/GetAllProduct");
                const products: ProduitItem[] = await response.json();
                setProduct(products);
            }
            catch (error) {
                console.error(error);
            }
        }
        getProducts();
    }, []);

    return (
        <div>
            <div>
                <h1>Product</h1>
            </div>
            <div>
            {products.length > 0 ? (
                products.map((product) => (
                    <Link key={String(product.id)} className='MyProducts' to={'/Products/' + product.id}>
                        <MyProducts  product={product} />
                    </Link>              
                ))
            ) : (
                <p>No products available</p>
            )}
            </div>
        </div>
    )
};