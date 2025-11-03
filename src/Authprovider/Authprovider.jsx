/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged,signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import UserAxioxPublic from "../Page/Hooks/UserAxioxPublic";


export const AuthContext = createContext(null);

// const auth = getAuth(app);
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
   const axiosPublic = UserAxioxPublic();
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
//    const googleSignIn = () =>{
//     setLoading(true);
//     return signInWithPopup(auth,googleProvider);
//    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        // Firebase Auth has a maximum photoURL length of 2048 characters
        // If URL is too long, only update displayName and skip photoURL
        const MAX_PHOTO_URL_LENGTH = 2048;
        
        if (photo && photo.length <= MAX_PHOTO_URL_LENGTH) {
            return updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photo
            });
        } else {
            // If photo URL is too long, only update displayName
            // Photo will still be saved in database
            return updateProfile(auth.currentUser, {
                displayName: name
            });
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if(currentUser){
                const userInfo = {email: currentUser.email}
                try {
                    // Get JWT token
                    const jwtRes = await axiosPublic.post('/jwt', userInfo);
                    if(jwtRes.data.token){
                        localStorage.setItem('access-token', jwtRes.data.token);
                    }
                    
                    // Fetch user data from database to get photo URL
                    try {
                        // Try different endpoint formats
                        let dbUser = null;
                        try {
                            const userRes = await axiosPublic.get(`/users?email=${currentUser.email}`);
                            // If it's an array, find the user
                            if(Array.isArray(userRes.data)) {
                                dbUser = userRes.data.find(u => u.email === currentUser.email);
                            } else {
                                dbUser = userRes.data;
                            }
                        } catch (e1) {
                            try {
                                // Try single user endpoint
                                const userRes = await axiosPublic.get(`/users/${currentUser.email}`);
                                dbUser = userRes.data;
                            } catch (e2) {
                                // Try with encoded email
                                const encodedEmail = encodeURIComponent(currentUser.email);
                                const userRes = await axiosPublic.get(`/users/${encodedEmail}`);
                                dbUser = userRes.data;
                            }
                        }
                        
                        // Merge Firebase Auth user with database user data (especially photo)
                        if(dbUser && dbUser.photo) {
                            setUser({
                                ...currentUser,
                                photoURL: currentUser.photoURL || dbUser.photo, // Use database photo if Firebase Auth photoURL is missing
                                dbPhoto: dbUser.photo // Keep database photo as fallback
                            });
                        } else {
                            setUser(currentUser);
                        }
                    } catch (dbError) {
                        // If database fetch fails, just use Firebase Auth user
                        console.warn('Could not fetch user from database (this is okay if user just signed up):', dbError.message);
                        setUser(currentUser);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setUser(currentUser);
                }
            }
            else{
                localStorage.removeItem('access-token');
                setUser(null);
            }
            console.log('current user', currentUser);
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
     
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;