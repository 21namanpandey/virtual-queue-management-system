import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, MessageSquare, ArrowRight } from "lucide-react";

const Contact = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Message sent! We'll get back to you soon.");

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setLoading(false);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Reach out to our team anytime.",
      contact: "support@qmanager.com",
    },
    {
      icon: Phone,
      title: "Phone",
      description: "Mon-Fri from 9AM to 6PM IST.",
      contact: "+91 98111 00000",
    },
    {
      icon: MapPin,
      title: "Office",
      description: "Visit us at our HQ in India.",
      contact: "Bangalore, Karnataka, India",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#C9F7FD]">
      <section className="py-10 px-6 text-center ">
        <h1 className="text-5xl font-bold mb-4 text-[#1B1924]">Contact Us</h1>
        <p className="text-lg max-w-3xl mx-auto text-[#131123]">
          Have questions? Need assistance? Our team is here to help.
        </p>
      </section>

      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#1B1924]">
            Get in Touch
          </h2>
          <p className="text-lg text-[#131123] mb-8">
            Choose a way to reach us that works best for you.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md border border-[#1B1924] text-center flex flex-col items-center"
              >
                <div className="h-16 w-16 bg-[#1B1924] flex items-center justify-center rounded-full mb-4">
                  <method.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#1B1924]">
                  {method.title}
                </h3>
                <p className="text-[#131123] mb-2">{method.description}</p>
                <p className="font-medium text-[#131123]">{method.contact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-[#1B1924]">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-[#1B1924]"
                >
                  Name
                </label>
                <input
                  id="name"
                  className="w-full p-3 rounded-md border  focus:ring-2 focus:ring-[#1B1924]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-[#1B1924]"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-3 rounded-md border  focus:ring-2 focus:ring-[#1B1924]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-[#1B1924]"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  className="w-full p-3 rounded-md border  focus:ring-2 focus:ring-[#1B1924]"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="How can we help you?"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-[#1B1924]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full p-3 rounded-md border  focus:ring-2 focus:ring-[#1B1924] resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message..."
                  rows={5}
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-[#1B1924] text-white text-lg font-semibold rounded-md hover:bg-gray-800 transition"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="rounded-lg overflow-hidden h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805764.035478949!2d73.82226530893257!3d20.59368403622083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2baf6b6187fdb%3A0x1f529b867d03b7bf!2sIndia!5e0!3m2!1sen!2sin!4v1626189922980!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="India Office"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-[#1B1924] rounded-2xl p-12 text-white shadow-lg">
            <h2 className="text-4xl font-extrabold mb-6">
              Need Immediate Assistance?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Start a live chat with our support team now.
            </p>
            <button
              onClick={() => navigate("/chat")}
              className="px-6 py-3 text-lg font-semibold rounded-md bg-white text-[#1B1924] hover:bg-gray-200 shadow-md"
            >
              Let's Chat <ArrowRight className="inline h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
