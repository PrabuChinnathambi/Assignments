const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser');

const fileUploaderRouter = require('./routes/fileUploadRouter');
const userRouter = require('./routes/loginRouter');
const app = express();
const port = process.env.PORT || 8080;

require('./database')();


app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', userRouter.routes);
app.use('/api', fileUploaderRouter.routes);



app.listen(port, () => console.log(`Server is listening on ${port}`));


