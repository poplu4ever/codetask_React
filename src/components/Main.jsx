import React,{Component} from 'react';
import{
    BrowserRouter,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom';
import App from './App';
import TextList from './TextList';
import TextDisplay from './TextDisplay';
import '../styles/Main.css';


const tryAuth = {   
        
     isAuthenticated:false,
     authenticate(cb){
        this.isAuthenticated = true;
        setTimeout(cb,100);
        console.log("this.auth",this.isAuthenticate);
    },
     signout(cb){    
        this.isAuthenticate = false;
        setTimeout(cb,100);

    }
}

const Public = () => <h3>This is a Public Page</h3>


//create a auth route
const PrivateRoute = ({component:Component, ...rest}) => (
    <Route {...rest} render={
         (props)=>(
            tryAuth.isAuthenticated === true
             ?<Component {...props} />
             :<Redirect to={{
                    pathname:'/login',
                    state:{from: props.location}
                 }}/>
         )   
        }/>
)


class Login extends Component{ //Sign in component
    
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            error:'',
            redirectToReferrer:false
        }
    }   
    
    login(){
        
        const {username,password} = this.state;
        console.log('check',username,'password',password);
        
        if((username||password)!==''){
            if(username === password){
                    console.log('It is signed in');
                    tryAuth.authenticate(()=>{
                        this.setState({redirectToReferrer:true})
                    })
            }else this.setState({error:'The username and password are not match'});
            
        }else this.setState({error:'Both username and password are required'});
        
    }
    
    render(){
        
        console.log('this.state',this.state.redirectToReferrer);
        
        const { from } = this.props.location.state || { from:{ pathname:'/'}}
        const {redirectToReferrer} = this.state;
        
        if(redirectToReferrer === true ){
            return( 
                <Redirect to={from}/>
            )   
        }

        return(
            <div className='formContainer'>
                <p>You must login to view the app page.</p>
                
                <div className='form-inline'>
                <h2>Login</h2>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type="text"
                        style={{marginRight:'5px'}}
                        placeholder='username'
                        onChange={event=>this.setState({username:event.target.value})}
                    />
                    <input
                        className='form-control'
                        type="text"
                        style={{marginRight:'5px'}}
                        placeholder='password'
                        onChange={event=>this.setState({password:event.target.value})}

                    />
                    <button
                        className='btn btn-primary'
                        type="button"
                        onClick={()=>this.login()}
                    > 
                        Sign In
                    </button>
                    <div>{this.state.error}</div>

                </div>  
                
                </div>
                
                </div>
        )
    }
}

class Main extends Component{
    
    render(){
                
        return(
            <BrowserRouter>
                <div className='mainContainer'>
                
                        <li><Link to='/public'>Public Page</Link></li>
                        <li><Link to='/app'>App Page</Link></li>
                    
                    <Switch>
                        <PrivateRoute path='/app' component={App} />
                        <Route path='/public' component={Public}/>
                        <Route exact path='/login' component={Login}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )   
    }
} 



export default Main;
