import express from 'express';
import Transaction from '../model/Transaction.js';

const router = express.Router();

// router.get('/', (req, res) => {
//    res.send('this is endpoint of transaction');
// });

//Create
router.post('/', async (req, res) => {
   const newTransaction = new Transaction(req.body);
   try {
      const savedTransaction = await newTransaction.save();
      res.status(200).json(savedTransaction);
   } catch (error) {
      res.status(500).json(error);
   }
});

//Update

router.put('/:id', async (req, res) => {
   try {
      const updatedTransaction = await Transaction.findByIdAndUpdate(
         req.params.id,
         { $set: req.body },
         { new: true },
      );
      res.status(200).json(updatedTransaction);
   } catch (error) {
      res.status(500).json(error);
   }
});

//Delete
router.delete('/:id', async (req, res) => {
   try {
      const updatedTransaction = await Transaction.findByIdAndDelete(
         req.params.id,
      );
      res.status(200).json(`Transaction with id ${req.params.id} deleted`);
   } catch (error) {
      res.status(500).json(error);
   }
});
//Get

router.get('/:id', async (req, res) => {
   try {
      const transaction = await Transaction.findById(req.params.id);
      res.status(200).json(transaction);
   } catch (error) {
      res.status(500).json(error);
   }
});

//Get all
router.get('/', async (req, res) => {
   try {
      const transactions = await Transaction.find();
      res.status(200).json(transactions);
   } catch (error) {
      res.status(500).json(error);
   }
});

export default router;