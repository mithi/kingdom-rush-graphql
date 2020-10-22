import seed from "."
import { createConnection } from "typeorm"

async function main() {
    await createConnection()
    seed()
}

main()
