const crypto = require('crypto');

const decryptData = (encryptedData, iv, encryptionKey) => {
    try {
        // console.log("\nEncrypted Data Before Conversion:", encryptedData);
        // console.log("\nIV Before Conversion:", iv);
        // console.log("\nencyption key ", encryptionKey)

        if (typeof iv === 'object' && iv.type === 'Buffer' && Array.isArray(iv.data)) {
            iv = Buffer.from(iv.data);
        }

        if (typeof encryptedData === 'object' && encryptedData.type === 'Buffer' && Array.isArray(encryptedData.data)) {
            encryptedData = Buffer.from(encryptedData.data);
        }

        // console.log("Encrypted Data After Conversion:", encryptedData);
        // console.log("IV After Conversion:", iv);
        // console.log('IV length:', iv.length); // Should be 16 bytes
        // const expectedKey = Buffer.from('MzUyMjNkZmEzNTFiYTk0ZmYxYmI4Mzg4ZWM4Y2Q3NWE=', 'base64');
        // console.log('Encryption key length:', expectedKey.length); // Should be 32 bytes
        // console.log('Encryption key:', expectedKey);
        // console.log('IV during encryption:', iv.toString('hex'));


        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
        const decryptedData = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
        return decryptedData;
    } catch (error) {
        console.error("Error in decryption process:", error);
        throw error; // Ensure errors propagate for easier debugging
    }
};

module.exports = {
    decryptData
}