/*
    Declare variable and get the elements from the HMTL
*/

let textToPrint = "";
let textToValidate = document.querySelector("#text");
let textToCopy = document.querySelector('#text-printed');

/* Declare hashmap to encrypt and decrypt the message*/ 
const mapCode = {
    A:'ai',
    E:'enter',
    I:'imes',
    O:'ober',
    U:'ufat',
};
const mapDecode = { 
    ai : 'a',
    enter : 'e',
    imes : 'i',
    ober : 'o',
    ufat : 'u', 
}

/*
    Declare regular expressions to search and simplify conditions in the text
    -to check for special characters or uppercase letters (regexSpecialChar, regexUpperCase)
    -to search the characters that will be replaced in the text(regexEncrypt, regexDecrypt)
*/
const regexSpecialChar= /[!\#\$\%\&\'\(\)\*\+\-\.\/\:\;\<\=\>\?\@\[\]\¨\´\-\¨\´\-\\\^\_\{\|\}\~\¡\¢\£\¤\¥\¦\§\©\ª\«\¬\®\¯\°\±\²\³\µ\¶\·\¸\¹\º\»\¼\½\¾\¿\×\÷\À\Á\Â\Ã\Ä\Å\Æ\Ç\È\É\Ê\Ë\Ì\Í\Î\Ï\Ð\Ñ\Ò\Ó\Ô\Õ\Ö\×\Ø\Ù\Ú\Û\Ü\Ý\Þ\ß\à\á\â\ã\ä\å\æ\ç\è\é\ê\ë\ì\í\î\ï\ð\ñ\ò\ó\ô\õ\ö\÷\ø\ù\ú\û\ü\ý\þ\ÿ\,]/;
const regexUpperCase = /[A-Z]/;
const regexEncrypt = /[aeiou]/g;
const regexDecrypt = /(enter|imes|ai|ober|ufat)/g;


/* 
    Function to check if the text is valid for encoding/decoding that means that the text doesnt contain any special character neither uppercase
*/

function checkText(buttonId){
    clearOutput();
    if(regexUpperCase.exec(textToValidate.value) || regexSpecialChar.exec(textToValidate.value)){
        alert("Recuerde que el texto no solo debe incluir minusculas y sin acentos")
        return;
    }
    console.log("pasa")
    //Since the text is valid, check if the user wants to encrypt or decrypt it
    if(buttonId=="encrypt"){
        encryptText();
    }else{
        decryptText();
    }
    
}
//function to encrypt the text
function encryptText(){
    // check with regexEncrypt if text contains characters to encrypt, and remove the duplicates if is necessary
   let listEncrypt = removeDuplicates(textToValidate.value.match(regexEncrypt));
   textToPrint = textToValidate.value;
   for(let i = 0; i < listEncrypt.length;i++){
        //replace the characters to be encrypted with uppercase letters
        textToPrint = textToPrint.replaceAll(listEncrypt[i],listEncrypt[i].toUpperCase());
   }
   for(let i = 0; i < listEncrypt.length;i++){
    //replace uppercase characters with their respective encryption codes
    textToPrint = textToPrint.replaceAll(listEncrypt[i].toUpperCase(),mapCode[listEncrypt[i].toUpperCase()]);
}
   textPrinted(textToPrint);
   clearInput();
}
//function to encrypt text
function decryptText(){
    // check with regexDecrypt if text contains the encryption code, and remove the duplicates if is necessary
    let listDecrypt = removeDuplicates(textToValidate.value.match(regexDecrypt));
    textToPrint = textToValidate.value;
    for(let i=0; i<listDecrypt.length; i++){
        //replace encryption code with their respective decryption letters
        textToPrint= textToPrint.replaceAll(listDecrypt[i],mapDecode[listDecrypt[i]]);
        
    }
    textPrinted(textToPrint);
    clearInput();
}

//function to remove duplicates in array
function removeDuplicates(array){
    return [...new Set(array)];
}
//function to copy the encrypt/decrypt text
function copyText(){
    navigator.clipboard.writeText(textToCopy.value);
    document.querySelector(".copied").classList.remove("invisible");
    setTimeout(()=>{
        document.querySelector(".copied").classList.add("invisible");
    },2000)

}
//function to print the encrypted/decrypted text
function textPrinted(message){
    document.querySelector("#text-printed").value = message;
    document.querySelector(".no-txt-found").classList.add("invisible")
    document.querySelector(".txt-found").classList.add("visible")
}
// function to clear the text in input field
function clearInput(){
    document.querySelector("#text").value = ""
}
//function to clear the text in output field
function clearOutput(){
    document.querySelector("#text-printed").value = ""
}

