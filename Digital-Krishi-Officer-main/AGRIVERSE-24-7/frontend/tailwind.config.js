/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                agri: {
                    green: '#4ADE80',
                    darkGreen: '#14532D',
                    sky: '#E0F2FE',
                    blue: '#38BDF8',
                    soil: '#78350F',
                    white: '#FFFFFF',
                    cream: '#FEFCE8',
                },
                parrot: {
                    light: '#84cc16',
                    DEFAULT: '#65a30d',
                    dark: '#3f6212',
                },
                sky: {
                    light: '#bae6fd',
                    DEFAULT: '#0ea5e9',
                    dark: '#0369a1',
                },
                peacock: {
                    eye: '#0f766e',
                    feather: '#115e59',
                    dark: '#134e4a',
                },
                confidence: {
                    high: '#22C55E',
                    medium: '#EAB308',
                    low: '#EF4444',
                }
            },
            backgroundImage: {
                'nature-gradient': 'linear-gradient(to bottom, #E0F2FE 0%, #F0FDF4 100%)',
                'peacock-gradient': 'radial-gradient(circle at 50% 30%, #ecfccb 0%, #e0f2fe 30%, #dcfce7 60%, #f0f9ff 100%)',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                ripple: {
                    '0%': { transform: 'scale(1)', opacity: '0.4' },
                    '100%': { transform: 'scale(2)', opacity: '0' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                zoomIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                }
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'ripple': 'ripple 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'zoom-in': 'zoomIn 0.6s ease-out forwards',
                'wiggle': 'wiggle 1s ease-in-out infinite',
                'marquee-slow': 'marquee 15s linear infinite',
            },
        },
    },
    plugins: [],
};
