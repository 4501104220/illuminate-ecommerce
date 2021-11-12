import React from "react";

import {makeStyles} from "@material-ui/core/styles";
import {Divider, List} from "@material-ui/core";

import PerfectScrollbar from "react-perfect-scrollbar";
import {appMenuItems} from "./configSidebar";
import NavItems from "./NavItems";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        position: "sticky",
        alignItems: "center",
        justifyContent: "center",
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    logoText: {
        margin: 0,
    },
}));

function SideBar({isToggle}) {
    const classes = useStyles();
    return (
        <>
            <div className={classes.toolbar}>
                {isToggle ? <h1 className={classes.logoText}>ADMIN </h1> : <h1 className={classes.logoText}>AD</h1>}
            </div>
            <PerfectScrollbar options={{suppressScrollX: true}}>
                <Divider/>
                <List>
                    {appMenuItems.map((item, index) => (
                        <NavItems {...item} key={index}/>
                    ))}
                </List>
            </PerfectScrollbar>
        </>
    );
}

export default SideBar;
