import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import config from './config-key';

const imgStyle = {
  width: '200px',
  borderRadius: '50%'
}

const btnStyle = {
  background: 'none',
  border: 'none'
}

// main compent we're rendering
class Brent extends React.Component {
  constructor() {
    super();
    this.state = {
      byNameQ: '',
      byIngQ: 'rum',
      searchID: [],
      drinksList: [],
      drinksListCompiled: []
    }
    this.getSearchByName = this.getSearchByName.bind(this);
    this.getSearchByIngredient = this.getSearchByIngredient.bind(this);
    this.setUserInput = this.setUserInput.bind(this);


  }

  setUserInput(e) {
    // listens for change in input
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  getSearchByName(e) {
    //  on submit, takes input above run axios call
    e.preventDefault();

    this.setState({
      byNameQ: this.state.byNameQ
    })
    //search cocktail by name
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.state.byNameQ}`, {
    })
      .then(({ data }) => {
        console.log(data);
        this.setState({
          // this drinks list is an array of objects wiht ALL the properties we need
          drinksList: data.drinks
        })
      })

    this.setState({
      byNameQ: ''
    })
  }

  // search by ingredient
  getSearchByIngredient(e) {
    e.preventDefault();
    // ONLY returns a list of drinks made with that ingredient
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.state.byIngQ}`, {
    })
      .then(({ data }) => {
        console.log(data);
        const array = data.drinks;
        const newNewArray = [];
        // take the ids and push into array so that laterone we do another axios mapping each id to get drink details
        const newArray = array.map((id) => {
          newNewArray.push(id.idDrink);
        })
        this.setState({
          byIngQ: '',
          // drinnksList compiled is an array of objects with only 3 properties,
          drinksListCompiled: array,
          // search ID is ann array of only searchID
          searchID: newNewArray
      })
    })
  }

  render() {
    return (
        <React.Fragment>
          <form onSubmit={this.getSearchByName}>
            <h3>Cocktail by Name</h3>
            <input onChange={this.setUserInput} id="byNameQ" value={this.state.byNameQ} type="text" />
            <input type="submit" value="submit" />
          </form>
          
          <form onSubmit={this.getSearchByIngredient}>
            <h3>By Ingredient (filter)</h3>
            <input onChange={this.setUserInput} id="byIngQ" value={this.state.byIngQ} type="text" />
            <input type="submit" value="submit" />
          </form>
          <div>
            {/* rendering the list of drink details through the SingleDrink component, using map method to loop thru each ID's (thats how we are passinng each of the value details  ) */}
            {this.state.drinksListCompiled.map((id, key) => {
            return <SingleDrink drinkName={id.strDrink} drinkPic={id.strDrinkThumb} searchID={id.idDrink}  key={id.idDrink} />
            })}
          </div>
        </React.Fragment>
    )
  }
}

// GOAL: get the same type set of data (array or object of objects) from the starting point to work with 

// this only renders for the searchByIngredient for nonw, figure something out pls
class SingleDrink extends React.Component {
  constructor() {
    super();
    this.state = {
      instructions: '',
      ingredients: []
    };
    this.displayDeets = this.displayDeets.bind(this);
  }

  //  doing an axios to loop thru array of search ids and to call the additional details of a single drink with a different link
  displayDeets() {
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.props.searchID}`, {
    }).then(({ data }) => {
      console.log(data.drinks[0]);
      const drinkObject = data.drinks[0];
      // drink object includes a list of properties that are like ingredient1 ingredient2 liek wtf so.....
      const drinkIngredient = []
      // we did a for in loop to go thru each property
      for (let property in drinkObject) {
        // if the property key has the word "Ingredient" then push that value into the drink ingredient arrayarray
        if (/Ingredient/.test(property)) {
          if (drinkObject[property]) {
            drinkIngredient.push(drinkObject[property]);
          }

        }
      }
      this.setState({
        instructions: data.drinks[0].strInstructions,
        ingredients: drinkIngredient
      });
    });
  }

  render() {
    return (
      <React.Fragment>
      <div onClick={this.displayDeets}>
        <h1>{this.props.drinkName}</h1>
        <p>{this.props.searchID}</p>
        <img src={this.props.drinkPic} alt="" style={imgStyle} />
      </div>
        {/* made new component and passed in the values/states we retrieved  */}
        <SingleDrinkDetails instructions={this.state.instructions} ingredients={this.state.ingredients} />
      </React.Fragment>
    )
  }
}

// this component is for when you click a specific ingredient it will render an input and ask for user location
class SingleDrinkDetails extends React.Component {
  // console.log(props.instructions);
  constructor() {
    super();
    this.state = {
      ingredient: '',
    };
    this.showLocation = this.showLocation.bind(this);
  }

  // method to set state of ingredient to user's selection of li ingredient
  showLocation(e) {
    this.setState({
      ingredient: e.target.id,
    })
  }
 
  render() {
  return (
    <React.Fragment>
      <div>
        <p>{this.props.instructions}</p>
      </div>      
        <ul>
          {this.props.ingredients.map((ingredient) => {
            return  (
              <React.Fragment>
                {/* meant to render an input upon clicking on li but we didnt do that yet just kinda passing in the thi component which rendersthe input */}
                <li onClick={this.showLocation} key={ingredient} id={ingredient}>
                  {/* we are passing down ingredientz to use asthe first part of the axios call in the thi component */}
                 <Thi ingredientz={ingredient} />
                </li>

              </React.Fragment>
            )
          })}
        </ul>
    </React.Fragment>
  )
}
}


// thi component! current  renders the ingredient, the input annd the submit button
class Thi extends React.Component {
  constructor() {
    super();
    this.state = {
      productID: '',
      location: '',
      address: '',
      lcboAddress: ''

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // we use passed down ingredeint prop to call the first axios call to return the product id
  componentDidMount() {

    axios.get(`${config.apiURLP}`, {
      params: {
        access_key: config.apiKey,
        q: this.props.ingredientz, // from search
      }
    }).then((productID) => {
        const product = productID.data.result[0].id;
        if (product !== undefined) {
          this.setState({
            productID: product
            })
          // console.log(product);
        }
      });
    }
  
  // set the address state to whatever the user has inputted as their location
  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  // when we submit the form  it will use the product id that was set in the first axios call AND the user input for the address state that was set in the handleChange method above to call the FIRST LCBO store result address
  handleSubmit(e) {
    e.preventDefault();

      axios.get(config.apiURLS, {
        params: {
          access_key: config.apiKey,
          product_id: this.state.productID,
          geo: this.state.address// add in location
        }
      }).then(({ data }) => {
        const lcbo = data.result[0].address_line_1;
        console.log(data.result);

        this.setState({
          lcboAddress: lcbo,
        })
      })
  }
  render() {
    return  (
      <React.Fragment>
        <span>{this.props.ingredientz} </span>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} id='address' value={this.state.address} />
          <input type="submit"/>
        </form>
        <p>{this.state.lcboAddress}</p>
      </React.Fragment>
    )
  }
}



ReactDOM.render(<Brent />, document.getElementById('app'));
