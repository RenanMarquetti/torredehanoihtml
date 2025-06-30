class Disco {
    constructor(ctx, x, y, largura, altura, cor, torre, haste) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.largura = largura
        this.altura = altura
        this.centro = x + largura/2
        this.cor = cor
        this.torre = torre
        haste.fundo -= altura
        this.haste = haste
    }

    moverParaTopo(hasteDestino, topo) {
        const f=() => {
            let dif = this.y - topo
            this.y -= dif < this.torre.velocidade ? dif : this.torre.velocidade
            this.torre.desenhar()
            this.moverParaTopo(hasteDestino, topo);
        }

        if(topo < this.y) requestAnimationFrame(f)
        else this.moverParaLateral(hasteDestino, hasteDestino.centro)
    }

    moverParaLateral(hasteDestino, eixo) {
        const f=() => {
            let isDireita = this.centro < eixo
            let dif = Math.max(this.centro, eixo) - Math.min(this.centro, eixo)
            let passo = dif < this.torre.velocidade ? dif : this.torre.velocidade
            if(isDireita) this.x += passo
            else this.x -= passo
            this.centro = this.x + this.largura/2
            this.torre.desenhar()
            this.moverParaLateral(hasteDestino, eixo);
        }

        if(eixo != this.centro) requestAnimationFrame(f) 
        else this.moverParaBaixo(hasteDestino, hasteDestino.fundo)
    }

    moverParaBaixo(hasteDestino, fundo) {
        const f=() => {
            let dif = fundo - this.altura - this.y
            this.y += dif < this.torre.velocidade ? dif : this.torre.velocidade
            this.torre.desenhar()
            this.moverParaBaixo(hasteDestino, fundo);
        }
        
        if(fundo - this.altura > this.y) requestAnimationFrame(f)
        else this.trocarHastePara(hasteDestino)
    }

    trocarHastePara(novaHaste) {
        this.haste.fundo += this.altura
        novaHaste.fundo -= this.altura
        this.haste = novaHaste
        this.torre.movimentar()
    }

    moverParaHaste(hasteDestino) {
        if(this.haste.x == hasteDestino.x) return
        this.moverParaTopo(hasteDestino, this.torre.alturaTopo)
    }

    desenhar() {
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}