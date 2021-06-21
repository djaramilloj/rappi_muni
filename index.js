let fs = require('fs'); 
let parse = require('csv-parse');
const hourBreak = 21;
let orderIdArray = [];
let ordeRINFOLIST = [];

let parser = parse({columns: true}, function (err, records) {
    records.forEach(element => {
        if (!orderIdArray.includes(element.order_id)){
            orderIdArray.push(element.order_id);
            ordeRINFOLIST.push(element);
        };
    });
    const result = ordeRINFOLIST.map(item => parseInt(item.created_at.split(' ')[1].split(':')[0]));  
    const afterBreak = result.filter(item => hourBreak <= item);
    const beforeBreak = result.filter(item => hourBreak > item);
    console.log({
        'Before 9pm': beforeBreak.length,
        'after 9pm': afterBreak.length
    })
})

fs.createReadStream(__dirname+'/partner_10111_607799151.csv').pipe(parser);
