import { useState, useEffect } from 'react';
import Blogs from './components/blogs';
import Skeleton from './components/skeleton';

const App = () => {
    const [blogs, setBlogs] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            fetch(' http://localhost:8000/blogs')
            .then(response => {
                if(!response.ok){
                    throw Error('Sorry, some error occurred while fetching your blogs.');
                }
                return response.json();
            })
            .then(data => {
                setBlogs(data);
                setLoading(false);
                setError(false);
            })
            .catch(err => {
                console.log(err.message);
                setError(true);
            })

        }, 4000)
    })

    return(
        <div>
        <img className='logo' src='https://assets.website-files.com/6143afec68f55570f449ef97/6227bdf760fad5f7510a3411_black_logo.svg'></img>
          <h1>The Pieces Blog</h1>
           {blogs && <Blogs blogs = {blogs} /> }
            <div className="container">
                {loading && [1,2,3,4,5,6,7].map((n) => <Skeleton key={n}/>)}
            </div>
           {error && <div className='container'><span className='error'>Error connecting to the server. Connection failed.</span></div>}
        </div>
    )
}

export default App;