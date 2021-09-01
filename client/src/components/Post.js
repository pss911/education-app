import React from "react";
import "./styles.css";
import { GoVerified } from "react-icons/go";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { FiMoreVertical } from "react-icons/fi";
import { Avatar } from "@material-ui/core";

function Post({
  id,
  username,
  description,
  verified,
  timestamp,
  image,
  avatar,
  likes,
  dislikes,
  liked,
  disliked,
  bookmarked,
}) {
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src={avatar} />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="left">
            <div className="post__headerText">
              <h3>{username}</h3>
              {verified ? (
                <span>
                  <GoVerified className="post__badge" />
                </span>
              ) : null}
              <h4 className="dot">•</h4>
              <h4 className="timestamp">{timestamp}</h4>
            </div>
            <div className="post__headerDescription">
              <h3>{description}</h3>
            </div>
          </div>
          <div className="right">
            <FiMoreVertical />
          </div>
        </div>
        <img src={image} alt="quiz_image" />
        <div className="post__foter">
          <span className="post__likes">
            {likes ? <h5>{likes}</h5> : ""}
            {!liked ? (
              <ThumbUpAltOutlinedIcon className="post__icon post__icons" />
            ) : (
              <ThumbUpAltIcon
                htmlColor="#0571E6"
                className="post__icon_thubs_up post__icons"
              />
            )}
          </span>
          <span className="post__dislikes">
            {dislikes ? <h5>{dislikes}</h5> : ""}
            {!disliked ? (
              <ThumbDownAltOutlinedIcon className="post__icon post__icons" />
            ) : (
              <ThumbDownAltIcon
                htmlColor="#E71945"
                className="post__icon_thubs_down post__icons"
              />
            )}
          </span>
          {!bookmarked ? (
            <BookmarkBorderIcon className="post__icon post__icons" />
          ) : (
            <BookmarkIcon
              htmlColor="#FFD542"
              className="post__icon_bookmark post__icons"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
