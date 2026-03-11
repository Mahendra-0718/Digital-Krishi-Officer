import React, { useState } from 'react';
import { Sprout } from 'lucide-react';
import { translations } from '../utils/translations';

// High-quality farming background
const BG_IMAGE_URL = "https://images.unsplash.com/photo-1625246333195-bf7f6e6c86a1?q=80&w=2070&auto=format&fit=crop";
// Fallback or specific optimized farming image

const LANGUAGES = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' }
];

export default function LoginScreen({ onLogin }) {
    const [name, setName] = useState('');
    const [selectedLang, setSelectedLang] = useState('en');

    // Localize UI for login screen itself based on selection
    // Creating a mini-map for login specific terms since main translations might not be loaded yet
    const ui = {
        en: { sel: "Select Language", name: "Farmer Name", start: "Start Advisory" },
        hi: { sel: "भाषा चुनें", name: "किसान का नाम", start: "शुरू करें" },
        te: { sel: "భాషను ఎంచుకోండి", name: "రైతు పేరు", start: "ప్రారంభించండి" },
        ta: { sel: "மொழியைத் தேர்ந்தெடுக்கவும்", name: "விவசாயி பெயர்", start: "தொடங்கு" }
    }[selectedLang];

    const handleStart = () => {
        if (name.trim()) {
            onLogin({ name, lang: selectedLang });
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
                style={{ backgroundImage: `url('${BG_IMAGE_URL}')` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 backdrop-blur-[2px]"></div>
            </div>

            {/* Glass Card */}
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl animate-slide-up ring-1 ring-white/30">

                    {/* Logo Section */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-4 rounded-2xl shadow-lg mb-4 text-white animate-float ring-4 ring-white/10">
                            <Sprout size={48} />
                        </div>
                        <h1 className="text-4xl font-extrabold text-white text-center tracking-tight drop-shadow-md">AGRIVERSE</h1>
                        <p className="text-green-100 font-medium tracking-wide text-sm bg-white/10 px-3 py-1 rounded-full mt-2 backdrop-blur-sm border border-white/10">
                            Digital Krishi Officer
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-green-100 uppercase tracking-wider mb-2 ml-1 opacity-80">{ui.sel}</label>
                            <div className="grid grid-cols-2 gap-2">
                                {LANGUAGES.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => setSelectedLang(lang.code)}
                                        className={`p-3 rounded-xl border text-sm font-medium transition-all duration-300 relative overflow-hidden group ${selectedLang === lang.code
                                                ? 'bg-white/90 text-green-800 border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                                                : 'bg-black/30 text-white/80 border-white/10 hover:bg-black/40 hover:border-white/30'
                                            }`}
                                    >
                                        <div className="text-xs opacity-70 mb-0.5">{lang.name}</div>
                                        <div className="text-lg font-bold">{lang.native}</div>
                                        {selectedLang === lang.code && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-green-100 uppercase tracking-wider mb-2 ml-1 opacity-80">{ui.name}</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="..."
                                className="w-full bg-black/20 border border-white/10 focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 rounded-xl px-5 py-4 text-white placeholder-white/30 outline-none transition-all text-lg font-medium backdrop-blur-sm"
                            />
                        </div>

                        <button
                            onClick={handleStart}
                            disabled={!name.trim()}
                            className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl active:scale-95 transition-all relative overflow-hidden group ${name.trim()
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-green-500/30'
                                    : 'bg-gray-500/30 text-gray-400 cursor-not-allowed border border-white/5'
                                }`}
                        >
                            <span className="relative z-10">{ui.start}</span>
                            {name.trim() && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>}
                        </button>

                        <p className="text-[10px] text-center text-white/40 pt-2">
                            Secure • Private • AI-Powered
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
