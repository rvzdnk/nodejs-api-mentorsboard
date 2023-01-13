const {
    findUserByEmail,
    createNewUser,
    updateUserToken,
} = require("../services/users");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRET_KEY;

const registerUser = async (req, res, next) => {
    try{
        const { email } = req.body;
        const user = await findUserByEmail(email);

    if (user){
        return res.status(409).json({ message: "Provided email is already exist. Please use another email." });
    }

    const newUser = await createNewUser(req.body);

    res.status(201).json({
        message:"Registration was successful",
        user: {
            email: newUser.email,
            id: newUser.id,
        },
    });
    } catch(error){
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        const isPasswordCorrect = await user?.validatePassword(password);

        if (!user || !isPasswordCorrect) {
            return res.status(401).json({message: "Email or Password is wrong" });
        }

        const { _id: id } = user;
        const payload = {
            id,
            email,
        };

        const token = jwt.sign(payload, SECRET, { expiresIn: "24h" });
        await updateUserToken(id, token);

        res.status(200).json({
            accessToken: token,
            userData: {
                email,
                id,
            },
        });
    } catch (error) {
        next(error);
    }
};

const logoutUser = async (req, res, next) => {
    const { _id: id } = req.user;

    try {
        await updateUserToken(id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
  };