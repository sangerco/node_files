const fs = require('fs');
const axios = require('axios');

function cat(path) {
    if (path.includes('://')) {
        webCat(path);
    } else {
        fs.readFile(path, 'utf8', (err, data) => {
            if(err){
                console.error('ERROR:', err);
                process.kill(1);
            }
            console.log(data);
        })
    }
}

function catOut(filename, path) {
    if (path.includes('://')) {
        webCatOut(filename, path)
    } else {
        fs.readFile(path, 'utf8', (err, data) => {
            if(err){
                console.error('ERROR:', err);
                process.kill(1);
            }
            fs.writeFile(filename, data, 'utf8', function(err) {
                if(err){
                    console.error(`Couldn't write to ${filename}. ERROR:, ${err}`);
                    process.exit(1);
                }
                console.log(`Successfully wrote ${path}'s data to ${filename}.`);
            })
        })
    }
}
async function webCat(path) {
    try{
        let res = await axios.get(path);
        console.log(res.data);
    } catch (err) {
        console.error(`Error fetching ${path}: ${err.response.status}: ${err.response.statusText}`);
        process.exit(1);
    }
   
}

async function webCatOut(filename, path) {
    try{
        let res = await axios.get(path)
        fs.writeFile(filename, res.data, 'utf8', function(err) {
            if(err){
                console.error(`Couldn't write to ${filename}. ERROR:, ${err}`);
                process.exit(1);
            }
            console.log(`Successfully wrote ${path}'s data to ${filename}.`);
        })
    } catch (err) {
        console.error(`Error fetching ${path}: ${err.response.status}: ${err.response.statusText}`);
        process.exit(1);
    }
}

if (process.argv[2] === '--out') {
    catOut(process.argv[3], process.argv[4]);
} else {
    cat(process.argv[2]);
}

