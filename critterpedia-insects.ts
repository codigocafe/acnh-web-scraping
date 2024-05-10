import {get_extension, print_log_message, to_slug} from "./acnh/utils";
import {catch_html, get_months} from "./acnh/critterpedia";
import {domget} from "./acnh/dom";
import {iInsects} from "./interfaces/insects";
import {save_image, save_json} from "./acnh/files";

let benchmark_start:number = 0;
let benchmark_end:number = 0;

const init = async () => {

    benchmark_start = performance.now();
    const page_url:string = 'https://nookipedia.com/wiki/Bug/New_Horizons';
    const document_parsed:HTMLElement = await catch_html(page_url);
    benchmark_end = performance.now();
    console.log(print_log_message('Run 1: Captura do HTML.', (benchmark_end - benchmark_start)));


    benchmark_start = performance.now();
    const container_wrapper = document_parsed.querySelector('#mw-content-text .tabletop table tbody');

    const names:string[] = domget(container_wrapper).text('tr > td:nth-child(2)');
    const icons:string[] = domget(container_wrapper).image('tr > td:nth-child(3) > a > img');
    const prices:number[] = domget(container_wrapper).number('tr > td:nth-child(4)');
    const locations:string[] = domget(container_wrapper).text('tr > td:nth-child(5)');
    const weather:string[] = domget(container_wrapper).text('tr > td:nth-child(6)');
    const times:string[] = domget(container_wrapper).text('tr > td:nth-child(7)');
    const wrapper_north_months:NodeListOf<Element> = domget(container_wrapper).node('tr > td:nth-child(8) > span');
    const wrapper_south_months:NodeListOf<Element> = domget(container_wrapper).node('tr > td:nth-child(8) > p > span');
    const north_months:[boolean[]] = get_months(wrapper_north_months, '#77AC3F');
    const south_months:[boolean[]] = get_months(wrapper_south_months, '#77AC3F');
    benchmark_end = performance.now();
    console.log(print_log_message('Run 2: Indentificação das informações', (benchmark_end - benchmark_start)));


    benchmark_start = performance.now();
    const insects:iInsects[] = names.map((value:string, index:number):iInsects => {
        const local_file_name:string = `${to_slug(names[index])}.${get_extension(icons[index])}`;
        const all_day:boolean = (times[index] === 'All day');
        return {
            name: names[index],
            icon: {
                local: `/files/insects/${local_file_name}`,
                remote: icons[index]
            },
            price: prices[index],
            location: locations[index],
            weather: weather[index],
            time: {
                all_day: all_day,
                hours: {
                    initial: (!all_day) ? times[index].split(' – ')[0] : 0,
                    finish: (!all_day) ? times[index].split(' – ')[1] : 0,
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
    console.log(print_log_message('Run 3: Manipulação do DOM', (benchmark_end - benchmark_start)));


    benchmark_start = performance.now();
    await save_json('./files', 'critterpedia-insects.json', insects)
    benchmark_end = performance.now();
    console.log(print_log_message('Run 4: Salvar arquivo JSON', (benchmark_end - benchmark_start)))


    benchmark_start = performance.now();
    insects.map(async (insect:iInsects) => {
        const response = await fetch(insect.icon.remote, {method: 'GET'});
        const buffer_image = await response.arrayBuffer();
        const file_name = `${to_slug(insect.name)}.${get_extension(insect.icon.remote)}`;
        await save_image('./files/insects', file_name, buffer_image);
    });
    benchmark_end = performance.now();
    console.log(print_log_message('Run 5: Salvar arquivos de Imagem', (benchmark_end - benchmark_start)));
}
init();