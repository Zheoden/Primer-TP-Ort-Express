import { Router } from 'express';

const router = Router();

router.get('', async (req, res) => {
    console.log(`This is a get operation`);

    return res.status(200).json();
});

router.post('', async (req, res) => {
    console.log(`Request Data: ${req.body}`)
    console.log(`This is a post operation`);

    return res.status(200).json();
});

export default router;
