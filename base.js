class Base {
    constructor(ctx, x, y, largura, altura, torre) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.largura = largura
        this.altura = altura*0.1
        this.torre = torre
        this.cor = "#863B04"
    }

    desenhar() {
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}