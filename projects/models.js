'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const imagePath = "images/planning.svg"

const ProjectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    default: Date.now(),
    required: true
  },
  imageUrl: {
    type: String,
    default: imagePath },
  description: {
    type: String, 
    required: true
  },
  additionalNotes: [String],
  paidProject: { 
    type: Boolean,
    default: false
  },
  client: {type: String},
  paymentAmount: {
    type: Number,
    default: 0
   },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
});

// ProjectSchema.virtual('defaultImage').get(function() {
//   return `${this.dueDate}.toDateString()`;
// });

ProjectSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    dueDate: this.dueDate.toDateString() || Date.now().toDateString(),
    imageUrl: this.imageUrl || imagePath,
    description: this.description,
    additionalNotes: this.additionalNotes,
    paidProject: this.paidProject,
    client: this.client,
    paymentAmount: this.paymentAmount,
    completed: this.completed
  };
};



ProjectSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

ProjectSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const Projects = mongoose.model('Project', ProjectSchema);

module.exports = {Projects};
