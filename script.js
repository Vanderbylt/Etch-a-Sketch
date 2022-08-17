function grid(e){
      
      for(let i = 0; i<e; i++){
          let cell = document.createElement('div');
          grud.appendChild(cell);
          cell.classList.add('cell');
          for(let j = 0;j<e;j++){
               let cellchild = document.createElement('div');
               cell.appendChild(cellchild);
               cellchild.style.backgroundColor = 'white';
               cellchild.style.width =`${700/e}px`;
               cellchild.style.height =`${700/e}px`;
          }     
     }     
}
function deletion(p){  
     var child = p.lastElementChild; 
     while (child) {
          p.removeChild(child);
          child = p.lastElementChild;
     }
}
function rangeSlider(value){
     gridsz.forEach(element => {element.innerText = value});

}
function chngval(e){
     gsize = e;
     if(grud.hasChildNodes()){
          let cells = document.querySelectorAll('.cell');
          deletion(grud);
     }
     grid(gsize);
}
//selection
const gridbtn = document.querySelector('#gridsize');
const blkwht = document.getElementById('b-w');
const random = document.getElementById('rgb');
const shade = document.getElementById('shading');
let gsize = 16;
const grud = document.getElementById('grid');
const gridsz = document.querySelectorAll('.range-value');
grid(gsize);
