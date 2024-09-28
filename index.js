const server = require("./api/server.js");
const accountsRoutes = require('./api/accounts/accounts-router')

const PORT = process.env.PORT || 5000;

server.use('/api/accounts', accountsRoutes)

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
