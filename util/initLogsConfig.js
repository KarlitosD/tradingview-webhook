import util from'util'
import mysql from 'mysql2'
 
let connection
export const initConection = (configConnection) => {
    connection = mysql.createConnection({...configConnection})
    connection.query('create table IF NOT EXISTS log (id int not null auto_increment primary key, log varchar(255) not null, time Date default(CURRENT_DATE))')
}

export const logs = (text) => {
    connection.query(`INSERT INTO log (log) values ('${text}')`)
    process.stdout.write(util.format(text) + '\n')
}