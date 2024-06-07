import React, { useState, useEffect, useContext } from 'react';
import { getPosts, updatePost } from './api';
import { AuthContext } from './authContext';
import { createPost, deletePost } from './api';

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [newPost, setNewPost] = useState('')
    // const [cutPost, setCutPost] = useState([])
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
        try {
            const response = await createPost({ auth, content: newPost });
            console.log('CREATE POST RESPONSE: ', response);
            setPosts(response.data); 
            setNewPost(''); 
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleEditPost = (post) => {
        setEditPostId(post.id);
        setEditContent(post.content)
    }

    const handleUpdatePost = (postId) => {
        const response = updatePost({ auth, postId })
        
    }

    

    const handleDeletePost = (postId) => {
        const response = deletePost({ auth, postId })
            .then(() => {
                setPosts(posts.filter(post => post.id !== postId));
                console.log('POST DELETED!');
                return response
            })
            .catch(error => {
                console.log('ERROR DELETING POST: ', error);
            });
    };


    return (
        <div className='feed-container'>
            <nav className="nav-bar">
                <a href="/posts">Posts</a>
                <a href="/login">Login</a>
                <a href="/">Profile</a>
            </nav>
            <div className="create-post-container">
                <h3>Create a Post</h3>
                <div>
                    <input
                    type='text'
                    value={newPost}
                    onChange={handleNewPost} 
                    placeholder="What's on your mind?"
                    />
                </div>
                <br />
                <button onClick={handlePostSubmit}>Post</button>
            </div>
            <div className='posts-container'>
            {posts && posts.map(post => {
                console.log('POST RESPONSE: ', post)
                return(
                    <div className='post' key={post.id}>
                        {/* <h2>{post.user.username}</h2> */}
                        <h5>{post.username}</h5>
                        <p>{post.content}</p>
                        <span>{post.created_at}</span>
                        <div className='post-actions'>
                        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                        <button onClick={() => handleEditPost(post.id)}>Edit</button>
                        </div>
                    </div>
                )
            })} 
        </div>
        </div>
    );
    
}



export default Posts