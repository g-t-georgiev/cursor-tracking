let _state;
let _initialized = false;

/**
 * @param {any} init 
 * @returns 
 */
export function useState(init) {
    function dispatch(value) {
        _state = value;
    }

    function get() {
        return _state;
    }

    if (!_initialized) {
        _initialized = true;
        dispatch(init);
    }

    return [get, dispatch];
}