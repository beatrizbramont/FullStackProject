function bloquearHome(){
    const homeLink = document.getElementById("home")
    homeLink.addEventListener('click', function(event){
        event.preventDefault()
        alert("⚠️ Para acessar é necessário estar logado")
    })
}

bloquearHome()