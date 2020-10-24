//SELECT QUERY
const selectAllStatesQuery = () => {
    return `SELECT * FROM Vehicle_States ORDER BY idState`
};

module.exports = {
    selectAllStatesQuery
}