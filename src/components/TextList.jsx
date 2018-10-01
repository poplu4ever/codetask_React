import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';




class TextList extends Component{
    
//    const ready = localStorage.getItem('textinfo');
    
    
    render(){
                
        console.log('list.props',this.props);
        
        const ready = JSON.parse(localStorage.getItem('textinfo'));
        
        if (ready === null){
            return(
                
                <div>
                    <p>There is no title to be listed</p>
                </div>
            )
        }else{
            return(
                
                <div>
                        <ul> 
                            {
                                ready.map(t => (
                                    <li key={ready.indexOf(t)}>
                                        <Link to={`/app/text/${ready.indexOf(t)}`}>{t.title}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                </div>
            )
        }
            
    }
    
}

export default withRouter(TextList);