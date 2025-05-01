import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import { Button, Input } from "../../ui";
import { Textarea } from "../../ui/Textarea";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/AlertBox";
import { useToast } from "../../ui/use-toast";
import { Product } from "../../interfaces";
// You'll need to create these API functions
import { getProduct, updateProduct } from "../../api/product";

export function ProductDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [product, setProduct] = useState<Product>({
    _id: id || "",
    name: "",
    description: "",
    price: 0,
    discountPercent: 0,
    category: "",
    brand: "",
    stock: 0,
    images: [],
    info: [],
    createdAt: "",
    rating: [],
    discountPrice: 0,
  });
  const [newProductDetails, setNewProductDetails] = useState<Product>(product);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchProductDetails() {
      setLoading(true);
      try {
        const response = await getProduct(id || "");
        setProduct(response.data);
        setNewProductDetails(response.data);
        setSelectedImage(response.data.images[0]);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchProductDetails();
  }, [id]);

  async function updateProductDetails() {
    try {
      setLoading(true);
      const response = await updateProduct(id || "", { ...newProductDetails });
      setProduct(response.data);
      toast({
        title: "Success",
        description: response.message,
        variant: "default",
      });
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader className="w-6 h-6 animate-spin" />;
  }

  return (
    <div className="mt-10 container mx-auto">
      <div className="flex w-full justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Details</h1>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="default">Edit Details</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Update Product Details</AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-4 mt-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      value={newProductDetails.name}
                      onChange={(e) =>
                        setNewProductDetails({
                          ...newProductDetails,
                          name: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <Textarea
                      id="description"
                      value={newProductDetails.description}
                      onChange={(e) =>
                        setNewProductDetails({
                          ...newProductDetails,
                          description: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price
                    </label>
                    <Input
                      id="price"
                      type="number"
                      value={newProductDetails.price}
                      onChange={(e) =>
                        setNewProductDetails({
                          ...newProductDetails,
                          price: Number(e.target.value),
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="discountPercent"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Discount Percent
                    </label>
                    <Input
                      id="discountPercent"
                      type="number"
                      value={newProductDetails.discountPercent}
                      onChange={(e) =>
                        setNewProductDetails({
                          ...newProductDetails,
                          discountPercent: Number(e.target.value),
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="stock"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Stock
                    </label>
                    <Input
                      id="stock"
                      type="number"
                      value={newProductDetails.stock}
                      onChange={(e) =>
                        setNewProductDetails({
                          ...newProductDetails,
                          stock: Number(e.target.value),
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button onClick={updateProductDetails} disabled={loading}>
                {loading ? (
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                Update
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="w-full h-[400px] relative mb-4">
            {selectedImage && (
              <img
                src={selectedImage}
                alt={product.name}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {product.images.map((item, index) => (
              <img
                key={index}
                src={item}
                alt={`Product image ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                  selectedImage === item ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedImage(item)}
              />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p>{product.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Price</h3>
              <p>₹{product.price}</p>
            </div>
            <div>
              <h3 className="font-semibold">Discount Price</h3>
              <p>₹{product.discountPrice}</p>
            </div>
            <div>
              <h3 className="font-semibold">Discount Percent</h3>
              <p>{product.discountPercent}%</p>
            </div>
            <div>
              <h3 className="font-semibold">Brand</h3>
              <p>{product.brand}</p>
            </div>
            <div>
              <h3 className="font-semibold">Stock</h3>
              <p>{product.stock}</p>
            </div>
            <div>
              <h3 className="font-semibold">Created At</h3>
              {/* <p>{format(new Date(product.createdAt), "PPP")}</p> */}
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Product Info</h3>
            <ul className="list-disc list-inside">
              {product.info.map((item, index) => (
                <li key={index}>
                  {item.key}: {item.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Ratings</h3>
        {product.rating.length > 0 ? (
          <ul className="space-y-2">
            {product.rating.map((rating, index) => (
              <li key={index}>
                {/* Display rating information here */}
                Rating {index + 1}: {JSON.stringify(rating)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No ratings yet.</p>
        )}
      </div>
    </div>
  );
}
