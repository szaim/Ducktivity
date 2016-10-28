var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserBoard = new mongoose.Schema({

  googleID: { type: String, index: true },
  accessToken: {
      type: String,
      required: true
  },
  fullName: {
    type: String
  },
  categories: [{type: Schema.Types.ObjectId, ref: 'Category'}],
  userType: {
  	type: String,
  	Default: "Project Manager"
  },
  email:{
  	type: String
  },
  avatar: {
  	type: String
  }
 });

var User = mongoose.model('User', UserBoard);

module.exports = User;