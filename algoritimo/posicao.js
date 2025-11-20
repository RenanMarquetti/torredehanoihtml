class Posicao {

	constructor(notacao, stacks) {

		this.stacks = stacks || [[], [], []];
		this.notacao = notacao;

		if (stacks) {
			this.montarNotacaoByStack()
		}

		if (notacao) {
			this.montarPosicaoByNotacao();
		}
	}

	getQtdDiscos() {
		return this.stacks.map(s => s.length).reduce((v1, v2) => v1 + v2);
	}

	notacaoByStack(stack) {
		const notacaoStack = stack.length == 0 ? "0:" : stack.map(d => d.toString() + ":").reduce((d1, d2) => d1 + d2);
		return notacaoStack.slice(0, -1) + "|";
	}

	montarNotacaoByStack() {
		const notacaoStack0 = this.notacaoByStack(this.stacks[0]);
		const notacaoStack1 = this.notacaoByStack(this.stacks[1]);
		const notacaoStack2 = this.notacaoByStack(this.stacks[2]);
		this.notacao = notacaoStack0 + notacaoStack1 + notacaoStack2
	}

	montarPosicaoByNotacao() {
		let values = this.notacao.split("|").slice(0, 3);
		for (let x = 0; x < values.length; x++) {
			let discos = values[x].split(":");
			for (let y = discos.length - 1; y >= 0; y--) if (discos[y] != "0") {
				this.stacks[x].push(Number.parseInt(discos[y]));
			}
		}
	}

	getPosicaoDisco(disco) {
		let pilha = 0;

		while (pilha < 3) {
			let isPilha = this.stacks[pilha].includes(disco);
			if (isPilha) break;
			else pilha++;
		}

		let altura = this.stacks[pilha].indexOf(disco);

		return { pilha, altura };
	}

}
