export interface iSeaCreatures {
    name: string;
    icon: {
        local: string,
        remote: string
    },
    price: number,
    shadow_size: string,
    shadow_movement: string,
    time: {
        all_day: boolean,
        hours: {
            initial: string|number,
            finish: string|number
        }
    },
    months: {
        north: boolean[],
        south: boolean[]
    },
    catch: boolean,
    donated: boolean
}