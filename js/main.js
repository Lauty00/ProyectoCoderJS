class Gasto {
    gastos=[];
    constructor(motivo, fecha, costo ,id) {
        this.motivo = motivo;
        this.fecha = fecha;
        this.costo = costo;
        this.id = id;
    }
    agregarGasto(gasto){
        this.gastos.push(gasto)
    }

    borrarGasto(id){
        this.gastos=this.gastos.filter((gasto)=>gasto.id!=id);
        this.imprimirGastos();
    }
   
    imprimirGastos(){
        const list=document.querySelector('.list');
        limpiarHTML(list);
        this.gastos.forEach(gasto => {
           
            const item=document.createElement('li');
            item.classList.add('list__item')
            item.setAttribute('data-id',gasto.id);
            item.innerHTML=`
                <span><strong>Motivo</strong>: ${gasto.motivo}</span>
                <span><strong>Fecha</strong>: ${gasto.fecha}</span>
                <span><strong>Dinero</strong>: $${gasto.costo}</span>
                <button class='btn btn-danger eliminar'>Eliminar</button>
            `;
            list.append(item);
        });
    
        agregarLS();
    }
   
    
}

const form=document.querySelector('#form');
const gasto=new Gasto();
const list=document.querySelector('.list');
document.addEventListener('DOMContentLoaded',()=>{
    cargarLS();
})

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const motivo=document.querySelector("input[name='motivo']").value;
    const fecha=document.querySelector("input[name='fecha']").value;
    const dinero=document.querySelector("input[name='dinero']").value;

    let gastoAguardar=new Gasto(motivo,fecha,parseInt(dinero),Date.now());

    console.log(gastoAguardar);
    gasto.agregarGasto(gastoAguardar)
    gasto.imprimirGastos()

    form.reset()
})


list.addEventListener('click',(e)=>{
    if(e.target.classList.contains('btn')){
        let id=e.target.parentElement.dataset.id;
        gasto.borrarGasto(id);
    }
})

function limpiarHTML(etiqueta){
    while(etiqueta.firstChild){
        etiqueta.removeChild(etiqueta.firstChild);
    }
}


function agregarLS(){
    localStorage.setItem('gastos',JSON.stringify(gasto.gastos));
}

function cargarLS(){
    gasto.gastos=JSON.parse(localStorage.getItem('gastos'));
    gasto.imprimirGastos();
}









