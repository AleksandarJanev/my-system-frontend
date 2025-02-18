import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/store";
import RegisterSlice, {
    resetForm,
    setDetails,
    setEmail,
    setPassword,
    setResponseMessage
} from "../state/slices/registerSlice.ts";
import {register} from "../services/api.ts";

const Register = () => {

    const username = useSelector((state: RootState) => state.register.username);
    const password = useSelector((state: RootState) => state.register.password);
    const email = useSelector((state: RootState) => state.register.email);
    const firstname = useSelector((state: RootState) => state.register.firstname);
    const lastname = useSelector((state: RootState) => state.register.lastname);
    const responseMessage = useSelector((state: RootState) => state.register.responseMessage);


    const dispatch = useDispatch();

    const handleChange = (name: string, value: string) => {
        dispatch(setDetails({field: name, value}))
    }

    const formSubmitHandler = async (e) => {
            e.preventDefault();
            const newUser = { username, password, email, firstname, lastname };
            try {
                const response = await register(newUser);
                dispatch(setResponseMessage(JSON.stringify(response)));
                dispatch(resetForm());
            } catch (error) {
                console.log(error)
                dispatch(resetForm());
            }
    }

    return (
        <div>
            <form onSubmit={formSubmitHandler}>
                <input type={"text"} value={username} onChange={(e) => handleChange("username", e.target.value)} placeholder={"Username"}/>
                <input type={"password"} value={password} onChange={(e) => handleChange("password", e.target.value)}  placeholder={"Password"}/>
                <input type={"text"} value={email} onChange={(e) => handleChange("email", e.target.value)} placeholder={"Email"}/>
                <input type={"text"} value={firstname} onChange={(e) => handleChange("firstname", e.target.value)} placeholder={"Firstname"}/>
                <input type={"text"} value={lastname} onChange={(e) => handleChange("lastname", e.target.value)} placeholder={"Lastname"}/>
                <button>Register</button>
            </form>
            {responseMessage && typeof responseMessage === "string" ? (
                <p>{responseMessage}</p>
            ) : null}
        </div>)
}

export default Register