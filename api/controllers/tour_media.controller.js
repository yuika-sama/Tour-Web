const TourMediaModel = require("../models/tour_media.model")

const createTourMedia = async (req, res) => {
    const tourMediaData = req.body;
    const tourMedia = await TourMediaModel.createTourMedia(tourMediaData);
    res.status(201).json(tourMedia);
}   

const getTourMediaById = async (req, res) => {
    const { media_id } = req.params;
    const tourMedia = await TourMediaModel.getTourMediaById(media_id);
    res.status(200).json(tourMedia);
}   

const updateTourMedia = async (req, res) => {
    const { media_id } = req.params;
    const tourMediaData = req.body;
    const tourMedia = await TourMediaModel.updateTourMedia(media_id, tourMediaData);
    res.status(200).json(tourMedia);
}   

const deleteTourMedia = async (req, res) => {
    const { media_id } = req.params;
    const tourMedia = await TourMediaModel.deleteTourMedia(media_id);
    res.status(200).json(tourMedia);
}   

const getAllTourMedia = async (req, res) => {   
    const tourMedia = await TourMediaModel.getAllTourMedia();
    res.status(200).json(tourMedia);
}   

module.exports = { 
    createTourMedia, 
    getTourMediaById,
    updateTourMedia, 
    deleteTourMedia, 
    getAllTourMedia 
};