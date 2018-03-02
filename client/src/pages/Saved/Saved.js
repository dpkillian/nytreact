import React, { Component } from "react";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";

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

//   unsaveArticle = id => {
//     API.deleteArticle(id)
//       .then(res => this.loadArticles())
//       .catch(err => console.log(err));
//   };

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
    // if ((this.state.topic && this.state.begin_date && this.state.end_date)) {
    console.log("This is the event headline passed: " + id);

        API.deleteArticle(id)
    // After save, do nothing
        .then(res => this.loadArticles())
        // .then(res => {
        //     // this.setState({ isSaved: true })
        //     console.log("SEND TO API CONFIRMED")
        // })
        .catch(err => console.log(err));
    // }
  };

  render() {
      console.log(this.state.articles);
    return (
      <Container fluid>
        {/* <Row>
          <Col size="md-12">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h2>Saved Articles</h2>
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
        </Row> */}

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

export default Saved;



// })}} className="btn-primary pull-right" {this.state.isSaved? disabled: null}>{ this.state.isSaved? Saved : Save}</button>
