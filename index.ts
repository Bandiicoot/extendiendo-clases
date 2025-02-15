import * as fs from "fs";
import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderBy";

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    // nombre de esta lista
    this.name = name;
  }
  add(nuevaCosa) {
    this.cosas.push(nuevaCosa);
  }
  getCosas() {
    return this.cosas;
  }
}

class Product {
  name: string;
  price: number;
  id: number;
  constructor(name: string, price: number, id: number) {
    this.name = name;
    this.price = price;
    this.id = id;
  }
}

class ListaDeProductos extends ListaDeCosas {
  constructor(name: string) {
    super(name);
    const leerArchivo = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const paresearArchivo = JSON.parse(leerArchivo);
    paresearArchivo.forEach((element) => {
      this.addProduct(element);
    });
  }

  addProduct(product: Product) {
    return this.add(product);
  }
  getProduct(id: number) {
    return this.cosas.find((r) => r.id == id);
  }
  removeProduct(id: number) {
    return remove(this.cosas, (r) => r.id == id);
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
