"use client";

import React from 'react';
import { ArrowLeft, Newspaper, ExternalLink, Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';

const NEWS_ITEMS = [
    {
        title: "PM-KISAN 16th Installment Released: Check Status",
        source: "Govt. of India",
        time: "2 hours ago",
        tag: "Scheme",
        color: "bg-blue-100 text-blue-700"
    },
    {
        title: "New Subsidy Announced for Drip Irrigation Systems",
        source: "Agri Ministry",
        time: "5 hours ago",
        tag: "Subsidy",
        color: "bg-green-100 text-green-700"
    },
    {
        title: "Wheat Prices Rise by 5% in Global Market",
        source: "Market Watch",
        time: "1 day ago",
        tag: "Market",
        color: "bg-orange-100 text-orange-700"
    },
    {
        title: "Weather Alert: unexpected rainfall predicted in Punjab",
        source: "IMD",
        time: "Just now",
        tag: "Alert",
        color: "bg-red-100 text-red-700"
    },
];

import { translations } from '../../utils/translations';

export default function NewsPage() {
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
        <div className="min-h-screen bg-stone-50 animate-fade-in-up font-sans">
            <Header />
            <div className="p-6">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-stone-700 font-bold mb-4 hover:underline">
                    <ArrowLeft size={18} /> {t.home_nav}
                </button>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-stone-800">{t.news_title}</h1>
                    <p className="text-stone-500 text-sm">Latest updates for farmers</p>
                </div>

                {/* Featured Article */}
                <div className="bg-cover bg-center rounded-2xl h-64 mb-8 relative overflow-hidden shadow-lg group cursor-pointer" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop")' }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 p-6 text-white">
                        <span className="bg-agri-green text-black text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block">FEATURED</span>
                        <h2 className="text-2xl font-bold leading-tight mb-2 group-hover:underline">Digital Agriculture Mission launched to boost tech adoption</h2>
                        <div className="flex items-center gap-2 text-sm opacity-80">
                            <span>National News</span> • <span>4 mins read</span>
                        </div>
                    </div>
                </div>

                {/* News Feed */}
                <div className="space-y-4">
                    {NEWS_ITEMS.map((item, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex gap-4 cursor-pointer">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.color}`}>{item.tag}</span>
                                    <span className="text-xs text-stone-400">{item.source}</span>
                                </div>
                                <h3 className="font-bold text-stone-800 text-lg leading-snug mb-2">{item.title}</h3>
                                <p className="text-xs text-stone-500">{item.time}</p>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <button className="text-stone-400 hover:text-agri-darkGreen"><Bookmark size={18} /></button>
                                <ExternalLink size={16} className="text-stone-300" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-center gap-3">
                    <Newspaper className="text-blue-500" />
                    <div>
                        <h4 className="font-bold text-blue-800 text-sm">Subscribe to Weekly SMS</h4>
                        <p className="text-blue-600 text-xs">Get mandi prices on your phone.</p>
                    </div>
                    <button className="ml-auto bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg">Subscribe</button>
                </div>

            </div>
        </div>
    );
}
