import { useState } from "react";
import { Comment } from "../utils/util";
import CommentInput from "./comment-form";
import CommentsItem from "./commnet-items";

const CommentComp = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  const handleAddComment = (comment: Comment) => {
    setComments((prevComments) => [...prevComments, comment]);
  };

  return (
    <main className=" bg-black flex justify-center">
      <div className="flex flex-col gap-2 md:w-[800px] w-[95%]">
        <CommentInput handleAddComment={handleAddComment} />

        <div className=" flex flex-col gap-2 overflow-scroll  h-[93vh]">
          {comments.map((comment, index) => (
            <CommentsItem
              key={index}
              comment={comment}
              onUpdateComments={(updatedComments) => {
                const updatedCommentsArray = [...comments];
                updatedCommentsArray[index].children = updatedComments;
                setComments(updatedCommentsArray);
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default CommentComp;
