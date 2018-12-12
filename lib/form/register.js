'use strict'

var form = require('express-form')
var field = form.field

module.exports = form(
  field('registerForm.username')
    .required()
    .is(/^[\da-zA-Z\-_.]+$/),
  field('registerForm.name').required(),
  field('registerForm.email').required(),
  field('registerForm.password')
    .required()
    .is(/^[\x20-\x7F]{6,}$/),
  field('registerForm.googleId'),
  field('registerForm.githubId'),
  field('registerForm.socialImage'),
)
