import React,{Component} from 'react';
import AddText from './AddText';
import Text from './Text';
import TextDisplay from './TextDisplay';
import TextList from './TextList';
import {Route,Router,Redirect,withRouter,Link} from 'react-router-dom';
import '../styles/App.css';

class App extends Component{
    
    
    render(){
                
        return(
            <div className='container'>
                
                <div className='header'>
                    <h3>Code Task</h3>
                    <hr />
                </div>
                    
                    <div className='addText'>
                        <Route path='/app/addtext' component={AddText}/>
                    </div>

                <div className='titleList'>
                <h3>Text List</h3>
                    <Text />
                    <Route path='/app/textList' component={TextList} />
                    <Link to='/app/addtext' >Add Text</Link>
                </div>

                
                <div className='textDisplay'>
                <h3>TextDisplay</h3>
                    <Route  path='/app/text/:number' component={TextDisplay} />                
                </div>
                
            </div>
        )
}
}


export default withRouter(App);