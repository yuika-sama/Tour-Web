const TourMediaModel = require("../models/tour_media.model")

const createTourMedia = async (req, res) => {
    const tourMedia = req.body;
    if (!tourMedia.tour_id || !tourMedia.media_type || !tourMedia.url || !tourMedia.caption || !tourMedia.updated_at) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    tourMedia.created_at = new Date();
    tourMedia.updated_at = new Date();
    const newTourMedia = await TourMediaModel.createTourMedia(tourMedia);
    res.status(201).json(newTourMedia);
};

const getTourMediaById = async (req, res) => {
    const tourMediaId = req.params.id;
    if (!tourMediaId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const tourMedia = await TourMediaModel.getTourMediaById(tourMediaId);
    res.status(200).json(tourMedia);
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
    res.status(200).json(updatedTourMedia);
};  

const deleteTourMedia = async (req, res) => {
    const tourMediaId = req.params.id;
    if (!tourMediaId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const deletedTourMedia = await TourMediaModel.deleteTourMedia(tourMediaId);
    res.status(200).json(deletedTourMedia);
};

const getAllTourMedia = async (req, res) => {
    const tourMedia = await TourMediaModel.getAllTourMedia();
    res.status(200).json(tourMedia);
};

const getTourMediaByTourId = async (req, res) => {
    const tourId = req.params.id;
    if (!tourId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const tourMedia = await TourMediaModel.getTourMediaByTourId(tourId);
    res.status(200).json(tourMedia);
};

const getTourMediaByUserId = async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const tourMedia = await TourMediaModel.getTourMediaByUserId(userId);
    res.status(200).json(tourMedia);
};  


module.exports = {
    createTourMedia,
    getTourMediaById,
    updateTourMedia,
    deleteTourMedia,
    getAllTourMedia,
    getTourMediaByTourId,
    getTourMediaByUserId,
};  