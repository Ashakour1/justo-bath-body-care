import axios from "axios";
import { MoveHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
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
import { useAuthStore } from "../../../store/store";
import { useNavigate } from "react-router-dom";

interface Order {
  id: string;
  total: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  Shipping: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  }>;
}

export const CustomerTable = () => {
  // const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://justo-bath-body-care-siem.vercel.app/api/orders/"
      );
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (orderId: string) => {
    try {
      await axios.delete(
        `https://justo-bath-body-care-siem.vercel.app/api/orders/${orderId}`
      );
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <h1 className="text-xl">Loading...</h1>
        </div>
      ) : orders?.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <h1 className="text-xl font-semibold">No customers found</h1>
        </div>
      ) : (
        <div className="p-6">
          <div className=" flex justify-between ">
            <div className="flex flex-col space-y-2">
              <h1 className="text-xl font-bold">Customers Lists</h1>
              <p className="">
                View and manage all customers who have placed orders
              </p>
            </div>
          </div>
          <div className="border shadow-sm rounded-lg p-2 mt-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Customer Name</TableHead>
                  <TableHead className="min-w-[150px]">Phone</TableHead>
                  <TableHead className="min-w-[100px]">Email</TableHead>
                  <TableHead className="min-w-[150px]">Address</TableHead>
                  <TableHead className="min-w-[150px]">City</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.Shipping[0]?.name || "N/A"}</TableCell>
                    <TableCell>{order.Shipping[0]?.phone || "N/A"}</TableCell>
                    <TableCell>{order.Shipping[0]?.email || "N/A"}</TableCell>
                    <TableCell>{order.Shipping[0]?.address || "N/A"}</TableCell>
                    <TableCell>{order.Shipping[0]?.city || "N/A"}</TableCell>
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
        </div>
      )}
    </>
  );
};
