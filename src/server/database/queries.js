module.exports = {
    Insert(table, headers, data) {
        return `INSERT INTO ${table}(${headers}) values (${data.map(string => { return "'" + string + "'"})})`
    }
}