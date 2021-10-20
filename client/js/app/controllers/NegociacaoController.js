class NegociacaoController {
  adiciona(event) {
    event.preventDefault();
    let $ = document.querySelector.bind(document); // .bind(document) para o querySelector se referenciar pelo document.
    let inputData = $('#data');
    let inputQuantidade = $('#quantidade');
    let inputValor = $('#valor');

    console.log(inputData.value);
    console.log(inputQuantidade.value);
    console.log(inputValor.value);
  }
}
