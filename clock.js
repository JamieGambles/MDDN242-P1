/*
 * use p5.js to draw a clock on a 960x500 canvas
 */
function draw_clock(obj) {
  // draw your own clock here based on the values of obj:
  //    obj.hours goes from 0-23
  //    obj.minutes goes from 0-59
  //    obj.seconds goes from 0-59
  //    obj.millis goes from 0-999
  //    obj.seconds_until_alarm is:
  //        < 0 if no alarm is set
  //        = 0 if the alarm is currently going off
  //        > 0 --> the number of seconds until alarm should go off

  // Sets the colourmode to RGB to be used in lerpColour
  colorMode(RGB);

  // Creates smooth movement for the respective times (Help with code from Clock_bars.js)
  let secondsWithFraction = obj.seconds + (obj.millis / 1000.0);
  let minutesWithFraction = obj.minutes + (obj.seconds / 60.0);
  let hoursWithFraction = obj.hours + (obj.minutes / 60.0);

  // Maps respective times to be the correct range and splits Hour values into AM and PM to make a 12 Hour Clock
  let SECpos = map(secondsWithFraction, 0, 60, 0, width);
  let MINpos = map(minutesWithFraction, 0, 60, 0, width);
  let HRposMorning = map(hoursWithFraction, 0, 12, 0, width);
  let HRposNight = map(hoursWithFraction, 12, 24, 0, width);

  // Rounds the Alarm countdown to whole numbers in order to check for even numbers by dividing by 2 and checking the remainder is 0
  let pulseTimer = round(obj.seconds_until_alarm);

  // Maps Hours to be used as the inter value in the lerpColour lines that determine the background background gradient, is mapped to 2 instead of one so that it is in time with a 12 Hour Clock
  let timescale = map(hoursWithFraction, 0, 60, 0, 2);

  // Defines the two colours to gradiate between depending on whether it is AM or PM
  let NightTop = color(21, 9, 59);
  let NightBot = color(0);
  let DayTop = color(123, 168, 219);
  let DayBot = color(255);

  // Makes the two top and bottom colours gradiate from each other as the Hour changes
  let AMTop = lerpColor(NightBot, DayTop, timescale);
  let AMBot = lerpColor(NightTop, DayBot, timescale);
  let PMTop = lerpColor(DayBot, NightTop, timescale);
  let PMBot = lerpColor(DayTop, NightBot, timescale);

  // There are duplicate values in these arrays so that each wave can be changed individually, 1st numbers are for seconds, 2nd are for minutes, 3rd are for hours, and 4th are for alarm with the exception of periodval as hours needs an AM and PM value

  // sets the value for 1 period of the wave
  let periodVal = [(SECpos / width * (TWO_PI)), (MINpos / width * (TWO_PI)), (HRposMorning / width * (TWO_PI)), (HRposNight / width * (TWO_PI))];

  // Defines how many waves are needed to cross the width of the canvas, this is 1/2 of time (60 for seconds and minutes, and 12 for hours) as I count each 'peak' as 1 second, where a full wave has 2 peaks
  let period = [30, 30, 6];

  // Defines how many ellipses make up the wave (smaller number = move ellipses)
  let resolution = [1, .25, 2];

  // Defines the height of each Wave
  let waveAmp = [height / 40, height / 10, height / 5, height / 4];

  // Defines where the centre vertical position of each wave is
  let ypos = [height / 2, height / 2, height / 2, height / 2];

  // Defines the radius of an ellipse for each wave
  let dotrad = [2, 2, 5, 5];

  // Defines how much the radius of an ellipse in a given wave decreases by for each increment of parallaxing
  let dotradIncr = [4, 4, 2, 2];

  // Defines how many parallaxed Waves are drawn
  let paraAmm = [8, 8, 8, 8];

  // Defines the ammount that each parallaxed Wave increases by
  let paraIncr = [2, 2, 1, 50];

  // Multiplier for Alarm parallax effect
  let paraMult = 10;

  // Sets the starting value of the Alarm Wave amplitude to 0
  let alarmAmp = 0.0;

  // Changes the background gradient based on whether it's AM or PM
  if (obj.hours < 12) {
    setGradientAM(AMTop, AMBot);
  } else {
    setGradientPM(PMTop, PMBot);
  }

  // Draws the gradient between the current top and bottom colour in the AM (Help with code from https://editor.p5js.org/REAS/sketches/S1TNUPzim)
  function setGradientAM(AMTop, AMBot) {
    for (var y = 0; y < height; y++) {
      let inter = map(y, 0, height, 0, 1);
      let strokeCol = lerpColor(AMTop, AMBot, inter);
      stroke(strokeCol);
      line(0, y, width, y);
    }
  }

  // Draws the gradient between the current top and bottom colour in the PM (Help with code from https://editor.p5js.org/REAS/sketches/S1TNUPzim)
  function setGradientPM(PMTop, PMBot) {
    for (var y = 0; y < height; y++) {
      let inter = map(y, 0, height, 0, 1);
      let strokeCol = lerpColor(PMBot, PMTop, inter);
      stroke(strokeCol);
      line(0, y, width, y);
    }
  }

  // Draws the 3, 6, and 9 Hour lines at each quarter across the page
  noFill();
  stroke(255, 0, 0);

  for (var i = 0; i < 3; i++) {
    line(width * (i + 1) / 4, height, width * (i + 1) / 4, 0);
  }

  noStroke();

  // Draws the movement of one ellipse in the Alarm Wave
  function draw_Alarm(obj) {

    // Sets fill to red
    fill(255, 0, 0);

    // Resets and hides the alarm whenever the its not going off (I still draw the alarm even when it's not going off so that it can reset, this is mostly so that the alarm works in debug mode and doesn't need to be refreshed evertime)
    if (!obj.seconds_until_alarm == 0) {
      fill(0, 0, 0, 0);
      alarmTimer = 0;
    }

    // Ammount that alarmTimer increases by for each frame, it's a small number so that the effect is slow
    alarmTimer += .001;

    // Ammount that alarmAmp increases by each frame so that it completes 1/2 a revolution in the time it takes for the wave to travel the width of the canvas
    alarmAmp += ((TWO_PI) / width) * 1.5;

    // Loops the range for movement across the width of the canvas
    for (var i = 0; i < width; i++) {

      // Creates a 'range of movement' where if alarmtimer is outside of a given parameter, the alarm waves amplitude will stay at 0
      if (alarmTimer > waveStart && alarmTimer < waveEnd) {

        // If the ellipse is in the correct range for movement, then change y position based on its position across the width of the screen
        alarmyPos = alarmTimer * ((i + 1000) / 50);
      } else {

        // Prevents ellipses outside the range for movement from moving
        alarmyPos = 0;
      }
    }

    // Draws each parallaxed Wave
    for (var i = 0; i < paraAmm[3]; i++) {

      //Draws the position of a single ellipse
      ellipse(alarmxPos - i / paraIncr[3] * (alarmxPos - width / 2), (ypos[3] - sin(alarmyPos) * sin(alarmAmp) * (waveAmp[3] * (paraMult - i) / paraMult)), dotrad[3] - i / dotradIncr[3]);
    }
  }

  // Draws the Seconds Wave
  function draw_SEC(obj) {

    // Sets fill to yellow
    fill(255, 255, 0);

    // Defines movement of the Wave when Second_until_alarm is an even number, by checking if the remainder is 0 when divided by 2 (Creates the alarm countdown effect)
    if (pulseTimer % 2 == 0) {

      // Sets fill to red
      fill(255, 0, 0);

      // Sets Wave to stretch across the width of the canvas
      SECpos = width;
      periodVal[0] = TWO_PI;

      // Makes amplitude decrease to 0 over the span of Seconds_until_alarm
      waveAmp[0] = (waveAmp[0]) * (obj.seconds_until_alarm / 20);
    }

    // Draws each parallaxed Wave
    for (var j = 0; j < paraAmm[0]; j++) {

      // Draws each ellipse up until the current time
      for (var i = 0; i < SECpos; i += resolution[0]) {

        //Draws the position of a single ellipse (I chose to use cosine waves instead of sine waves for the clock waves so that each wave would start at a 'peak' making the time easier to read)
        ellipse(i - ((j / paraIncr[0]) * (i - (width / 2)) / 100), cos(i * periodVal[0] / SECpos * period[0]) * waveAmp[0] + ypos[0], dotrad[0] - (j / dotradIncr[0]));
      }
    }
  }

  // Draws the Minutes Wave
  function draw_MIN(obj) {

    // Sets fill to green
    fill(0, 255, 0);

    // Defines movement of the Wave when Second_until_alarm is an even number, by checking if the remainder is 0 when divided by 2 (Creates the alarm countdown effect)
    if (pulseTimer % 2 == 0) {

      // Sets fill to red
      fill(255, 0, 0);

      // Sets Wave to stretch across the width of the canvas
      MINpos = width;
      periodVal[1] = TWO_PI;

      // Makes amplitude decrease to 0 over the span of Seconds_until_alarm
      waveAmp[1] = (waveAmp[1]) * (obj.seconds_until_alarm / 20);
    }

    // Creates ticking effect by checking if the remainder is 0 when divided by 2
    if (obj.seconds % 2 == 0) {

      // Decreases parallaxing ammount
      paraAmm[1] = paraAmm[1] - 4;
      dotradIncr[1] = dotradIncr[1] - 2;
    }

    // Draws each parallaxed Wave
    for (var j = 0; j < paraAmm[1]; j++) {

      // Draws each ellipse up until the current time
      for (var i = 0; i < MINpos; i += resolution[1]) {

        //Draw the position of a single ellipse
        ellipse(i - ((j / paraIncr[1]) * (i - (width / 2)) / 100), cos(i * periodVal[1] / MINpos * period[1]) * waveAmp[1] + ypos[1], dotrad[1] - (j / dotradIncr[1]));
      }
    }
  }

  // Draws the Hours Wave
  function draw_HR(obj) {

    // Sets fill to red
    fill(255, 0, 0);

    // Checks if it is AM
    if (obj.hours < 12) {

      // Defines movement of the Wave when Second_until_alarm is an even number, by checking if the remainder is 0 when divided by 2 (Creates the alarm countdown effect)
      if (pulseTimer % 2 == 0) {

        // Sets Wave to stretch across the width of the canvas
        HRposMorning = width
        periodVal[2] = TWO_PI;

        // Makes amplitude decrease to 0 over the span of Seconds_until_alarm
        waveAmp[2] = (waveAmp[2]) * (obj.seconds_until_alarm / 20);
      }

      // Draws each parallaxed Wave
      for (var j = 0; j < paraAmm[2]; j++) {

        // Draws each ellipse up until the current time
        for (var i = 0; i < HRposMorning; i += resolution[2]) {

          //Draw the position of a single ellipse
          ellipse(i - ((j / paraIncr[2]) * (i - (width / 2)) / 100), cos(i * periodVal[2] / HRposMorning * period[2]) * waveAmp[2] + ypos[2], dotrad[2] - (j / dotradIncr[2]));
        }
      }

      // Checks if it is PM
    } else if (obj.hours >= 12) {

      // Defines movement of Wave when Second_until_alarm is an even number
      if (pulseTimer % 2 == 0) {

        // Sets Wave to stretch across the width of the canvas
        HRposNight = width;
        periodVal[3] = TWO_PI;

        // Makes amplitude decrease to 0 over the span of Seconds_until_alarm
        waveAmp[2] = (waveAmp[2]) * (obj.seconds_until_alarm / 20);
      }

      // Draws each parallaxed Wave
      for (var j = 0; j < paraAmm[2]; j++) {

        // Draws each ellipse up until the current time
        for (var i = 0; i < HRposNight; i += resolution[2]) {

          //Draw the position of a single ellipse
          ellipse(i - ((j / paraIncr[2]) * (i - (width / 2)) / 100), cos(i * periodVal[3] / HRposNight * period[2]) * waveAmp[2] + ypos[2], dotrad[2] - (j / dotradIncr[2]));
        }
      }
    }
  }

  // Draws all waves unless alarm is currently going off
  if (!obj.seconds_until_alarm == 0) {
    draw_HR(obj);
    draw_MIN(obj);
    draw_SEC(obj);
  }

  // Draws each ellipse of the alarm wave across the page
  for (var j = 0; j < width; j++) {

    // Defines how many ellipses are drawn to cross the span of the wave
    let resolution = 3;

    // Defines how fast the range for movement moves across the screen (waveSpeed needs to be equel to the speed that each ellipse moves vertically when starting at the centre, this is so that each end of the wave always appears 'attached' to the rest of the ellipses that are stationery)
    let waveSpeed = 2.29;

    // Sets the distance between ellipse
    alarmxPos = resolution * j;

    // Sets the starting value for the range of movement and how fast it moves across the page (The distance between waveStart and waveEnd needs to be equel to one full revolution of the wave at the set resolution)
    waveStart = 36 + (j / waveSpeed);

    // Sets the end value for the range of movement and how fast it moves across the page
    waveEnd = 105.5 + (j / waveSpeed);

    // Draws the alarm
    draw_Alarm(obj);
  }

  frameRate(120);
}
