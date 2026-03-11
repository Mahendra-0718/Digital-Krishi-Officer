import React, { useState, useEffect } from 'react';
import { Leaf, AlertTriangle, Languages, MessageSquare, Home, Search } from 'lucide-react';
import { translations } from '../utils/translations';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const Header = ({ onLanguageChange }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const isChat = searchParams.get('mode') === 'chat';
    const isHome = pathname === '/' && !isChat;

    const [userLang, setUserLang] = useState('English');
    const [t, setT] = useState(translations.english);
    const [langInput, setLangInput] = useState('');
    const [showSwitcher, setShowSwitcher] = useState(false);

    const LANGUAGES = [
        'English', 'Hindi', 'Telugu', 'Tamil', 'Marathi', 'Spanish'
    ];

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('appLanguage') || 'English';
            setUserLang(saved);
            setLangInput(saved);
            const langKey = saved.toLowerCase();
            if (translations[langKey]) {
                setT(translations[langKey]);
            }
        }
    }, []);

    const handleLanguageChange = (val) => {
        setLangInput(val);
        const match = LANGUAGES.find(l =>
            l.toLowerCase() === val.toLowerCase()
        );
        if (match) {
            localStorage.setItem('appLanguage', match);
            setUserLang(match);
            const langKey = match.toLowerCase();
            if (translations[langKey]) {
                setT(translations[langKey]);
            }

            if (onLanguageChange) {
                onLanguageChange(match);
            } else {
                window.location.reload();
            }
        }
    };

    const handleCautionClick = () => {
        if (t) {
            alert(`${t.language_assistant}:\n\n${t.caution_msg}`);
        }
    };

    return (
        <header className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-md border-b border-agri-green/20 sticky top-0 z-40 transition-all duration-300">
            {/* Logo / Home Link */}
            <Link href="/" className="flex items-center gap-3 animate-slide-down group transition-all">
                <div className="bg-gradient-to-br from-agri-darkGreen to-agri-green p-2 rounded-xl shadow-lg shadow-agri-green/20 group-hover:scale-110 transition-transform">
                    <Leaf className="text-white w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-agri-darkGreen to-agri-green">
                        AGRIVERSE
                    </h1>
                    <p className="text-[10px] text-stone-500 font-bold tracking-[0.2em] uppercase leading-tight">Digital Krishi Officer</p>
                </div>
            </Link>

            <div className="flex items-center gap-2 md:gap-4">
                {/* Navigation Toggle Section */}
                <div className="hidden md:flex bg-agri-green/5 p-1 rounded-2xl border border-agri-green/10 shadow-inner">
                    <Link
                        href="/"
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${isHome ? 'bg-white text-agri-darkGreen shadow-md' : 'text-stone-400 hover:text-agri-darkGreen'
                            }`}
                    >
                        <Home size={14} />
                        <span>Home</span>
                    </Link>
                    <Link
                        href="/?mode=chat"
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${isChat ? 'bg-agri-green text-agri-darkGreen shadow-md' : 'text-stone-400 hover:text-agri-darkGreen'
                            }`}
                    >
                        <MessageSquare size={14} />
                        <span>Chat</span>
                    </Link>
                </div>

                {/* Language Switcher "Box" */}
                <div className="relative group flex items-center bg-white border border-stone-200 rounded-xl px-3 py-1.5 shadow-sm focus-within:border-agri-green transition-all">
                    <Languages size={14} className="text-agri-green mr-2" />
                    <input
                        type="text"
                        className="w-20 md:w-28 bg-transparent outline-none text-[10px] font-bold text-stone-700 uppercase placeholder:text-stone-300"
                        placeholder="Language..."
                        value={langInput}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                    />
                </div>

                {/* Caution Icon */}
                <button
                    onClick={handleCautionClick}
                    className="p-2 bg-white text-amber-500 rounded-xl border border-stone-200 hover:border-amber-500 hover:bg-amber-50 transition-all shadow-sm group relative"
                >
                    <AlertTriangle size={20} className="animate-pulse" />
                    <span className="absolute -bottom-10 right-0 bg-stone-900 text-white text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none z-50 shadow-xl translate-y-1 group-hover:translate-y-0">
                        {t?.language_assistant}
                    </span>
                </button>
            </div>
        </header>
    );
};

export default Header;
