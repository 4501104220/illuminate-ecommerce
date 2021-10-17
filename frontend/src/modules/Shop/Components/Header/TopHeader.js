import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "modules/Auth/Login/login.slice";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },

    hover01: {
        textDecoration: "none",
        fontWeight: "normal",
        '&:hover': {
            color: "white",
            fontWeight: "bold",
            background: "#42be6f",
            transform: "translate(-1px ,1px) scale(1.05)",
        }
    },

    hover02: {
        textDecoration: "none",
        fontWeight: "normal",
        '&:hover': {
            color: "white",
            background: "#42be6f",
        }
    },

    topHeader: {display: "flex", justifyContent: "space-between", paddingTop: "10px"},

    borderRight: {marginLeft: "3px", marginRight: "3px", lineHeight: "1.6em"},
}));

function TopHeader() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
    return (
        <div className={classes.topHeader}>
            <div className={classes.sectionDesktop}>
                <Link href="/category/giay-nam">
                    <Typography
                        className={classes.hover02}>
                        Giày nam </Typography>
                </Link>
                <div className={classes.borderRight}> |</div>
                <Link href="/category/giay-nu">
                    <Typography
                        className={classes.hover02}>
                        Giày nữ</Typography>
                </Link>
            </div>
            <div style={{paddingRight: 20}}>
                {isAuthenticated ? (
                    <div className={classes.sectionDesktop}>
                        <Link href="/user">
                            <Typography>Dashboard</Typography>
                        </Link>
                        <div className={classes.borderRight}> |</div>

                        <Typography onClick={() => dispatch(logout())}
                                    className={classes.hover01}>
                            Đăng xuất</Typography>
                    </div>
                ) : (
                    <div className={classes.sectionDesktop}>

                        <Link href="/login">
                            <Typography
                                className={classes.hover01}>
                                Đăng nhập</Typography>
                        </Link>

                        <div className={classes.borderRight}> |</div>

                        <Link href="/register">
                            <Typography
                                className={classes.hover01}>
                                Đăng ký</Typography>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TopHeader;
