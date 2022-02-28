let questions = [
	{
        question: 'O\'zbekistonning poytaxti: ',
        answers: {
            A: 'Toshkent',
            B: 'Samarqand',
            C: 'London',
            D: 'Washington'
        },
        trueAnswer: 'A'
    },
    {
        question: 'Namangan qayerda joylashgan :): ',
        answers: {
            A: 'America',
            B: 'Uzbekistan',
            C: 'Australiya',
            D: 'To\'g\'ri javob yo\'q'
        },
        trueAnswer: 'B'
    },
    {
        question: 'Node Js nima?: ',
        answers: {
            A: 'FrameWork',
            B: 'Dasturlash tili',
            C: 'HTML ni boshqa bir varianti',
            D: 'Platforma'
        },
        trueAnswer: 'D'
    },
    {
        question: 'Najot Ta\'lim necha yoshda?: ',
        answers: {
            A: '3',
            B: '2',
            C: '1',
            D: '4'
        },
        trueAnswer: 'A'
    },
    {
        question: 'Osmondagi bolalar loyihasi necha yoshda?: ',
        answers: {
            A: '3',
            B: '2',
            C: '1',
            D: '4'
        },
        trueAnswer: 'C'
    },
    {
        question: 'Americaning poytaxti: ',
        answers: {
            A: 'Toshkent',
            B: 'Samarqand',
            C: 'London',
            D: 'Washington'
        },
        trueAnswer: 'D'
    },
    {
        question: 'Vatikaning poytaxti: ',
        answers: {
            A: 'Ulambator',
            B: 'antaliya',
            C: 'Vatikan',
            D: 'London'
        },
        trueAnswer: 'C'
    },
    {
        question: 'Javascript nech kunda yozilib ommaga taqdim etilgan: ',
        answers: {
            A: '10kun',
            B: '20kun',
            C: '30kun',
            D: '40kun'
        },
        trueAnswer: 'A'
    },
    {
        question: 'Silicon vodiysi qayerda: ',
        answers: {
            A: 'Angliya',
            B: 'America',
            C: 'Italiya',
            D: 'Gurziya'
        },
        trueAnswer: 'B'
    },
    {
        question: 'Registon qayerda joylashgan: ',
        answers: {
            A: 'Andijon',
            B: 'Buxoro',
            C: 'Xorazm',
            D: 'Samarqand'
        },
        trueAnswer: 'D'
    },
]
questions.sort(() => (Math.random() > .5) ? 1 : -1)
module.exports = questions