const College = require("../model/college");
const Student = require("../model/student");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.all = catchAsync(async (req, res, next) => {
  const docs = await College.find({});
  let s = [];
  for (let i = 0; i < docs.length; i++) {
    for (let j = 1; j < 11; j++) {
      if (j % 4 == 0) {
        s = ["c", "java", "c++"];
      } else if (j % 4 == 1) {
        s = ["c", "python", "c++"];
      } else if (j % 4 == 2) {
        s = ["python", "c++", "java"];
      } else if (j % 4 == 3) {
        s = ["c", "python", "c++", "JS"];
      }
      await Student.create([
        {
          name: `student${j}`,
          year: 2015 + j,
          college: docs[i]._id,
          skills: s,
        },
      ]);
    }
  }
  res.status(201).json({
    status: "success",
  });
});

exports.collegeDetail = catchAsync(async (req, res, next) => {
  let query;
  let doc;
  if (req.body.id) query = College.findById(req.body.id);
  if (req.body.name) query = College.find({ name: req.body.name });
  if (query) doc = await query;
  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
       doc,
    },
  });
});

exports.allCollege = catchAsync(async (req, res, next) => {
  const docs = await College.find({});
  res.status(200).json({
    status: "success",
    data: {
      data: docs,
    },
  });
});

exports.getSimilar = catchAsync(async (req, res, next) => {
  const doc = await College.findById(req.body.id);
  const { state, count, courses } = doc;
  const docs = await College.aggregate([
    {
      $unwind: "$count",
    },
    {
      $match: {
        count: {
          $gte: count - 100,
          $lte: count + 100,
        },
        state: state,
      },
    },
  ]);
  //console.log(docs);
  const result = [];
  for (let i = 0; i < docs.length; i++) {
    if (docs[i].courses.some((i) => courses.includes(i)) && docs[i]._id!=req.body.id) {
      result.push(docs[i]);
    }
  }
  if (result.length === 0)
    return next(new AppError("No document found with that ID", 404));
  res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
});

exports.state = catchAsync(async (req, res, next) => {
  const docs = await College.find({ state: req.body.state });
  if (!docs) return next(new AppError("No document found with that ID", 404));
  res.status(200).json({
    status: "success",
    data: {
      docs,
    },
  });
});

exports.courses = catchAsync(async (req, res, next) => {
  const docs = await College.find();
  const ress = [];
  console.log(req.body);
  for (let i = 0; i < docs.length; i++) {
    if (docs[i].courses.includes(req.body.course)) {
      ress.push(docs[i]);
    }
  }
  if (!ress) return next(new AppError("No document found with that ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      ress,
    },
  });
});

exports.states = catchAsync(async (req, res, next) => {
  const docs = await College.find();
  const ress = [];
  console.log(docs[0]);
  for (let i = 0; i < docs.length; i++) {
    if (docs[i].state == req.body.state) {
      ress.push(docs[i]);
    }
  }
  if (!ress) return next(new AppError("No document found with that ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      ress,
    },
  });
});

exports.dashState = catchAsync(async (req, res, next) => {
  //const courses = ["AP", "TN", "KA", "MH", "KL"];
  const docs = await College.find();
  const ress = {};
  const ans = [];
  let c = 0;
  for (let i = 0; i < docs.length; i++) {
      if (ress[docs[i].state]) {
        ress[docs[i].state]++;
        c++;
      } else {
        ress[docs[i].state] = 1;
        c++;
      }
    }
  for ([k, v] of Object.entries(ress)) {
    ress[k] = (v / c) * 100;
  }
  for ([k, v] of Object.entries(ress)) {
    ans.push({ y: v, label: k });
  }

  res.status(200).json({
    status: "success",
    data: {
      ans,
    },
  });
});

exports.dashCourse = catchAsync(async (req, res, next) => {
  const courses = ["CSE", "ECE", "IT", "EEE", "ME"];
  const docs = await College.find();
  const ress = {};
  const ans = [];
  let c = 0;
  for (let i = 0; i < docs.length; i++) {
    for (let j = 0; j < docs[i].courses.length; j++) {
      if (ress[docs[i].courses[j]]) {
        ress[docs[i].courses[j]]++;
        c++;
      } else {
        ress[docs[i].courses[j]] = 1;
        c++;
      }
    }
  }
  for ([k, v] of Object.entries(ress)) {
    ress[k] = (v / c) * 100;
  }
  for ([k, v] of Object.entries(ress)) {
    ans.push({ y: v, label: k });
  }

  res.status(200).json({
    status: "success",
    data: {
      ans,
    },
  });
});
