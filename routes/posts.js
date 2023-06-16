const express = require("express");
const router = express.Router();

const data = [];

// 게시글 작성
const Post = require("../schemas/posts");
router.post("/posts", async (req, res) => {
  if (!req.body || !req.params) {
    res
      .status(400)
      .json({ success: false, message: "데이터 형식이 올바르지 않습니다." });
  }
  const { user, password, title, content } = req.body;
  try {
    const createdPosts = await Post.create({
      user,
      password,
      title,
      content,
    });
    res.json({
      message: "게시글을 생성하였습니다.",
      data: createdPosts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 게시글 목록 조회
router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  const data = posts.map((post) => {
    return {
      postId: post._id,
      user: post.user,
      title: post.title,
      createdAt: post.createdAt,
    };
  });
  res.json({ data: data });
});

// 게시글 상세 조회
router.get("/posts/:_postId", async (req, res) => {
  // 언제 오류가 생기는지 알 수 없음
  if (!req.body || !req.params) {
    res
      .status(400)
      .json({ success: false, message: "데이터 형식이 올바르지 않습니다." });
  }
  try {
    const { _postId } = req.params;
    const posts = await Post.find();
    const data = posts
      .filter((post) => post._id.toString() === _postId)
      .map((post) => {
        return {
          postId: post._id,
          user: post.user,
          title: post.title,
          content: post.content,
          createdAt: post.createdAt,
        };
      });
    res.json({ data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 게시글 수정
router.put("/posts/:_postId", async (req, res) => {
  if (!req.body || !req.params) {
    res
      .status(400)
      .json({ success: false, message: "데이터 형식이 올바르지 않습니다." });
  }
  const { password, title, content } = req.body;
  try {
    const { _postId } = req.params;
    const existsPost = await Post.find({ _id: _postId });
    if (existsPost.length) {
      await Post.updateOne(
        { _id: _postId },
        { $set: { password: password, title: title, content: content } }
      );
      res.json({ message: "게시글을 수정하였습니다." });
    } else {
      res
        .status(404)
        .json({ success: false, message: "게시글 조회에 실패하였습니다." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 게시글 삭제

module.exports = router;
