import React from 'react';
import { Leaf, AlertTriangle, CheckCircle, Droplets, Bug } from 'lucide-react';

export default function ImageInsightCard({ insight }) {
    if (!insight) return null;

    // Badges based on confidence
    const getConfidenceBadge = (score) => {
        if (score >= 80) return <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200">High Confidence ({score}%)</span>;
        if (score >= 50) return <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold border border-yellow-200">Medium Confidence ({score}%)</span>;
        return <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200">Low Confidence ({score}%)</span>;
    };

    // Icon based on diagnosis keyword
    const getIcon = (text) => {
        const t = text.toLowerCase();
        if (t.includes('healthy')) return <CheckCircle className="text-agri-primary w-6 h-6" />;
        if (t.includes('pest') || t.includes('bug')) return <Bug className="text-red-500 w-6 h-6" />;
        if (t.includes('water') || t.includes('dry')) return <Droplets className="text-blue-500 w-6 h-6" />;
        return <AlertTriangle className="text-amber-500 w-6 h-6" />;
    };

    return (
        <div className="mt-2 w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 animate-slide-up">
            <div className={`h-2 w-full ${insight.diagnosis.toLowerCase().includes('healthy') ? 'bg-agri-primary' : 'bg-red-400'}`}></div>
            <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        {getIcon(insight.diagnosis)}
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg leading-tight">{insight.diagnosis}</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mt-0.5">
                                {insight.crop_type || "Analysis"}
                            </p>
                        </div>
                    </div>
                    {insight.confidence > 0 && getConfidenceBadge(insight.confidence)}
                </div>

                <div className="bg-agri-base/50 p-3 rounded-lg border border-agri-light mb-3">
                    <p className="text-sm text-gray-700 leading-relaxed font-medium">
                        "{insight.action}"
                    </p>
                </div>

                <div className="flex justify-end">
                    <span className="text-[10px] text-gray-400">AI Diagnosis • Verify with Expert</span>
                </div>
            </div>
        </div>
    );
}
