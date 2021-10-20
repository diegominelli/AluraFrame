class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document); // .bind(document) para o querySelector se referenciar pelo document.
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
  }
  adiciona(event) {
    event.preventDefault();

    let data = new Date(this._inputData.value.replace(/-/g, ','));
    console.log(data);
  }
}
