// const users = require('./routes/users');
const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
// const auth = require('./routes/auth');
const config = require('config');
const cors = require('cors');
// const genre = require('./routes/genres');
const {resumeroute} = require('./routes/resumeroute');

app.use(
    cors({
        origin:"*",
    })
)

require('./startup/prob')(app);

// if(!config.get("jwtPrivateKey")){
//     console.error('Fatal Error: jwtPrivateKey not defined');
//     process.exit(1);
// }


if(!config.get("dbpassword")){
    console.error('Fatal Error: dbpassword not defined');
    process.exit(1);
}

mongoose.connect(`mongodb+srv://sairam:${config.get('dbpassword')}@cluster0.jwa9y.mongodb.net/newdb?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('Connected to MongoDb... ')).catch(err=>console.error('Cannot Connected to Database',err));


// app.use('/api/users',users);
// app.use('/api/auth',auth);
// app.use('/api/genre',genre);
app.use("/doc",resumeroute);


const port = process.env.PORT || 3020;
app.listen(port,()=> console.log(`listening on port ${port}`));