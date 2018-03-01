const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  headline: { type: String, required: true },
  snippet: { type: String, required: true },
  pub_date: { type: Date, required: true },
  url: { type: String, required: true },
  // saved_date: { type: Date, default: Date.now },
  saved_date: { type: Date, required: true },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;