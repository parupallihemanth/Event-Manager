const Event = require('../modals/event');
const fs = require("fs");
const formidable = require('formidable');



exports.getEventById = async( req, res, next, id) =>{
    try{
    // console.log('event......')
    const event = await Event.findById(id).populate("category")

    if(!event) {
        return res.status(400).json({
            err : 'unable to get event'
        })
    
}

    
    req.event = event
    next();
    }
    
    catch (err ){
        console.log(err)
    }
}

exports.getEvent = (req, res) => {
    req.event.photo = undefined
    // console.log(req.event);
    return res.json(req.event)
};


exports.getAllEvents = async( req, res) =>{
    try{

        const event = await Event.find()
    .select("-photo")
    .populate("category")
    if(!event) {
        return res.status(400).json({
            err : "Category deletion failed"
        })
    }
    return res.status(200).json({event})

    }
    
    catch (err) {
        console.log(err)
    }
            
        
   
    
}

exports.createEvent = ( req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse( req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                err : "Unable to upload the photo"
            })
        }

        // Todo restrictions on filelds
        const { date, description, capacity, category, price } = fields
        if( !date || !description ||!capacity ||!category || !price){
            return res.status(400).json({
                err : "All fields required"
            })
        }

        let event = new Event(fields);

        // handle files
        if(file.photo){
            // File size should not be more than 3MB
            if( file.photo.size > 3000000){
                return res.status(400).json({
                    err : "Photo size should be less than 3MB"
                })

            }
            event.photo.data = fs.readFileSync(file.photo.path);
            event.photo.contentType = file.photo.type

        }

        event.save( ( err, event) =>{
            if(err){
                return res.status(400).json({
                    err : err
                })
            }
            return res.status(200).json(event)
        })

    })

}


exports.updateEvent = ( req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse( req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                err : "Unable to upload the photo"
            })
        }

        let event = req.body
        event = _.extend(event, fields)    

        

        // handle files
        if(file.photo){
            // File size should not be more than 3MB
            if( file.photo.size > 3000000){
                return res.status(400).json({
                    err : "Photo size should be less than 3MB"
                })

            }
            event.photo.data = fs.readFileSync(file.photo.path);
            event.photo.contentType = file.photo.type

        }

        event.save( ( err, event) =>{
            if(err){
                return res.status(400).json({
                    err : err
                })
            }
            return res.status(200).json(event)
        })

    })

}




exports.deleteAEvent = async( req, res) =>{
    

    try{
       
        const data = await Event.findByIdAndDelete({_id : req.event._id})
        if(!data) {
            return res.status(400).json({
                err : "event deletion failed"
            })
        }

        return res.status(200).json({ data})

    } catch (err) {
        console.log(err)
    }
}