import {Router} from 'express';
let router = Router();
import {getSuggestedLines} from '../services/PlayService';

router.get('/lines', async (req, res, next) => {
    let { q: searchTxt } = req.query;
    searchTxt = searchTxt.trim();
    try {
        let results = await getSuggestedLines(searchTxt);
        res.data = results;
        next();
    } catch (e) {
        next(e);
    }
});

export default router;