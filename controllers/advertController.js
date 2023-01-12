const {
    getAllAdverts,
    getAdvertsByOwner,
    createNewAdvert,
    editExistingAdvert,
    deleteExistingAdvert,
} = require("../services/adverts");

const getAdverts = async (req, res, next) => {
    try {
        const allAdverts = await getAllAdverts();
        res.status(200).json({allAdverts});
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
        const newAdvert = await createNewAdvert(userId, body);
        res.status(201).json({
            newAdvert: {
                technology: newAdvert.technology,
                level: newAdvert.level,
                price: newAdvert.price,
                _id: newAdvert._id,
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
        next(error);
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