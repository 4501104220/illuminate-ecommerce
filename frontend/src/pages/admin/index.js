import React from "react";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {logout, logoutSuccess} from "modules/Auth/Login/login.slice";
import Chart from "@admin//Chart/Chart";

function Admin() {
    const user = useSelector((state) => state.login.user);
    const dispatch = useDispatch();
    return (
        <>
            <h1>Dashboard</h1>
            <Chart/>
            <p
                onClick={() => {
                    dispatch(logout());
                }}
            >
                Logout
            </p>
        </>
    );
}

export default Admin;
