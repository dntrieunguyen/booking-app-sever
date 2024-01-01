import express from 'express';
import Room from '../model/Room.js';

const router = express.Router();
// router.get('/', (req, res) => {
//    res.send('this is room endpoint');
// });

//CREATE
router.post('/', async (req, res) => {});
//UPDATE

router.put('/:id', async (req, res) => {});

//DELETE

router.delete('/delete/:id', async (req, res) => {});

//GET

router.get('/find/:id', async (req, res) => {});

//GET ALL

router.get('/', async (req, res) => {});

export default router;
