import React, { Component } from "react";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";

class Home extends Component {
  state = {
    articles: [],
    begin_date: "",
    end_date: "",
    topic: "",
    // are headline, snippet, pub_date, url in "articles[], above?"
    // articles[0].response.docs[].headline.main
    // articles[0].response.docs[].snippet
    // articles[0].response.docs[].pub_date,
    // articles[0].response.docs[].web_url
    // headline: "",
    // snippet: "",
    // pub_date: "",
    // url: ""
  };

  componentDidMount() {
    // don't want to do anything?  
    // this.loadArticles();
  }

//   loadArticles = () => {
//     API.getArticles()
//       .then(res =>
//         // this is where I have to define objects in the article[] array
//         this.setState({ articles: res.data, title: "", date: "", url: "" })
//       )
//       .catch(err => console.log(err));
//   };

//   seachForArticles = () => {
//     const searchData = {
//         topic:      this.state.topic,
//         begin_date: this.state.begin_date,
//         end_date:   this.state.end_date    
//     }
//     API.searchArticles()
//       .then(res =>
//         // this is where I have to define objects in the article[] array, right?
//         // do I have the format correct below?  res.data.docs[]??
//         this.setState({ 
//             articles: res.data,
//             headline: res.data.docs[].headline.main,
//             pub_date: "",
//             snippet: "",
//             url: "" })
//       )
//       .catch(err => console.log(err));
//   };

  unsaveArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };


  saveArticle = id => {
    API.saveArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if ((this.state.topic && this.state.begin_date && this.state.end_date)) {
      API.searchArticles({
        topic:      this.state.topic,
        begin_date: this.state.begin_date,
        end_date:   this.state.end_date
      })
        .then(res => {
            console.log(res);
            this.setState({articles: res.data.response.docs})
        }
        )
        .catch(err => console.log(err));
    }
  };


  handleSaveClicked = event => {
    // if ((this.state.topic && this.state.begin_date && this.state.end_date)) {
    console.log("This is the event headline passed: " + event.headline);
    console.log("This is the snippet headline passed: " + event.snippet);
    console.log("This is the pub_date headline passed: " + event.pub_date);
    console.log("This is the url headline passed: " + event.url);
    console.log("This is the saved_date headline passed: " + new Date().toLocaleString());

        API.saveArticle({
        headline: event.headline,
        snippet:  event.snippet,
        pub_date: event.pub_date,
        url:      event.url,
        saved_date: new Date().toLocaleString()
    })
    // After save, do nothing
        // .then(res => this.loadArticles())
        .then(res => console.log("SEND TO API CONFIRMED"))
        .catch(err => console.log(err));
    // }
  };

  render() {
      console.log(this.state.articles);
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h2>Search Articles</h2>
                </div>

                <div className="panel-body">
                    <form>
                    <input value={this.state.topic} onChange={this.handleInputChange} name="topic" placeholder="Topic"></input> 

                    <input value={this.state.begin_date} onChange={this.handleInputChange} name="begin_date" placeholder="Start - YYYYMMDD"></input> 

                    <input value={this.state.end_date} onChange={this.handleInputChange} name="end_date" placeholder="End - YYYYMMDD"></input> 
                    
                    <button onClick={this.handleFormSubmit} disabled={!(this.state.topic && this.state.begin_date && this.state.end_date)} className="btn-primary pull-right">Submit</button>
                    </form>
                </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h2>Search Results</h2>
                </div>
                <br></br>
                {this.state.articles.map((singleArticle) => {
                    return (
                    <div className="panel panel-primary" key={singleArticle._id}>
                        <div className="panel-heading">
                            <button onClick={() => {this.handleSaveClicked({
                                // article_id: this.singleArticle._id,
                                headline: singleArticle.headline.main,
                                snippet:  singleArticle.snippet,
                                pub_date: singleArticle.pub_date,
                                url:      singleArticle.web_url,
                            })}} className="btn-primary pull-right">Save</button>
                            <h3 className="panel-title">{singleArticle.headline.main}</h3>
                        </div>

                        <div className="panel-body">
                            <h4>{singleArticle.snippet}</h4>
                            <h5>{singleArticle.web_url}</h5>
                        </div>    

                        {/* <LetterBox onClick={() => {davidsOnCLick({headline: singleArticle.headline, pubDate: singleArticle.pubDate})}}/> */}
                    </div>
                    )
                })}

                {/* {this.state.articles.length ? (
                <List>
                    {this.state.articles.map(article => (
                    <ListItem key={article._id}>
                        <Link to={"/article/" + article._id}>
                        <strong>
                            {article.title} by {article.date}
                        </strong>
                        </Link>
                        <DeleteBtn onClick={() => this.unsaveArticle(article._id)} />
                    </ListItem>
                    ))}
                </List>
                ) : (
                <h3>No Results to Display</h3>
                )} */}
            </div>


          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
