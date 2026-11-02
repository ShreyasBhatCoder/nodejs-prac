import { Router, type Request, type Response } from "express";
import { Person } from "../models/person.model.ts";

export const router = Router();

router.get('/', async(req: Request, res: Response) => {
    res.json(await Person.find());
    // res.json(await db.collection("persons").find().toArray());
});


router.get("/:gender", async (req: Request, res: Response) => {
    const gender = req.params.gender as string;

    let genderList;
    if(gender === "Male" || gender === "Female") {
        genderList = await Person.find({ gender: gender });
    }
    res.json(genderList);
});


router.post('/', async (req: Request, res: Response) => {
    const data = req.body;

    const personIdList = await Person.find().select("id");
    let lastId = Math.max(...personIdList.map(personId => personId.id), 0);
    data.id = lastId + 1;
    
    const newPerson = new Person(data);
    await newPerson.save()
    .then(savedPerson => {
        console.log(`[New Person]: id = ${savedPerson.id}`);
        res.status(200).json(savedPerson);
    })
    .catch(error => {
        console.error(`[ERROR]: ${error.message}`);
        res.status(400).json({ message: error.message });
    });
});