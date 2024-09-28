const router = require('express').Router()
const Accounts = require('./accounts-model')
const ExpressError = require('./expressError')
const mw = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.json(await Accounts.getAll());
  }
  catch(err) {
    next(new ExpressError(err, 500));
  }
})

router.get('/:id', mw.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
    res.status(200).json(req.account);
})

router.post('/', mw.checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const newAccount = await Accounts.create(req.body);
    res.status(201).json(newAccount);
  } catch(err) {
    next(new ExpressError(err, 500));
  }
  
})

router.put('/:id', mw.checkAccountPayload, mw.checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const updateAccount = await Accounts.updateById(req.params.id, req.body);
    res.json(updateAccount);
  } catch(err) {
    next(new ExpressError(err, 500));
  }
});

router.delete('/:id', mw.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    await Accounts.deleteById(req.params.id);
    res.status(204).json({message : `$(id) was deleted successfully.`});
  } catch(err){
    next(new ExpressError(err, 500))
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
