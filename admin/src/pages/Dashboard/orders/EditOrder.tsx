import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

interface OrderTypes {
  // customerName: string;
  paymentMethod: string;
  paymentNumber: number;
  status: string;
  paymentStatus: string;
  total: number;
}

const OrderForm = () => {
  const { id } = useParams();

  //   alert(id);
  const [formData, setFormData] = useState<OrderTypes>({
    // customerName: "",
    total: 0,
    paymentMethod: "",
    paymentNumber: 0,
    status: "",
    paymentStatus: "",
  });

  console.log(formData.status);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `https://justo-bath-body-care-siem.vercel.app/api/orders/${id}`,
        formData
      );
      toast.success(data.message);
      navigate("/dashboard/orders");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }

    // Submit form logic here
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `https://justo-bath-body-care-siem.vercel.app/api/orders/${id}`
      );
      setFormData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-[800px] rounded-lg mx-auto text-black p-8">
      <h1 className="my-4 text-3xl font-bold tracking-tight text-black">
        Update Form
      </h1>
      <form className="space-y-6" onSubmit={handleUpdate}>
        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-medium text-gray-700"
            htmlFor="customerName"
          >
            Total{" "}
          </label>
          <input
            className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
            id="total"
            placeholder="Enter customer name"
            type="text"
            name="total"
            value={formData.total}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-medium text-gray-700"
            htmlFor="productName"
          >
            Order Status
          </label>
          <select
            name="status"
            className="rounded-md border border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
            id="orderStatus"
            onChange={handleChange}
            value={formData.status}
          >
            <option value="">Select Order Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-medium text-gray-700"
            htmlFor="quantity"
          >
            Quantity
          </label>
          <input
            className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
            id="quantity"
            placeholder="Enter quantity"
            type="number"
            name="quantity"
            // value={formData.orderItem[0].quantity}
            onChange={handleChange}
          />
        </div> */}

        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-medium text-gray-700"
            htmlFor="paymentMethod"
          >
            Payment Method
          </label>
          <select
            name="paymentMethod"
            className="rounded-md border border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
            id="paymentMethod"
            onChange={handleChange}
            value={formData.paymentMethod}
          >
            <option value="">Select Payment Method</option>
            <option value="card">Card</option>
            <option value="mpesa">Mpesa</option>

          </select>
        </div>

        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-medium text-gray-700"
            htmlFor="paymentNumber"
          >
            Payment Number
          </label>
          <select
            name="paymentStatus"
            className="rounded-md border border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
            id="paymentStatus"
            onChange={handleChange}
            value={formData.paymentStatus}
          >
            <option value="">Payment Status</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <button
          className="w-full rounded-md bg-black px-4 text-sm font-medium text-white py-3"
          type="submit"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
