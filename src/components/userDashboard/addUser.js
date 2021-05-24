import React, {Component} from 'react';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.inputRef=React.createRef();
    }
    componentDidMount() {
        // this.inputRef.current['name'].focus();
    }

    handleChange=(e)=>
    {
        console.log(this.inputRef.current['name'].value)
        console.log(this.inputRef.current['job'].value)
    }
    render() {
        return (
            <div>
                <form>
                    <input placeholder="name" style={{width:"100%",height:"100%",padding:10,fontSize:20}} onChange={(e)=>this.handleChange(e)} ref={el => this.inputRef.current['name'] = el}/>
                    <input placeholder="job" style={{width:"100%",height:"100%",padding:10,fontSize:20}} onChange={(e)=>this.handleChange(e)} ref={el => this.inputRef.current['job'] = el}/>
                </form>

            </div>
        );
    }
}

export default AddUser;