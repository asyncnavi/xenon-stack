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
import {useForm} from '@mantine/form';
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth,logInWithEmailAndPassword} from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {Link, useNavigate} from "react-router-dom";

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

export default function Login() {
    const {classes} = useStyles();


    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value) ? null : "Password must contain 6 characters with at least one capital letter, one number and one special character.",
        },

    });

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/");
    }, [user, loading]);

    const handleSubmit = async (values) => {
        const {email, password} = values;
        await signInWithEmailAndPassword(auth, email, password).then( (auth) => {
            console.log(auth);
        } ).catch( (error) => {
            alert(error.message)
        });
    }


    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                    Welcome back
                </Title>
                <form  onSubmit={form.onSubmit(handleSubmit)} >
                    <TextInput label="Email address" placeholder="hello@gmail.com"
                               size="md"    {...form.getInputProps('email')} />
                    <PasswordInput label="Password" placeholder="Your password" mt="md" size="md"
                                   {...form.getInputProps('password')} />
                    <Button loading={loading}  type="submit" fullWidth mt="xl" size="md">
                        Login
                    </Button>

                </form>
                <Text align="center" mt="md">
                    Don't have an account?{' '} <Link to="/signup" >Register</Link>

                </Text>
            </Paper>
        </div>
    )
}