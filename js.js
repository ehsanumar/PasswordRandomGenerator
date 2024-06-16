const lengthSlider=document.querySelector(".pass-len input"),
options=document.querySelectorAll(".options input"),
copyicon=document.querySelector(".input-box span"),
passwordinput=document.querySelector(".input-box input"),
passwordin=document.querySelector(".pass-in"),
generatBtn=document.querySelector(".gene-btn");
const chars={
    lowercase:"abcdefghijklmnopqrstuvwxyz",
    uppercase:"ABCDEFGHIJKLMNOPQRSTUVWXUZ",
    number:"0123456789",
symbols:"~!@#$%^&*()_+-}{[]<>.,?/';:|"
}
const generatePassword=()=>{
    let staticPassword="",
    randomPassword="",
    excdup=false,
    passLength=lengthSlider.value;
    options.forEach(options=> {
if(options.checked){
    if (options.id !=="exc-duplicate" && options.id !=="spaces") {
        staticPassword+=chars[options.id];
    }else if (options.id ==="spaces") {
        staticPassword+=`  ${staticPassword}  `;
    }else{
        excdup=true;
    }
   
}
    });
    for (let i = 0; i < passLength; i++) {
        let randomChar=staticPassword[Math.floor(Math.random() * staticPassword.length)] ;
  if (excdup) {
    !randomPassword.includes(randomChar) || randomChar== " " ? randomPassword +=randomChar:i--;
  }else{
    randomPassword+=randomChar;
  }
    }
 passwordinput.value=randomPassword;
} 
const updatepassin=()=>{
    passwordin.id=lengthSlider.value <=8 ?"weak":lengthSlider.value<=16 ? "medium":"strong";
}
const updateSlider=()=>{
    document.querySelector(".pass-len span").innerText= lengthSlider.value;
    generatePassword();
    updatepassin();
}
updateSlider();
const copypass=()=>{
    navigator.clipboard.writeText(passwordinput.value);
    copyicon.innerText="done";
    setTimeout(()=>{
        copyicon.innerText="file_copy";
    },1500);
}
copyicon.addEventListener("click" , copypass);
lengthSlider.addEventListener("input" , updateSlider);
generatBtn.addEventListener("click" , generatePassword);