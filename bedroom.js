img = "";
Status = "";
objects = [];
function preload(){
    img = loadImage("bedroom.jpg");
}

function setup(){
    canvas = createCanvas(800 , 650);
    canvas.center();
    object_detector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function draw(){
    image(img , 0 , 0 , 800 , 650);

    if(Status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill("#ff2a00");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("#ff2a00");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }

}

function modelLoaded(){
    console.log("model is loaded !!!");
    Status = true;
    object_detector.detect(img , gotResults);
}

function gotResults(error , results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}

function back(){
    window.location = "index.html";
}