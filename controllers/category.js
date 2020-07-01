const Category = require('../modals/category')


// exports.getUser = async(req, res,  next, id) => {
//     try {
//         console.log('data')
//         const data = await User.findById(id);
        
//         if(!data) {
//             return res.status(400).json({
//                 err : "data not found"
//             })
        
//     }

//     req.profile = data;
    
//     next();
// }

// catch (err) {
//     console.log(err)
// }

// }



exports.getCategory = async(req, res,  next, id) => {
    try {
        // console.log('data')
        const data = await Category.findById(id);
        
        if(!data) {
            return res.status(400).json({
                err : "Category not found"
            })
        
    }

    req.category = data;
    
    next();
}

catch (err) {
    console.log(err)
}

}


exports.getAllCategories = async(req, res) =>{
    try{
      
        const data = await Category.find();
        if(!data) {
            return res.status(400).json({
                err : "Categories  not found"
            })
        }

        return res.status(200).json({ data})
}
catch (err) {
    console.log(err)
}
}

exports.getACategory = (req,res) =>{
    return  res.json(req.category)
}

exports.createACategory = async(req, res) =>{
    try{
        const data = await Category.create(req.body)
        if(!data) {
            return res.status(400).json({
                err : "Category creation failed"
            })
        }
        // TODO
        return res.status(200).json({ data})

    } catch (err) {
        console.log(err)
    }

}

exports.updateACategory = async(req, res) =>{
    try{
        
        const data = await Category.findByIdAndUpdate(
            {_id : req.category._id},
            {$set : req.body},
            {new : true, useFindAndModify : false})
        if(!data) {
            return res.status(400).json({
                err : "Category updation failed"
            })
        }

        return res.status(200).json({ data})

    } catch (err) {
        console.log(err)
    }

}

exports.deleteACategory = async(req, res) =>{
    try{
        // console.log(req.params.id)
        const data = await Category.findByIdAndDelete({_id : req.category._id})
        if(!data) {
            return res.status(400).json({
                err : "Category deletion failed"
            })
        }

        return res.status(200).json({ data})

    } catch (err) {
        console.log(err)
    }

}