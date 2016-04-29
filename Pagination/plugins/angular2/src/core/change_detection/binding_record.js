'use strict';"use strict";
var lang_1 = require('angular2/src/facade/lang');
var DIRECTIVE_LIFECYCLE = "directiveLifecycle";
var BINDING = "native";
var DIRECTIVE = "directive";
var ELEMENT_PROPERTY = "elementProperty";
var ELEMENT_ATTRIBUTE = "elementAttribute";
var ELEMENT_CLASS = "elementClass";
var ELEMENT_STYLE = "elementStyle";
var TEXT_NODE = "textNode";
var EVENT = "event";
var HOST_EVENT = "hostEvent";
var BindingTarget = (function () {
    function BindingTarget(mode, elementIndex, name, unit, debug) {
        this.mode = mode;
        this.elementIndex = elementIndex;
        this.name = name;
        this.unit = unit;
        this.debug = debug;
    }
    BindingTarget.prototype.isDirective = function () { return this.mode === DIRECTIVE; };
    BindingTarget.prototype.isElementProperty = function () { return this.mode === ELEMENT_PROPERTY; };
    BindingTarget.prototype.isElementAttribute = function () { return this.mode === ELEMENT_ATTRIBUTE; };
    BindingTarget.prototype.isElementClass = function () { return this.mode === ELEMENT_CLASS; };
    BindingTarget.prototype.isElementStyle = function () { return this.mode === ELEMENT_STYLE; };
    BindingTarget.prototype.isTextNode = function () { return this.mode === TEXT_NODE; };
    return BindingTarget;
}());
exports.BindingTarget = BindingTarget;
var BindingRecord = (function () {
    function BindingRecord(mode, target, implicitReceiver, ast, setter, lifecycleEvent, directiveRecord) {
        this.mode = mode;
        this.target = target;
        this.implicitReceiver = implicitReceiver;
        this.ast = ast;
        this.setter = setter;
        this.lifecycleEvent = lifecycleEvent;
        this.directiveRecord = directiveRecord;
    }
    BindingRecord.prototype.isDirectiveLifecycle = function () { return this.mode === DIRECTIVE_LIFECYCLE; };
    BindingRecord.prototype.callOnChanges = function () {
        return lang_1.isPresent(this.directiveRecord) && this.directiveRecord.callOnChanges;
    };
    BindingRecord.prototype.isDefaultChangeDetection = function () {
        return lang_1.isBlank(this.directiveRecord) || this.directiveRecord.isDefaultChangeDetection();
    };
    BindingRecord.createDirectiveDoCheck = function (directiveRecord) {
        return new BindingRecord(DIRECTIVE_LIFECYCLE, null, 0, null, null, "DoCheck", directiveRecord);
    };
    BindingRecord.createDirectiveOnInit = function (directiveRecord) {
        return new BindingRecord(DIRECTIVE_LIFECYCLE, null, 0, null, null, "OnInit", directiveRecord);
    };
    BindingRecord.createDirectiveOnChanges = function (directiveRecord) {
        return new BindingRecord(DIRECTIVE_LIFECYCLE, null, 0, null, null, "OnChanges", directiveRecord);
    };
    BindingRecord.createForDirective = function (ast, propertyName, setter, directiveRecord) {
        var elementIndex = directiveRecord.directiveIndex.elementIndex;
        var t = new BindingTarget(DIRECTIVE, elementIndex, propertyName, null, ast.toString());
        return new BindingRecord(DIRECTIVE, t, 0, ast, setter, null, directiveRecord);
    };
    BindingRecord.createForElementProperty = function (ast, elementIndex, propertyName) {
        var t = new BindingTarget(ELEMENT_PROPERTY, elementIndex, propertyName, null, ast.toString());
        return new BindingRecord(BINDING, t, 0, ast, null, null, null);
    };
    BindingRecord.createForElementAttribute = function (ast, elementIndex, attributeName) {
        var t = new BindingTarget(ELEMENT_ATTRIBUTE, elementIndex, attributeName, null, ast.toString());
        return new BindingRecord(BINDING, t, 0, ast, null, null, null);
    };
    BindingRecord.createForElementClass = function (ast, elementIndex, className) {
        var t = new BindingTarget(ELEMENT_CLASS, elementIndex, className, null, ast.toString());
        return new BindingRecord(BINDING, t, 0, ast, null, null, null);
    };
    BindingRecord.createForElementStyle = function (ast, elementIndex, styleName, unit) {
        var t = new BindingTarget(ELEMENT_STYLE, elementIndex, styleName, unit, ast.toString());
        return new BindingRecord(BINDING, t, 0, ast, null, null, null);
    };
    BindingRecord.createForHostProperty = function (directiveIndex, ast, propertyName) {
        var t = new BindingTarget(ELEMENT_PROPERTY, directiveIndex.elementIndex, propertyName, null, ast.toString());
        return new BindingRecord(BINDING, t, directiveIndex, ast, null, null, null);
    };
    BindingRecord.createForHostAttribute = function (directiveIndex, ast, attributeName) {
        var t = new BindingTarget(ELEMENT_ATTRIBUTE, directiveIndex.elementIndex, attributeName, null, ast.toString());
        return new BindingRecord(BINDING, t, directiveIndex, ast, null, null, null);
    };
    BindingRecord.createForHostClass = function (directiveIndex, ast, className) {
        var t = new BindingTarget(ELEMENT_CLASS, directiveIndex.elementIndex, className, null, ast.toString());
        return new BindingRecord(BINDING, t, directiveIndex, ast, null, null, null);
    };
    BindingRecord.createForHostStyle = function (directiveIndex, ast, styleName, unit) {
        var t = new BindingTarget(ELEMENT_STYLE, directiveIndex.elementIndex, styleName, unit, ast.toString());
        return new BindingRecord(BINDING, t, directiveIndex, ast, null, null, null);
    };
    BindingRecord.createForTextNode = function (ast, elementIndex) {
        var t = new BindingTarget(TEXT_NODE, elementIndex, null, null, ast.toString());
        return new BindingRecord(BINDING, t, 0, ast, null, null, null);
    };
    BindingRecord.createForEvent = function (ast, eventName, elementIndex) {
        var t = new BindingTarget(EVENT, elementIndex, eventName, null, ast.toString());
        return new BindingRecord(EVENT, t, 0, ast, null, null, null);
    };
    BindingRecord.createForHostEvent = function (ast, eventName, directiveRecord) {
        var directiveIndex = directiveRecord.directiveIndex;
        var t = new BindingTarget(HOST_EVENT, directiveIndex.elementIndex, eventName, null, ast.toString());
        return new BindingRecord(HOST_EVENT, t, directiveIndex, ast, null, null, directiveRecord);
    };
    return BindingRecord;
}());
exports.BindingRecord = BindingRecord;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGluZ19yZWNvcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLWpha1huTW1MLnRtcC9hbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2JpbmRpbmdfcmVjb3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBaUMsMEJBQTBCLENBQUMsQ0FBQTtBQUs1RCxJQUFNLG1CQUFtQixHQUFHLG9CQUFvQixDQUFDO0FBQ2pELElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQztBQUV6QixJQUFNLFNBQVMsR0FBRyxXQUFXLENBQUM7QUFDOUIsSUFBTSxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQztBQUMzQyxJQUFNLGlCQUFpQixHQUFHLGtCQUFrQixDQUFDO0FBQzdDLElBQU0sYUFBYSxHQUFHLGNBQWMsQ0FBQztBQUNyQyxJQUFNLGFBQWEsR0FBRyxjQUFjLENBQUM7QUFDckMsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDO0FBQzdCLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQztBQUN0QixJQUFNLFVBQVUsR0FBRyxXQUFXLENBQUM7QUFFL0I7SUFDRSx1QkFBbUIsSUFBWSxFQUFTLFlBQW9CLEVBQVMsSUFBWSxFQUM5RCxJQUFZLEVBQVMsS0FBYTtRQURsQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsaUJBQVksR0FBWixZQUFZLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQzlELFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQUcsQ0FBQztJQUV6RCxtQ0FBVyxHQUFYLGNBQXlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFFMUQseUNBQWlCLEdBQWpCLGNBQStCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJ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QUFFLElBQUksQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTSxnQ0FBa0IsR0FBekIsVUFBMEIsR0FBUSxFQUFFLFNBQWlCLEVBQzNCLGVBQWdDO1FBQ3hELElBQUksY0FBYyxHQUFHLGVBQWUsQ0FBQyxjQUFjLENBQUM7UUFDcEQsSUFBSSxDQUFDLEdBQ0QsSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNoRyxNQUFNLENBQUMsSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxjQUFjLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQWpIRCxJQWlIQztBQWpIWSxxQkFBYSxnQkFpSHpCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudCwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7U2V0dGVyRm59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlZmxlY3Rpb24vdHlwZXMnO1xuaW1wb3J0IHtBU1R9IGZyb20gJy4vcGFyc2VyL2FzdCc7XG5pbXBvcnQge0RpcmVjdGl2ZUluZGV4LCBEaXJlY3RpdmVSZWNvcmR9IGZyb20gJy4vZGlyZWN0aXZlX3JlY29yZCc7XG5cbmNvbnN0IERJUkVDVElWRV9MSUZFQ1lDTEUgPSBcImRpcmVjdGl2ZUxpZmVjeWNsZVwiO1xuY29uc3QgQklORElORyA9IFwibmF0aXZlXCI7XG5cbmNvbnN0IERJUkVDVElWRSA9IFwiZGlyZWN0aXZlXCI7XG5jb25zdCBFTEVNRU5UX1BST1BFUlRZID0gXCJlbGVtZW50UHJvcGVydHlcIjtcbmNvbnN0IEVMRU1FTlRfQVRUUklCVVRFID0gXCJlbGVtZW50QXR0cmlidXRlXCI7XG5jb25zdCBFTEVNRU5UX0NMQVNTID0gXCJlbGVtZW50Q2xhc3NcIjtcbmNvbnN0IEVMRU1FTlRfU1RZTEUgPSBcImVsZW1lbnRTdHlsZVwiO1xuY29uc3QgVEVYVF9OT0RFID0gXCJ0ZXh0Tm9kZVwiO1xuY29uc3QgRVZFTlQgPSBcImV2ZW50XCI7XG5jb25zdCBIT1NUX0VWRU5UID0gXCJob3N0RXZlbnRcIjtcblxuZXhwb3J0IGNsYXNzIEJpbmRpbmdUYXJnZXQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbW9kZTogc3RyaW5nLCBwdWJsaWMgZWxlbWVudEluZGV4OiBudW1iZXIsIHB1YmxpYyBuYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgIHB1YmxpYyB1bml0OiBzdHJpbmcsIHB1YmxpYyBkZWJ1Zzogc3RyaW5nKSB7fVxuXG4gIGlzRGlyZWN0aXZlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5tb2RlID09PSBESVJFQ1RJVkU7IH1cblxuICBpc0VsZW1lbnRQcm9wZXJ0eSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubW9kZSA9PT0gRUxFTUVOVF9QUk9QRVJUWTsgfVxuXG4gIGlzRWxlbWVudEF0dHJpYnV0ZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubW9kZSA9PT0gRUxFTUVOVF9BVFRSSUJVVEU7IH1cblxuICBpc0VsZW1lbnRDbGFzcygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubW9kZSA9PT0gRUxFTUVOVF9DTEFTUzsgfVxuXG4gIGlzRWxlbWVudFN0eWxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5tb2RlID09PSBFTEVNRU5UX1NUWUxFOyB9XG5cbiAgaXNUZXh0Tm9kZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubW9kZSA9PT0gVEVYVF9OT0RFOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBCaW5kaW5nUmVjb3JkIHtcbiAgY29uc3RydWN0b3IocHVibGljIG1vZGU6IHN0cmluZywgcHVibGljIHRhcmdldDogQmluZGluZ1RhcmdldCwgcHVibGljIGltcGxpY2l0UmVjZWl2ZXI6IGFueSxcbiAgICAgICAgICAgICAgcHVibGljIGFzdDogQVNULCBwdWJsaWMgc2V0dGVyOiBTZXR0ZXJGbiwgcHVibGljIGxpZmVjeWNsZUV2ZW50OiBzdHJpbmcsXG4gICAgICAgICAgICAgIHB1YmxpYyBkaXJlY3RpdmVSZWNvcmQ6IERpcmVjdGl2ZVJlY29yZCkge31cblxuICBpc0RpcmVjdGl2ZUxpZmVjeWNsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubW9kZSA9PT0gRElSRUNUSVZFX0xJRkVDWUNMRTsgfVxuXG4gIGNhbGxPbkNoYW5nZXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmRpcmVjdGl2ZVJlY29yZCkgJiYgdGhpcy5kaXJlY3RpdmVSZWNvcmQuY2FsbE9uQ2hhbmdlcztcbiAgfVxuXG4gIGlzRGVmYXVsdENoYW5nZURldGVjdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNCbGFuayh0aGlzLmRpcmVjdGl2ZVJlY29yZCkgfHwgdGhpcy5kaXJlY3RpdmVSZWNvcmQuaXNEZWZhdWx0Q2hhbmdlRGV0ZWN0aW9uKCk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlRGlyZWN0aXZlRG9DaGVjayhkaXJlY3RpdmVSZWNvcmQ6IERpcmVjdGl2ZVJlY29yZCk6IEJpbmRpbmdSZWNvcmQge1xuICAgIHJldHVybiBuZXcgQmluZGluZ1JlY29yZChESVJFQ1RJVkVfTElGRUNZQ0xFLCBudWxsLCAwLCBudWxsLCBudWxsLCBcIkRvQ2hlY2tcIiwgZGlyZWN0aXZlUmVjb3JkKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVEaXJlY3RpdmVPbkluaXQoZGlyZWN0aXZlUmVjb3JkOiBEaXJlY3RpdmVSZWNvcmQpOiBCaW5kaW5nUmVjb3JkIHtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdSZWNvcmQoRElSRUNUSVZFX0xJRkVDWUNMRSwgbnVsbCwgMCwgbnVsbCwgbnVsbCwgXCJPbkluaXRcIiwgZGlyZWN0aXZlUmVjb3JkKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVEaXJlY3RpdmVPbkNoYW5nZXMoZGlyZWN0aXZlUmVjb3JkOiBEaXJlY3RpdmVSZWNvcmQpOiBCaW5kaW5nUmVjb3JkIHtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdSZWNvcmQoRElSRUNUSVZFX0xJRkVDWUNMRSwgbnVsbCwgMCwgbnVsbCwgbnVsbCwgXCJPbkNoYW5nZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlUmVjb3JkKTtcbiAgfVxuXG5cblxuICBzdGF0aWMgY3JlYXRlRm9yRGlyZWN0aXZlKGFzdDogQVNULCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgc2V0dGVyOiBTZXR0ZXJGbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVSZWNvcmQ6IERpcmVjdGl2ZVJlY29yZCk6IEJpbmRpbmdSZWNvcmQge1xuICAgIHZhciBlbGVtZW50SW5kZXggPSBkaXJlY3RpdmVSZWNvcmQuZGlyZWN0aXZlSW5kZXguZWxlbWVudEluZGV4O1xuICAgIHZhciB0ID0gbmV3IEJpbmRpbmdUYXJnZXQoRElSRUNUSVZFLCBlbGVtZW50SW5kZXgsIHByb3BlcnR5TmFtZSwgbnVsbCwgYXN0LnRvU3RyaW5nKCkpO1xuICAgIHJldHVybiBuZXcgQmluZGluZ1JlY29yZChESVJFQ1RJVkUsIHQsIDAsIGFzdCwgc2V0dGVyLCBudWxsLCBkaXJlY3RpdmVSZWNvcmQpO1xuICB9XG5cblxuXG4gIHN0YXRpYyBjcmVhdGVGb3JFbGVtZW50UHJvcGVydHkoYXN0OiBBU1QsIGVsZW1lbnRJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZTogc3RyaW5nKTogQmluZGluZ1JlY29yZCB7XG4gICAgdmFyIHQgPSBuZXcgQmluZGluZ1RhcmdldChFTEVNRU5UX1BST1BFUlRZLCBlbGVtZW50SW5kZXgsIHByb3BlcnR5TmFtZSwgbnVsbCwgYXN0LnRvU3RyaW5nKCkpO1xuICAgIHJldHVybiBuZXcgQmluZGluZ1JlY29yZChCSU5ESU5HLCB0LCAwLCBhc3QsIG51bGwsIG51bGwsIG51bGwpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUZvckVsZW1lbnRBdHRyaWJ1dGUoYXN0OiBBU1QsIGVsZW1lbnRJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpOiBCaW5kaW5nUmVjb3JkIHtcbiAgICB2YXIgdCA9IG5ldyBCaW5kaW5nVGFyZ2V0KEVMRU1FTlRfQVRUUklCVVRFLCBlbGVtZW50SW5kZXgsIGF0dHJpYnV0ZU5hbWUsIG51bGwsIGFzdC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdSZWNvcmQoQklORElORywgdCwgMCwgYXN0LCBudWxsLCBudWxsLCBudWxsKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVGb3JFbGVtZW50Q2xhc3MoYXN0OiBBU1QsIGVsZW1lbnRJbmRleDogbnVtYmVyLCBjbGFzc05hbWU6IHN0cmluZyk6IEJpbmRpbmdSZWNvcmQge1xuICAgIHZhciB0ID0gbmV3IEJpbmRpbmdUYXJnZXQoRUxFTUVOVF9DTEFTUywgZWxlbWVudEluZGV4LCBjbGFzc05hbWUsIG51bGwsIGFzdC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdSZWNvcmQoQklORElORywgdCwgMCwgYXN0LCBudWxsLCBudWxsLCBudWxsKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVGb3JFbGVtZW50U3R5bGUoYXN0OiBBU1QsIGVsZW1lbnRJbmRleDogbnVtYmVyLCBzdHlsZU5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bml0OiBzdHJpbmcpOiBCaW5kaW5nUmVjb3JkIHtcbiAgICB2YXIgdCA9IG5ldyBCaW5kaW5nVGFyZ2V0KEVMRU1FTlRfU1RZTEUsIGVsZW1lbnRJbmRleCwgc3R5bGVOYW1lLCB1bml0LCBhc3QudG9TdHJpbmcoKSk7XG4gICAgcmV0dXJuIG5ldyBCaW5kaW5nUmVjb3JkKEJJTkRJTkcsIHQsIDAsIGFzdCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gIH1cblxuXG5cbiAgc3RhdGljIGNyZWF0ZUZvckhvc3RQcm9wZXJ0eShkaXJlY3RpdmVJbmRleDogRGlyZWN0aXZlSW5kZXgsIGFzdDogQVNULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZTogc3RyaW5nKTogQmluZGluZ1JlY29yZCB7XG4gICAgdmFyIHQgPSBuZXcgQmluZGluZ1RhcmdldChFTEVNRU5UX1BST1BFUlRZLCBkaXJlY3RpdmVJbmRleC5lbGVtZW50SW5kZXgsIHByb3BlcnR5TmFtZSwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzdC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdSZWNvcmQoQklORElORywgdCwgZGlyZWN0aXZlSW5kZXgsIGFzdCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlRm9ySG9zdEF0dHJpYnV0ZShkaXJlY3RpdmVJbmRleDogRGlyZWN0aXZlSW5kZXgsIGFzdDogQVNULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpOiBCaW5kaW5nUmVjb3JkIHtcbiAgICB2YXIgdCA9IG5ldyBCaW5kaW5nVGFyZ2V0KEVMRU1FTlRfQVRUUklCVVRFLCBkaXJlY3RpdmVJbmRleC5lbGVtZW50SW5kZXgsIGF0dHJpYnV0ZU5hbWUsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3QudG9TdHJpbmcoKSk7XG4gICAgcmV0dXJuIG5ldyBCaW5kaW5nUmVjb3JkKEJJTkRJTkcsIHQsIGRpcmVjdGl2ZUluZGV4LCBhc3QsIG51bGwsIG51bGwsIG51bGwpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUZvckhvc3RDbGFzcyhkaXJlY3RpdmVJbmRleDogRGlyZWN0aXZlSW5kZXgsIGFzdDogQVNULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogc3RyaW5nKTogQmluZGluZ1JlY29yZCB7XG4gICAgdmFyIHQgPSBuZXcgQmluZGluZ1RhcmdldChFTEVNRU5UX0NMQVNTLCBkaXJlY3RpdmVJbmRleC5lbGVtZW50SW5kZXgsIGNsYXNzTmFtZSwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzdC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdSZWNvcmQoQklORElORywgdCwgZGlyZWN0aXZlSW5kZXgsIGFzdCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlRm9ySG9zdFN0eWxlKGRpcmVjdGl2ZUluZGV4OiBEaXJlY3RpdmVJbmRleCwgYXN0OiBBU1QsIHN0eWxlTmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IHN0cmluZyk6IEJpbmRpbmdSZWNvcmQge1xuICAgIHZhciB0ID0gbmV3IEJpbmRpbmdUYXJnZXQoRUxFTUVOVF9TVFlMRSwgZGlyZWN0aXZlSW5kZXguZWxlbWVudEluZGV4LCBzdHlsZU5hbWUsIHVuaXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3QudG9TdHJpbmcoKSk7XG4gICAgcmV0dXJuIG5ldyBCaW5kaW5nUmVjb3JkKEJJTkRJTkcsIHQsIGRpcmVjdGl2ZUluZGV4LCBhc3QsIG51bGwsIG51bGwsIG51bGwpO1xuICB9XG5cblxuXG4gIHN0YXRpYyBjcmVhdGVGb3JUZXh0Tm9kZShhc3Q6IEFTVCwgZWxlbWVudEluZGV4OiBudW1iZXIpOiBCaW5kaW5nUmVjb3JkIHtcbiAgICB2YXIgdCA9IG5ldyBCaW5kaW5nVGFyZ2V0KFRFWFRfTk9ERSwgZWxlbWVudEluZGV4LCBudWxsLCBudWxsLCBhc3QudG9TdHJpbmcoKSk7XG4gICAgcmV0dXJuIG5ldyBCaW5kaW5nUmVjb3JkKEJJTkRJTkcsIHQsIDAsIGFzdCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gIH1cblxuXG5cbiAgc3RhdGljIGNyZWF0ZUZvckV2ZW50KGFzdDogQVNULCBldmVudE5hbWU6IHN0cmluZywgZWxlbWVudEluZGV4OiBudW1iZXIpOiBCaW5kaW5nUmVjb3JkIHtcbiAgICB2YXIgdCA9IG5ldyBCaW5kaW5nVGFyZ2V0KEVWRU5ULCBlbGVtZW50SW5kZXgsIGV2ZW50TmFtZSwgbnVsbCwgYXN0LnRvU3RyaW5nKCkpO1xuICAgIHJldHVybiBuZXcgQmluZGluZ1JlY29yZChFVkVOVCwgdCwgMCwgYXN0LCBudWxsLCBudWxsLCBudWxsKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVGb3JIb3N0RXZlbnQoYXN0OiBBU1QsIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZVJlY29yZDogRGlyZWN0aXZlUmVjb3JkKTogQmluZGluZ1JlY29yZCB7XG4gICAgdmFyIGRpcmVjdGl2ZUluZGV4ID0gZGlyZWN0aXZlUmVjb3JkLmRpcmVjdGl2ZUluZGV4O1xuICAgIHZhciB0ID1cbiAgICAgICAgbmV3IEJpbmRpbmdUYXJnZXQoSE9TVF9FVkVOVCwgZGlyZWN0aXZlSW5kZXguZWxlbWVudEluZGV4LCBldmVudE5hbWUsIG51bGwsIGFzdC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdSZWNvcmQoSE9TVF9FVkVOVCwgdCwgZGlyZWN0aXZlSW5kZXgsIGFzdCwgbnVsbCwgbnVsbCwgZGlyZWN0aXZlUmVjb3JkKTtcbiAgfVxufVxuIl19