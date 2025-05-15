import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import axios from "axios";
import { MoveHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { useAuthStore } from "../../store/store";

type Products = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  size: string[];
  isNew: boolean;
  inStock: boolean;
  image: string;
};

export const ProductTable = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://justo-bath-body-care-siem.vercel.app/api/products/"
      ); // Replace with your API endpoint
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      if (!confirm("Are you sure you want to delete this product?")) return;
      await axios.delete(
        `https://justo-bath-body-care-siem.vercel.app/api/products/${id}`
      );
      fetchProducts();
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id: string) => {
    navigate(`/dashboard/products/update/${id}`);
  };

  return (
    <>
      <div className=" flex justify-between p-6 ">
        <div className="flex flex-col space-y-2">
          <h1 className="text-xl font-bold">Products Lists</h1>
          <p className="">List of all products available in the store</p>
        </div>
        <Button onClick={() => navigate("/dashboard/products/add-product")}>
          Add New Product
        </Button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center p-6 h-96">
          <h1 className="text-xl">Loading...</h1>
        </div>
      ) : products?.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <h1 className="text-xl font-semibold">No Products Found</h1>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="border rounded-sm p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Image</TableHead>
                  {/* <TableHead className="min-w-[150px]">Description</TableHead> */}
                  <TableHead className="hidden md:table-cell">
                    Category
                  </TableHead>
                  <TableHead className="text-left">Price</TableHead>
                  <TableHead className="hidden sm:table-cell">Size</TableHead>
                  <TableHead className="text-left">Rating</TableHead>
                  <TableHead className="text-left">Status</TableHead>
                  <TableHead className="text-left">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product: Products) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-md"
                      />
                    </TableCell>
                    {/* <TableCell className="min-w-[150px]">
                      {product.description}
                    </TableCell> */}
                    <TableCell className="hidden md:table-cell">
                      {product.category}
                    </TableCell>
                    <TableCell className="text-left">
                      {product.price.toString()}
                    </TableCell>

                    <TableCell className="hidden sm:table-cell">
                      {product.size}
                    </TableCell>
                    <TableCell className="text-left">
                      {product.rating}
                    </TableCell>
                    <TableCell className="text-left">
                      <div className="flex flex-col gap-1">
                        {product.inStock ? (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
                          >
                            In Stock
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200"
                          >
                            Out of Stock
                          </Badge>
                        )}
                        {product.isNew && (
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200"
                          >
                            New
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-left">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoveHorizontalIcon className="w-4 h-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleUpdate(product.id)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};
