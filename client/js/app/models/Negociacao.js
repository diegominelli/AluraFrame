class Negociacao {
  constructor(data, quantidade, valor) {
    this._data = data;
    this._quantidade = quantidade;
    this._valor = valor;
  }

  getVolume() {
    return this._quantidade * this._valor; // _ significa que a propriedade de uma classe não podem ser modificadas.
  }

  getData() {
    return this._data;
  }

  getQuantidade() {
    return this._quantidade;
  }

  getValor() {
    return this._valor;
  }
}
