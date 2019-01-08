// One of the core components of node is the consept of event. A lot node core component are based on this event.
// An event is basically a signal that indicate that something has happened in our application.
// The eventEmitter.on() method is used to register listeners, while the eventEmitter.emit() method is used to trigger the event.

// So to use events in  your project you got to create it as a class as shown below:
const EventEmitter = require("events");

// To use the created event class above you got to make an instance of it as shown below:
const emitter = new EventEmitter();

// A listerner is a function that will be called when an event is raised. We use "addListener"/"on" methods of the emitter to do so. They both does the same thing but we mostly use the "on" nawadays as shown below:
emitter.addListener("event", function() {
  console.log("an event occurred!");
});
//OR
emitter.on("event", function() {
  console.log("an event occurred!");
});

//To trigger a created event we use the emit function as shown below:
emitter.emit("event"); // The .emit call is called synchroniously

//..................................................................................................................................................................................

//Also when raisng an event we can add additional arguments (Known as event argument) to help us send some data about that event as demonstrated below.

emitter.on("myevent", function(eventArg) {
  console.log("My event has occurred oh!!!", eventArg);
});

emitter.emit("myevent", { id: 1, url: "http://emeksense.com" });

// Simple quiz

emitter.on("logEvent", eventArg => {
  console.log("The quiz is so simple", eventArg);
});

emitter.emit("logEvent", { data: "message" });
