const TourMediaModel = require("../models/tour_media.model")

const createTourMedia = async (req, res) => {
    const tourMedia = req.body;
    if (!tourMedia.tour_id || !tourMedia.media_type || !tourMedia.url || !tourMedia.caption) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    tourMedia.updated_at = new Date();  
    const newTourMedia = await TourMediaModel.createTourMedia(tourMedia);
    res.status(201).json({ message: 'Tour media created successfully', newTourMedia });
};

const getTourMediaById = async (req, res) => {
    const tourMediaId = req.params.id;
    if (!tourMediaId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const tourMedia = await TourMediaModel.getTourMediaById(tourMediaId);
    res.status(200).json({ message: 'Tour media retrieved successfully', tourMedia });
};

const updateTourMedia = async (req, res) => {
    const tourMediaId = req.params.id;
    if (!tourMediaId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const tourMedia = req.body;
    if (!tourMedia) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    tourMedia.updated_at = new Date();
    const updatedTourMedia = await TourMediaModel.updateTourMedia(tourMediaId, tourMedia);
    res.status(200).json({ message: 'Tour media updated successfully', updatedTourMedia });
};  

const deleteTourMedia = async (req, res) => {
    const tourMediaId = req.params.id;
    if (!tourMediaId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const deletedTourMedia = await TourMediaModel.deleteTourMedia(tourMediaId);
    res.status(200).json({ message: 'Tour media deleted successfully', deletedTourMedia });
};

const getAllTourMedia = async (req, res) => {
    const tourMedia = await TourMediaModel.getAllTourMedia();
    res.status(200).json({ message: 'Tour media retrieved successfully', tourMedia });
};

const getTourMediaByTourId = async (req, res) => {
    const tourId = req.params.id;
    if (!tourId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const tourMedia = await TourMediaModel.getTourMediaByTourId(tourId);
    res.status(200).json({ message: 'Tour media retrieved successfully', tourMedia });
}; 


module.exports = {
    createTourMedia,
    getTourMediaById,
    updateTourMedia,
    deleteTourMedia,
    getAllTourMedia,
    getTourMediaByTourId,
};  