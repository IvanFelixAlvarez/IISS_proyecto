/*jslint node: true */
/*global require */
/*global browser: true */
/*global describe */
/*global it */
var Zombie = require('zombie'),
    assert = require('assert');

browser = new Zombie();

describe('Visitas', function () {
    'use strict';

    it("Debería cargar la página principal de nodenotas", function () {
        browser.visit("http://nodenotas.herokuapp.com");
        assert.equal(browser.location.pathname, "/");
    });

    it("Debería cargar la página contacto de nodenotas", function () {
        browser.visit("http://nodenotas.herokuapp.com/contacto");
        assert.equal(browser.location.pathname, "/contacto");
    });

    it("Debería cargar la página ayuda de nodenotas", function () {
        browser.visit("http://nodenotas.herokuapp.com/ayuda");
        assert.equal(browser.location.pathname, "/ayuda");
    });

});
