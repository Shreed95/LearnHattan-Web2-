import { Outlet } from "react-router-dom";
// import { useAuthContext } from "../hooks/useAuthContext";

const AuthLayout = () => {
    return (
        <>
            <section className="">
                <Outlet />
            </section>
        </>
    )
}

export default AuthLayout