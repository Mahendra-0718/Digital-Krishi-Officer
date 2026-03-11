"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Cloud, Droplets, Sun, Wind, Sprout, TrendingUp,
    Calendar, MapPin, Menu, Bell, MessageCircle, LogOut
} from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import LandingPage from '../../components/LandingPage'; // Reusing Landing logic or creating a chat modal if needed
// Actually, we'll route to the main chat page for the "Chat" action for now, 
// or I can embed the chat here. The request said "Chat integrated".
// Given the previous setup, the main page IS the chat + landing.
// I will simulate the "Chat" button navigating to the main page with a query param or state?
// Or better, creating a dedicated chat route or modal.
// For "Fast" implementation, I'll redirect the Chat Button to '/' (Home/Chat).

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState("Farmer");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) setUser(storedUser);
        }
    }, []
    );

    const handleOpenChat = () => {
        router.push('/');
    };

    const handleLogout = () => {
        router.push('/login');
    };

    return (
        <main className="min-h-screen bg-nature-gradient text-stone-800 font-sans relative">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-md border-b border-white/20 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-agri-green p-2 rounded-lg text-white">
                        <Sprout size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-agri-darkGreen tracking-tight">AGRIVERSE</h1>
                        <p className="text-[10px] text-stone-500 font-medium">DIGITAL KRISHI OFFICER</p>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
                    <a href="#" className="hover:text-agri-green transition-colors">Home</a>
                    <a href="#" className="hover:text-agri-green transition-colors">About</a>
                    <a href="#" className="hover:text-agri-green transition-colors">Services</a>
                    <a href="#" className="hover:text-agri-green transition-colors">Contact</a>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
                        <Bell size={20} className="text-stone-600" />
                        <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    </button>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-red-50 text-red-600 rounded-full text-sm font-bold border border-transparent hover:border-red-100 transition-all">
                        <LogOut size={16} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </nav>

            <div className="container mx-auto p-6 space-y-8 animate-fade-in-up">

                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h2 className="text-4xl font-bold text-stone-800">Welcome back, <span className="text-agri-darkGreen">{user}!</span> 👋</h2>
                        <p className="text-stone-500 mt-2 text-lg">Here's your farming dashboard with real-time insights.</p>
                    </div>

                    <button
                        onClick={handleOpenChat}
                        className="flex items-center gap-2 bg-agri-green text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-agri-green/30 hover:scale-105 active:scale-95 transition-all"
                    >
                        <MessageCircle size={24} />
                        Ask Krishi Officer
                    </button>
                </div>

                {/* Dashboard Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Production Overview */}
                    <GlassCard className="p-6 space-y-4 bg-white/60 hover:bg-white/70 transition-colors border-white/60">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-bold text-stone-400 uppercase tracking-wider">Production Overview</p>
                                <h3 className="text-3xl font-bold text-stone-800 mt-1">₹550,000</h3>
                                <p className="text-xs text-stone-500">Expected Yield Value</p>
                            </div>
                            <div className="p-3 bg-green-100 text-green-600 rounded-full">
                                <TrendingUp size={24} />
                            </div>
                        </div>
                        <div className="pt-4 border-t border-stone-100">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-stone-600">Total Land Area</span>
                                <span className="font-bold text-stone-800">1,200 acres</span>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Weather Today */}
                    <GlassCard className="p-6 space-y-4 bg-white/60 hover:bg-white/70 transition-colors border-white/60">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-stone-400 uppercase tracking-wider">Weather Today</p>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-4xl font-bold text-stone-800">24°C</h3>
                                </div>
                                <div className="flex items-center gap-1 text-stone-500 text-sm">
                                    <Cloud size={16} />
                                    <span>Cloudy</span>
                                </div>
                            </div>
                            <div className="p-3 bg-blue-100 text-blue-500 rounded-full">
                                <Sun size={24} />
                            </div>
                        </div>
                        <div className="pt-4 border-t border-stone-100 grid grid-cols-3 gap-2 text-center text-xs">
                            <div className="bg-white/50 rounded p-1">
                                <Wind size={16} className="mx-auto mb-1 text-stone-400" />
                                12 km/h
                            </div>
                            <div className="bg-white/50 rounded p-1">
                                <Droplets size={16} className="mx-auto mb-1 text-stone-400" />
                                45%
                            </div>
                            <div className="bg-white/50 rounded p-1">
                                <Calendar size={16} className="mx-auto mb-1 text-stone-400" />
                                Today
                            </div>
                        </div>
                    </GlassCard>

                    {/* Water Management */}
                    <GlassCard className="p-6 space-y-4 bg-white/60 hover:bg-white/70 transition-colors border-white/60">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-bold text-stone-400 uppercase tracking-wider">Water Management</p>
                                <h3 className="text-xl font-bold text-stone-800 mt-2">Soil Moisture</h3>
                            </div>
                            <div className="p-3 bg-cyan-100 text-cyan-600 rounded-full">
                                <Droplets size={24} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-bold">
                                <span className="text-agri-blue">Optimal</span>
                                <span className="text-stone-800">75%</span>
                            </div>
                            <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
                                <div className="h-full bg-agri-blue rounded-full" style={{ width: '75%' }}></div>
                            </div>
                            <p className="text-xs text-stone-500 pt-2">Next irrigation recommended in 2 days.</p>
                        </div>
                    </GlassCard>
                </div>

                {/* Quick Actions / Recent Crops */}
                <h3 className="text-xl font-bold text-stone-800 pt-4">Your Crops</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Wheat', 'Rice', 'Cotton', 'Maize'].map((crop) => (
                        <div key={crop} className="bg-white/40 p-4 rounded-xl border border-white/50 flex items-center gap-3 cursor-pointer hover:bg-white/60 transition-colors group">
                            <div className="w-10 h-10 bg-agri-cream rounded-full flex items-center justify-center text-agri-darkGreen group-hover:scale-110 transition-transform">
                                <Sprout size={20} />
                            </div>
                            <span className="font-bold text-stone-700">{crop}</span>
                        </div>
                    ))}
                </div>

            </div>

            {/* Background Elements */}
            <div className="fixed top-20 right-0 w-[40vw] h-[40vw] rounded-full bg-agri-green/10 blur-[100px] -z-10"></div>
            <div className="fixed bottom-0 left-0 w-[60vw] h-[60vw] rounded-full bg-agri-blue/10 blur-[120px] -z-10"></div>
        </main>
    );
}
