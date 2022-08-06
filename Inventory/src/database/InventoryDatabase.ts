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
    database.query('drop table if exists 62ed819b6519eb8f1a7a1e11');
    database.query(`create table 62ed819b6519eb8f1a7a1e11 (
        id int primary key not null auto_increment,
        name varchar(20) not null,
        stock int not null
    );`)
    const query = `insert into 62ed819b6519eb8f1a7a1e11 (name, stock) values ?`;

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
    console.log('done');
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

export default { /*test,*/ insert, initTable,  };