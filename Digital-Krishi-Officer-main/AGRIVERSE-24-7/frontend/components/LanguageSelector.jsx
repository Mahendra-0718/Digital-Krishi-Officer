import React from 'react';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'te', name: 'Telugu' },
    { code: 'ta', name: 'Tamil' },
    { code: 'kn', name: 'Kannada' },
];

export default function LanguageSelector({ selected, onChange }) {
    return (
        <select
            value={selected}
            onChange={(e) => onChange(e.target.value)}
            className="p-2 border rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
            {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                    {lang.name}
                </option>
            ))}
        </select>
    );
}
