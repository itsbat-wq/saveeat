from PIL import Image
import sys

def make_transparent(input_path, output_path, tolerance=50):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        # Get background color from top-left pixel
        # Defaulting to checking typical black/dark backgrounds based on user's comment
        bg_color = datas[0] # assuming top-left is background
        bg_r, bg_g, bg_b = bg_color[:3]

        newData = []
        for item in datas:
            r, g, b, a = item
            
            # Check if pixel is within tolerance of black
            if r < tolerance and g < tolerance and b < tolerance:
                # Make it fully transparent
                newData.append((255, 255, 255, 0)) 
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Background removed successfully. Saved to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python remove_bg_advanced.py <input> <output>")
        sys.exit(1)
        
    make_transparent(sys.argv[1], sys.argv[2], tolerance=60)
