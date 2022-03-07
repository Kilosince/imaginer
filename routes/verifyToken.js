const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // check header or url parameters or post parameters for token
  const token = req.body['this-token'] || req.query['this-token'] || req.headers['this-token'];

  if(!token) return res.status(401).send('Oh no, baby. What is you doing?')

  try{
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}

/*const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('this-token');
  // check header or url parameters or post parameters for token

  if(!token) return res.status(401).send('Oh no, baby. What is you doing?')

  try{
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}
*/
