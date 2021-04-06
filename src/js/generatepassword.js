export class PasswordGenerator {
    getRandomNumbers(length) {
        var array = new Uint8Array(length);
        var res = new Float32Array(length);
        window.crypto.getRandomValues(array);
        for (let i = 0; i < array.length; i++) {
            res[i] = array[i] / 0xFF;
        }
        return res;
    }

    getPassword(config) {
        var result = [];
        var characters = this.genChars(config);
        var charactersLength = characters.length;
        let randomness = this.getRandomNumbers(config["length"]);
        for ( let i = 0; i < config["length"]; i++ ) {
            let char = characters.charAt(Math.floor(randomness[i] * charactersLength));
            result.push(char);
        }
        let res = result.join('');
        console.log(res);
        return result;
    }

    genChars(config) {
        let chars = "";
        if (!config["numbers"] && !config["letters"] && !config["specialCharacters"] && !config["lockedSpecialCharacters"]) {
            return "-";
        }
        if (config["numbers"]){
            chars = chars + "0123456789";
        }
        if (config["letters"]){
            chars = chars + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        }
        if (config["specialCharacters"]){
            chars = chars + "!§$%/()´`^°*~#|,:._-€@";
        }
        if (config["lockedSpecialCharacters"]){
            chars = chars + "\\?\"[{\'&>;+}=]< ";
        }
        return chars;
    }
}