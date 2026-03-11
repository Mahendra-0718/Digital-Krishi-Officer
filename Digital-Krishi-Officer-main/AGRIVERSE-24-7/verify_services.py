import sys
import os

sys.path.append(os.path.join(os.getcwd(), 'backend'))

print("\n--- Testing Confidence Calibration ---")
try:
    from app.services.vision_analysis import calibrate_confidence
    
    # Test cases
    scores = [0.15, 0.20, 0.24, 0.28, 0.32]
    print("Raw -> Calibrated")
    for s in scores:
        print(f"{s:.2f} -> {calibrate_confidence(s)}%")
        
except ImportError:
    print("FAIL: Could not import vision service.")
