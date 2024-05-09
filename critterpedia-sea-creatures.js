// TODO aplicar TypeScript
// TODO criar teste em Jest
// TODO aplicar algum design partterns
// TODO converter CommonJS para ECMAScript

const HTMLParse = require('node-html-parser');
const acnh = require('./acnh/files');
const acnh_util = require('./acnh/utils');
const {save_image, _to_slug} = require("./acnh/files");

console.log("Captura de informações - Critterpedia Sea Creatures.")
let benchmark_start = 0;
let benchmark_end = 0;
let creatures_datas = [];

const init = async () => {
    try{
        benchmark_start = performance.now();
        const pageUrl = 'https://nookipedia.com/wiki/Sea_creature/New_Horizons';
        const responseHtml = await fetch(pageUrl, {method: 'GET'});
        const html = await responseHtml.text();
        const document = HTMLParse.parse(html, {
            blockTextElements: {
                script: false,
                noscript: false,
                style: false,
                pre: false
            }
        });
        benchmark_end = performance.now();
        acnh_util.print_log_message("Run 1: Capturando HTML", (benchmark_end - benchmark_start));

        benchmark_start = performance.now();
        const content_wrapper = document.querySelector('#mw-content-text .tabletop table tbody');

        const names = content_wrapper.querySelectorAll('tr > td:nth-child(2)').map((column) => column.textContent.trim() );
        const prices = content_wrapper.querySelectorAll('tr > td:nth-child(4)').map((column) => column.textContent.replace('Bells', '').trim() );
        const icons = content_wrapper.querySelectorAll('tr > td:nth-child(3) > a > img').map((column) => column.getAttribute('src') );
        const shadow_size = content_wrapper.querySelectorAll('tr > td:nth-child(5)').map((column) => column.textContent.trim() );
        const shadow_moviment = content_wrapper.querySelectorAll('tr > td:nth-child(6)').map((column) => column.textContent.trim() );
        const times = content_wrapper.querySelectorAll('tr > td:nth-child(7)').map((column) => column.textContent.trim() );
        const wrapper_north_months = content_wrapper.querySelectorAll('tr > td:nth-child(8) > span');
        const wrapper_south_months = content_wrapper.querySelectorAll('tr > td:nth-child(8) > p > span');

        creatures_datas = names.map( (creature_name, index) => {
            const is_all_day = (times[index] === 'All day') ? true : false;
            const initial_hours = (is_all_day) ? 0 : times[index].split(' – ')[0];
            const finish_hours = (is_all_day) ? 0 : times[index].split(' – ')[1];
            const north_months = wrapper_north_months[index].querySelectorAll('span').map((month) => month.getAttribute('style').indexOf('color: #50b3d4') > -1 ? true : false);
            const south_months = wrapper_south_months[index].querySelectorAll('span').map((month) => month.getAttribute('style').indexOf('color: #50b3d4') > -1 ? true : false);
            return {
                name: creature_name,
                price: prices[index],
                icon: {
                    local: `./files/sea_creatures/${_to_slug(creature_name)}.png`,
                    remote: icons[index]
                },
                shadow: {
                    size: shadow_size[index],
                    moviment: shadow_moviment[index]
                },
                time: {
                    all_day: is_all_day,
                    hours: {
                        initial: initial_hours,
                        finish: finish_hours
                    }
                },
                months: {
                    north: north_months,
                    south: south_months
                },
                catch: false,
                donated: false
            };
        });
        benchmark_end = performance.now();
        acnh_util.print_log_message('Run 2: Informações selecionadas do HTML',(benchmark_end - benchmark_start));

        benchmark_start = performance.now();
        acnh.save_json('./files', 'critterpedia.sea.creatures.json', creatures_datas);
        benchmark_end = performance.now();
        acnh_util.print_log_message('Run 3: JSON salvo no arquivo critterpedia.sea.creatures.json', (benchmark_end - benchmark_start))

    }catch (error){
        console.log(`Error: [${error}]`);
    }

}
init().then(() => {
    console.log();
    console.log('Salvar inmagens - Critterpedia Sea Creatures.');
    benchmark_start = performance.now();
    creatures_datas.map( async (creature) => {
        const image_response = await fetch(creature.icon.remote, {method: 'GET'});
        const image_buffer = await image_response.arrayBuffer();
        const image_path = save_image('./files/sea_creatures', creature.name, image_buffer);
    });
    benchmark_end = performance.now();
    acnh_util.print_log_message('Run 4: Arquivos salvos', (benchmark_end - benchmark_start));

    console.log();
    console.log('Task finished.');
}).catch((error) => console.log('Has error.' + error))