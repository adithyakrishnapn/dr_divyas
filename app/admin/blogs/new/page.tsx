import { requireAdminSession } from "@/lib/auth";
import { NewBlogForm } from "./new-blog-form";

export default async function NewBlogPage() {
  await requireAdminSession();
  return <NewBlogForm />;
}
