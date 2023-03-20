document.addEventListener("DOMContentLoaded", () => {
    var btn = document.getElementById('btn');
    var video = document.getElementById('videoElement');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    const FPS = 30;

   

    btn.addEventListener("click", function() {

        console.log("Click registered")

        navigator.mediaDevices.getUserMedia({video: true})
        .then(function(stream){
            video.srcObject = stream;
            setInterval(() => {
                logData();
            }, 1000/FPS); 
        })
        .catch(function(error){ 
            console.log("Error: " + error)    
        });

    });


    function logData() {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        var data = canvas.toDataURL('image/jpeg', 0.5);
        // context.clearRect(0, 0, video.clientWidth, video.clientHeight);
        // socket.emit('image', data);
        console.log(data);
    };
    
});
