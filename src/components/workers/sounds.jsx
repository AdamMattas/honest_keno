import soundA1 from "../../public/soundA_1.ogg";
import soundA2 from "../../public/soundA_2.ogg";
import soundA3 from "../../public/soundA_3.ogg";
import soundA4 from "../../public/soundA_4.ogg";
import win from "../../public/win.ogg";
import win2 from "../../public/win_2.ogg";
import win3 from "../../public/win_3.ogg";
import win4 from "../../public/win_4.ogg";
import winSlow from "../../public/win_slow.ogg";
import winFast from "../../public/win_fast.ogg";
import test from "../../public/test.ogg";
import testShort from "../../public/test_short.ogg";
import testShortInc from "../../public/test_short_increase.ogg";
import testInc from "../../public/test_increase.ogg";

export function playSounds(volume, random, hits, delayExponent) {
  let delay = 0;
  console.log("RANDOM LENGTH: ", random.length);
  let array = [];

  //let element;
  let toggle = false;
  random.forEach(rand => {
    if (hits.indexOf(rand) !== -1) {
      if (toggle) new Sound(soundA4, volume, delay);
      if (!toggle) new Sound(soundA3, volume, delay);
      toggle = toggle ? false : true;
      array.push(delay);
    } else {
      if (toggle) new Sound(soundA2, volume, delay);
      if (!toggle) new Sound(soundA1, volume, delay);

      toggle = toggle ? false : true;

      array.push(delay);
    }

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

export function playWinSound(volume) {
  const sound = new Sound(winFast, volume, "win");

  sound.play();
}

export default {
  playSounds,
  playWinSound
};
