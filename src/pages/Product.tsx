// import { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import { Product } from "../interfaces";
// import ProductList from "../components/Product/ProductList";
// import { ProductForm } from "../components/Product/ProductForm";
// import { getProducts } from "../api/product";

// export default function ProductPage(){
//     const [products,setProducts]=useState<Product[]>([])
//     const [showForm,setShowForm]=useState<boolean>(false)

//     useEffect(()=>{
//         const fetchProducts = async()=>{
//             const response = await getProducts();
//             setProducts(response.data);
//             console.log(response.data,"fetched");
//         }
//         fetchProducts();
//     },[])
//     return (
//         <div className="mx-auto mt-8">
//             <div className="flex justify-between items-center p-5">
//                 <h1 className="text-3xl">Products</h1>
//                 <Button variant={showForm?"destructive":"default"} size="lg" onClick={()=>setShowForm(!showForm)} className="text-lg">
//                     {showForm ? "Close Form" : "Create Product"}
//                 </Button>
//             </div>
//             {!showForm && products.length === 0 && <p className="w-full flex items-center text-5xl capitalize justify-center  h-[calc(100vh-10rem)]">No Products listed </p>}
//             {showForm && (<ProductForm products={products} setProducts={setProducts} setShowForm={setShowForm}/>)}
//             {!showForm && products.length > 0 && (
//                 <div className="">
//                     <ProductList itemsList={products} setProducts={setProducts}/>
//                 </div>
//             )}
//         </div>
//     )
// }






















import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Product } from "../interfaces";
import ProductList from "../components/Product/ProductList";
import { ProductForm } from "../components/Product/ProductForm";
import { getProducts } from "../api/product";

export default function ProductPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                console.log("Fetched products:", response);
                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    console.error("Invalid data format:", response);
                    setProducts([]);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]); // Ensure UI remains stable even if API fails
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="mx-auto mt-8">
            <div className="flex justify-between items-center p-5">
                <h1 className="text-3xl">Products</h1>
                <Button 
                    variant={showForm ? "destructive" : "default"} 
                    size="lg" 
                    onClick={() => setShowForm(!showForm)} 
                    className="text-lg"
                >
                    {showForm ? "Close Form" : "Create Product"}
                </Button>
            </div>

            {/* Show loading state */}
            {!showForm && loading && (
                <p className="w-full flex items-center text-5xl capitalize justify-center h-[calc(100vh-10rem)]">
                    Loading products...
                </p>
            )}

            {/* Show "No Products listed" only when loading is false and no products exist */}
            {!showForm && !loading && products.length === 0 && (
                <p className="w-full flex items-center text-5xl capitalize justify-center h-[calc(100vh-10rem)]">
                    No Products listed
                </p>
            )}

            {/* Show ProductForm when showForm is true */}
            {showForm && (
                <ProductForm 
                    products={products} 
                    setProducts={setProducts} 
                    setShowForm={setShowForm} 
                />
            )}

            {/* Show ProductList when showForm is false and products exist */}
            {!showForm && products.length > 0 && (
                <div>
                    <ProductList itemsList={products} setProducts={setProducts} />
                </div>
            )}
        </div>
    );
}
