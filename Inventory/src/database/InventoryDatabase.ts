import mysql, { OkPacket, RowDataPacket } from 'mysql2';
import item from '../interfaces/Item';
import { insert } from '../interfaces/Insert';
import { options } from '../config/config';

const database = mysql.createConnection({
    host: options.host,
    user: options.root,
    password: options.password,
    database: options.database
});

// type insert = [string, number][];

const items:insert = [
    [
        'carrots',
        65
    ],
    [
        'broccoli',
        16
    ]
];


const update = (table: string, inventory: insert) => {
    database.query(`drop table if exists ${table}`);
    database.query(`create table ${table}(
        id int primary key not null auto_increment,
        name varchar(20) not null,
        stock int not null
    )`);
    const query = `insert into ${table} (name, stock) values ?`;
    database.query(query, [inventory]);
}

// const insert = (/*item: item*/) => {
//     database.query('drop table if exists 62eeb584ca61f3f3bfd7b992');
//     database.query(`create table 62eeb584ca61f3f3bfd7b992 (
//         id int primary key not null auto_increment,
//         name varchar(20) not null,
//         stock int not null
//     );`)
//     const query = `insert into 62eeb584ca61f3f3bfd7b992 (name, stock) values ?`;

//     // database.query(query, [items], err => {
//         if(err) console.log(err);
//     });
//     // `, err => {
//     //     if(err) console.error(err);
//     //     else {
//     //         console.log('inserted');
//     //     }
//     // })
// };

const initTable = (name: string): void => {
    console.log(name);
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

export default { /*insert,*/ initTable, getIngredients, update,  };