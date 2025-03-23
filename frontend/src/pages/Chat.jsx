import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SendHorizontal, MessageCircle, Circle } from "lucide-react";

const LiveChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! Welcome to our live chat support. How can I help you today?",
      sender: "agent",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    simulateAgentResponse();
  };

  const simulateAgentResponse = () => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "Thank you for your message. Let me check that for you.",
          sender: "agent",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col bg-[#C9F7FD] text-[#131123]">
      <div className="py-10 px-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-5xl font-bold text-[#1B1924] flex items-center gap-3">
          <MessageCircle className="h-10 w-10" /> Live Chat Support
        </h2>
        <div className="flex items-center text-2xl gap-2 text-green-600 mt-2">
          <Circle className="h-4 w-4 fill-current" /> Online
        </div>
      </div>

      <div className="max-w-4xl mx-auto flex-grow py-6 px-4">
        <div className="p-6 bg-white shadow-md rounded-lg border border-[#1B1924]">
          <div
            className="flex flex-col space-y-4 p-4 border rounded-md"
            style={{ minHeight: "50vh", maxHeight: "50vh", overflowY: "auto" }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-[#1B1924] text-white"
                      : "bg-gray-100 text-[#131123]"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="p-3 rounded-lg bg-gray-100 text-[#131123]">
                  <p className="text-sm">Support Agent is typing...</p>
                  <div className="flex space-x-1 mt-1">
                    <div className="w-2 h-2 bg-[#1B1924] rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-[#1B1924] rounded-full animate-bounce"
                      style={{ animationDelay: "200ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-[#1B1924] rounded-full animate-bounce"
                      style={{ animationDelay: "400ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center mt-4">
            <input
              type="text"
              className="w-full p-3 border rounded-md focus:outline-none"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              className="ml-3 px-4 py-2 bg-[#1B1924] text-white rounded-md hover:bg-[#131123]"
              onClick={handleSendMessage}
            >
              <SendHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#1B1924] mb-6">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              {
                question: "How do virtual queues work?",
                answer:
                  "Virtual queues allow you to join a line remotely and receive updates on your position.",
              },
              {
                question: "Can I join multiple queues?",
                answer:
                  "Yes, you can join as many queues as you'd like and receive notifications.",
              },
              {
                question: "What if I miss my turn?",
                answer:
                  "Queue managers can move you back or ask you to rejoin, depending on policy.",
              },
              {
                question: "How do I create my own queue?",
                answer: "You'll need an admin account. Contact us for access.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-md rounded-lg border border-[#1B1924]"
              >
                <h3 className="text-lg font-semibold text-[#1B1924]">
                  {faq.question}
                </h3>
                <p className="text-gray-700 mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
