import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import axios from "axios";
import { MoveHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../../../components/ui/badge";
import { useNavigate } from "react-router-dom";

interface Order {
  id: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  shipping: Array<{
    name: string;
    email: string;
    phone: string;
    address: string;
  }>;
  orderItem: Array<{
    productId: number;
    quantity: number;
  }>;
  total: number;
  createdAt: string;
}

interface Product {
  id: number;
  name: string;
}

export const OrderTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]); // State for products
  const [loading, setLoading] = useState(false);

  const fetchOrdersAndProducts = async () => {
    setLoading(true);
    try {
      const [ordersResponse, productsResponse] = await Promise.all([
        axios.get("http://localhost:8000/api/orders/"),
        axios.get("http://localhost:8000/api/products/"),
      ]);

      setOrders(ordersResponse.data); // Store fetched orders in state
      setProducts(productsResponse.data); // Store fetched products in state
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const productMap = products.reduce((acc, product) => {
    acc[product.id] = product.name; // Map product ID to name
    return acc;
  }, {} as Record<number, string>);

  // const ProductId =

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrdersAndProducts();
  }, []);

  const handleDelete = async (orderId: any) => {
    try {
      const data = await axios.delete(
        `http://localhost:8000/api/orders/${orderId}`
      );
      console.log(data);
      fetchOrdersAndProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id: any) => {
    navigate(`/dashboard/orders/update/${id}`);
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <h1 className="text-xl ">Loading...</h1>
        </div>
      ) : orders?.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <h1 className="text-xl font-semibold">No Orders Found</h1>
        </div>
      ) : (
        <div className="border shadow-sm rounded-lg p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px]">Customer</TableHead>
                <TableHead className="min-w-[150px]">Product</TableHead>
                <TableHead className="min-w-[100px]">Quantity</TableHead>
                <TableHead className="min-w-[150px]">Total Price</TableHead>
                <TableHead className="min-w-[150px]">Payment Method</TableHead>
                <TableHead className="min-w-[150px]">Status</TableHead>
                <TableHead className="min-w-[150px]">Payment Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.shipping[0]?.name}</TableCell>
                  <TableCell>
                    {productMap[order.orderItem[0]?.productId]}
                  </TableCell>
                  <TableCell>{order.orderItem[0]?.quantity}</TableCell>
                  <TableCell>${order.total}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant="outline">
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant="outline">
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoveHorizontalIcon className="w-4 h-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleUpdate(order.id)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(order.id)}
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
      )}
    </>
  );
};
