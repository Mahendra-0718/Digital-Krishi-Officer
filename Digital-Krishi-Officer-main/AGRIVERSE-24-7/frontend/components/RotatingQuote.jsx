import React, { useState, useEffect } from 'react';

const QUOTES = [
    "The ultimate goal of farming is not the growing of crops, but the cultivation and perfection of human beings. — Masanobu Fukuoka",
    "Agriculture is the most healthful, most useful and most noble employment of man. — George Washington",
    "To forget how to dig the earth and to tend the soil is to forget ourselves. — Mahatma Gandhi",
    "The farmer is the only man in our economy who buys everything at retail, sells everything at wholesale, and pays the freight on both ways. — John F. Kennedy",
    "Farming looks mighty easy when your plow is a pencil and you're a thousand miles from the corn field. — Dwight D. Eisenhower"
];

export default function RotatingQuote() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % QUOTES.length);
        }, 6000); // Change every 6 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center max-w-lg mx-auto p-4 animate-fade-in-up">
            <p className="text-lg md:text-xl font-medium text-stone-600 italic leading-relaxed">
                "{QUOTES[index]}"
            </p>
        </div>
    );
}
