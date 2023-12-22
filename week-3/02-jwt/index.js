const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const zod = require('zod');

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signJwt(username, password) {
    // Validate username and password using Zod schemas
    const usernameResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);

    // If either validation fails, return null
    if (!usernameResponse.success || !passwordResponse.success) {
        return null;
    }

    // Construct the payload with the validated username
    const payload = {
        username,
    };

    // Sign the JWT using the payload and secret key
    const signature = jwt.sign(payload, jwtPassword);
    return signature;
}

function verifyJwt(token) {
    try {
        // Verify the JWT using the secret key
        const decoded = jwt.verify(token, jwtPassword);

        // Return true if decoding is successful, otherwise return false
        return !!decoded;
    } catch (e) {
        // If verification fails, return false
        return false;
    }
}

function decodeJwt(token) {
    try {
        // Decode the JWT without verifying its authenticity
        const decoded = jwt.decode(token);

        // Return true if decoding is successful, otherwise return false
        return !!decoded;
    } catch (err) {
        // If decoding fails, return false
        return false;
    }
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
