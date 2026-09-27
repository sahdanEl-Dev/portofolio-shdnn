import { pgTable, serial, text, timestamp, boolean, pgEnum, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isRead: boolean("is_read").notNull().default(false),
});

export const projectStatus = pgEnum("project_status", ["completed", "in_progress"]);

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  techStack: text("tech_stack").notNull(),
  status: projectStatus("status").notNull().default("in_progress"),
  demoUrl: text("demo_url"),
  repoUrl: text("repo_url"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const galleryPosts = pgTable("gallery_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull().default("General"),
  takenAt: timestamp("taken_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  postId: integer("post_id")
    .notNull()
    .references(() => galleryPosts.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull(),
  publicId: text("public_id").notNull(),
  order: integer("order").notNull().default(0),
});

export const galleryPostsRelations = relations(galleryPosts, ({ many }) => ({
  images: many(galleryImages),
}));

export const galleryImagesRelations = relations(galleryImages, ({ one }) => ({
  post: one(galleryPosts, {
    fields: [galleryImages.postId],
    references: [galleryPosts.id],
  }),
}));

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  coverImageUrl: text("cover_image_url"),
  coverImagePublicId: text("cover_image_public_id"),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const pageViews = pgTable("page_views", {
  id: serial("id").primaryKey(),
  path: text("path").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});