import HotelModel from '../model/HotelModel.js';
import { createError } from '../utils/error.js';

//CREATE
export const createHotel = async (req, res, next) => {
   const newHotel = new HotelModel(req.body);
   try {
      const savedHotel = await newHotel.save();
      res.status(200).json(savedHotel);
   } catch (err) {
      next(err);
   }
};

//UPDATE

export const updateHotel = async (req, res, next) => {
   try {
      const updatedHotel = await HotelModel.findByIdAndUpdate(
         req.params.id,
         { $set: req.body },
         { new: true },
      );
      res.status(200).json(updatedHotel);
   } catch (err) {
      next(err);
   }
};

//DELETE
export const deleteHotel = async (req, res, next) => {
   try {
      const updatedHotel = await HotelModel.findByIdAndDelete(req.params.id);
      res.status(200).json(`Hotel with id ${req.params.id} deleted`);
   } catch (err) {
      next(err);
   }
};

//GET
export const getHotel = async (req, res, next) => {
   try {
      const hotel = await HotelModel.findById(req.params.id);
      res.status(200).json(hotel);
   } catch (err) {
      next(err);
   }
};

//GET ALL
export const getAllHotel = async (req, res, next) => {
   try {
      const allHotel = await HotelModel.find();
      res.status(200).json(allHotel);
   } catch (err) {
      next(err);
   }
};
