let canvas = document.getElementById("areaDesenho")
let ctx = canvas.getContext("2d")

let torre
let game

function initTorre() {
	//montarTorre()
	//iniciar()
}

function montarTorre() {
	let inicio = document.getElementById("inicio").value
	let fim = document.getElementById("fim").value

	game = new Game(inicio, fim);
	document.getElementById("sequencia").innerHTML = game.getResult();

	torre = new Torre(ctx, 100, 450, 750, 250, game.qtdDisco, inicio);
	torre.desenhar();
}

function iniciar() {
	montarTorre();
	torre.calcularSequencia(document.getElementById("sequencia").innerText)
}

function insert(id) {
	const value = document.getElementById("select" + id).value
	document.getElementById(id).value = value;
	montarTorre();
}
