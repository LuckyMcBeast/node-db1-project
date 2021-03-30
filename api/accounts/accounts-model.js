const db = require('../../data/db-config.js')

const getAll = async () => {
  // DO YOUR MAGIC
  return await db('accounts');
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts').where({id})
}

const create = async account => {
  // DO YOUR MAGIC
  return await db('accounts').insert(account)
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  return await db('accounts').update(account).where({id});

}

const deleteById = async id => {
  // DO YOUR MAGIC
  return await db('accounts').del().where({ id })
}

const checkName = async name => {
  return await db('accounts').where({name});
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  checkName
}
