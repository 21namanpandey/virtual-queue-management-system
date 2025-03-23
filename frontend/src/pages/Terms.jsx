const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#C9F7FD] text-[#131123]">
      <section className="py-10 px-6 text-center ">
        <h1 className="text-5xl font-bold mb-4 text-[#1B1924]">
          Terms of Service
        </h1>
        <p className="text-lg text-[#131123]">Last updated: February 2025</p>
      </section>

      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8 border border-[#1B1924]">
          <p className="text-lg mb-6">
            These Terms govern the use of **Q-Manager** ("we", "us", "our") and
            outline our responsibilities and your obligations.
          </p>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#1B1924]">
              1. Use of Services
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Q-Manager is designed for queue management and scheduling.
              </li>
              <li>
                You must provide accurate information and comply with applicable
                laws.
              </li>
              <li>Unauthorized access or abuse of the system is prohibited.</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#1B1924]">
              2. Accounts
            </h2>
            <p>
              Users are responsible for securing their account credentials and
              must notify us in case of unauthorized access.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#1B1924]">
              3. Payments
            </h2>
            <p>
              Subscription plans are billed monthly, and cancellations take
              effect at the end of the billing cycle.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#1B1924]">
              4. Data Protection
            </h2>
            <p>
              We follow strict data security measures but cannot guarantee
              complete security.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#1B1924]">
              5. Limitation of Liability
            </h2>
            <p>
              Q-Manager is not liable for indirect damages, service downtime, or
              loss of data.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#1B1924]">
              6. Contact Us
            </h2>
            <p>If you have any concerns regarding these Terms, contact us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Email:</strong> legal@qmanager.in
              </li>
              <li>
                <strong>Phone:</strong> +91 98765 43210
              </li>
              <li>
                <strong>Address:</strong> 123 Business Street, Bengaluru, India
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
