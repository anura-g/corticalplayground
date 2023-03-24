from flask import Flask, render_template, url_for
from flask_socketio import SocketIO
from utils import base64_to_image, invert, image_to_base64


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
# socket = SocketIO(app, async_mode = 'eventlet')
socket = SocketIO(app)
socket.init_app(app, cors_allowed_origins="*")



@app.route("/")
def index():
    return render_template('index.html')

# handle the webcam frames that are being sent from the client
@socket.on('image')
def imageHandler(data):
    print("SOCKET TRIGGERED CORRECTLY")
    decoded_img = base64_to_image(data)
    convertedImage = invert(decoded_img)
    response_image = image_to_base64(convertedImage)
    print(response_image)
    socket.emit('response_back', response_image)
   

if __name__ == "__main__":
    socket.run(app, debug=False)