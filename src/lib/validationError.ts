
export class ValidationError extends Error {

    target!: unknown
    properties!: string[]

    constructor(message: string) {
        super(message)
    }
}


