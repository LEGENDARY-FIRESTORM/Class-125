noseX = 0;
noseY = 0;
difference = 0;
wristX = 0;
wristY = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(550,500);

    canvas = createCanvas(550, 510);
    canvas.position(560, 100);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Posenet is intialised");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("Nose x = " + noseX + " Nose y = " + noseY);
        wristX = results[0].pose.rightWrist.x;
        wristY = results[0].pose.leftWrist.x;
        difference = floor(wristY - wristX);
        console.log("left wrist = " + wristY + " right wrist = " + wristX + "difference is " + difference);
    }
}

function draw(){
    background('#969A97');
    document.getElementById("square_side").innerHTML = "Width and Height of a Square will be = " + difference + "px";
    fill('#F90093');
    stroke('#F90093');
    square(noseX, noseY, difference);
}