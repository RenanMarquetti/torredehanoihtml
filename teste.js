const testPosicoes = (posicoes, results, grafoGame) => {
	const errors = [];
	for (let x = 0; x < posicoes.length; x++) {
		for (let y = 0; y < posicoes.length; y++) {
			const posicaoInicial = posicoes[x];
			const posicaoFinal = posicoes[y];
			const game = new Game(posicoes[x], posicoes[y]);
			const res = game.getResult().trim();
			const expect = results.get(posicoes[x] + posicoes[y]);
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
					continue;
				}
				errors.push({ game: notacao, isCorrectLength, expect, res, isCorrectPosicaoFinal, posicaoFinal, posicaoFinalByPath });

			};
		}
	}

	return errors;
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

