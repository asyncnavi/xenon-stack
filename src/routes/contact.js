import {
    createStyles,
    Text,
    Title,
    SimpleGrid,
    TextInput,
    Textarea,
    Button,
    Group,
    ActionIcon,
} from '@mantine/core';
import {useForm} from "@mantine/form";
import {addDoc, collection} from "firebase/firestore";
import {auth, db} from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";


const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: 400,
        boxSizing: 'border-box',
        backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
            theme.colors[theme.primaryColor][7]
        } 100%)`,
        borderRadius: theme.radius.md,
        padding: theme.spacing.xl * 2.5,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            padding: theme.spacing.xl * 1.5,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        color: theme.white,
        lineHeight: 1,
    },

    description: {
        color: theme.colors[theme.primaryColor][0],
        maxWidth: 300,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '100%',
        },
    },

    form: {
        backgroundColor: theme.white,
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.lg,
    },

    social: {
        color: theme.white,

        '&:hover': {
            color: theme.colors[theme.primaryColor][1],
        },
    },

    input: {
        backgroundColor: theme.white,
        borderColor: theme.colors.gray[4],
        color: theme.black,

        '&::placeholder': {
            color: theme.colors.gray[5],
        },
    },

    inputLabel: {
        color: theme.black,
    },

    control: {
        backgroundColor: theme.colors[theme.primaryColor][6],
    },
}));



export default function Contact() {
    const {classes} = useStyles();
    const [user,loading,error] = useAuthState(auth);

    // const icons = social.map((Icon, index) => (
    //     <ActionIcon key={index} size={28} className={classes.social} variant="transparent">
    //         <Icon size={22} stroke={1.5}/>
    //     </ActionIcon>
    // ));


    const form = useForm({
        initialValues: {
            name : "",
            email: "",
            message: "",
        },
        validate: {
            name: (value) => value.length > 2 ? null : "Name is short",
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            message : (value) => value.length > 50 ? null : "Message atleast should be of 50 character",
        },


    });


    const handleSubmit = async (values) => {
        const { name,email,message } = values;
        await addDoc(collection(db, "contacts"), {
            name,
            authProvider: "local",
            email,
            message,
        }).then( () => {
            alert("Message sent successfully");
        } ).catch( (error) => {
            alert(error.message)
        } );

        form.reset();
    }


    return (
        <div className={classes.wrapper}>
            <SimpleGrid cols={2} spacing={50} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                <div>
                    <Title className={classes.title}>Contact us</Title>
                    <Text className={classes.description} mt="sm" mb={30}>
                        Leave your email and we will get back to you within 24 hours
                    </Text>

                    {/*<ContactIconsList variant="white"/>*/}

                    {/*<Group mt="xl">{icons}</Group>*/}
                </div>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <div className={classes.form}>
                        <TextInput
                            label="Email"
                            placeholder="your@email.com"
                            classNames={{input: classes.input, label: classes.inputLabel}}
                            {...form.getInputProps("email")}
                        />
                        <TextInput
                            label="Name"
                            placeholder="John Doe"
                            mt="md"
                            classNames={{input: classes.input, label: classes.inputLabel}}
                            {...form.getInputProps("name")}

                        />
                        <Textarea
                            label="Your message"
                            placeholder="I want to order your goods"
                            minRows={4}
                            mt="md"
                            classNames={{input: classes.input, label: classes.inputLabel}}
                            {...form.getInputProps("message")}

                        />

                        <Group position="right" mt="md">
                            <Button type="submit" className={classes.control}>Send message</Button>
                        </Group>
                    </div>
                </form>

            </SimpleGrid>
        </div>
    );
}