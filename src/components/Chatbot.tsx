"use client";

import { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, X, Send, Bot, User, Mic, MicOff, RefreshCw, 
  BadgeCheck, ExternalLink, Sparkles, ChevronDown, Loader2 
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "@/types/chatbot";
import { generateAIResponse } from "@/services/aiChatService";
import { createSupabaseChatSession, saveSupabaseMessage, fetchSupabaseChatHistory } from "@/lib/supabase";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Chatbot Session & Supabase Sync
  useEffect(() => {
    let existingSession = localStorage.getItem("mustika_chat_session_id");
    if (!existingSession) {
      existingSession = `session_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
      localStorage.setItem("mustika_chat_session_id", existingSession);
    }
    setSessionId(existingSession);

    // Initial greeting if messages list is empty
    const welcomeMsg: ChatMessage = {
      id: "msg_welcome",
      role: "assistant",
      content: "Halo! Saya **Mustika AI Assistant** 🤖. Selamat datang di Mustika Travel Jombang! \n\nAda yang bisa saya bantu jelaskan tentang layanan sewa mobil, rute paket wisata, atau cara booking hari ini?",
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      quickActions: [
        { label: "🚗 Lihat Sewa Mobil", action: "Berapa sewa mobil?" },
        { label: "🌋 Tour Bromo", action: "Info paket tour Bromo" },
        { label: "📍 Lokasi Kantor", action: "Dimana alamat Mustika Travel?" },
      ],
    };

    // Try fetching history from Supabase if available
    fetchSupabaseChatHistory(existingSession).then((history) => {
      if (history && history.length > 0) {
        setMessages(history);
      } else {
        setMessages([welcomeMsg]);
      }
    });

    createSupabaseChatSession(existingSession);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Voice Input Speech Recognition Setup
  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = "id-ID";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleVoiceListening = () => {
    if (!recognitionRef.current) {
      alert("Fitur pengenalan suara tidak didukung di browser ini.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn("Speech recognition error:", err);
      }
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg_user_${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };

    // Add user message to UI state
    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputQuery("");
    setIsTyping(true);

    // Save to Supabase
    if (sessionId) {
      saveSupabaseMessage(sessionId, userMessage);
    }

    // Special quick action navigations
    if (query.toLowerCase().includes("halaman booking") || query.toLowerCase().includes("ke halaman booking")) {
      window.location.href = "/booking";
      setIsTyping(false);
      return;
    }
    if (query.toLowerCase().includes("halaman lokasi")) {
      window.location.href = "/lokasi";
      setIsTyping(false);
      return;
    }
    if (query.toLowerCase().includes("buka wa cs") || query.toLowerCase().includes("wa cs") || query.toLowerCase().includes("chat wa")) {
      window.open("https://wa.me/628123456789?text=Halo%20Mustika%20Travel,%20saya%20ingin%20tanya%20layanan", "_blank");
    }

    // Fetch AI response immediately
    try {
      const response = await generateAIResponse(query, messages);

      const aiMessage: ChatMessage = {
        id: `msg_ai_${Date.now()}`,
        role: "assistant",
        content: response.text,
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        quickActions: response.quickActions,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);

      if (sessionId) {
        saveSupabaseMessage(sessionId, aiMessage);
      }
    } catch (err) {
      console.warn("AI Chatbot Error:", err);
      setIsTyping(false);
    }
  };


  const handleResetChat = () => {
    const welcomeMsg: ChatMessage = {
      id: `msg_welcome_${Date.now()}`,
      role: "assistant",
      content: "Percakapan telah direset. Ada yang bisa **Mustika AI** bantu kembali?",
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      quickActions: [
        { label: "🚗 Sewa Mobil", action: "Berapa sewa mobil?" },
        { label: "🌋 Paket Bromo", action: "Info paket tour Bromo" },
      ],
    };
    setMessages([welcomeMsg]);
  };

  return (
    <>
      {/* FLOATING CHATBOT TRIGGER BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center h-14 w-14 rounded-full bg-brand-orange text-white shadow-xl shadow-brand-orange/40 border border-white/20 focus:outline-none cursor-pointer group transform-gpu gpu-layer"
          aria-label="Tanya Mustika AI Assistant"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
          </span>

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="bot"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                <Bot className="h-7 w-7" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* CHATBOT POPUP WINDOW (HARDWARE ACCELERATED) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-3 sm:right-6 z-50 w-[94vw] sm:w-[400px] h-[520px] max-h-[78vh] bg-white rounded-3xl shadow-xl border border-slate-200/90 flex flex-col overflow-hidden transform-gpu gpu-layer"
          >

            {/* HEADER */}
            <div className="bg-brand-dark text-white px-5 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-2xl bg-brand-orange flex items-center justify-center text-white shrink-0 shadow-md">
                  <Bot className="h-6 w-6" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-brand-dark" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-nunito font-bold text-sm leading-none">Mustika AI</h3>
                    <BadgeCheck className="h-4 w-4 text-brand-orange-light shrink-0" />
                  </div>
                  <span className="text-[11px] text-white/70 font-light mt-0.5 block">Asisten Pintar Mustika Travel</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset Obrolan"
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Tutup Chat"
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* MESSAGES LIST */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-brand-cream/40 text-xs">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-end gap-2 max-w-[85%]">
                    {msg.role === "assistant" && (
                      <div className="h-7 w-7 rounded-xl bg-brand-orange flex items-center justify-center text-white shrink-0 shadow-xs mb-1">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}

                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line shadow-xs ${
                        msg.role === "user"
                          ? "bg-brand-orange text-white rounded-br-none"
                          : "bg-white text-brand-dark border border-slate-200/80 rounded-bl-none"
                      }`}
                    >
                      {msg.content}
                    </div>

                    {msg.role === "user" && (
                      <div className="h-7 w-7 rounded-xl bg-slate-700 flex items-center justify-center text-white shrink-0 shadow-xs mb-1">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>

                  {/* QUICK SUGGESTION CHIPS */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 ml-9">
                      {msg.quickActions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(act.action)}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-semibold text-[11px] transition-all cursor-pointer shadow-2xs hover:border-brand-orange"
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* TYPING / THINKING INDICATOR */}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 ml-1"
                >
                  <div className="h-7 w-7 rounded-xl bg-brand-orange flex items-center justify-center text-white shrink-0 shadow-xs">
                    <Bot className="h-4 w-4 animate-pulse" />
                  </div>
                  <div className="bg-white py-2.5 px-3.5 rounded-2xl border border-slate-200/90 flex items-center gap-2 shadow-xs text-xs font-medium text-brand-dark/80">
                    <Loader2 className="h-3.5 w-3.5 text-brand-orange animate-spin" />
                    <span className="font-semibold text-brand-orange animate-pulse">Thinking...</span>
                    <div className="flex items-center gap-1 ml-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}


              <div ref={messagesEndRef} />
            </div>

            {/* INPUT FOOTER */}
            <div className="p-3 bg-white border-t border-slate-200/80 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <button
                  type="button"
                  onClick={toggleVoiceListening}
                  title={isListening ? "Mendengarkan..." : "Bicara via Mikrofon"}
                  className={`p-2.5 rounded-xl transition-all ${
                    isListening
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>

                <input
                  type="text"
                  placeholder={isListening ? "Mendengarkan ucapan Anda..." : "Ketik pertanyaan Anda..."}
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  className="flex-grow py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20"
                />

                <button
                  type="submit"
                  disabled={!inputQuery.trim()}
                  className="p-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-light disabled:opacity-50 text-white transition-colors cursor-pointer shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
