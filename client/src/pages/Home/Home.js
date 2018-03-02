import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";

class Home extends Component {
  state = {
    articles: [],
    begin_date: "",
    end_date: "",
    topic: "",
  };

  componentDidMount() {
    // don't want to do anything? No, I don't think so. 
    // this.loadArticles();
  }

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
        API.saveArticle({
        headline: event.headline,
        snippet:  event.snippet,
        pub_date: event.pub_date,
        url:      event.url,
        saved_date: new Date().toLocaleString()
    })
    // After save, need to add UI handling to inform user that the article was saved
        .then(res => {
            // this.setState({ isSaved: true })
            console.log("SEND TO API CONFIRMED")
        })
        .catch(err => console.log(err));
    // }
  };

  handleSavedArticles = () => {
    this.props.history.push("/articles");
}

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

                    <input value={this.state.begin_date} onChange={this.handleInputChange} name="begin_date" placeholder="Start: YYYYMMDD"></input> 

                    <input value={this.state.end_date} onChange={this.handleInputChange} name="end_date" placeholder="End: YYYYMMDD"></input> 
                    
                    <button onClick={this.handleSavedArticles} className="btn-success pull-right">Saved Articles</button>

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

export default Home;



