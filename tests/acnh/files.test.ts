import {mkdir, writeFile} from "node:fs/promises";
import {_make_directory, save_json, save_image} from "../../acnh/files";
import {iFish} from "../../interfaces/fish";
import {get_extension, to_slug} from "../../acnh/utils";

jest.mock('node:fs/promises', () => {
    const original_module = jest.requireActual('node:fs/promises');
    return {
        __esModule: true,
        ...original_module,
        mkdir: jest.fn((path:string) => path),
        writeFile: jest.fn((file:string, data:string, options:object) => { return undefined; } )
    }
});

describe("Gestão de arquivos", () => {

    test("Criar diretório de arquivos",  async () => {
        const path:string = '/files/fish';
        const res:string = path;
        expect(await _make_directory(path)).toBe(path);
    });

    test("Salvar arquivo JSON", async () => {
        const path:string = '/files';
        const file_name:string = 'critterpedia.fish.json';
        const data:iFish[] = [{
            "name": "Bitterling",
            "price": 900,
            "icon": {
                "local": "./files/fish/bitterling.png",
                "remote": "https://dodo.ac/np/images/thumb/4/4d/Bitterling_NH_Icon.png/64px-Bitterling_NH_Icon.png"
            },
            "shadow_size": "Tiny",
            "location": "River",
            "time": {
                "all_day": true,
                "hours": {
                    "initial": 0,
                    "finish": 0
                }
            },
            "months": {
                "north": [
                    true,
                    true,
                    true,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    true,
                    true
                ],
                "south": [
                    false,
                    false,
                    false,
                    false,
                    true,
                    true,
                    true,
                    true,
                    true,
                    false,
                    false,
                    false
                ]
            },
            "catch": false,
            "donated": false
        }];
        expect(await save_json(path, file_name, data)).toBeTruthy();
    });

    test("Salvar arquivo Imagem", async () => {
        const path:string = '/files/fish';
        const name:string = 'Peixe teste';

        const file_url:string = 'https://dodo.ac/np/images/thumb/4/4d/Bitterling_NH_Icon.png/64px-Bitterling_NH_Icon.png';
        const file_extension:string = get_extension(file_url);
        const file_slug:string = to_slug(name);
        const file_name:string = `${file_slug}.${file_extension}`;

        const response:Response = await fetch(file_url, {method: 'GET'});
        const file_buffer:ArrayBuffer = await response.arrayBuffer();

        expect(save_image(path, file_name, file_buffer)).toBeTruthy();
    });

});