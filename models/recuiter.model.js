let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var recruiter = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyName: { type: String, required: true, unique: true }
});

recruiter.pre("save", function(next)
{
    console.log(this);
    this.companyName = this.companyName.charAt(0).toUpperCase()+this.companyName.slice(1).toLowerCase();
    this.password = bcrypt.hashSync(this.password,10);
    next();
});

recruiter.pre("insertMany", function(next)
{
    console.log(this);
    this.companyName = this.companyName.charAt(0).toUpperCase()+this.companyName.slice(1).toLowerCase();
    this.password = bcrypt.hashSync(this.password,10);
    next();
});


var Recruiter = mongoose.model('recruiter',recruiter);
module.exports = Recruiter;