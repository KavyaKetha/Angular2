'use strict';"use strict";
var e2e_util_1 = require('angular2/src/testing/e2e_util');
var testing_1 = require('angular2/testing');
function waitForElement(selector) {
    var EC = protractor.ExpectedConditions;
    // Waits for the element with id 'abc' to be present on the dom.
    e2e_util_1.browser.wait(EC.presenceOf($(selector)), 20000);
}
describe('reuse example app', function () {
    afterEach(e2e_util_1.verifyNoBrowserErrors);
    var URL = 'angular2/examples/router/ts/can_activate/';
    it('should navigate to user 1', function () {
        e2e_util_1.browser.get(URL);
        waitForElement('home-cmp');
        element(by.css('#user-1-link')).click();
        waitForElement('control-panel-cmp');
        testing_1.expect(e2e_util_1.browser.getCurrentUrl()).toMatch(/\/user-settings\/1$/);
        testing_1.expect(element(by.css('control-panel-cmp')).getText()).toContain('Settings');
    });
    it('should not navigate to user 2', function () {
        e2e_util_1.browser.get(URL);
        waitForElement('home-cmp');
        element(by.css('#user-2-link')).click();
        waitForElement('home-cmp');
        testing_1.expect(element(by.css('home-cmp')).getText()).toContain('Welcome Home!');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuX2FjdGl2YXRlX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLWNuUjl1ZWxlLnRtcC9hbmd1bGFyMi9leGFtcGxlcy9yb3V0ZXIvdHMvY2FuX2FjdGl2YXRlL2Nhbl9hY3RpdmF0ZV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx5QkFBNkMsK0JBQStCLENBQUMsQ0FBQTtBQUM3RSx3QkFBcUIsa0JBQWtCLENBQUMsQ0FBQTtBQUV4Qyx3QkFBd0IsUUFBZ0I7SUFDdEMsSUFBSSxFQUFFLEdBQVMsVUFBVyxDQUFDLGtCQUFrQixDQUFDO0lBQzlDLGdFQUFnRTtJQUNoRSxrQkFBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFFRCxRQUFRLENBQUMsbUJBQW1CLEVBQUU7SUFFNUIsU0FBUyxDQUFDLGdDQUFxQixDQUFDLENBQUM7SUFFakMsSUFBSSxHQUFHLEdBQUcsMkNBQTJDLENBQUM7SUFFdEQsRUFBRSxDQUFDLDJCQUEyQixFQUFFO1FBQzlCLGtCQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUzQixPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3BDLGdCQUFNLENBQUMsa0JBQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBRS9ELGdCQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9FLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLCtCQUErQixFQUFFO1FBQ2xDLGtCQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUzQixPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUzQixnQkFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDM0UsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dmVyaWZ5Tm9Ccm93c2VyRXJyb3JzLCBicm93c2VyfSBmcm9tICdhbmd1bGFyMi9zcmMvdGVzdGluZy9lMmVfdXRpbCc7XG5pbXBvcnQge2V4cGVjdH0gZnJvbSAnYW5ndWxhcjIvdGVzdGluZyc7XG5cbmZ1bmN0aW9uIHdhaXRGb3JFbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpIHtcbiAgdmFyIEVDID0gKDxhbnk+cHJvdHJhY3RvcikuRXhwZWN0ZWRDb25kaXRpb25zO1xuICAvLyBXYWl0cyBmb3IgdGhlIGVsZW1lbnQgd2l0aCBpZCAnYWJjJyB0byBiZSBwcmVzZW50IG9uIHRoZSBkb20uXG4gIGJyb3dzZXIud2FpdChFQy5wcmVzZW5jZU9mKCQoc2VsZWN0b3IpKSwgMjAwMDApO1xufVxuXG5kZXNjcmliZSgncmV1c2UgZXhhbXBsZSBhcHAnLCBmdW5jdGlvbigpIHtcblxuICBhZnRlckVhY2godmVyaWZ5Tm9Ccm93c2VyRXJyb3JzKTtcblxuICB2YXIgVVJMID0gJ2FuZ3VsYXIyL2V4YW1wbGVzL3JvdXRlci90cy9jYW5fYWN0aXZhdGUvJztcblxuICBpdCgnc2hvdWxkIG5hdmlnYXRlIHRvIHVzZXIgMScsIGZ1bmN0aW9uKCkge1xuICAgIGJyb3dzZXIuZ2V0KFVSTCk7XG4gICAgd2FpdEZvckVsZW1lbnQoJ2hvbWUtY21wJyk7XG5cbiAgICBlbGVtZW50KGJ5LmNzcygnI3VzZXItMS1saW5rJykpLmNsaWNrKCk7XG4gICAgd2FpdEZvckVsZW1lbnQoJ2NvbnRyb2wtcGFuZWwtY21wJyk7XG4gICAgZXhwZWN0KGJyb3dzZXIuZ2V0Q3VycmVudFVybCgpKS50b01hdGNoKC9cXC91c2VyLXNldHRpbmdzXFwvMSQvKTtcblxuICAgIGV4cGVjdChlbGVtZW50KGJ5LmNzcygnY29udHJvbC1wYW5lbC1jbXAnKSkuZ2V0VGV4dCgpKS50b0NvbnRhaW4oJ1NldHRpbmdzJyk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgbm90IG5hdmlnYXRlIHRvIHVzZXIgMicsIGZ1bmN0aW9uKCkge1xuICAgIGJyb3dzZXIuZ2V0KFVSTCk7XG4gICAgd2FpdEZvckVsZW1lbnQoJ2hvbWUtY21wJyk7XG5cbiAgICBlbGVtZW50KGJ5LmNzcygnI3VzZXItMi1saW5rJykpLmNsaWNrKCk7XG4gICAgd2FpdEZvckVsZW1lbnQoJ2hvbWUtY21wJyk7XG5cbiAgICBleHBlY3QoZWxlbWVudChieS5jc3MoJ2hvbWUtY21wJykpLmdldFRleHQoKSkudG9Db250YWluKCdXZWxjb21lIEhvbWUhJyk7XG4gIH0pO1xufSk7XG4iXX0=