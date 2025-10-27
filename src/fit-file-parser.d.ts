declare module "fit-file-parser" {
    class FitParser {
        constructor();
        parse(content: Buffer): any;
    }

    export = FitParser;
}
