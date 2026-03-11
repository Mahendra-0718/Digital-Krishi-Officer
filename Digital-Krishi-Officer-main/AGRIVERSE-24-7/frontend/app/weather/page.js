"use client";

import React from 'react';
import { ArrowLeft, CloudRain, Sun, Cloud, Wind, Droplets, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';

const HOURLY_FORECAST = [
    { time: "Now", temp: "28°C", icon: <Sun className="text-yellow-500" />, chance: "0%" },
    { time: "1 PM", temp: "30°C", icon: <Sun className="text-yellow-500" />, chance: "0%" },
    { time: "2 PM", temp: "31°C", icon: <Cloud className="text-gray-400" />, chance: "10%" },
    { time: "3 PM", temp: "30°C", icon: <CloudRain className="text-blue-400" />, chance: "40%" },
    { time: "4 PM", temp: "29°C", icon: <CloudRain className="text-blue-500" />, chance: "60%" },
    { time: "5 PM", temp: "27°C", icon: <Cloud className="text-gray-500" />, chance: "30%" },
];

const WEEKLY_FORECAST = [
    { day: "Tomorrow", condition: "Sunny", high: "32°", low: "24°", icon: <Sun size={20} className="text-yellow-500" /> },
    { day: "Wednesday", condition: "Cloudy", high: "30°", low: "23°", icon: <Cloud size={20} className="text-gray-400" /> },
    { day: "Thursday", condition: "Rain", high: "28°", low: "22°", icon: <CloudRain size={20} className="text-blue-500" /> },
    { day: "Friday", condition: "Storm", high: "27°", low: "22°", icon: <Wind size={20} className="text-gray-600" /> },
];

import { translations } from '../../utils/translations';

export default function WeatherPage() {
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
        <div className="min-h-screen bg-sky-gradient animate-fade-in-up font-sans text-stone-800" style={{ background: 'linear-gradient(to bottom, #dbeafe 0%, #eff6ff 100%)' }}>
            <Header />
            <div className="p-6">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-stone-700 font-bold mb-4 hover:underline">
                    <ArrowLeft size={18} /> {t.home_nav}
                </button>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-stone-800">{t.weather_title}</h1>
                    <p className="text-stone-500 text-sm">Block: Sivakasi (Detected)</p>
                </div>

                {/* Current Weather Card */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-3xl p-8 mb-8 shadow-xl relative overflow-hidden">
                    <div className="relative z-10 flex justify-between items-center">
                        <div>
                            <div className="text-6xl font-bold mb-2">28°</div>
                            <div className="text-xl font-medium opacity-90">Partly Cloudy</div>
                            <div className="flex gap-4 mt-6 text-sm opacity-80">
                                <span className="flex items-center gap-1"><Wind size={16} /> 12 km/h</span>
                                <span className="flex items-center gap-1"><Droplets size={16} /> 64% Hum</span>
                            </div>
                        </div>
                        <Sun size={120} className="text-yellow-300 opacity-80 animate-pulse-slow" />
                    </div>
                    {/* Decorative Circles */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                </div>

                {/* Hourly Strip */}
                <h2 className="text-lg font-bold text-stone-700 mb-4 px-1">Hourly Forecast</h2>
                <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
                    {HOURLY_FORECAST.map((hour, idx) => (
                        <div key={idx} className="flex-shrink-0 bg-white/60 backdrop-blur-md p-4 rounded-2xl flex flex-col items-center min-w-[80px] border border-white/50 shadow-sm">
                            <span className="text-xs font-semibold text-stone-500 mb-2">{hour.time}</span>
                            <div className="mb-2">{hour.icon}</div>
                            <span className="font-bold text-stone-800">{hour.temp}</span>
                            <span className="text-[10px] text-blue-500 font-bold mt-1">{hour.chance}</span>
                        </div>
                    ))}
                </div>

                {/* Weekly List */}
                <h2 className="text-lg font-bold text-stone-700 mb-4 mt-4 px-1">7-Day Outlook</h2>
                <div className="space-y-3 bg-white/40 p-4 rounded-3xl border border-white/50">
                    {WEEKLY_FORECAST.map((day, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border-b border-stone-200/50 last:border-0 hover:bg-white/40 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-full shadow-sm">{day.icon}</div>
                                <div>
                                    <div className="font-semibold text-stone-800">{day.day}</div>
                                    <div className="text-xs text-stone-500">{day.condition}</div>
                                </div>
                            </div>
                            <div className="flex gap-3 text-sm font-medium">
                                <span className="text-stone-800">{day.high}</span>
                                <span className="text-stone-400">{day.low}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
