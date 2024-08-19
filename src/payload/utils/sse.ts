// import 'server-only'

type SSEConnection = {
  id: number
  writer: WritableStreamDefaultWriter
}

class ConnectionManager {
  private connections: SSEConnection[] = []
  private nextId: number = 1

  addConnection(writer: WritableStreamDefaultWriter): number {
    const id = this.nextId++
    this.connections.push({ id, writer })
    return id
  }

  removeConnection(id: number): void {
    this.connections = this.connections.filter((conn) => conn.id !== id)
  }

  sendEvent(data: any): void {
    // Accept any type of data
    const jsonData = JSON.stringify(data)
    this.connections.forEach((conn) => {
      conn.writer.write(`data: ${jsonData}\n\n`)
    })
  }
}

export const connectionManager = new ConnectionManager()
