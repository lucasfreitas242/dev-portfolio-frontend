import { getPublishedPosts } from "@/lib/api";
import { HomeView } from "@/components/home/HomeView";
import { PostSummary } from "@/types/api";

export default async function Home() {
  let posts: PostSummary[] = [];
  try {
    const data = await getPublishedPosts({ pageSize: 4 });
    posts = data.items || [];
  } catch (error) {
    console.error("Failed to load initial posts:", error);
  }

  return <HomeView initialPosts={posts} />;
}
