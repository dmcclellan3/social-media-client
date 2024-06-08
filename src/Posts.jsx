import React, { useState, useEffect, useContext } from 'react';
import { getPosts, updatePost, createPost, deletePost } from './api';
import { AuthContext } from './authContext';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [editPostId, setEditPostId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const { auth } = useContext(AuthContext);

// Fetches post from api, logs response and sets the posts from the data stored at the end point. 

    useEffect(() => {
        getPosts({ auth })
            .then(response => {
                console.log('POSTS RESPONSE: ', response);
                setPosts(response.data);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, [auth]);

    // Updates the screen with a new post entered that is called below 

    const handleNewPost = (e) => {
        setNewPost(e.target.value);
    };

    // Handles the submission of a new post 
    // calls createPost function from api 
    // sets the post and logs any errors 

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createPost({ auth, content: newPost });
            console.log('CREATE POST RESPONSE: ', response);
            setPosts([response.data, ...posts]);
            setNewPost('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    //edits post ID and content 

    const handleEditPost = (post) => {
        setEditPostId(post.id);
        setEditContent(post.content);
    };

    //Handles form submission to update, calls the API endpoint 
    //

    const handleUpdatePost = async (e) => {
        e.preventDefault();
        try {
            const response = await updatePost({ auth, postId: editPostId, content: editContent });
            console.log('UPDATE POST RESPONSE: ', response);
            setPosts(posts.map(post => (post.id === editPostId ? response.data : post))); //checking if the post ID matches the edit post ID if it doesn't match it leaves the post unchanged 
            setEditPostId(null); //clears the edit post ID that nothing is being edited.  Returns the component to a default state 
            setEditContent(''); //resets the edit form to an empty string 
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleEditContentChange = (e) => {
        setEditContent(e.target.value);
    };


    // calls delete from API and removes based off the Post ID 
    const handleDeletePost = async (postId) => {
        try {
            await deletePost({ auth, postId });
            setPosts(posts.filter(post => post.id !== postId));  
            console.log('POST DELETED!');
        } catch (error) {
            console.error('ERROR DELETING POST: ', error);
        }
    };

    //allows for date format on post 

    const postDate = (dateString) => {
        const format = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }; 
        return new Date(dateString).toLocaleDateString(undefined, format);
    };

    //page render 

    return (
        <div className="feed-container">
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
            <div className="posts-container">
                {posts && posts.map(post => (
                    <div className="post" key={post.id}>
                        <h5>{post.username}</h5>
                        {editPostId === post.id ? (
                            <form onSubmit={handleUpdatePost} className="edit-post-form">
                                <textarea
                                    value={editContent}
                                    onChange={handleEditContentChange}
                                    placeholder="Update your post"
                                    />
                                <button type="submit">Update</button>
                                <button type="button" onClick={() => setEditPostId(null)}>Cancel</button>
                            </form>
                        ) : (
                            <p>{post.content}</p>
                            )}
                            <div>{postDate(post.created_at)}</div>
                        <div className="post-actions">
                            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                            <button onClick={() => handleEditPost(post)}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;
