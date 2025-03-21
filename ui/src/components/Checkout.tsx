import { useCart } from "@/features/useCart";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import Payment from "./Payment";
import { useCheckout } from "@/features/useCheckout";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const Checkout = () => {
  const { products, totalPrice, tax, totalPriceWithTax, RemoveCart } = useCart(
    (state) => ({
      products: state.products,
      totalPrice: state.totalPrice,
      tax: state.tax,
      RemoveCart: state.RemoveCart,
      totalPriceWithTax: state.totalPriceWithTax,
    })
  );

  const {
    stage,
    shippingDetails,
    paymentMethod,
    paymentNumber,
    setShippingDetails,
    setPaymentNumber,
    setPaymentMethod,
    changeStageToInformation,
  } = useCheckout((state) => ({
    stage: state.stage,
    shippingDetails: state.shippingDetails,
    paymentMethod: state.paymentMethod,
    paymentNumber: state.paymentNumber,
    setShippingDetails: state.setShippingDetails,
    setPaymentNumber: state.setPaymentNumber,
    setPaymentMethod: state.setPaymentMethod,
    changeStageToInformation: state.changeStageToInformation,
  }));

  const handleDelete = (id: any) => {
    RemoveCart(id);
  };

  const handleFinalSubmit = async () => {
    // Prepare data to send to backend
    let orderData = {
      total: totalPriceWithTax,
      paymentMethod,
      paymentNumber,
      orderItem: products.map((product) => ({
        product_id: product.id,
        quantity: product.quantity,
      })),
      shipping: {
        email: shippingDetails.email,
        phone: shippingDetails.phone,
        name: shippingDetails.name,
        address: shippingDetails.address,
      },
    };

    const URL = "/api/orders/create";
    try {
      const { data } = await axios.post(URL, orderData);
      toast.success(data.message);
      // Clear form fields and cart
      setPaymentNumber("");
      setPaymentMethod("");
      setShippingDetails({
        email: "",
        phone: "",
        name: "",
        address: "",
      });
      products.forEach((product) => {
        if (product.id !== null) {
          RemoveCart(product.id);
        }
      });
      changeStageToInformation();
      const phoneNumber = "+252616590032";
      // Construct the order details for the message
      const orderDetails = products
        .map(
          (product) =>
            `Name: ${product.name}, Size: ${product.selectedSize}, Color: ${product.selectedColor}, Price: $${product.price}, Quantity: ${product.quantity}`
        )
        .join("\n");

      const totalMessage = `Total Amount: $${totalPrice.toFixed(2)}`; // Ensure formatting for consistency
      const vatMessage = `VAT (5%): $${tax.toFixed(2)}`; // VAT calculated correctly
      const totalAmount = `Total Amount (with VAT): $${totalPriceWithTax.toFixed(
        2
      )}`; // Total including VAT

      // Include additional shipping and payment information
      const shippingMessage = `
        Name: ${shippingDetails.name}
        Address: ${shippingDetails.address}
        Phone: ${shippingDetails.phone}
        Payment Method: ${paymentMethod}
        Payment Number: ${paymentNumber}
      `;

      // Encode the message for transmission
      const encodedMessage = encodeURIComponent(
        `Order Details:\n${orderDetails}\n${totalMessage}\n${vatMessage}\n\n${totalAmount}\nShipping Details:${shippingMessage}`
      );
      const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

      const newWindow = window.open(url, "_blank");
      if (newWindow) {
        newWindow.focus();
      } else {
        console.error(
          "Opening new window failed. Please check your browser settings."
        );
      }
    } catch (error) {
      toast.error("Error creating order. Please try again."); // User-friendly error message
      console.error(error);
    }

    console.log(orderData);
  };

  return (
    <main className="max-w-[1080px] mx-auto md:px-4 lg:px-0 px-4 py-10">
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      {products?.length === 0 ? (
        <div className="text-center flex flex-col mt-44 justify-center items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            No products to checkout.
          </h2>
          <Link to="/shop" className="text-sm font-medium">
            <button className="border border-black px-4 py-2 my-4">
              Back to Shop
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-3">
            <Link to="#" className="flex items-center text-sm font-medium">
              <HiOutlineArrowLongLeft className="text-3xl" />
            </Link>
            <h1 className="text-2xl font-bold">CHECKOUT</h1>
          </div>
          <div className="flex justify-between pt-5">
            {stage === "information" ? (
              <CheckoutForm />
            ) : (
              stage === "payment" && <Payment onSubmit={handleFinalSubmit} />
            )}
            <div className="w-[350px] border p-4">
              <div className="flex justify-between">
                <h1 className="font-semibold">Your Order List</h1>
                <p>{products.length}</p> {/* Dynamic product count */}
              </div>
              {products.map((product) => (
                <div key={product.id} className="pb-2 pt-5 flex gap-2 w-full">
                  <img
                    src={product.image}
                    className="w-20 h-20"
                    alt={product.name}
                  />
                  <div className="w-full flex flex-col">
                    <div className="w-full flex justify-between">
                      <div className="w-full flex flex-col">
                        <h1 className="font-bold text-base">{product.name}</h1>
                        <p className="text-xs pt-1 font-semibold text-gray-500">
                          {product.selectedColor}/ {product.selectedSize}
                        </p>
                      </div>
                      <TiDeleteOutline
                        className="text-2xl cursor-pointer"
                        onClick={() => handleDelete(product.id)}
                      />
                    </div>
                    <div className="pt-3 flex justify-between">
                      <p className="text-xs">({product.quantity})</p>
                      <p>
                        <strong className="text-xs">$ {product.price}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <hr />
              <div className="py-2">
                <div className="flex justify-between py-1">
                  <dt className="text-xs">Sub total</dt>
                  <dd className="text-xs">${totalPrice}</dd>
                </div>
                <div className="flex justify-between py-1">
                  <p className="text-xs">VAT 5%</p>
                  <strong className="text-xs">${tax.toFixed(2)}</strong>
                </div>
              </div>
              <hr />
              <div className="flex justify-between text-xs">
                <p>Total</p>
                <strong className="text-xs">${totalPriceWithTax}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Checkout;
