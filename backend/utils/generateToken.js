import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId ,res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' });
    res.cookie('jwt', token, {
      httpOnly: true, // prevent XSS attacks cross-site scripting attack
      secure: process.env.NODE_ENV !== 'development', // use secure cookies in production
      sameSite: 'strict', // prevent CSRF attacks
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
    
};
export default generateTokenAndSetCookie;