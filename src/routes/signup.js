import React from 'react';
import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
} from '@mantine/core';
import {useForm} from "@mantine/form";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {addDoc, collection} from "firebase/firestore";
import {auth, db} from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {Link, useNavigate} from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: 900,
        backgroundSize: 'cover',
        backgroundImage:
            'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
    },

    form: {
        borderRight: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
        }`,
        minHeight: 900,
        maxWidth: 450,
        paddingTop: 80,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '100%',
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    logo: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        width: 120,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

export default function Signup() {
    const {classes} = useStyles();
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validate: {
            name: (value) => value.length < 2 ? "Name is short" : null,
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value) ? null : "Password must contain 6 characters with at least one capital letter, one number and one special character.",
        },

    });

    React.useEffect(() => {
        if (loading) return;
        if (user) navigate("/");
    }, [user, loading]);


    const handleSubmit = async (values) => {

        const { name,email, password } = values;
        const res = await createUserWithEmailAndPassword(auth, email, password).then( (auth) => {
            console.log(auth);
        } ).catch( (err) => {
            alert(err.message);
        } )
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    }


    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                    Let's start your journey with us.
                </Title>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput {...form.getInputProps('name')} label="Your Name" placeholder="john" size="md"/>
                    <TextInput {...form.getInputProps('email')} label="Email address" placeholder="hello@gmail.com"
                               size="md"/>
                    <PasswordInput {...form.getInputProps('password')} label="Password" placeholder="Your password"
                                   mt="md" size="md"/>
                    <Button type="submit" fullWidth mt="xl" size="md">
                        Continue
                    </Button>
                </form>


                <Text align="center" mt="md">
                    Already have an account?{' '} <Link to="/login" >Login</Link>
                </Text>
            </Paper>
        </div>
    )
}