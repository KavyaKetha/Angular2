import { provide } from 'angular2/core';
import { NG1_SCOPE } from './constants';
const INITIAL_VALUE = {
    __UNINITIALIZED__: true
};
export class DowngradeNg2ComponentAdapter {
    constructor(id, info, element, attrs, scope, parentInjector, parse, viewManager, hostViewFactory) {
        this.id = id;
        this.info = info;
        this.element = element;
        this.attrs = attrs;
        this.scope = scope;
        this.parentInjector = parentInjector;
        this.parse = parse;
        this.viewManager = viewManager;
        this.hostViewFactory = hostViewFactory;
        this.component = null;
        this.inputChangeCount = 0;
        this.inputChanges = null;
        this.hostViewRef = null;
        this.changeDetector = null;
        this.contentInsertionPoint = null;
        this.element[0].id = id;
        this.componentScope = scope.$new();
        this.childNodes = element.contents();
    }
    bootstrapNg2() {
        var childInjector = this.parentInjector.resolveAndCreateChild([provide(NG1_SCOPE, { useValue: this.componentScope })]);
        this.contentInsertionPoint = document.createComment('ng1 insertion point');
        this.hostViewRef = this.viewManager.createRootHostView(this.hostViewFactory, '#' + this.id, childInjector, [[this.contentInsertionPoint]]);
        var hostElement = this.viewManager.getHostElement(this.hostViewRef);
        this.changeDetector = this.hostViewRef.changeDetectorRef;
        this.component = this.viewManager.getComponent(hostElement);
    }
    setupInputs() {
        var attrs = this.attrs;
        var inputs = this.info.inputs;
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            var expr = null;
            if (attrs.hasOwnProperty(input.attr)) {
                var observeFn = ((prop) => {
                    var prevValue = INITIAL_VALUE;
                    return (value) => {
                        if (this.inputChanges !== null) {
                            this.inputChangeCount++;
                            this.inputChanges[prop] =
                                new Ng1Change(value, prevValue === INITIAL_VALUE ? value : prevValue);
                            prevValue = value;
                        }
                        this.component[prop] = value;
                    };
                })(input.prop);
                attrs.$observe(input.attr, observeFn);
            }
            else if (attrs.hasOwnProperty(input.bindAttr)) {
                expr = attrs[input.bindAttr];
            }
            else if (attrs.hasOwnProperty(input.bracketAttr)) {
                expr = attrs[input.bracketAttr];
            }
            else if (attrs.hasOwnProperty(input.bindonAttr)) {
                expr = attrs[input.bindonAttr];
            }
            else if (attrs.hasOwnProperty(input.bracketParenAttr)) {
                expr = attrs[input.bracketParenAttr];
            }
            if (expr != null) {
                var watchFn = ((prop) => (value, prevValue) => {
                    if (this.inputChanges != null) {
                        this.inputChangeCount++;
                        this.inputChanges[prop] = new Ng1Change(prevValue, value);
                    }
                    this.component[prop] = value;
                })(input.prop);
                this.componentScope.$watch(expr, watchFn);
            }
        }
        var prototype = this.info.type.prototype;
        if (prototype && prototype.ngOnChanges) {
            // Detect: OnChanges interface
            this.inputChanges = {};
            this.componentScope.$watch(() => this.inputChangeCount, () => {
                var inputChanges = this.inputChanges;
                this.inputChanges = {};
                this.component.ngOnChanges(inputChanges);
            });
        }
        this.componentScope.$watch(() => this.changeDetector && this.changeDetector.detectChanges());
    }
    projectContent() {
        var childNodes = this.childNodes;
        var parent = this.contentInsertionPoint.parentNode;
        if (parent) {
            for (var i = 0, ii = childNodes.length; i < ii; i++) {
                parent.insertBefore(childNodes[i], this.contentInsertionPoint);
            }
        }
    }
    setupOutputs() {
        var attrs = this.attrs;
        var outputs = this.info.outputs;
        for (var j = 0; j < outputs.length; j++) {
            var output = outputs[j];
            var expr = null;
            var assignExpr = false;
            var bindonAttr = output.bindonAttr ? output.bindonAttr.substring(0, output.bindonAttr.length - 6) : null;
            var bracketParenAttr = output.bracketParenAttr ?
                `[(${output.bracketParenAttr.substring(2, output.bracketParenAttr.length - 8)})]` :
                null;
            if (attrs.hasOwnProperty(output.onAttr)) {
                expr = attrs[output.onAttr];
            }
            else if (attrs.hasOwnProperty(output.parenAttr)) {
                expr = attrs[output.parenAttr];
            }
            else if (attrs.hasOwnProperty(bindonAttr)) {
                expr = attrs[bindonAttr];
                assignExpr = true;
            }
            else if (attrs.hasOwnProperty(bracketParenAttr)) {
                expr = attrs[bracketParenAttr];
                assignExpr = true;
            }
            if (expr != null && assignExpr != null) {
                var getter = this.parse(expr);
                var setter = getter.assign;
                if (assignExpr && !setter) {
                    throw new Error(`Expression '${expr}' is not assignable!`);
                }
                var emitter = this.component[output.prop];
                if (emitter) {
                    emitter.subscribe({
                        next: assignExpr ? ((setter) => (value) => setter(this.scope, value))(setter) :
                            ((getter) => (value) => getter(this.scope, { $event: value }))(getter)
                    });
                }
                else {
                    throw new Error(`Missing emitter '${output.prop}' on component '${this.info.selector}'!`);
                }
            }
        }
    }
    registerCleanup() {
        this.element.bind('$destroy', () => this.viewManager.destroyRootHostView(this.hostViewRef));
    }
}
class Ng1Change {
    constructor(previousValue, currentValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
    }
    isFirstChange() { return this.previousValue === this.currentValue; }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmdyYWRlX25nMl9hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1vWERPNHAydi50bXAvYW5ndWxhcjIvc3JjL3VwZ3JhZGUvZG93bmdyYWRlX25nMl9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQ0wsT0FBTyxFQVFSLE1BQU0sZUFBZTtPQUNmLEVBQUMsU0FBUyxFQUFDLE1BQU0sYUFBYTtBQUtyQyxNQUFNLGFBQWEsR0FBRztJQUNwQixpQkFBaUIsRUFBRSxJQUFJO0NBQ3hCLENBQUM7QUFFRjtJQVVFLFlBQW9CLEVBQVUsRUFBVSxJQUFtQixFQUN2QyxPQUFpQyxFQUFVLEtBQTBCLEVBQ3JFLEtBQXFCLEVBQVUsY0FBd0IsRUFDdkQsS0FBNEIsRUFBVSxXQUEyQixFQUNqRSxlQUFtQztRQUpuQyxPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBZTtRQUN2QyxZQUFPLEdBQVAsT0FBTyxDQUEwQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQXFCO1FBQ3JFLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQVU7UUFDdkQsVUFBSyxHQUFMLEtBQUssQ0FBdUI7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFDakUsb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBYnZELGNBQVMsR0FBUSxJQUFJLENBQUM7UUFDdEIscUJBQWdCLEdBQVcsQ0FBQyxDQUFDO1FBQzdCLGlCQUFZLEdBQWtDLElBQUksQ0FBQztRQUNuRCxnQkFBVyxHQUFnQixJQUFJLENBQUM7UUFDaEMsbUJBQWMsR0FBc0IsSUFBSSxDQUFDO1FBR3pDLDBCQUFxQixHQUFTLElBQUksQ0FBQztRQU8zQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDL0IsSUFBSSxD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RixDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixNQUFNLENBQUMsSUFBSSxtQkFBbUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO2dCQUM1RixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDOUYsQ0FBQztBQUNILENBQUM7QUFFRDtJQUNFLFlBQW1CLGFBQWtCLEVBQVMsWUFBaUI7UUFBNUMsa0JBQWEsR0FBYixhQUFhLENBQUs7UUFBUyxpQkFBWSxHQUFaLFlBQVksQ0FBSztJQUFHLENBQUM7SUFFbkUsYUFBYSxLQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQy9FLENBQUM7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIHByb3ZpZGUsXG4gIEFwcFZpZXdNYW5hZ2VyLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgSG9zdFZpZXdSZWYsXG4gIEluamVjdG9yLFxuICBPbkNoYW5nZXMsXG4gIEhvc3RWaWV3RmFjdG9yeVJlZixcbiAgU2ltcGxlQ2hhbmdlXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtORzFfU0NPUEV9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7Q29tcG9uZW50SW5mb30gZnJvbSAnLi9tZXRhZGF0YSc7XG5pbXBvcnQgRWxlbWVudCA9IHByb3RyYWN0b3IuRWxlbWVudDtcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnLi9hbmd1bGFyX2pzJztcblxuY29uc3QgSU5JVElBTF9WQUxVRSA9IHtcbiAgX19VTklOSVRJQUxJWkVEX186IHRydWVcbn07XG5cbmV4cG9ydCBjbGFzcyBEb3duZ3JhZGVOZzJDb21wb25lbnRBZGFwdGVyIHtcbiAgY29tcG9uZW50OiBhbnkgPSBudWxsO1xuICBpbnB1dENoYW5nZUNvdW50OiBudW1iZXIgPSAwO1xuICBpbnB1dENoYW5nZXM6IHtba2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2V9ID0gbnVsbDtcbiAgaG9zdFZpZXdSZWY6IEhvc3RWaWV3UmVmID0gbnVsbDtcbiAgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmID0gbnVsbDtcbiAgY29tcG9uZW50U2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xuICBjaGlsZE5vZGVzOiBOb2RlW107XG4gIGNvbnRlbnRJbnNlcnRpb25Qb2ludDogTm9kZSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpZDogc3RyaW5nLCBwcml2YXRlIGluZm86IENvbXBvbmVudEluZm8sXG4gICAgICAgICAgICAgIHByaXZhdGUgZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCBwcml2YXRlIGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLFxuICAgICAgICAgICAgICBwcml2YXRlIHNjb3BlOiBhbmd1bGFyLklTY29wZSwgcHJpdmF0ZSBwYXJlbnRJbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgICAgICAgIHByaXZhdGUgcGFyc2U6IGFuZ3VsYXIuSVBhcnNlU2VydmljZSwgcHJpdmF0ZSB2aWV3TWFuYWdlcjogQXBwVmlld01hbmFnZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgaG9zdFZpZXdGYWN0b3J5OiBIb3N0Vmlld0ZhY3RvcnlSZWYpIHtcbiAgICAoPGFueT50aGlzLmVsZW1lbnRbMF0pLmlkID0gaWQ7XG4gICAgdGhpcy5jb21wb25lbnRTY29wZSA9IHNjb3BlLiRuZXcoKTtcbiAgICB0aGlzLmNoaWxkTm9kZXMgPSA8Tm9kZVtdPjxhbnk+ZWxlbWVudC5jb250ZW50cygpO1xuICB9XG5cbiAgYm9vdHN0cmFwTmcyKCkge1xuICAgIHZhciBjaGlsZEluamVjdG9yID0gdGhpcy5wYXJlbnRJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlQ2hpbGQoXG4gICAgICAgIFtwcm92aWRlKE5HMV9TQ09QRSwge3VzZVZhbHVlOiB0aGlzLmNvbXBvbmVudFNjb3BlfSldKTtcbiAgICB0aGlzLmNvbnRlbnRJbnNlcnRpb25Qb2ludCA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ25nMSBpbnNlcnRpb24gcG9pbnQnKTtcblxuICAgIHRoaXMuaG9zdFZpZXdSZWYgPSB0aGlzLnZpZXdNYW5hZ2VyLmNyZWF0ZVJvb3RIb3N0VmlldyhcbiAgICAgICAgdGhpcy5ob3N0Vmlld0ZhY3RvcnksICcjJyArIHRoaXMuaWQsIGNoaWxkSW5qZWN0b3IsIFtbdGhpcy5jb250ZW50SW5zZXJ0aW9uUG9pbnRdXSk7XG4gICAgdmFyIGhvc3RFbGVtZW50ID0gdGhpcy52aWV3TWFuYWdlci5nZXRIb3N0RWxlbWVudCh0aGlzLmhvc3RWaWV3UmVmKTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yID0gdGhpcy5ob3N0Vmlld1JlZi5jaGFuZ2VEZXRlY3RvclJlZjtcbiAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMudmlld01hbmFnZXIuZ2V0Q29tcG9uZW50KGhvc3RFbGVtZW50KTtcbiAgfVxuXG4gIHNldHVwSW5wdXRzKCk6IHZvaWQge1xuICAgIHZhciBhdHRycyA9IHRoaXMuYXR0cnM7XG4gICAgdmFyIGlucHV0cyA9IHRoaXMuaW5mby5pbnB1dHM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpbnB1dCA9IGlucHV0c1tpXTtcbiAgICAgIHZhciBleHByID0gbnVsbDtcbiAgICAgIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShpbnB1dC5hdHRyKSkge1xuICAgICAgICB2YXIgb2JzZXJ2ZUZuID0gKChwcm9wKSA9PiB7XG4gICAgICAgICAgdmFyIHByZXZWYWx1ZSA9IElOSVRJQUxfVkFMVUU7XG4gICAgICAgICAgcmV0dXJuICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRDaGFuZ2VzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRoaXMuaW5wdXRDaGFuZ2VDb3VudCsrO1xuICAgICAgICAgICAgICB0aGlzLmlucHV0Q2hhbmdlc1twcm9wXSA9XG4gICAgICAgICAgICAgICAgICBuZXcgTmcxQ2hhbmdlKHZhbHVlLCBwcmV2VmFsdWUgPT09IElOSVRJQUxfVkFMVUUgPyB2YWx1ZSA6IHByZXZWYWx1ZSk7XG4gICAgICAgICAgICAgIHByZXZWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KShpbnB1dC5wcm9wKTtcbiAgICAgICAgYXR0cnMuJG9ic2VydmUoaW5wdXQuYXR0ciwgb2JzZXJ2ZUZuKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoaW5wdXQuYmluZEF0dHIpKSB7XG4gICAgICAgIGV4cHIgPSBhdHRyc1tpbnB1dC5iaW5kQXR0cl07XG4gICAgICB9IGVsc2UgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KGlucHV0LmJyYWNrZXRBdHRyKSkge1xuICAgICAgICBleHByID0gYXR0cnNbaW5wdXQuYnJhY2tldEF0dHJdO1xuICAgICAgfSBlbHNlIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShpbnB1dC5iaW5kb25BdHRyKSkge1xuICAgICAgICBleHByID0gYXR0cnNbaW5wdXQuYmluZG9uQXR0cl07XG4gICAgICB9IGVsc2UgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KGlucHV0LmJyYWNrZXRQYXJlbkF0dHIpKSB7XG4gICAgICAgIGV4cHIgPSBhdHRyc1tpbnB1dC5icmFja2V0UGFyZW5BdHRyXTtcbiAgICAgIH1cbiAgICAgIGlmIChleHByICE9IG51bGwpIHtcbiAgICAgICAgdmFyIHdhdGNoRm4gPSAoKHByb3ApID0+ICh2YWx1ZSwgcHJldlZhbHVlKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaW5wdXRDaGFuZ2VzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRDaGFuZ2VDb3VudCsrO1xuICAgICAgICAgICAgdGhpcy5pbnB1dENoYW5nZXNbcHJvcF0gPSBuZXcgTmcxQ2hhbmdlKHByZXZWYWx1ZSwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNvbXBvbmVudFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICB9KShpbnB1dC5wcm9wKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRTY29wZS4kd2F0Y2goZXhwciwgd2F0Y2hGbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByb3RvdHlwZSA9IHRoaXMuaW5mby50eXBlLnByb3RvdHlwZTtcbiAgICBpZiAocHJvdG90eXBlICYmICg8T25DaGFuZ2VzPnByb3RvdHlwZSkubmdPbkNoYW5nZXMpIHtcbiAgICAgIC8vIERldGVjdDogT25DaGFuZ2VzIGludGVyZmFjZVxuICAgICAgdGhpcy5pbnB1dENoYW5nZXMgPSB7fTtcbiAgICAgIHRoaXMuY29tcG9uZW50U2NvcGUuJHdhdGNoKCgpID0+IHRoaXMuaW5wdXRDaGFuZ2VDb3VudCwgKCkgPT4ge1xuICAgICAgICB2YXIgaW5wdXRDaGFuZ2VzID0gdGhpcy5pbnB1dENoYW5nZXM7XG4gICAgICAgIHRoaXMuaW5wdXRDaGFuZ2VzID0ge307XG4gICAgICAgICg8T25DaGFuZ2VzPnRoaXMuY29tcG9uZW50KS5uZ09uQ2hhbmdlcyhpbnB1dENoYW5nZXMpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuY29tcG9uZW50U2NvcGUuJHdhdGNoKCgpID0+IHRoaXMuY2hhbmdlRGV0ZWN0b3IgJiYgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCkpO1xuICB9XG5cbiAgcHJvamVjdENvbnRlbnQoKSB7XG4gICAgdmFyIGNoaWxkTm9kZXMgPSB0aGlzLmNoaWxkTm9kZXM7XG4gICAgdmFyIHBhcmVudCA9IHRoaXMuY29udGVudEluc2VydGlvblBvaW50LnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGlpID0gY2hpbGROb2Rlcy5sZW5ndGg7IGkgPCBpaTsgaSsrKSB7XG4gICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoY2hpbGROb2Rlc1tpXSwgdGhpcy5jb250ZW50SW5zZXJ0aW9uUG9pbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldHVwT3V0cHV0cygpIHtcbiAgICB2YXIgYXR0cnMgPSB0aGlzLmF0dHJzO1xuICAgIHZhciBvdXRwdXRzID0gdGhpcy5pbmZvLm91dHB1dHM7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBvdXRwdXRzLmxlbmd0aDsgaisrKSB7XG4gICAgICB2YXIgb3V0cHV0ID0gb3V0cHV0c1tqXTtcbiAgICAgIHZhciBleHByID0gbnVsbDtcbiAgICAgIHZhciBhc3NpZ25FeHByID0gZmFsc2U7XG5cbiAgICAgIHZhciBiaW5kb25BdHRyID1cbiAgICAgICAgICBvdXRwdXQuYmluZG9uQXR0ciA/IG91dHB1dC5iaW5kb25BdHRyLnN1YnN0cmluZygwLCBvdXRwdXQuYmluZG9uQXR0ci5sZW5ndGggLSA2KSA6IG51bGw7XG4gICAgICB2YXIgYnJhY2tldFBhcmVuQXR0ciA9XG4gICAgICAgICAgb3V0cHV0LmJyYWNrZXRQYXJlbkF0dHIgP1xuICAgICAgICAgICAgICBgWygke291dHB1dC5icmFja2V0UGFyZW5BdHRyLnN1YnN0cmluZygyLCBvdXRwdXQuYnJhY2tldFBhcmVuQXR0ci5sZW5ndGggLSA4KX0pXWAgOlxuICAgICAgICAgICAgICBudWxsO1xuXG4gICAgICBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkob3V0cHV0Lm9uQXR0cikpIHtcbiAgICAgICAgZXhwciA9IGF0dHJzW291dHB1dC5vbkF0dHJdO1xuICAgICAgfSBlbHNlIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShvdXRwdXQucGFyZW5BdHRyKSkge1xuICAgICAgICBleHByID0gYXR0cnNbb3V0cHV0LnBhcmVuQXR0cl07XG4gICAgICB9IGVsc2UgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KGJpbmRvbkF0dHIpKSB7XG4gICAgICAgIGV4cHIgPSBhdHRyc1tiaW5kb25BdHRyXTtcbiAgICAgICAgYXNzaWduRXhwciA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KGJyYWNrZXRQYXJlbkF0dHIpKSB7XG4gICAgICAgIGV4cHIgPSBhdHRyc1ticmFja2V0UGFyZW5BdHRyXTtcbiAgICAgICAgYXNzaWduRXhwciA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChleHByICE9IG51bGwgJiYgYXNzaWduRXhwciAhPSBudWxsKSB7XG4gICAgICAgIHZhciBnZXR0ZXIgPSB0aGlzLnBhcnNlKGV4cHIpO1xuICAgICAgICB2YXIgc2V0dGVyID0gZ2V0dGVyLmFzc2lnbjtcbiAgICAgICAgaWYgKGFzc2lnbkV4cHIgJiYgIXNldHRlcikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwcmVzc2lvbiAnJHtleHByfScgaXMgbm90IGFzc2lnbmFibGUhYCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVtaXR0ZXIgPSB0aGlzLmNvbXBvbmVudFtvdXRwdXQucHJvcF07XG4gICAgICAgIGlmIChlbWl0dGVyKSB7XG4gICAgICAgICAgZW1pdHRlci5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgbmV4dDogYXNzaWduRXhwciA/ICgoc2V0dGVyKSA9PiAodmFsdWUpID0+IHNldHRlcih0aGlzLnNjb3BlLCB2YWx1ZSkpKHNldHRlcikgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoZ2V0dGVyKSA9PiAodmFsdWUpID0+IGdldHRlcih0aGlzLnNjb3BlLCB7JGV2ZW50OiB2YWx1ZX0pKShnZXR0ZXIpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIGVtaXR0ZXIgJyR7b3V0cHV0LnByb3B9JyBvbiBjb21wb25lbnQgJyR7dGhpcy5pbmZvLnNlbGVjdG9yfSchYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWdpc3RlckNsZWFudXAoKSB7XG4gICAgdGhpcy5lbGVtZW50LmJpbmQoJyRkZXN0cm95JywgKCkgPT4gdGhpcy52aWV3TWFuYWdlci5kZXN0cm95Um9vdEhvc3RWaWV3KHRoaXMuaG9zdFZpZXdSZWYpKTtcbiAgfVxufVxuXG5jbGFzcyBOZzFDaGFuZ2UgaW1wbGVtZW50cyBTaW1wbGVDaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJldmlvdXNWYWx1ZTogYW55LCBwdWJsaWMgY3VycmVudFZhbHVlOiBhbnkpIHt9XG5cbiAgaXNGaXJzdENoYW5nZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMucHJldmlvdXNWYWx1ZSA9PT0gdGhpcy5jdXJyZW50VmFsdWU7IH1cbn1cbiJdfQ==