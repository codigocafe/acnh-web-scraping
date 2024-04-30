export const __repeat = (character:string, quantity:number):string => {
    let response:string = '';
    response = character.repeat(quantity);
    return response;
}

export const print_log_message = (text:string, time:number):string => {
    const characters_in_line:number = 70,
          characters_to_remove:number = text.length + time.toFixed(2).toString().length + 4,
          characters_total_in_line:number = characters_in_line - characters_to_remove;
    const character:string = '.';
    return `${text} ${__repeat(character, characters_total_in_line)} ${time.toFixed(2)}ms`;
}

export const to_slug = ( text:string ):string => {
    const slug:string = text
        .toLowerCase()
        .replace(/\./g, '')
        .replace(/ /g, '-')
        .replace(/ç/g, 'c')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g,'')
    return slug;
}

export const get_extension = (image:string):string => {
    const fragment:string[] = image.split('.');
    const total:number = fragment.length - 1;
    return fragment[total];
}