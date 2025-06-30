class Torre {
    constructor(ctx, x, y, largura, altura, qtdDiscos, posicaoInit) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.qtdDiscos = qtdDiscos
        this.largura = largura
        this.altura = altura
        this.alturaTopo = 150
        this.velocidade = 50

        this.base = new Base(ctx, x, y, largura, altura, this)

        this.hastes = new Array(3)
        this.construirHastes()

        this.discos = new Array(qtdDiscos)
        this.construirDiscos(posicaoInit)

        this.desenhar()
    }

    construirHastes() {
        let larguraTorre = this.largura*0.03
        let alturaTorre = this.altura*0.9
        let salto = this.largura/3
        let xTorre = salto/2 + this.x 
        let yTorre = this.y-alturaTorre

        this.hastes[0] = new Haste(this.ctx, xTorre - larguraTorre/2, yTorre, larguraTorre, alturaTorre, this, 0)
        this.hastes[1] = new Haste(this.ctx, xTorre + salto - larguraTorre/2, yTorre, larguraTorre, alturaTorre, this, 1)
        this.hastes[2] = new Haste(this.ctx, xTorre + salto*2 - larguraTorre/2, yTorre, larguraTorre, alturaTorre, this, 2)
    }

    construirDiscos(posicaoInit) {
        let coresDiscos = ["#FB333D","#F76B03","#FEFB0B","#42FF3A","#3E92FF"]
        let alturaDiscos = this.altura*0.14
        let larguraDiscoMenor = this.largura*0.1
        let saltodisco = larguraDiscoMenor/2

        let arrayHastes = []
        posicaoInit.split("|").slice(0,-1).forEach((h) => arrayHastes.push(h.split(":").reverse()))
        for(let h in arrayHastes) {
            for(let d in arrayHastes[h]) {
                let indexDisco = arrayHastes[h][d]-1
                if(indexDisco < 0) continue;
                let haste = this.hastes[h]
                let larguraDisco = larguraDiscoMenor + saltodisco*indexDisco
                this.discos[indexDisco] = new Disco(this.ctx, haste.centro - larguraDisco/2, haste.fundo - alturaDiscos, larguraDisco, alturaDiscos, coresDiscos[indexDisco], this, haste)
            }
        }
    }
    
    desenhar() {
        ctx.clearRect(0,0,960, 540)
        this.base.desenhar()
        for(let c in this.hastes) this.hastes[c].desenhar()
        for(let c in this.discos) this.discos[c].desenhar()
    }

    calcularSequencia(sequencia) {
        this.movimentos = sequencia.split(" ").filter((m) => m != '')
        this.index = 0
        this.movimentar()
    }

    movimentar() {
        if(this.index >= this.movimentos.length) return
        let m = this.movimentos[this.index]
        let indexDisco = m.charAt(0)-1
        let disco = this.discos[indexDisco]
        let hasteDestino = this.hastes[(disco.haste.indexHaste + (m.charAt(1) == 'D' ? 1 : 2))%3]
        disco.moverParaHaste(hasteDestino)
        this.index++
    }

}
