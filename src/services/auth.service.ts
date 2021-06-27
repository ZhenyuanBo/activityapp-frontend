import { User } from '../entities/user.entity';
import { Service_API, Endpoints, ErrorResponse, ToastMessage } from './api.service';  

class AuthService {
    private USER_INFORMATION: User | undefined = undefined;
    constructor(){
        this.getLoggedUser();
    }
    public async getLoggedUser(): Promise<User>{
        this.USER_INFORMATION = await Service_API.getUserInformation();
        return this.USER_INFORMATION;
    }

    public async RegisterUser(firstName: string, lastName: string, userName: string, password: string): Promise<ToastMessage>{
        const response = await Service_API.RegisterUser(firstName, lastName, userName, password);
        switch (typeof response){
            case "boolean":
                // SEND LOGIN REQUST
                const loginResponse = await this.LoginUser(userName, password);
                return loginResponse;
            case "string":
                // USER ALREADY EXISTS
                return this.UserExists(userName);
            default:
                // SIGN UP AND LOGIN SUCCESS + JWT TOKEN SAVED AND ASSIGNED

        }
    }

    public async LoginUser(userName: string, UserPassword: string): Promise<ToastMessage>{
        const response = await Service_API.LoginUser<User | ErrorResponse>(userName, UserPassword);
        if ((response as ErrorResponse).Error_Message) {
            return {
                autoHide: true,
                text1: "Credentials Invalid",
                text2: (response as ErrorResponse).Error_Message.toUpperCase(),
                type: "error",
                visibilityTime: 3000
            }
        }
        else {
            const User = (response as User);
            if (User.token) {
                await Service_API.saveAndLoadJWTToken(User.token);
            }
            await Service_API.saveUserInformation(User);
            await Service_API.getAllCategories();
            return {
                autoHide: true,
                text1: "Credentials Validated",
                text2: "You have been successfully Logged In",
                type: "success",
                visibilityTime: 3000
            };            
        }
    }

    public InvalidPasswordToast(): ToastMessage {
        return {
            type: "error",
            text1: 'Invalid Password',
            text2: 'Password should contain letters, special characters and alphabets and length must be 6-16 characters long',
            visibilityTime: 3000,
            autoHide: true,
        }
    }

    public UserExists(username: string): ToastMessage {
        return {
            type: "error",
            text1: 'User Name is already used',
            text2: `${username} is already used by another account, kindly choose another`,
            visibilityTime: 3000,
            autoHide: true,
        }
    }

    public NotSimilarPasswords(): ToastMessage {
        return {
            type: "error",
            text1: 'Passwords are not same',
            text2: 'Kindly check both passwords again!',
            visibilityTime: 3000,
            autoHide: true,
        }
    }

    public IncompleteCredentialsToast(): ToastMessage {
        return {
            type: "error",
            text1: 'Invalid Credentials',
            text2: 'Kindly check all credentials and try again',
            visibilityTime: 3000,
            autoHide: true,
        }    
    }

    public checkStrongPassword(password: string): boolean {
        let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if(password.search(regularExpression)>=0) return true;
        else return false;
    }
}

export const Service_Auth = new AuthService();