function draw_clock(obj) {

  // Clock design Progress

  background(0); // Black

  // Recreating Maeda Clock

  translate(480, 250);

  // Defines Pixel used for Hours Digits
  function draw_HourPixel(x, y) {

    var lrgouter = 12.5
    var lrginner = 5
    var smlouter = 7.5
    var smlinner = 2

    noStroke()
    fill(255, 17, 0); // Red
    beginShape();
    vertex(x - lrgouter, y + lrginner);
    vertex(x - lrginner, y + lrgouter);
    vertex(x + lrginner, y + lrgouter);
    vertex(x + lrgouter, y + lrginner);
    vertex(x + lrgouter, y - lrginner);
    vertex(x + lrginner, y - lrgouter);
    vertex(x - lrginner, y - lrgouter);
    vertex(x - lrgouter, y - lrginner);
    endShape(CLOSE);
    fill(0); // Black
    beginShape();
    vertex(x - smlouter, y + smlinner);
    vertex(x - smlinner, y + smlouter);
    vertex(x + smlinner, y + smlouter);
    vertex(x + smlouter, y + smlinner);
    vertex(x + smlouter, y - smlinner);
    vertex(x + smlinner, y - smlouter);
    vertex(x - smlinner, y - smlouter);
    vertex(x - smlouter, y - smlinner);
    endShape(CLOSE);
  }
  // Defines Pixel used for Minutes Digits
  function draw_MinPixel(x, y) {

    var lrgouter = 10
    var lrginner = 5
    var smlinner = 3

    noStroke()
    fill(255, 255, 0); // Yellow
    beginShape();
    vertex(x - lrgouter, y + lrginner);
    vertex(x - lrginner, y + lrgouter);
    vertex(x + lrginner, y + lrgouter);
    vertex(x + lrgouter, y + lrginner);
    vertex(x + lrgouter, y - lrginner);
    vertex(x + lrginner, y - lrgouter);
    vertex(x - lrginner, y - lrgouter);
    vertex(x - lrgouter, y - lrginner);
    endShape(CLOSE);
    fill(0); // Black
    beginShape();
    vertex(x - smlinner, y + smlinner);
    vertex(x + smlinner, y + smlinner);
    vertex(x + smlinner, y - smlinner);
    vertex(x - smlinner, y - smlinner);
    endShape(CLOSE);
  }

  // Defines Pixel used for Seconds Digits
  function draw_SecPixel(x, y) {

    var smlouter = 7.5
    var smlinner = 2

    noStroke()
    fill(0, 0, 255); // Blue
    beginShape();
    vertex(x - smlouter, y + smlinner);
    vertex(x - smlinner, y + smlouter);
    vertex(x + smlinner, y + smlouter);
    vertex(x + smlouter, y + smlinner);
    vertex(x + smlouter, y - smlinner);
    vertex(x + smlinner, y - smlouter);
    vertex(x - smlinner, y - smlouter);
    vertex(x - smlouter, y - smlinner);
    endShape(CLOSE);
  }

  // Calls pixels used for Hours Digits
  draw_HourPixel(25, 25);
  draw_HourPixel(25, 0);
  draw_HourPixel(25, -25);
  draw_HourPixel(25, -50);
  draw_HourPixel(25, -75);
  draw_HourPixel(0, -50);
  draw_HourPixel(-25, -25);
  draw_HourPixel(-50, 0);
  draw_HourPixel(-50, 25);
  draw_HourPixel(-25, 25);
  draw_HourPixel(50, 25);
  draw_HourPixel(25, 50);
  draw_HourPixel(25, 75);
  draw_HourPixel(0, 25);

  // Calls pixels used for Minutes Digits
  draw_MinPixel(-50, 25);
  draw_MinPixel(-25, 25);
  draw_MinPixel(-50, 50);
  draw_MinPixel(-50, 75);
  draw_MinPixel(-50, 0);
  draw_MinPixel(-50, -25);
  draw_MinPixel(-50, -50);
  draw_MinPixel(-50, -75);
  draw_MinPixel(-75, -50);
  draw_MinPixel(-100, -25);
  draw_MinPixel(-125, 0);
  draw_MinPixel(-125, 25);
  draw_MinPixel(-100, 25);
  draw_MinPixel(-75, 25);
  draw_MinPixel(50, 75);
  draw_MinPixel(75, 75);
  draw_MinPixel(100, 75);
  draw_MinPixel(125, 50);
  draw_MinPixel(125, 25);
  draw_MinPixel(100, 0);
  draw_MinPixel(75, 0);
  draw_MinPixel(50, 0);
  draw_MinPixel(25, 25);
  draw_MinPixel(25, 50);
  draw_MinPixel(25, -25);
  draw_MinPixel(25, -50);
  draw_MinPixel(50, -75);
  draw_MinPixel(75, -75);
  draw_MinPixel(100, -75);
  draw_MinPixel(125, -50);
  draw_MinPixel(125, -25);

  // Calls pixels used for Seconds Digits
  draw_SecPixel(-50, -75);
  draw_SecPixel(-75, -50);
  draw_SecPixel(-50, -50);
  draw_SecPixel(-50, -25);
  draw_SecPixel(-50, 0);
  draw_SecPixel(-50, 25);
  draw_SecPixel(-50, 50);
  draw_SecPixel(-50, 75);
  draw_SecPixel(125, -75);
  draw_SecPixel(100, -75);
  draw_SecPixel(75, -75);
  draw_SecPixel(50, -75);
  draw_SecPixel(25, -75);
  draw_SecPixel(25, -50);
  draw_SecPixel(25, -25);
  draw_SecPixel(25, 0);
  draw_SecPixel(50, 0);
  draw_SecPixel(75, 0);
  draw_SecPixel(100, 0);
  draw_SecPixel(125, 25);
  draw_SecPixel(125, 50);
  draw_SecPixel(100, 75);
  draw_SecPixel(75, 75);
  draw_SecPixel(50, 75);
  draw_SecPixel(25, 50);
}

/*
 * use p5.js to draw a clock on a 960x500 canvas
 */
