class Gasto {
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


const form=document.querySelector('#form');
const gasto=new Gasto();
const list=document.querySelector('.list');

let saldo=0

document.addEventListener('DOMContentLoaded',()=>{
    cargarLS()
    events();
})



function events(){
    form.addEventListener('submit',validar);
    list.addEventListener('click',btnGastos);
}

function cargarLS(){
    if(localStorage.getItem('saldo')==null){
        saldo=prompt('Ingrese el Salario disponible');
        localStorage.setItem('saldo',saldo)
        mostrarSalario(saldo)
    }else{
        if(localStorage.getItem('gastos')!=null){
            gasto.gastos=JSON.parse(localStorage.getItem('gastos'));
            gasto.imprimirGastos();
        }
        if(localStorage.getItem('saldo')!=null){
            saldo=Number(localStorage.getItem('saldo'));
            mostrarSalario(saldo)
        }
    }
    
}

function mostrarSalario(saldo){
    const span=document.querySelector('.saldo');
    span.innerHTML=`
        <strong>Saldo Disponible</strong> = $${saldo}
    `;
}

function editarGasto(gasto){
    const {motivo,fecha,costo}=gasto;

    let motivoInput=document.querySelector("input[name='motivo']");
    let fechaInput=document.querySelector("input[name='fecha']");
    let costoInput=document.querySelector("input[name='dinero']");

    motivoInput.value=motivo;
    fechaInput.value=fecha;
    costoInput.value=costo;
    console.log(motivo)
    console.log(fecha)
    console.log(costo)
}

function validar(e){
    e.preventDefault()
    const motivoInput=document.querySelector("input[name='motivo']").value;
    const fechaInput=document.querySelector("input[name='fecha']").value;
    const dineroInput=document.querySelector("input[name='dinero']").value;

    if(!isNaN(motivoInput) || isNaN(dineroInput)){
        mensajeAlert('error');
    }else{
        let gastoAguardar=new Gasto(motivoInput,fechaInput,parseInt(dineroInput),Date.now());

        saldo-=Number(dineroInput);
        localStorage.setItem('saldo',saldo);
        mostrarSalario(saldo);
    
        console.log(gastoAguardar);
        gasto.agregarGasto(gastoAguardar);
        gasto.imprimirGastos();
        mensajeAlert('guardar');
        form.reset();
    }
}

function btnGastos(e){
    if(e.target.classList.contains('eliminar')){
        let id=e.target.parentElement.dataset.id;
        saldo+=gasto.gastos.find(gasto=>gasto.id==id).costo;
        mostrarSalario(saldo);
        gasto.borrarGasto(id);
        localStorage.setItem('saldo',saldo);
    }
    else if(e.target.classList.contains('editar')){
        let id=e.target.parentElement.dataset.id;
        let gastoEdit=gasto.gastos.find(gasto=>gasto.id==id);
        editarGasto(gastoEdit);
    }
}

function mensajeAlert(p){
    const divAlert=document.createElement('div');

    if(p =='error'){
        divAlert.classList.add('text-center','p-4','bg-danger','text-white','rounded-3','mt-3');
        divAlert.innerHTML=`
        Ingresa los datos correctamente.
        `;
        form.append(divAlert);
    }else if(p == 'guardar'){
        divAlert.classList.add('text-center','p-4','bg-success','text-white','rounded-3','mt-3');
        divAlert.innerHTML=`
        Gasto guardado correctamente.
        `;
        form.append(divAlert);
    }

    setTimeout(()=>{
        divAlert.style.display='none'
    },2000)
        
}

function limpiarHTML(etiqueta){
    while(etiqueta.firstChild){
        etiqueta.removeChild(etiqueta.firstChild);
    }
}











