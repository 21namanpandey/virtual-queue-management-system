import {
  Check,
  Clock,
  Users,
  Shield,
  Zap,
  Bell,
  BarChart,
  Smartphone,
  MessageCircle,
  Cpu,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Clock,
      title: "Real-time Updates",
      description:
        "Get instant notifications about your position in the queue with accurate wait time estimations.",
      benefits: [
        "Live queue position tracking",
        "Accurate wait time predictions",
        "Instant status changes",
        "Automatic notifications",
      ],
    },
    {
      icon: Users,
      title: "Multi-queue Support",
      description:
        "Join and manage multiple queues simultaneously across different locations or departments.",
      benefits: [
        "Unlimited queue creation",
        "Customizable queue settings",
        "Priority management",
        "Batch processing options",
      ],
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Your data is protected with enterprise-grade security and our platform ensures 99.9% uptime.",
      benefits: [
        "End-to-end encryption",
        "GDPR compliant",
        "Regular security audits",
        "Data backup and recovery",
      ],
    },
    {
      icon: Zap,
      title: "Fast Integration",
      description:
        "Easy to set up and integrate with your existing systems through our comprehensive API.",
      benefits: [
        "RESTful API access",
        "Webhook support",
        "SDK for major platforms",
        "Custom integration assistance",
      ],
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Customize how and when you receive notifications about queue status changes.",
      benefits: [
        "Email, SMS, and push notifications",
        "Customizable alert thresholds",
        "Scheduled reminders",
        "Group notifications",
      ],
    },
    {
      icon: BarChart,
      title: "Advanced Analytics",
      description:
        "Gain insights into queue performance and customer behavior with detailed analytics.",
      benefits: [
        "Comprehensive dashboards",
        "Custom report generation",
        "Trend analysis",
        "Exportable data",
      ],
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description:
        "Access Q-Manager from any device with our responsive design and native mobile apps.",
      benefits: [
        "Responsive web interface",
        "iOS and Android apps",
        "Offline capabilities",
        "Low data usage mode",
      ],
    },
    {
      icon: MessageCircle,
      title: "Live Chat Support",
      description:
        "Get real-time assistance with our dedicated support team, available anytime you need help.",
      benefits: [
        "Instant live chat support",
        "24/7 availability",
        "Quick issue resolution",
        "Dedicated customer care",
      ],
    },
    {
      icon: Cpu,
      title: "AI-Powered Queue Predictions",
      description:
        "AI-powered queue forecasting helps you estimate wait times based on historical data.",
      benefits: [
        "Smart AI-driven predictions",
        "Improved wait time accuracy",
        "Data-driven insights",
        "Optimized queue efficiency",
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#C9F7FD]">
      <section className="py-10 px-6 text-center ">
        <h1 className="text-5xl font-bold mb-4 text-[#1B1924]">
          Q-Manager Features
        </h1>
        <p className="text-lg max-w-3xl mx-auto text-[#131123]">
          Transform your queue management with powerful, efficient, and
          user-friendly features.
        </p>
      </section>

      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md border border-[#1B1924] transition-transform transform hover:scale-105 hover:bg-[#fafeff]"
            >
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-[#C9F7FD] mb-4 transition-all duration-300 group">
                <feature.icon className="h-10 w-10 text-[#1B1924] transition-all duration-300 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1B1924]">
                {feature.title}
              </h3>
              <p className="text-[#131123] mb-4">{feature.description}</p>
              <h4 className="font-medium mb-2 text-[#1B1924]">Key Benefits:</h4>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-[#1B1924] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#131123]">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Features;
