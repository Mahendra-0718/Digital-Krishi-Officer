import { Volume2 } from 'lucide-react';
import ResponseCard from './ResponseCard';

const ConfidenceBadge = ({ confidence }) => {
    // Confidence logic: High (Green), Medium (Yellow), Low (Red)
    let color = 'bg-confidence-high';
    let label = 'Verify';

    if (confidence && confidence < 0.5) {
        color = 'bg-confidence-low';
        label = 'Low Confidence';
    } else if (confidence && confidence < 0.8) {
        color = 'bg-confidence-medium';
        label = 'Verify';
    } else {
        color = 'bg-confidence-high';
        label = 'Confirmed';
    }

    return (
        <span className={`inline-block w-2 h-2 rounded-full ${color} ml-2`} title={`Confidence: ${label}`} />
    );
};

const MessageBubble = ({ message, onSpeak }) => {
    const isUser = message.type === 'user';
    const isError = message.type === 'error';

    // Animation class
    const animationClass = "animate-[fade-in-up_0.3s_ease-out]";

    if (isUser) {
        return (
            <div className={`flex justify-end mb-4 ${animationClass}`}>
                <div className="bg-agri-sky text-agri-darkGreen px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm max-w-[80%] border border-agri-blue/20">
                    <p className="text-sm font-medium">{message.content}</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className={`flex justify-start mb-4 ${animationClass}`}>
                <div className="bg-red-50 text-red-800 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm max-w-[80%] border border-red-100">
                    <p className="text-sm">{message.content}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex justify-start mb-4 ${animationClass}`}>
            <div className="max-w-[90%] group">
                <div className="bg-white/80 backdrop-blur-sm px-5 py-4 rounded-2xl rounded-tl-sm shadow-md border border-agri-green/10 text-stone-700">
                    {/* Integrated Image for Image Analysis */}
                    {message.image && (
                        <div className="mb-4 rounded-xl overflow-hidden border-2 border-agri-green/20 shadow-sm transition-transform hover:scale-[1.02]">
                            <img src={message.image} alt="Analyzed content" className="w-full max-h-64 object-cover" />
                            <div className="bg-agri-green/10 px-3 py-1.5 text-[10px] font-bold text-agri-darkGreen uppercase tracking-widest border-t border-agri-green/10">
                                Context: Analyzed Image
                            </div>
                        </div>
                    )}

                    {message.meta ? (
                        <ResponseCard data={message.meta} hideLanguage={!!message.image} />
                    ) : (
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                    )}
                </div>
                {/* Confidence Badge & Footer for Bot */}
                <div className="flex items-center mt-1 ml-1 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-stone-400 font-medium">Digital Krishi Officer</span>
                    <ConfidenceBadge confidence={message.confidence} />

                    {/* Manual Speak Button */}
                    <button
                        onClick={() => onSpeak && onSpeak(message.content, (message.meta && message.meta.detected_language) || 'en')}
                        className="ml-3 p-1 rounded-full hover:bg-agri-green/10 text-agri-green/60 hover:text-agri-green transition-colors"
                        title="Read out loud"
                    >
                        <Volume2 size={12} />
                    </button>

                    {message.meta && message.meta.detected_language && (
                        <span className="ml-auto text-[9px] text-stone-300 font-mono italic">
                            [{message.meta.detected_language.toUpperCase()}]
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
