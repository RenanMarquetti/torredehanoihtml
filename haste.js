class Haste {
    constructor(ctx, x, y, largura, altura, torre, indexHaste) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.largura = largura
        this.altura = altura
        this.centro = x + largura/2
        this.fundo = torre.y
        this.torre = torre
        this.indexHaste = indexHaste
        this.cor = "#959595"
    }

    desenhar() {
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}