const jwt = require('jsonwebtoken');


const users = require('../model/user');
//const user_task = require('../model/user_task');
const taskAsked = [];

function login(req, res) {
  console.log(req.body);
  var loger = req.body;
  users.login(loger, function (err, token) {

    if (err) {
      res.send(err);
    }
    else {
      res.send(token);
    }
  });
};
function createuser(req, res) {
  var new_user_info = new users(req.body);
  users.check_user_avaliabilty(new_user_info, function (err, result) {
    if (result[0]) {
      res.json({ message: 'username is taken' });

    }

    else {

      users.saveuser(new_user_info, function (err, result) {
        if (err) {
          res.send(err);
        }
        else {
          res.json({ message: 'user added' });
        }
      });

    }

  });
};
function checkTokenSetUser(req, res, next) {
  const authHeader = req.get('authorization');
  if (!authHeader) {
    unAuthorized(res, next);
  } else {
    const token = authHeader.split(' ')[1];
    if (!token) {
      unAuthorized(res, next);
    }
    else {
      var user = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = user;
      next();
    }
  }
}

function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    unAuthorized(res, next);
  }
}



const validateUser = (defaultErrorMessage = '') => (req, res, next) => {
  const result = schema.validate(req.body);
  if (!result.error) {
    next();
  } else {
    const error = defaultErrorMessage ? new Error(defaultErrorMessage) : result.error;
    res.status(422);
    next(error);
  }
};
function ismuch(req, res, next) {
  if (req.user.type === 'admin') {
    next();
  } else {
    unAuthorized(res, next);
  }
}
function isuser(req, res, next) {
  if (req.user.type === 'user') {
    next();
  } else {
    unAuthorized(res, next);
  }
}
function isreception(req, res, next) {
  if (req.user.type === 'reception') {
    next();
  } else {
    unAuthorized(res, next);
  }
}
function issuperadmin(req, res, next) {
  if (req.user.type === 'superadmin') {
    next();
  } else {
    unAuthorized(res, next);
  }
}
function unAuthorized(res, next) {
  const error = new Error('🚫 Un-Authorized 🚫');
  res.status(401);
  next(error);
}


module.exports = {
  checkTokenSetUser,
  isLoggedIn,
  createuser,
  unAuthorized,
  validateUser,
  login,
};
