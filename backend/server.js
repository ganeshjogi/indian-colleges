const mongoose = require('mongoose');

const app = require('./app');


/*const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );*/
  
  mongoose
    .connect("mongodb+srv://ganesh:yOaSYTtvMyh7HNPx@cluster0.npnmu.mongodb.net/natours?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log('DB connection successful!'));
  
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });