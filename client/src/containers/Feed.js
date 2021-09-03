import React from "react";
import { Header, Post } from "../components";

function Feed() {
  return (
    <div className="feed">
      {/* Header */}
      <Header text="Home" />

      {/* Post */}
      <Post
        id="1"
        username="shanmukha"
        description="This is a Quiz About Hinduism"
        verified
        timestamp="Jun 10"
        image="https://mumbaimirror.indiatimes.com/thumb/msid-65825554,width-1200,height-900,resizemode-4/.jpg"
        likes="1.38K"
        dislikes="0"
        liked
        disliked
        bookmarked
      />
    </div>
  );
}

export default Feed;
