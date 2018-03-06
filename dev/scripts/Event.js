import React, { Fragment } from 'react';


export default class Event extends React.Component {
    constructor(props){
        super(props);
        this.state={
            url: '',
            userId: ''
        };
        // this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        // console.log(this);
        // const userId = firebase.auth().currentUser.uid;
        // console.log(userId);
        // this.setState({
        //     url: this.props.match.url
        //     // userId
        // })
    //     // console.log(this.state.url);
    }
    
    // componentWillUpdate (){
    //     // const userId = firebase.auth().currentUser.uid;
    //     // console.log(userId);
    // }
        
        
    // handleClick(e){
    //     e.preventDefault();
        
        
    //     this.setState({
    //         userId
    //     })
    // }
        
        // this.setState({
        //     userId
        // })
        // console.log(this.state.userId);

        // const dbRef = firebase.database().ref(``)
        // const userId = firebase.auth().currentUser.uid;

        // const dbRef = firebase.database().ref(`/users/${this.state.userId}${this.state.url}`);
        // dbRef.on('value', (snapshot) => {
        //     console.log(snapshot);
        // })
        
    // }

    render(){
        return <button onClick={this.handleClick}>get my shit</button>
    }

}


// question about retrieving uid data in a routed componnent, white tables