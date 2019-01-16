const mongoose = require('mongoose');

// To connect to Mongo Db database the the following:
mongoose
  .connect('mongodb://localhost/playground', {
    useNewUrlParser: true
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// We use a schema to define the shape of documents within a collection in MongoDB

//Defining the schema of our playground db collection(table) named course.
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: Boolean
});

// Compiling a schema into a usuable form known as class is what make a Model. As shown below:

const Course = mongoose.model('Course', courseSchema);

// Now instanciating course
async function createCourse() {
  const course = new Course({
    name: 'C++ 101 Course',
    author: 'Christian Egwim',
    tags: ['C++', 'backend'],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}
// Uncommet below to call the function to create new documet.
//createCourse();

// Querying Documents
async function getCourses() {
  const courses = await Course
    .find({
      isPublished: true
    })
    .limit(10)
    .sort({
      name: -1
    }) // -1 means sort by descending and 1 indicates asscending order
    .select({
      name: 1,
      tags: 1
    });

  console.log(courses);
}

getCourses();