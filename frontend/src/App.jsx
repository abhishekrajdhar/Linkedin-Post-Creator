import { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
  useEffect(() => {
    fetch(`${backendUrl}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Error fetching posts:', err));
  }, [backendUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) {
      alert('Post content cannot be empty.');
      return;
    }
    fetch(`${backendUrl}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newPost }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts([...posts, { content: data.content }]);
        setNewPost('');
      })
      .catch((err) => console.error('Error posting:', err));
  };

  const handleGenerate = () => {
    if (!topic.trim()) {
      alert('Please enter a topic for Gemini to generate a post.');
      return;
    }
    setLoading(true);
    fetch(`${backendUrl}/generate-post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        tone: "professional",
        audience: "LinkedIn professionals"
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setNewPost(data.post);
        setPosts([...posts, { content: data.post }]);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error generating post:', err);
        setLoading(false);
      });
  };

  // Use a fixed sticker image for all posts
  const stickerUrl = "/vite.svg"; // You can replace this with any image in your public folder

  return (
    <div className={darkMode ? "min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 py-8" : "min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-8"}>
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className={darkMode ? "text-4xl font-extrabold text-blue-200 tracking-tight" : "text-4xl font-extrabold text-blue-700 tracking-tight"}>LinkedIn-style Posts</h1>
          <div className="flex items-center gap-2">
            <span className={darkMode ? "px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm font-semibold shadow" : "px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-semibold shadow"}>Gemini Powered</span>
            <button
              className={darkMode ? "ml-2 px-2 py-1 rounded bg-gray-800 text-blue-200 border border-blue-700 shadow hover:bg-blue-900 transition" : "ml-2 px-2 py-1 rounded bg-gray-200 text-blue-700 border border-blue-300 shadow hover:bg-blue-100 transition"}
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? "🌙" : "☀️"}
            </button>
          </div>
        </header>

        <form onSubmit={handleSubmit} className={darkMode ? "bg-gray-900 rounded-xl shadow-lg p-6 mb-8 border border-blue-900" : "bg-white rounded-xl shadow-lg p-6 mb-8 border border-blue-100"}>
          <label className={darkMode ? "block mb-2 font-semibold text-blue-200" : "block mb-2 font-semibold text-gray-700"}>Topic for Gemini</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic for Gemini"
            className={darkMode ? "w-full p-3 border-2 border-blue-900 rounded-lg focus:outline-none focus:border-blue-400 transition mb-4 bg-gray-800 text-blue-100" : "w-full p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition mb-4"}
          />
          <div className="flex items-center mb-4">
            <button
              type="button"
              onClick={handleGenerate}
              className={darkMode ? "bg-purple-700 text-white px-5 py-2 rounded-lg hover:bg-purple-800 transition mr-2 shadow" : "bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition mr-2 shadow"}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate with Gemini'}
            </button>
            <span className={darkMode ? "text-blue-300 text-sm" : "text-gray-400 text-sm"}>(Auto-adds generated post below)</span>
          </div>
          <label className={darkMode ? "block mb-2 font-semibold text-blue-200" : "block mb-2 font-semibold text-gray-700"}>Write or Edit Your Post</label>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className={darkMode ? "w-full p-3 border-2 border-blue-900 rounded-lg focus:outline-none focus:border-blue-400 transition mb-4 resize-none bg-gray-800 text-blue-100" : "w-full p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition mb-4 resize-none"}
            rows={5}
            placeholder="Write or edit your post..."
          />
          <button
            type="submit"
            className={darkMode ? "bg-blue-800 text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition shadow" : "bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow"}
            disabled={!newPost.trim()}
          >
            Submit
          </button>
        </form>

        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className={darkMode ? "text-center text-blue-300 py-8" : "text-center text-gray-400 py-8"}>No posts yet. Generate or submit your first post!</div>
          ) : (
            posts.map((post, idx) => (
              <div
                key={idx}
                className={darkMode ? "bg-gray-900 border border-blue-900 rounded-xl shadow-md p-6 hover:shadow-lg transition group flex items-start gap-4" : "bg-white border border-blue-100 rounded-xl shadow-md p-6 hover:shadow-lg transition group flex items-start gap-4"}
              >
                {/* Fixed Sticker */}
                <img
                  src={stickerUrl}
                  alt="Sticker"
                  className={darkMode
                    ? "flex-shrink-0 w-16 h-16 rounded-xl shadow-xl border-4 border-blue-900 object-cover bg-gray-800"
                    : "flex-shrink-0 w-16 h-16 rounded-xl shadow-xl border-4 border-blue-300 object-cover bg-white"
                  }
                  title="Sticker"
                />
                {/* Post Content */}
                <div className="flex-1">
                  <div className={darkMode ? "text-blue-100 text-lg leading-relaxed whitespace-pre-line" : "text-gray-800 text-lg leading-relaxed whitespace-pre-line"}>
                    {typeof post === 'string' ? post : post.content}
                  </div>
                  <div className="flex justify-end mt-4">
                    <span className={darkMode ? "text-xs text-blue-400 group-hover:text-blue-200 transition" : "text-xs text-blue-400 group-hover:text-blue-600 transition"}>Post #{idx + 1}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
