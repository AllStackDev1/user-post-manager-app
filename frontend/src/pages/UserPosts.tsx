import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { Trash2, ChevronRight, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import AddPostDialog from "@/components/AddPostDialog";

const UserPosts = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => api.getUser(userId),
    enabled: !!userId,
  });

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => api.getUserPosts(userId),
    enabled: !!userId,
  });

  const deleteMutation = useMutation({
    mutationFn: api.deletePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts", userId] });
      const previousPosts = queryClient.getQueryData(["posts", userId]);

      queryClient.setQueryData(["posts", userId], (old: any) =>
        old?.filter((post: any) => post.id !== postId)
      );

      return { previousPosts };
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(["posts", userId], context?.previousPosts);
      toast.error("Failed to delete post");
    },
    onSuccess: () => {
      toast.success("Post deleted successfully");
    },
  });

  const isLoading = userLoading || postsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2 text-foreground">
            User Not Found
          </h2>
          <Button onClick={() => navigate("/")}>Back to Users</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-6xl space-y-10">
        <div className="text-sm flex items-center gap-2.5">
          <Link to="/">
            <span className="text-muted-foreground">Users</span>
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>{user.name}</span>
        </div>

        <div className="space-y-5">
          <h1 className="text-4xl font-medium text-foreground">{user.name}</h1>
          <p className="text-muted-foreground mb-1">
            {user.email} • <span className="text-foreground">{posts?.length || 0} Posts</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[400px] gap-4">
          <Card
            role="button"
            className="p-6 flex items-center justify-center gap-2 cursor-pointer shadow-md"
            onClick={() => setIsDialogOpen(true)}
          >
            <div className="flex flex-col items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              <p className="font-semibold">New Post</p>
            </div>
          </Card>
          {posts?.map((post) => (
            <Card key={post.id} className="p-6 relative shadow-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteMutation.mutate(post.id)}
                disabled={deleteMutation.isPending}
                className="absolute top-2 right-2 hover:bg-destructive/10 hover:text-destructive h-8 w-8"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <h3 className="text-lg font-semibold text-foreground mb-3 pr-8 capitalize">
                {post.title}
              </h3>
              <p className="text-foreground leading-relaxed line-clamp-[11]">
                {post.body}
              </p>
            </Card>
          ))}
        </div>
      </div>

      <AddPostDialog
        userId={userId}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};

export default UserPosts;
