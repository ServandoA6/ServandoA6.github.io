var osc, env, mod, modFreq, modDepth, octplus, octminus, selosc, selmod, slider, slideramp, piano, guitar, violin, radio, type;
var freq = 220;
var modMaxFreq = 112;
var modMinFreq = 0;
var modMaxDepth = 150;
var modMinDepth = -150;
var octave = 1;
var number = 0;

function preload(){
    
    soundFormats('mp3', 'wav');
    piano = loadSound("piano.mp3");
    guitar = loadSound("guitar.wav");
    violin = loadSound("violin.wav");

}

function setup(){
    
    //audio
    piano.setVolume(10);
    guitar.setVolume(0.9);
    violin.setVolume(0.9);

    //mod
    createCanvas(1000, 500);
    background(0);

    textAlign(CENTER);
    selosc = createSelect();
    selosc.position(20, 100);
    selosc.size(130);
    selosc.option('sawtooth');
    selosc.option('sine');
    selosc.option('square');
    selosc.option('triangle');
    selosc.changed(selOsc);

    selmod = createSelect();
    selmod.position(20, 120);
    selmod.size(130);
    selmod.option('sawtooth');
    selmod.option('sine');
    selmod.option('square');
    selmod.option('triangle');
    selmod.changed(selMod);

    selaudio = createSelect();
    selaudio.position(500, 20);
    selaudio.size(130);
    selaudio.option('piano');
    selaudio.option('guitar');
    selaudio.option('violin');
    selaudio.changed(selAudio);

    radio = createRadio();
    radio.option('FM');
    radio.option('Sample');
    radio.style('width', '60px');
    fill(255, 0, 0);
    
    octplus = createButton('+');
    octplus.size(60, 60);
    octplus.position(90, 20);
    octplus.mousePressed(octavePlus);
      
    octminus = createButton('-');
    octminus.size(60, 60);
    octminus.position(20, 20);
    octminus.mousePressed(octaveMinus);

    slider = createSlider(100, 1000, 550);
    slider.position(20, 140);
    slider.style('width', '80px');

    slideramp = createSlider(0, 250, 125);
    slideramp.position(20, 160);
    slideramp.style('width', '80px');
    
    //sound
    osc = new p5.Oscillator();
    osc.freq(freq);
    osc.amp(0);
    osc.start();

    mod = new p5.Oscillator('sine');
    mod.amp(100);
    mod.start();
    
    mod.disconnect();

    osc.freq(mod);

    env = new p5.Env();
    env.setADSR(0.001, 0.5, 0.5, 0.5);
    env.setRange(1, 0);


}

function draw() {
 
     var valm = slider.value();
     mod.freq(valm);

     var vala = slideramp.value();
     mod.amp(vala);

     type = radio.value();
     console.log(type);
 }

function selOsc() {

    var itemosc = selosc.value();
    osc.setType(itemosc);

}

function selMod() {
    
    var itemmod = selmod.value();
    mod.setType(itemmod);

}

function selAudio() {
    
    var itemaudio = selaudio.value();
    console.log(itemaudio);

    if(itemaudio == 'piano') {
        number = 0;
    }
    else if (itemaudio == 'guitar') {
        number = 1;
    }
    else if (itemaudio == 'violin') {
        number = 2;
    }

}

function octavePlus() {
    if (octave < 2){
      octave ++;
    }
    console.log(octave);
  }
  
  function octaveMinus() {
    if (octave > 0){
      octave --;
    }
    console.log(octave);
  }

function keyPressed(){
    console.log("You pressed the " + key + " key");

    var midi = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72];
    var rate = [1, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 2];

    
    if (type == 'FM') {

        switch(octave) {  
            case 0 : midi = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
            break;
            case 1 : midi = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72];
            break;
            case 2 : midi = [72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84];
            break; 
        }

        var freq = 0;
        var note = " ";

        switch(key){
            case 'Q' : freq = midiToFreq(midi[0]), note = "C";
            break;
            case '2' : freq = midiToFreq(midi[1]), note = "C#";
            break;
            case 'W' : freq = midiToFreq(midi[2]), note = "D";
            break;
            case '3' : freq = midiToFreq(midi[3]), note = "D#";
            break;
            case 'E' : freq = midiToFreq(midi[4]), note = "E";
            break;
            case 'R' : freq = midiToFreq(midi[5]), note = "F";
            break;
            case '5' : freq = midiToFreq(midi[6]), note = "F#";
            break;
            case 'T' : freq = midiToFreq(midi[7]), note = "G";
            break;
            case '6' : freq = midiToFreq(midi[8]), note = "G#";
            break;
            case 'Y' : freq = midiToFreq(midi[9]), note = "A";
            break;
            case '7' : freq = midiToFreq(midi[10]), note = "A#";
            break;
            case 'U' : freq = midiToFreq(midi[11]), note = "B";
            break;
            case 'I' : freq = midiToFreq(midi[12]), note = "C";
            break;
        }

        osc.freq(freq);
        //env.play(osc, 0, 0.1);
        env.triggerAttack(osc);

    }

    if (type == 'Sample') {

        switch(octave) {  
            case 0 : rate = [1, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 2];
            break;
            case 1 : rate = [2, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 3];
            break;
            case 2 : rate = [3, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 4];
            break; 
        }

        switch(key){
            case 'Q' : piano.rate(rate[0]), guitar.rate(rate[0]), violin.rate(rate[0]), note = "C";
            break;
            case '2' : piano.rate(rate[1]), guitar.rate(rate[1]), violin.rate(rate[1]), note = "C#";
            break;
            case 'W' : piano.rate(rate[2]), guitar.rate(rate[2]), violin.rate(rate[2]), note = "D";
            break;
            case '3' : piano.rate(rate[3]), guitar.rate(rate[3]), violin.rate(rate[3]), note = "D#";
            break;
            case 'E' : piano.rate(rate[4]), guitar.rate(rate[4]), violin.rate(rate[4]), note = "E";
            break;
            case 'R' : piano.rate(rate[5]), guitar.rate(rate[5]), violin.rate(rate[5]), note = "F";
            break;
            case '5' : piano.rate(rate[6]), guitar.rate(rate[6]), violin.rate(rate[6]), note = "F#";
            break;
            case 'T' : piano.rate(rate[7]), guitar.rate(rate[7]), violin.rate(rate[7]), note = "G";
            break;
            case '6' : piano.rate(rate[8]), guitar.rate(rate[8]), violin.rate(rate[8]), note = "G#";
            break;
            case 'Y' : piano.rate(rate[9]), guitar.rate(rate[9]), violin.rate(rate[9]), note = "A";
            break;
            case '7' : piano.rate(rate[10]), guitar.rate(rate[10]), violin.rate(rate[10]), note = "A#";
            break;
            case 'U' : piano.rate(rate[11]), guitar.rate(rate[11]), violin.rate(rate[11]), note = "B";
            break;
            case 'I' : piano.rate(rate[12]), guitar.rate(rate[12]), violin.rate(rate[12]), note = "C";
            break;
        }

        switch (number) {
            case 0 : piano.play();
            break;
            case 1 : guitar.play();
            break;
            case 2 : violin.play();
            break;
        }
    }

}

function keyReleased(){

    env.triggerRelease(osc)

    osc.amp(0);
    
}