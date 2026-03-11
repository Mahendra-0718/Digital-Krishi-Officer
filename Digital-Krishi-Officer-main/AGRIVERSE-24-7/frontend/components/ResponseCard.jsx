import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function ResponseCard({ data, hideLanguage }) {
    if (!data) return null;

    const isLowConfidence = data.status === 'low_confidence';

    // Alert logic for pests/diseases
    const isCrisis = data.diagnosis && /pest|blight|disease|wilt|infestation|rot|canker/i.test(data.diagnosis);

    return (
        <div className={`p-4 rounded-xl shadow-md mb-4 ${isLowConfidence ? 'bg-yellow-50 border border-yellow-200' : 'bg-white border border-gray-100'}`}>
            <div className="flex items-start gap-2 mb-2">
                <div className="mt-1 flex flex-col items-center gap-1">
                    {isLowConfidence ? <AlertTriangle className="text-yellow-600" size={20} /> : <CheckCircle className="text-green-600" size={20} />}
                    {isCrisis && (
                        <div className="bg-red-100 p-1.5 rounded-full animate-pulse border border-red-200" title="Immediate Action Required">
                            <AlertTriangle className="text-red-600" size={16} />
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">Response</h3>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mt-1">{data.response}</p>
                </div>
            </div>

            <div className="flex gap-4 mt-4 text-xs text-gray-500 border-t pt-2">
                <span>Confidence: {(data.confidence * 100).toFixed(1)}%</span>
                {!hideLanguage && data.detected_language && (
                    <span>Detected Language: {data.detected_language}</span>
                )}
            </div>
        </div>
    );
}
