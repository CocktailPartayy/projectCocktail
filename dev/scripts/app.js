
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import configKey from './config-key';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Search from './Search'
import Drink from './Drink'
import EventsPage from './EventsPage'
import Event from './Event'
import Home from './Home'



const imgStyle = {
  width: '200px',
  borderRadius: '50%'
}
export { imgStyle };


const btnStyle = {
  background: 'none',
  border: 'none'
}


// initialize firebase
var config = {
  apiKey: "AIzaSyAKuFRAm4lX_T_9PitdDB7dZHyzDKDMyk8",
  authDomain: "cocktail-party-28499.firebaseapp.com",
  databaseURL: "https://cocktail-party-28499.firebaseio.com",
  projectId: "cocktail-party-28499",
  storageBucket: "",
  messagingSenderId: "882276644580"
};
firebase.initializeApp(config);

// essentially the component to confirm user log in
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: {},
      events: {}
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    // this.retrieveEvent = this.retrieveEvent.bind(this);
  }

  signIn() {
    // creatinng a new instance of google auth provider
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    firebase.auth().signInWithPopup(provider)
  }
  signOut() {
    firebase.auth().signOut();
  }



  componentDidMount() {
    // runs and watched for changes after things are rendered
    // accepts a promise that accepts a callback function as an argument
    firebase.auth().onAuthStateChanged((userRes) => {
      // if we rec'd the promise, then that means we got user info which also means the user is logged in
      if (userRes) {
        this.setState({
          loggedIn: true,
          user: userRes
        });
        const dbRef = firebase.database().ref(`/users/${this.state.user.uid}`);
        // .update allows us to avoid having a firebase generated key further nesting our info
        dbRef.update({ name: `${this.state.user.displayName}` });
        const userId = firebase.auth().currentUser.uid;
        const dbRefz = firebase.database().ref(`/users/${userId}/events`);
        // we are grabbing user events from firebase that was pushed in our events component
        dbRefz.on('value', (snapshot) => {
          const data = snapshot.val();
          // console.log(data);
          const state = [];
          for (let key in data) {
            // grab object, add property of key annd assign value of key that firebase provides!!!
            // we dont have access to the firebase key but we can grab it and set it as a key in each of our events for easy access
            data[key].key = key;
            state.push(data[key]);
          }
          this.setState({
            events: state
          })
        })
        // if we our userRes promise is a falsey value then user is not logged, reset user to be empty obj
      } else {
        this.setState({
          loggedIn: false,
          user: {}
        })
      }
    });
  }

  render() {
    return (

      <BrowserRouter>
        <Fragment>
            {/* ternary operator, if user state logged inn then we only show the signout button, the links and the Routes*/}
            {this.state.loggedIn ? 
              <Fragment>
                <div className='home-page'>
                <div className="wrapper">
                  <h1>Welcome, {`${this.state.user.displayName}`}!</h1>
                    <Link to={`/`}>Home</Link>
                    <Link to={`/search`}>Search</Link>
                    <Link to={`/events`}>Events</Link>
                  
                    <button className="signOutButton" onClick={this.signOut}>sign out</button>
                </div>
                  {/* we passed this.state and props down this.state refers to app and props refers to the props route itself has like history, match etc */}
                  <Route path='/' exact component={Home} />
                  <Route path='/search' exact render={(props) => <Search {...this.state} {...props} />} />
                  <Route path='/search/:searchId' exact component={Drink} />
                  <Route path='/events' exact component={EventsPage} />
                  <Route path='/events/:eventsId' exact render={(props) => <Event {...this.state} {...props} />} />
                </div>
              </Fragment>
           
           : 
              
            <div className="sign-in-page">
              {/* if user isnt logged in then show em the amazing sign in page */}
              <div><img className='animated tada infinite' src='../../assets/signin-bkg.png' alt="" /></div>
              <div>
                <button onClick={this.signIn}>sign in!</button>
              </div>
            </div>
            }

        </Fragment>
      </BrowserRouter>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));


// email.replace(/\./g, '-')
