import express, { Request, Response, NextFunction } from "express";
import { PORT } from "./config";
import sampleRouter from "./routes/sample.router"
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json())

app.use("/samples", sampleRouter)


// middleware error 
app.use((err:Error , req: Request , res: Response ,next: NextFunction) => {
    res.status(400).send(err.message)
})

app.listen(PORT, () => {
  console.log(`server running on PORT : ${PORT}`);
});
