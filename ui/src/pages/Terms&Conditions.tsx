import { useEffect } from "react";

export default function TermsAndConditionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 max-w-3xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">JUSTO COSMETICS LLC</h1>
        <p className="text-xl font-medium">Terms and Conditions</p>
        <p className="text-sm text-muted-foreground mt-2">
          Effective Date: April 01, 2025
        </p>
      </div>

      <div className="prose prose-slate max-w-none">
        <p className="text-muted-foreground mb-8">
          Please read these Terms and Conditions ("Terms", "Agreement")
          carefully before placing an order with JUSTO Cosmetics LLC ("us",
          "we", or "our"). These Terms apply to all customers and users who
          access or use our products and services. By accessing or placing an
          order, you agree to be bound by these Terms.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold">1. COMPANY INFORMATION</h2>
            <p>
              JUSTO Cosmetics LLC is a legally registered company based in
              Nairobi, Kenya. We specialize in the sale of skincare, haircare,
              perfumes, and bath and body care products.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2. ELIGIBILITY</h2>
            <p>
              By placing an order, you affirm that you are at least 18 years old
              and legally capable of entering into a binding agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3. PRODUCTS AND ORDERS</h2>
            <p>
              All products are sold as-is and are intended for external use
              only. Product descriptions and visuals are provided for
              information purposes and may differ slightly from what is
              delivered due to packaging changes or lighting in photos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. PAYMENT TERMS</h2>
            <p>
              We currently accept payments via M-Pesa. Credit card payments will
              be added in the future. Full payment must be made before delivery.
              Prices are subject to change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5. ORDER CANCELLATIONS</h2>
            <p>
              Orders may be canceled only before the products leave our store.
              Once the order is dispatched or collected, it cannot be canceled,
              refunded, or returned under any condition.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">6. DELIVERY POLICY</h2>
            <p>
              We deliver exclusively within Nairobi County. Deliveries are made
              at the customer's expense and through either in-house staff or
              partnered courier services. Customers must confirm receipt of the
              order upon delivery. If confirmation is not provided, we assume
              full responsibility until confirmation is received.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">7. RETURNS & REFUNDS</h2>
            <p>
              Due to hygiene and safety concerns, we do not accept returns or
              exchanges once products leave our store, regardless of the
              condition or complaint. Customers are encouraged to inspect all
              items before accepting delivery.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">
              8. LIMITATION OF LIABILITY
            </h2>
            <p>
              We are not liable for any allergic reactions, irritations, or
              adverse effects caused by the use or misuse of our products. It is
              the customer's responsibility to read ingredient labels and
              consult a physician for known sensitivities before using our
              products. A patch test is recommended for all first-time users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">9. PRIVACY POLICY</h2>
            <p>
              We collect customer names, email addresses, and phone numbers
              solely for order fulfillment, customer service, and marketing
              communications. By providing your contact information, you consent
              to receive SMS or email updates and promotions from JUSTO
              Cosmetics. Your data is never sold or shared with third parties
              without your consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">10. INTELLECTUAL PROPERTY</h2>
            <p>
              All content on our platforms including product names, packaging,
              designs, formulas, trademarks, and logos are the exclusive
              property of JUSTO Cosmetics LLC. Unauthorized use, reproduction,
              or distribution is strictly prohibited and may result in legal
              action.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">11. THIRD-PARTY SERVICES</h2>
            <p>
              We may use third-party providers (e.g., payment processors or
              couriers) to deliver products or services. We are not responsible
              for any errors, damages, or losses caused by third-party
              providers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">12. FORCE MAJEURE</h2>
            <p>
              We are not liable for any failure or delay in performance due to
              acts of God, natural disasters, war, strikes, government orders,
              pandemics, or any other cause beyond our reasonable control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">13. GOVERNING LAW</h2>
            <p>
              These Terms shall be governed by and interpreted in accordance
              with the laws of the Republic of Kenya. Any disputes shall be
              resolved through good-faith negotiations. If unresolved, disputes
              will be subject to the exclusive jurisdiction of the courts
              located in Nairobi, Kenya.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">14. SEVERABILITY</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or
              invalid under applicable law, the remaining provisions shall
              continue in full force and effect.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t text-center">
          <p className="text-sm text-muted-foreground">
            Last updated: April 01, 2025 • JUSTO Cosmetics LLC • Nairobi, Kenya
          </p>
        </div>
      </div>
    </div>
  );
}
