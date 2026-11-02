import { Router, type Request, type Response } from "express";
import { User } from "../models/user.model.ts";

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
    res.json(await User.find());
});

router.post('/new-user', async (req: Request, res: Response) => {
    const data = req.body;

    const newUser = new User(data);
    await newUser.save()
    .then(savedUser => {
        console.log("User Saved Successfully");
        res.status(200).json(savedUser);
    })
    .catch(error => {
        console.error(`[ERROR]: ${error.message}`);
        res.status(400).json({ message: error.message });
    });
});


router.put("/:id", async (req: Request, res: Response) => {
    
    try {
        const id = req.params.id;
        const newData = req.body;

        const response = await User.findByIdAndUpdate(id, newData, { new: true, runValidators: true })
        if(!response) {
            return res.json({ message: "User not found" });
            
        }
        console.log("User Updated Successfully");
        res.status(200).json({ message: "User Updated Successfully" });

    } catch(error) {
        console.error(`[ERROR]: ${error}`);
        res.status(400).json({ message: error });
    }

})

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const response = await User.findByIdAndDelete(id);
        
        if(!response) {
            return res.json({ message: "User not found" });
        }
        console.log("User Deleted Successfully");
        res.status(200).json({ message: "User Deleted Successfully" });
        
    } catch (error) {
        console.error(`[ERROR]: ${error}`);
        res.status(400).json({ message: error });
    }
})