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
        getCommits(repo, commits => {});
        console.log("List of Repo", repositories);

        // Note the nested like structure of a call  back like seen here s what is called CALL BACKHELL or CHRISTMASS TREE STRUCTURE
    });
});

console.log("After");

function getUser(id) {
    setTimeout(() => {
        console.log("Reading a user from a database...");
        return {
            id: id,
            gitHubUsername: "emeksense"
        };
    }, 2000);
}

//So there are patterns for dealing with Asynchronious codes: name: 1, Callback, promises and Async/await

//1. Callback, A call bank i a function that will be called when the rsult of an asyn is ready.
function getUser2(id, callback) {
    setTimeout(() => {
        console.log("Reading a user from a database...");
        callback({
            id: id,
            gitHubUsername: "emeksense"
        });
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log("Calling Github API...");
        callback(["repo1", "repo2", "repo3"]);
    }, 2000);
}

// 2. Promise. A promise is a object that holds the eventual result of an asynchronous operation. In orther words it promises you it will give you the result of asyn operations.
// Promise can be in three states: Pending, Fulfilled/Resolved, Rejected.