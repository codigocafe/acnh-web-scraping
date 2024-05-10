export interface iFish {
    name:string,
    price:number,
    icon: {
        local:string,
        remote:string
    },
    shadow_size:string,
    location:string,
    time: {
        all_day:boolean,
        hours: {
            initial:string|number,
            finish:string|number
        }
    },
    months: {
        north: boolean[],
        south: boolean[]
    },
    catch:boolean,
    donated:boolean
}