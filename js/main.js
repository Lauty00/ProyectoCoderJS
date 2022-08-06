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

    imprimirGastos(){
        const list=document.querySelector('.list');
        limpiarHTML(list);
        this.gastos.forEach(gasto => {
           
            const item=document.createElement('li');
            item.classList.add('list__item')
            item.innerHTML=`
                <span>Motivo: ${gasto.motivo}</span>
                <span>Fecha: ${gasto.fecha}</span>
                <span>Dinero: $${gasto.costo}</span>
            `;
            list.append(item);
        });
    }

    borrarGasto(id){
        return this.gastos.filter((gasto)=>gasto.id!=id);
    }
}

const form=document.querySelector('#form');
const gastos=new Gasto();

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const motivo=document.querySelector("input[name='motivo']").value;
    const fecha=document.querySelector("input[name='fecha']").value;
    const dinero=document.querySelector("input[name='dinero']").value;

    let gasto=new Gasto(motivo,fecha,parseInt(dinero),Date.now());

    console.log(gasto);
    gastos.agregarGasto(gasto)
    gastos.imprimirGastos()

    form.reset()
})

function limpiarHTML(etiqueta){
    while(etiqueta.firstChild){
        etiqueta.removeChild(etiqueta.firstChild);
    }
}








