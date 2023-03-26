document.addEventListener("DOMContentLoaded", () => {
    var btn = document.getElementById('btn');
    var stop_btn = document.getElementById('btn-stop');
    var video = document.getElementById('videoElement');
    var emptyCanvas = document.getElementById('emptyCanvas');
    var emptyCtx = emptyCanvas.getContext('2d');
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    const FPS = 30;
    const socket = io.connect()
    // console.log('https://' + document.domain + ':' + location.port)
    
    
    btn.addEventListener("click", function() {

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

    
    stop_btn.addEventListener("click", () => {
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
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };

        // set the image source to receive the image data
        img.src = response_image;
    });
    
});
