import { api } from "@/utils/api";
import { LoadingSpinner } from "./LoadingSpinner";
import { Post } from "./Post";

export const Feed: React.FC = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!data) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="flex flex-col">
      {data.map(({ post, author }) => (
        <Post post={post} author={author} key={post.id} />
      ))}
    </div>
  );
};
