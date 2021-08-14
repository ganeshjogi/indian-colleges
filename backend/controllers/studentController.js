const College = require("../model/college");
const Student = require("../model/student");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.collegeStudent = catchAsync(async(req,res,next)=>{
    const d = await College.findById(req.body.id)
    console.log('fhdkj'+d);
    const docs = await Student.find({}).select('_id name year skills college')
    const ress = []
    for(let i=0; i<docs.length; i++){
        if(docs[i].college==req.body.id){
            ress.push(docs[i])
        }
    }
    if (!docs) {
        return next(new AppError('No document found with that ID', 404));
      }
  
      res.status(200).json({
        status: 'success',
        data: {
          ress
        }
      });
})

exports.all = catchAsync(async(req,res,next)=>{
    const doc = await Student.findById(req.body.id).populate('college');
    console.log(doc);
    res.status(200).json({
      status: 'success',
      data: {
        doc
      }
    });

})