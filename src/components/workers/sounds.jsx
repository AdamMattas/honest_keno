import ding from "../../public/ding_01.ogg";
import dong from "../../public/ding_02.ogg";
import dingReverse from "../../public/ding_03.ogg";
import ding4 from "../../public/ding_04.ogg";
import tick1 from "../../public/tick_01.ogg";
import tick2 from "../../public/tick_02.ogg";
import tick3 from "../../public/tick_03.ogg";

export function playSounds(volume, random, hits, delayExponent) {
  let delay = 0;
  console.log("RANDOM LENGTH: ", random.length);
  let array = [];

  let element;
  random.forEach(rand => {
    if (hits.indexOf(rand) !== -1) {
      //   setTimeout(() => {
      //     const dingSound = new Sound(tick3, volume, delay);
      //     dingSound.play();
      //     //element = document.getElementById(delay);
      //     //element.remove();
      //   }, delay * delayExponent);
      new Sound(ding4, volume, delay);
      array.push(delay);
    } else {
      //   setTimeout(() => {
      //     const dongSound = new Sound(tick1, volume, delay);
      //     dongSound.play();
      //     //element = document.getElementById(delay);
      //   }, delay * delayExponent);
      new Sound(ding, volume, delay);
      array.push(delay);
    }
    // setTimeout(() => {
    //   element = document.getElementById(delay);
    //   element.remove();
    // }, delay * delayExponent * 2);
    delay += 100;
  });

  console.log("ARRAY AUDIO: ", array);

  array.forEach(arr => {
    setTimeout(() => {
      const sound = document.getElementById(arr);
      console.log("ARR AUDIO: ", sound);
      sound.play();
    }, arr * delayExponent);
  });

  setTimeout(() => {
    array.forEach(arr => {
      var x = document.getElementById(arr);
      x.remove();
    });
  }, 2500 * delayExponent);
}

function Sound(src, volume, delay) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  //this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.setAttribute("id", delay);
  this.sound.setAttribute("class", "audio");
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
