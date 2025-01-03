import { v4 as uuidv4 } from "uuid"

export const sessionId = uuidv4()
export const sessionHeaders = {
    "Session-ID": sessionId,
}