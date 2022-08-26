var pcolor = document.getElementById('pencolor');
const bgcolor = document.getElementById('bgcolor');
const rgb = document.getElementById('rgb');
const shade = document.getElementById('shading');
const eraser = document.getElementById('erase');
const clear = document.getElementById('clear');
const range = document.getElementById('range-value');
const grid = document.getElementById('grid')
const grdlines = document.getElementById('grdlines');
let currentlyActive = false,
cell,
rows,
sketch = false,
erase = false,
shde = false,
glines = false,
mirage = false;
bgcolor.addEventListener('change',()=>{grid.style.backgroundColor = `${bgcolor.value}`});
clear.addEventListener('click',clean);
eraser.addEventListener('click',era)
grdlines.addEventListener('click',toggleGridlines);
rgb.addEventListener('click',rainbow);
shade.addEventListener('click',shading);

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
     }
     else if(mirage){
          var num = Math.round(0xffffff * Math.random());
          var r = num >> 16;
          var g = num >> 8 & 255;
          var b = num & 255;
          e.target.style.backgroundColor= 'rgb(' + r + ', ' + g + ', ' + b + ')';
     }
     else if(sketch){
          let currentOpacity = Number(e.target.style.backgroundColor.slice(-3,-1));
          console.log(currentOpacity+0.1);
          let newOpacity = currentOpacity+0.1;
          if(newOpacity===1) return;
          e.target.style.backgroundColor =`rgba(0,0,0,${newOpacity})`



          
     }
     else{
          e.target.style.backgroundColor = `${pcolor.value}`;
     }

}
function togglePen(){
     let cells = document.querySelectorAll('.cell');
     if(!currentlyActive){
          cells.forEach(element=>{element.addEventListener('mouseleave',activatePen)});
          currentlyActive = true; 
          
     }
     else{
          cells.forEach(element=>{element.removeEventListener('mouseleave',activatePen)});
          currentlyActive = false;
          
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
//shading
     
function shading(){
     clean();
     bgcolor.value = '#ffffff';
     pcolor.value = '#000000';
     let cells = document.querySelectorAll('.cell');
     cells.forEach(item => {item.style.backgroundColor=`rgba(0,0,0,0)`});
     if(!sketch){
          sketch = true;
     }
     else{
          sketch = false;
     }

}
//grid-lines
function toggleGridlines(){
     let cells = document.querySelectorAll('.cell');
     if(glines){
          cells.forEach(item => {item.classList.remove('gridl')});
          glines = false;
     }
     else{
          cells.forEach(item=>{item.classList.add('gridl')});
          glines = true;
     }
}
//rainbow
function rainbow(){
     if(!mirage){
          mirage = true;
     }
     else{
          mirage = false
     }
}