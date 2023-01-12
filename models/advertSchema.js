const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AdvertTechnology = [
    "Java",
    "JavaScript",
    "React",
    "Angular",
    "Vue",
    "HTML",
    "Python",
    "CSS",
    "UX/UI",
    "PHP",
    "Scala",
    "Ruby",
    "DevOps",
    ".Net",
    "C/C++"
]

const AdvertLevel = ["Junior", "Mid", "Senior"];

const advertSchema = new Schema (
    {
        technology: {
            type: String,
            enum: AdvertTechnology,
            required: [true, "Set technology stack for advert"],
        },
        level: {
            type: String,
            enum: AdvertLevel,
            required: [true, "Set level for advert"],
        },
        price: {
            type:  Number,
            required: [true, "Set price for advert"],
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { versionKey: false, strict: "throw" }
);

const Advert = model("advert", advertSchema);

module.exports = Advert;