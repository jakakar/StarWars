var isPlaying = false;
var audio= new Audio("sound/starwars.mp3");
var a=document.getElementById("sound1");
let music = () => {
  if (document.getElementById("musicCheck").checked) {
    isPlaying = true;
    audio.play();
    document.getElementById("sound1").src = "sound/sonic.mp3";
    console.log(isPlaying);
  } else{
   
    console.log(isPlaying);
    audio.pause();
    document.getElementById("sound1").src = "audio";
    isPlaying = false;
  }
};