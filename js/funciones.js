import Gasto from "./Gasto.js";
import {gasto} from "./Gasto.js";

const form=document.querySelector('#form');
const list=document.querySelector('.list');
const formCheck=document.querySelector('.form-check');
const btnReset=document.querySelector('.btn-reset');


let saldo=0
let metodoG=false;

export function events(){
    formCheck.addEventListener('change',btnChecked);
    form.addEventListener('submit',validar);
    list.addEventListener('click',btnGastos);
    btnReset.addEventListener('click',resetearGestor);
}

export function cargarLS(){
    if(localStorage.getItem('saldo')==null){
        saldo=Number(prompt('Ingrese el Salario disponible'));
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

function btnChecked(){
    let check1=document.querySelector('#ingreso');
    let check2=document.querySelector('#gasto');

    let check1Label=document.querySelector('label[for="ingreso"] ');
    let check2Label=document.querySelector('label[for="gasto"] ');

    console.log(check1Label)

    if(check1.checked){
        metodoG=true;
        check2Label.style.backgroundColor='gray';
        check1Label.style.backgroundColor='RGB(32,148,94)';
    }
    else if(check2.checked){
        metodoG=false;
        check1Label.style.backgroundColor='gray';
        check2Label.style.backgroundColor='RGB(224,74,88)';
        
    }
}

function mostrarSalario(saldo){
    const span=document.querySelector('.saldo');
    span.innerHTML=`
        <strong>Saldo Disponible</strong> = $${saldo}
    `;
}



function validar(e){
    e.preventDefault()
    const motivoInput=document.querySelector("input[name='motivo']").value;
    const fechaInput=document.querySelector("input[name='fecha']").value;
    const dineroInput=document.querySelector("input[name='dinero']").value;
    const check1=document.querySelector('#ingreso');
    const check2=document.querySelector('#gasto');


    if(!isNaN(motivoInput) || isNaN(dineroInput) || dineroInput<0 || (check1.checked== false && check2.checked == false)){
        mensajeAlert('error');
    }else{
        let gastoAguardar=new Gasto(motivoInput,fechaInput,parseInt(dineroInput),Date.now(),metodoG);
        if(gastoAguardar.metodo){
            saldo+=Number(dineroInput);
            console.log(saldo)
        }else{
            saldo-=Number(dineroInput);
            console.log(saldo)

        }
        
        localStorage.setItem('saldo',saldo);
        mostrarSalario(saldo);
    
        gasto.agregarGasto(gastoAguardar);
        gasto.imprimirGastos();
        document.querySelector('label[for="ingreso"] ').style.backgroundColor='gray';
        document.querySelector('label[for="gasto"] ').style.backgroundColor='gray';
        mensajeAlert('guardar');
        form.reset();
    }
}

function btnGastos(e){
    if(e.target.classList.contains('eliminar')){
        let id=e.target.parentElement.dataset.id;
        let eliminated=gasto.gastos.find(gasto=>gasto.id==id);
        if(eliminated.metodo){
            saldo-=eliminated.costo;
        }else{
            saldo+=eliminated.costo;
        }
        
        mostrarSalario(saldo);
        gasto.borrarGasto(id);
        localStorage.setItem('saldo',saldo);
    }
    else if(e.target.classList.contains('editar')){
        let id=e.target.parentElement.dataset.id;
        let gastoEdit=gasto.gastos.find(gasto=>gasto.id==id);
        gasto.editarGasto(gastoEdit);
        saldo+=gastoEdit.costo;
        mostrarSalario(saldo)
    }
}

function resetearGestor(){
    localStorage.clear();
    window.location.reload();
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

export function limpiarHTML(etiqueta){
    while(etiqueta.firstChild){
        etiqueta.removeChild(etiqueta.firstChild);
    }
}




