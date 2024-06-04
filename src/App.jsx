import { useState } from 'react'
import './App.css'
import Login from './Login'
// import Posts from '/Posts'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  // const { auth } = useContext(AuthContext)
  const [posts, setPosts] = useState([]);

  const submit = () => {
    fetchUser({ auth })
  }
  return (
    <div className="p-5">
      <h1>Your Profile</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default App
