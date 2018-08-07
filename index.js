const rate = 600;
const ts = 25;
const charChangeProb = 0.10;

class Char{
  /*
    Class for managing each symbol that appears on the screen
  */
  constructor(cx, cy){
    this.symbol = String.fromCharCode(0x30A0 + Math.round(0xF*Math.random()));
    this.cx = cx;
    this.cy = cy;
    this.makeBright = false
  }

  printChar(){
    if(this.makeBright && Math.random()<0.5){
      fill(120, 255, 120);
    }
    else{
      fill(0, 200, 45);
    }
    text(this.symbol, this.cx, this.cy);

  }

  descend(step){
    if(this.cy < window.innerHeight){
      this.cy += step;
    }else{
      this.cy = 0;
    }
  }

  randomCharChange(){
    this.symbol = String.fromCharCode(0x30A0 + Math.round(0xF*Math.random()));
  }
}

class Column{
  /*
   Class for managing individual column of symbols
  */
  constructor(rx, start, end, step){
    let len = Math.round(window.innerHeight/ts);
    this.rx = rx;
    this.start = start;
    this.end = end;
    this.step = step;
    this.col = new Array(len);
    for(var i=0; i<len ; i++){
      this.col[i] = new Char(rx, i*ts);
      if(this.end == i){
        this.col[i].makeBright = true;
      }
      if(i<this.start || i>this.end){
        this.col[i].symbol = " ";
      }
    }

  }
  render(){
    for(var i in this.col){
        this.col[i].printChar();
        this.col[i].descend(this.step);
        if(Math.random(0,1)<charChangeProb &&
           !(i<=this.start || i>this.end)){
          this.col[i].randomCharChange();
        }

    }
  }
}

let columns = [];

function setup(){
  createCanvas(window.innerWidth,
               window.innerHeight);

  textAlign(CENTER, CENTER);
  textSize(ts);
  for(let i=0; i<Math.round(window.innerWidth/32); i++){
    columns = columns.concat([new Column(
      i*32,
      Math.round(Math.random()*window.innerHeight/(4*ts)),
      Math.round(Math.random()*window.innerHeight/ts),
      Math.round(Math.random(0.5, 1.0)*15),
    )]);
  }
  frameRate(rate);

}

function draw(){
  background(0, 150);
  columns.forEach((x)=>x.render());

}
