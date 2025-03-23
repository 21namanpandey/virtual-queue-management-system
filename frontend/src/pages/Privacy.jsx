const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#C9F7FD] text-[#131123]">
      <section className="py-10 px-6 text-center ">
        <h1 className="text-5xl font-bold mb-4 text-[#1B1924]">
          Privacy Policy
        </h1>
        <p className="text-lg text-[#131123]">Last updated: February 2025</p>
      </section>

      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8 border border-[#1B1924]">
          <p className="text-lg mb-6">
            This Privacy Policy explains how **Q-Manager** ("we", "us", "our")
            collects, uses, and protects your personal data when you use our
            queue management system.
          </p>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#1B1924]">
              Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Data:</strong> Name, email, phone number, and
                location details.
              </li>
              <li>
                <strong>Usage Data:</strong> Device information, pages visited,
                and service usage.
              </li>
              <li>
                <strong>Queue Data:</strong> Queue names, wait times, and user
                positions.
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#1B1924]">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and improve our services.</li>
              <li>To send queue status updates and notifications.</li>
              <li>To analyze and optimize system performance.</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#1B1924]">
              Data Security
            </h2>
            <p>
              We use encryption and security best practices to protect your
              data, but no system is 100% secure.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#1B1924]">
              Your Rights
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access and update your data.</li>
              <li>Request deletion of your account.</li>
              <li>Opt out of marketing communications.</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#1B1924]">
              Contact Us
            </h2>
            <p>If you have questions, contact us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Email:</strong> privacy@qmanager.in
              </li>
              <li>
                <strong>Phone:</strong> +91 98111 00000
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

export default Privacy;
