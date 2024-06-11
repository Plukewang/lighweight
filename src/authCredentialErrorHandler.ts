
export const errorHandler = (error: any): string =>{
    switch(error.code){
        case 'auth/user-not-found':
            return('Username or password not found. Try again.');

        case 'auth/wrong-password':
            return('Username or password not found. Try again.');

        case 'auth/too-many-requests':
            return('Too many login attempts. Try again later.');

        default: 
            return('Sign in error. Try again.');

    }
}