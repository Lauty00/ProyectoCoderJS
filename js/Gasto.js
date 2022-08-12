import { limpiarHTML } from "./funciones.js";


export default class Gasto {
    gastos=[];
    constructor(motivo, fecha, costo ,id) {
        this.motivo = motivo;
        this.fecha = fecha;
        this.costo = costo;
        this.id = id;
    }
    agregarGasto(gasto){
        this.gastos=[...this.gastos,gasto];
       
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
                <button class='btn btn-info editar'>Editar</button>
                <button class='btn btn-danger eliminar'>Eliminar</button>
            `;
            list.append(item);
        });
        localStorage.setItem('gastos',JSON.stringify(this.gastos));
    }
   
}

export const gasto=new Gasto();