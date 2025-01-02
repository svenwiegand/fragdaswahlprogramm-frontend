export type LineParser = (line: string) => string

export type Replacer = (match: string, captureGroup: string[]) => string

export type RegexLineParserSpec = {
    regex: RegExp
    replacer: Replacer
}

export function regexLineParser({regex, replacer}: RegexLineParserSpec): LineParser {
    const rawReplacer = (match: string, ...args: unknown[]): string => {
        const argsToSkip = typeof args[args.length - 1] === "object" ? 3 : 2
        const relevantArgs = args.slice(0, -argsToSkip)
        return replacer(match, relevantArgs as string[])
    }
    return (line: string) => line.replace(regex, rawReplacer)
}

function lineParserArray(...parsers: LineParser[]): LineParser {
    return (line: string) => parsers.reduce((line, parser) => parser(line), line)
}

function nopParser(line: string): string {
    return line
}

export class StreamingText {
    private incompleteLine: string = ""
    private text: string = ""
    private readonly parser: LineParser

    constructor(...parsers: LineParser[]) {
        this.parser = parsers.length > 0 ? lineParserArray(...parsers) : nopParser
    }

    getText(): string {
        return this.text
    }

    push(chars: string): string {
        const lines = (this.incompleteLine + chars).split("\n")
        this.incompleteLine = lines.pop() || ""
        const newCompletedText = lines.map(this.parser).join("\n")
        if (newCompletedText) {
            this.text += "\n" + newCompletedText
        }
        return this.text
    }

    finalize(): string {
        const parsedRest = this.parser(this.incompleteLine)
        if (parsedRest) {
            this.text += "\n" + parsedRest
        }
        return this.text
    }
}
