
export const sendResponse = (res, statusCode, error, errors, data) => {
    res.status(statusCode).json({
        error,
        errors,
        data
    })
}
