const tourModel = require('../models/tours.model');

const createTour = async (req, res) => {
    const tourData = req.body;
    const tourId = await tourModel.createTour(tourData);
    res.status(201).json({ tourId });
}   

const getTourById = async (req, res) => {
    const tourId = req.params.id;
    const tour = await tourModel.getTourById(tourId);
    res.status(200).json(tour);
}       

const updateTour = async (req, res) => {
    const tourId = req.params.id;
    const tourData = req.body;
    const updatedTour = await tourModel.updateTour(tourId, tourData);
    res.status(200).json(updatedTour);
}   

const deleteTour = async (req, res) => {
    const tourId = req.params.id;
    const deletedTour = await tourModel.deleteTour(tourId);
    res.status(200).json(deletedTour);
}       

const getAllTours = async (req, res) => {
    const tours = await tourModel.getAllTours();
    res.status(200).json(tours);
}

const searchTourByTitle = async (req, res) => {
    const title = req.params.title;
    const tours = await tourModel.searchTourByTitle(title);
    res.status(200).json(tours);
}

const searchTourByLocation = async (req, res) => {
    const location = req.params.location;
    const tours = await tourModel.searchTourByLocation(location);
    res.status(200).json(tours);
}

const searchTourByPrice = async (req, res) => {
    const price = req.params.price;
    const tours = await tourModel.searchTourByPrice(price);
    res.status(200).json(tours);
}

const searchTourByDuration = async (req, res) => {
    const duration = req.params.duration;
    const tours = await tourModel.searchTourByDuration(duration);
    res.status(200).json(tours);
}

module.exports = {
    createTour,
    getTourById,
    updateTour,
    deleteTour,
    getAllTours,
    searchTourByTitle,
    searchTourByLocation,
    searchTourByPrice,
    searchTourByDuration
}   