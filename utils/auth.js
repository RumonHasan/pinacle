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

const isAuth = async(req, res, next)=>{
    const {authorization} = req.headers;
    if(authorization){
        // bearer
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, process.env.JWT_SECRET, (err,decode )=>{
            if(err){
                res.status(404).send({message:'Token is not valid'})
            }else{
                req.user = decode;
                next();
            }
        })
    }else{
        res.status(401).send({message:'token is not supplied'});
    }
}

export {signIn, isAuth};