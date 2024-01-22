import useAuth from "../../hooks/useAuth";

const Home = () => {
    const {auth} = useAuth();

    return(
        <h1>HOME</h1>
    )
};

export default Home;