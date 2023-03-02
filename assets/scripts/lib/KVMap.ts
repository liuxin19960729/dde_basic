
type KeyType = string | symbol | number;
export default class KVMap<K extends (KeyType | Object), V>{
    protected _map: { [key: KeyType]: V } = {};
    protected _ks: K[] = [];
    protected _vs: V[] = [];

    get(key: K): V {
        return this._map[this._getKey(key)];
    }

    has(key: K): boolean {
        return !!this._map[this._getKey(key)];
    }

    delete(key: K): boolean {
        if (!this.has(key)) return false;
        delete this._map[this._getKey(key)];
        let index = this._ks.findIndex(k => k == key);
        this._ks.splice(index, 1);
        this._vs.splice(index, 1);
    }

    set(key: K, value: V): this {
        if (!this.has(key)) {
            this._map[this._getKey(key)] = value;
            this._ks.push(key);
            this._vs.push(value);
        }
        return this;
    }



    clear() {
        this._map = {};
        this._ks = [];
        this._vs = [];
    }

    keys() {
        return this._ks.slice();
    }

    values() {
        return this._vs.slice();
    }

    forEach(callbackfn: (value: V, key: K, map: KVMap<K, V>) => void, thisArg?: any) {
        const keys = this._ks.slice();
        const values = this._vs.slice();
        if (!!thisArg) callbackfn.bind(thisArg);
        keys.forEach((k, i) => {
            callbackfn(values[i], k, this);
        })
    }

    protected size() {
        return this._ks.length;
    }


    protected _getKey(key: K): KeyType {
        if (typeof key == "object" || typeof key == "function") {
            return (<Object>key).$$uniqueId;
        }

        return key;
    }
}

