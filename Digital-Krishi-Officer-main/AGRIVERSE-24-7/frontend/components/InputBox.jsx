import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function InputBox({ onSend, disabled, placeholder }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSend(query);
            setQuery("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex-1 relative group">
            <input
                type="text"
                className="w-full bg-white/80 border-2 border-agri-green/20 text-stone-700 placeholder-stone-400 rounded-2xl px-5 py-3 pr-12 focus:outline-none focus:border-agri-green focus:ring-2 focus:ring-agri-green/20 transition-all shadow-sm group-hover:shadow-md"
                placeholder={placeholder || "Ask a question about your crop..."}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={disabled}
            />
            <button
                type="submit"
                disabled={!query.trim() || disabled}
                className="absolute right-2 top-2 p-1.5 bg-agri-green text-white rounded-xl hover:bg-agri-darkGreen disabled:opacity-50 disabled:hover:bg-agri-green transition-all shadow-md transform active:scale-95"
            >
                <Send size={20} />
            </button>
        </form>
    );
};
