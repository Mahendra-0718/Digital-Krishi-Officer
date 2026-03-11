import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, Droplets, TrendingUp, Wind, CheckCircle, AlertTriangle } from 'lucide-react';
import { translations } from '../utils/translations';

export default function DashboardWidget({ lang }) {
    const t = translations[lang] || translations['en'];

    // Mock Live Data (In real app, fetch from OpenMeteo)
    const [weather, setWeather] = useState({ temp: 28, humidity: 65, rainChance: 10, condition: 'Sunny' });
    const [market, setMarket] = useState([
        { crop: 'Tomato', price: '₹24/kg', trend: 'up' },
        { crop: 'Wheat', price: '₹2100/q', trend: 'stable' },
        { crop: 'Onion', price: '₹35/kg', trend: 'down' }
    ]);

    // Suitability Logic (Mock)
    const getSuitability = () => {
        if (weather.rainChance > 70) return { text: "Heavy Rain Alert", color: "bg-red-100 text-red-700", icon: <AlertTriangle size={16} /> };
        if (weather.temp > 35) return { text: "Heat Stress Warning", color: "bg-orange-100 text-orange-700", icon: <Sun size={16} /> };
        return { text: "Optimal for Spraying", color: "bg-green-100 text-green-700", icon: <CheckCircle size={16} /> };
    };

    const suitability = getSuitability();

    return (
        <div className="w-full max-w-5xl mx-auto mb-6 px-4 md:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* Weather Card */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/50 flex flex-col justify-between hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-agri-dark">
                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                {weather.condition === 'Sunny' ? <Sun size={20} /> : <CloudRain size={20} />}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{weather.temp}°C</h3>
                                <p className="text-xs text-gray-500">{weather.condition}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Droplets size={12} /> {weather.humidity}%
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                <Wind size={12} /> {weather.rainChance}% Rain
                            </div>
                        </div>
                    </div>
                </div>

                {/* Suitability Card */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/50 flex flex-col justify-center items-center text-center hover:shadow-md transition-all relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-agri-primary"></div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">{t.fieldStatus}</h3>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold ${suitability.color}`}>
                        {suitability.icon}
                        <span>{suitability.text}</span>
                    </div>
                </div>

                {/* Market Ticker Card */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/50 flex flex-col hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 mb-3">
                        <TrendingUp size={18} className="text-agri-primary" />
                        <h3 className="font-bold text-gray-700 text-sm">{t.mandiRates}</h3>
                    </div>
                    <div className="space-y-2">
                        {market.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm border-b border-gray-100 last:border-0 pb-1 last:pb-0">
                                <span className="text-gray-600 font-medium">{item.crop}</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-gray-800">{item.price}</span>
                                    <span className={`text-[10px] ${item.trend === 'up' ? 'text-green-500' : item.trend === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
                                        {item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '▬'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
