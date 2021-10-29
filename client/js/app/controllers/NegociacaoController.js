class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document);

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoesView')),
      'adiciona',
      'esvazia'
    );

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagemView')),
      'texto'
    );
    this._init();
  }

  _init() {
    ConnectionFactory.getConnection()
      .then((connection) => new NegociacaoDao(connection))
      .then((dao) => dao.listaTodos())
      .then((negociacoes) =>
        negociacoes
          .forEach((negociacao) => this._listaNegociacoes.adiciona(negociacao))
          .catch((erro) => {
            console.log(erro);
            this._mensagem.texto = error;
          })
      );

    setInterval(() => {
      this.importaNegociacoes();
    }, 3000);
  }

  adiciona(event) {
    event.preventDefault();

    let negociacao = this._criaNegociacao();

    new NegociacaoService()
      .cadastra(negociacao)
      .then((mensagem) => {
        this._listaNegociacoes.adiciona(negociacao);
        this._mensagem.texto = mensagem;
        this._limpaFormulario();
      })

      .catch((erro) => (this._mensagem.texto = erro));
  }

  importaNegociacoes() {
    let service = new NegociacaoService();

    Promise.all([
      service.obterNegociacoesDaSemana(),
      service.obterNegociacoesDaSemanaAnterior(),
      service.obterNegociacoesDaSemanaRetrasada(),
    ])
      .then((negociacoes) => {
        negociacoes
          .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
          .filter(
            (negociacao) =>
              !this._listaNegociacoes.negociacoes.some(
                (negociacaoExistente) =>
                  JSON.stringify(negociacao) ==
                  JSON.stringify(negociacaoExistente)
              )
          )
          .forEach((negociacao) => this._listaNegociacoes.adiciona(negociacao));
        this._mensagem.texto = 'Negociações do período importadas';
      })
      .catch((error) => (this._mensagem.texto = error));
  }

  apaga() {
    ConnectionFactory.getConnection()
      .then((connection) => new NegociacaoDao(connection))
      .then((dao) => dao.apagaTodos())
      .then((mensagem) => {
        this._mensagem.texto = mensagem;
        this._listaNegociacoes.esvazia();
      });
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    );
  }

  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;
    this._inputData.focus();
  }
}
