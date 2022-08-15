import { limpiarHTML } from "./funciones.js";


export default class Gasto {
    
    constructor(motivo, fecha, costo ,id,metodo) {
        this.motivo = motivo;
        this.fecha = fecha;
        this.costo = costo;
        this.id = id;
        this.gastos=[];
        this.metodo=metodo;
    }
    agregarGasto(gasto){
        this.gastos=[...this.gastos,gasto];
       
    }

    borrarGasto(id){
        this.gastos=this.gastos.filter((gasto)=>gasto.id!=id);
        this.imprimirGastos();
    }
    editarGasto(gasto){
        const {motivo,fecha,costo,id}=gasto;
    
        let motivoInput=document.querySelector("input[name='motivo']");
        let fechaInput=document.querySelector("input[name='fecha']");
        let costoInput=document.querySelector("input[name='dinero']");

        motivoInput.value=motivo;
        fechaInput.value=fecha;
        costoInput.value=costo;

        this.borrarGasto(id);
    }
   
    imprimirGastos(){
        const list=document.querySelector('.list');
        limpiarHTML(list);
        this.gastos.forEach(gasto => {
            const item=document.createElement('li');
            if(gasto.metodo){
                item.classList.add('list__item', 'border','border-3', 'border-success')
            }else{
                item.classList.add('list__item', 'border','border-3', 'border-danger')
            }
            
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