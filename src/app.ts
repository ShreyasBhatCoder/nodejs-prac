import express, { type Request, type Response, type Express } from "express";
import { env } from "../env.ts";
import { db } from "./db.ts";
import { Person } from "../models/person.model.ts";
import { User } from "../models/user.model.ts";
import bodyParser from "body-parser"
import { router as personRouter } from "../routers/person.routes.ts";
import { router as userRouter } from "../routers/user.routes.ts";

const app: Express = express();
const port = env.PORT;

app.use(express.json());
app.use('/person', personRouter);
app.use("/user", userRouter);

app.get("/movies", async (req: Request, res: Response) => {
    res.json(await db.collection("movies").find().limit(5).toArray());
});


// app.get("/test/:id", (req: Request, res: Response) => {
//     const id = parseInt(req.params.id as string);

//     res.json({id});
// })



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
})