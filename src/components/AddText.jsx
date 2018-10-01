import React,{Component} from 'react';

class AddText extends Component{
    
    constructor(props){
        super(props)
        this.state={
            title:'',
            content:'',
            error:'',
            message:''
        }
    }
    
    
    validInput(){ //check if the input contain null value
        
        const {title,content} = this.state;
                
        if((title!=='')&&(content!=='')){
            return true;
        }else{
            return false;
        }
    }
    
    
    validTitle(){ // The title can not be duplicated
        
        const {title} = this.state;
        const ready = JSON.parse(localStorage.getItem('textinfo')); 
        
        
        if(ready === null){return true;} 
            
        console.log('title',title);
        console.log('text.title',ready);
            
        const found = ready.find((text)=>{
            return text.title === title;
        });
               
        if(found){ 
            console.log('title exist');
            return false;}else{return true;}
    }
    
    addText(){

        const textArray = [];
        const {title,content}=this.state;
        
        if((localStorage.getItem('textinfo')) === null){// if storage is  null set info directly
            textArray.push({title,content});
            console.log("textArray",textArray);
            
            localStorage.setItem('textinfo',JSON.stringify(textArray));
            console.log("localstorage",localStorage.getItem('textinfo'));
            
        }else{
            
            const ready = JSON.parse(localStorage.getItem('textinfo'));// parse json to array
            ready.push({title,content});
            localStorage.setItem('textinfo',JSON.stringify(ready));
            console.log("localstorage",localStorage.getItem('textinfo'));
        }
    }
    
    
    executeText(){
        if(this.validInput()){
            if(this.validTitle()){
                this.addText();
            }else this.setState({error:'Title cannot be dulpicated'})
            
        }else{
            this.setState({error:'All fields are required'});
        }
    }   
    
    
    clearAll(){
        localStorage.clear();
        this.setState({error:'All Records have been cleared'})
    }
    
    
    render(){
            
        const ready = JSON.parse(localStorage.getItem('textinfo')); 


        
        return(
            <div>
                <h4>Add Text</h4>

                <div className='form-inline'>
                    <div className='form-group'>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Add a title'
                            style={{marginRight:'5px'}}
                            onChange={event=>this.setState({title:event.target.value})}
                        />

                        <input
                            className='form-control'
                            type='text'
                            placeholder='Add content'
                            style={{marginRight:'5px'}}
                            onChange={event=>this.setState({content:event.target.value})}
                        />

                        <button
                            className='btn btn-success'
                            type='button'
                            onClick={()=>this.executeText()}
                        >
                          Add Text
                        </button>
                        
                         <button
                            className='btn btn-danger'
                            type='button'
                            onClick={()=>this.clearAll()}
                        >
                          Clear All Records
                        </button>
                        <div className='errorContainer'>{this.state.error}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddText;