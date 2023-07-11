import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import {fetchPosts, fetchTags} from '../redux/slices/posts';

import { isPlainObject } from '@reduxjs/toolkit';

export const Home = () => {
   const dispatch = useDispatch();
   const {posts, tags} = useSelector(state => state.posts);
  
  //check it again
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';


  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);


  console.log(tags);
  console.log(posts);
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => isPostsLoading ? (
              <Post key={index} isLoading={true} /> 
              ) : ( 
              <Post
                key={obj._id}  
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl}
                //"https://i.etsystatic.com/23574096/r/il/894745/2705320140/il_794xN.2705320140_3h5q.jpg"
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
              
                isEditable
              />
          ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'John Simo',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Comment 1',
              },
              {
                user: {
                  fullName: 'Ricardo Martinez',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
