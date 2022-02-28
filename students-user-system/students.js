let [,, req, elem, elem2] = process.argv
const fs = require('fs')

let database = JSON.parse(fs.readFileSync('./database.json', 'utf-8'))

// console.log(JSON.stringify(database));
if(req == 'POST' && elem){
    try{
        for (let i = 0; i < database.length; i++) {
            if (elem == database[i].username) {
                return console.log("Bunday Usernameli Foydalanuvchi ro'yxatdan o'tgan!");
            }
        }
        database.push({
                "id":  database.length ? database.at(-1).id + 1 : 1,
                "username": elem
        })
        fs.writeFileSync('./database.json', JSON.stringify(database))
        return console.log("Succsessfully!")
    }catch(error){
        console.log(error.message);
    }
}

if(req == 'GET' && elem){
    for (let i = 0; i < database.length; i++) {
        if (elem == database[i].id) {
            let mock = [{id: database[i].id, username: database[i].username, ...database[i].score}]
            console.log(`username: ${database[i].username}`);
            console.table(...mock)
        }
    }
}

function countScore(array){
    let result = 0
    for (let i = 0; i < array?.length; i++) {
        result+=+array[i].score
    }
    return result
}

if(req == 'GET' && !elem){
    try{
        console.log('Students List:');
        let obshi = []
    for (let i = 0; i < database.length; i++) {
        let score1 = countScore(database[i].score)
        let mock = {id: database[i].id, username: database[i].username, 'Total score': score1}
        obshi.push(mock)
    }
    obshi.sort((a, b) => {
        return b.score - a.score;
    });
    console.table(obshi);
    }catch(error){
        console.log(error.message);
    }
}

if(req == 'DELETE' && elem){
    let count = 0
    let newarr = []
    for (let i = 0; i < database.length; i++) {
        if (database[i].id == elem) {
            count++
        }else{
            newarr.push(database[i])
        }
    }
    fs.writeFileSync('./database.json', JSON.stringify(newarr))
    if (count == 0) {
        console.log('This User is not find!');
    }else{
        console.log('Succsessfully deleted User');
    }
}

if (req == 'PUT' && elem && elem2) {
    try{
        let count = 0
    elem2 = elem2.split('=')
    for (let i = 0; i < database.length; i++) {
        if (database[i].id == elem) {
            database[i][elem2[0]] = elem2[1]
            count++
        }
    }

    if(count != 0) {
        fs.writeFileSync('./database.json', JSON.stringify(database))
        console.log("Succsessfully!")
    }else{
        console.log('This user is not found!')
    }
    }catch(error){
        console.log(error.message);
    }
}