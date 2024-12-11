const knex = require('../../db');

const getAllContracts = () => {
    return knex('contracts').select('*').where({ isDeleted: false });
}

module.exports = { getAllContracts };