const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: authorSchema
}));

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

// Creatig an array of authors for a particular course
const Course2 = mongoose.model('Course2', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse2(name, authors) {
  const course = new Course2({
    name,
    authors
  });
  const result = await course.save();
  console.log(result);
}


async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourses(courseId) {
  const course = await Course.findById(courseId);
  course.author.name = "Christian Nnaemeka Egwim";
  course.save();
}

// Or
// Updating a document dierectly in the db without first modifying it.
async function updateCourses2(courseId) {
  const course = await Course.update({
    _id: courseId
  }, {
    $set: {
      'author.name': 'Emeksense Noni'
    }

    // N/B You can also use $unset above to remove a sub object from a document
  });
}

// createCourse('Node Course mastry', new Author({
//   name: 'emeksense'
// }));

//updateCourses2('5c42958114d11840a8e39691');

createCourse2('C++ Programming', [
  new Author({
    name: 'emeksense Noni'
  }),
  new Author({
    name: 'Christian Egwim'
  }),
  new Author({
    name: 'Nnaemeka 1'
  }),
  new Author({
    name: 'Son of the most high'
  })
]);

// Adding author 
async function addAuthor(courseId, author) {
  const course = await Course2.findById(courseId);
  course.authors.push(author);
  course.save();
}

// Removing Author

asyn

function removeAuthor(courseId, authorId) {
  const course = await Course2.findById(courseId);
  const author = course.authors.id(authorid);
  author.remove();
  course.save();

}

addAuthor('5c42ff5c85c24d3e3c136a56', new Author({
  nme: 'My name is Christian Nnaemeka EGWIM'
}));