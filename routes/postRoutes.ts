import { Router, Request, Response, NextFunction } from "express";
import { postService } from "../services/postService.js";

const router = Router();

// Create post
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, authorId, published } = req.body;

    if (!title || !authorId) {
      return res
        .status(400)
        .json({ error: "Title and authorId are required" });
    }

    const post = await postService.createNewPost(
      title,
      content,
      authorId,
      published || false
    );
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

// Get all posts
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await postService.fetchAllPosts();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// Get post by ID
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const post = await postService.fetchPostById(parseInt(id));
    res.json(post);
  } catch (error) {
    next(error);
  }
});

// Update post
router.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const { title, content, published } = req.body;

      const updatedPost = await postService.updateExistingPost(
        parseInt(id),
        title,
        content,
        published !== undefined ? Boolean(published) : undefined
      );
      res.json(updatedPost);
    } catch (error) {
      next(error);
    }
  }
);

// Delete post
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      await postService.removePost(parseInt(id));
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
