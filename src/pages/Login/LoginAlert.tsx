interface LoginAlertProps {
    message: string;
    token?: boolean | string;
}

const LoginAlert = ({ message, token = false }: LoginAlertProps) => {
    return (
        <>
            { message && (
                <p style={{ color: token ? 'green' : 'red' }}> {message} </p>
            ) }
        </>
    );
};

export default LoginAlert;