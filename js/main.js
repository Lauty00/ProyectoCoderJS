class Gasto {
    constructor(motivo, fecha, costo ,id) {
        this.motivo = motivo;
        this.fecha = fecha;
        this.costo = costo;
        this.id = id;
    }

    imprimirGastos(gastos){
        let mensaje=`Gastos \n`
        gastos.forEach((gasto,index) => {
            mensaje+=`Gasto ${index+1} - Motivo: ${gasto.motivo} , Fecha: ${gasto.fecha} , Costo: $${gasto.costo} , ID: ${gasto.id}\n`;
        });
        return mensaje;
    }

    borrarGasto(gastos,id){
        return gastos.filter((gasto)=>gasto.id!=id);
    }
}

let gastos = [];
let id=0;
const gasto=new Gasto();

validar()
let confirmacion = confirm('Quieres agregar otro gasto?');

while (confirmacion) {
    validar()
    confirmacion = confirm('Quieres agregar otro gasto?');
}

alert(gasto.imprimirGastos(gastos));

const borrarConfirm=confirm('Deseas borrar un gasto?');
if(borrarConfirm){
    let idGasto=prompt(`
        ${gasto.imprimirGastos(gastos)}\n
        Elige el gasto que quieres borrar ingresando su numero de id.
    `);

    gastos=gasto.borrarGasto(gastos,parseInt(idGasto));
}

alert(gasto.imprimirGastos(gastos));
console.log(gastos)



function validar(){
    let motivo = prompt('motivo');
    while(!isNaN(motivo) || motivo==''){
        motivo = prompt('Ingrese un motivo correctamente');
    }
    let dia=prompt('Ingrese la fecha');
    let mes=prompt('ingrese el numero del mes')
    while(validarFecha(dia,mes)){
        dia=prompt('Ingrese correctamente la fecha');
        mes=prompt('ingrese correctamente el numero del mes')
    }
    let fecha =`${dia}/${mes}/2022`;
    let costo = parseInt(prompt('costo'));
    while(isNaN(costo) || costo==''){
        costo = parseInt(prompt('Ingrese un costo correctamente'));
    }
    
    id++;
    let gasto = new Gasto(motivo, fecha, parseInt(costo),id);
    gastos.push(gasto)
}

function validarFecha(dd,mm){
    if(1>mm || mm>12 || isNaN(dd) || isNaN(mm) || dd=='' || mm==''){
        console.log(0)
        return true
    }
    if(( mm== 1 || mm==3 || mm==5 || mm==7 || mm==8 || mm==10 || mm==12) && (1>dd || dd>31)){
        console.log(1)
        return true
    }else if((mm== 4 || mm==6 || mm==9 || mm==11) && (1>dd || dd>30)){
        console.log(2)
        return true
    }else if((mm== 2) && (1>dd || dd>28)){
        console.log(13)
        return true
    }else{
        return false
    }
}






