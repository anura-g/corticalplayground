from flask import Flask, render_template, url_for
from flask_socketio import SocketIO
from utils import base64_to_image, invert, image_to_base64

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socket = SocketIO(app)




@app.route("/")
def index():
    return render_template('index.html')

@socket.on('image')
def imageHandler(data):

    decoded_img = base64_to_image(data)
    convertedImage = invert(decoded_img)
    response_image = image_to_base64(convertedImage)

    socket.emit('response_back', response_image)
   

if __name__ == "__main__":
    socket.run(app, debug=True)