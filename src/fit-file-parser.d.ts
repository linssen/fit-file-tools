declare module "fit-file-parser" {
    class FitParser {
        constructor();
        parse(content: Buffer): unknown;
    }

    export = FitParser;
}
