import React from 'react';

const GlassCard = ({ children, className = "" }) => {
    return (
        <div className={`backdrop-blur-md bg-white/70 border border-white/50 shadow-xl rounded-2xl ${className}`}>
            {children}
        </div>
    );
};

export default GlassCard;
