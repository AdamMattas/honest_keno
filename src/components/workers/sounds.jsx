import ding from "../../public/ding_01.mp3";
import dong from "../../public/ding_02.mp3";

export function playSounds(volume, random, hits, delayExponent) {
  let delay = 0;
  console.log("RANDOM LENGTH: ", random.length);

  random.forEach(rand => {
    if (hits.indexOf(rand) !== -1) {
      setTimeout(() => {
        const dingSound = new Sound(ding, volume);
        dingSound.play();
      }, delay * delayExponent);
    } else {
      setTimeout(() => {
        const dongSound = new Sound(dong, volume);
        dongSound.play();
      }, delay * delayExponent);
    }
    delay += 100;
  });
}

function Sound(src, volume) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.volume = volume;
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  };
  this.stop = function() {
    this.sound.pause();
  };
}

export default {
  playSounds
};
