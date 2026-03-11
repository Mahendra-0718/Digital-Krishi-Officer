import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

export default function VoiceInput({ onTranscript, disabled, lang }) {
    const [listening, setListening] = useState(false);

    const LANG_MAP = {
        'English': 'en-US',
        'Hindi': 'hi-IN',
        'Telugu': 'te-IN',
        'Tamil': 'ta-IN',
        'Marathi': 'mr-IN',
        'Spanish': 'es-ES'
    };

    const toggleListening = () => {
        if (listening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Voice input is not supported in this browser. Try Chrome.");
            return;
        }

        setListening(true);
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = LANG_MAP[lang] || 'en-US';

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            onTranscript(text);
            setListening(false);
        };

        recognition.onerror = () => {
            setListening(false);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognition.start();

        recognition.onstart = () => {
            console.log("Voice recognition started");
            setListening(true);
        };
    };

    const stopListening = () => {
        setListening(false);
        // Logic to stop if needed (rarely needed for non-continuous)
    };

    return (
        <button
            onClick={toggleListening}
            disabled={disabled}
            className={`relative p-3 rounded-2xl transition-all duration-300 ${listening
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                : 'bg-white/80 text-agri-darkGreen border-2 border-agri-green/20 hover:border-agri-green hover:bg-agri-green/10'
                } disabled:opacity-50`}
            title="Voice Input"
        >
            {listening ? <MicOff size={24} /> : <Mic size={24} />}

            {/* Ripple Animation when listening */}
            {listening && (
                <span className="absolute inset-0 rounded-2xl animate-ripple border-2 border-red-500"></span>
            )}
        </button>
    );
};
