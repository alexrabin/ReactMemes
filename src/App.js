import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Button, Navbar, Nav} from 'react-bootstrap';

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
        <div>
          <Navbar bg="dark" expand="lg">
            <Container>
            <Navbar.Brand className="text-light">React-Memes</Navbar.Brand>
            </Container>
          </Navbar>
          <Container className="text-center" style={{marginTop: 20}}>
            {error && <div>Error: {error.message}</div>}
            {!isLoaded && <div>Loading...</div>}
            {imageURL && <img src={imageURL} alt='meme'/>}
            <Button variant="outline-dark" size="lg" style={{margin: "1rem"}} onClick={this.getNewMeme.bind(this)}>New Meme</Button>
          </Container>
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
