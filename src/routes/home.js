import React, {useEffect, useState} from 'react';
import {auth, db, signOut} from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";

const Home = () => {

    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
            console.log(data.name);
        } catch (err) {
            console.error(err);
        }
    };

    const logOut  = async () => {
        await signOut(auth).then( () => {
            navigate("/");
        } ).catch( (err) => {
            alert(err);
        } )
    }


    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/login");
        fetchUserName();
    }, [user, loading]);


    return (
        <div>
            {name}
            <button onClick={logOut}>Signout</button>
        </div>
    )
}

export default Home;