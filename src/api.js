import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000'

// Sends a request to the backend API endpoint with the parameters
// specifying the information requested.  username, password etc. 

export const createUser = ({ username, password, firstName, lastName }) => {
    console.log('CREATE USER: ', username, password, firstName, lastName)
    axios({
        method: 'POST',
        url: `${baseUrl}/create-user/`, 
        data: {
            username,           
            password,
            first_name: firstName, 
            last_name: lastName,
        }
    })
    .then(response => {
        console.log('CREATE USER RESPONSE: ', response)
    })
    .catch(error => console.log('ERROR: ', error))
}

// Requests on authentication token after credentials are entered

export const getToken = ({ auth, username, password }) => {
    console.log('GET TOKEN: ', auth, username, password)
    return axios.post(`${baseUrl}/token/`, {
        username,
        password,
    }) .then(response => {
        console.log('GET TOKEN RESPONSE: ', response)
        auth.setAccessToken(response.data.access)
        fetchProfile({ auth : {accessToken : response.data.access}})
    })
    .catch(error => console.log('Error: ', error))
}


// After authentication token is received this function fetches the profile
// and consoles the response 

export const fetchProfile = ({ auth }) => {
    axios({
        method: 'GET',
        url:`${baseUrl}/profile/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        }
    }).then(response => {
        console.log('FETCH PROFILE RESPONSE: ', response)
    }).catch(error => console.log('ERROR: ', error))
}

//sends request to create post to API with the content of the post 

export const createPost = ({ auth, content }) => {
    console.log('CREATE POST: ', auth, content)
    return axios({
        method: 'POST',
        url: `${baseUrl}/posts/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        },
        data: {
            content
        }
    })
    .then(response => {
        console.log('CREATE POST RESPONSE: ', response)
        return response
    })
    .catch(error => console.log('ERROR: ', error))

}

//Issue with something at this point, more than likely on the backend 
//But similar to create this function is intended to send a different 
//request "PUT" to update a previous post 

export const updatePost = ({ auth, postId, content }) => {
    console.log("edit post id", postId)
    console.log("contenttgttt", content)
    return axios({
        method: 'PUT',
        url: `${baseUrl}/posts/${postId}/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
        data: {
            content,
        },
    })
    .then(response => {
        console.log('UPDATE POST: ', response)
        return response
    })
    .catch(error => console.log('ERROR: ', error))
};

// Sends request to API to delete with the postID to specify what post 
//to delete 

export const deletePost = ({ auth, postId }) => {
    return axios({
        method: 'DELETE',
        url: `${baseUrl}/posts/${postId}/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        }
    })
    .then(response => {
        console.log('DELETE POST RESPONSE: ', response)
        return response
    })
    .catch(error => console.log('ERROR: ', error))
};

// Fetches all the posts 

export const getPosts = ({ auth }) => {
    console.log('GET POSTS: AUTH: ', auth.accessToken)
    return axios({
        method: 'GET',
        url:`${baseUrl}/posts/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        }
    })
}



