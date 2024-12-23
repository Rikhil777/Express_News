import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import { FaSearch } from "react-icons/fa";

function App() {
    const [news, setNews] = useState([]);
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("");
    const newsContainerRef = useRef(null);

    useEffect(() => {
        fetchNews();
    }, [category]);

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
            });
            
       
            const articlesWithImages = response.data.articles.filter(
                article => article.urlToImage
            );
            setNews(articlesWithImages);
        } catch (error) {
            console.error("Error fetching news", error);
            alert("Failed to fetch news. Please try again.");
        }
    };

    const handleSearch = (e) => {
        
        if (e.type === 'click' || e.key === 'Enter') {
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

    return (
        <div className="App dark">
            <header className="header">
                <img src="/express.png" alt="website logo" className="logo" />
                <h1>Express News</h1>
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