//mock the database module to avoid real database calls
jest.mock('../src/config/db.js', () => ({
    query: jest.fn(), //mock the query method
}));


const bcrypt = require('bcryptjs');
require('dotenv').config();

describe('Password Hashing with Pepper', () => {
    const pepper = process.env.PEPPER || 'CyberSecurityBerde'; //default for testing
    const password = 'myPassword123';

    it('should apply pepper to the password before hashing', async () => {
        const passwordWithPepper = password + pepper;
        
        //hash the password with pepper
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(passwordWithPepper, saltRounds);
        
        //check that pepper was applied by comparing the combined password
        const isMatch = await bcrypt.compare(passwordWithPepper, hashedPassword);
        expect(isMatch).toBe(true);
    });

    it('should fail if incorrect pepper is applied', async () => {
        const incorrectPepper = 'WrongPepper';
        const passwordWithIncorrectPepper = password + incorrectPepper;

        const passwordWithPepper = password + pepper;
        
        //hash the correct password with pepper
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(passwordWithPepper, saltRounds);
        
        //this should fail because we're comparing with an incorrect pepper
        const isMatch = await bcrypt.compare(passwordWithIncorrectPepper, hashedPassword);
        expect(isMatch).toBe(false);
    });
});
