import { Router } from 'express';

const authRouter = Router();

authRouter.post('/', (req,res) => {
    const { username } = req.body
    res.cookie('session', username, {
        httpOnly: true,
        secure: false, 
    });
    res.json({ success: true })
})

export default authRouter;