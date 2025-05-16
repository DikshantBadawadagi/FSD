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
    setSearchResults([]);

    try {
      // Step 1: Search post IDs by caption
      const searchResponse = await axios.get(
        `https://fsd-mb6b.onrender.com/api/v1/post/search?query=${encodeURIComponent(searchQuery)}`,
        { withCredentials: true }
      );

      const postIds = searchResponse.data.posts.map((post) => post._id);

      // Step 2: Fetch full posts using /getPost/:id
      const fullPosts = await Promise.all(
        postIds.map(async (id) => {
          try {
            const res = await axios.get(
              `https://fsd-mb6b.onrender.com/api/v1/post/getPost/${id}`,
              { withCredentials: true }
            );
            return res.data.post;
          } catch (err) {
            console.error(`Failed to fetch post with id ${id}:`, err);
            return null; // Skip failed fetches
          }
        })
      );

      // Filter out any failed/null posts
      const validPosts = fullPosts.filter((post) => post !== null);
      setSearchResults(validPosts);
    } catch (err) {
      console.error('Error searching posts:', err);
      setError('Failed to fetch search results. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full px-4 py-8 bg-gray-100">
      <form
        onSubmit={handleSearch}
        className="w-full max-w-xl flex gap-4 items-center bg-white p-4 rounded-xl shadow-md"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts by caption..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {isLoading && (
        <div className="mt-6 text-blue-600 font-medium">Searching...</div>
      )}

      {error && (
        <div className="mt-6 text-red-500 font-medium">{error}</div>
      )}

      <div className="mt-8 w-full max-w-2xl space-y-6">
        {searchResults.length > 0 ? (
          searchResults.map((post) => (
            <Post key={post._id} post={post} />
          ))
        ) : (
          !isLoading &&
          searchQuery && (
            <div className="text-center text-gray-600">No posts found.</div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchPosts;
