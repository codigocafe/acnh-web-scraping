const fs = require('node:fs');
const fsp = require('node:fs/promises');
const { Buffer } = require('node:buffer');

const _to_slug = ( text ) => {
    return text
        .toLowerCase()
        .replace(/ /g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g,'')
        .replace(/ç/g, 'c');
}

const _get_extension = (image) => {
    const fragment = image.split('.');
    const total = fragment.length - 1;
    return fragment[total];
}

const _make_directory = ( path_name ) => {
    return fs.mkdir(path_name, { recursive: true}, (err, path) => {
        if(err)
            console.log(err);
    })
}

const save_json = (path_file, name_file, data) => {
    _make_directory(path_file);
    fs.writeFile(`${path_file}/${name_file}`, JSON.stringify(data, null, 4), 'utf-8', (err) => {
        if(err)
            return false;
    });
    return true
}

const save_image = (path, name, buffer) => {
    name = _to_slug(name);
    _make_directory(path)
    const file = fs.writeFile(`${path}/${name}.png`, Buffer.from(buffer), (err) => {});
    return `${path}/${name}.png`;
}

module.exports = { save_json, save_image, _to_slug };