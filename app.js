require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

const postServices = require("./services/placeholderposts");
const app = express();

app.use(cors());

const checkScopes = requiredScopes(process.env.AUTH0_SCOPE);

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});
const port = 3001;

app.get("/preview", async (req, res, next) => {
  const previewPosts = await postServices.getPostsPreview();
  res.json(previewPosts);
});

app.get("/posts/:postId", checkJwt, checkScopes, async (req, res, next) => {
  const { postId } = req.params;

  const fullPost = await postServices.getFullPost(postId);

  res.json(fullPost);
});

app.listen(port, () => {
  console.log(`carallel api listening on port ${port}`);
});
