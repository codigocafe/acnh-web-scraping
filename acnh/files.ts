import {iFish} from "../interfaces/fish";
import { mkdir, writeFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

export const _make_directory = async ( path_name:string ) => {
    const created_dir:string = await mkdir(path_name, { recursive: true} );
    return created_dir;
}

export const save_json = async (path_file:string, name_file:string, data:iFish[]) => {
    const directory:string = await _make_directory(path_file);
    const written:boolean = (await writeFile(`${directory}/${name_file}`, JSON.stringify(data, null, 4), {encoding: 'utf-8'}) === undefined) ? true : false;
    return written;
}

export const save_image = async (path:string, name:string, buffer:ArrayBuffer) => {
    const written:boolean = (await writeFile(`${path}/${name}`, Buffer.from(buffer)) === undefined) ? true : false;
    return written;
}