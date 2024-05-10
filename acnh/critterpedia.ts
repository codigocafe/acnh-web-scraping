import parse from "node-html-parser";

export const catch_html = async ( page_url:string ) => {
    const response_html:Response = await fetch(page_url, {method: 'GET'});
    const html:string = await response_html.text();
    const document_parsed:HTMLElement | any = parse(html);
    return document_parsed;
}

export const get_months = ( list:NodeListOf<Element>, condition_truthy:string ):[boolean[]] => {
    const response:[boolean[]] = [[]];
    list.forEach((item:Element, index:number) => {
        const actived_months_by_fish:boolean[] = [];
        item.querySelectorAll('span').forEach((month:HTMLElement):void => {
            const actived_month:boolean = ( month.getAttribute('style').indexOf(condition_truthy) > -1 );
            actived_months_by_fish.push(actived_month);
        });
        response[index] = actived_months_by_fish;
    });
    return response;
}