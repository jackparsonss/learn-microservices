const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    if (comment.status === "rejected") {
      return (
        <li key={comment.id}>Comment does not meet moderation guidelines</li>
      );
    }
    return <li key={comment.id}>{comment.content}</li>;
  });
  return <ul>{renderedComments}</ul>;
};
export default CommentList;
