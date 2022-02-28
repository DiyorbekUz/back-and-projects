let [,, req, id, score, comment] = process.argv
const fs = require('fs')
let createID = new Date().getTime()
createID = String(createID).slice(-5)
let database = JSON.parse(fs.readFileSync('./database.json', 'utf-8'))
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
if (req == 'POST' && id && score && comment) {
    try{
        if (database.length < id) {
            return console.log("This id is not found")
        }
        let count = 0
        for (let i = 0; i < database.length; i++) {
            if(database[i].id == id){
                database[i].score.push(
                    {
                        ScoreID: Number(createID),
                        score,
                        date,
                        comment
                    }
                    )
                }
                count++
        }

        if(count != 0){
            fs.writeFileSync('./database.json', JSON.stringify(database))
            console.log('Succsessfully');
        }else{
            console.log('This user is not found!');
        }
    }catch(error){
        if (error.message == "Cannot read properties of undefined (reading 'push')") {
            for (let i = 0; i < database.length; i++) {
                if(database[i].id == id){
                    database[i].score = [
                        {
                            ScoreID: Number(createID),
                            score,
                            date,
                            comment
                        }
                    ]
            }
        }
        fs.writeFileSync('./database.json', JSON.stringify(database))
        console.log('Succsessfully');
        }
    }
}

if (req == 'DELETE' && id && !score && !comment) {
    try{
        let newArr = []
        let count = 0
        for (let i = 0; i < database.length; i++) {
            newArr.push({
                id: database[i].id, 
                username: database[i].username,
                score: []
            })
            for (let j = 0; j < database[i].score.length; j++) {
                if (database[i].score[j].ScoreID != id) {
                    newArr[i].score.push(database[i].score[j])
                }else{
                    count++
                }
            }
        }

        if (count !=0) {
            fs.writeFileSync('./database.json', JSON.stringify(newArr))
            console.log('Succsessfully');
        }else{
            console.log('This ID is not found!');
        }
    }catch(error){
        console.log(error.message);
    }
}

if (req == 'PUT' && id && score && !comment) {
    try{
        score = score.split('=')
        let count = 0
        for (let i = 0; i < database.length; i++) {
            for (let j = 0; j < database[i].score.length; j++) {
                if (database[i].score[j].ScoreID == id) {
                    database[i].score[j][score[0]] = score[1]
                    count++
                }
            }
        }

        if (count != 0) {
            fs.writeFileSync('./database.json', JSON.stringify(database))
            console.log('Succsessfully');
        }else{
            console.log('This ID is not found!');
        }
    }catch(error){
        console.log(error.message);
    }
}

