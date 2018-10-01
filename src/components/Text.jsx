import React,{Component} from 'react';
import {Switch,Route,Link,withRouter} from 'react-router-dom';



class Text extends Component{
    
    render(){
        
        console.log('text.props',this.props);
        
        return(
            <div>
                <Link exact to='/app/textList'>Show Title</Link>          
            </div>
        )
    }
    
}

export default withRouter(Text);    