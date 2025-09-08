import { useState } from "react";
import axios from "axios";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // user ka message add karo
    const newMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/chat/", {
        message: input,
      });

      const botMessage: Message = { sender: "bot", text: res.data.bot };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage: Message = { sender: "bot", text: "Error: Backend not reachable" };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 flex flex-col h-[80vh]">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-black self-start mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
