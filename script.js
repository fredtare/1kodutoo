let h, m, s, minuteVal, hourVal, secondVal, dateElement, day, month, year;

h = document.getElementById('hours');
m = document.getElementById('minutes');
s = document.getElementById('seconds');
let binaryStyle = false;

//kuupäeva stiili asjad
dayElement = document.getElementById('day');
monthElement = document.getElementById('month');
yearElement = document.getElementById('year');
let months = [];
let monthNames = ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"];
let monthNamesOld = ["Näärikuu", "KüünlaKuu", "Paastukuu", "Jürikuu", "Lehekuu", "Jaanikuu", "Heinakuu", "Lõikuskuu", "Mihklikuu", "Viinakuu", "Talvekuu", "Jõulkuu"];
let oldDates = false;

//värvikompondendid
let r, g, b;
let colorLibrary = document.getElementById('colorLibrary');
let colorIndex = 0;
const colorArray = ["", "", "", "", "", ""];
let nightMode = true;
let customMode = false;

//mänguvärgid
let score = 0;
let target = document.getElementById("target");


//NO1 muudab suvalisi taustavärve ja kontrasteerib tekstivärvi.
function randomColor(){
    r = Math.ceil(Math.random()*255);
    g = Math.ceil(Math.random()*255);
    b = Math.ceil(Math.random()*255);
    changeColor()
}

//See funks võtab taustavärvi ja muudab sellega teised värvid.
//AI aitas avastada, et klassinime get annab sulle listi kõikide elementidega mis on samast klassist. Koodi AIlt ei kopinud kuna ei olnud vaja.
//AI prompt: "I want to change button style settings using javascript. This code below works for everything but the buttons, why is it so?"
function changeColor(){

    let tR = 255 - r,
    tG = 255 - g,
    tB = 255 - b;

    document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")"; //rgb(62, 62, 62)
    document.body.style.color = "rgb(" + tR + "," + tG + "," + tB +")";
    let buttons = document.querySelectorAll('.button');

    buttons.forEach((button) =>{
        button.style.backgroundColor = "rgba(" + tR + "," + tG + "," + tB + ", 0.5";
        button.style.color = "rgb(" + r + "," + g + "," + b + ")";
    });

}

function saveColors(){
//NO3 salvestab viimased 6 kasutatud värvi, et neid saaks taaskasutada.

    console.log(document.body.style.backgroundColor);
    colorArray[colorIndex] = document.body.style.backgroundColor;

    //osa funktsioonilõpuni on ai poolt genereeritud, kuna minu tehtud for loop ei toiminud ja ma ei saanud aru miks. Muudetud osaliselt.
    //prompt: "I want to save 6 last background colors and display them on buttons at the website. This is my code so far, why doesn't it work"
    let buttonsHTML = '';
    colorArray.forEach((color, index) => {

        buttonsHTML += `<button id="loadColorButton${index}" 
            class = saveButton
            style="background-color: ${color};"
            value="${color}">
            ${index + 1}
            </button>`;
    });

    // Update the color library with the new buttons
    colorLibrary.innerHTML = buttonsHTML;

    // Update the color index
    colorIndex = (colorIndex + 1) % 6;
    loadColors();
}

//Üritasin ise seda pikalt kirjutada aga sain aru, et probleem on selles, et ma ei saa loadColor
function loadColors() {

    // Add event listeners to all the color buttons
    colorArray.forEach((color, index) => {
        const button = document.getElementById(`loadColorButton${index}`);
        if (button) {
            button.addEventListener('click', () => {
                parseColors(color);
                console.log(color);
            });
        }
    });
}

//prompt: how can I parse colors from BackgroundColor?
//proovisin seda ise paar päeva teha stacki jms abiga aga ilmselt ei jõudnud kunagi minu koodi õige rgb väärtus sest mul oli "savecolors"
//alla pandud buttoni väärtuses hüüumargid koguaeg valesti. Palavikuvead.
function parseColors(color){

    var rgbValues = color.match(/\d+/g);

    r = parseInt(rgbValues[0], 10);
    g = parseInt(rgbValues[1], 10);
    b = parseInt(rgbValues[2], 10);

    console.log('parsecolors on R:', r, 'G:', g, 'B:', b);
    changeColor();
}

//See on värvisüsteemide pea aju. Aga kus on minu aju? 404, vot kus.
function modeSwitch(trigger){

    //kui toksiti custom nuppu
    if(trigger == 0){
        customMode = true;
        nightMode = false;
        randomColor();

        document.body.style.backgroundImage="none"
        console.log("Suvalised värvid aktiveeritud!")

    //kui näpp libises nightmode nupule
    }else if(trigger == 1){
        customMode = false;
        
        if(nightMode){
            customMode = false;
            nightMode = false;
    
            r = 15;
            g = 15;
            b = 25;

            document.body.style.backgroundImage="none";
            document.getElementById("image").style.background = "none";
            changeColor();
        }else{
            customMode = false;
            nightMode = true;
    
            r = 255;
            g = 255;
            b = 250;

            document.getElementById("image").style.background = "rgba(255, 255, 255, 0.838)";
            document.body.style.backgroundImage = "url(bg.jpg)";
            changeColor();
        };
    };

};

//mäng kus sa klikid kella ja see ilmub suvalises kohas ja iga klikk on +1 punkt.
//Ai aitas avastada pointereffectsi ja andis alternatiivse viisi sithmärki peita. Algselt ma ei saanud sihtmärki liikuma ja AI ütles, et tuleb 
// cssis panna display mode absolutiks. 
function targetGame(currentScore){
    //alustab mängu ja teeb kliki aktiivseks
    console.log("geimu startu!");
    target.style.pointerEvents = "auto";
    let scoreDisplay = document.getElementById("score");

    //kui alustad nullist resetib skoori
    if(currentScore == 0){
        score = 0;
    //kui klikid targetile tõuseb
    }else{
        score += currentScore;
    };
    scoreDisplay.style.opacity = 1;
    scoreDisplay.innerHTML = score;

    let x = Math.floor(Math.random() * 80 + 10),
        y = Math.floor(Math.random() * 80 + 10);
    
    target.style.left = x + "%";
    target.style.top = y + "%";

    target.style.opacity = 1;
    target.style.transition = "opacity 0.3s";

    setTimeout(() => {
        target.style.opacity = 0;
        target.style.pointerEvents = "none";
    }, 1700)

    setTimeout(() =>{
        scoreDisplay.style.opacity = 0;
    }, 5000)
    console.log(score);

};

function binaryClock(){
//no6 muudab kella binaarkellaks. Kaalu ka tavalise kella lisamist rotate kellaga.
    let binClock = document.getElementById("binaryTime");
    let realClock = document.getElementById("time");

    if(binaryStyle){
        binaryStyle = false;
        console.log('binary style disabled');
        binClock.style.display = 'none';
        realClock.style.display = 'flex';
        document.getElementById('binaryClock').innerHTML="Binaarkell!";

    }else{
        binaryStyle = true;
        console.log('binary style enabled');
        binClock.style.display = 'flex';
        realClock.style.display = 'none';
        document.getElementById('binaryClock').innerHTML="Tavakell!";
    };

    updateClock();
};

function binaryConvert(inputNumber){
    //teeb iga numbri 6 kohaliseks binaariaks
    return(inputNumber >>> 0).toString(2).padStart(6, '0');
};

function binaryClockMode(){
    
    //konverdib kellajad ümber ja iga väärtuse kohta muudab tulukese tausta.
    let hBin = binaryConvert(hourVal),
        mBin = binaryConvert(minuteVal),
        sBin = binaryConvert(secondVal);

    console.log("h: " + hBin + " s: " + sBin + " m: " + mBin)

        for(digit in hBin){
            if(hBin[digit] == "1"){
                document.getElementById("h"+digit).classList.add("binaryDot");
                document.getElementById("h"+digit).classList.remove("binaryDotOff");
            }
            else{
                document.getElementById("h"+digit).classList.add("binaryDotOff");
                document.getElementById("h"+digit).classList.remove("binaryDot");
            }
        }
        for(digit in mBin){
            if(mBin[digit] == "1"){
                document.getElementById("m"+digit).classList.add("binaryDot");
                document.getElementById("m"+digit).classList.remove("binaryDotOff");
            }
            else{
                document.getElementById("m"+digit).classList.add("binaryDotOff");
                document.getElementById("m"+digit).classList.remove("binaryDot");
            }
        }
        for(digit in sBin){
            if(sBin[digit] == 1){
                document.getElementById("s"+digit).classList.add("binaryDot");
                document.getElementById("s"+digit).classList.remove("binaryDotOff");
            }
            else{
                document.getElementById("s"+digit).classList.add("binaryDotOff");
                document.getElementById("s"+digit).classList.remove("binaryDot");
            };
        };
};

function changeDateStyle(){
    //NO 5 muudab vanarahva kalendri stiiliks.

    if(oldDates){
        document.getElementById('dateStyle').innerHTML="Vanarahva kalender!"
        oldDates = false;
    }else{
        oldDates = true;
        document.getElementById('dateStyle').innerHTML="Tava kalender!"
    };

    console.log(oldDates);
    console.log("muuda stiili");
    updateClock();
};


function updateClock(){
    //console.log("jÃµudsin updateClock funktsiooni");

    let date = new Date();
    hourVal = date.getHours();
    minuteVal = date.getMinutes();
    secondVal = date.getSeconds();
    day = date.getDate();
    month = date.getMonth();
    year = date.getFullYear();
 
    if(hourVal < 10){
        hourVal = "0" + hourVal;
    }

    if(minuteVal < 10){
        minuteVal = "0" + minuteVal;
    }

    if(secondVal < 10){
        secondVal = "0" + secondVal;
    }

    //siin elab kella displei
    if(binaryStyle){
        binaryClockMode();
    }else{
        h.innerHTML = hourVal + ":";
        m.innerHTML = minuteVal + ":";
        s.innerHTML = secondVal;
    };

    //siin elab kuupäevadisplei
    dayElement.innerHTML = day + ". ";
    yearElement.innerHTML = year;

    if(oldDates){
    monthElement.innerHTML = monthNamesOld[month];

    }else{
    monthElement.innerHTML = monthNames[month];
    };

};


document.getElementById('dateStyle').addEventListener('click', changeDateStyle);
document.getElementById('binaryClock').addEventListener('click', binaryClock);

document.getElementById('saveColors').addEventListener('click', saveColors);
window.addEventListener('keypress', randomColor);

document.getElementById('nightModeToggle').addEventListener('click', function() {modeSwitch(1)});s
document.getElementById('customToggle').addEventListener('click', function() {modeSwitch(0)});

document.getElementById('time').addEventListener('click', function() {targetGame(0)});
target.addEventListener('click', function() {targetGame(100)});
target.style.opacity = 0;

setInterval(updateClock, 1000);
updateClock();
