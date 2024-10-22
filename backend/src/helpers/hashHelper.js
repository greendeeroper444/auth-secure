const bcrypt = require('bcryptjs');
require('dotenv').config();

const pepper = process.env.PEPPER;

//function to hash password with salt and pepper
const hashPassword = async (password) => {
    const passwordWithPepper = password + pepper;
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(passwordWithPepper, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Hashing error');
    }
};

//function to compare hashed password
const comparePassword = async (inputPassword, hashedPassword) => {
    const passwordWithPepper = inputPassword + pepper;
    try {
        const isMatch = await bcrypt.compare(passwordWithPepper, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Comparison error');
    }
};

module.exports = {
    hashPassword,
    comparePassword,
};
