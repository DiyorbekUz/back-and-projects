const readline = require('readline')

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

let questions = require('./questions')
let reqAns = ['A', 'B', 'C', 'D']

let trueAns = 0
let falseAns = 0
let answers = [
	{
		savollar: 0,
		trueAnswers: 0,
		falseAnswers: 0
	}
]
let count = 0

function recursive (question, variant) {
  rl.question(`${count+1}. ${question} \n A: ${variant.A} \n B: ${variant.B} \n C: ${variant.C} \n D: ${variant.D} \n Javobingiz: `, (data) => {
    if(!data) return recursive(questions[count].question, questions[count].answers)
	if (!reqAns.includes(data.toUpperCase())) {
		return recursive(questions[count].question, questions[count].answers)
	}
    answers[0] = answers[0] || {} 
	answers[0].savollar = count+1

	if (data.toUpperCase() == questions[count].trueAnswer) {
		trueAns++
		answers[0].trueAnswers = trueAns
	}else{
		falseAns++
		answers[0].falseAnswers = falseAns
	}
    

    if(count >= questions.length - 1) {
		
		console.table(answers)
		return rl.close()
    }
    count++
    return recursive(questions[count].question, questions[count].answers)
    
  })
}

recursive(questions[count].question, questions[count].answers)