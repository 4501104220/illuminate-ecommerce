import {TextField, Button, Typography} from "@material-ui/core";

const CustomForm = ({status, message, onValidated}) => {
    let email, name;
    const submit = () =>
        email &&
        name &&
        email.value.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email.value,
            NAME: name.value,
        });

    return (
        <div>
            <Typography>Đăng ký nhận tin từ Shop</Typography>
            {status === "sending" && <div style={{color: "blue"}}>Loading...</div>}
            {status === "error" && <div style={{color: "red"}} dangerouslySetInnerHTML={{__html: message}}/>}
            {status === "success" && <div style={{color: "green"}} dangerouslySetInnerHTML={{__html: message}}/>}
            <TextField
                inputRef={(node) => (name = node)}
                type="text"
                placeholder="Tên"
                variant="outlined"
                size="small"
            />
            <br/>
            <TextField
                inputRef={(node) => (email = node)}
                type="email"
                placeholder="Email"
                variant="outlined"
                size="small"
                margin="normal"
            />
            <br/>
            <Button variant="contained" color="primary" onClick={submit}>
                Xác nhận
            </Button>
        </div>
    );
};

export default CustomForm;
