from langdetect import detect, DetectorFactory, detect_langs
from langdetect.lang_detect_exception import LangDetectException
import re

# Enforce consistent results
DetectorFactory.seed = 0

SUPPORTED_LANGUAGES = {
    'en': 'English',
    'te': 'Telugu',
    'hi': 'Hindi',
    'ta': 'Tamil'
}

# KEYWORDS: Expand with more Hindi/Hinglish to distinguish from Tenglish
KEYWORDS = {
    'hi': [
        'kya', 'kaise', 'hai', 'khet', 'fasal', 'pani', 'nahi', 'kab', 'kyu', 'namaste', 'bimar', 'dawai',
        'chahiye', 'karna', 'hoga', 'rha', 'raha', 'rhi', 'rahi', 'kis', 'kaun', 'kise', 'mein', 'ko', 'ki', 'ke',
        'matlab', 'kuch', 'hume', 'hame', 'aap', 'tum', 'kahan', 'acha', 'theek', 'shukriya'
    ],
    'te': [
        'yela', 'ela', 'panta', 'undi', 'kavali', 'eppudu', 'nenu', 'polam', 'namaskaram', 'cheppu', 
        'pathi', 'vadlaku', 'entha', 'neeru', 'avasaram', 'pandinchali', 'vari', 'mirapa', 
        'antey', 'antay', 'ante', 'emiti', 'yenti', 'enti', 'yenta', 'cheyyali', 'vundali', 'vundi',
        'unnavu', 'bagunnara', 'cheppandi', 'telugu', 'naa', 'nee', 'meeru', 'kadu', 'avunu'
    ],
    'ta': [
        'eppadi', 'payir', 'thanneer', 'irukku', 'illai', 'vanakkam', 'solla', 'eppozhuthu', 'nalla', 'yenna'
    ]
}

# PHONETIC MAP: Browser STT (en-IN) often misinterprets Indian words as English words.
PHONETIC_MAP = {
    'hi': ['khet', 'kate', 'khat', 'fasal', 'pani', 'kaise', 'kab', 'bimar', 'namaste', 'matlab', 'matilab'],
    'te': ['panta', 'ela', 'undi', 'polam', 'eppudu', 'rogalu', 'neeru', 'avasaram', 'pathi', 'vadlaku', 'pandinchali', 'emiti', 'yenti', 'ante', 'antay'],
    'ta': ['payir', 'eppadi', 'irukku', 'noi', 'vanakkam']
}

def detect_language_text(text: str) -> dict:
    if not text or not text.strip():
        return {'code': 'en', 'name': 'English'}

    text_lower = text.lower()
    words = set(re.findall(r'\w+', text_lower))
    scores = {'hi': 0, 'te': 0, 'ta': 0}

    # 1. Unicode Script Weights (Substantial hint)
    has_te_script = any('\u0C00' <= char <= '\u0C7F' for char in text)
    has_hi_script = any('\u0900' <= char <= '\u097F' for char in text)
    has_ta_script = any('\u0B80' <= char <= '\u0BFF' for char in text)

    if has_te_script: scores['te'] += 6
    if has_ta_script: scores['ta'] += 6
    if has_hi_script: scores['hi'] += 6

    # 2. Heuristic Check for Keywords (Romanized/English transcription)
    for lang, kw_list in KEYWORDS.items():
        for kw in kw_list:
            if kw in words:
                scores[lang] += 5 

    # 3. Phonetic/Approximate Matches
    for lang, phon_list in PHONETIC_MAP.items():
        for phon in phon_list:
            if phon in text_lower:
                scores[lang] += 3

    # 4. Statistical sanity check (langdetect)
    stats_lang = 'en'
    try:
        results = detect_langs(text)
        if results and results[0].prob > 0.6:
            stats_lang = results[0].lang
            if stats_lang in scores:
                scores[stats_lang] += 7 # Give high weight to statistical proof
    except: pass

    # Resolve tie/winner
    best_lang = max(scores, key=scores.get)
    
    # Final threshold check
    if scores[best_lang] >= 4:
        return {'code': best_lang, 'name': SUPPORTED_LANGUAGES.get(best_lang)}

    return {'code': 'en', 'name': 'English'}
