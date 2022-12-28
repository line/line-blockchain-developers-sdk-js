export class DenomAmount {
    constructor(
        readonly amount: string,
        readonly denomination: string,
    ) { }

    public static create(obj: any): DenomAmount {
        return new DenomAmount(
            obj["amount"],
            obj["denom"] ?? obj["denomination"]
        )
    }
}