const domget = ( container:Element ) => {

    const text = ( select:string ):string[] => {
        const items_node:NodeListOf<Element> = container.querySelectorAll( select );
        let items_array:string[] = [];
        items_node.forEach((item:Element):void => {
            items_array.push(item.textContent.trim());
        }, [items_array]);
        return items_array;
    }

    const number = ( select:string ):number[] => {
        const items_node:NodeListOf<Element> = container.querySelectorAll( select );
        let items_array: number[] = [];
        items_node.forEach((item:Element):void => {
            items_array.push(Number.parseInt(item.getAttribute('data-sort-value')));
        }, [items_array])
        return items_array;
    }

    const image = ( select:string ):string[] => {
        let items_array:string[] = [];
        const items_node:NodeListOf<Element> = container.querySelectorAll( select );
        items_node.forEach((item:Element):void => {
            items_array.push(item.getAttribute('src'));
        }, [items_array]);
        return items_array;
    }

    const node = ( select:string ):NodeListOf<Element> => {
        const items_node:NodeListOf<Element> = container.querySelectorAll( select );
        return items_node;
    }

    return { text, number, image, node };
}

export { domget };