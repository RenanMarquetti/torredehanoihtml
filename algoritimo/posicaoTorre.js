class PosicaoTorre {

	constructor(notacao) {
		this.notacao = notacao;
		this.tipo;
		this.stacks = [[], [], []];
		this.montarPosicaoByNotacao();

		this.qtdDiscos = this.stacks.map(s => s.length).reduce((v1, v2) => v1 + v2);
		this.testador = this.qtdDiscos % 2;
		this.referencia = 0;
		this.orientacao;
		this.base;
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

	calcValuePosicao(posicao, tipo) {
		this.tipo = tipo;
		let values = { base: new Array(this.qtdDiscos).fill(null), orientacao: new Array(this.qtdDiscos).fill(null) };

		let pilhaInicial = null;
		let pilhaFinal = null;
		let posicaoAposMovimentoNatural = null;

		let discoAnteriorFinal = null;
		let discoAtualInicial = null;
		let discoAtualFinal = null;
		let isDefinirBase = true;

		let hasteOrigemAnterior = 0;
		let manter = false;

		for (let discoAnalisado = this.qtdDiscos; discoAnalisado > 0; discoAnalisado--) {

			if (tipo == "INICIAL") {

				discoAtualInicial = this.getPosicaoDisco(discoAnalisado);
				discoAtualFinal = posicao.getPosicaoDisco(discoAnalisado);

				pilhaFinal = isDefinirBase ? discoAtualFinal.pilha : values.base[discoAnalisado] ? pilhaFinal : 3 - pilhaInicial - pilhaFinal;
				pilhaInicial = discoAtualInicial.pilha;
				values.base[discoAnalisado - 1] = pilhaInicial == pilhaFinal;
				// console.log({discoAnalisado, base: values.base[discoAnalisado-1], pilhaInicial, pilhaFinal, isBase: pilhaInicial == pilhaFinal})

				if (isDefinirBase) {
					this.testador = discoAnalisado % 2;
					isDefinirBase = values.base[discoAnalisado - 1] && discoAtualInicial.pilha == discoAtualFinal.pilha && discoAtualInicial.altura == discoAtualFinal.altura;
				}
				// console.log({isDefinirBase})

			} else {

				discoAtualInicial = posicao.getPosicaoDisco(discoAnalisado);
				discoAtualFinal = this.getPosicaoDisco(discoAnalisado);

				if (isDefinirBase) {
					values.base[discoAnalisado - 1] = true;
					pilhaInicial = discoAtualInicial.pilha;
					pilhaFinal = discoAtualFinal.pilha;
					this.testador = discoAnalisado % 2;
					discoAnteriorFinal = null;
					isDefinirBase = pilhaInicial == pilhaFinal;
				} else {
					let colunaIntermediaria = 3 - pilhaInicial - pilhaFinal;
					values.base[discoAnalisado - 1] = discoAtualFinal.pilha != colunaIntermediaria;
					if (values.base[discoAnalisado - 1]) {
						pilhaInicial = 3 - pilhaInicial - pilhaFinal;
						pilhaFinal = discoAtualFinal.pilha;
					}

				}

			}

			posicaoAposMovimentoNatural = (pilhaInicial + (discoAnalisado % 2 == this.testador ? 2 : 1)) % 3;

			if (tipo == "INICIAL") {
				console.log({ discoAnalisado, pilhaFinal, "pilhaInicial != pilhaFinal": pilhaInicial != pilhaFinal, posicaoAposMovimentoNatural, pilhaFinal, "posicaoAposMovimentoNatural != pilhaFinal": posicaoAposMovimentoNatural != pilhaFinal })
				values.orientacao[discoAnalisado - 1] = pilhaInicial != pilhaFinal && posicaoAposMovimentoNatural != pilhaFinal;
			} else {
				let hasteOrigem;
				let hasteAposMovimento;
				let hasteFinal;

				console.log({ discoAnteriorFinal })
				if (discoAnteriorFinal == null) {

					hasteOrigem = discoAtualInicial.pilha;
					hasteAposMovimento = (hasteOrigem + (discoAnalisado % 2 == this.testador ? 2 : 1)) % 3;
					hasteFinal = discoAtualFinal.pilha;
				} else {
					hasteOrigem = manter ? hasteOrigemAnterior : 3 - discoAnteriorFinal.pilha - hasteOrigemAnterior;
					console.log({ discoAnalisado, testador: this.testador, "(discoAnalisado % 2 == this.testador ? 2 : 1)": (discoAnalisado % 2 == this.testador ? 2 : 1), "hasteOrigem + (discoAnalisado % 2 == this.testador ? 2 : 1)": hasteOrigem + (discoAnalisado % 2 == this.testador ? 2 : 1) })
					hasteAposMovimento = (hasteOrigem + (discoAnalisado % 2 == this.testador ? 2 : 1)) % 3;
					hasteFinal = discoAtualFinal.pilha;

				}

				manter = hasteFinal == hasteOrigem;
				console.log({ discoAnalisado, hasteOrigem, manter, hasteAposMovimento, hasteFinal });
				values.orientacao[discoAnalisado - 1] = manter ? null : hasteAposMovimento != hasteFinal;

				discoAnteriorFinal = discoAtualFinal;
				hasteOrigemAnterior = hasteOrigem;
			}

		}

		this.orientacao = [...values.orientacao.reverse()];
		this.base = [...values.base.reverse()];

		for (let i = 0; i < this.base.length; ++i) {
			this.referencia = this.referencia * 2 + (this.base[i] ? 1 : 0);
		}
		//console.log({ posicao: this.notacao, tipo, posicaoFuncao: posicao.notacao, orientacao: [...this.orientacao], base: this.base, referencia: this.referencia });
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
