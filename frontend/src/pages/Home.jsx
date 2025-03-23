import { Link } from "react-router-dom";
import { ArrowRight, Clock, Users, Shield, Zap } from "lucide-react";
const Home = () => {
  const features = [
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Get instant notifications about your position in the queue",
    },
    {
      icon: Users,
      title: "Multi-queue Support",
      description: "Join and manage multiple queues simultaneously",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security",
    },
    {
      icon: Zap,
      title: "Fast Integration",
      description: "Easy to set up and integrate with your existing systems",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#C9F7FD" }}
    >
      <main className="flex-grow">
        <section className="py-20 px-4 text-center">
          <div className="max-w-7xl mx-auto space-y-8">
            <h1
              className="text-5xl md:text-6xl font-bold tracking-tight"
              style={{ color: "#1B1924" }}
            >
              Queue Management
              <span className="block" style={{ color: "#131123" }}>
                Made Simple
              </span>
            </h1>
            <p
              className="text-xl max-w-2xl mx-auto"
              style={{ color: "#131123" }}
            >
              Streamline your queues and enhance customer experience with our
              modern queue management system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <button
                  className="px-6 py-3 rounded-md text-white"
                  style={{ backgroundColor: "#1B1924" }}
                >
                  Get Started <ArrowRight className="ml-2 inline-block" />
                </button>
              </Link>
              <Link to="/help">
                <button
                  className="px-6 py-3 rounded-md border text-black"
                  style={{
                    borderColor: "#1B1924",
                    backgroundColor: "#e0fbff",
                  }}
                >
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-3xl font-bold mb-4"
                style={{ color: "#1B1924" }}
              >
                Why Choose Q-Manager?
              </h2>
              <p className="text-lg" style={{ color: "#131123" }}>
                Experience the benefits of modern queue management
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 border rounded-lg shadow"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: "#1B1924",
                  }}
                >
                  <feature.icon
                    className="h-12 w-12 mb-4"
                    style={{ color: "#1B1924" }}
                  />
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: "#1B1924" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-base" style={{ color: "#131123" }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#010d13] to-[#011417] rounded-2xl p-12 text-white shadow-lg">
            <h2 className="text-4xl font-extrabold mb-6">
              Ready to Transform Your Queue Management?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Join thousands of businesses already using Q-Manager.
            </p>
            <Link to="/register">
              <button className="px-6 py-3 text-lg font-semibold rounded-md text-black bg-white text-primary hover:bg-gray-100 shadow-md">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
