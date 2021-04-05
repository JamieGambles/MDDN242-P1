PS1 MDDN 242 2020
THIS IS YOUR README
Update this file as you go along to record your progress.

My clock is quite intensive and I've noticed that if I run it through my laptop it can slow down a fair bit, especially in the alarm countdown, and alarm itself.

Reading my clock

The yellow wave shows seconds, where every 'peak' and every 'trough' is a second, there are 60 waves in the line, so it crosses the page in a minute
The green wave shows minutes, where every 'peak' and every 'trough' is a minute, there are 60 waves in the line, so it crosses the page in an hour
The red wave shows hours, where every 'peak' and every 'trough' is an hour, there are 12 waves in the line, so it crosses the page twice in a day
The 3 red lines in the background are placed at each quarter of the page, this makes it easy to tell the time at a glance, without counting each wave
The background changes accordingly to the time of day, so if the hour wave is full and the background is dark then its midnight, and if it is light then it is midday
Overall I'm really happy with my clock, I think I turned my somewhat simple idea at the beginning into something really interesting, and that it show time in a unique and abstract way, while still being readable. I followed through with one of my goals of not using any numbers or words in my clock, as well as not using circles as I really wanted to stray away from conventional clock appearances and movement. I don't think my clock is the prettiest, but I like the 'informative' appearance that I get from it due to to the red green and yellow. Because these colours are very bright I decided to the keep the background quite muted, where it uses a very slight vertical gradient, and then also changes over time to represent the time of day. My idea for the alarm was that personally I find alarms incredibly jarring so I'm always trying to find the most soothing sounding alarm I can find, in my clock I chose to have the countdown itself be very jarring and obnoxious by constantly switching between the time, and all of the waves turning red and slowly decreasing into a line. I then wanted to have a pause as a kind of 'what now' moment before the alarm goes off, and then I have the line follow a 'mexican wave' styled movement in a gentle and magnificent sine wave that slowly moves across the page. For this wave I chose to use both x and y parallax so it really shows off the movement, and all of the math that goes into it.

README here

02/03/20
this is a test

04/03/20
this is another test

04/03/20
Thought that commit messages were the same as readme and was confused as to why they weren't showing up

04/03/20
The past couple of pushes have just been correcting size of sketch, and manually adding thumbnail and preview images

04/03/20
My idea for the clock as of now is that I will use Sine Waves that slowly progress across the span of the page, there will be 3, each representing hours, minutes and seconds respectively, the hour line will have 12 waves, the minutes will have 60, and the seconds will be just a line. You will be able to read the time by looking at how far across each sine wave is across the page, kind of like an anologue clock, but horizontally.

04/03/20
Added better formatting to readme

04/03/20
With a lot of help I've added a sine wave that draws across the screen in 12 waves, this is the basis of my 'hour line'. My next goal for this is to add an if statement that will make the line repeat itself once it reaches the end of the screen

04/03/20
Made thumbnails and previews for new clock

08/03/20
Replicated the 2nd Maeda Clock, and generated new thumbnail and preview images. My process for making this clock was creatingt 3 seperate functions which each defined the appearance of the 'pixels' that made up the hours, seconds, and minutes numbers. I then called each of the functions at different x and y coords in multiples of 25 (the size of each pixel) so that they spelt each number out.

09/03/20
Moved my first attempts on my clock design over to Clock.js and then worked on making the sine wave for minutes (was easier to see if things were actually working, as opposed to when I was making the hour wave) I managed to make it complete a full cycle in 60 seconds, with 60 waves showing each second. I also used the smooth seconds variable from Clock_Bars.js to make the movement a lot smoother. The only way Ive been able to get the wave to leave its 'trail' behind is if I dont use a background colour, of course im going to want to change that later on, so that it can have the trail, but also reset completely on a full cycle. Once I complete one wave it should be very easy to create the other ones

11/03/20
With some more help I managed to get a basic version of my minute line working. I used a for loop to make the sine wave draw each ellipse of the cycle, and then reset once reaching the end. Each peak of the line is one second, I'm thinking of adding a grid of somesort in the background to add clarity. Another thing I did was seperate my function out into its core parts, and now have variables for the waves period, resolution(the number of dots being drawn), amplitude, y position, and radius of each dot. This will make it easy to use my existing code for the other two lines that need to be drawn.

15/03/20
Even though Im not 100% happy with hour the line works and looks, I went ahead and made the code that draws the wave into a function, then copy and pasted it twice in order to create the hour and seconds line. I then edited the 'pos' variable for each line to smooth movement, and changed a few of the variables and colour to seperate out the lines. I also switched fro sine waves to cosine waves as they line up nicer and make it more clear that each line starts at a '0' point.

16/03/20
Found a big issue in that my clock didnt tell the time accurately, for some reason each hour increment was moving greater than one wave, this meant that at the beginning it looked okay, then towards the end of the line it was skewed. I fixed this by changing the time maps from 0-23 and 0-59 to 0-24 and 0-60, I dont know why this works but it fixed it. I also decided for readability-sake to change to a 12 hour clock format with a background colour change to represet am/pm, and then added a red line every 1/4 of the page to make quickly reading the time easier. Future plans are to make it look more interesting and and work on the colours to give a specific theme

18/03/20
In order to make my clock more visually interesting I added parallaxing to each of the lines which was a struggle, I did this by nesting the for loop that draws each line within another for loop. where it is bound by how many increments of parallaxing I want, I then used those values as variables to alter the line that is parallaxed, so far I have done distance from the first line, and dot radius, I want to also look at opacity, vertical parallaxing, and colour maybe could be cool to add some fluctuating animation for the lines as aside from the seconds line my clock is quite still stationery. Also my colours really suck, im just using rgb for my sake but I need to find a nice palette.

12/04/20
Doing a quick readme update to test that I can push to git from my home computer

17/04/20
first real update in a hot minute. I'm adding the final touches to the clock before I begin working on the alarm. I felt that my current clock was too stationery as only the 'seconds' wave was very visibly moving, I added an if statement that checks if the seconds are an even or odd number by dividing the number by two, and then checking if the remainder is 0 (if its 0 then it is an even number, if not then its odd.) I used this website https://www.tutorialsmade.com/javascript-find-odd-even-number/ to figure this out, I then used this counter to make the parallax effect on the minute wave, pulse in size to this. This in effect creating a nice ticking feel to my clock, my original plan was to have this movement on all of the waves, however after looking at it I think that would clutter it unessecarily, and it makes more sense for just the minute line to tick. Another change that I made was using lerpcolor on the background to create a gradient, and then using lerpcolor again to make that gradient fluctuate according to the time of day. This effect came out really nice in the end, however I still might tweak the colours a little more. I used this example of a lerpcolor gradient https://editor.p5js.org/REAS/sketches/S1TNUPzim to first create the background.
My plans for the alarm system to have the amplitude of each wave slowly decrease over duration of the 'countdown' part, until there is just one line in the centre of the clock, then when the alarm is going off, that line will pulsate outwards in another sine wave in short bursts.

20/04/20
Started working on my alarm function, I've made each lines amplitude decrease exponentially to 0 as the timer for the alarm counts down, next I need to make each wave transparent, and then redraw a new wave which will pulsate periodically while the alarm is going off

21/04/20
did some touching up to the alarm countdown, now all of the waves turn red, the parallax pulses on all the waves, all of the waves progress to the end of the screen, and I also fixed this issues where when the alarm countdown started, there was a noticible step down in size for each of the waves because of the way that I had implented the movement of each wave.

23/04/20
More countdown stuffs, changed up the alarm countdown a fair bit, now as it counts down it flashes in and out of the alarm state so that you can still see the time, I also changed movement of each wave back to being linear this is so that the movement is more clear in each pulse. I started working on the alarm itself however am really struggling because I can't seem to find a good variable to tie the movement of the wave to. The original plan was to use framecount however I am running into the issue that when I toggle between alarm state and not, the framecount doesnt reset, meaning that the wave doesnt always start at a 0 state, which makes the movement look really janky. This is the same with tying it to any of the clock counters, as the 0 state for the alarm is relative to when the countdown starts.

25/04/20
Progressed more with the actual alarm itself, really struggled to get this to work as I couldn't use the clock timers as the I needed the movement to start exactly as countdown finishes. Once I had the timings figured out I started to work on the sine wave that acts as the alarm, this is about where I got up to but I've run into the issue where I need each circle to fire at a different time and then stop at a set time so that it all links up. However using a for statement I haven't been able to get this to work.

26/04/20
after a lot of stressing over finicky code I've managed to get a rough alarm that looks like what I imagined. I really wanted to make a mexican wave styled sine wave, that moves across the screen. This proved really challenged as all of the sine wave tutorials I was watching would have all of the points already moving from the start, where I needed all of my points to start at 0, and then only move when inside the 'wave' as it moves across the line. I'm sure there is a really elegant way of achieving this effect, but I managed to get something similar done with just guess and check math. I want to work on this further, as at the moment the wave is too short and moves too slowly across the screen.

27/04/20
polished up the alarm wave A LOT it is now wider and moves slower, has both x and y parallax, and its amplitude is based on a sine wave as well, so when it is building up it increases, then decreases back down to 0 by the time it has crossed the page. The only thing left really I think is play around with colours a little more, but I've been saying that throughout my entire readme and i've never changed them aside from using lerpcolour for the background so who knows. I'm definitely warming up to the red green yellow colours as they give a sense of 'infographic'ness to the clock, and makes it appear less abstract. Also need to figure out how to do the json stuff and how to change the html pathing to be correct.

27/04/20
Did the html thing where everything leads to where it should

28/04/20
Commented all of the code and tidied up some of the code

29/04/20
Final readme update for work on the main clock. I decided to further with tidying up my code by putting a lot of the variables that I used for each wave that were being repeated for each function into singular arrays. This helped simplify everything down a lot more, I also changed the alarm wave a little bit to move faster so that it would complete its movement in the time that the alarm goes off for, and I used a lower resolution (less ellipses) so that when the wave is at its max amplitude, you can see inbetween each ellipse a lot more easier which hopefully puts it closer in line to the look of the other waves I use.