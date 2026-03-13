from PIL import Image
import sys

def remove_black_background(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        # Open the image and convert it to RGBA
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # item is (R, G, B, A)
            # If the pixel is very dark (close to black), make it transparent
            if item[0] < 30 and item[1] < 30 and item[2] < 30:
                newData.append((0, 0, 0, 0)) # Fully transparent
            else:
                newData.append(item) # Keep original pixel

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Transparent image saved to {output_path}")
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python remove_bg_pil.py <input> <output>")
        sys.exit(1)
    
    remove_black_background(sys.argv[1], sys.argv[2])
