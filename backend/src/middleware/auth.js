const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    //get token from the header
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({msg:'no token, authorization denied'});
    }
    try{
        //verify token
        const decoded = jwt.verify(token, 'secretkey');
        req.user = decoded.userId;
        next();       
    }
    catch(err){
        res.status(401).json({msg:'Token is not valid'});
    }
};
