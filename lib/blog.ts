import { FieldValue } from "firebase-admin/firestore";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import sanitizeHtml from "sanitize-html";
import { getFirebaseAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
  contentHtml: string;
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  published: boolean;
  views: number;
};

type FirestoreBlogDoc = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime?: string;
  image?: string;
  contentHtml: string;
  keywords?: string[];
  metaTitle?: string;
  metaDescription?: string;
  published?: boolean;
  views?: number;
};

export type CreateBlogInput = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  contentHtml: string;
  keywords?: string[];
  metaTitle?: string;
  metaDescription?: string;
  published?: boolean;
};

export type UpdateBlogInput = CreateBlogInput;

const legacyBlogPosts: Array<{
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
}> = [
  {
    slug: "daily-skincare-routine-for-indian-weather",
    title: "Daily Skincare Routine For Indian Weather",
    description:
      "A dermatologist-approved morning and evening skincare routine that works in heat, humidity, and pollution.",
    date: "2026-04-15",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Indian weather changes quickly between heat, humidity, and dust. A simple routine is better than a complicated one.",
      "Morning: gentle cleanser, vitamin C serum, lightweight moisturizer, and broad-spectrum sunscreen SPF 50.",
      "Evening: remove sunscreen and makeup, cleanse again, apply treatment serum based on your skin concern, and finish with a barrier-support moisturizer.",
      "Do not skip sunscreen even on cloudy days. Pigmentation and tanning worsen with irregular protection.",
    ],
  },
  {
    slug: "how-to-manage-acne-without-damaging-skin",
    title: "How To Manage Acne Without Damaging Skin",
    description:
      "Safe acne care tips from Dr Divya to reduce breakouts, avoid scarring, and improve skin barrier health.",
    date: "2026-04-05",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Acne treatment should focus on reducing inflammation and protecting the skin barrier.",
      "Avoid harsh scrubs and frequent face washing. These can trigger more oil production and irritation.",
      "Use salicylic acid or adapalene only as advised. Spot treatment should be targeted and consistent.",
      "For deep acne, doctor-guided procedures and a custom plan can prevent long-term scars and dark marks.",
    ],
  },
  {
    slug: "pigmentation-treatment-options-explained",
    title: "Pigmentation Treatment Options Explained",
    description:
      "Understand causes of pigmentation and the best treatment options including peels, lasers, and topical routines.",
    date: "2026-03-22",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Pigmentation can be caused by sun exposure, acne marks, hormones, or skin inflammation.",
      "A proper treatment plan combines home care, strict sunscreen usage, and in-clinic procedures if needed.",
      "Chemical peels and laser toning are selected based on skin type, sensitivity, and depth of pigmentation.",
      "Results are gradual. Consistency and follow-up are key for even tone and healthy glow.",
    ],
  },
];

const BLOG_COLLECTION = "blogs";
const LOCAL_BLOG_STORE_PATH = path.join(process.cwd(), "data", "blogs.json");

function canPersistToLocalBlogStore() {
  return process.env.NODE_ENV === "development" && process.env.VERCEL !== "1";
}

function isExpectedBlogError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  const { message } = error;
  return (
    message === "A blog with this slug already exists." ||
    message === "Blog post not found." ||
    message === "Built-in sample posts cannot be deleted."
  );
}

function shouldFallbackToLocalStore(error: unknown) {
  return canPersistToLocalBlogStore() && !isExpectedBlogError(error);
}

function getRemoteBlogPersistError() {
  return new Error(
    "Blog publishing requires Firebase on the server. Add FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY to your hosting provider, then redeploy.",
  );
}

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    "p",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "blockquote",
    "strong",
    "em",
    "u",
    "a",
    "br",
    "hr",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
};

function stripTags(input: string) {
  return input.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function getReadTimeFromHtml(contentHtml: string) {
  const text = stripTags(contentHtml);
  const words = text ? text.split(" ").length : 0;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

function normalizeKeywords(keywords?: string[]) {
  if (!keywords?.length) {
    return [];
  }

  return keywords
    .map((word) => word.trim().toLowerCase())
    .filter(Boolean)
    .filter((word, index, arr) => arr.indexOf(word) === index)
    .slice(0, 20);
}

function mapLegacyPost(post: (typeof legacyBlogPosts)[number]): BlogPost {
  const contentHtml = post.content.map((paragraph) => `<p>${paragraph}</p>`).join("\n");

  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    readTime: post.readTime,
    image: post.image,
    contentHtml,
    keywords: ["skincare", "dermatology", "skin clinic", "coimbatore"],
    metaTitle: post.title,
    metaDescription: post.description,
    published: true,
    views: 0,
  };
}

function mapFirestorePost(data: FirestoreBlogDoc): BlogPost | null {
  const slug = data.slug?.trim().toLowerCase();
  const title = data.title?.trim();
  const description = data.description?.trim();
  const contentHtml = data.contentHtml?.trim();

  if (!slug || !title || !description || !contentHtml) {
    return null;
  }

  const cleanHtml = sanitizeHtml(contentHtml, sanitizeOptions);

  return {
    slug,
    title,
    description,
    date: data.date || new Date().toISOString(),
    readTime: data.readTime ?? getReadTimeFromHtml(cleanHtml),
    image:
      data.image ??
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80",
    contentHtml: cleanHtml,
    keywords: normalizeKeywords(data.keywords),
    metaTitle: data.metaTitle?.trim() || title,
    metaDescription: data.metaDescription?.trim() || description,
    published: data.published ?? true,
    views: Number(data.views ?? 0),
  };
}

function toFirestoreBlogDoc(payload: FirestoreBlogDoc) {
  const doc: Record<string, unknown> = {
    slug: payload.slug,
    title: payload.title,
    description: payload.description,
    date: payload.date,
    readTime: payload.readTime,
    contentHtml: payload.contentHtml,
    keywords: payload.keywords ?? [],
    metaTitle: payload.metaTitle,
    metaDescription: payload.metaDescription,
    published: payload.published ?? true,
    views: payload.views ?? 0,
  };

  if (payload.image?.trim()) {
    doc.image = payload.image.trim();
  }

  return doc;
}

export const blogPosts: BlogPost[] = legacyBlogPosts.map(mapLegacyPost);

async function readLocalPosts() {
  try {
    const raw = await readFile(LOCAL_BLOG_STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as BlogPost[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLocalPosts(posts: BlogPost[]) {
  await mkdir(path.dirname(LOCAL_BLOG_STORE_PATH), { recursive: true });
  await writeFile(LOCAL_BLOG_STORE_PATH, JSON.stringify(posts, null, 2), "utf8");
}

function dedupePosts(posts: BlogPost[]) {
  const bySlug = new Map<string, BlogPost>();

  for (const post of posts) {
    bySlug.set(post.slug, post);
  }

  return [...bySlug.values()];
}

function sortByDateDesc(posts: BlogPost[]) {
  return [...posts].sort((left, right) => {
    return new Date(right.date).getTime() - new Date(left.date).getTime();
  });
}

async function getLocalPostsMerged() {
  const localPosts = await readLocalPosts();
  return dedupePosts(sortByDateDesc([...localPosts, ...blogPosts]));
}

async function getFirestorePosts() {
  const db = getFirebaseAdminDb();
  const snapshot = await db.collection(BLOG_COLLECTION).get();

  return snapshot.docs
    .map((doc) => mapFirestorePost(doc.data() as FirestoreBlogDoc))
    .filter((post): post is BlogPost => post !== null);
}

async function mergePostsWithFirestore(firestorePosts: BlogPost[]) {
  const localPosts = await readLocalPosts();
  return dedupePosts(sortByDateDesc([...blogPosts, ...localPosts, ...firestorePosts]));
}

async function findAnyPostBySlug(slug: string) {
  const mergedPosts = await getAllPostsForAdmin();
  return mergedPosts.find((post) => post.slug === slug);
}

async function updateLocalPosts(slug: string, post: BlogPost) {
  const localPosts = await readLocalPosts();
  const nextPosts = localPosts.filter((item) => item.slug !== slug);
  nextPosts.push(post);
  await writeLocalPosts(nextPosts);
}

async function deleteLocalPost(slug: string) {
  const localPosts = await readLocalPosts();
  const nextPosts = localPosts.filter((post) => post.slug !== slug);

  if (nextPosts.length === localPosts.length) {
    return false;
  }

  await writeLocalPosts(nextPosts);
  return true;
}

export async function getPublishedPosts() {
  if (!isFirebaseAdminConfigured()) {
    return (await getLocalPostsMerged()).filter((post) => post.published !== false);
  }

  try {
    const merged = await mergePostsWithFirestore(await getFirestorePosts());
    return merged.filter((post) => post.published !== false);
  } catch (error) {
    console.error("Failed to load published blog posts from Firestore.", error);
    return (await getLocalPostsMerged()).filter((post) => post.published !== false);
  }
}

export async function getAllPostsForAdmin() {
  if (!isFirebaseAdminConfigured()) {
    return getLocalPostsMerged();
  }

  try {
    return mergePostsWithFirestore(await getFirestorePosts());
  } catch (error) {
    console.error("Failed to load admin blog posts from Firestore.", error);
    return getLocalPostsMerged();
  }
}

export async function getPostBySlug(slug: string) {
  const normalizedSlug = slug.trim().toLowerCase();

  if (isFirebaseAdminConfigured()) {
    try {
      const firestorePost = (await getFirestorePosts()).find((post) => post.slug === normalizedSlug);
      if (firestorePost) {
        return firestorePost;
      }
    } catch (error) {
      console.error("Failed to load blog post from Firestore.", error);
    }
  }

  return (await getLocalPostsMerged()).find((post) => post.slug === normalizedSlug);
}

export async function getAllPostsForSitemap() {
  return getPublishedPosts();
}

export async function createBlogPost(input: CreateBlogInput) {
  const normalizedSlug = input.slug.trim().toLowerCase();

  const cleanHtml = sanitizeHtml(input.contentHtml, sanitizeOptions);
  const payload: FirestoreBlogDoc = {
    slug: normalizedSlug,
    title: input.title.trim(),
    description: input.description.trim(),
    date: new Date().toISOString(),
    readTime: getReadTimeFromHtml(cleanHtml),
    image: input.image?.trim(),
    contentHtml: cleanHtml,
    keywords: normalizeKeywords(input.keywords),
    metaTitle: input.metaTitle?.trim() || input.title.trim(),
    metaDescription: input.metaDescription?.trim() || input.description.trim(),
    published: input.published ?? true,
    views: 0,
  };

  if (isFirebaseAdminConfigured()) {
    try {
      const db = getFirebaseAdminDb();
      const existingSnapshot = await db
        .collection(BLOG_COLLECTION)
        .where("slug", "==", normalizedSlug)
        .limit(1)
        .get();

      if (!existingSnapshot.empty) {
        throw new Error("A blog with this slug already exists.");
      }

      await db.collection(BLOG_COLLECTION).add({
        ...toFirestoreBlogDoc(payload),
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });

      const savedPost = mapFirestorePost(payload);
      if (!savedPost) {
        throw new Error("Unable to save blog post to Firestore.");
      }

      return savedPost;
    } catch (error) {
      if (!shouldFallbackToLocalStore(error)) {
        throw error instanceof Error ? error : new Error("Unable to save blog post to Firestore.");
      }

      const localPosts = await readLocalPosts();
      if (localPosts.some((post) => post.slug === normalizedSlug)) {
        throw new Error("A blog with this slug already exists.");
      }

      const mappedPost = mapFirestorePost(payload);
      if (!mappedPost) {
        throw new Error("Unable to save blog post.");
      }

      const localPost: BlogPost = {
        ...mappedPost,
        slug: normalizedSlug,
      };

      await writeLocalPosts([...localPosts, localPost]);
      return localPost;
    }
  }

  if (!canPersistToLocalBlogStore()) {
    throw getRemoteBlogPersistError();
  }

  const localPosts = await readLocalPosts();
  if (localPosts.some((post) => post.slug === normalizedSlug)) {
    throw new Error("A blog with this slug already exists.");
  }

  const mappedPost = mapFirestorePost(payload);
  if (!mappedPost) {
    throw new Error("Unable to save blog post.");
  }

  const localPost: BlogPost = {
    ...mappedPost,
    slug: normalizedSlug,
  };

  await writeLocalPosts([...localPosts, localPost]);

  return localPost;
}

export async function updateBlogPost(currentSlug: string, input: UpdateBlogInput) {
  const normalizedCurrentSlug = currentSlug.trim().toLowerCase();
  const normalizedNextSlug = input.slug.trim().toLowerCase();
  const cleanHtml = sanitizeHtml(input.contentHtml, sanitizeOptions);
  const existingPost = await findAnyPostBySlug(normalizedCurrentSlug);

  if (!existingPost) {
    throw new Error("Blog post not found.");
  }

  const nextPost: BlogPost = {
    ...existingPost,
    slug: normalizedNextSlug,
    title: input.title.trim(),
    description: input.description.trim(),
    image: input.image?.trim() || existingPost.image,
    contentHtml: cleanHtml,
    keywords: normalizeKeywords(input.keywords),
    metaTitle: input.metaTitle?.trim() || input.title.trim(),
    metaDescription: input.metaDescription?.trim() || input.description.trim(),
    published: input.published ?? existingPost.published,
    readTime: getReadTimeFromHtml(cleanHtml),
  };

  if (isFirebaseAdminConfigured()) {
    try {
      const db = getFirebaseAdminDb();
      const snapshot = await db
        .collection(BLOG_COLLECTION)
        .where("slug", "==", normalizedCurrentSlug)
        .limit(1)
        .get();

      if (!snapshot.empty) {
        if (normalizedNextSlug !== normalizedCurrentSlug) {
          const duplicateSnapshot = await db
            .collection(BLOG_COLLECTION)
            .where("slug", "==", normalizedNextSlug)
            .limit(1)
            .get();

          if (!duplicateSnapshot.empty) {
            throw new Error("A blog with this slug already exists.");
          }
        }

        await snapshot.docs[0].ref.update({
          ...nextPost,
          updatedAt: FieldValue.serverTimestamp(),
        });

        return nextPost;
      }
    } catch (error) {
      if (!shouldFallbackToLocalStore(error)) {
        throw error instanceof Error ? error : new Error("Unable to update blog post in Firestore.");
      }
    }
  }

  if (!canPersistToLocalBlogStore()) {
    throw getRemoteBlogPersistError();
  }

  const localPosts = await readLocalPosts();
  const duplicate = localPosts.some(
    (post) => post.slug === normalizedNextSlug && post.slug !== normalizedCurrentSlug,
  );

  if (duplicate) {
    throw new Error("A blog with this slug already exists.");
  }

  await deleteLocalPost(normalizedCurrentSlug);
  await updateLocalPosts(normalizedCurrentSlug, nextPost);

  return nextPost;
}

export async function deleteBlogPost(slug: string) {
  const normalizedSlug = slug.trim().toLowerCase();
  let deleted = false;

  if (isFirebaseAdminConfigured()) {
    try {
      const db = getFirebaseAdminDb();
      const snapshot = await db
        .collection(BLOG_COLLECTION)
        .where("slug", "==", normalizedSlug)
        .limit(1)
        .get();

      if (!snapshot.empty) {
        await snapshot.docs[0].ref.delete();
        deleted = true;
      }
    } catch (error) {
      if (!shouldFallbackToLocalStore(error)) {
        throw error instanceof Error ? error : new Error("Unable to delete blog post from Firestore.");
      }
    }
  }

  if (!canPersistToLocalBlogStore()) {
    if (!deleted) {
      throw new Error("Blog post not found.");
    }

    return true;
  }

  const localDeleted = await deleteLocalPost(normalizedSlug);

  if (!deleted && !localDeleted) {
    const legacyPostExists = blogPosts.some((post) => post.slug === normalizedSlug);

    if (legacyPostExists) {
      throw new Error("Built-in sample posts cannot be deleted.");
    }

    throw new Error("Blog post not found.");
  }

  return true;
}

export async function incrementBlogViews(slug: string) {
  if (isFirebaseAdminConfigured()) {
    try {
      const db = getFirebaseAdminDb();
      const snapshot = await db
        .collection(BLOG_COLLECTION)
        .where("slug", "==", slug)
        .limit(1)
        .get();

      if (!snapshot.empty) {
        await snapshot.docs[0].ref.update({
          views: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        });
        return;
      }
    } catch {
      return;
    }
  }

  if (!canPersistToLocalBlogStore()) {
    return;
  }

  const localPosts = await readLocalPosts();
  const targetIndex = localPosts.findIndex((post) => post.slug === slug);

  if (targetIndex === -1) {
    return;
  }

  const nextPosts = localPosts.map((post) =>
    post.slug === slug ? { ...post, views: post.views + 1 } : post,
  );

  await writeLocalPosts(nextPosts);
}
