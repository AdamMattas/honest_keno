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
import winFastShort from "../../public/win_fast_short.ogg";
import test from "../../public/test.ogg";
import testShort from "../../public/test_short.ogg";
import testShortInc from "../../public/test_short_increase.ogg";
import testInc from "../../public/test_increase.ogg";
import WinSound1 from "../../public/keno_win_1.ogg";
import WinSound2 from "../../public/keno_win_2.ogg";
import WinSound3 from "../../public/keno_win_3.ogg";
import WinSound4 from "../../public/keno_win_4.ogg";
import WinSound5 from "../../public/keno_win_5.ogg";
import WinSound6 from "../../public/keno_win_6.ogg";
import WinSound7 from "../../public/keno_win_7.ogg";
import WinSound8 from "../../public/keno_win_8.ogg";
import WinSound9 from "../../public/keno_win_9.ogg";
import WinSound10 from "../../public/keno_win_10.ogg";
import WinSound11 from "../../public/keno_win_11.ogg";
import WinSound12 from "../../public/keno_win_12.ogg";
import WinSound13 from "../../public/keno_win_13.ogg";
import WinSound14 from "../../public/keno_win_14.ogg";
import WinSound15 from "../../public/keno_win_15.ogg";
import WinSound16 from "../../public/keno_win_16.ogg";
import WinSound20 from "../../public/keno_win_20.ogg";
import WinSound100 from "../../public/keno_win_100.ogg";
import WinSound1000 from "../../public/keno_win_1000.ogg";

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

export function playWinSound(volume, winnings) {
  let soundArray = [
    WinSound1,
    WinSound2,
    WinSound3,
    WinSound4,
    WinSound5,
    WinSound6,
    WinSound7,
    WinSound8,
    WinSound9,
    WinSound10,
    WinSound11,
    WinSound12,
    WinSound13,
    WinSound14,
    WinSound15,
    WinSound16,
    WinSound20,
    WinSound100,
    WinSound1000
  ];
  let winSound = "";
  if (winnings < 17) winSound = soundArray[winnings - 1];
  if (winnings > 16 && winnings < 100) winSound = WinSound20;
  if (winnings > 99 && winnings < 1000) winSound = WinSound100;
  if (winnings > 999) winSound = WinSound1000;
  console.log("WINNINGS SOUND", winnings);
  const sound = new Sound(winSound, volume, "win");

  sound.play();
}

export default {
  playSounds,
  playWinSound
};
