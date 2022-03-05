class Cell {
  constructor(i,j) {
    this.i = i;
    this.j = j;
    this.walls = [true,true,true,true];
    this.visited = false;
  }
  
  show () {
    let i = this.i;
    let j = this.j;
    stroke(0);
    strokeWeight(1);
    noFill();
    if (this.walls[0]) line( i*w, j*w, i*w, j*w+w);
    if (this.walls[1]) line( i*w, j*w+w, i*w+w, j*w+w);
    if (this.walls[2]) line( i*w+w, j*w+w, i*w+w, j*w);
    if (this.walls[3]) line( i*w+w, j*w, i*w, j*w);
    
    if (this.visited) {
      noStroke(0);
      fill(157,0,255,75);
      rect(this.i*w,this.j*w,w,w);
    }
  }
} // end of class


let dimx = window.innerWidth;
let dimy = window.innerHeight;
let w = 25;
let n = Math.trunc(dimx/w);
let m = Math.trunc(dimy/w);

while (dimx%w != 0) {
  dimx--;
}

while (dimy%w != 0) {
  dimy--;
}

let grid = [];
let current;
let list = [];

function setup() {
  createCanvas(dimx, dimy);
  
  for (let j = 0 ; j < m ; j++){
    for (let i = 0 ; i < n ; i++){
      grid.push(new Cell(i,j) );
    }
  }
  current = grid[0];
  current.visited = true;
  list.push( current );
}

function draw() {
  background(220);
  
  // show cells
  let cont = 0;
  for (let cell of grid){
    cell.show();
    if (cell.visited) cont++;
  }
  
  if (cont==n*m) {
    console.log("FINISHED!")
    noLoop();
  } else {
    // show current
    noStroke(0);
    fill(255,0,50);
    rect(current.i*w,current.j*w,w,w);
  }
  
  // get neighbours
  let neighbours = [];
  let globalIndex = current.i + current.j * n;
  if (current.i > 0) neighbours.push( grid[globalIndex-1] );
  if (current.i < n-1) neighbours.push( grid[globalIndex+1] );
  if (current.j > 0) neighbours.push( grid[globalIndex-n] );
  if (current.j < m-1) neighbours.push( grid[globalIndex+n] );
  
  neighbours = neighbours.filter(neighbour => !neighbour.visited);
  
  let toVisit;
  if (neighbours.length == 0) {
    list.pop();
    current = list[list.length-1];
  }
  else {
    toVisit = neighbours[floor(random(neighbours.length))];
    
    let diffI = toVisit.i - current.i;
    let diffJ = toVisit.j - current.j;
    
    if (diffI == 1) {
      current.walls[2] = false;
      toVisit.walls[0] = false;
    } else if (diffI == -1) {
      current.walls[0] = false;
      toVisit.walls[2] = false;
    } else if (diffJ == 1) {
      current.walls[1] = false;
      toVisit.walls[3] = false;
    } else if (diffJ == -1) {
      current.walls[3] = false;
      toVisit.walls[1] = false;
    } else {
      console.log("Something went wrong!")
    }
    
    current = toVisit;
    current.visited = true;
    list.push( current );
  }
  
}

