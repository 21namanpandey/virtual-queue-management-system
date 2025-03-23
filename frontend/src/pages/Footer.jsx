import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t mt-auto"
      style={{
        backgroundColor: "#E6F9FC",
        borderColor: "#1B1924",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link
              to="/"
              className="text-lg font-semibold"
              style={{ color: "#1B1924" }}
            >
              Q-Manager
            </Link>
            <p className="text-sm" style={{ color: "#1B1924" }}>
              Streamline your queues, simplify your life. The modern solution
              for queue management.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4" style={{ color: "#1B1924" }}>
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/features"
                  className="text-sm hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-sm hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-sm hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4" style={{ color: "#1B1924" }}>
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-sm hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4" style={{ color: "#1B1924" }}>
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-sm hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t" style={{ borderColor: "#1B1924" }}>
          <p className="text-sm text-center" style={{ color: "#1B1924" }}>
            © {currentYear} Q-Manager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
