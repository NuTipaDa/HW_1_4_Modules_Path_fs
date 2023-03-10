const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, 'GameResult')
const file = path.join(__dirname, 'GameResult', 'gameresult.log')
const second_file = path.join(__dirname, 'GameResult', 'onlygameresult.log')

fs.stat("GameResult", function(err, stats) {
    if (err) {
        console.log("Директория " + `${dir}` + " не найдена");
        fs.mkdir(dir, (err) => {
            if (err) throw Error(err) 
            console.log('Директория: ' + `${dir}` + ' успешно создана')
        })
        fs.createWriteStream(file, (err) => {
            if (err) throw Error(err) 
            console.log('Файл ' + `${file}` + ' успешно создан')
        })
        fs.createWriteStream(second_file, (err) => {
            if (err) throw Error(err) 
            console.log('Файл ' + `${second_file}` + ' успешно создан')
        })
    } else {
        console.log('Папка найдена ' + `${dir}`);
        fs.createWriteStream(file, (err) => {
            if (err) throw Error(err) 
            console.log('Файл ' + `${file}` + ' успешно создан')
        })
        fs.createWriteStream(second_file, (err) => {
            if (err) throw Error(err) 
            console.log('Файл ' + `${second_file}` + ' успешно создан')
        })
    }
});
