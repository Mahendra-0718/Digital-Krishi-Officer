import React from 'react';
import { Plus, MessageSquare, Settings, User, LogOut, X, Home } from 'lucide-react';

export default function Sidebar({ isOpen, onClose, onNewChat, onGoHome, onSelectChat, history = [] }) {
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar Container */}
            <aside
                className={`
                    fixed md:relative z-50 h-full w-[280px] bg-agri-darkGreen text-white flex flex-col transition-transform duration-300 ease-in-out border-r border-white/10 shadow-2xl
                    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}
            >
                {/* Brand Section */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shadow-inner">
                            <span className="text-xl">🚜</span>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg tracking-tight">AgriVerse</h2>
                            <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Dashboard</p>
                        </div>
                    </div>
                </div>

                {/* Main Actions */}
                <div className="p-4 space-y-2">
                    <button
                        onClick={() => {
                            onGoHome();
                            onClose();
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-sm group"
                    >
                        <Home size={18} className="text-white/70 group-hover:text-white group-hover:scale-110 transition-all" />
                        <span className="font-medium">Go to Home Page</span>
                    </button>

                    <button
                        onClick={() => { onNewChat(); onClose(); }}
                        className="flex items-center gap-3 w-full px-4 py-4 rounded-2xl bg-agri-green text-agri-darkGreen hover:bg-white hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-agri-green/20"
                    >
                        <Plus size={20} className="stroke-[3]" />
                        <span className="font-bold text-sm">Start New Session</span>
                    </button>
                </div>

                {/* Chat History Grouped */}
                <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6 custom-scrollbar">
                    {history.length > 0 ? (
                        <div>
                            <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4 px-2">History</h3>
                            <div className="space-y-2">
                                {history.map((chat, index) => (
                                    <HistoryItem
                                        key={chat.id || index}
                                        title={chat.title}
                                        onClick={() => {
                                            onSelectChat(chat);
                                            onClose();
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-40 opacity-20">
                            <MessageSquare size={40} className="mb-2" />
                            <p className="text-xs font-medium italic">No history yet...</p>
                        </div>
                    )}
                </div>

                {/* Footer: User Profile */}
                <div className="p-4 border-t border-white/10 bg-white/5">
                    <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/10 transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-agri-green to-agri-blue flex items-center justify-center text-agri-darkGreen font-bold shadow-lg">
                            F
                        </div>
                        <div className="flex-1 text-left">
                            <div className="font-bold text-sm truncate">Farmer User</div>
                            <div className="text-[10px] text-white/50 font-bold uppercase">Pro Farmer</div>
                        </div>
                        <Settings size={16} className="text-white/30 group-hover:text-white transition-colors" />
                    </button>
                </div>

                {/* Mobile Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-white/50 md:hidden hover:text-white"
                >
                    <X size={20} />
                </button>
            </aside>
        </>
    );
}

function HistoryItem({ title, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-white/10 group transition-all text-sm text-white/70 hover:text-white border border-transparent hover:border-white/10 text-left"
        >
            <div className="w-2 h-2 rounded-full bg-agri-green opacity-40 group-hover:opacity-100 animate-pulse shrink-0"></div>
            <span className="truncate font-medium">{title}</span>
        </button>
    );
}

