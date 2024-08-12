import express from "express";
import cors from cors;
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./database.js";



dotenv.config();

app.use(cors({origin: '*'}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/sell', router);
app.use(express.json())

const startServer = async () => {
    const PORT = process.env.PORT || 6000;
    connectDB();
    try {
        server.listen(PORT, () => {
            console.log(`APP IS RUNNING ON PORT: ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();

app.get('/', (req, res) => {
     res.send('API IS RUNNING');
});