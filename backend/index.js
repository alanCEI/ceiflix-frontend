import express from 'express';
import cors from 'cors';
import { errorMiddleware, notFoundHandler } from './middleware/error.midddleware.js';
import { connectDB } from './db/mongoose.js';
import movieRouter from './routes/movies.routes.js';
import userRouter from './routes/users.routes.js';

const app = express();


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));


connectDB();
app.get("/", (req, res) => {
    res.send('Welcome to CEIFLiX API - A web app to discover and track movies.')
})

app.use('/movies', movieRouter);
app.use('/user', userRouter);


app.use(notFoundHandler);
app.use(errorMiddleware);

app.listen(3001, () => {
    console.log('Listening in port 3001')
})