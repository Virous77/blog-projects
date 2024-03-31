import { FormEvent } from "react";
import { Comment } from "../utils/util";

const CommentInput = ({
  handleAddComment,
}: {
  handleAddComment: (comment: Comment) => void;
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const comment = formData.get("comment") as string;
    if (!comment || comment.trim() === "") return alert("Comment is required");

    handleAddComment({ content: comment, children: [] });
    e.currentTarget.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className=" flex items-center gap-2 p-2">
        <input
          type="text"
          name="comment"
          placeholder="Add comment"
          style={{
            padding: "4px 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "#333",
            outline: "none",
          }}
        />
        <button
          className="bg-zinc-600 text-white px-6 py-1 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
