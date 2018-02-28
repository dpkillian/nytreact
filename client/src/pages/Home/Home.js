import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

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
        // title: this.state.title,
        // date: this.state.date,
        // url: this.state.url
        topic:      this.state.topic,
        begin_date: this.state.begin_date,
        end_date:   this.state.end_date
      })
        .then(res => {
            this.setState({articles: res.response.docs})
        }
        )
        .catch(err => console.log(err));
    }
  };


  handleSaveClicked = event => {
    event.preventDefault();
    if ((this.state.topic && this.state.begin_date && this.state.end_date)) {
      API.saveArticle({
        // this info has to come from axios???  or from this.state??
        headline: this.state.headline,
        snippet:  this.state.snippet,
        pub_date: this.state.pub_date,
        url:      this.state.url_date
        //   headline:    response.docs[].headline.main,
        //   snippet:     response.docs[].snippet
        //   pub_date:    response.docs[].pub_date,
        //   url:         response.docs[].web_url
      })
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Search Articles</h1>
            </Jumbotron>
            <form>
              <input value={this.state.topic} onChange={this.handleInputChange} name="topic" placeholder="Topic (required)"></input> 

              <input value={this.state.topic} onChange={this.handleInputChange} name="topic" placeholder="Topic (required)"></input> 

              <Input
                value={this.state.begin_date}
                onChange={this.handleInputChange}
                name="begin_date"
                placeholder="Begin Date (required)"
              />
              <Input
                value={this.state.end_date}
                onChange={this.handleInputChange}
                name="end_date"
                placeholder="End Date (required)"
              />
              {/* fix button */}
              <FormBtn
                disabled={!(this.state.topic && this.state.begin_date && this.state.end_date)}
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(book => (
                  <ListItem key={articles._id}>
                    <Link to={"/articles/" + articles._id}>
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
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
