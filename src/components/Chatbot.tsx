import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const botReplies: { [key: string]: string } = {
  default: "I'm Samita's AI Assistant. Ask me about her internships, projects, technical skills, or how to contact her!",
  skills: "Samita is skilled in AI/ML (TensorFlow, scikit-learn, OpenCV), FPGA design (Verilog, Vitis HLS, Vivado), Programming (Python, C++, Embedded C), and Core ECE subjects like VLSI & DSP.",
  internships: "She has completed four notable internships: 1) Summer Fellow at IIT Madras (Vitis HLS/FPGA), 2) Centre for Autonomous Systems (CAS) at GITAM (GPS Guided Ground Vehicle), 3) SURE Fellow at IIT Hyderabad (BCZT Ceramics ML modelling), and 4) BSNL (Network Telecom configuration).",
  projects: "Her primary projects include Real-Time Human Motion Classification on ESP32 using TensorFlow Lite Micro, ADXL335 early warning Earthquake Detector, and structural health monitoring for Sustainable Bridges.",
  contact: "You can reach Samita at +91 7799440419 or email her at samitapotnuru@gmail.com. Her GitHub, LinkedIn, and Instagram (@hey_samita) are linked on her profile!",
};

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot' as const, text: "Hello! I am Samita's virtual AI assistant. How can I help you explore her portfolio today?" }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMessages = [...messages, { sender: 'user' as const, text }];
    setMessages(newMessages);
    setInputValue('');

    // Determine bot reply based on keywords
    setTimeout(() => {
      let reply = botReplies.default;
      const lowerText = text.toLowerCase();
      if (lowerText.includes('skill') || lowerText.includes('language') || lowerText.includes('technologies')) {
        reply = botReplies.skills;
      } else if (lowerText.includes('intern') || lowerText.includes('fellowship') || lowerText.includes('iit')) {
        reply = botReplies.internships;
      } else if (lowerText.includes('project') || lowerText.includes('hardware') || lowerText.includes('esp32')) {
        reply = botReplies.projects;
      } else if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('phone') || lowerText.includes('hire') || lowerText.includes('social') || lowerText.includes('instagram') || lowerText.includes('linkedin') || lowerText.includes('github')) {
        reply = botReplies.contact;
      }
      setMessages([...newMessages, { sender: 'bot' as const, text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[999] p-4 bg-slate-900 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300 flex items-center justify-center"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-6 w-[360px] max-w-[calc(100vw-2rem)] h-[480px] rounded-3xl bg-white border border-slate-100 shadow-2xl z-[999] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold font-space">
                  AI
                </div>
                <div>
                  <h4 className="font-space font-bold text-sm">Samita's Assistant</h4>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> ONLINE
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-slate-900 text-white rounded-tr-none'
                        : 'bg-slate-100 text-slate-700 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Questions Suggestions */}
            <div className="px-4 py-2 border-t border-slate-50 flex gap-2 overflow-x-auto select-none no-scrollbar">
              {['Skills', 'Internships', 'Projects', 'Contact'].map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  className="px-3 py-1 bg-slate-50 border border-slate-200 text-[10px] text-slate-500 rounded-full hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-slate-100 flex gap-2 items-center bg-white"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask something about Samita..."
                className="flex-1 bg-slate-50 border border-slate-200 text-xs px-4 py-2.5 rounded-full outline-none focus:border-indigo-400 focus:bg-white transition-colors"
              />
              <button
                type="submit"
                className="p-2.5 bg-slate-900 text-white rounded-full hover:scale-105 active:scale-95 transition-transform"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
