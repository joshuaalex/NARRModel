
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
        age: { type: String, required: true},
        address: { type: String, required: true},
        phoneNum: { type: String, required: true},
        phoneNum: { type: String, required: true},
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    institutionInfo : {
        institutionName : { type: String, require: true },
        department : { type: String, require: true },
        course : { type: String, require: true },
        level : { type: Number, require: true },
        registrationNum : { type: String, require: true },
        institutionName : { type: String, require: true },

    },
    researchWork : {
        personalResearch: [ {
            title: { type: String, required: true },
            year: { type: String, required: true },
            author: { type: String, required: true },
            isbn: { type: Number, required: true }
        }],
        paperRead: [{
            title: { type: String, required: true },
            currentPage : { type: String, required: true }
        }]

    },
    researchAnalysis : {
        mentions: [{
            name: { type: String, required: true },
            researchTitle: { type: String, required: true }
        }],

    }
});


UserSchema.pre('save', function (next) {
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