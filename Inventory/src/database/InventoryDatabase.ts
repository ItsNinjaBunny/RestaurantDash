import mysql, { OkPacket, RowDataPacket } from 'mysql2';
import inventory from '../interfaces/Inventory';
import { options } from '../config/config';

const database = mysql.createConnection({
    host: options.host,
    user: options.root,
    password: options.password,
    database: options.database
});

const test = (callback: Function) => {
    // database.query(`INSERT INTO Inventory(name, stock)
    //     VALUES ('carrots', 5)
    // `, err => {
    //     if(err) console.log(err);
    //     console.log('it inserted');
    // });
    database.query(`SELECT * FROM Inventory`, (err, result) => {
        if(err) console.error(err);

        const row = (<RowDataPacket> result);
        const item = row as inventory[];
        return callback(item);
    });
    return null;
}

export default { test };