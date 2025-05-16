import React, { useState } from 'react';
import Post from './Post';
import axios from 'axios';

const SearchPosts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`https://fsd-mb6b.onrender.com/api/v1/post/search?query=${encodeURIComponent(searchQuery)}`, { withCredentials: true });
      setSearchResults(response.data.posts);
    } catch (err) {
      console.error('Error searching posts:', err);
      setError('Failed to fetch search results. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-posts-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts by caption..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {isLoading && <div className="loading">Loading...</div>}
      
      {error && <div className="error">{error}</div>}
      
      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((post) => (
            <Post key={post._id} id={post._id} />
          ))
        ) : (
          !isLoading && <div className="no-results">No posts found</div>
        )}
      </div>
    </div>
  );
};

export default SearchPosts;