const Advert = require("../models/advertSchema");

// const getAllAdverts = async () =>
//     await Advert.find({}).lean();

const getAdvertsByOwner = async (userId) =>
    await Advert.find({ owner: userId }, { owner: 0 });

const createNewAdvert = async (userId, body, authorAdvert) =>
    await Advert.create ({...body, owner: userId, author: authorAdvert });

const editExistingAdvert = async (userId, advertId, body) =>
    await Advert.findOneAndUpdate(
    { owner: userId, _id: advertId },
    { $set: body },
    { new: true, runValidators: true, strict: "throw" }
    );

const deleteExistingAdvert = async (userId, advertId) =>
    await Advert.findOneAndDelete({ owner: userId, _id: advertId });

module.exports = {
    // getAllAdverts,
    getAdvertsByOwner,
    createNewAdvert,
    editExistingAdvert,
    deleteExistingAdvert,
};