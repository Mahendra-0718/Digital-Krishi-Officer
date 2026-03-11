import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, X } from 'lucide-react';

export default function ImageUpload({ onUpload, disabled }) {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    const prevDisabledRef = useRef(disabled);

    React.useEffect(() => {
        // If it was disabled (uploading) and now it's not -> clear preview
        if (prevDisabledRef.current === true && disabled === false) {
            setPreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
        prevDisabledRef.current = disabled;
    }, [disabled]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            onUpload(file); // Trigger upload immediately or wait for confirmation? 
            // Based on original page.js, it triggered immediately. 
            // Ideally we show preview first then send, but keeping existing logic flow for now while adding visual preview.

            // Note: If original logic sends immediately, we might want to clear preview after response.
            // For now, let's auto-clear after 3 seconds or keep it? 
            // Let's keep it simple: just trigger the upload.
        }
    };

    const clearPreview = (e) => {
        e.stopPropagation();
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="relative">
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
                disabled={disabled}
            />

            <button
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
                className="p-3 bg-white/80 text-agri-darkGreen border-2 border-agri-green/20 rounded-2xl hover:border-agri-green hover:bg-agri-green/10 transition-all disabled:opacity-50"
                title="Upload Image"
            >
                <Camera size={24} />
            </button>

            {/* Mini Preview Popup */}
            {preview && (
                <div className="absolute bottom-14 left-0 w-24 h-24 bg-white p-1 rounded-lg shadow-lg border border-gray-200 animate-[fade-in-up_0.2s_ease-out]">
                    <img src={preview} alt="Upload preview" className="w-full h-full object-cover rounded-md" />
                    <button
                        onClick={clearPreview}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-sm hover:bg-red-600"
                    >
                        <X size={12} />
                    </button>
                </div>
            )}
        </div>
    );
};
