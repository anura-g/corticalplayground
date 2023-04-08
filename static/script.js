document.addEventListener("DOMContentLoaded", () => {
    var btn_start = document.getElementById('btn_start');
    var btn_stop = document.getElementById('btn_stop');
    var video = document.getElementById('videoElement');
    var emptyCanvas = document.getElementById('emptyCanvas');
    var emptyCtx = emptyCanvas.getContext('2d');
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    const FPS = 30;
    const socket = io.connect()
    // console.log('https://' + document.domain + ':' + location.port)

    socket.on('connect', () => {
        socket.emit('client connected');    
    });
    
    
    btn_start.addEventListener("click", function() {

        console.log("starting feed")

        navigator.mediaDevices.getUserMedia({video: true})
        .then(function(stream){
            video.srcObject = stream;
            console.log("webcam feed connected")
            setInterval(() => {
                logData();
            }, 1000/FPS); 
        })
        .catch(function(error){ 
            console.log("Error: " + error);
            console.log("could not start the feed")
        });

    });

    
    btn_stop.addEventListener("click", () => {
        video.srcObject = null;
        console.log("Webcam feed stopped")

    });

    
    // draw webcam frame to empty canvas and emit in string format to server
    function logData() {
        emptyCtx.drawImage(video, 0, 0, emptyCanvas.width, emptyCanvas.height);
        var data = emptyCanvas.toDataURL('image/jpeg', 0.5);
        emptyCtx.clearRect(0, 0, video.clientWidth, video.clientHeight);
        socket.emit('image', data);
    };


    socket.on('response_back', function(response_image){

        // create new image element to load the received data
        const img = new Image();

        // when the image is loaded, draw it onto the canvas
        img.onload = () => {
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            canvas.width = videoWidth;
            canvas.height = videoHeight;

            ctx.drawImage(img, 0, 0, videoWidth, videoHeight);
        };

        // set the image source to receive the image data
        img.src = response_image;
    });
    
});
