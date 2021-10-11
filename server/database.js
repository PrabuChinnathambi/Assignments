const mongoose = require('mongoose');


module.exports = () => {
    mongoose.connect('mongodb+srv://Assignments:Assignments@cluster0.pte5o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedtopology: true,
    }).then(() => console.log('DB connected successfully!!!'));
}