// By default the code below will run synchroniously.

console.log("Before");
// However this settimeout function is an example of asynchronious function. It does that by scheduling a task to be performed in the future. So it doesnt break / block.
// note1 Asychronious doesnt mean cuncurrent/ multithreaded.
const user = getUser(1);
// The value of user will be undefined because getUser function is not called until 2 sec later.
console.log(user);

// calling the getUser2 function that immplements call back
getUser2(1, user => {
  console.log("User", user);

  // Get the repositories
  getRepositories(user.gitHubUsername, repositories => {
    console.log("List of Repo", repositories);
  });
});

console.log("After");

function getUser(id) {
  setTimeout(() => {
    console.log("Reading a user from a database...");
    return { id: id, gitHubUsername: "emeksense" };
  }, 2000);
}

//So there are patterns for dealing with Asynchronious codes: name: 1, Callback, promises and Async/await

//1. Callback, A call bank i a function that will be called when the rsult of an asyn is ready.
function getUser2(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database...");
    callback({ id: id, gitHubUsername: "emeksense" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Calling Github API...");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
