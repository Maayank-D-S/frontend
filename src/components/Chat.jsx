import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { BsThreeDotsVertical } from "react-icons/bs";

const PROJECTS = ["Krupal Habitat", "Ramvan Villas", "Firefly Homes"];
const API_BASE = process.env.REACT_APP_API_BASE;

const getUserId = () => {
  let id = localStorage.getItem("user_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("user_id", id);
  }
  return id;
};

const newSessionId = () => {
  const id = crypto.randomUUID();
  localStorage.setItem("session_id", id);
  return id;
};

const getSessionId = () => localStorage.getItem("session_id") || newSessionId();
const getStoredProject = () => localStorage.getItem("project_name");
const setStoredProject = (projectName) => localStorage.setItem("project_name", projectName);

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState(getStoredProject());
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(getSessionId());
  const [dropdown, setDropdown] = useState(false);
  const userId = getUserId();
  const chatRef = useRef(null);

  useEffect(() => {
    if (project) {
      fetch(`${API_BASE}/ai/get_messages/${userId}/${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          const normalized = data.map((m) => ({ ...m, role: m.role || m.sender }));
          setMessages(
            normalized.length === 0
              ? [{ id: Date.now(), role: "ai", message: `Hello! Ask me anything about ${project}.`, timestamp: new Date().toISOString() }]
              : normalized
          );
        });
    }
  }, [project, sessionId]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!inputText.trim() || !project) return;
    const userMessage = { id: Date.now(), role: "user", message: inputText, timestamp: new Date().toISOString() };
    const botId = Date.now() + 1;
    setMessages((prev) => [...prev, userMessage, { id: botId, role: "ai", message: "", timestamp: new Date().toISOString() }]);
    setInputText("");
    setIsTyping(true);

    const res = await fetch(`${API_BASE}/ai/new_query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, session_id: sessionId, message: userMessage.message, project_name: project }),
    });

    const { ai } = await res.json();
    const text = ai.message;
    const stream = (i = 0) => {
      if (i <= text.length) {
        setMessages((prev) => prev.map((msg) => (msg.id === botId ? { ...msg, message: text.slice(0, i) } : msg)));
        setTimeout(() => stream(i + 1), 15);
      } else {
        setIsTyping(false);
      }
    };
    stream();
  };

  const startNew = () => {
    setSessionId(newSessionId());
    localStorage.removeItem("project_name");
    setProject(null);
    setMessages([]);
    setDropdown(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 bg-gray-700 text-white p-4 rounded-full shadow-xl z-50">
        <MessageCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-4 right-4 w-[95%] max-w-sm h-[85vh] bg-zinc-900 text-white rounded-xl shadow-2xl z-50 flex flex-col">
          <div className="bg-gray-950 p-4 rounded-t-xl border-b border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className=" relative flex items-center space-x-2">
                <button onClick={() => setDropdown(!dropdown)} className="text-white">
                  <BsThreeDotsVertical className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm font-semibold text-white">Ask me anything!</p>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {dropdown && (
  <div className="absolute left-4 top-10 bg-zinc-900 border border-gray-700 rounded-lg shadow-md z-50">
    <button
      onClick={startNew}
      className="flex items-center px-4 py-2 text-sm text-white hover:bg-zinc-800 w-full"
    >
      <MessageCircle className="w-4 h-4 mr-2" />
      Start new chat
    </button>
  </div>
)}

            <div className="border-t border-gray-700 mb-3" />

            <div className="flex justify-center">
  <div className="flex items-center space-x-2">
    <div className="relative">
      <div className="bg-gray-800 rounded-full p-2">
        <MessageCircle className="w-5 h-5 text-white" />
      </div>
      <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border-2 border-gray-950" />
    </div>
    <div className="text-center">
      <div className="text-white font-semibold leading-tight">Chatbot</div>
      <div className="text-xs text-gray-400">Support Agent</div>
    </div>
  </div>
</div>

          </div>

          {!project && (
            <div className="p-4 flex-1 flex flex-col items-center justify-center text-sm">
              <p className="mb-4 text-center text-gray-300">Hello! Nice to see you here!<br />Press "Start chat" to continue.</p>
              <button onClick={() => setProject("selecting")} className="bg-gray-300 text-black rounded-md px-4 py-2">Start chat</button>
            </div>
          )}

          {project === "selecting" && (
            <div className="p-4 space-y-2 flex-1 overflow-y-auto">
              <p className="text-sm text-center">Choose Project</p>
              {PROJECTS.map((p) => (
                <button key={p} onClick={() => { setStoredProject(p); setProject(p); }} className="w-full py-2 rounded-md bg-zinc-700 text-white hover:bg-zinc-600">
                  {p}
                </button>
              ))}
            </div>
          )}

          {project && project !== "selecting" && (
            <>
              <div ref={chatRef} className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] p-3 text-sm rounded-xl ${m.role === "user" ? "bg-indigo-500 text-white" : "bg-zinc-700 text-white"}`}>
                      <p>{m.message}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-700 p-2 rounded-lg flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-black p-3 flex items-center gap-2 border-t border-gray-700">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Write a message"
                  className="flex-1 text-sm bg-zinc-800 text-white px-4 py-2 rounded-full focus:outline-none"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputText.trim()}
                  className="bg-white text-black hover:bg-gray-300 disabled:bg-gray-400 p-2 rounded-lg"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chat;