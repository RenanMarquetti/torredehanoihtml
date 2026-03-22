const testPosicoes = (posicoes, results, grafoGame) => {
	const errors = [];
	for (let x = 0; x < posicoes.length; x++) {
		for (let y = 0; y < posicoes.length; y++) {
			const posicaoInicial = posicoes[x];
			const posicaoFinal = posicoes[y];

			const result = testPosicao(posicaoInicial, posicaoFinal, results, grafoGame);
			if (result) errors.push(result);
		}
	}

	return errors;
}

const testPosicao = (posicaoInicial, posicaoFinal, results, grafoGame) => {
	const game = new Game(posicaoInicial, posicaoFinal);
	const res = game.getResult().trim();
	const expect = results.get(posicaoInicial + posicaoFinal);
	const notacao = posicaoInicial + " -> " + posicaoFinal;
	if (res != expect) {

		const resLength = res.split(" ").length
		const expectLength = expect.split(" ").length
		const isCorrectLength = resLength == expectLength;

		//console.log({ resLength, expectLength });

		const posicaoFinalByPath = grafoGame.getPosicaoByPath(posicaoInicial, res).notacao;
		const isCorrectPosicaoFinal = posicaoFinalByPath === posicaoFinal;

		// console.log({ posicaoFinalByPath, isCorrectPosicaoFinal })

		if (isCorrectLength && isCorrectPosicaoFinal) {
			return null;
		}

		return { game: notacao, isCorrectLength, expect, res, isCorrectPosicaoFinal, posicaoFinal, posicaoFinalByPath };
	}
}

const testGrafo = (qtdDisco = 1, lambdaFilter = (e) => true) => {
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

	const errors = testPosicoes(posicoes, results, grafoGame).filter(lambdaFilter);
	console.log(errors);

}

const testGrafoByGame = (qtdDisco = 1, notacaoGame) => {
	const game = notacaoGame.split(" ");
	const init = game[0]
	const fim = game[2]

	console.log({ game, init, fim });

	const grafoGame = new Grafo(qtdDisco);

	let results = new Map();

	grafoGame.resetBalanceGrafo();
	grafoGame.balanceGrafoByNotacao(init)
	results.set(init + fim, grafoGame.getPatchByNotacao(fim).trim());
	console.log({ results });

	const errors = testPosicao(init, fim, results, grafoGame);
	console.log(errors);
}

