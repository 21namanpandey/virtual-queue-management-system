import { useNavigate } from "react-router-dom";
import { Coffee, Heart, Map, Users, ArrowRight } from "lucide-react";

const Careers = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Coffee,
      title: "Flexible Work",
      description: "Remote work options & flexible hours.",
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Health insurance & wellness programs.",
    },
    {
      icon: Users,
      title: "Team Culture",
      description: "Collaborative & diverse work environment.",
    },
    {
      icon: Map,
      title: "Growth & Learning",
      description: "Learning budget for professional development.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#C9F7FD]">
      <section className="py-10 px-6 text-center ">
        <h1 className="text-5xl font-bold mb-4 text-[#1B1924]">
          Join Our Team
        </h1>
        <p className="text-lg max-w-3xl mx-auto text-[#131123]">
          Help us revolutionize queue management and make a real impact.
        </p>
      </section>

      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#1B1924]">
            Why Work With Us?
          </h2>
          <p className="text-lg text-[#131123] mb-8">
            We believe in creating a positive work culture that encourages
            growth and innovation.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md border border-[#1B1924]"
              >
                <benefit.icon className="h-12 w-12 mb-4 text-[#1B1924]" />
                <h3 className="text-xl font-semibold mb-2 text-[#1B1924]">
                  {benefit.title}
                </h3>
                <p className="text-[#131123]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 ">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-[#1B1924]">
              Our Culture & Vision
            </h2>
            <p className="text-lg text-[#131123] mb-6">
              At Q-Manager, we believe in innovation, teamwork, and continuous
              learning.
            </p>
            <p className="text-lg text-[#131123] mb-6">
              We are shaping the future of queue management by building
              technology that saves time and improves efficiency.
            </p>
            <p className="text-lg text-[#131123]">
              Join us in our mission to make every queue smarter and faster!
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
              alt="Team collaboration"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-[#1B1924] rounded-2xl p-12 text-white shadow-lg">
            <h2 className="text-4xl font-extrabold mb-6">
              Ready to Build the Future?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Explore our open positions and become part of Q-Manager today.
            </p>
            <button
              onClick={() => navigate("/careers")}
              className="px-6 py-3 text-lg font-semibold rounded-md bg-white text-[#1B1924] hover:bg-gray-200 shadow-md"
            >
              View Open Positions <ArrowRight className="inline h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
