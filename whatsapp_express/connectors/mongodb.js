const mongoose = require('mongoose');

const databaseURL = process.env.MONGO_DB;
mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected');
});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose;
