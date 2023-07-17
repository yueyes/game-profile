import {randomBytes,pbkdf2Sync} from 'crypto';

// make random salt
export function makeSalt(): string {
    // crypto.randomBytes(3) make 3 bytes random number as a salt value
    return randomBytes(3).toString('base64');
}

// user salt to encrypt password
export function encryptPassword(password: string, salt: string): string {
    if (!password || !salt) {
        return '';
    }
    // create string include salt, and encode as base 64
    const tempSalt = Buffer.from(salt, 'base64');
    return (
        pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
    )
}