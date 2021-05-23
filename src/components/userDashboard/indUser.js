import React, {Component} from 'react';
import {getIndividualUser} from "../../apicall/users";
import {Avatar, Card, message, Skeleton} from "antd";
//import {userParams} from "react-router-dom";

class IndUser extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            userDetail:[],
            loading:false,
            added:false,
            userId:this.props.match.params.userId
        }
    }
    //const [userDetail,setUserDetail]=React.useState([])
    // const {userId}=useParams();
    componentDidMount() {
        let userData=localStorage.getItem(this.state.userId)
        if(userData)
        {
            // document.getElementById('desc').style.borderColor="red";
            document.getElementById('desc').focus();
            this.setState({added:true,userDetail:JSON.parse(userData)})
        }
        else
        this.getUserById()

    }
    // const getUserById
    getUserById=()=>
    {
        let self=this;
        self.setState({loading:true})
        getIndividualUser(this.state.userId).then(function (res){
            //setUserDetail(res.data)
            self.setState({loading:false,userDetail:res.data})
        })
    }
    handleSubmit=(e)=>
    {
        e.preventDefault();
        localStorage.setItem(this.state.userDetail.id,JSON.stringify(this.state.userDetail))
        message.success('updated!')
        this.props.history.push('/users')
    }
    handleChange=(e)=>
    {
        if(e.target.name==='bio')
        {
            //userDetail.bio=e.target.value
            this.state.userDetail.bio=e.target.value;

        }
       else if(e.target.name==='description')
        {
            //userDetail.bio=e.target.description
            this.state.userDetail.description=e.target.value;
        }
       // setUserDetail(userDetail) // functional approach
        this.setState({userDetail:this.state.userDetail})
    }

    render() {
        const {userDetail,loading}=this.state;
        return (
            <div style={{width:700,margin:"20px auto"}}>
                {loading?
                    [0,12,3,3,3].map((item)=><Skeleton  active/>)
                    :''}
               <div className="header-title">{userDetail.first_name} </div>
                {userDetail && !loading?<div >
                    <div>
                        <img src={userDetail.avatar} alt="user" draggable={false}/>

                    </div>
                    <div>
                        <span className="header-title">{userDetail.first_name + '   ' + userDetail.last_name}</span>
                        <br/>
                        <a href={`mailto:${userDetail.email}`}>{userDetail.email}</a>
                        <br/>
                        <Avatar>{userDetail.first_name?userDetail.first_name.charAt(0):''}</Avatar>
                        <br/>
                        <a href={`tel:98655256466}`}>9864555555</a>
                    </div>

                </div>:''}

                {!loading?
                    <form className="edit-user-form" onSubmit={(e) => this.handleSubmit(e)}>
                        <div style={{marginTop: 20}}>
                            <textarea id="desc" placeholder="desc" name="description" className="input-user" required onChange={(e) => this.handleChange(e)} value={userDetail.description} style={{width: "100%"}}/>
                            <input onClick={()=>document.getElementById('bio').select()}  id="bio" placeholder="bio" className="input-user" name="bio"  onChange={(e) => this.handleChange(e)} value={userDetail.bio} style={{width: "100%"}}/>
                        </div>
                        {/*onClick={()=>this.handleSubmit()}*/}
                        <button  type="submit" className="submit-btn">{this.state.added ? 'Update user' : 'Add User datas'}</button>
                    </form>:''

                }
            </div>
        );
    }
}

export default IndUser;