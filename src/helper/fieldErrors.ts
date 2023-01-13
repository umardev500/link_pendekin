export default (errors: any) => {
    const fieldErrors =
        typeof errors === 'object' &&
        errors?.reduce((listErrors: any, error: any) => {
            if (error?.field !== '') listErrors[error.field] = error
            return listErrors
        }, {})

    return fieldErrors
}
