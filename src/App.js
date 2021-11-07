import React, {useMemo, useRef, useState} from "react";
import './styles/app.css'
import PostList from "./Components/PostList";
import MyButton from "./Components/UI/button/MyButton";
import MyInput from "./Components/UI/input/MyInput";
import PostForm from "./Components/PostForm";
import MySelect from "./Components/UI/select/MySelect";
import PostFilter from "./Components/PostFilter";


function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Javafdsffgscript', body: 'fgdsg'},
    {id: 2, title: 'sgfd 2', body: 'sfdg'},
    {id: 3, title: 'Javassfdcript 3', body: 'sfdgsfd'},
  ]);

  const [filter, setFilter] = useState({sort: '', query: ''})

  const sortedPosts = useMemo( () => {
      console.log('ОБРАБОТКА')
      if(filter.sort) {
          return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
      }
      return posts
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo( () => {
      return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
  }, [filter.query, sortedPosts]);

  const createPost = (newPost) => {
      setPosts([...posts, newPost])
  }

  const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
        <PostForm create={createPost}/>
        <hr style={{margin: '15px'}}/>
        <PostFilter
            filter={filter}
            setFilter={setFilter}
        />
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов"/>
    </div>
  );
}

export default App;
