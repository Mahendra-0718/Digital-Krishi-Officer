from deep_translator import GoogleTranslator
from app.core.logger import get_logger

logger = get_logger(__name__)

class TranslateService:
    def __init__(self):
        # We instantiate translators on demand or keep a default EN one
        pass

    async def translate_to_english(self, text: str) -> dict:
        """
        Translates text to English and returns original language code.
        Note: deep-translator doesn't always give source lang back easily in one shot 
        like googletrans, but we can assume 'auto' source.
        To get the source, we might need a separate detection or just pass it in if known.
        
        However, the current pipeline calls this FIRST, often before we know the lang 
        (except what we detected via voice).
        
        Let's assume input text needs 'auto' -> 'en'.
        Use langdetect to guess source for the purpose of 'src' return?
        Or just use 'auto' and return 'unknown' if we can't be sure?
        
        Actually, our query pipeline:
        1. Voice Input -> VoiceInput.jsx detects lang (passed as param)
        2. Text Input -> We don't know lang.
        
        Let's use `langdetect` (which we have) for source identification if needed, 
        or just rely on the heuristic we built.
        
        Wait, `googletrans` returned `.src`. `deep_translator` does NOT return source with `translate`.
        We should use our `language_detect` service here to fill the gap!
        """
        try:
            if not text:
                return {"text": "", "src": "en"}
            
            # 1. Detect Source
            # We import here to avoid circular dependencies if any
            from app.services.language_detect import detect_language_text
            
            detected = detect_language_text(text)
            src_lang = detected['code']
            
            if src_lang == 'en':
                 return {"text": text, "src": "en"}
            
            # 2. Translate
            translator = GoogleTranslator(source='auto', target='en')
            translated_text = translator.translate(text)
            
            logger.info(f"Translated '{text}' ({src_lang}) -> '{translated_text}'")
            return {"text": translated_text, "src": src_lang}
            
        except Exception as e:
            logger.error(f"Translation failed: {e}")
            return {"text": text, "src": "unknown"}

    async def translate_from_english(self, text: str, target_lang: str) -> str:
        """
        Translates text from English to target language.
        """
        if target_lang == 'en' or target_lang == 'unknown' or not target_lang:
            return text
        try:
            translator = GoogleTranslator(source='en', target=target_lang)
            translated_text = translator.translate(text)
            return translated_text
        except Exception as e:
            logger.error(f"Back-translation failed: {e}")
            return text

translate_service = TranslateService()
