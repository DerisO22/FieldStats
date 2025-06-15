// Not really implemented at the moment, but
// this would definitely improve the readability endpoints and services
export const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ error: "Something Went Wrong!"});
}