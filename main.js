song1_status = "";
song2_status = "";
song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    song1 = loadSound("music1.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("red");

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song1.stop();

        if(song2_status == false){
            song2.play();
            document.getElementById("songName").innerHTML = "Song Playing : Peter Pan";
        }
    }

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song2.stop();

        if(song1_status == false){
            song1.play();
            document.getElementById("songName").innerHTML = "Song Playing : Harry Potter Theme Song";
        }
    }
}

function modelLoaded(){
    console.log("Model Has Been Loaded!!!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score of Left Wrist : " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X: " + leftWristX + " Left Wrist Y: " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X: " + rightWristX + " Right Wrist Y: " + rightWristY);
    }
}
