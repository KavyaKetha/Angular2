export class ParseLocation {
    constructor(file, offset, line, col) {
        this.file = file;
        this.offset = offset;
        this.line = line;
        this.col = col;
    }
    toString() { return `${this.file.url}@${this.line}:${this.col}`; }
}
export class ParseSourceFile {
    constructor(content, url) {
        this.content = content;
        this.url = url;
    }
}
export class ParseSourceSpan {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    toString() {
        return this.start.file.content.substring(this.start.offset, this.end.offset);
    }
}
export class ParseError {
    constructor(span, msg) {
        this.span = span;
        this.msg = msg;
    }
    toString() {
        var source = this.span.start.file.content;
        var ctxStart = this.span.start.offset;
        if (ctxStart > source.length - 1) {
            ctxStart = source.length - 1;
        }
        var ctxEnd = ctxStart;
        var ctxLen = 0;
        var ctxLines = 0;
        while (ctxLen < 100 && ctxStart > 0) {
            ctxStart--;
            ctxLen++;
            if (source[ctxStart] == "\n") {
                if (++ctxLines == 3) {
                    break;
                }
            }
        }
        ctxLen = 0;
        ctxLines = 0;
        while (ctxLen < 100 && ctxEnd < source.length - 1) {
            ctxEnd++;
            ctxLen++;
            if (source[ctxEnd] == "\n") {
                if (++ctxLines == 3) {
                    break;
                }
            }
        }
        let context = source.substring(ctxStart, this.span.start.offset) + '[ERROR ->]' +
            source.substring(this.span.start.offset, ctxEnd + 1);
        return `${this.msg} ("${context}"): ${this.span.start}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VfdXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtb1hETzRwMnYudG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci9wYXJzZV91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0UsWUFBbUIsSUFBcUIsRUFBUyxNQUFjLEVBQVMsSUFBWSxFQUNqRSxHQUFXO1FBRFgsU0FBSSxHQUFKLElBQUksQ0FBaUI7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNqRSxRQUFHLEdBQUgsR0FBRyxDQUFRO0lBQUcsQ0FBQztJQUVsQyxRQUFRLEtBQWEsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzVFLENBQUM7QUFFRDtJQUNFLFlBQW1CLE9BQWUsRUFBUyxHQUFXO1FBQW5DLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFRO0lBQUcsQ0FBQztBQUM1RCxDQUFDO0FBRUQ7SUFDRSxZQUFtQixLQUFvQixFQUFTLEdBQWtCO1FBQS9DLFVBQUssR0FBTCxLQUFLLENBQWU7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFlO0lBQUcsQ0FBQztJQUV0RSxRQUFRO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvRSxDQUFDO0FBQ0gsQ0FBQztBQUVEO0lBQ0UsWUFBbUIsSUFBcUIsRUFBUyxHQUFXO1FBQXpDLFNBQUksR0FBSixJQUFJLENBQWlCO1FBQVMsUUFBRyxHQUFILEdBQUcsQ0FBUTtJQUFHLENBQUM7SUFFaEUsUUFBUTtRQUNOLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDMUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFDRCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUM7UUFDdEIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLE9BQU8sTUFBTSxHQUFHLEdBQUcsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDcEMsUUFBUSxFQUFFLENBQUM7WUFDWCxNQUFNLEVBQUUsQ0FBQztZQUNULEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixFQUFFLENBQUMsQ0FBQyxFQUFFLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQixLQUFLLENBQUM7Z0JBQ1IsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBRUQsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNYLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixPQUFPLE1BQU0sR0FBRyxHQUFHLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDbEQsTUFBTSxFQUFFLENBQUM7WUFDVCxNQUFNLEVBQUUsQ0FBQztZQUNULEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixFQUFFLENBQUMsQ0FBQyxFQUFFLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQixLQUFLLENBQUM7Z0JBQ1IsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBRUQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsWUFBWTtZQUNqRSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFbkUsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsTUFBTSxPQUFPLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMxRCxDQUFDO0FBQ0gsQ0FBQztBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFBhcnNlTG9jYXRpb24ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZmlsZTogUGFyc2VTb3VyY2VGaWxlLCBwdWJsaWMgb2Zmc2V0OiBudW1iZXIsIHB1YmxpYyBsaW5lOiBudW1iZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyBjb2w6IG51bWJlcikge31cblxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gYCR7dGhpcy5maWxlLnVybH1AJHt0aGlzLmxpbmV9OiR7dGhpcy5jb2x9YDsgfVxufVxuXG5leHBvcnQgY2xhc3MgUGFyc2VTb3VyY2VGaWxlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGNvbnRlbnQ6IHN0cmluZywgcHVibGljIHVybDogc3RyaW5nKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgUGFyc2VTb3VyY2VTcGFuIHtcbiAgY29uc3RydWN0b3IocHVibGljIHN0YXJ0OiBQYXJzZUxvY2F0aW9uLCBwdWJsaWMgZW5kOiBQYXJzZUxvY2F0aW9uKSB7fVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc3RhcnQuZmlsZS5jb250ZW50LnN1YnN0cmluZyh0aGlzLnN0YXJ0Lm9mZnNldCwgdGhpcy5lbmQub2Zmc2V0KTtcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGFyc2VFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzcGFuOiBQYXJzZVNvdXJjZVNwYW4sIHB1YmxpYyBtc2c6IHN0cmluZykge31cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHZhciBzb3VyY2UgPSB0aGlzLnNwYW4uc3RhcnQuZmlsZS5jb250ZW50O1xuICAgIHZhciBjdHhTdGFydCA9IHRoaXMuc3Bhbi5zdGFydC5vZmZzZXQ7XG4gICAgaWYgKGN0eFN0YXJ0ID4gc291cmNlLmxlbmd0aCAtIDEpIHtcbiAgICAgIGN0eFN0YXJ0ID0gc291cmNlLmxlbmd0aCAtIDE7XG4gICAgfVxuICAgIHZhciBjdHhFbmQgPSBjdHhTdGFydDtcbiAgICB2YXIgY3R4TGVuID0gMDtcbiAgICB2YXIgY3R4TGluZXMgPSAwO1xuXG4gICAgd2hpbGUgKGN0eExlbiA8IDEwMCAmJiBjdHhTdGFydCA+IDApIHtcbiAgICAgIGN0eFN0YXJ0LS07XG4gICAgICBjdHhMZW4rKztcbiAgICAgIGlmIChzb3VyY2VbY3R4U3RhcnRdID09IFwiXFxuXCIpIHtcbiAgICAgICAgaWYgKCsrY3R4TGluZXMgPT0gMykge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY3R4TGVuID0gMDtcbiAgICBjdHhMaW5lcyA9IDA7XG4gICAgd2hpbGUgKGN0eExlbiA8IDEwMCAmJiBjdHhFbmQgPCBzb3VyY2UubGVuZ3RoIC0gMSkge1xuICAgICAgY3R4RW5kKys7XG4gICAgICBjdHhMZW4rKztcbiAgICAgIGlmIChzb3VyY2VbY3R4RW5kXSA9PSBcIlxcblwiKSB7XG4gICAgICAgIGlmICgrK2N0eExpbmVzID09IDMpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBjb250ZXh0ID0gc291cmNlLnN1YnN0cmluZyhjdHhTdGFydCwgdGhpcy5zcGFuLnN0YXJ0Lm9mZnNldCkgKyAnW0VSUk9SIC0+XScgK1xuICAgICAgICAgICAgICAgICAgc291cmNlLnN1YnN0cmluZyh0aGlzLnNwYW4uc3RhcnQub2Zmc2V0LCBjdHhFbmQgKyAxKTtcblxuICAgIHJldHVybiBgJHt0aGlzLm1zZ30gKFwiJHtjb250ZXh0fVwiKTogJHt0aGlzLnNwYW4uc3RhcnR9YDtcbiAgfVxufVxuIl19