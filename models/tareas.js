const Tarea = require('./tarea');

class Tareas {

    _listado = {};
  
    get listado() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;

    }

    constructor(){
       this._listado = {};
    }

    cargarTareasFromArray( tareas ){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
 
    }

    
    crearTarea( desc = '' ) {

        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea; 
    }

    eliminarTarea( id ){

        if(this._listado[id]){
            delete this._listado[id];
        }

    }

    completarTareas( ids = [] ){
        this.listado.forEach(tarea => {
            let stop = false;
            for (let i = 0; i < ids.length && !stop; i++) {
                if(ids[i] === tarea.id) {
                    stop = true;
                     if(!tarea.completadoEn)
                        tarea.completadoEn = new Date().toISOString();
                }
            }
            if(!stop){
                tarea.completadoEn = '';
            }

         });  
         //Otra manera de hacer lo anterior
        // ids.forEach( id => {
        //     const tarea = this._listado[id];
        //     if(!tarea.completadoEn){
        //         tarea.completadoEn = new Date().toISOString();
        //     }
        // });

        // this.listado.forEach( tarea => {
        //     if(!ids.includes(tarea.id)){
        //         tarea.completadoEn = null;
        //     }
        // });
    }
     
    listadoCompleto() {
       
        console.log();
       
        const listado = this.listado;
        
        if(listado.length === 0){
            console.log('No hay tareas');
        }
        else{
        listado.forEach( (tarea , i) => {
           const index = `${i+1}`.green;
           const {desc, completadoEn} = tarea;
           let estado = '';
           if(completadoEn) {
               estado = 'Completada'.green;
            }
           else{
               estado = 'Pendiente'.red;
           } 
           console.log(`${index}. ${desc} :: ${estado}`);
       });
    }

    }

    listarTareasCompletadasPendientes(completada){
        console.log();
        let index = 0;
        let algunaCompletada = false;
        let algunaPendiente = false;

        this.listado.forEach( (tarea ) => {
          
            if(completada && tarea.completadoEn){
                algunaCompletada = true;
                index++;
                console.log(`${(index + '.').green} ${tarea.desc} :: ${(tarea.completadoEn).green}`);
                
            }
            else
            if(!completada && !tarea.completadoEn){
                algunaPendiente = true;
                index++;
                console.log(`${(index + '.').green} ${tarea.desc} :: ${'Pendiente'.red}`);
            }
        });
        if(completada && !algunaCompletada){
            console.log('No hay tareas completadas');
        }
        else if(!completada && !algunaPendiente){
            console.log('No hay tareas pendientes');
        }
    }

}

module.exports = Tareas;