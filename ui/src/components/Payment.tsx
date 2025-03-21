// import { useCheckout } from "@/features/useCheckout";

import { useCheckout } from "@/features/useCheckout";
import React, { useState } from "react";

interface PaymentProps {
  onSubmit: () => void;
}

const Payment: React.FC<PaymentProps> = ({ onSubmit }) => {
  const { paymentMethod, setPaymentMethod, paymentNumber, setPaymentNumber } =
    useCheckout((state) => ({
      paymentMethod: state.paymentMethod,
      setPaymentMethod: state.setPaymentMethod,
      paymentNumber: state.paymentNumber,
      setPaymentNumber: state.setPaymentNumber,
      onSubmit: state.changeStageToPayment,
    }));

  const [validPayment, setValidPayment] = useState<string>("");

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentNumber(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (
      paymentMethod === "EVC" &&
      (!paymentNumber?.startsWith("61") || paymentNumber.length != 9)
    ) {
      setValidPayment("Enter a valid EVC number");
    }

    if (
      paymentMethod === "ZAAD" &&
      (!paymentNumber?.startsWith("69") || paymentNumber.length != 9)
    ) {
      setValidPayment("Enter a valid ZAAD number");
    }

    if (
      paymentMethod === "SAHAL" &&
      (!paymentNumber?.startsWith("63") || paymentNumber.length != 9)
    ) {
      setValidPayment("Enter a valid SAHAL number");
    }

    e.preventDefault();
    onSubmit(); // Call the parent function to register the order
  };
  return (
    <div className="w-[400px]">
      <h3 className="text-lg py-2 font-medium">PAYMENT INFORMATION</h3>
      <form onSubmit={handleSubmit}>
        <div className="py-2">
          <select
            value={paymentMethod ?? ""}
            onChange={handlePaymentMethodChange}
            className="border-gray-400 w-full border py-2 px-4"
          >
            <option value="" disabled>
              Select Payment Method
            </option>
            <option value="ZAAD">ZAAD</option>
            <option value="EVC">EVC</option>
            <option value="SAHAL">SAHAL</option>
          </select>
        </div>
        <div className="py-2">
          <input
            type="text"
            placeholder={
              paymentMethod === "EVC"
                ? "Enter EVC Number"
                : paymentMethod === "ZAAD"
                ? "Enter ZAAD Number"
                : paymentMethod === "SAHAL"
                ? "Enter SAHAL Number"
                : "Enter Payment Number"
            }
            value={paymentNumber ?? ""}
            onChange={handleNumberChange}
            className="border-gray-400 w-full border py-2 px-4"
            pattern="\d*" // Ensure only numbers are entered
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 w-full py-2 mt-2 bg-black text-white"
        >
          Confirm Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;
