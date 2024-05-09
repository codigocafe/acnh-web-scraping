"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.domget = void 0;
var domget = function (container) {
    var text = function (select) {
        var items_node = container.querySelectorAll(select);
        var items_array = [];
        items_node.forEach(function (item) {
            items_array.push(item.textContent.trim());
        }, [items_array]);
        return items_array;
    };
    var number = function (select) {
        var items_node = container.querySelectorAll(select);
        var items_array = [];
        items_node.forEach(function (item) {
            items_array.push(Number.parseInt(item.getAttribute('data-sort-value')));
        }, [items_array]);
        return items_array;
    };
    var image = function (select) {
        var items_array = [];
        var items_node = container.querySelectorAll(select);
        items_node.forEach(function (item) {
            items_array.push(item.getAttribute('src'));
        }, [items_array]);
        return items_array;
    };
    var node = function (select) {
        var items_node = container.querySelectorAll(select);
        return items_node;
    };
    return { text: text, number: number, image: image, node: node };
};
exports.domget = domget;
