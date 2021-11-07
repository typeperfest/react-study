import React from 'react';
import PostItem from "./postItem";

const PostList = ({posts, title, remove}) => {

    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Посты не найдены
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            {posts.map((post, index) =>
                <PostItem remove={remove} number={index + 1} post={post} title={title} key = {post.id}/>
            )}
        </div>
    );
};

export default PostList;