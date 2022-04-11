require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        inquirerPausa,
        leerInput,
        listadoTareasEliminar,
        confirmar,
        mostrarListadoCheckList
     } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async() => {
    
   let opt = '';
   const tareas = new Tareas();
   const tareasDB = leerDB();

   if(tareasDB){
      tareas.cargarTareasFromArray( tareasDB );
   }

    do{

       opt = await inquirerMenu();
      
       switch(opt) {
           case '1':
            const desc = await leerInput('Descripción:');
            tareas.crearTarea( desc );
           break;

           case '2':
            tareas.listadoCompleto();
           break;

           case '3':
              tareas.listarTareasCompletadasPendientes(true);
              break;

           case '4':
              tareas.listarTareasCompletadasPendientes(false);
              break;

           case '5':
             const ids = await mostrarListadoCheckList(tareas.listado);
             tareas.completarTareas(ids);
               break;
              
           case '6':
               const id = await listadoTareasEliminar(tareas.listado);
               if(id !=='0'){
               const ok = await confirmar('¿Está seguro?');

               if(ok){
                  tareas.eliminarTarea(id);
                  console.log('Tarea borrada correctamente');
               }
            }
               break;
       }

       guardarDB(tareas.listado);

       await inquirerPausa();

    }while(opt !== '0');
       
    
}

main();