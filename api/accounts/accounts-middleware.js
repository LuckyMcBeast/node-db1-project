const Accounts = require('./accounts-model.js');
const ExpressError = require('./expressError.js');
const db = require('../../data/db-config.js')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const newAccount = req.body;
  if (!newAccount.name && !newAccount.budget) {
    next(new ExpressError('Must include both name and budget', 400));
  }
  else {
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.name) {
    next(new ExpressError('No Name Provided', 400));
  }
  try {
    const doesNameExist = await Accounts.checkName(req.body.name);
    console.log(doesNameExist[0].id);
    console.log(req.params);
    console.log(req.body);
    console.log(req.params);
    console.log(doesNameExist[0].id != req.params.id);
    if (doesNameExist[0].id !== req.params.id) {
      next(new ExpressError('Account name already in use.', 406));
    }
    next()
  } catch (err) {
    next()
  }
}
exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Accounts.getById(req.params.id);
    if (account) {
      req.account = account;
      next();
    } else {
      next(new ExpressError('Account ID not Found', 404));
    }
  }
  catch (err) {
    next(new ExpressError(err, 500))
  }
}
