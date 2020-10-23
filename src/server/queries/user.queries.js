//INSERT QUERY
const insertUserQuery = (username, password) => {
    return `INSERT INTO Users(user_username, user_password) VALUES ('${username}', '${password}')`
}

//SELECT QUERY
const selectUserQuery = (username) => {
    return `SELECT * FROM Users WHERE user_username = '${username}'`
}

//SEARCH QUERY
const searchUserQuery = (id) => {
    return`SELECT * FROM Users WHERE idUser = '${id}'`
}

module.exports = {
    insertUserQuery,
    selectUserQuery,
    searchUserQuery
}