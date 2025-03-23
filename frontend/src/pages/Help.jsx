import {
  ArrowLeft,
  HelpCircle,
  MessageSquare,
  Mail,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Help = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I join a queue?",
      answer:
        "Navigate to the Dashboard, find your desired queue, and click the 'Join Queue' button. You'll receive a confirmation with your position number.",
    },
    {
      question: "Can I be in multiple queues at once?",
      answer:
        "Yes, you can join multiple queues simultaneously. Each queue will track your position independently.",
    },
    {
      question: "How are wait times calculated?",
      answer:
        "Wait times are estimated based on the average service time per person and the number of people ahead of you in the queue.",
    },
    {
      question: "What happens if I miss my turn?",
      answer:
        "If you miss your turn, you may need to rejoin the queue. Enable notifications to receive alerts when your turn is approaching.",
    },
  ];

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen"
      style={{ backgroundColor: "#C9F7FD" }}
    >
      <div className="w-full max-w-3xl p-4 space-y-8">
        <div className="space-y-2 text-center">
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: "#1B1924" }}
          >
            Help Center
          </h1>
          <p className="text-lg" style={{ color: "#131123" }}>
            Find answers and get support
          </p>
        </div>

        <div
          className="p-6 rounded-lg shadow-lg w-full border"
          style={{ backgroundColor: "#ffffff" }}
        >
          <h2
            className="text-2xl font-bold flex items-center gap-2"
            style={{ color: "#1B1924" }}
          >
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-medium" style={{ color: "#1B1924" }}>
                  {faq.question}
                </h3>
                <p
                  className="text-muted-foreground"
                  style={{ color: "#131123" }}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="p-6 rounded-lg shadow-lg w-full border"
          style={{ backgroundColor: "#ffffff" }}
        >
          <h2 className="text-2xl font-bold pb-2" style={{ color: "#1B1924" }}>
            Contact Support
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-3 text-center">
              <div
                className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto"
                style={{ backgroundColor: "#e0f7fa" }}
              >
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium" style={{ color: "#1B1924" }}>
                Live Chat
              </h3>
              <p
                className="text-sm text-muted-foreground"
                style={{ color: "#131123" }}
              >
                Chat with our support team
              </p>
              <button
                className="w-full py-2 px-4 rounded-md text-white cursor-pointer"
                style={{ backgroundColor: "#1B1924" }}
                onClick={() => navigate("/chat")}
              >
                Start Chat
              </button>
            </div>

            <div className="space-y-3 text-center">
              <div
                className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto"
                style={{ backgroundColor: "#e0f7fa" }}
              >
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium" style={{ color: "#1B1924" }}>
                Email Support
              </h3>
              <p
                className="text-sm text-muted-foreground"
                style={{ color: "#131123" }}
              >
                support@example.com
              </p>
              <button
                className="w-full py-2 px-4 rounded-md text-white cursor-pointer"
                style={{ backgroundColor: "#1B1924" }}
              >
                Send Email
              </button>
            </div>

            <div className="space-y-3 text-center">
              <div
                className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto"
                style={{ backgroundColor: "#e0f7fa" }}
              >
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium" style={{ color: "#1B1924" }}>
                Phone Support
              </h3>
              <p
                className="text-sm text-muted-foreground"
                style={{ color: "#131123" }}
              >
                +91 98111 00000
              </p>
              <button
                className="w-full py-2 px-4 rounded-md text-white cursor-pointer"
                style={{ backgroundColor: "#1B1924" }}
              >
                Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
