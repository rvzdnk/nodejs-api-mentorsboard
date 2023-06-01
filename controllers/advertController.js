
const {
    getAllAdverts,
    getAdvertsByOwner,
    createNewAdvert,
    editExistingAdvert,
    deleteExistingAdvert,
} = require("../services/adverts");
const Advert = require("../models/advertSchema");


const { findUserNameById } = require("../services/users");

const getAdverts = async (req, res, next) => {
    try {
        const currentPage = parseInt(req.query.page) || 0;
        const advertsPerPage =  parseInt(req.query.limit) || 12;
        const allAdverts = await Advert.find({})
                                        .lean()
                                        .skip(currentPage * advertsPerPage)
                                        .limit(advertsPerPage);
        const adverts = await getAllAdverts();
        const totalAdverts = adverts.length;
        const totalPages = Math.ceil(totalAdverts/advertsPerPage);

        res.status(200).json({allAdverts, currentPage, advertsPerPage, totalAdverts, totalPages});
    } catch (error) {
        next (error)
    }
};

const getAllUserAdverts = async (req, res, next) => {
    try {
        const { id: userId } = req.user; 
        const userAdverts = await getAdvertsByOwner(userId);
        res.status(200).json({userAdverts});
    } catch (error) {
        next(error);
    }
}

const createAdvert = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const authorName = await findUserNameById (userId);
        const newAdvert = await createNewAdvert(userId, req.body, authorName);
       
        res.status(201).json({
            newAdvert: {
                technology: newAdvert.technology,
                level: newAdvert.level,
                price: newAdvert.price,
                _id: newAdvert._id,
                author: authorName,
            },
        });
    } catch (error){
        next(error);
    }
};

const editAdvert =  async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { advertId } = req.params;
        const body = req.body;
        const editedAdvert = await editExistingAdvert(userId, advertId, body);
        res.status(200).json({
            editedAdvert: {
                technology: editedAdvert.technology,
                level: editedAdvert.level,
                price: editedAdvert.price,
            },
        });
    } catch (error) {
        next(error)
        console.log("hej");
    }
};

const deleteAdvert = async (req, res, next) => {
    try {
        const { id: userId} = req.user;
        const { advertId } = req.params;
        await deleteExistingAdvert(userId, advertId);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAdverts,
    getAllUserAdverts,
    createAdvert,
    editAdvert,
    deleteAdvert,
};