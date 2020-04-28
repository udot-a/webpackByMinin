import * as $ from "jquery";

function createAnalitics(): object {
    let counter = 0;
    let isDestroyed: boolean = false;

    const listener = ():number => counter++;

    $(document).on('click', listener);

    return {
        destroy() {
            $(document).off('click', listener);
            isDestroyed = true;
        },

        getClicks() {
            if (isDestroyed) {
                return "Analitics is destroyed"
            }
            return counter;
        }
    }
}

window["analitics"] = createAnalitics();