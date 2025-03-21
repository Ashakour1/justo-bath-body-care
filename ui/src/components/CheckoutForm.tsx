import { useState } from "react";
import { useCheckout } from "@/features/useCheckout";

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    name: "",
    address: "",
  });

  const { setShippingDetails, changeStageToPayment, shippingDetails } =
    useCheckout((state) => ({
      setShippingDetails: state.setShippingDetails,
      changeStageToPayment: state.changeStageToPayment,
      shippingDetails: state.shippingDetails,
    }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setShippingDetails(formData);
    changeStageToPayment();
  };

  console.log(shippingDetails);
  return (
    <div className="w-[400px]">
      <p className="text-lg py-2 font-medium">INFORMATION</p>
      <h3 className="text-base font-medium">CONTACT INFO</h3>
      <form action="" onSubmit={handleSubmit}>
        <div className="py-2">
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="border-gray-400 w-full  border py-2 px-4"
          />
        </div>
        <div className="py-2">
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="border-gray-400 w-full  border py-2 px-4"
          />
        </div>
        <h1 className="py-2">SHIPPING ADDRESS</h1>
        <div className="py-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="border-gray-400 w-full border py-2 px-4"
          />
        </div>

        <div className="py-2">
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="border-gray-400 w-full  border py-2 px-4"
          />
        </div>
        <button
          type="submit"
          className="px-4 w-full py-2 mt-2 bg-black text-white "
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
