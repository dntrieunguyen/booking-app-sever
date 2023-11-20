import HotelModel from '../model/HotelModel.js';

//CREATE
export const createHotel = async (req, res) => {
   const newHotel = new HotelModel(req.body);
   try {
      const savedHotel = await newHotel.save();
      res.status(200).json(savedHotel);
   } catch (error) {
      res.status(500).json(error);
   }
};

//UPDATE

export const updateHotel = async (req, res) => {
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
};

//DELETE
export const deleteHotel = async (req, res) => {
   try {
      const updatedHotel = await HotelModel.findByIdAndDelete(req.params.id);
      res.status(200).json(`Hotel with id ${req.params.id} deleted`);
   } catch (error) {
      res.status(500).json(error);
   }
};

//GET
export const getHotel = async (req, res) => {
   try {
      const hotel = await HotelModel.findById(req.params.id);
      res.status(200).json(hotel);
   } catch (error) {
      res.status(500).json(error);
   }
};

//GET ALL
export const getAllHotel = async (req, res) => {
   try {
      const allHotel = await HotelModel.find();
      res.status(200).json(allHotel);
   } catch (error) {
      res.status(200).json(error);
   }
};
