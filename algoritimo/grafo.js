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
		this.noBalance.distancia = 0;
		for (const aresta of this.noBalance.arestas) {
			const movimento = aresta[0];
			const no = aresta[1];

			no.calculateDistanceByNo(movimento, this.noBalance);
		}
	}

	getPatchByNotacao(notacao) {
		const movimentos = [];
		let noAnterior = this.grafo.get(notacao);

		while (noAnterior) {
			if (noAnterior.movimentoRealizado) {
				movimentos.push(noAnterior.movimentoRealizado)
			}
			noAnterior = noAnterior.noAnterior;
		}

		if (movimentos.length == 0) {
			return '';
		}

		return movimentos.reverse().map(m => m + " ").reduce((v1, v2) => v1 + v2);
	}

	getGameByNotacao(notacao) {
		const result = this.getPatchByNotacao(notacao);
		return `${this.noBalance.posicao.notacao} -> ${notacao}: ${result}`
	}

	resetBalanceGrafo() {
		this.noBalance = null;
		const values = this.grafo.values();
		for (const value of values) {
			value.resetBalance();
		}
	}

	caminhe(no, path, index) {
		// console.log({ no, path, "path.length": path.length, index, "index == path.length": index == path.length })
		if (index == path.length) return no;

		const noAfter = no.arestas.get(path[index]);
		index++
		return this.caminhe(noAfter, path, index);

	}

	getPosicaoByPath(notacaoInicio, path) {
		const noInicio = this.grafo.get(notacaoInicio);
		const pathArray = path.split(" ");
		// console.log({ noInicio, pathArray })
		return this.caminhe(noInicio, pathArray, 0).posicao;
	}
}
