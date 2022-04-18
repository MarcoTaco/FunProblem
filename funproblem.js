// api url as a variable
const my_api = 'https://jsonplaceholder.typicode.com';

// this function fetches the users in the api as well as handling errors
async function fetchUsers() {
    try {
        // fetching the users from the api
        const response = await fetch (`${my_api}/users`);

        // if fetch does not work, throw an error message
        if(!response.ok){
            throw new Error('Failed to fetch users: ${response.status}');
        }

        // otherwise, put the api results in the console
        return await response.json();
    }
    catch(e){
        console.log(e);
    }
}

// this function adds the list of users to a list for html
function listsUsers(postContainerElementId){
    const postContainerElement = document.getElementById(postContainerElementId);

    if(!postContainerElement){
        return;
    }

    // calling fetchusers function
    fetchUsers()
        .then((users) => {
            if(!users){
                postContainerElement.innerHTML = 'No users fetched.';
                return;
            }
            // looping through each user name and appending them to the html attribute
            for(const user of users) {
                console.log(user);
                postContainerElement.appendChild(postElement(user));
            }
        })
        .catch((e) => {
            console.log(e);
        });
}

// this function posts the users' names onto html div
function postElement(user){
    // creating an a element for the links 
    const anchorElemnent = document.createElement('a');
    // setting the link to link to the api + posts depending on the user id.
    anchorElemnent.setAttribute('href', `${my_api}/posts?userId=${user.id}`);
    // setting it to open to a new tab
    anchorElemnent.setAttribute('target', '_blank');
    // displaying it on the site
    anchorElemnent.innerText = user.name;

    const postTitleElement = document.createElement('h3');
    // appending names to the elements we created and returning them to display
    postTitleElement.appendChild(anchorElemnent);

    return postTitleElement;
}
