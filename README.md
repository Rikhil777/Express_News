# **Express News Website**

This project is a dynamic **news website** built using React and powered by a backend API to fetch real-time news articles. It features a clean user interface with search functionality, category filters, and smooth animations for an interactive user experience.

---

## **Table of Contents**

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
4. [Usage](#usage)
5. [Project Structure](#project-structure)
6. [API Configuration](#api-configuration)
7. [Screenshots](#screenshots)
8. [Future Improvements](#future-improvements)

---

## **Features**

- 🎯 **Search News**: Allows users to search for specific news articles.
- 📰 **Category Selection**: Filter news based on categories (e.g., technology, sports, business).
- 🌟 **Smooth Animations**: Interactive hover effects and transitions.
- 🖼️ **Image Handling**: Automatically handles missing images with a placeholder.
- 💻 **Responsive Design**: Optimized for both desktop and mobile devices.
- 🔄 **Real-Time Updates**: News articles fetch and update dynamically from the backend API.

---

## **Technologies Used**

- **Frontend**:
  - React.js
  - CSS (for animations and styling)
  - Axios (HTTP requests)
  - React Icons
- **Backend**:
  - Express.js (API endpoint for fetching news)
- **Other**:
  - Node.js & NPM

---

## **Setup and Installation**

Follow these steps to set up and run the project locally:

### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or later)
- NPM (comes with Node.js)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Rikhil777/Express_News.git
   cd express-news
   ```

2. **Install Dependencies**:
   Navigate to the project root and run:
   ```bash
   npm install
   ```

3. **Run the Backend Server**:
   If you have an API server (Express.js):
   ```bash
   cd server
   node app.js
   ```

4. **Start the Frontend**:
   In the root folder, run:
   ```bash
   npm start
   ```

5. Visit **`http://localhost:3000`** to view the project.

---

## **Usage**

1. **Search Functionality**: Type a keyword in the search bar and hit Enter or the search button.
2. **Category Selection**: Click on a category button to filter news.
3. **Read Articles**: Click "Read More" to view the full article in a new tab.

---

## **Project Structure**

```
express-news/
│
├── public/                   # Static assets (logo, index.html)
|     |__express.png
|     |__favicon.ico
|     |__index.html
|     |__logo192.png
|     |__logo512.png
|     |__manifest.json
|     |__robots.txt                    
├── src/                       # React source code
│   ├── components/            # Reusable components (e.g., SearchBar, NewsCard)
│   ├── App.js                 # Main React component
│   ├── App.css                # Styling for the project
│   └── index.js               # Entry point
│
├── server/                    # Backend server (Express.js)
│   └── app.js                 # Server-side logic for fetching news
│
├── package.json               # Project dependencies
└── README.md                  # Documentation
```

---

## **API Configuration**

- The project fetches news from a backend endpoint. Configure the backend to use a news API (e.g., NewsAPI.org).
- Example Backend Request:
  ```javascript
  const response = await axios.get("http://localhost:5000/api/news", {
    params: { q: query, category }
  });
  ```

---

## **Screenshots**

### Home Page
![Screenshot (22)](https://github.com/user-attachments/assets/d423b65d-9819-4920-a23d-9e0c91d55f22)



### Search Results
![image](https://github.com/user-attachments/assets/bad6a479-926c-4df7-a0b4-abe79ad9a40b)


---

## **Future Improvements**

- Add user authentication for personalized news.
- Implement pagination for better performance.
- Integrate a "Save Article" feature for registered users.
- Add dark/light mode toggle.



## **Contact**

For any questions or suggestions, contact:

- **Name**: Rikhil Kakani  
- **Email**: kakanirikhil7@gmail.com  
- **LinkedIn**: [Rikhil Kakani](https://www.linkedin.com/in/rikhil-kakani-1a139a212/)  




