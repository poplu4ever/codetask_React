import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';


class TextDisplay extends Component{
    
    
    render(){
        
        const ready = localStorage.getItem('textinfo');
        const readyArray = JSON.parse(ready);
         
        
        console.log('readyarray',readyArray);
        
        console.log('this.props Display', this.props);
        
        
            const { number } = this.props.match.params ;

            const selectText = readyArray[parseInt(number)];
        
        
        if(!selectText){
            return <div>Sorry, there are no content to be displayed</div>
        }else{
        
        return(
            <div>
                <p>Title: {selectText.title}</p>
                <p>Content: {selectText.content}</p>                 
            </div>
        )
        }
        
    }
    
}

export default withRouter(TextDisplay);