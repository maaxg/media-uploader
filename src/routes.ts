import {Router} from 'express';
import multer from 'multer';
import {upload} from './config/multer';
import { MediaServiceImpl } from './service/media-service-impl';
const router = Router();

router.get('/', (req, res) => {
    res.send('Welcome :)');
});

router.post('/media', async (req, res) => {
    upload(req, res, async (err) => {
        const { file } = req;
        if(err instanceof multer.MulterError)
            res.status(400).json(err);
        const isSaved = await new MediaServiceImpl().save(file?.originalname, file?.location);
    
        if (isSaved) return res.json({location: file?.location}).status(201);
        else res.status(400).send();
    });
});

export default router;