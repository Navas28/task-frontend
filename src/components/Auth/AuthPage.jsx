import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthPage = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-5xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {isSignIn ? (
                        <>
                            <div className="order-2 lg:order-1">
                                <SignIn onToggle={() => setIsSignIn(true)} />
                            </div>
                            <div className="order-1 text-center lg:text-left space-y-6 bg-blue text-white p-10 h-full flex flex-col justify-center min-h-screen">
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold bg-clip-text mb-4">
                                        Hello Friend
                                    </h1>
                                    <p className="text-xl">
                                       Enter your personal details and  <br />start your journey with us
                                    </p>
                                    <div className="flex justify-center">
                                        <button
                                            onClick={() => setIsSignIn(false)}
                                            className="w-[80%] mt-6 px-6 py-5 border-2 font-semibold rounded-full"
                                        >
                                            SIGN UP
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Text content */}
                            <div className="order-1 text-center lg:text-left space-y-6 bg-blue text-white p-10 h-full flex flex-col justify-center min-h-screen">
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">Welcome Back</h1>
                                    <p className="text-xl text-white text-center">
                                        To keep connected with us please login with your personal info
                                    </p>

                                    <div className="flex justify-center">
                                        <button
                                            onClick={() => setIsSignIn(true)}
                                            className="w-[80%] mt-6 px-6 py-5 text-white border-2 font-semibold rounded-full"
                                        >
                                            SIGN IN
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="order-2 lg:order-2">
                                <SignUp onToggle={() => setIsSignIn(true)} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
