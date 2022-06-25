interface ISocialLogin {
    query: ParsedUrlQuery,
}

interface IEmailLogin {
    email: string,
    password: string,
}