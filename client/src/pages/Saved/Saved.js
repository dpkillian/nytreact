import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

class Saved extends Component {
  state = {
    articles: [],
    headline: "",
    snippet: "",
    pub_date: "",
    url: "",
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        // this is where I have to define objects in the article[] array
        this.setState({ 
            articles: res.data,
            headline: "",
            snippet: "",
            pub_date: "",
            url: "" })
      )
      .catch(err => console.log(err));
  };

//  

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

  handleDeleteClicked = id => {
    console.log("This is the event headline passed: " + id);

        API.deleteArticle(id)
    // After save, re-load articles
        .then(res => this.loadArticles())
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
                    <h2>Saved Articles</h2>
                </div>
                <br></br>
                {this.state.articles.map((singleArticle) => {
                    return (
                    <div className="panel panel-primary" key={singleArticle._id}>
                        <div className="panel-heading">
                            <button onClick={() => {this.handleDeleteClicked(singleArticle._id)}} className="btn-primary pull-right">Delete</button>
                            <h3 className="panel-title">{singleArticle.headline}</h3>
                        </div>

                        <div className="panel-body">
                            <h4>{singleArticle.snippet}</h4>
                            <h5>{singleArticle.url}</h5>
                            <h5>Date Published: {singleArticle.pub_date}</h5>
                        </div>    
                    </div>
                    )
                })}

            </div>


          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;

