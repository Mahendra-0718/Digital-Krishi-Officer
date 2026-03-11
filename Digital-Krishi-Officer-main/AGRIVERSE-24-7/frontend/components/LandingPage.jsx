import React from 'react';
import { ArrowRight, Leaf, Mic, ScanEye, TrendingUp, CloudSun, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from './Header';

const LandingPage = ({ onStart, t, onLanguageChange }) => {
    const router = useRouter();

    // Fallback if translations not loaded
    const translations = t || {
        welcome_header: "Welcome to Digital Krishi Officer — Your AI Companion for Smart Farming",
        hero_title: "Empowering Every Farmer with Intelligent Decisions",
        hero_subtitle: "Instant AI advice, real-time mandi rates, and precise weather reports to help you grow more.",
        start_button: "Get Started",
        market_title: "Market Rates",
        weather_title: "Climate Report",
        news_title: "Govt. Reports"
    };

    return (
        <div className="min-h-screen bg-nature-gradient relative overflow-hidden flex flex-col">
            {/* Header integrated for Multi-Language Support */}
            <Header onLanguageChange={onLanguageChange} />

            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-12 animate-fade-in-up relative">

                {/* Scrolling Welcome Header - Positioned below Header */}
                <div className="absolute top-0 left-0 w-full bg-agri-darkGreen/5 border-b border-agri-green/10 py-3 overflow-hidden">
                    <div className="animate-marquee-slow whitespace-nowrap text-agri-darkGreen font-bold text-sm tracking-wide">
                        ✨ {translations.welcome_header} ✨
                    </div>
                </div>

                {/* Hero Section */}
                <div className="space-y-4 max-w-3xl z-10 mt-8">
                    <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-agri-green/20 shadow-sm animate-float">
                        <Leaf className="text-agri-green w-4 h-4" />
                        <span className="text-[10px] font-bold text-agri-darkGreen tracking-widest uppercase">National Agency Portal</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-stone-800 leading-tight">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-agri-darkGreen to-agri-green drop-shadow-sm">DIGITAL KRISHI OFFICER</span>
                    </h1>

                    <p className="text-base md:text-lg text-stone-600 max-w-xl mx-auto font-medium opacity-80">
                        {translations.hero_subtitle}
                    </p>
                </div>

                {/* Agency Grid Menu */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl z-10 px-4">
                    {/* 1. Market Rates */}
                    <button onClick={() => router.push('/market')}
                        className="group flex flex-col items-center gap-4 bg-white/40 hover:bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="p-4 bg-orange-100 text-orange-600 rounded-full group-hover:scale-110 transition-transform shadow-inner">
                            <TrendingUp size={32} />
                        </div>
                        <div className="text-center">
                            <h3 className="font-bold text-stone-800">{translations.market_title}</h3>
                            <p className="text-[10px] text-stone-500 mt-1 uppercase font-bold">Live Mandi Prices</p>
                        </div>
                    </button>

                    {/* 2. Weather/Climate */}
                    <button onClick={() => router.push('/weather')}
                        className="group flex flex-col items-center gap-4 bg-white/40 hover:bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="p-4 bg-blue-100 text-blue-600 rounded-full group-hover:scale-110 transition-transform shadow-inner">
                            <CloudSun size={32} />
                        </div>
                        <div className="text-center">
                            <h3 className="font-bold text-stone-800">{translations.weather_title}</h3>
                            <p className="text-[10px] text-stone-500 mt-1 uppercase font-bold">Rainfall & Forecast</p>
                        </div>
                    </button>

                    {/* 3. Official Reports -> News */}
                    <button onClick={() => router.push('/news')}
                        className="group flex flex-col items-center gap-4 bg-white/40 hover:bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="p-4 bg-green-100 text-green-600 rounded-full group-hover:scale-110 transition-transform shadow-inner">
                            <FileText size={32} />
                        </div>
                        <div className="text-center">
                            <h3 className="font-bold text-stone-800">{translations.news_title}</h3>
                            <p className="text-[10px] text-stone-500 mt-1 uppercase font-bold">News & Schemes</p>
                        </div>
                    </button>
                </div>

                {/* CTA Button (Start Chat) */}
                <div className="z-10 pt-4">
                    <button
                        onClick={onStart}
                        className="group relative bg-agri-darkGreen text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl shadow-agri-green/30 hover:shadow-2xl hover:shadow-agri-green/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {translations.start_button} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-agri-green to-agri-darkGreen opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </div>

                {/* Footer / Trust */}
                <div className="text-stone-400 text-[10px] tracking-widest uppercase font-bold mt-4 opacity-50">
                    National Agriculture Infrastructure • AI Division
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
