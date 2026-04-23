class MyEventEmitter {
    constructor() {
        this.listeners = {};
    }

    on(event, cb) {
        if (!this.listeners[event]) {
        this.listeners[event] = new Array();
        }
        this.listeners[event].push(cb);
    }
    off(event, cb) {
        if (!this.listeners[event]) {
        console.error("there is no such event registered");
        return;
        }
        const index = this.listeners[event].findIndex(
        (listener) => listener === cb,
        );

        if (index > -1) {
        this.listeners[event].splice(index, 1);
        if (this.listeners[event].length === 0) {
            delete this.listeners[event];
        }
        } else {
        console.error("error");
        }
    }
    emit(event, ...args) {
        if (!this.listeners[event]) {
        console.error("there is no such event registered");
        return;
        }
        
        const cbs = [...this.listeners[event]]; 
        cbs.forEach(cb => cb(...args));
    }
    once(event, cb){
        const wrapper=(...args)=>{
            cb(...args)
            this.off(event, wrapper)
        }
        this.on(event, wrapper)
    }
    
}

const emitter = new MyEventEmitter();

console.log("\n--- 1. BASIC ON + EMIT ---");
emitter.on("click", () => console.log("A"));
emitter.on("click", () => console.log("B"));
emitter.emit("click");


console.log("\n--- 2. OFF ---");
function handler() {
    console.log("C");
}
emitter.on("click2", handler);
emitter.emit("click2");
emitter.off("click2", handler);
emitter.emit("click2");


console.log("\n--- 3. ONCE ---");
emitter.once("onceEvent", () => console.log("ONCE ONLY"));
emitter.emit("onceEvent");
emitter.emit("onceEvent");


console.log("\n--- 4. ON + ONCE MIX ---");
emitter.on("mix", () => console.log("A"));
emitter.once("mix", () => console.log("B"));
emitter.on("mix", () => console.log("C"));
emitter.emit("mix");
emitter.emit("mix");


console.log("\n--- 5. ARGUMENTS ---");
emitter.on("sum", (a, b) => console.log("sum:", a + b));
emitter.emit("sum", 5, 7);


console.log("\n--- 6. MULTIPLE EVENTS ---");
emitter.on("login", () => console.log("login event"));
emitter.on("logout", () => console.log("logout event"));
emitter.emit("login");
emitter.emit("logout");


console.log("\n--- 7. MULTIPLE ONCE LISTENERS ---");
emitter.once("tick", () => console.log("tick 1"));
emitter.once("tick", () => console.log("tick 2"));
emitter.emit("tick");
emitter.emit("tick");


console.log("\n--- 8. OFF WRONG FUNCTION (edge case) ---");
emitter.on("test", () => console.log("X"));
emitter.off("test", () => console.log("X")); 
emitter.emit("test");
