import { ArrowRight, CheckCircle, Clock, Lightbulb, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#C9F7FD]">
      <section className="py-12 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#1B1924]">
          About Q-Manager
        </h1>
        <p className="text-lg max-w-3xl mx-auto text-[#131123]">
          Redefining queue management with smart, efficient, and digital
          solutions.
        </p>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#1B1924]">
            Why Q-Manager?
          </h2>
          <p className="text-lg text-[#131123] mb-8">
            Traditional queues waste time. We bring a modern, digital approach
            to queue management.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Clock,
                title: "The Problem",
                desc: "Long wait times, no transparency, and frustrating experiences.",
              },
              {
                icon: CheckCircle,
                title: "The Solution",
                desc: "Real-time queue tracking, estimated wait times, and seamless digital experience.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg border border-[#1B1924] transform transition duration-300 hover:scale-105 hover:bg-[#fafeff]"
              >
                <div className="h-16 w-16 bg-[#1B1924] text-white flex items-center justify-center rounded-full mb-4 mx-auto">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#1B1924]">
                  {item.title}
                </h3>
                <p className="text-[#131123]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#1B1924]">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "Sign Up",
                icon: Users,
                desc: "Create an account and log in.",
              },
              {
                step: "Join a Queue",
                icon: Lightbulb,
                desc: "Find and join an available queue.",
              },
              {
                step: "Get Updates",
                icon: Clock,
                desc: "Track wait times and get notified when it's your turn.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg border border-[#1B1924] transform transition duration-300 hover:scale-105 hover:bg-[#fafeff] text-center"
              >
                <div className="h-16 w-16 bg-[#1B1924] text-white flex items-center justify-center rounded-full mb-4 mx-auto">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#1B1924]">
                  {item.step}
                </h3>
                <p className="text-[#131123]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#1B1924]">
            Community & Future Vision
          </h2>
          <p className="text-lg text-[#131123] mb-8">
            We're building a growing community while continuously improving
            Q-Manager.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Community Engagement",
                desc: "Join our Discord, share feedback, and help shape the future of queue management.",
              },
              {
                title: "Roadmap & Vision",
                desc: "Upcoming features include AI-powered queue predictions, SMS notifications, and multi-queue management.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg border border-[#1B1924] transform transition duration-300 hover:scale-105 hover:bg-[#fafeff]"
              >
                <h3 className="text-xl font-semibold mb-2 text-[#1B1924]">
                  {item.title}
                </h3>
                <p className="text-[#131123]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#1B1924]">
            Trusted By Users & Businesses
          </h2>
          <p className="text-lg text-[#131123] mb-8">
            Our platform is already making an impact. Here’s what users are
            saying:
          </p>
          <div className="p-6 bg-[#fafeff] rounded-lg shadow-lg border border-[#1B1924]">
            <p className="text-lg italic text-[#1B1924]">
              "Q-Manager saved us hours of waiting. A game-changer for our
              business!"
            </p>
            <p className="mt-4 font-semibold text-[#131123]">- A Happy User</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-[#1B1924] rounded-2xl p-12 text-white shadow-lg">
            <h2 className="text-4xl font-extrabold mb-6">
              Ready to Transform Your Queue Management?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Join thousands of businesses already using Q-Manager.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 text-lg font-semibold rounded-md bg-white text-[#1B1924] hover:bg-gray-200 shadow-md"
            >
              Get Started <ArrowRight className="inline h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
