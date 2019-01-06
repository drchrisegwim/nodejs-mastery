var url = "http://emeksense.com/log";

function log(message) {
    //Take the message and send it to a http end point like the url bove
    // but lets just console log it.

    console.log(message);
}

//Recall that all method/functions and properties are private to their respective module (file) by default.

// So to make the functions in this module public we do the following:

module.exports.log = log;

// where the "log" to the left handside is the name of our log EXTERNALLY and the one on the right is its name INTERNALLY, so we can choose to call it any name externally like as shwon below:
module.exports.emeksenseLog = log;

// Good news, we can to export objects like done above or just simply use the exports keyword. eg exports.eGloryLog = log;