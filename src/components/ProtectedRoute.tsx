import {useAuth} from "./AuthProvider.tsx";
import {PropsWithChildren, ReactNode} from "react";

type Props = PropsWithChildren & {
    allowedRoles: string[]
}
const ProtectedRoute = ({children, allowedRoles}: Props) => {
    const {currentUser} = useAuth()

    if(currentUser === undefined){
        return <div>Loading...</div>
    }

    if(currentUser === null || !allowedRoles.includes(currentUser.role)){
        return <div>Permission Denied</div>
    }

    return (<div>
        {children}
    </div>)
}


export default ProtectedRoute