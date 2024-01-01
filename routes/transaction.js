import express from 'express';
import Transaction from '../model/Transaction.js';

const router = express.Router();

// router.get('/', (req, res) => {
//    res.send('this is endpoint of transaction');
// });

//Create
router.post('/', async (req, res) => {});

//Update

router.put('/:id', async (req, res) => {});

//Delete
router.delete('/:id', async (req, res) => {});
//Get

router.get('/:id', async (req, res) => {});

//Get all
router.get('/', async (req, res) => {});

export default router;
