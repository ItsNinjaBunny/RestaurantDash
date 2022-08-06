import mysql, { OkPacket, RowDataPacket } from 'mysql2';
import item from '../interfaces/Item';
import { options } from '../config/config';

const database = mysql.createConnection({
    host: options.host,
    user: options.root,
    password: options.password,
    database: options.database
});

type insertFormat = [string, number][];

const items:insertFormat = [
    [
        'carrots',
        15
    ],
    [
        'broccoli',
        13
    ]
];

const insert = (/*item: item*/) => {
    database.query('drop table if exists 62ee248ed11d291e4164685f');
    database.query(`create table 62ee248ed11d291e4164685f (
        id int primary key not null auto_increment,
        name varchar(20) not null,
        stock int not null
    );`)
    const query = `insert into 62ee248ed11d291e4164685f (name, stock) values ?`;

    database.query(query, [items], err => {
        if(err) console.log(err);
    });
    // `, err => {
    //     if(err) console.error(err);
    //     else {
    //         console.log('inserted');
    //     }
    // })
};

const initTable = (name: string): void => {
    database.query(`drop table if exists ${name}`);
    database.query(`create table ${name}(
        id int primary key not null auto_increment,
        name varchar(20) not null,
        stock int not null
    )`);
}

const getIngredients = (name: string, callback: Function): CallableFunction => {
    let inventory: item[] = [];
    database.query(`select * from ${name}`, (err, results) => {
        if(err) console.error(err);
        else {
            const row = (<RowDataPacket> results);
            inventory = row as item[];
            return callback(inventory);
        }
    });
    return callback(inventory);
}

// const test = (data: inventory_manager, callback: Function): CallableFunction => {
//     // database.query(`INSERT INTO Inventory(name, stock)
//     //     VALUES ('carrots', 5)
//     // `, err => {
//     //     if(err) console.log(err);
//     //     console.log('it inserted');
//     // });
//     let items: inventory_manager[] = [];
//     database.query(`SELECT * FROM Inventory WHERE Restaurant_Id = ${data.restaurant_id}`, (err, result) => {
//         if(err) console.error(err);

//         const row = (<RowDataPacket> result);
//         const inventory = row as inventory_manager;
//         items
//         return callback(data, items);
//     });
//     return callback(items);
// }

export default { insert, initTable, getIngredients };