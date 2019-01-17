const mongoose = require('mongoose');
mongoose
    .connect('mongodb://localhost/playground', {
        useNewUrlParser: true
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Validation implementation
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    caterory: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        trim: true
    },
    author: String,
    // Custom Validation
    tags: {
        type: Array,
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'A course should ha ve at least one tag ooh!!!'
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)

    }

});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        //name: 'Test Course',
        caterory: 'database',
        author: 'Christian Egwim',
        tags: [],
        isPublished: true
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (error) {
        console.log(error.message);
    }

}
createCourse();