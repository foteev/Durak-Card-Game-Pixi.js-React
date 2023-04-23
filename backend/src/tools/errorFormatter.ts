const formatError = (err: any) => {
    const { name, message } = err;
    const body = {
        name,
        message
    }

    return body;
}

export default formatError;