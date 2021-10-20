class Negociacao {
  constructor(data, quantidade, valor) {
    this._data = data;
    this._quantidade = quantidade;
    this._valor = valor;
    Object.freeze(this);
  }

  get volume() {
    return this._quantidade * this._valor; // _ significa que a propriedade de uma classe não podem ser modificadas.
  }

  get data() {
    return this._data;
  }

  get quantidade() {
    return this._quantidade;
  }

  get valor() {
    return this._valor;
  }
}
