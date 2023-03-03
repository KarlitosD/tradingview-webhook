export const logs = (text) => {
    connection.query(`INSERT INTO log (log) values ('${text}')`)
    process.stdout.write(util.format(text) + '\n')
}
