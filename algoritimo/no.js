class No {
	constructor(grafo, posicao) {
		this.grafo = grafo;
		this.posicao = posicao;
		this.arestas = new Map();

		this.calculouProximasPosicoes = false;
		this.distancia = Number.MAX_SAFE_INTEGER
		this.movimentoRealizado = null;
		this.noAnterior = null;
	}

	resetBalance() {
		this.distancia = Number.MAX_SAFE_INTEGER
		this.movimentoRealizado = null;
		this.noAnterior = null;
	}

	calculateDistanceByNo(movimentoRealizado, noAnterior) {
		if (noAnterior.distancia + 1 < this.distancia) {
			this.noAnterior = noAnterior;
			this.distancia = noAnterior.distancia + 1
			this.movimentoRealizado = movimentoRealizado;
			for (const aresta of this.arestas) {
				const movimento = aresta[0];
				const no = aresta[1];

				no.calculateDistanceByNo(movimento, this);
			}

		}
	}

	getLastDiscoByStack(stack) {
		return stack.length == 0 ? Number.MAX_SAFE_INTEGER : stack[0];
	}

	calcularProximasPosicoes() {
		if (this.calculouProximasPosicoes) return;

		const stacks = this.posicao.stacks;
		for (let x in stacks) {
			const stackInicial = stacks[x];
			const discoInicial = this.getLastDiscoByStack(stackInicial);

			const stackDireita = stacks[(x + 1) % 3]
			const discoDireita = this.getLastDiscoByStack(stackDireita);
			if (discoInicial < discoDireita) {
				const stacksClone = structuredClone(stacks);
				stacksClone[x] = stacksClone[x].slice(1);
				stacksClone[(x + 1) % 3] = [discoInicial, ...stacksClone[(x + 1) % 3]];

				const noResultante = this.grafo.getNoByStacks(stacksClone);
				const movimentoDireita = discoInicial + "D";
				this.arestas.set(movimentoDireita, noResultante);
			}

			const stackEsquerda = stacks[(x + 2) % 3]
			const discoEsquerda = this.getLastDiscoByStack(stackEsquerda);
			if (discoInicial < discoEsquerda) {
				const stacksClone = structuredClone(stacks);
				stacksClone[x] = stacksClone[x].slice(1);
				stacksClone[(x + 2) % 3] = [discoInicial, ...stacksClone[(x + 2) % 3]];

				const noResultante = this.grafo.getNoByStacks(stacksClone);
				const movimentoEsquerda = discoInicial + "E";
				this.arestas.set(movimentoEsquerda, noResultante);
			}

		}

		this.calculouProximasPosicoes = true;
		this.arestas.values().forEach(no => no.calcularProximasPosicoes());
	}
}
