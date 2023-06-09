import { Server } from 'http'
import { Socket, Server as SocketServer } from 'socket.io'
import { IO_PORT } from '../config'
import { ExtendedError } from 'socket.io/dist/namespace'
import { getTableById, getTables, addProduct, getProducts, store } from '../Store'
import { IProduct } from '../Store/models'

type MapConnections = Map<string, { socket: Socket, timeout: NodeJS.Timeout }>
type SocketNextCB = (err?: ExtendedError | undefined) => void

export class WebSocketServer {
    private io: SocketServer
    private connections: MapConnections = new Map()
    constructor(httpServer: Server) {
        this.io = new SocketServer(httpServer, { cors: { origin: '*', allowedHeaders: 'id' } })
        this.init()
    }
    private init() {
        const io = this.getIO()
        const { setConnection, onConnect, connections } = this
        io.use((s, n) => setConnection(s, n, connections))
        io.on('connection', (s) => onConnect(s, connections))
        io.listen(IO_PORT)
        store.on('update', () => {
            io.emit('update', { products: getProducts(), tables: getTables() })
        })
        return io
    }
    private getIO = () => this.io
    private setConnection(socket: Socket, next: SocketNextCB, map: MapConnections) {
        if (!!map.get(socket.id)) return next()
        map.set(socket.id, {
            socket, timeout: setTimeout(() => {
                map.delete(socket.id)
                return socket.disconnect
            }, 10000)
        })
        return next()
    }
    private onConnect(socket: Socket, map: MapConnections) {
        const sendData = () => socket.emit('update', { products: getProducts(), tables: getTables() })
        socket
            .on('auth', (id: number) => {
                if (id < 1) {
                    map.delete(socket.id)
                    return socket.disconnect()
                }
                const conn = map.get(socket.id)
                if (!conn) return socket.disconnect()
                clearInterval(conn.timeout)
                socket
                    .on('order', (id: number, products: IProduct[]) => {
                        const table = getTableById(id)
                        if (!table) return
                        products.forEach(product => addProduct(id, product))
                        sendData()
                    })
                    .on('ping', () => sendData())
                sendData()
            })
            .on('diconnect', (s) => this.onDisconnect(s, map))
    }
    private onDisconnect(socket: Socket, map: MapConnections) {
        map.delete(socket.id)
        return socket.disconnect()
    }
}
