// // Trade between query performance and consistency

// // Using References (Normalization)
// let author = {
//   name: 'emeksense'
// }

// let course = {
//   author: 'id'
// }


// // Using Enbedded Documents (Denormalization)

// let course = {
//   author: {
//     name: 'emeksense'
//   }
// }




const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {
    useNewUrlParser: true
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
}));

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course
    .find()
    .populate('author', '-_id name')
    .select('name author');
  console.log(courses);
}

//createAuthor('Christian Egwim', 'A vast web and mobile app developer, software engineer and technology envangelist', 'emeksense.com');

//createCourse('A cloud-based C/C++ Compiler for smart devices', '5c40ce9463d33240b0f5d9d0');
listCourses();