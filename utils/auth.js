import jwt  from "jsonwebtoken";

const signIn = (user)=>{
    return jwt.sign(
        // user info
        {
            _id: user._id,
            name: user.name,
            email: user.email,
        },

        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }
    )
};

export {signIn};