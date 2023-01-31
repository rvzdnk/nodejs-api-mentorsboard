const verifyRoles = (req, res, next) => {
    const currentUser = req.user;
    if (currentUser.role !== 'Mentor'){
        res.status(403).json({message: "Unauthorized"})
    }
    next()
};

module.exports = verifyRoles;

