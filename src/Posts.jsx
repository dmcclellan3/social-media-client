import React, { useState, useEffect, useContext } from 'react';
import { getPosts } from './api';
import { AuthContext } from './authContext';

const Posts = () => {
    const [posts, setPosts] = useState([])
    const { auth } = useContext(AuthContext)
    useEffect (() => {
       getPosts ({ auth })
        .then(response => {
            console.log('POSTS RESPONSE: ', response)
            setPosts(response.data)
        })
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.user.username}</h2>
                    <p>{post.content}</p>
                </div>
            ))} 
        </div>
    );
    
}



export default Posts