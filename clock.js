const showClock = () => {
  let time, hr, min, sec, currTime, pm_am;
  time = new Date();
  hr = time.getHours();
  min = time.getMinutes();
  sec = time.getSeconds();

  pm_am = hr >= 12 ? "PM" : "AM";
  hr %= 12; // 12modulo12 = 0
  hr = hr ? hr : 12; // 0 should be 12
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  currTime = hr + ":" + min + ":" + sec;

  document.querySelector(".js-clock").textContent = currTime;
  document.querySelector(".js-pm_am").textContent = pm_am;

  setTimeout(showClock, 1000);
};
document.addEventListener("DOMContentLoaded", showClock);
