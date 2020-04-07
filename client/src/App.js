import React from 'react';

import PostCard from './components/PostCard';
import PostForm from './components/PostForm';

import './App.css';

function App() {
  return (
    <div className="App">
    
      <PostForm />
      <PostCard />
    </div>
  );
}

export default App;
