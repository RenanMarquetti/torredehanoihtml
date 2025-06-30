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
    }

    calcProximaInvercao() {
	let proximaInvercao = 0;
        let expoente = this.qtdDisco-1;
        while(proximaInvercao <= this.posicaoInicio.referencia) {
            proximaInvercao = proximaInvercao + Math.pow(2, expoente--);
        }
        return proximaInvercao;
    }

    getResult() {
	let result = "";

	while(this.m < this.posicaoFinal.referencia) { 
	    const mov = this.proximoMovimento();
	    result += mov+" ";
	}

	return result;
    }

    proximoMovimento() {
	let disco = this.m.toString(2).padStart(this.qtdDisco, "0").split("").reverse().indexOf("0") + 1;
        let direcao = disco % 2 != this.testador;
        let indexOrientacao = this.qtdDisco - disco;

        if(this.posicaoInicio.orientacao[indexOrientacao] != null && this.posicaoInicio.orientacao[indexOrientacao]) {
            direcao = !direcao;
            for(let c = indexOrientacao; c < this.qtdDisco; c++) this.posicaoInicio.orientacao[c] = !this.posicaoInicio.orientacao[c];
        }

        if(this.m+1 == this.proximaInvercao && indexOrientacao+1 < this.posicaoFinal.orientacao.length) {
            let i = indexOrientacao;
            let d = disco + 1;
            let b = null;

            do {
                i++;
                d--;
                b = this.posicaoFinal.orientacao[i];
            } while(b == null && i+1 < this.posicaoFinal.orientacao.length);

            if(b != null) {
                for(let c = indexOrientacao; c < this.qtdDisco; c++) {
		    this.posicaoInicio.orientacao[c] = this.posicaoFinal.orientacao[i];
                }
                this.proximaInvercao += Math.pow(2, d-2);
            }
        }

	this.m++;
        return disco.toString() + (direcao ? "D" : "E");
    }
}

