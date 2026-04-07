import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Paperclip, Mic, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const initialMessages = [
  { id: 1, from: 'mechanic', text: 'Assalam o Alaikum! Main aa raha hoon, 8 minute mein pohonch jaunga.' },
  { id: 2, from: 'user', text: 'Theek hai bhai, main expressway pe hoon Faizabad ke paas.' },
  { id: 3, from: 'mechanic', text: 'Ji bilkul, app pe location dekh raha hoon.' },
];

const Chat = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const state = loc.state as any;
  const mechanic = state?.mechanic;
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), from: 'user', text: input }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-border bg-card">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft size={20} />
        </button>
        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-base">🔧</div>
        <div>
          <p className="font-heading font-bold text-sm">{mechanic?.name || 'Ali Karigar'}</p>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="text-[10px] text-muted-foreground">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm font-body ${
              msg.from === 'user'
                ? 'bg-primary text-primary-foreground rounded-br-md'
                : 'bg-muted text-foreground rounded-bl-md'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-border bg-card">
        <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
          <Paperclip size={16} className="text-muted-foreground" />
        </button>
        <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
          <Mic size={16} className="text-muted-foreground" />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message…"
          className="flex-1 px-3 py-2 rounded-full border border-input bg-background text-sm font-body focus:ring-2 focus:ring-primary focus:outline-none"
        />
        <button onClick={sendMessage} className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
          <Send size={16} className="text-primary-foreground" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
