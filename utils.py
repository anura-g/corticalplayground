import cv2
import base64 
import numpy as np

def base64_to_image(base64_img):
    encoded_data = base64_img.split(',')[1]
    img_bytes = np.fromstring(base64.b64decode(encoded_data), np.uint8)
    img = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)
    return img

def image_to_base64(img):
    stringData = base64.b64encode(img).decode('utf-8')
    b64_src = 'data:image/jpeg;base64,'
    stringData = b64_src + stringData
    return stringData

def convert2Greyscale(img):
    converted_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return converted_img