"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_extension = exports.to_slug = exports.print_log_message = exports.__repeat = void 0;
var __repeat = function (character, quantity) {
    var response = '';
    response = character.repeat(quantity);
    return response;
};
exports.__repeat = __repeat;
var print_log_message = function (text, time) {
    var characters_in_line = 70, characters_to_remove = text.length + time.toFixed(2).toString().length + 4, characters_total_in_line = characters_in_line - characters_to_remove;
    var character = '.';
    return "".concat(text, " ").concat((0, exports.__repeat)(character, characters_total_in_line), " ").concat(time.toFixed(2), "ms");
};
exports.print_log_message = print_log_message;
var to_slug = function (text) {
    var slug = text
        .toLowerCase()
        .replace(/\./g, '')
        .replace(/ /g, '-')
        .replace(/ç/g, 'c')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    return slug;
};
exports.to_slug = to_slug;
var get_extension = function (image) {
    var fragment = image.split('.');
    var total = fragment.length - 1;
    return fragment[total];
};
exports.get_extension = get_extension;
