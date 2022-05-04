interface ISocialLogin {
    query: ParsedUrlQuery,
}

interface IEmailLogin {
    email: string,
    password: string,
    handleSuccess: () => void,
    handleFail: () => void,
    query: ParsedUrlQuery,
}