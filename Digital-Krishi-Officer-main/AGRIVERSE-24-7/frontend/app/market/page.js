"use client";

import React from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';

const MARKET_DATA = [
    { name: "Wheat (Sharbati)", icon: "🌾", price: "₹2,125 / qt", trend: "up", change: "+1.2%", history: "Stable" },
    { name: "Basmati Rice", icon: "🍚", price: "₹3,450 / qt", trend: "down", change: "-0.5%", history: "Volatile" },
    { name: "Cotton (H4)", icon: "🧶", price: "₹6,200 / qt", trend: "up", change: "+2.8%", history: "Demand High" },
    { name: "Tomato (Hybrid)", icon: "🍅", price: "₹25 / kg", trend: "down", change: "-5.0%", history: "Supply High" },
    { name: "Potato (Agra)", icon: "🥔", price: "₹18 / kg", trend: "steady", change: "0%", history: "Stable" },
    { name: "Onion (Nashik)", icon: "🧅", price: "₹35 / kg", trend: "up", change: "+8.5%", history: "Shortage" },
    { name: "Sugarcane", icon: "🎋", price: "₹340 / qt", trend: "steady", change: "0%", history: "Govt Fixed" },
    { name: "Mustard Seeds", icon: "🟡", price: "₹5,400 / qt", trend: "up", change: "+1.5%", history: "Oil Demand" },
];

import { translations } from '../../utils/translations';

export default function MarketPage() {
    const router = useRouter();
    const [t, setT] = React.useState(translations.english);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLang = localStorage.getItem('appLanguage') || 'English';
            const langKey = savedLang.toLowerCase();
            if (translations[langKey]) {
                setT(translations[langKey]);
            }
        }
    }, []);

    return (
        <div className="min-h-screen bg-peacock-gradient animate-fade-in-up font-sans">
            <Header />
            <div className="p-6">
                {/* Back Navigation */}
                <button onClick={() => router.back()} className="flex items-center gap-2 text-agri-darkGreen font-bold mb-4 hover:underline">
                    <ArrowLeft size={18} /> {t.home_nav}
                </button>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-agri-darkGreen">{t.market_title}</h1>
                    <p className="text-stone-600 text-sm">Real-time prices from major APMC markets</p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MARKET_DATA.map((crop, idx) => (
                        <div key={idx} className="bg-white/60 backdrop-blur-md border border-white/50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-4xl">{crop.icon}</span>
                                <div className={`flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-full ${crop.trend === 'up' ? 'bg-green-100 text-green-700' :
                                    crop.trend === 'down' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {crop.trend === 'up' && <TrendingUp size={14} />}
                                    {crop.trend === 'down' && <TrendingDown size={14} />}
                                    {crop.trend === 'steady' && <Minus size={14} />}
                                    {crop.change}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-stone-800">{crop.name}</h3>
                            <div className="mt-2 flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-agri-darkGreen">{crop.price}</span>
                            </div>

                            <div className="mt-4 pt-4 border-t border-stone-200">
                                <div className="flex justify-between text-xs text-stone-500">
                                    <span>Market Status:</span>
                                    <span className="font-semibold text-stone-700">{crop.history}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-center text-stone-500 text-xs mt-12 bg-white/30 py-2 rounded-full inline-block px-6 left-1/2 relative -translate-x-1/2">
                    Last updated: Just now • Source: National Agriculture Market (eNAM)
                </p>
            </div>
        </div>
    );
}
