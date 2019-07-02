import crypto from 'crypto';

function randomString() {
  return crypto.randomBytes(32).toString("base64");
}

export default randomString;