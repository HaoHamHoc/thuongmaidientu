export function isValidPassword(password: string) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password) && (password.split(" ").length ===1);
}

export const isValidEmail = (email: string) => {
    return email?.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

function checkSpaceInputRegister(input: string){
    const wordArrayFromSplitString = input.split(" ");
    return wordArrayFromSplitString.every(item=>(item !== " " && item != ""));
}

export default checkSpaceInputRegister;

