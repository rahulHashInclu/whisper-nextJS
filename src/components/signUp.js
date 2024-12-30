import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";


export default function SignUp(){


    return(
        <>
            {/* change the width and heigh declaration because it will not work properly in mobile screens */}
            {/* change card background color */}
            <Card className="w-[27.5vw] h-[61.4vh] rounded-signup-card">
                <CardHeader>
                    <CardTitle>Welcome Back</CardTitle>
                    <CardDescription>Don’t have an acccount yet? Sign up</CardDescription>
                </CardHeader>
                
            </Card>
        
        </>
    )
}