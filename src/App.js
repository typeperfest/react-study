import React, {useMemo, useRef, useState} from "react";
import './styles/app.css'
import PostList from "./Components/PostList";
import MyButton from "./Components/UI/button/MyButton";
import MyInput from "./Components/UI/input/MyInput";
import PostForm from "./Components/PostForm";
import MySelect from "./Components/UI/select/MySelect";


function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Javafdsffgscript', body: 'fgdsg'},
    {id: 2, title: 'sgfd 2', body: 'sfdg'},
    {id: 3, title: 'Javassfdcript 3', body: 'sfdgsfd'},
  ]);

  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedPosts = useMemo( () => {
      console.log('ОБРАБОТКА')
      if(selectedSort) {
          return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
      }
      return posts
  }, [selectedSort, posts]);

  const sortedAndSearchedPosts = useMemo( () => {
      return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery))
  }, [searchQuery, sortedPosts]);

  const createPost = (newPost) => {
      setPosts([...posts, newPost])
  }

  const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort) => {
      setSelectedSort(sort)
  }

  return (
    <div className="App">
      <PostForm create={createPost}/>
        <hr style={{margin: '15px'}}/>
        <div>
            <MyInput
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Поиск"
            />
            <MySelect
                value={selectedSort}
                onChange={sortPosts}
                defaultValue="Сортировка по"
                options={[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'}
                ]}
            />
        </div>
        {sortedAndSearchedPosts.length !== 0
            ?
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов"/>
            :
            <h1 style={{textAlign: 'center'}}>
                Посты не найдены
            </h1>
        }
    </div>
  );
}

export default App;
