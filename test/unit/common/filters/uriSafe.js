describe('The pretty filter', function () {
    'use strict';

    var filter;

    beforeEach(function () {
        module('###CHANGE_THIS_TO_ANGULAR_APP_NAME###');
        inject(function ($injector) {
            filter = $injector.get('$filter')('uriSafe');
        });
    });

    it('should return a URI Safe version of the strings characters', function () {
        var input = 'hello world&everyobdy+in/it';
        var result = filter(input);
        expect(result).toEqual('hello%20world%26everyobdy%2Bin%2Fit');
    });
});
