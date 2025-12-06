const ouvirBotao = document
    .querySelector("#click-para-escutar")
        
ouvirBotao.addEventListener("click",Ouvir)

// Controles de tamanho de fonte
let tamanhoAtual = 16

const btnAumentar = document.querySelector("#btn-aumentar")
const btnDiminuir = document.querySelector("#btn-diminuir")
const spanTamanhoCorridor = document.querySelector("#tamanho-atual")
const textoDoBotao = document.querySelector("#texto-do-bot")
const textoDoUsuario = document.querySelector("#texto-do-usuario")

btnAumentar.addEventListener("click", aumentarTamanho)
btnDiminuir.addEventListener("click", diminuirTamanho)

function aumentarTamanho(){
    if(tamanhoAtual < 32) {
        tamanhoAtual += 2
        atualizarTamanho()
    }
}

function diminuirTamanho(){
    if(tamanhoAtual > 12) {
        tamanhoAtual -= 2
        atualizarTamanho()
    }
}

function atualizarTamanho(){
    textoDoBotao.style.fontSize = tamanhoAtual + "px"
    textoDoUsuario.style.fontSize = tamanhoAtual + "px"
    spanTamanhoCorridor.textContent = tamanhoAtual + "px"
}
// terminar  de escrever as respostas do bot
function responder (texto){
    const pergutas = ["bom dia","quantos anos eu tenho","qual a definicao de rn a termo","em relaçao ao periduo fertil da mulher qual data do ciclo menstrual ela esta mais propensa a engravidar?","os metodos anticoncepcionais sao seguros?"]
    const respostas = ["se hoje for antes de meio dia, bom dia ","oush, como vou saber, faz nem sentido","criança nascida entre 37 e 42 semanas de gestação ","no 14º dia do ciclo menstrual","os metodos anticonceptivos devem ser escolidos de forma correta, somente a camisinha oferece proteçao contra infecoes sexualmente transmissiveis"]
 
    for (let index = 0; index < pergutas.length; index++) {
        const element = pergutas[index];
        if(element.includes(texto)){
            return respostas[index]
        }
        
    }
    return "Nao entendi"

}

function configSpeechRecognition(){
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const reconhecer = new SpeechRecognition()
    reconhecer.lang = "pt-BR"
    return reconhecer
    
}

function ativarAnimacao (){
    ouvirBotao.classList.add("pulsando")
}

function desativarAnimacao(){
  ouvirBotao.classList.remove("pulsando")
  
}

function escreverUsuario(texto){
    document.querySelector("#texto-do-usuario").innerHTML = texto
}

function escreverBot (texto){
    document.querySelector("#texto-do-bot").innerHTML = texto

}

function Falar(texto){
    const discurso =  new SpeechSynthesisUtterance(texto)

    discurso.lang = "pt-BR"
    discurso.rate = 1
    window.speechSynthesis.speak(discurso)
    
}

function Ouvir (){
    const reconhecer = configSpeechRecognition()
    
    ativarAnimacao()

    reconhecer.start()

    reconhecer.onresult = function(e){
        const textoFalado = e.results[0][0].transcript.toLowerCase()
        const resposta = responder(textoFalado)

        desativarAnimacao()

        escreverUsuario(textoFalado)

        Falar(resposta)
        
        escreverBot(resposta)
        
    }
     
}



Falar("BOM ?")