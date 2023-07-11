import React from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";


export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
    .get(`/posts/${id}`)
    .then((res) => {
      setData(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.warn(err);
      alert('Error getting an article');
    });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }
      return (
    <>
      <Post
      id={data._id}
      title={data.title}
      imageUrl={data.imageUrl}
      //"https://i.etsystatic.com/40549577/r/il/b5a91b/4551931794/il_794xN.4551931794_3ky1.jpg"
      user={data.user}
      createdAt={data.createdAt}
      viewsCount={data.viewsCount}
      commentsCount={3}
      tags={data.tags}
        isFullPost>
        <p>{data.text}</p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "test comment",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
