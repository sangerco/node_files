const fs = require('fs');
const axios = require('axios');

async function webCat(path) {
    try{
        let res = await axios.get(path)
        console.log(res.data)
    } catch (err) {
        console.error(`Error fetching ${path}: ${err.response.status}: ${err.response.statusText}`)
        process.exit(1)
    }
   
}

function cat(path) {
    if (path.includes('://')) {
        webCat(path)
    } else {
        fs.readFile(path, 'utf8', (err, data) => {
            if(err){
                console.log('ERROR:', err)
                process.kill(1)
            }
            console.log(data)
        })
    }
}

cat(process.argv[2]);



