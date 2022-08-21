var pcolor = document.getElementById('pencolor');
const bgcolor = document.getElementById('bgcolor');
const rgb = document.getElementById('rgb');
const shade = document.getElementById('shading');
const eraser = document.getElementById('erase');
const clear = document.getElementById('clear');
const range = document.getElementById('range-value');
const grid = document.getElementById('grid')
let currentlyActive = false,
cell,
rows,
erase = false;
bgcolor.addEventListener('change',()=>{grid.style.backgroundColor = `${bgcolor.value}`});
clear.addEventListener('click',clean);
eraser.addEventListener('click',era)

//range slider
function rangeSlider(value){
     range.textContent=`${value} x ${value}`;
}
//grid
function deletion(p){  
          let child = p.lastElementChild; 
          while (child) {
               p.removeChild(child);
               child = p.lastElementChild;
          }
}
function gridCreation(par){
     deletion(grid);
     grid.style.backgroundColor = `${bgcolor.value}`;
     for(let i = 0;i<par;i++){
          rows = document.createElement('div');
          rows.classList.add('rows');
          grid.appendChild(rows);
          for(let j = 0;j<par;j++){
               cell = document.createElement('div');
               cell.classList.add('cell');
               cell.style.height = `${700/par}px`;
               cell.style.width = `${700/par}px`;
               rows.appendChild(cell);

          }
     }
     let cells = document.querySelectorAll('.cell');
     cells.forEach(element=>{element.addEventListener('mouseover',()=>{element.classList.add('hover')})});
     cells.forEach(element=>{element.addEventListener('mouseout',()=>{element.classList.remove('hover')})});
     cells.forEach(element=>{element.addEventListener('click',activatePen)});
}
gridCreation(16);
grid.addEventListener('click',togglePen)

//pen
function activatePen(e){
     if(erase){
          e.target.style.backgroundColor = `${bgcolor.value}`
     }else{
          e.target.style.backgroundColor = `${pcolor.value}`;
     }

}
function togglePen(){
     let cells = document.querySelectorAll('.cell');
     if(!currentlyActive){
          cells.forEach(element=>{element.addEventListener('mouseleave',activatePen)});
          currentlyActive = true; 
          console.log(currentlyActive);
     }
     else{
          cells.forEach(element=>{element.removeEventListener('mouseleave',activatePen)});
          currentlyActive = false;
          console.log(currentlyActive);
     }
}
//clear
function clean(){
     let cells = document.querySelectorAll('.cell');
     cells.forEach(element=>{element.style.removeProperty('background-color')});
}
//eraser
function era(){
     if(!erase){
          erase = true;
     }
     else{
          erase = false;
     }
}
     
