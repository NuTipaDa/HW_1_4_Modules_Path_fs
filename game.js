const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})


const fs = require('fs')
const path = require('path')


const dir = path.join(__dirname, 'GameResult')
const file = path.join(__dirname, 'GameResult', 'gameresult.log')
const second_file = path.join(__dirname, 'GameResult', 'onlygameresult.log')


function GameResult(file, content) {
    fs.appendFile(file, content.toString(), (err) => {
        if (err) throw Error(err) 
    })
}
function CurrentGameResult(file, content) {
    fs.writeFile(second_file, content.toString(), (err) => {
        if (err) throw Error(err) 
    })
}


let game_count = 1
let won_count = 1
let defeat_count = 1
let won_defeat = won_count % defeat_count


function EagleAndTalis() {
    let eagle_talis = [0, 1]

    let user_choice = readline.question("[Орел или решка (0 - Орел, 1 - Решка), для выхода из игры введите 'q']? \n", user_choice => {
        
        console.log(`\nИгра №${game_count}`)
        let programm_choice = [Math.floor(Math.random() * (eagle_talis).length)]
        
        let content = [`\n\nПартия №${game_count}\n`, `Выбрал: ${user_choice}`, ` Выпала: ${programm_choice} \n\n`].join('')

        if(eagle_talis[programm_choice] == user_choice) {
            console.log(' Вы выиграли :)', '\n', 'Число побед: ' + `${won_count++}\n`, 'Число игр: ' + `${game_count++}\n`)
            GameResult(file, content)
            EagleAndTalis()
        }

        else { 
            console.log(' Вы проиграли :(', '\n', 'Число поражений: ' + `${defeat_count++}\n`, 'Число игр: ' + `${game_count++}\n`)
            GameResult(file, content)
            EagleAndTalis()
        }

        if(user_choice === 'q') { 
            readline.close()
            console.log('\n Вы вышли из игры \n')
            let endGameResult = [`\n\n ###Итог###`, `\nКоличество сыгранных партий: ${game_count-2}\n`, 
                `Количество выигранных партий: ${won_count-1}\n`, 
                `Количество проигранных партий: ${defeat_count-2}\n`, 
                `Процентное соотношение (победа/поражение): ${((won_count - 1) / (game_count-2) * 100)}% \n\n`]
                .join('')
            GameResult(file, endGameResult)
            CurrentGameResult(second_file, endGameResult)

            const readerStream = fs.createReadStream(second_file)
            let data
            readerStream
            .setEncoding('UTF8')
            .on('data', (chank) => {
                data += chank
            })
            .on('end', () => {
                console.log('end', data)
            })
        }
    })
}
EagleAndTalis()