const asyncHandler = (requestHandler)=>{
    return (req , res , next)=>{
        Promise.resolve(requestHandler(req , res, next))
        .catch((err)=>next(err));
    }
}



export {asyncHandler}


//const asyncHandler = ()=>{ ()=>{} }
    // nested function
// remove the curly braces of the outer fn. and pass a fn function as a parameter

// const asynHandler = (fn)=> async (req ,res , next)=>{
//  try{
//     await fn(req , res , next)
//  }
//  catch(error){
//     res.status(error.code || 400 ).json({
//         success: false,
//         message: err.message
//     })
//  }
// }