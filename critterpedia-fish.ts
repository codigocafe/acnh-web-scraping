import {get_extension, print_log_message, to_slug} from "./acnh/utils";
import { domget } from "./acnh/dom";
import {iFish} from "./interfaces/fish";
import {save_image, save_json} from "./acnh/files";
import { catch_html, get_months } from "./acnh/critterpedia";

let benchmark_start:number = 0;
let benchmark_end:number = 0;

const init = async () => {

    benchmark_start = performance.now();
    const page_url:string = 'https://nookipedia.com/wiki/Fish/New_Horizons';
    const document_parsed:HTMLElement = await catch_html(page_url);
    benchmark_end = performance.now();
    console.log(print_log_message("Run 1: Capturando do HTML.", (benchmark_end - benchmark_start)));

    benchmark_start = performance.now();
    const content_wrapper:Element = document_parsed.querySelector('#mw-content-text .tabletop table tbody');
    const names:string[] = domget(content_wrapper).text('tr > td:nth-child(2)');
    const icons:string[] = domget(content_wrapper).image('tr > td:nth-child(3) > a > img');
    const prices:number[] = domget(content_wrapper).number('tr > td:nth-child(4)');
    const shadow_sizes:string[] = domget(content_wrapper).text('tr > td:nth-child(5)');
    const locations:string[] = domget(content_wrapper).text('tr > td:nth-child(6)');
    const times:string[] = domget(content_wrapper).text('tr > td:nth-child(7)');
    const wrapper_north_months:NodeListOf<Element> = domget(content_wrapper).node('tr > td:nth-child(8) > span');
    const wrapper_south_months:NodeListOf<Element> = domget(content_wrapper).node('tr > td:nth-child(8) > p > span');
    const north_months:[boolean[]] = get_months(wrapper_north_months, '#50b3d4');
    const south_months:[boolean[]] = get_months(wrapper_south_months, '#50b3d4');
    benchmark_end = performance.now()
    console.log(print_log_message("Run 2: Identificação das informações.", (benchmark_end - benchmark_start)))


    benchmark_start = performance.now();
    const fish:iFish[] = names.map((value:string, index:number):iFish => {
        const all_day:boolean = (times[index] === 'All day');
        const local_file_name:string = `${to_slug(names[index])}.${get_extension(icons[index])}`;
        return {
            name: names[index],
            price: prices[index],
            icon: {
                local: `/files/fish/${local_file_name}`,
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
    console.log(print_log_message('Run 3: Manipulação do DOM.',(benchmark_end - benchmark_start)))


    benchmark_start = performance.now();
    const file_saved:boolean = await save_json('./files', 'critterpedia-fish.json', fish);
    benchmark_end = performance.now();
    console.log(print_log_message('Run 4: Salvar arquivo JSON.', (benchmark_end - benchmark_start)))


    benchmark_start = performance.now();
    fish.map( async (fish:iFish):Promise<void> => {
        const response_image = await fetch(fish.icon.remote, {method: 'GET'});
        const buffer_image = await response_image.arrayBuffer();
        const file_name = `${to_slug(fish.name)}.${get_extension(fish.icon.remote)}`;
        await save_image('./files/fish', file_name, buffer_image );
    });
    benchmark_end = performance.now();
    console.log(print_log_message('Run 4: Salvar arquivos de Imagem.', (benchmark_end - benchmark_start)))

}
init()