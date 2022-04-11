const fs = require('fs');

const path = './db/data.json';

const guardarDB = ( data ) => {

    fs.writeFileSync( path, JSON.stringify(data) );
} 

const leerDB = () => {
    let data = null;
    if(fs.existsSync(path)){
        const info = fs.readFileSync(path, {encoding: 'utf-8'});
        data = JSON.parse(info);
    }
    return data;
}
    
module.exports = {
    guardarDB,
    leerDB,
}