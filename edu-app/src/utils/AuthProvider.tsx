import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

import { AuthContext as interfaceAuthContext, User } from "types/types.d";

const COOKIE_NAME = 'authToken';

const AuthContext = createContext<interfaceAuthContext | undefined>(undefined)

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({children}: AuthProviderProps) {
    const [authToken, setAuthToken] = useState<string|undefined>();
    const [currentUser, setCurrentUser] = useState<User|null>();

    useEffect(() => {
        async function fetchUser(){
            try {
                const response = await getUser();

                const user: User = {
                    user_id: response.user.user_id,
                    username: response.user.username,
                    type: response.user.type,
                    iat: response.user.iat,
                    exp: response.user.exp,
                    employee_id: response.user.employee_id
                };

                setCurrentUser(user)
                setAuthToken(response.authToken)     
                
            } catch(err){
                console.error(err)
            }
        }

        // setAuthToken(Cookies.get(COOKIE_NAME))
        fetchUser()
        
    }
    , []);

    async function getUser(): Promise<any> {
        try {
            const response = await axios.get('http://localhost:3001/api/verify_user', {
                withCredentials: true, // Ensure cookies are sent and received
            });

            return response.data;
        } catch (error) {
            console.error('Failed to fetch user:', error);
            throw new Error('Failed to fetch user');
        }
    }

    async function handleLogin(username:string, password:string): Promise<string> {
        try{
            const response = await axios.post('http://localhost:3001/api/login', {
                username: username,
                password: password
            },
            {
                withCredentials: true, // This ensures cookies are sent and received
            });
            
            const status = response.status
            setAuthToken(response.data.authToken)
            setCurrentUser(response.data.user)
            return response.data
        }
        catch (err) {
            console.error(err)
            // return `${err}`

            if (axios.isAxiosError(err)) {
                if (err.response && err.response.data) {
                    // Access the data in the response from the server
                    
                    throw new Error(err.response.data.error)
                    // You might have an error message or some other structure
                }
            }
            throw new Error('An unknown error occurred during login');
        };
    }

    async function handleLogout() {
        console.log('button presed')
        try{
            const response = await axios.post('http://localhost:3001/api/logout',{},
            {
                withCredentials: true, // This ensures cookies are sent and received
            });

            setAuthToken(response.data.authToken)
            setCurrentUser(null)

        }
        catch (err) {
            console.error(err)
        };

        console.log('LOGGED OUT')
    }

    return <AuthContext.Provider value={{ authToken, currentUser, handleLogin, handleLogout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext);

    useEffect(() => {
        // console.log(context)
    }, []);
    

    if (context === undefined){
        throw new Error('useAuth must be used inside of a AuthProvider')
    }

    return context;
}


