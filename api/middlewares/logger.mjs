const logger = (req,res,next)=>{  // Custom middlewares
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next();
}
export default  logger ; 
