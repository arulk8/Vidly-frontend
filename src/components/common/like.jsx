import React from "react";
const style = { cursor: "pointer" };
const Like = props => {
  const classname = props.liked ? "fa fa-heart" : "fa fa-heart-o";
  return <div style={style} className={classname} onClick={props.onLike} />;
};

export default Like;
