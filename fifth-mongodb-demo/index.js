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

// Comparason operators available in mongoose for mongo
// eg (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equal to)
// lt (less than)
// lte (less than or equal to)
// in (in)
// nin (not in)

async function getCourses2() {
  const courses = await Course
    .find({
      price: {
        $gte: 10,
        $lte: 20,
        $in: [10, 20, 35]
      }
    })
    .limit(10)
    .sort({
      name: 1
    })
    .select({
      name: 1,
      tags: 1
    });

  console.log(courses);
}

getCourses2();

// Logical query operators: or & and.
async function getCourses3() {
  const courses = await Course
    .find()
    .or([{
      author: 'Christian'
    }, {
      isPublished: true
    }])
    //or
    .and([{
      author: 'Christian'
    }, {
      isPublished: true
    }])
    .limit(10)
    .sort({
      name: 1
    })
    .select({
      name: 1,
      tags: 1
    });

  console.log(courses);
}

getCourses3();

// regular expression

async function getCourses4() {
  const courses = await Course
    // Starts with Chris
    .find({
      author: /^Chris/
    })
    // Ends with Egwim
    .find({
      author: /Egwim$/
    })
    // Case insensitive
    .find({
      author: /egwim$/i
    })
    // Contains egwim
    .find({
      author: /.*egwim.*/
    })
    .limit(10)
    .sort({
      name: 1
    })
    .count();


  console.log(courses);
}

getCourses4();

// Update Document

async function updateCourse(id) {
  // Approach: Query first
  // findById()
  //Modify its properties
  // save()

  const course = await Course.findById(id);
  if (!course) {
    return;
  }
  course.isPublished = true;
  course.author = 'Another Author';

  const result = await course.save();
  console.log(result);




  // Approach: Update first
  // Update directly
  // Optionaly: get the updated document.

  const result2 = await Course.update({
    _id: id
  }, {
    $set: {
      author: 'Emeksense',
      isPublished: false
    }
  });

  console.log(result2);

}

updateCourse('5c3f2660b476bc2b70b8cb34');

// Removing Documents

async function removeCourse(id) {
  const result = Course.deleteOne({
    _id: id
  });
  console.log(result);
  // To return the object after deleting:
  const course = await Course.findByIdAndRemove(id);
  console.log(course);

}

removeCourse('5c3f2660b476bc2b70b8cb34');