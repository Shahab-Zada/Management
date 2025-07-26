

const mongoose = require('mongoose');

const dbconnect = async () => {
    const mongoURL = 'mongodb+srv://shahabzada302:B5BRwGiyK3jqpdfA@cluster0.gqjytln.mongodb.net/myDatabase?retryWrites=true&w=majority';
    try {
        await mongoose.connect(mongoURL);
        console.log('Database connected successfully');
    } catch (error) { 
        console.error('Database connection failed:', error); }
};

module.exports = dbconnect;
