import React, {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {useRouter} from "next/router";
import {toast} from "react-toastify";

import {makeStyles, createStyles} from "@material-ui/core/styles";
import {Button, Grid, TextField} from "@material-ui/core";

import api from "services/axios";

function CategoryCreate(props) {
    const classes = useStyles();
    const router = useRouter();
    const {category} = router.query;

    const {handleSubmit, errors, control, reset} = useForm();
    const [error, setError] = React.useState(null);

    const onSubmit = async (values) => {
        try {
            const {data} = await api.post("/api/category", values);
            if (data) {
                toast("Create success!");
                router.replace({
                    pathname: "./" + values.slug,
                });
            }
        } catch (err) {
            toast(err.response.data.message);
        }
    };

    React.useEffect(() => {
        if (!!category) {
            async function fetchData() {
                try {
                    const {data} = await api.get(`/api/category/${category}`);
                    if (data) {
                        const {category} = data;
                        reset(category);
                    }
                } catch (error) {
                    setError(error.response.data.message);
                }
            }

            fetchData();
        }
    }, [category]);
    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {error && <h1>{error}</h1>}
                <Grid container direction="column" className={classes.container}>
                    <Grid item>
                        <Controller
                            as={<TextField margin="normal" variant="outlined" fullWidth required/>}
                            label="Title"
                            name="title"
                            control={control}
                            helperText={errors.title ? errors.title.message : null}
                            error={errors.title ? true : false}
                            defaultValue=""
                            rules={{
                                required: "this is required",
                                pattern: {value: /^[a-zA-Z 0-9]*$/, message: "not include special characters"},
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Controller
                            as={<TextField margin="normal" variant="outlined" fullWidth required/>}
                            label="Slug"
                            name="slug"
                            control={control}
                            helperText={errors.title ? errors.title.message : null}
                            error={errors.title ? true : false}
                            defaultValue=""
                            rules={{
                                required: "this is required",
                                pattern: {value: /^[a-zA-Z 0-9]*$/, message: "not include special characters"},
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Controller
                            as={<TextField margin="normal" variant="outlined" fullWidth/>}
                            label="Description"
                            name="description"
                            control={control}
                            helperText={errors.title ? errors.title.message : null}
                            error={errors.title ? true : false}
                            defaultValue=""
                            rules={{
                                pattern: {value: /^[a-zA-Z 0-9]*$/, message: "not include special characters"},
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Button className={classes.button} type="submit" variant="outlined" aria-label="delete"
                                color="primary">
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: "center",
            color: theme.palette.text.secondary,
        },
        container: {
            padding: theme.spacing(2),
        },
        textField: {
            marginBottom: theme.spacing(1.5),
        },
        dense: {
            marginTop: theme.spacing(2),
        },
        menu: {
            width: 200,
        },
        button: {
            marginTop: theme.spacing(2),
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    })
);

export default CategoryCreate;
