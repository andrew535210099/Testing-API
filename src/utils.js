const getRequestData = (req) => {
    return new Promise((resolve, reject) => {
        try {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            resolve(body);
        });
        } catch (error) {
        reject(error);
        }
    });
}

module.exports = getRequestData