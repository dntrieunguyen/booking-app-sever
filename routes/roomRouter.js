import express from 'express';
import RoomModel from '../model/RoomModel.js';

const router = express.Router();
// router.get('/', (req, res) => {
//    res.send('this is room endpoint');
// });

//CREATE
router.post('/', async (req, res) => {
   const newRoom = new RoomModel(req.body);

   try {
      const savedRoom = await newRoom.save();
      res.status(200).json(savedRoom);
   } catch (error) {
      res.status(500).json(error);
   }
});
//UPDATE

router.put('/:id', async (req, res) => {
   try {
      const updatedRoom = await RoomModel.findByIdAndUpdate(
         req.params.id,
         { $set: req.body },
         { new: true },
      );

      res.status(200).json(updatedRoom);
   } catch (error) {
      res.status(500).json(error);
   }
});

//DELETE

router.delete('/:id', async (req, res) => {
   try {
      const updatedRoom = await RoomModel.findByIdAndDelete(req.params.id);
      res.status(200).json(`room with id ${req.params.id} deleted`);
   } catch (error) {
      res.status(500).json(error);
   }
});

//GET

router.get('/:id', async (req, res) => {
   try {
      const room = await RoomModel.findById(req.params.id);
      res.status(200).json(room);
   } catch (error) {
      res.status(500).json(error);
   }
});

//GET ALL

router.get('/', async (req, res) => {
   try {
      const rooms = await RoomModel.find();
      res.status(200).json(rooms);
   } catch (error) {
      res.status(500).json(error);
   }
});

export default router;
