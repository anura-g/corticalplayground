from flask import Flask, render_template, request, url_for
from flask_socketio import SocketIO
from utils import base64_to_image, invert, image_to_base64
from gevent import monkey
monkey.patch_all()
import logging 
logging.getLogger('socketio').setLevel(logging.ERROR)
logging.getLogger('engineio').setLevel(logging.ERROR)
logging.getLogger('geventwebsocket.handler').setLevel(logging.ERROR)


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
# socket = SocketIO(app, async_mode = 'eventlet')
socket = SocketIO(app)
socket.init_app(app, cors_allowed_origins="*")



@app.route("/")
def index():
    return render_template('index.html')

@socket.on('connect')
def handle_connection(data):
    print('user connected')

# handle the webcam frames that are being sent from the client
@socket.on('image')
def imageHandler(data):
   
    decoded_img = base64_to_image(data)
    convertedImage = invert(decoded_img)
    response_image = image_to_base64(convertedImage)

    socket.emit('response_back', response_image, to=request.sid)
   

if __name__ == "__main__":
    socket.run(app, debug=False)