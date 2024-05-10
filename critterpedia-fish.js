"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./acnh/utils");
var dom_1 = require("./acnh/dom");
var files_1 = require("./acnh/files");
var critterpedia_1 = require("./acnh/critterpedia");
var benchmark_start = 0;
var benchmark_end = 0;
var init = function () { return __awaiter(void 0, void 0, void 0, function () {
    var page_url, document_parsed, content_wrapper, names, icons, prices, shadow_sizes, locations, times, wrapper_north_months, wrapper_south_months, north_months, south_months, fish, file_saved;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                benchmark_start = performance.now();
                page_url = 'https://nookipedia.com/wiki/Fish/New_Horizons';
                return [4 /*yield*/, (0, critterpedia_1.catch_html)(page_url)];
            case 1:
                document_parsed = _a.sent();
                benchmark_end = performance.now();
                console.log((0, utils_1.print_log_message)("Run 1: Capturando do HTML.", (benchmark_end - benchmark_start)));
                benchmark_start = performance.now();
                content_wrapper = document_parsed.querySelector('#mw-content-text .tabletop table tbody');
                names = (0, dom_1.domget)(content_wrapper).text('tr > td:nth-child(2)');
                icons = (0, dom_1.domget)(content_wrapper).image('tr > td:nth-child(3) > a > img');
                prices = (0, dom_1.domget)(content_wrapper).number('tr > td:nth-child(4)');
                shadow_sizes = (0, dom_1.domget)(content_wrapper).text('tr > td:nth-child(5)');
                locations = (0, dom_1.domget)(content_wrapper).text('tr > td:nth-child(6)');
                times = (0, dom_1.domget)(content_wrapper).text('tr > td:nth-child(7)');
                wrapper_north_months = (0, dom_1.domget)(content_wrapper).node('tr > td:nth-child(8) > span');
                wrapper_south_months = (0, dom_1.domget)(content_wrapper).node('tr > td:nth-child(8) > p > span');
                north_months = (0, critterpedia_1.get_months)(wrapper_north_months, '#50b3d4');
                south_months = (0, critterpedia_1.get_months)(wrapper_south_months, '#50b3d4');
                benchmark_end = performance.now();
                console.log((0, utils_1.print_log_message)("Run 2: Identificação das informações.", (benchmark_end - benchmark_start)));
                benchmark_start = performance.now();
                fish = names.map(function (value, index) {
                    var all_day = (times[index] === 'All day');
                    var local_file_name = "".concat((0, utils_1.to_slug)(names[index]), ".").concat((0, utils_1.get_extension)(icons[index]));
                    return {
                        name: names[index],
                        price: prices[index],
                        icon: {
                            local: "/files/fish/".concat(local_file_name),
                            remote: icons[index]
                        },
                        shadow_size: shadow_sizes[index],
                        location: locations[index],
                        time: {
                            all_day: all_day,
                            hours: {
                                initial: (!all_day) ? times[index].split(' – ')[0] : 0,
                                finish: (!all_day) ? times[index].split(' – ')[1] : 0
                            }
                        },
                        months: {
                            north: north_months[index],
                            south: south_months[index]
                        },
                        catch: false,
                        donated: false
                    };
                });
                benchmark_end = performance.now();
                console.log((0, utils_1.print_log_message)('Run 3: Manipulação do DOM.', (benchmark_end - benchmark_start)));
                benchmark_start = performance.now();
                return [4 /*yield*/, (0, files_1.save_json)('./files', 'critterpedia-fish.json', fish)];
            case 2:
                file_saved = _a.sent();
                benchmark_end = performance.now();
                console.log((0, utils_1.print_log_message)('Run 4: Salvar arquivo JSON.', (benchmark_end - benchmark_start)));
                benchmark_start = performance.now();
                fish.map(function (fish) { return __awaiter(void 0, void 0, void 0, function () {
                    var response_image, buffer_image, file_name;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch(fish.icon.remote, { method: 'GET' })];
                            case 1:
                                response_image = _a.sent();
                                return [4 /*yield*/, response_image.arrayBuffer()];
                            case 2:
                                buffer_image = _a.sent();
                                file_name = "".concat((0, utils_1.to_slug)(fish.name), ".").concat((0, utils_1.get_extension)(fish.icon.remote));
                                return [4 /*yield*/, (0, files_1.save_image)('./files/fish', file_name, buffer_image)];
                            case 3:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                benchmark_end = performance.now();
                console.log((0, utils_1.print_log_message)('Run 4: Salvar arquivos de Imagem.', (benchmark_end - benchmark_start)));
                return [2 /*return*/];
        }
    });
}); };
init();
