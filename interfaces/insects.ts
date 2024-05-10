export interface iInsects
{
    name: string,
    icon: {
        local: string,
        remote: string
    },
    price: number,
    location: string,
    weather: string,
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