const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const jobRouter = require('./routes/job');
const bookmarkRouter = require('./routes/bookmark');

dotenv.config();
const app = express();
mongoose.connect(process.env.MONGOURL).then(() => console.log('db conned')).catch((e) => console.log('error in connecting db', e));




app.use(express.json());
app.use('/api/v1/', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/job', jobRouter);
app.use('/api/v1/bookmark', bookmarkRouter);

app.listen(process.env.PORT || 5001, console.log(`job app listening to the port ${process.env.PORT}`));

