const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    handle: { //??????????
        type: String,
        required: true,
        max: 40
    },
    company: String,
    website: String,
    location: String,
    status: { //select career option
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: String,
    github_username: String,
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String, 
                required: true
            },
            field: {
                type: String,
                required: true
            }
        }
    ],
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: String,
            from: {
                type: Date,
                required: true
            },
            to: Date,
            current: {
                type: Boolean,
                default: false
            },
            description: String
        }
    ],
    social: {
        linkedin: String,
        facebook: String,
        twitter: String,
        instagram: String,
        youtube: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;