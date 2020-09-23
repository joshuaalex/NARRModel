
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Profile = new Schema({
    personalInfo : {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        userType: { type: String, enum: ['student', 'staff', 'institution'], default: 'student' }, //admin, registered
        fname: { type: String, required: true },
        lname: { type: String, required: true },
        fullName: { type: String, default: '' },
        age: { type: String},
        address: { type: String},
        phoneNum: { type: String},
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    institutionInfo : {
        institutionName : { type: String},
        department : { type: String},
        course : { type: String },
        level : { type: Number},
        registrationNum : { type: String},
        institutionName : { type: String},

    },
    researchWork : {
        personalResearch: [ {
            title: { type: String },
            year: { type: String },
            author: { type: String},
            isbn: { type: Number }
        }],
        paperRead: [{
            title: { type: String},
            currentPage : { type: String}
        }]

    },
    researchAnalysis : {
        mentions: [{
            name: { type: String, required: true },
            researchTitle: { type: String, required: true }
        }],

    }
});


Profile.pre('save', function (next) {
    let me = this;
    me.fullName = me.fname + ', ' + me.lname;
    const salt = bcrypt.genSaltSync();
    bcrypt.hash(me.password, salt, (err, encrypted) => {
        if (err) {
            console.log("Bcrypt User Model Password encryption Error", err);
            next();
        } else {
            me.password = encrypted;
            next();
        }
    });
});


module.exports = mongoose.model('profile', Profile);