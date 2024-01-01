import Hotel from '../model/Hotel.js';
import { STATUS_CODE } from '../utils/STATUS_CODE.js';
import { createError } from '../utils/error.js';

//CREATE
export const createHotel = async (req, res, next) => {
   const newHotel = new Hotel(req.body);
   try {
      const savedHotel = await newHotel.save();
      res.status(STATUS_CODE.OK).json(savedHotel);
   } catch (err) {
      next(err);
   }
};

//UPDATE

export const updateHotel = async (req, res, next) => {
   try {
      const updatedHotel = await Hotel.findByIdAndUpdate(
         req.params.id,
         { $set: req.body },
         { new: true },
      );
      res.status(STATUS_CODE.OK).json(updatedHotel);
   } catch (err) {
      next(err);
   }
};

//DELETE
export const deleteHotel = async (req, res, next) => {
   try {
      const updatedHotel = await Hotel.findByIdAndDelete(req.params.id);
      res.status(STATUS_CODE.OK).json(`Hotel with id ${req.params.id} deleted`);
   } catch (err) {
      next(err);
   }
};

//GET
export const getHotel = async (req, res, next) => {
   try {
      const hotel = await Hotel.findById(req.params.id);
      res.status(STATUS_CODE.OK).json(hotel);
   } catch (err) {
      next(err);
   }
};

//GET ALL
export const getAllHotel = async (req, res, next) => {
   try {
      const allHotel = await Hotel.find();
      res.status(STATUS_CODE.OK).json(allHotel);
   } catch (err) {
      next(err);
   }
};
