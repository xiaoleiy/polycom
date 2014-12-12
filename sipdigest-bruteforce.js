var crypto = require("crypto");
function tryPassword(username, password, realm, nonce, hash, ha2) {
    ha1 = crypto.createHash("md5").update(username + ":" + realm + ":" + password).digest("hex");
    response = crypto.createHash("md5").update(ha1 + ":" + nonce + ":" + ha2).digest("hex");
    if (response == hash) {
        console.log("found password: " + password);
        return true;
    }
    return false;
}
var lower_case = Array("", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
var alphabet = lower_case;
var alphabet_len = alphabet.length;
var username = process.argv[2];
var realm = process.argv[3];
var nonce = process.argv[4];
var request_uri = process.argv[5];
var hash = process.argv[6];
var password_length = process.argv[7];
if (process.argv.length != 8) {
    console.log("Usage: node sipdigest-bruteforce.js username realm nonce sip-request-uri response password_length");
    process.exit(1);
}
console.log("Alphabet: \"" + alphabet + "\"");
console.log("Password length: " + password_length);
var permutations = Math.pow(alphabet_len, password_length);
console.log("Number of permutations: " + permutations);
var ha2 = crypto.createHash("md5").update("REGISTER:" + request_uri).digest("hex");
console.log("Precomputed HA2: " + ha2);
var prefix = "";
var password_line = "";
var body = "if (tryPassword(username, password, realm, nonce, hash, ha2) == true) {\nprocess.exit(0);\n}\n";
var suffix = "";
for (i = 0; i < password_length; i++) {
    prefix = "for (c" + i + "=0; c" + i + "<alphabet_len; c" + i + "++) {\n" + prefix;
    password_line = "alphabet[c" + i + "]" + (i > 0 ? " + " : "") + password_line;
    suffix = "}\n" + suffix;
}
password_line = "password = " + password_line + ";\n";
var password_generation_loop = prefix + password_line + body + suffix;
eval(password_generation_loop);
console.log("unable to find password");