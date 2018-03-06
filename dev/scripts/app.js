// import React, { Fragment } from 'react';
// import ReactDOM from 'react-dom';
// import axios from 'axios';
// import configKey from './config-key';
// // import { EventsPage,  EventCard } from './EventsPage';
// import { BrowserRouter, Route, Switch, Link, } from 'react-router-dom';
// // import Search from './Search'
// // import Drink from './Drink'
// import Home from './Home'
// // import EventsPage from  './EventsPage'
// // import Event from './Event'
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import configKey from './config-key';
// import { EventsPage,  EventCard } from './EventsPage';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Search from './Search'
import Drink from './Drink'
// import Home from './Home'
import EventsPage from './EventsPage'
import Event from './Event'



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
// var config = {
//   apiKey: "AIzaSyAKuFRAm4lX_T_9PitdDB7dZHyzDKDMyk8",
//   authDomain: "cocktail-party-28499.firebaseapp.com",
//   databaseURL: "https://cocktail-party-28499.firebaseio.com",
//   projectId: "cocktail-party-28499",
//   storageBucket: "",
//   messagingSenderId: "882276644580"
// };
// firebase.initializeApp(config);

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
    // creatinng a nnew instance of google auth provider
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
    // accepts a promist that accepts a callback funcaiton as an argumennt
    firebase.auth().onAuthStateChanged((userRes) => {
      // console.log(userRes);
      if (userRes) {
        this.setState({
          loggedIn: true,
          // if two things equal the same we can just do it like that same as user:user just typing user
          user: userRes
        });
        const dbRef = firebase.database().ref(`/users/${this.state.user.uid}`);
        dbRef.update({ name: `${this.state.user.displayName}` });
        const userId = firebase.auth().currentUser.uid;
        const dbRefz = firebase.database().ref(`/users/${userId}/events`);
        // const dbRef = firebase.database().ref(`/events`);
        dbRefz.on('value', (snapshot) => {
          const data = snapshot.val();
          // console.log(data);
          const state = [];
          for (let key in data) {
            // console.log(key);

            // grab object, add property of key annd assign value of key that firebase provides!!!
            data[key].key = key;
            // console.log(data[key]);
            state.push(data[key]);
          }
          this.setState({
            events: state
          })
        })

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
<<<<<<< HEAD
          {this.state.loggedIn ?
            <div className='home'>
=======
          {/* {this.state.loggedIn ? */}
            <Fragment>
>>>>>>> 55e7156176913ad19525697242675542ddcde207
              {/* <Brent /> */}
              <div className='home-wrapper clearfix'>
                <h1>Welcome {this.state.user.displayName}!</h1>
                <Link className='home-home' to={`/`}>Home</Link>
                <Link className='home-search' to={`/search`}>Search</Link>
                <Link className='home-events' to={`/events`}>Events</Link>
                <button onClick={this.signOut} className='sign-out'>sign out</button>
                {/* <button onClick={this.retrieveEvent}>get my shit</button> */}
                {/* what i wanna do is  <Search /> <Events /> <Favs /> */}
  
                {/* <Search /> */}
                {/* <Event /> */}
                <Route path='/search' exact component={Search} />
                <Route path='/search/:searchId' exact component={Drink} />
  
                <Route path='/events' exact component={EventsPage} />
                {/* <Route path='/events/:eventsId' exact component={Event} /> */}
                <Route path='/events/:eventsId' exact render={(props) => <Event {...this.state} {...props} />} />
              </div>
              {/* <Brent events={this.state.events} /> */}

<<<<<<< HEAD
            </div>
=======
>>>>>>> 55e7156176913ad19525697242675542ddcde207


                {/* <Route path='/events/:eventsId' exact render={(props) => ( */}
                {/* <EventCard  {...props }/>)}  />  */}
                {/* <Route path='/events/:eventsID' params={{ name: props.eventName.eventName }} component={EventCard} /> */}
              </Fragment>

<<<<<<< HEAD
            <div className="sign-in-page">
=======

            

            {/* <div className="sign-in">
>>>>>>> 55e7156176913ad19525697242675542ddcde207
              <div><img className='animated tada infinite' src='../../assets/signin-bkg.png' alt="" /></div>
              <div>
                <button onClick={this.signIn}>sign in!</button>
              </div>
            </div> */}

          

          {/* <Fragment> */}
            {/* <Route  path='/'  exact component={Home} /> */}
            {/* <Route path='/drink/:drinkID' component={Drink} /> */}
            <Route path='/search' exact render={(props) => <Search {...this.state} {...props} />} />
            <Route path='/search/:searchId' exact component={Drink} />

            <Route path='/events' exact component={EventsPage} />
            {/* <Route path='/events/:eventsId' exact component={Event} /> */}
            <Route path='/events/:eventsId' exact render={(props) => <Event {...this.state} {...props} />} />
           
            {/* <Route path='/:searchId/:eventsId' exact render={(props) => <Drink {...this.state} {...props} />} /> */}
            



            {/* <Route path='/events/:eventsId' exact render={(props) => ( */}
            {/* <EventCard  {...props }/>)}  />  */}
            {/* <Route path='/events/:eventsID' params={{ name: props.eventName.eventName }} component={EventCard} /> */}
          {/* </Fragment> */}

        </Fragment>
      </BrowserRouter>
    )
  }
}

// class Home extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       loggedIn: false,
//       user: {},
//       events: {}
//     };
//     this.signIn = this.signIn.bind(this);
//     this.signOut = this.signOut.bind(this);
//     // this.retrieveEvent = this.retrieveEvent.bind(this);
//   }
//   signIn() {
//     // creatinng a nnew instance of google auth provider
//     const provider = new firebase.auth.GoogleAuthProvider();
//     provider.setCustomParameters({
//       prompt: 'select_account'
//     });
//     firebase.auth().signInWithPopup(provider)
//       // returns a promise
//       // .then((user) => {
//         // shows uer infos
//         // console.log(user);

//         // const dbRef = firebase.database().ref(`/users/${this.state.user.uid}`);
//         // dbRef.push('dumbass');
//         // console.log(user);
//       // });

//     // console.log('click');
//   }
//   signOut() {
//     firebase.auth().signOut();
//   }

  

//   componentDidMount() {
//     // runs and watched for changes after things are rendered
//     // accepts a promist that accepts a callback funcaiton as an argumennt
//     firebase.auth().onAuthStateChanged((userRes) => {
//       // console.log(userRes);
//       if (userRes) {
//         this.setState({
//           loggedIn: true,
//           // if two things equal the same we can just do it like that same as user:user just typing user
//           user: userRes
//         });
//         const dbRef = firebase.database().ref(`/users/${this.state.user.uid}`);
//         dbRef.update({ name: `${this.state.user.displayName}` });
//         const userId = firebase.auth().currentUser.uid;
//         const dbRefz = firebase.database().ref(`/users/${userId}/events`);
//         // const dbRef = firebase.database().ref(`/events`);
//         dbRefz.on('value', (snapshot) => {
//           const data = snapshot.val();
//           // console.log(data);
//           const state=[];
//           for (let key in data) {
//             // console.log(key);
          
//             // grab object, add property of key annd assign value of key that firebase provides!!!
//             data[key].key = key;
//             // console.log(data[key]);
//             state.push(data[key]);
//           }
//           this.setState({
//             events: state
//           })
//         })

//       } else {
//         this.setState({
//           loggedIn: false,
//           user: {}
//         })
//       }
//     });
//   }

//   render() {
//     return (

//       <Fragment>
//           {this.state.loggedIn ? 
//           <Fragment>
//             {/* <Brent /> */}
//             <Link to={`/`}>Home</Link>
//             <Link to={`/events`}>Events</Link>                    
//             <Link to={`/search`}>Search</Link>
//             <button onClick={this.signOut}>sign out</button>
//             <button onClick={this.retrieveEvent}>get my shit</button>
//             {/* what i wanna do is  <Search /> <Events /> <Favs /> */}

//             <Search />
//             {/* <Brent events={this.state.events} /> */}
            
//           </Fragment>
  
  
//           : 

//           <div className="sign-in">
//             <div><img className='animated tada infinite' src='../../assets/signin-bkg.png' alt=""/></div>
//             <div>
//             {/* <h1>Cocktail Partayyy</h1> */}
//             <button onClick={this.signIn}>sign in!</button>
//             </div>
//           </div>
          
//           }

//       </Fragment>
//     )
//   }
// }

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       query: '',
//       results: ''
//     };
//     this.handleChange = this.handleChange.bind(this);
//   }
//   handleChange(e) {
//     e.preventDefault();
//     this.setState({
//       [e.target.id]: e.target.value
//     });


//   }
//   search() {
//     e.preventDefault();
//   }
//   componentDidMount() {
//     axios.get(`${configKey.apiURLL}`, {
//       params: {
//         access_key: configKey.apiKeyL,
//         // q: this.state.query
//       }
//     }).then((data) => {
//       console.log(data);
//       this.setState({
//         // results: data.r
//       });
//     })
//   }
//   render() {
//     return (
//       <form onSubmit={this.search}>
//         <input type="text" onChange={this.handleChange} id='query' value={this.state.query} />
//         <input type="submit" />
//       </form>
//     )
//   }
// }

// main compent we're rendering
// class Brent extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       byNameQ: '',
//       byIngQ: 'rum',
//       searchID: [],
//       drinksList: [],
//       drinksListCompiled: [],
//       instructions: '',
//       ingredients: []
//     }
//     this.getSearchByName = this.getSearchByName.bind(this);
//     this.getSearchByIngredient = this.getSearchByIngredient.bind(this);
//     this.setUserInput = this.setUserInput.bind(this);


//   }

//   setUserInput(e) {
//     // listens for change in input
//     this.setState({
//       [e.target.id]: e.target.value
//     })
//   }

//   getSearchByName(e) {
//     //  on submit, takes input above run axios call
//     e.preventDefault();

//     this.setState({
//       byNameQ: this.state.byNameQ
//     })
//     //search cocktail by name
//     axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.state.byNameQ}`, {
//     })
//       .then(({ data }) => {
//         // console.log(data);
//         const array = data.drinks;
//         const newNewArray = [];
//         // take the ids and push into array so that laterone we do another axios mapping each id to get drink details
//         const newArray = array.map((id) => {
//           newNewArray.push(id.idDrink);
//         })
//         this.setState({
//           byNameQ: '',
//           // drinnksList compiled is an array of objects with only 3 properties,
//           drinksListCompiled: array,
//           // search ID is ann array of only searchID
//           searchID: newNewArray
//         })
//       })

//     this.setState({
//       byNameQ: ''
//     })
//   }

//   // search by ingredient
//   getSearchByIngredient(e) {
//     e.preventDefault();
//     // ONLY returns a list of drinks made with that ingredient
//     axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.state.byIngQ}`, {
//     })
//       .then(({ data }) => {
//         // console.log(data);
//         const array = data.drinks;
//         const newNewArray = [];
//         // take the ids and push into array so that laterone we do another axios mapping each id to get drink details
//         const newArray = array.map((id) => {
//           newNewArray.push(id.idDrink);
//         })
//         this.setState({
//           byIngQ: '',
//           // drinnksList compiled is an array of objects with only 3 properties,
//           drinksListCompiled: array,
//           // search ID is ann array of only searchID
//           searchID: newNewArray
//         })
//       })
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <Link to={`/`}>Home</Link>
//         <Link to={`/events`}>Events</Link>
//         <Link to={`/search`}>Search</Link>       
//         <form onSubmit={this.getSearchByName}>
//           <h3>Cocktail by Name</h3>
//           <input onChange={this.setUserInput} id="byNameQ" value={this.state.byNameQ} type="text" />
//           <input type="submit" value="submit" />
//         </form>

//         <form onSubmit={this.getSearchByIngredient}>
//           <h3>By Ingredient (filter)</h3>
//           <input onChange={this.setUserInput} id="byIngQ" value={this.state.byIngQ} type="text" />
//           <input type="submit" value="submit" />
//         </form>
//         <div>
//           {/* rendering the list of drink details through the SingleDrink component, using map method to loop thru each ID's (thats how we are passinng each of the value details  ) */}
//           {this.state.drinksListCompiled.map((id, key) => {
//             return <SingleDrink drinkName={id.strDrink} drinkPic={id.strDrinkThumb} searchID={id.idDrink} key={id.idDrink} events={this.props.events}/>
//           })}
//         </div>


//       </React.Fragment>
//     )
//   }
// }

// // GOAL: get the same type set of data (array or object of objects) from the starting point to work with 

// // this only renders for the searchByIngredient for nonw, figure something out pls
// class SingleDrink extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       instructions: '',
//       ingredients: [],
//       eventNames: []
      
//     };
//     this.displayDeets = this.displayDeets.bind(this);
//     this.addToEvent = this.addToEvent.bind(this);
//   }

// //   //  doing an axios to loop thru array of search ids and to call the additional details of a single drink with a different link
//   displayDeets() {
//     axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.props.searchID}`, {
//     }).then(({ data }) => {
//       // console.log(data.drinks[0]);
//       const drinkObject = data.drinks[0];
//       // drink object includes a list of properties that are like ingredient1 ingredient2 liek wtf so.....
//       const drinkIngredient = []
//       // we did a for in loop to go thru each property
//       for (let property in drinkObject) {
//         // if the property key has the word "Ingredient" then push that value into the drink ingredient arrayarray
//         if (/Ingredient/.test(property)) {
//           if (drinkObject[property]) {
//             drinkIngredient.push(drinkObject[property]);
//           }

//         }
//       }
//       this.setState({
//         instructions: data.drinks[0].strInstructions,
//         ingredients: drinkIngredient
//       });
//     });
//     this.recipeCard.classList.toggle("show");
//   }

//   addToEvent() {
//     const eventList = this.props.events;
//     // console.log(this);
//     const eventNames = []
//     for(let event in eventList){
//       eventNames.push(eventList[event].eventName);
//     }
//     this.setState({
//       eventNames
//     });
//     this.addCocktail.classList.toggle("show");    
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <div onClick={this.displayDeets}>
//           <h1>{this.props.drinkName}</h1>
//           <p>{this.props.searchID}</p>
//           <img src={this.props.drinkPic} alt="" style={imgStyle} />
//           <button onClick={this.addToEvent}>add to event</button>
//           <div className="addCocktail" ref={ref => this.addCocktail = ref}>
//             {this.state.eventNames.map((event)=> {
//               return <p>{event}</p>
//             })}
//           </div>
          
//         </div>
//         {/* made new component and passed in the values/states we retrieved  */}
//         <div className="recipe-card" ref={ref => this.recipeCard = ref}>
//           <SingleDrinkDetails instructions={this.state.instructions} ingredients={this.state.ingredients} key={`ingredient-${this.props.searchID}`} drinkNamez={this.props.drinkName} drinkPicz={this.props.drinkPic} />
//         </div>
//       </React.Fragment>
//     )
//   }
// }

// // this component is for when you click a specific ingredient it will render an input and ask for user location
// class SingleDrinkDetails extends React.Component {
//   // console.log(props.instructions);
//   constructor() {
//     super();
//     this.state = {
//       ingredient: ''
      
//     };
//     this.showLocation = this.showLocation.bind(this);
//   }

//   // method to set state of ingredient to user's selection of li ingredient
//   showLocation(e) {
//     this.setState({
//       ingredient: e.target.id,
//     })
//   }

//   render() {
//     return (
//       <React.Fragment>
//         {this.props.instructions ?
//         <div>
//           <h2>{this.props.drinkNamez}</h2>
//           <img style={imgStyle} src={this.props.drinkPicz} alt=""/>
//           <p>{this.props.instructions}</p>
//           <button>add to event</button>
          
//         </div>
//         : null}
//         <ul>
//           {this.props.ingredients.map((ingredient) => {
//             return (
//               <React.Fragment>
//                 {/* meant to render an input upon clicking on li but we didnt do that yet just kinda passing in the thi component which rendersthe input */}
//                 <li onClick={this.showLocation} id={ingredient}>

//                   {/* we are passing down ingredientz to use asthe first part of the axios call in the thi component */}
//                   <Thi ingredientz={ingredient} key={ingredient} />
//                 </li>

//               </React.Fragment>
//             )
//           })}
//         </ul>
//       </React.Fragment>
//     )
//   }
// }


// // thi component! current  renders the ingredient, the input annd the submit button
// class Thi extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       productID: '',
//       location: '',
//       address: '',
//       lcboAddress: ''

//     }
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.showInput = this.showInput.bind(this);
//   }

//   // we use passed down ingredeint prop to call the first axios call to return the product id
//   componentDidMount() {

//     axios.get(`${configKey.apiURLP}`, {
//       params: {
//         access_key: configKey.apiKey,
//         q: this.props.ingredientz, // from search
//       }
//     }).then((productID) => {
//       const product = productID.data.result[0].id;
//       if (product !== undefined) {
//         this.setState({
//           productID: product
//         })
//         // console.log(product);
//       }
//     });
//   }

//   // set the address state to whatever the user has inputted as their location
//   handleChange(e) {
//     this.setState({
//       [e.target.id]: e.target.value
//     })
//   }

//   // when we submit the form  it will use the product id that was set in the first axios call AND the user input for the address state that was set in the handleChange method above to call the FIRST LCBO store result address
//   handleSubmit(e) {
//     e.preventDefault();

//     axios.get(configKey.apiURLS, {
//       params: {
//         access_key: configKey.apiKey,
//         // order: id.asc,
//         // where_not: is_dead,
//         product_id: this.state.productID,
//         geo: this.state.address,
//         order: 'distance_in_meters.asc'
//       }
//     }).then(({ data }) => {
//       const lcbo = data.result[0].address_line_1;
//       console.log(data);

//       this.setState({
//         lcboAddress: lcbo,
//       })
//     })
//   }

//   showInput() {
//     this.showLocationInput.classList.toggle("show");
//   }
//   render() {
//     return (
//       <React.Fragment>
//         <span>{this.props.ingredientz} </span>
//         <button onClick={this.showInput}>Where Do I Buy?</button>
//         <form onSubmit={this.handleSubmit} className="showLocationInput" ref={ref => this.showLocationInput = ref}>
//           <input type="text" onChange={this.handleChange} id='address' value={this.state.address} />
//           <input type="submit" />
//         </form>
//         <p>{this.state.lcboAddress}</p>
//       </React.Fragment>
//     )
//   }
// }



ReactDOM.render(<App />, document.getElementById('app'));


// email.replace(/\./g, '-')
