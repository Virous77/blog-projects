import { useState } from "react";
import { Comment } from "../utils/util";
import CommentInput from "./comment-form";

const CommentsItem = ({
  comment,
  onUpdateComments,
}: {
  comment: Comment;
  onUpdateComments: (updatedComments: Comment[]) => void;
}) => {
  const [reply, setReply] = useState(false);
  return (
    <div className="p-2 bg-zinc-800 rounded">
      <p className=" text-white font-bold">{comment.content}</p>
      <div>
        {reply && (
          <CommentInput
            handleAddComment={(e) => onUpdateComments([...comment.children, e])}
          />
        )}
        <button
          className=" bg-zinc-600 text-white px-6 py-1 rounded mt-2"
          onClick={() => setReply(!reply)}
        >
          {reply ? "Cancel" : "Reply"}
        </button>
      </div>
      <div className=" flex flex-col gap-2">
        {comment.children.map((child, index) => (
          <CommentsItem
            key={index}
            comment={child}
            onUpdateComments={(updatedComments) => {
              const updatedChildren = [...comment.children];
              updatedChildren[index] = { ...child, children: updatedComments };
              onUpdateComments(updatedChildren);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsItem;
