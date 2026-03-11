"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf, Sprout, ArrowRight, Lock, User } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '', language: '' });
    const [detectedLang, setDetectedLang] = useState('');

    const LANGUAGES = [
        { name: 'English', code: 'en', flag: '🇺🇸' },
        { name: 'Hindi', code: 'hi', flag: '🇮🇳' },
        { name: 'Telugu', code: 'te', flag: '🇮🇳' },
        { name: 'Tamil', code: 'ta', flag: '🇮🇳' },
        { name: 'Punjabi', code: 'pa', flag: '🇮🇳' },
        { name: 'Marathi', code: 'mr', flag: '🇮🇳' },
        { name: 'Bengali', code: 'bn', flag: '🇮🇳' },
        { name: 'Spanish', code: 'es', flag: '🇪🇸' },
    ];

    const handleLanguageInput = (e) => {
        const val = e.target.value;
        setFormData({ ...formData, language: val });

        // Auto-detect logic
        const match = LANGUAGES.find(l =>
            l.name.toLowerCase().startsWith(val.toLowerCase()) && val.length > 2
        );
        if (match) {
            setDetectedLang(match.name);
        } else {
            setDetectedLang('');
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', formData.username || 'Farmer');
                // Use detected language name or typed value
                localStorage.setItem('appLanguage', detectedLang || formData.language || 'English');
            }
            router.push('/');
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-nature-gradient flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-agri-blue/20 blur-[100px] -z-10 animate-pulse-slow"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-agri-green/20 blur-[100px] -z-10 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>

            <GlassCard className="w-full max-w-md p-8 bg-white/40 backdrop-blur-xl border-white/60 shadow-2xl animate-fade-in-up">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-agri-green to-agri-darkGreen rounded-2xl flex items-center justify-center shadow-lg mb-4 transform hover:rotate-12 transition-transform duration-300">
                        <Leaf className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-stone-800">AgriVerse Login</h1>
                    <p className="text-stone-500 mt-1">Select your language & sign in</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Language Input with Auto Detect */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wider">Language Selection</label>
                        <div className="relative group">
                            <input
                                type="text"
                                required
                                className="w-full bg-white/70 border-2 border-stone-100 rounded-xl py-3 px-4 outline-none focus:border-agri-green transition-all"
                                placeholder="Type language (e.g. Hindi, Telugu...)"
                                value={formData.language}
                                onChange={handleLanguageInput}
                            />
                            {detectedLang && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 animate-zoom-in">
                                    <span className="text-xs font-bold bg-agri-green/20 text-agri-darkGreen px-2 py-1 rounded-md border border-agri-green/30">
                                        Detected: {detectedLang}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wider">Farmer ID</label>
                        <div className="relative group">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-agri-green transition-colors">
                                <User size={18} />
                            </div>
                            <input
                                type="text"
                                required
                                className="w-full bg-white/70 border-2 border-stone-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-agri-green transition-all"
                                placeholder="Username"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wider">Secure Pin</label>
                        <div className="relative group">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-agri-green transition-colors">
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                required
                                className="w-full bg-white/70 border-2 border-stone-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-agri-green transition-all"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-agri-darkGreen to-agri-green text-white py-4 rounded-xl font-bold shadow-lg shadow-agri-green/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group mt-2"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2 italic">
                                <span>Generating Session...</span>
                            </div>
                        ) : (
                            <>
                                <span>Proceed to Farm</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <div className="text-center">
                        <p className="text-xs text-stone-400">
                            By logging in, you agree to our Terms of Service.<br />
                            Integrated with Government Soil Health Database.
                        </p>
                    </div>
                </form>
            </GlassCard>
        </main>
    );
}
