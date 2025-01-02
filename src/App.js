import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import logo from "./express.png";
import { Login, Register } from './components/Auth';

function App() {
    const [news, setNews] = useState([]);
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("");
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(true);
    const newsContainerRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token && username) {
            setUser({ token, username });
        }
    }, []);

    useEffect(() => {
        if (user) {
            fetchNews();
        }
    }, [category, user]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.remove('scroll-popup');
                    void entry.target.offsetWidth;
                    if (entry.isIntersecting) {
                        entry.target.classList.add('scroll-popup');
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            }
        );

        const newsCards = document.querySelectorAll('.news-card');
        newsCards.forEach((card) => observer.observe(card));

        return () => {
            newsCards.forEach((card) => observer.unobserve(card));
        };
    }, [news]);

    const fetchNews = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/news", {
                params: { 
                    q: query, 
                    category 
                },
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            
            const articlesWithImages = response.data.articles.filter(
                article => article.urlToImage
            );
            setNews(articlesWithImages);
        } catch (error) {
            console.error("Error fetching news", error);
            if (error.response?.status === 401) {
                handleLogout();
            } else {
                alert("Failed to fetch news. Please try again.");
            }
        }
    };

    const handleSearch = (e) => {
        if (e.type === 'click' || e.key === 'Enter') {
            e.preventDefault();
            if (query.trim() === "") {
                alert("Please enter a search term!");
                return;
            }
            setCategory("");
            fetchNews();
        }
    };

    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
        setQuery("");
        fetchNews();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUser(null);
        setNews([]);
    };

    if (!user) {
        return (
            <div className="App dark">
                <header className="header">
                    <img src={logo} alt="website logo" className="logo" />
                    <h1>Express News</h1>
                </header>
                {showLogin ? (
                    <Login 
                        onLogin={setUser} 
                        switchToRegister={() => setShowLogin(false)} 
                    />
                ) : (
                    <Register 
                        onRegister={setUser} 
                        switchToLogin={() => setShowLogin(true)} 
                    />
                )}
            </div>
        );
    }

    return (
        <div className="App dark">
            <header className="header">
                <img src={logo} alt="website logo" className="logo" />
                <h1>Express News</h1>
                <div className="user-info">
                    <span>Welcome, {user.username}!</span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search news..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => handleSearch(e)}
                    />
                    <button onClick={(e) => handleSearch(e)}>
                        <FaSearch />
                    </button>
                </div>
                <div className="categories">
                    {["", "technology", "sports", "business", "entertainment"].map((cat) => (
                        <button
                            key={cat}
                            className={category === cat ? "active-category" : ""}
                            onClick={() => handleCategoryChange(cat)}
                        >
                            {cat || "All"}
                        </button>
                    ))}
                </div>
            </header>
            <main>
                <div className="news-container" ref={newsContainerRef}>
                    {news.length === 0 ? (
                        <p>No results found. Try a different search term or category.</p>
                    ) : (
                        news.map((article, index) => (
                            <div key={index} className="news-card">
                                <img
                                    src={article.urlToImage}
                                    alt="News"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://via.placeholder.com/300x200?text=No+Image+Available"
                                    }}
                                />
                                <h3>{article.title}</h3>
                                <p>{article.description}</p>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Read more
                                </a>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;