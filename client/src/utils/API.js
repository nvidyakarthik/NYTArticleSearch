import axios from "axios";
const APIKEY = "ab90f8c5a4d5439083721c1808c112e9";
//const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

export default {
  // Gets all articles
  getArticles: function(topic,startdate,enddate) {
    return axios.get("/api/articles" , { params:
   { 
      q: topic,
      begin_date:startdate+"0101",
      end_date:enddate+"0101",
      'api-key':APIKEY } 
    });
  },
  getSavedArticles: function() {
    return axios.get("/api/articles/saved");
  },
   // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};