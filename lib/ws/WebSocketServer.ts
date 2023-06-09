import { Server } from 'http'
import { Socket, Server as SocketServer } from 'socket.io'
import { IO_PORT } from '../config'
import { ExtendedError } from 'socket.io/dist/namespace'
import { getTableById, getTables, addProduct } from '../Store'
import { } from '../Store'
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
        return io
    }
    private getIO = () => this.io
    private setConnection(socket: Socket, next: SocketNextCB, map: MapConnections) {
        if (!!map.get(socket.id)) return next()
        map.set(socket.id, {
            socket, timeout: setTimeout(() => {
                map.delete(socket.id)
                socket.disconnect
            }, 10000)
        })
        return next()
    }
    private onConnect(socket: Socket, map: MapConnections) {
        socket
            .on('auth', (id: number) => {
                const sendTables = () => socket.emit('tables', getTables())
                if (id < 1) socket.disconnect()
                const conn = map.get(socket.id)
                if (!conn) return socket.disconnect()
                clearInterval(conn.timeout)
                socket
                    .on('order', (id: number, products: IProduct[]) => {
                        const table = getTableById(id)
                        if (!table) return
                        products.forEach(product => addProduct(id, product))
                        sendTables()
                    })
                    .on('ping', () => sendTables())
                    .emit('tables', getTables())
            })
            .on('diconnect', (s) => this.onDisconnect(s, map))
    }
    private onDisconnect(socket: Socket, map: MapConnections) {
        map.delete(socket.id)
        socket.disconnect()
    }
}
