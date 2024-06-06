import React, { useState, useEffect, useContext } from 'react';
import { getPosts } from './api';
import { AuthContext } from './authContext';
import { createPost } from './api';

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
        try {
            const response = await createPost({ auth, content: newPost });
            console.log('CREATE POST RESPONSE: ', response);
            setPosts(response.data); 
            setNewPost(''); 
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };
    
    // const CreatePost = ({ auth }) => {
    //     const [content, setContent] = useState('')

    //     const handlePostSubmit = (e) => {
    //         createPost({ auth, user, content, created_at })
    //         .then(response => {
    //             console.log('POST CREATED!')
    //             setContent('')
    //         })
    //         .catch(error => {
    //             console.log('ERROR CREATING POST: ', error)
                
    //         })
        
    //     }
    // }


    return (
        <div>
            <h1>Posts</h1>
            <div>
                <input
                type='text'
                value={newPost}
                onChange={handleNewPost} 
                placeholder="What's on your mind?"
                />
                <br />
                <br />
                <button onClick={handlePostSubmit}>Post</button>
            </div>
            {posts && posts.map(post => {
                console.log('POST RESPONSE: ', post)
                return(
                    <div key={post.id}>
                        <h2>{post.user.username}</h2>
                        <p>{post.content}</p>
                    </div>
                )
            })} 
        </div>
    );
    
}



export default Posts