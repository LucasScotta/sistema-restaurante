/*
    El sistema consiste en que un mesero pueda cargar el pedido de un comensal.
    En un inicio elige la mesa, seguido el pedido del cliente (producto/precio), por cada producto
    que eliga el mesero se le va a agregar al carrito y se le va a mostrar el precio final
    generado a medida que se suman los productos (en el momento).
    Una vez finalizado se envia el pedido y se bloquea la mesa para que no pueda ser "re-abierta", aun
    asi se le van a poder sumar mas productos.
*/

import { System } from "./class/System.class";

const system = new System(6)

console.log(system)