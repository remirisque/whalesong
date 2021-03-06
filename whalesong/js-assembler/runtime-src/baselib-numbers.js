/*jslint vars: true, maxerr: 50, indent: 4 */

// Numbers.
/*global jsnums*/
(function (baselib, jsnums) {
    'use strict';
    var exports = {};
    baselib.numbers = exports;



    // Set the numeric tower to raise errors through our mechanism.
    jsnums.onThrowRuntimeError = function(msg, x, y) {
        if (msg === '/: division by zero') {
            baselib.exceptions.raiseDivisionByZeroError(plt.runtime.currentMachine, msg);
        } else {
            baselib.exceptions.raiseContractError(plt.runtime.currentMachine, msg);
        }
    };


    var isNumber = jsnums.isSchemeNumber;
    var isReal = jsnums.isReal;
    var isRational = jsnums.isRational;
    var isComplex = isNumber;
    var isInteger = jsnums.isInteger;


    var isNatural = function (x) {
        return (jsnums.isExact(x) && isInteger(x) 
                && jsnums.greaterThanOrEqual(x, 0));
    };

    var isNonNegativeReal = function (x) {
        return isReal(x) && jsnums.greaterThanOrEqual(x, 0);
    };

    var isByte = function (x) {
        return (isNatural(x) && 
                jsnums.lessThan(x, 256));
    };


    // sign: number -> number
    var sign = function (x) {
        if (jsnums.isInexact(x)) {
            if (jsnums.greaterThan(x, 0)) {
                return jsnums.makeFloat(1);
            } else if (jsnums.lessThan(x, 0)) {
                return jsnums.makeFloat(-1);
            } else {
                return jsnums.makeFloat(0);
            }
        } else {
            if (jsnums.greaterThan(x, 0)) {
                return 1;
            } else if (jsnums.lessThan(x, 0)) {
                return -1;
            } else {
                return 0;
            }
        }
    };




    //////////////////////////////////////////////////////////////////////
    // Exports


    var hasOwnProperty = {}.hasOwnProperty;

    // We first re-export everything in jsnums.
    var prop;
    for (prop in jsnums) {
        if (hasOwnProperty.call(jsnums,prop)) {
            exports[prop] = jsnums[prop];
        }
    }

    exports.isNumber = jsnums.isSchemeNumber;
    exports.isReal = isReal;
    exports.isRational = isRational;
    exports.isComplex = isComplex;
    exports.isInteger = isInteger;
    exports.isNatural = isNatural;
    exports.isByte = isByte;
    exports.isNonNegativeReal = isNonNegativeReal;

    exports.sign = sign;


}(this.plt.baselib, jsnums));