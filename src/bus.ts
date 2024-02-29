
interface List {
    [key: string | symbol]: Array<Function>
}
class Bus {

    list: List
    constructor() {
        this.list = {}
    }

    emits(name: string | symbol, ...args: unknown[]) {
        try {
            let eventName = this.list[name]
            // console.log(this.list);

            if (eventName === undefined) {
                throw new Error(`并没有任何组件使用${String(name)}`);
            }
            eventName.forEach((fn) => {
                fn.apply(this, args)
            })

        } catch (err: unknown) {
            console.error(err);
        }
    }



    on(name: string | symbol, callback: Function) {

        let fn: Function[] = this.list[name] || []
        fn.push(callback)
        this.list[name] = fn

    }
    log = () => {
        console.log(this);

    }
}
export default new Bus()