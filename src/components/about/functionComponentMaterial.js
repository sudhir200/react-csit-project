import React from 'react';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    customButton:{
        color:'red',
        background:'white',
        outline:'none',
        fontSize:20,
        padding:10,
        border:'none'
    }
});
function FunctionComponentMaterial({color,background}) {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.list}>

            </div>
            <button style={{color:color,background:background}} className={classes.customButton}>
                test button custom
            </button>
        </div>
    );
}

export default FunctionComponentMaterial;