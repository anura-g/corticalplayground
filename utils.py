import cv2
import base64 
import numpy as np

def base64_to_image(base64_img):
    encoded_data = base64_img.split(',')[1]

    # Decode base64 string back into original binary form and puts it all in a numpy array 
    img_bytes = np.fromstring(base64.b64decode(encoded_data), np.uint8)
   
    # Decode raw image binary data into a numpy array that opencv accepts 
    img = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)
    return img


def image_to_base64(img):
    booleanFlag, buffer = cv2.imencode('.jpg', img)
    b64_string = 'data:image/jpeg;base64,' + base64.b64encode(buffer).decode('utf-8')
    return b64_string
    
# def image_to_base64(img):
#     stringData = base64.b64encode(img).decode('utf-8')
#     b64_src = 'data:image/jpeg;base64,'
#     stringData = b64_src + stringData
#     return stringData

def invert(img):
    img = cv2.bitwise_not(img)
    return img