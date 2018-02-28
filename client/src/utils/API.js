import axios from "axios";

export default {
  // Gets all articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },

  // NOT NEEDED
  // Searchs NY Times for a article of a given topic
//   searchArticles: function(searchData) {
//     return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", searchData);
//   }
// };



  searchArticles: function(searchData) {
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
    'api-key': "7ef710c13ca94bb784fbb4c4fc064c9c",
      'q': topic,
      'begin_date': begin_date,
      'end_date': end_date
    });
    return axios.get(url);
  }
}

// searchData passed to "searchArticles"
// API.searchArticles({
//   topic:      this.state.topic,
//   begin_date: this.state.begin_date,
//   end_date:   this.state.end_date
// })



// articleData passed to "saveArticle"
// API.saveArticle({
//   headline:    response.docs[].headline.main,
//   snippet:     response.docs[].snippet
//   pub_date:    response.docs[].pub_date,
//   url:         response.docs[].web_url
// })


// Built by LucyBot. www.lucybot.com
// var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
// url += '?' + $.param({
//   'api-key': "7ef710c13ca94bb784fbb4c4fc064c9c",
//   'q': "trump",
//   'begin_date': "20100101",
//   'end_date': "20150101"
// });
// $.ajax({
//   url: url,
//   method: 'GET',
// }).done(function(result) {
//   console.log(result);
// }).fail(function(err) {
//   throw err;
// });

// NY Times Response Object (10 items)
// response.docs[].web_url
// response.docs[].snippet
// response.docs[].pub_date
// response.docs[].headline.main

// https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=7ef710c13ca94bb784fbb4c4fc064c9c&q=trump&begin_date=20100101&end_date=20150101&sort=newest