const fs = require('fs')
const http = require('http')
const { exit } = require('process')
const PORT = process.env.PORT || 5000

const database = JSON.parse(fs.readFileSync('./database.json'))
let income = database[0]['income']
let expanse = database[0]['expanse']
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

// function purposes(what, shto){
//     let result = []
//     for (let i = 0; i < database[0][what].length; i++) {
//         result.push(database[0][what][i][shto])
//     }
//     return result
// }

function getBalance(what, shto){
    let result = 0
    for (let i = 0; i < database[0][what].length; i++) {
        if (what == 'income') {
            result += + database[0][what][i][shto]
        }else if (what == 'expanse'){
            result -= - database[0][what][i][shto]
        }else{
            return new Error('Not found!')
        }
    }
    return result
}

function find(what, shto, id){
    for (let i = 0; i < database[0][what].length; i++) {
        if (database[0][what][i][shto] == id) {
            return database[0][what][i]
        }
    }
    return {
        status: 404,
        message: "Not found this user"
    }
}
// let purposesAll = [...purposes('income', 'incomePurpose'), ...purposes('expanse', 'expansePurpose')]


function serverFunction (request, response) {
	const url = request.url.toLowerCase()
	const method = request.method.toUpperCase()

	if(url.includes('/income') && method == 'GET') {
        let check = url.split('/')
        if (check[2] && Number(check[2])) {
            return response.end(JSON.stringify(find('income', 'incomeId', check[2])))
        }
		return response.end(JSON.stringify(income))
	} else if(url.includes('/expanse') && method == 'GET') {
        let checkExpense = url.split('/')
        if (checkExpense[2] && Number(checkExpense[2])) {
            return response.end(JSON.stringify(find('expanse', 'expanseId', checkExpense[2])))
        }
		return response.end(JSON.stringify(expanse))
	} else if(url == '/purposes' && method == 'GET') {
		return response.end(JSON.stringify(database[0]['purposes']))
	}else if(url == '/balance' && method == 'GET') {
        let balance = {
            totalIncome: getBalance('income', 'incomeAmount'),
            totalExpanse: getBalance('expanse', 'expanseAmount'),
            totalBalance: getBalance('income', 'incomeAmount') - getBalance('expanse', 'expanseAmount')
        }
		return response.end(JSON.stringify(balance))
	}

	else if(url == '/income' && method == 'POST') {
		let store = ''
		request.on('data', (chunk) => store += chunk)
		request.on('end', () => {
            let purp = ''
            const data = JSON.parse(store)
            for (let i = 0; i < database[0]['purposes'].length; i++) {
                if (database[0]['purposes'][i]?.['purposeId'] == data.purposeId) {
                    purp =  database[0]['purposes'][i]['purpose']
                }
            }
            let mockData = {
                "incomeId": database[0]['income'].length+1,
                "incomePurpose": {
                    "purposeId": data?.['purposeId'],
                    "type": "income",
                    "purpose": purp
                },
                "incomeAmount": data['amount'],
                "incomeDate": date
            }
			database[0]['income'].push(mockData)
            fs.writeFileSync('./database.json', JSON.stringify(database))
			response.end()

		})
	}else if(url == '/expanse' && method == 'POST') {
		let store = ''
		request.on('data', (chunk) => store += chunk)
		request.on('end', () => {
            let purp = ''
            const data = JSON.parse(store)
            for (let i = 0; i < database[0]['purposes'].length; i++) {
                if (database[0]['purposes'][i]?.['purposeId'] == data.purposeId) {
                    purp =  database[0]['purposes'][i]['purpose']
                }
            }
            let mockData = {
                "expanseId": database[0]['expanse'].length+1,
                "expansePurpose": {
                    "purposeId": data?.['purposeId'],
                    "type": "expanse",
                    "purpose": purp
                },
                "expanseAmount": data['amount'],
                "expanseDate": date
            }
			database[0]['expanse'].push(mockData)
            fs.writeFileSync('./database.json', JSON.stringify(database))
			response.end()

		})
	}else if(url == '/income' && method == 'PUT') { 
		let store = ''
		request.on('data', (chunk) => store += chunk)
		request.on('end', () => {
            let purp = 0
            let purpId = 0
            let data = JSON.parse(store)
            
            for(let key in data){
                if (key == 'incomeId') {
                   for (let i = 0; i < database[0]['income'].length; i++) {
                       if (database[0]['income'][i]['incomeId'] == data.incomeId) {
                           purp = i
                       }
                   }
                }else if (key == 'purposeId') {
                    for (let i = 0; i < database[0]['purposes'].length; i++) {
                        if (database[0]['purposes'][i]?.['purposeId'] == data?.['purposeId']) {
                            purpId = i
                            exit
                        }
                    }
                    database[0]['income'][purp]['incomePurpose']['purpose'] = database[0]['purposes'][purpId]['purpose']

                }else{
                    if(database[0]['income'][purp]?.[key]){
                        console.log(database[0]['income'][purp][key]);
                        database[0]['income'][purp][key] = data['amount']
                    }
                    database[0]['income'][purp][key] = data[key]
                }
                
                
            }
            console.log(JSON.stringify(database));
            fs.writeFileSync('./database.json', JSON.stringify(database))
            response.end()
		})
	}else if(url == '/expanse' && method == 'PUT') { 
		let store = ''
		request.on('data', (chunk) => store += chunk)
		request.on('end', () => {
            let purp = 0
            let purpId = 0
            let data = JSON.parse(store)
            
            for(let key in data){
                if (key == 'expanseId') {
                   for (let i = 0; i < database[0]['expanse'].length; i++) {
                       if (database[0]['expanse'][i]['expanseId'] == data.expanseId) {
                           purp = i
                       }
                   }
                }else if (key == 'purposeId') {
                    for (let i = 0; i < database[0]['purposes'].length; i++) {
                        if (database[0]['purposes'][i]?.['purposeId'] == data?.['purposeId']) {
                            purpId = i+1
                            console.log(database[0]['purposes'][purpId]['purpose']);
                            exit
                        }
                    }
                    database[0]['expanse'][purp]['expansePurpose']['purpose'] = database[0]['purposes'][purpId]['purpose']

                }else{
                    if(database[0]['expanse'][purp]?.[key]){
                        console.log(database[0]['expanse'][purp][key]);
                        database[0]['expanse'][purp][key] = data['amount']
                    }
                    database[0]['expanse'][purp][key] = data[key]
                }
                
            }
            console.log(JSON.stringify(database));
            fs.writeFileSync('./database.json', JSON.stringify(database))
            response.end()
		})
	}else if(url == '/income' && method == 'DELETE') { 
		let store = ''
		request.on('data', (chunk) => store += chunk)
		request.on('end', () => {
            try{
                let ind = 0
                let newArr = []
                let data = JSON.parse(store)
                for(let key in data){
                    if (key == 'incomeId') {
                        for (let j = 0; j < database[0]['income'].length; j++) {
                            newArr.push(database[0]['income'][j])
                        }
                        database[0]['income'].length = 0
                        for (let i = 0; i < newArr.length; i++) {
                            if (newArr[i]['incomeId'] != data['incomeId']) {
                                console.log(database[0]['income'], newArr[i]);
                                database[0]['income'].push(newArr[i])
                            }
                        }
                    }else{
                        for (let i = 0; i < database[0]['income'].length; i++) {
                                if(database[0]['income'][i]['incomePurpose'][key] == data[key]){
                                    ind = i
                                }else{
                                    console.log('lor');
                                    newArr.push(database[0]['income'][i])

                                }
                        }
                        console.log(ind);
                        
                        database[0]['income'].length = 0
                        database[0]['income'].push(newArr)
                        console.log(newArr);
                    }
                }
                fs.writeFileSync('./database.json', JSON.stringify(database))
                return response.end()
            }catch(error){
                return console.log(error.message);
            }
		})
	}else if(url == '/expanse' && method == 'DELETE') { 
		let store = ''
		request.on('data', (chunk) => store += chunk)
		request.on('end', () => {
            try{
                let ind = 0
                let newArr = []
                let data = JSON.parse(store)
                for(let key in data){
                    if (key == 'expanseId') {
                        for (let j = 0; j < database[0]['expanse'].length; j++) {
                            newArr.push(database[0]['expanse'][j])
                        }
                        database[0]['expanse'].length = 0
                        for (let i = 0; i < newArr.length; i++) {
                            if (newArr[i]['expanseId'] != data['expanseId']) {
                                console.log(database[0]['expanse'], newArr[i]);
                                database[0]['expanse'].push(newArr[i])
                            }
                        }
                    }else{
                        for (let i = 0; i < database[0]['expanse'].length; i++) {
                                if(database[0]['expanse'][i]['expansePurpose'][key] == data[key]){
                                    ind = i
                                }else{
                                    newArr.push(database[0]['expanse'][i])

                                }
                        }
                        console.log(ind);
                        
                        database[0]['expanse'].length = 0
                        database[0]['expanse'].push(newArr)
                        console.log(newArr);
                    }
                }
                fs.writeFileSync('./database.json', JSON.stringify(database))
                return response.end()
            }catch(error){
                return console.log(error.message);
            }
		})
	}
}

const app = http.createServer(serverFunction)
app.listen(PORT, () => console.log('server is listening on http://localhost:' + PORT))

