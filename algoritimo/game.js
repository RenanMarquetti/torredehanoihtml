class Game {
	constructor(inicio, fim) {

		this.posicaoInicio = new PosicaoTorre(inicio);
		this.posicaoFinal = new PosicaoTorre(fim);

		this.posicaoInicio.calcValuePosicao(this.posicaoFinal, "INICIAL");
		this.posicaoFinal.calcValuePosicao(this.posicaoInicio, "FINAL");

		this.qtdDisco = this.posicaoInicio.qtdDiscos;
		this.testador = this.posicaoInicio.testador;
		this.m = this.posicaoInicio.referencia;
		this.proximaInvercao = this.calcProximaInvercao();

		console.log({ game: this })
		console.log({ orientacaoPosicaoInicio: [...this.posicaoInicio.orientacao] })
		console.log({ orientacaoPosicaoFinal: [...this.posicaoFinal.orientacao] })
		// Object.freeze(this.posicaoInicio.orientacao);
	}

	calcProximaInvercao() {
		let proximaInvercao = 0;
		let expoente = this.qtdDisco - 1;
		while (proximaInvercao <= this.posicaoInicio.referencia) {
			proximaInvercao = proximaInvercao + Math.pow(2, expoente--);
		}
		return proximaInvercao;
	}

	getResult() {
		let result = "";

		while (this.m < this.posicaoFinal.referencia) {
			const mov = this.proximoMovimento();
			result += mov + " ";
		}

		return result;
	}

	proximoMovimento() {
		let disco = this.m.toString(2).padStart(this.qtdDisco, "0").split("").reverse().indexOf("0") + 1;
		let direcao = disco % 2 != this.testador;
		let indexOrientacao = this.qtdDisco - disco;
		console.log({ disco, testador: this.testador, direcao });
		const orientacaoInicial = [...this.posicaoInicio.orientacao];

		console.log({ indexOrientacao, "orientacaoInicial[indexOrientacao]": orientacaoInicial[indexOrientacao] })

		if (orientacaoInicial[indexOrientacao] != null && orientacaoInicial[indexOrientacao]) {
			console.log("invertendo direção: ");
			direcao = !direcao;
			console.log({ direcao })
			for (let c = indexOrientacao; c < this.qtdDisco; c++) this.posicaoInicio.orientacao[c] = !this.posicaoInicio.orientacao[c];
		}

		console.log({ m: this.m, proximaInvercao: this.proximaInvercao, indexOrientacao, 'this.posicaoFinal.orientacao.length': this.posicaoFinal.orientacao.length, "this.m + 1 == this.proximaInvercao && indexOrientacao + 1 < this.posicaoFinal.orientacao.length": this.m + 1 == this.proximaInvercao && indexOrientacao + 1 < this.posicaoFinal.orientacao.length })
		if (this.m + 1 == this.proximaInvercao && indexOrientacao + 1 < this.posicaoFinal.orientacao.length) {
			let i = indexOrientacao;
			let d = disco + 1;
			let b = null;

			do {
				i++;
				d--;
				b = this.posicaoFinal.orientacao[i];
			} while (b == null && i + 1 < this.posicaoFinal.orientacao.length);

			if (b != null) {
				console.log({ b, indexOrientacao, qtdDisco: this.qtdDisco })
				for (let c = indexOrientacao; c < this.qtdDisco; c++) {
					this.posicaoInicio.orientacao[c] = this.posicaoFinal.orientacao[i];
				}
				this.proximaInvercao += Math.pow(2, d - 2);
			}
		}

		this.m++;
		console.log(disco.toString() + (direcao ? "D" : "E"))
		return disco.toString() + (direcao ? "D" : "E");
	}
}

