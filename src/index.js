import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const pugRequestLink = "https://dog.ceo/api/breed/pug/images/random/6"

class Pug extends React.Component {
  constructor(props) {
    super(props);
    this.imgLink = null;
    this.i = -1;
  }

  render() {
    return (
      <div className="pugWrapper">
          <p className="pugNo"> Doggo {this.props.i} </p>
        <img src={this.props.imgLink} alt="pug" className="pug" /> 
      </div>
    );
  }

}

class TopButton extends React.Component {

  toTop() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div id="topButtonWrapper" onClick={this.toTop}> <img src={require('./up.png')} alt="up" id="topButton" title="Go to top"></img> </div>
    );
  }
}

class PugList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPugs: []
    }
  }

  isBottom(item) {
    return item.getBoundingClientRect().bottom <= window.innerHeight;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
    this.fetchPugs()
     .then(newPugs => this.addToAll(newPugs));
  }

  // TODO: try to update only once
  trackScrolling = () => {
    const wrappedElement = document.getElementById('pug-list');
    if (this.isBottom(wrappedElement)) {
      this.fetchPugs()
        .then(newPugs => this.addToAll(newPugs));
    }
  }

  renderPug(i, pugLink) {
    return <Pug i={i+1} key={pugLink} imgLink={pugLink} />;
  }

  // Obtain doggos in json
  fetchPugs() {
    return fetch(pugRequestLink)
      .then(response => response.json())
      .then(json => json.message);
  }

  // Add a member of newPugs to allPugs only if they are new doggos
  addToAll(newPugs) {
    let morePugs = [];
    for (let i = 0; i < newPugs.length; i++) {
      if (this.state.allPugs.indexOf(newPugs[i]) === -1) {
        morePugs.push(newPugs[i]);
      }
    }
    morePugs = this.state.allPugs.concat(morePugs);
    this.setState({
      allPugs: morePugs
    });
  }

  // Render all doggos in allPugs
  // TODO: Only render new pugs
  renderAllPugs() {
    let morePugs = [];
    for (let i = 0; i < this.state.allPugs.length; i++) {
      morePugs.push(
        this.renderPug(i, this.state.allPugs[i])
      );
    }
    return morePugs;
  }

  render() {

    return (
      <div id="pug-list"> 
       {this.renderAllPugs()} </div>
    )    
  }
}

class Full extends React.Component {

  render() {

    return (
      <div id="full"> <TopButton /> <PugList /> </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Full />,
  document.getElementById('root')
);



