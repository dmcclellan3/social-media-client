import React, { useState, useEffect, useContext } from 'react';
import { getPosts } from './api';
import { AuthContext } from './authContext';

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [newPost, setNewPost] = useState('')
    const { auth } = useContext(AuthContext)

    useEffect (() => {
       getPosts ({ auth })
        .then(response => {
            console.log('POSTS RESPONSE: ', response)
            setPosts(response.data)
        })
    }, []);

    const handleNewPost = (e) => {
        setNewPost(e.target.value);
    };
    
    const handlePostSubmit = async () => {
        e.preventDefault();
        try {
            const response = await handlePostSubmit({ auth, content: newPost });
            console.log('CREATE POST RESPONSE: ', response);
            setPosts([response.data, ...posts]); 
            setNewPost(''); 
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };
    

    return (
        <div>
            <h1>Posts</h1>
            <form onClick={handlePostSubmit}>
                <input
                type='text'
                value={newPost}
                onChange={handleNewPost} 
                placeholder="What's on your mind?"
                />
                <br />
                <br />
                <button type='submit'>Post</button>
            </form>
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