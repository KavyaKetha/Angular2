'use strict';/**
 * @module
 * @description
 * The `di` module provides dependency injection container services.
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var metadata_1 = require('./di/metadata');
exports.InjectMetadata = metadata_1.InjectMetadata;
exports.OptionalMetadata = metadata_1.OptionalMetadata;
exports.InjectableMetadata = metadata_1.InjectableMetadata;
exports.SelfMetadata = metadata_1.SelfMetadata;
exports.HostMetadata = metadata_1.HostMetadata;
exports.SkipSelfMetadata = metadata_1.SkipSelfMetadata;
exports.DependencyMetadata = metadata_1.DependencyMetadata;
// we have to reexport * because Dart and TS export two different sets of types
__export(require('./di/decorators'));
var forward_ref_1 = require('./di/forward_ref');
exports.forwardRef = forward_ref_1.forwardRef;
exports.resolveForwardRef = forward_ref_1.resolveForwardRef;
var injector_1 = require('./di/injector');
exports.Injector = injector_1.Injector;
var provider_1 = require('./di/provider');
exports.Binding = provider_1.Binding;
exports.ProviderBuilder = provider_1.ProviderBuilder;
exports.ResolvedFactory = provider_1.ResolvedFactory;
exports.Dependency = provider_1.Dependency;
exports.bind = provider_1.bind;
exports.Provider = provider_1.Provider;
exports.provide = provider_1.provide;
var key_1 = require('./di/key');
exports.Key = key_1.Key;
var exceptions_1 = require('./di/exceptions');
exports.NoProviderError = exceptions_1.NoProviderError;
exports.AbstractProviderError = exceptions_1.AbstractProviderError;
exports.CyclicDependencyError = exceptions_1.CyclicDependencyError;
exports.InstantiationError = exceptions_1.InstantiationError;
exports.InvalidProviderError = exceptions_1.InvalidProviderError;
exports.NoAnnotationError = exceptions_1.NoAnnotationError;
exports.OutOfBoundsError = exceptions_1.OutOfBoundsError;
var opaque_token_1 = require('./di/opaque_token');
exports.OpaqueToken = opaque_token_1.OpaqueToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLWpha1huTW1MLnRtcC9hbmd1bGFyMi9zcmMvY29yZS9kaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOzs7OztBQUVILHlCQVFPLGVBQWUsQ0FBQztBQVByQixtREFBYztBQUNkLHVEQUFnQjtBQUNoQiwyREFBa0I7QUFDbEIsK0NBQVk7QUFDWiwrQ0FBWTtBQUNaLHVEQUFnQjtBQUNoQiwyREFDcUI7QUFFdkIsK0VBQStFO0FBQy9FLGlCQUFjLGlCQUFpQixDQUFDLEVBQUE7QUFFaEMsNEJBQTBELGtCQUFrQixDQUFDO0FBQXJFLDhDQUFVO0FBQUUsNERBQXlEO0FBQzdFLHlCQUF1QixlQUFlLENBQUM7QUFBL0IsdUNBQStCO0FBQ3ZDLHlCQVdPLGVBQWUsQ0FBQztBQVZyQixxQ0FBTztBQUNQLHFEQUFlO0FBRWYscURBQWU7QUFDZiwyQ0FBVTtBQUNWLCtCQUFJO0FBRUosdUNBQVE7QUFFUixxQ0FDcUI7QUFDdkIsb0JBQWtCLFVBQVUsQ0FBQztBQUFyQix3QkFBcUI7QUFDN0IsMkJBUU8saUJBQWlCLENBQUM7QUFQdkIsdURBQWU7QUFDZixtRUFBcUI7QUFDckIsbUVBQXFCO0FBQ3JCLDZEQUFrQjtBQUNsQixpRUFBb0I7QUFDcEIsMkRBQWlCO0FBQ2pCLHlEQUN1QjtBQUN6Qiw2QkFBMEIsbUJBQW1CLENBQUM7QUFBdEMsaURBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoZSBgZGlgIG1vZHVsZSBwcm92aWRlcyBkZXBlbmRlbmN5IGluamVjdGlvbiBjb250YWluZXIgc2VydmljZXMuXG4gKi9cblxuZXhwb3J0IHtcbiAgSW5qZWN0TWV0YWRhdGEsXG4gIE9wdGlvbmFsTWV0YWRhdGEsXG4gIEluamVjdGFibGVNZXRhZGF0YSxcbiAgU2VsZk1ldGFkYXRhLFxuICBIb3N0TWV0YWRhdGEsXG4gIFNraXBTZWxmTWV0YWRhdGEsXG4gIERlcGVuZGVuY3lNZXRhZGF0YVxufSBmcm9tICcuL2RpL21ldGFkYXRhJztcblxuLy8gd2UgaGF2ZSB0byByZWV4cG9ydCAqIGJlY2F1c2UgRGFydCBhbmQgVFMgZXhwb3J0IHR3byBkaWZmZXJlbnQgc2V0cyBvZiB0eXBlc1xuZXhwb3J0ICogZnJvbSAnLi9kaS9kZWNvcmF0b3JzJztcblxuZXhwb3J0IHtmb3J3YXJkUmVmLCByZXNvbHZlRm9yd2FyZFJlZiwgRm9yd2FyZFJlZkZufSBmcm9tICcuL2RpL2ZvcndhcmRfcmVmJztcbmV4cG9ydCB7SW5qZWN0b3J9IGZyb20gJy4vZGkvaW5qZWN0b3InO1xuZXhwb3J0IHtcbiAgQmluZGluZyxcbiAgUHJvdmlkZXJCdWlsZGVyLFxuICBSZXNvbHZlZEJpbmRpbmcsXG4gIFJlc29sdmVkRmFjdG9yeSxcbiAgRGVwZW5kZW5jeSxcbiAgYmluZCxcblxuICBQcm92aWRlcixcbiAgUmVzb2x2ZWRQcm92aWRlcixcbiAgcHJvdmlkZVxufSBmcm9tICcuL2RpL3Byb3ZpZGVyJztcbmV4cG9ydCB7S2V5fSBmcm9tICcuL2RpL2tleSc7XG5leHBvcnQge1xuICBOb1Byb3ZpZGVyRXJyb3IsXG4gIEFic3RyYWN0UHJvdmlkZXJFcnJvcixcbiAgQ3ljbGljRGVwZW5kZW5jeUVycm9yLFxuICBJbnN0YW50aWF0aW9uRXJyb3IsXG4gIEludmFsaWRQcm92aWRlckVycm9yLFxuICBOb0Fubm90YXRpb25FcnJvcixcbiAgT3V0T2ZCb3VuZHNFcnJvclxufSBmcm9tICcuL2RpL2V4Y2VwdGlvbnMnO1xuZXhwb3J0IHtPcGFxdWVUb2tlbn0gZnJvbSAnLi9kaS9vcGFxdWVfdG9rZW4nO1xuIl19