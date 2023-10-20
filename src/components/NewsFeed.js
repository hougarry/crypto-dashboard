import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"

const NewsFeed = () => {

    const [articles, setArticles] = useState(null) // Set the initial state to an empty array


    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: 'http://localhost:8000/news'

            }

            try {
                const response = await axios.request(options)
                const receivedArticles = response.data
                const limitedArticles = receivedArticles.slice(0, 12) // Limit to the first 12 articles
                setArticles(limitedArticles) 
            } catch (error) {
                console.error(error)
    
            }
        }

        fetchData() // Call the async function to fetch data

    }, []) // Empty array means this will only run once (on mount)

    
    console.log(articles)


    return (
        <div className="news-feed">
            <h2>NewsFeed</h2>
            {articles?.map((article, _index) => (
                <div key={_index}>  
                    <a href={article.URL} >
                        <p>{article.Title}</p>
                    </a>
                    
                </div>
            ))}
        </div>
    )
}

export default NewsFeed
