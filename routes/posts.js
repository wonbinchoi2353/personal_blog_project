const express = require("express");
const router = express.Router();
// const { ObjectId } = require("mongodb");

const data = [];

// 게시글 작성
const Post = require("../schemas/posts");
router.post("/posts", async (req, res) => {
  const { user, password, title, content } = req.body;

  const createdPosts = await Post.create({
    user,
    password,
    title,
    content,
  });

  res.json({ message: "게시글을 생성하였습니다.", data: createdPosts });
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

// 게시글 수정
router.put("/posts/:postId", async (req, res) => {
  const { password, title, content } = req.body;

  const posts = await Post.find();
  const data = posts.filter((post) => post._id === req.body._id);
  if (data.length) {
  }

  res.json({ data: data });

  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (existsCarts.length) {
    await Post.updateOne({ goodsId: Number(goodsId) }, { $set: { quantity } });
  }

  res.json({ success: true });
});

// 게시글 삭제

module.exports = router;
