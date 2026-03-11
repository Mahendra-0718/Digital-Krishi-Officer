import React from 'react';

const LANGUAGE_NAMES = {
    'en': 'English',
    'te': 'Telugu',
    'hi': 'Hindi',
    'ta': 'Tamil'
};

export default function LanguageBadge({ languageCode }) {
    if (!languageCode) return null;

    const name = LANGUAGE_NAMES[languageCode] || languageCode.toUpperCase();

    return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-yellow-900 border border-yellow-200 shadow-sm animate-fade-in">
            Detected: {name}
        </span>
    );
}
