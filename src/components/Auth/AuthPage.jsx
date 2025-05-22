import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthPage = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    return (
         <div className="flex justify-around p-8">
            {isSignIn ? (
                <>
                    {/* Sign In form on left */}
                    <div className="flex-1 max-w-md">
                        <SignIn onToggle={() => setIsSignIn(false)} />
                    </div>
                    {/* Text content on right */}
                    <div className="flex-1 max-w-md p-4">
                        <h2 className="text-2xl font-semibold mb-2">Welcome Back!</h2>
                        <p className="text-gray-700">Sign in to access your account and continue shopping.</p>
                    </div>
                </>
            ) : (
                <>
                    {/* Text content on left */}
                    <div className="flex-1 max-w-md p-4">
                        <h2 className="text-2xl font-semibold mb-2">Join Us!</h2>
                        <p className="text-gray-700">Create your account to enjoy exclusive offers and faster checkout.</p>
                    </div>
                    {/* Sign Up form on right */}
                    <div className="flex-1 max-w-md">
                        <SignUp onToggle={() => setIsSignIn(true)} />
                    </div>
                </>
            )}
        </div>
    );
};

export default AuthPage;
