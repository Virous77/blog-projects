import {
  ErrorComponent,
  ErrorRouteProps,
  Link,
  createFileRoute,
} from "@tanstack/react-router";
import { PostNotFoundError } from "../posts";
import { postQueryOptions } from "../postQueryOptions";

export const Route = createFileRoute("/posts/$postId")({
  loader: ({ context: { queryClient }, params: { postId } }) =>
    queryClient.ensureQueryData(postQueryOptions(postId)),
  errorComponent: PostErrorComponent,
  component: PostComponent,
});

export function PostErrorComponent({ error }: ErrorRouteProps) {
  if (error instanceof PostNotFoundError) {
    return <div>{error.message}</div>;
  }

  return <ErrorComponent error={error} />;
}

function PostComponent() {
  const post = Route.useLoaderData();

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{post.title}</h4>
      <div className="text-sm">{post.body}</div>
      <Link
        to="/posts/$postId/deep"
        params={{
          postId: post.id,
        }}
        activeProps={{ className: "text-black font-bold" }}
        className="block py-1 text-blue-800 hover:text-blue-600"
      >
        Deep View
      </Link>
    </div>
  );
}
