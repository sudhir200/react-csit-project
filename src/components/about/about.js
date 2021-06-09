import React, {Component} from 'react';
import QuoteCard from "../../commonComponents/quoteCard/quoteCard";
import {Avatar, Button, CardHeader} from "@material-ui/core";
import {Button as Button1, Drawer as Drawer2, Input, message} from "antd";
import Drawer from "@material-ui/core/Drawer";
import "./style.css"
import FunctionComponentMaterial from "./functionComponentMaterial";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";

class About extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            openDrawer:false
        }
    }
    toggleDrawer = (anchor, open) => (event) => {
           this.setState({openDrawer:false})
    };

    render() {
        return (
            <div>
                <div style={{margin:"100px 10px",padding:10}}>
                    <Button color={"primary"} variant={"outlined"}>Test material outlined</Button>
                    <br/>
                    <br/>
                    <Button onClick={()=>this.setState({openDrawer:true})} color={"secondary"} variant={"contained"}>Test material contained</Button>
                    <br/>
                    <br/>
                    <Drawer  anchor={'right'} open={this.state.openDrawer} onClose={(event)=>this.setState({openDrawer:false})}>
                      <div className={"rightDrawer"}>
                                                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid deserunt distinctio incidunt maiores omnis repellat tempore. Debitis ducimus, odit? Aliquid asperiores deleniti incidunt molestiae non quidem quo saepe sed?
                      </div>
                    </Drawer>
                    {/*<Button1>Test ant</Button1>*/}
                    <FunctionComponentMaterial color={'white'} background={'#' + (Math.random() * 0xFFFFFF << 0).toString(16)}/>
                  {/*  <Grid container spacing={3} xs={12}>
                        <Grid  item md={3} xs={12}>
                            <Button style={{width:"100%"}}>Hello</Button>
                        </Grid>
                        <Grid  item md={3} xs={12}>
                            <Input/>
                        </Grid>
                        <Grid  item md={3} xs={12}>
                            <Button>Hello 2</Button>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <Button> Hello 3</Button>
                        </Grid>

                    </Grid>*/}
                    <br/>
                    <Grid container spacing={3} xs={12}>
                        {[0,12,3,4,4,4,4,4,2,3,3,3].map(item=>
                            (<Grid item md={2} xs={12}>
                                <Card onClick={()=>message.warn('hello')} className="testCard" variant="contained" style={{width: "100%"}}>
                                    <CardHeader title="test title" subheader="test subheader" avatar={<Avatar>S</Avatar>}/>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="400px"
                                        image="https://img.yts.mx/assets/images/movies/kung_fury_2015/medium-cover.jpg"
                                        title="Contemplative Reptile"
                                    />
                                    <div  className="space-between paddingLeftRight20">
                                        <Button size="small" color="primary">
                                            Share
                                        </Button>
                                        <Button size="small" color="primary">
                                            Learn More
                                        </Button>
                                    </div>
                                </Card>
                            </Grid>))}
                    </Grid>
                </div>
            </div>
        );
    }
}

export default About;