const testPosicoes = (posicoes, results) => {
	for (let x = 0; x < posicoes.length; x++) {
		for (let y = 0; y < posicoes.length; y++) {
			const posicaoInicial = posicoes[x];
			const posicaoFinal = posicoes[y];
			const game = new Game(posicoes[x], posicoes[y]);
			const res = game.getResult().trim();
			const expect = results.get(posicoes[x] + posicoes[y]);
			const notacao = posicaoInicial + " -> " + posicaoFinal;
			if (res != expect) console.log({ game: notacao, expect, res });
		}
	}
}

const teste1 = () => {
	let posicoes = ["1|0|0|", "0|1|0|", "0|0|1|"];

	let results = new Map();
	results.set(posicoes[0] + posicoes[0], "");
	results.set(posicoes[0] + posicoes[1], "1D");
	results.set(posicoes[0] + posicoes[2], "1E");
	results.set(posicoes[1] + posicoes[0], "1E");
	results.set(posicoes[1] + posicoes[1], "");
	results.set(posicoes[1] + posicoes[2], "1D");
	results.set(posicoes[2] + posicoes[0], "1D");
	results.set(posicoes[2] + posicoes[1], "1E");
	results.set(posicoes[2] + posicoes[2], "");

	console.log({ posicoes, results });
	testPosicoes(posicoes, results);
}

const teste2 = () => {
	let posicoes = [
		"1:2|0|0|", "2|1|0|", "2|0|1|",
		"1|2|0|", "0|1:2|0|", "0|2|1|",
		"1|0|2|", "0|1|2|", "0|0|1:2|"
	];

	let results = new Map();
	results.set(posicoes[0] + posicoes[0], "");
	results.set(posicoes[0] + posicoes[1], "1D");
	results.set(posicoes[0] + posicoes[2], "1E");

	results.set(posicoes[0] + posicoes[3], "1E 2D 1D");
	results.set(posicoes[0] + posicoes[4], "1E 2D 1E");
	results.set(posicoes[0] + posicoes[5], "1E 2D");

	results.set(posicoes[0] + posicoes[6], "1D 2E 1E");
	results.set(posicoes[0] + posicoes[7], "1D 2E");
	results.set(posicoes[0] + posicoes[8], "1D 2E 1D");





	/*
	results.set(posicoes[1]+posicoes[0], "1E");
	results.set(posicoes[1]+posicoes[1], "");
	results.set(posicoes[1]+posicoes[2], "1D");
	results.set(posicoes[2]+posicoes[0], "1D");
	results.set(posicoes[2]+posicoes[1], "1E");
	results.set(posicoes[2]+posicoes[2], "");
    */
	testPosicoes(posicoes, results);
}

const testGrafo = (qtdDisco = 1) => {
	const grafoGame = new Grafo(qtdDisco);
	const posicoes = [...grafoGame.grafo.keys()];

	let results = new Map();

	for (const init of posicoes) {
		grafoGame.resetBalanceGrafo();
		grafoGame.balanceGrafoByNotacao(init)
		for (const fim of posicoes) {
			results.set(init + fim, grafoGame.getPatchByNotacao(fim).trim());
		}
	}

	testPosicoes(posicoes, results);
}

