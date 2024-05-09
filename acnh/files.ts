import {iFish} from "../interfaces/fish";
import { mkdir, writeFile, opendir } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

export const _make_directory = async ( path_name:string ):Promise<boolean> => {
    try {
        const created_dir:string = await mkdir(path_name, { recursive: true } );
        return true;
    }catch (err){
        console.log(err);
        return false;
    }
}

export const save_json = async (path_file:string, name_file:string, data:iFish[]) => {
    const directory:boolean = await _make_directory(path_file);
    if(directory){
        await writeFile(`${path_file}/${name_file}`, JSON.stringify(data, null, 4), {encoding: 'utf-8'});
        return true;
    }
    return false;
}

export const save_image = async (path:string, name:string, buffer:ArrayBuffer) => {
    const directory:boolean = await _make_directory(path);
    const written:boolean = (await writeFile(`${path}/${name}`, Buffer.from(buffer)) === undefined) ? true : false;
    return written;
}