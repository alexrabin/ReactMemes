import './App.css';
import React from 'react';
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      imageURL: null
    };
  }
    render(){
      const { error, isLoaded, imageURL } = this.state;
      
      return (
        <div className="App">
          <header className="App-header">
            <h2>React Memes</h2>
            {error && <div>Error: {error.message}</div>}
            {!isLoaded && <div>Loading...</div>}
            {imageURL && <img src={imageURL} alt='meme'/>}
            <button onClick={this.getNewMeme.bind(this)}>New Meme</button>
          </header>
        </div>
      );
    }
    componentDidMount(){
      this.getNewMeme();
    }
    // shouldComponentUpdate(prevProps){
    //   return prevProps.isLoaded !== this.props.isLoaded
    // }
    getNewMeme(){
      if (this.state.isLoaded){
        this.setState({
          isLoaded: false,
        });
      }
      fetch(`https://meme-api.herokuapp.com/gimme/wholesomememes`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            imageURL: result.url
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }
}

export default App;
