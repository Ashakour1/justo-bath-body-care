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
  id: string;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  Shipping: Array<{
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  }> | null;
  OrderItem: Array<{
    quantity: number;
    Product: { id: string; name: string; price: number; image: string };
  }> | null;
  total: number;
  createdAt: string;
}

export const OrderTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "justo-bath-body-care-siem.vercel.app/api/orders/"
      );
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (orderId: string) => {
    try {
      await axios.delete(
        `justo-bath-body-care-siem.vercel.app/api/orders/${orderId}`
      );
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id: string) => {
    navigate(`/dashboard/orders/update/${id}`);
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <h1 className="text-xl">Loading...</h1>
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
                  {/* Safe access for shipping */}
                  <TableCell>
                    {order.Shipping?.[0]?.name || "No Name"}
                  </TableCell>

                  {/* Safe access for orderItem */}
                  <TableCell>
                    {order.OrderItem?.[0]?.Product?.name || "No Product"}
                  </TableCell>

                  <TableCell>{order.OrderItem?.[0]?.quantity || 0}</TableCell>
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
