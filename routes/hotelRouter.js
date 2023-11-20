import express from 'express';
import HotelModel from '../model/HotelModel.js';

const router = express.Router();

//CREATE

router.post('/', async (req, res) => {
   const newHotel = new HotelModel(req.body);

   try {
      const savedHotel = await newHotel.save();
      res.status(200).json(savedHotel);
   } catch (error) {
      // console.log(error)
      res.status(500).json(error);
   }
});

//UPDATE

router.put('/:id', async (req, res) => {
   try {
      const updatedHotel = await HotelModel.findByIdAndUpdate(
         req.params.id,
         { $set: req.body },
         { new: true },
      );

      res.status(200).json(updatedHotel);
   } catch (error) {
      res.status(500).json(error);
   }
});

//DELETE

router.delete('/:id', async (req, res) => {
   try {
      const updatedHotel = await HotelModel.findByIdAndDelete(req.params.id);
      res.status(200).json(`Hotel with id ${req.params.id} deleted`);
   } catch (error) {
      res.status(500).json(error);
   }
});

//GET

router.get('/:id', async (req, res) => {
   try {
      const hotel = await HotelModel.findById(req.params.id);
      res.status(200).json(hotel);
   } catch (error) {
      res.status(500).json(error);
   }
});

//GET ALL

router.get('/', async (req, res) => {
   try {
      const allHotel = await HotelModel.find();
      res.status(200).json(allHotel);
   } catch (error) {
      res.status(200).json(error);
   }
});

export default router;
