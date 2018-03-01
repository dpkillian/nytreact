class resultRow extends Component {

    render() {
    	const letters = ['A', 'B', 'C', 'D'];
    return (

      <div className="App">
        <Header tom={'Im The About Page Title!!!'} linkUrl={'https://www.google.com'} />
        <h1> About Page TOM</h1>
        {letters.map((singleArticle) => {
        	return (
            <div>
              <h1>{singleArticle.title}</h1>
        		  <LetterBox onClick={() => {davidsOnCLick({headline: singleArticle.headline, pubDate: singleArticle.pubDate})}}/>
            </div>
        	)
        })}
      </div>
    );
  }
}

export default resultRow;