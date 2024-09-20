const { router } = require('../app');
const { getAll, create, getOne, remove, update, verifyUser, login, logged, resetPassword, updatePassword } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const rateLimit = require('express-rate-limit');

const routerUser = express.Router();

// Rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

routerUser.route('/')
  .get(limiter, verifyJWT, getAll)
  .post(create);

routerUser.route('/login')
  .post(login)

routerUser.route('/me')
  .get(limiter, verifyJWT, logged)

routerUser.route('/reset_password')
  .post(resetPassword)


//dynamic routes
routerUser.route("/verify/:code")
  .get(verifyUser)

routerUser.route("/reset_password/:code")
  .post(updatePassword)

routerUser.route('/:id')
  .get(limiter, verifyJWT, getOne)
  .delete(limiter, verifyJWT, remove)
  .put(limiter, verifyJWT, update);

module.exports = routerUser;