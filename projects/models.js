'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const ProjectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  dueDate: {
    type: Date,
    default: Date.now(),
    required: true
  },
  imageUrl: {type: String},
  description: {
    type: String, 
    required: true
  },
  additionalNotes: {type: String},
  paidProject: { type: Boolean},
  client: {type: String},
  paymentAmount: {type: Number}
});

ProjectSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || ''
  };
};

ProjectSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

ProjectSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const Project = mongoose.model('Project', ProjectSchema);

module.exports = {Project};
