import React from 'react';
import {Field, reduxForm} from 'redux-form';

class StreamForm extends React.Component{
    renderError ({ error, touched}){

        if(touched && error){
            return(
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }

    }
    renderInput = ({input, label, meta})=>{
        const className = `field ${meta.touched && meta.error ? 'error' : ''}`
        return (
        <div className={className}>
            <label>{label}</label>
        <input {...input}/>
        {this.renderError(meta)}
        </div>)
        //this is equivalent for value = {arg.input.value} and 
        //onChange = {arg.input.onChange} arg is passed as input to the function
    }
    onSubmit= (formValues)=>{
        this.props.onSubmit(formValues);
    }
    
    render(){
    return (
        <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field name="title" component={this.renderInput} label = "Enter Title"/>
            <Field name="description" component={this.renderInput} label = "Enter Description"></Field>
            <button className="ui button primary">Submit</button>
        </form>
    )
}
}
const validate = formValues => {
    const errors ={}
if(!formValues.title){
        errors.title = 'Enter a title'
    }
if(!formValues.description){
        errors.description = 'Enter a description'
    }
    return errors;
}

export default reduxForm({
    form:'streamForm',
    validate
})(StreamForm);
