declare module "fit-file-parser" {
    class FitParser {
        constructor();
        parse(
            content: Buffer,
            callback: (error: Error | null, data: unknown) => void
        ): void;
    }

    export = FitParser;
}
