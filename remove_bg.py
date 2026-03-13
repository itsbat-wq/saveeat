import cv2
import numpy as np
import sys

def remove_background(input_path, output_path):
    print(f"Processing {input_path}...")
    # Read the image
    img = cv2.imread(input_path, cv2.IMREAD_UNCHANGED)
    
    # If the image already has an alpha channel, we might just need to modify it
    if img.shape[2] == 4:
        # It has an alpha channel. Let's make sure black pixels are transparent
        # Convert to grayscale to find black areas
        gray = cv2.cvtColor(img[:,:,:3], cv2.COLOR_BGR2GRAY)
        # Threshold for black (close to 0)
        # 10 is the threshold value, adjust if needed (0-255)
        _, mask = cv2.threshold(gray, 15, 255, cv2.THRESH_BINARY)
        
        # Modify the alpha channel
        img[:,:,3] = mask
        
        print("Image has 4 channels. Adjusted alpha channel based on darkness.")
    else:
        # Convert to BGRA (add alpha channel)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
        
        # Identify black pixels
        # You can adjust the upper bound if the background is not pure black
        lower = np.array([0, 0, 0, 255])
        upper = np.array([20, 20, 20, 255])
        
        # Create a mask
        mask = cv2.inRange(img, lower, upper)
        
        # Set alpha to 0 for black pixels
        img[mask > 0] = [0, 0, 0, 0]
        print("Image had 3 channels. Converted to 4 and removed black background.")
        
    cv2.imwrite(output_path, img)
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python remove_bg.py <input> <output>")
        sys.exit(1)
    
    remove_background(sys.argv[1], sys.argv[2])
