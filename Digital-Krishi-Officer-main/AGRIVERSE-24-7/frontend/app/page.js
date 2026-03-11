"use client";

import React, { useState } from 'react';
import { Menu, Sprout, Feather } from 'lucide-react'; // Imports
import { api } from '../services/api';
import Header from '../components/Header';
import MessageList from '../components/MessageList';
import InputBox from '../components/InputBox';
import VoiceInput from '../components/VoiceInput';
import ImageUpload from '../components/ImageUpload';
import Sidebar from '../components/Sidebar';
import LandingPage from '../components/LandingPage';
import RotatingQuote from '../components/RotatingQuote';

import { useRouter, useSearchParams } from 'next/navigation';

import { translations } from '../utils/translations';

export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const showChat = searchParams.get('mode') === 'chat';
    const [userLang, setUserLang] = useState('English');
    const [t, setT] = useState(translations.english);

    // Global session check & Language Sync
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            if (!user) {
                router.push('/login');
            }

            const savedLang = localStorage.getItem('appLanguage') || 'English';
            setUserLang(savedLang);
            const langKey = savedLang.toLowerCase();
            if (translations[langKey]) {
                setT(translations[langKey]);
            }
        }
    }, [router]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [history, setHistory] = useState([]); // Chat History State
    const [currentChatId, setCurrentChatId] = useState(null); // Current Session ID
    const [loading, setLoading] = useState(false);
    const [lastSpokenMsg, setLastSpokenMsg] = useState(null);

    // Initialize history from localStorage
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedHistory = localStorage.getItem('agriverse_history');
            if (savedHistory) {
                try {
                    setHistory(JSON.parse(savedHistory));
                } catch (e) {
                    console.error("Failed to parse history", e);
                }
            }
        }
    }, []);

    // Persist history to localStorage
    React.useEffect(() => {
        if (typeof window !== 'undefined' && history.length > 0) {
            localStorage.setItem('agriverse_history', JSON.stringify(history));
        }
    }, [history]);

    // Auto-update history when messages change
    React.useEffect(() => {
        if (currentChatId && messages.length > 0) {
            setHistory(prev => {
                const index = prev.findIndex(item => item.id === currentChatId);
                if (index !== -1) {
                    const newHistory = [...prev];
                    // Only update if messages actually changed
                    if (JSON.stringify(newHistory[index].messages) !== JSON.stringify(messages)) {
                        newHistory[index] = { ...newHistory[index], messages };
                        return newHistory;
                    }
                }
                return prev;
            });
        }
    }, [messages, currentChatId]);

    // BCP-47 Mapping for speech and voice
    const BCP47_MAP = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'te': 'te-IN',
        'ta': 'ta-IN',
        'mr': 'mr-IN',
        'pa': 'pa-IN',
        'es': 'es-ES'
    };

    const REVERSE_MAP = {
        'en': 'English',
        'hi': 'Hindi',
        'te': 'Telugu',
        'ta': 'Tamil',
        'mr': 'Marathi',
        'pa': 'Punjabi',
        'es': 'Spanish'
    };

    const USER_LANG_TO_CODE = {
        'English': 'en',
        'Hindi': 'hi',
        'Telugu': 'te',
        'Tamil': 'ta',
        'Marathi': 'mr',
        'Punjabi': 'pa',
        'Spanish': 'es'
    };

    // Text to Speech logic with enhanced voice selection
    // Text to Speech logic with enhanced voice selection
    const speak = (text, langCode) => {
        if (!text || typeof window === 'undefined' || !window.speechSynthesis) return;

        const synth = window.speechSynthesis;

        // Clean markdown and non-voiceable characters
        const cleanText = text.replace(/\*\*/g, '').replace(/###/g, '').replace(/\[.*?\]/g, '').replace(/\n/g, ' ');

        const doSpeak = () => {
            try {
                synth.cancel();
                // Browsers often need a resume() if they've been interrupted
                if (synth.paused) synth.resume();

                setTimeout(() => {
                    const utterance = new SpeechSynthesisUtterance(cleanText);
                    const voices = synth.getVoices();
                    const targetBCP = BCP47_MAP[langCode] || 'en-US';

                    // Advanced voice selection
                    let voice = voices.find(v => v.lang.toLowerCase() === targetBCP.toLowerCase()) ||
                        voices.find(v => v.name.toLowerCase().includes('telugu')) ||
                        voices.find(v => v.name.toLowerCase().includes('hemalatha')) ||
                        voices.find(v => v.lang.startsWith(langCode)) ||
                        voices.find(v => v.name.toLowerCase().includes('india')) ||
                        voices.find(v => v.lang.includes('IN')) ||
                        voices[0];

                    if (voice) {
                        utterance.voice = voice;
                        utterance.lang = voice.lang;
                    } else {
                        utterance.lang = targetBCP;
                    }

                    utterance.rate = 0.85;
                    utterance.pitch = 1.0;
                    utterance.volume = 1.0;

                    utterance.onstart = () => console.log(`TTS Start: "${voice?.name || 'Local'}" for ${langCode}`);
                    utterance.onerror = (e) => console.error("TTS Utterance Error:", e);
                    utterance.onend = () => console.log("TTS Finished");

                    console.log(`TTS: Speaking ${langCode} via ${voice?.name || 'System Default'}`);
                    synth.speak(utterance);
                }, 300); // 300ms delay for stability
            } catch (e) {
                console.error("TTS Execution Error:", e);
            }
        };

        if (synth.getVoices().length === 0) {
            synth.onvoiceschanged = () => {
                doSpeak();
                synth.onvoiceschanged = null;
            };
        } else {
            doSpeak();
        }
    };

    // Auto-speak bot responses with voice-loading backup
    React.useEffect(() => {
        const lastMsg = messages[messages.length - 1];
        if (lastMsg && lastMsg.type === 'bot' && lastMsg !== lastSpokenMsg && !loading) {
            setLastSpokenMsg(lastMsg);

            let langCode = (lastMsg.meta && lastMsg.meta.detected_language) || USER_LANG_TO_CODE[userLang] || 'en';

            // Only use script-detection as a safety hint if metadata says 'en' but we see regional script
            if (langCode === 'en' || langCode === 'unknown') {
                if (/[\u0C00-\u0C7F]/.test(lastMsg.content)) langCode = 'te';
                else if (/[\u0900-\u097F]/.test(lastMsg.content)) langCode = 'hi';
                else if (/[\u0B80-\u0BFF]/.test(lastMsg.content)) langCode = 'ta';
            }

            speak(lastMsg.content, langCode);
        }
    }, [messages, lastSpokenMsg, userLang, loading]);

    // Trust & Safety Note
    const TrustNote = () => (
        <div className="text-center text-[10px] text-stone-400/80 py-2">
            AI-assisted guidance. Verify with certified officers.
        </div>
    );

    const handleQuery = async (text) => {
        if (!text) return;
        setLoading(true);

        if (messages.length === 0) {
            const newId = Date.now().toString();
            setCurrentChatId(newId);
            setHistory(prev => [{ id: newId, title: text, messages: [], date: new Date() }, ...prev]);
        }

        try {
            setMessages(prev => [...prev, { type: 'user', content: text }]);
            const result = await api.submitQuery(text, userLang);

            if (result.detected_language && result.detected_language !== 'en' && BCP47_MAP[result.detected_language]) {
                const newLangName = REVERSE_MAP[result.detected_language];
                if (newLangName && newLangName !== userLang) {
                    syncLanguage(newLangName);
                    setMessages(prev => [...prev, {
                        type: 'bot',
                        content: `🌐 Language detected: ${REVERSE_MAP[result.detected_language]}. Switching for better advice.`
                    }]);
                }
            }

            setMessages(prev => [...prev, {
                type: 'bot',
                content: result.response,
                meta: result,
                confidence: result.confidence
            }]);

        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { type: 'error', content: `Error: ${error.message || "Connection failed"}` }]);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (file) => {
        setLoading(true);

        if (messages.length === 0) {
            const newId = Date.now().toString();
            setCurrentChatId(newId);
            setHistory(prev => [{ id: newId, title: "📷 Image Analysis", messages: [], date: new Date() }, ...prev]);
        }

        // Create local preview URL
        const localPreview = URL.createObjectURL(file);

        try {
            setMessages(prev => [...prev, { type: 'user', content: t.uploading || "Analyzing photos...", image: localPreview }]);

            // Dynamic delay based on file size (premium feel)
            const delay = Math.min(2000, Math.max(800, file.size / 1000));
            await new Promise(r => setTimeout(r, delay));

            const result = await api.uploadImage(file, userLang);

            setMessages(prev => [...prev, {
                type: 'bot',
                content: result.analysis,
                image: localPreview,
                meta: result,
                confidence: result.confidence
            }]);

        } catch (error) {
            console.error("Upload Error:", error);
            setMessages(prev => [...prev, { type: 'error', content: "Visual Analysis failed. Please try again." }]);
            URL.revokeObjectURL(localPreview);
        } finally {
            setLoading(false);
        }
    };

    // Cleanup object URLs on unmount to prevent memory leaks
    React.useEffect(() => {
        return () => {
            messages.forEach(msg => {
                if (msg.image && msg.image.startsWith('blob:')) {
                    URL.revokeObjectURL(msg.image);
                }
            });
        };
    }, []);

    const handleNewChat = () => {
        setMessages([]);
        setCurrentChatId(null);
        router.push('/?mode=chat');
    };

    const handleSelectChat = (chat) => {
        setCurrentChatId(chat.id);
        setMessages(chat.messages || []);
    };

    const syncLanguage = (newLang) => {
        setUserLang(newLang);
        const langKey = newLang.toLowerCase();
        if (translations[langKey]) {
            setT(translations[langKey]);
        }
    };

    if (!showChat) {
        return <LandingPage onStart={() => router.push('/?mode=chat')} t={t} onLanguageChange={syncLanguage} />;
    }

    return (
        <div className="flex h-screen bg-peacock-gradient overflow-hidden font-sans text-stone-800">
            {/* Sidebar (ChatGPT Style) */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onNewChat={handleNewChat}
                onGoHome={() => router.push('/')}
                onSelectChat={handleSelectChat}
                history={history}
            />

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col relative w-full">

                {/* Mobile Header for Sidebar Toggle */}
                <div className="md:hidden flex items-center p-4 text-stone-600 bg-white/20 backdrop-blur-md">
                    <button onClick={() => setIsSidebarOpen(true)}>
                        <Menu size={24} />
                    </button>
                    <span className="ml-4 font-bold text-agri-darkGreen">AGRIVERSE</span>
                </div>

                {/* Central Watermark / Logo Background */}
                {!messages.length && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-100 z-0">
                        <div className="flex flex-col items-center gap-6">
                            {/* Stylized Peacock Feather */}
                            <div className="relative mb-6"> {/* Added mb-6 to push text down */}
                                <div className="absolute inset-0 bg-peacock-eye blur-3xl opacity-40 animate-pulse-slow"></div>
                                <div className="p-8 bg-gradient-to-br from-peacock-feather to-agri-darkGreen rounded-full shadow-2xl shadow-peacock-eye/50 border-4 border-white/20 animate-float">
                                    <Feather size={80} className="text-white drop-shadow-md" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-agri-blue rounded-full animate-bounce"></div>
                            </div>

                            {/* Rotating Quotes below the logo as requested */}
                            <div className="text-center max-w-lg mx-auto pt-8 animate-fade-in-up">
                                <p className="text-agri-darkGreen/40 font-bold uppercase tracking-widest text-[10px] mb-2">{t.chat_namaste}</p>
                                <RotatingQuote />
                            </div>


                        </div>
                    </div>
                )}

                {/* Chat Content */}
                <div className="flex-1 overflow-auto relative z-10">
                    <div className="hidden md:block">
                        <Header onLanguageChange={syncLanguage} />
                    </div>

                    <MessageList messages={messages} loading={loading} onSpeak={speak} />
                </div>

                {/* Input Area (Floating at bottom) */}
                <div className="w-full p-4 md:p-6 bg-gradient-to-t from-white/80 via-white/40 to-transparent z-20">
                    <div className="max-w-3xl mx-auto flex gap-2 items-end bg-white/60 backdrop-blur-xl p-2 rounded-2xl shadow-lg border border-white/50">
                        <ImageUpload onUpload={handleImageUpload} disabled={loading} />
                        <VoiceInput onTranscript={handleQuery} disabled={loading} lang={userLang} />
                        <InputBox onSend={handleQuery} disabled={loading} placeholder={t.ask_placeholder} />
                    </div>
                    <TrustNote />
                </div>
            </div>
        </div>
    );
}
