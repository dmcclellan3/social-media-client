import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
    const [posts, setPosts] = useState([])
    const [newPost, setNewPost] = useState([''])
}

    useEffect (() => {
        axios.get('http://127.0.0.1:8000/')
        .then(response => {
            setPosts(response.data)
        })
        .catch(error => {
            console.error('Error retrieving posts!', error)
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



    
export default Posts