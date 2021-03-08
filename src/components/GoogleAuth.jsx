import React from 'react';
import {signIn, signOut} from '../actions'
import {connect} from 'react-redux';

class GoogleAuth extends React.Component{
    // constructor(args){
    //     super(args);
    //     this.state ={isSignedIn : null}
    // }
    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId: '969135603136-5dvn6n5onrk8g1hr6hffce2thkkdos3f.apps.googleusercontent.com',
                scope:'email' 
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
               // this.setState({isSignedIn: this.auth.isSignedIn.get()})
               this.onAuthChange(this.auth.isSignedIn.get())
                // isSignedIn is automatically passed to the listener
                this.auth.isSignedIn.listen(this.onAuthChange);
            })

        });
    }
    onAuthChange = isSignedIn => {
        if(isSignedIn){
            // pass in the user id of the sign in user
            this.props.signIn(this.auth.currentUser.get().getId());
        }
        else{
            this.props.signOut();
        }
    }
    renderAuthButton() {
        if(this.props.isSignedIn === null){
            return(null)
        }
        else if(this.props.isSignedIn){
            return(<button className="ui red google button" onClick={this.onSignOutClick}>
                <i className="google icon" />
                 Sign Out </button>)
        }
        else{
            return(<button className="ui red google button" onClick={this.onSignInClick}>
                <i className="google icon" />
                Sign In with Google</button>)
        }
    }
    onSignInClick = () =>{this.auth.signIn()}
    onSignOutClick = ()=>{this.auth.signOut()}
    render(){
    return(<div>{this.renderAuthButton()}</div>)
    }
}
const mapStateToProps = state=>{
    return {isSignedIn: state.auth.isSignedIn};
}
export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);