class Grafo {

	constructor(qtdDiscos) {
		this.grafo = new Map();
		this.qtdDiscos = qtdDiscos;
		this.noBalance = null;
		this.construirGrafo();
	}

	construirGrafo() {
		const stackInicial = Array.from({ length: this.qtdDiscos }, (_, index) => index + 1);
		const stacks = [stackInicial, [], []];
		const posicaoRoot = new Posicao(null, stacks);
		const noRoot = new No(this, posicaoRoot)
		this.grafo.set(posicaoRoot.notacao, noRoot)
		noRoot.calcularProximasPosicoes();
		this.balanceGrafoByNotacao(posicaoRoot.notacao);
	}

	getNoByStacks(stacks) {
		const posicao = new Posicao(null, stacks);
		const posicaoGrafo = this.grafo.get(posicao.notacao);
		if (!posicaoGrafo) {
			const no = new No(this, posicao);
			this.grafo.set(posicao.notacao, no)
			return no;
		}
		return posicaoGrafo;
	}

	balanceGrafoByNotacao(notacao) {
		const noBalance = this.grafo.get(notacao);
		this.noBalance = noBalance;
		noBalance.distancia = 0;
		noBalance.arestas.forEach((n, m) => n.calculateDistanceByNo(m, noBalance));
	}

	getPatchByNotacao(notacao) {
		const movimentos = [];
		let noAnterior = this.grafo.get(notacao);

		while (noAnterior) {
			if (noAnterior.movimentoRealizado) movimentos.push(noAnterior.movimentoRealizado)
			noAnterior = noAnterior.noAnterior;
		}

		return movimentos.reverse().map(m => m + " ").reduce((v1, v2) => v1 + v2);
	}

	getGameByNotacao(notacao) {
		const result = this.getPatchByNotacao(notacao);
		return `${this.noBalance.posicao.notacao} -> ${notacao}: ${result}`
	}

	resetBalanceGrafo() {
		this.noBalance = null;
		this.grafo.values().foreach(n => n.resetBalance());
	}
}
