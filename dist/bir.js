import assert from 'assert';
import * as template from './templates/index.js';
import { unsoap, parse } from './extract.js';
import { query } from './client.js';
import { BirError } from './error.js';
/**
 * Class Bir provides access to REGON API
 *
 * @example Create a new Bir instance
 * ```js
 *   import Bir from 'bir1'
 *   const bir = new Bir()
 *   console.log(await bir.search({ nip: '5261040567' }))
 *   // output:
 *   // {
 *   //   regon: '011417295',
 *   //   nip: '5261040567',
 *   //   statusNip: '',
 *   //   nazwa: 'T-MOBILE POLSKA SPÓŁKA AKCYJNA',
 *   //   ...
 *   // }
 * ```
 */
export default class Bir {
    /**
     * Create a new Bir instance
     *
     * @remarks
     * If `options.key` is not provided, the internally stored public API key
     * is used to access non-production GUS database. It allows quick start,
     * however non-production database contains old and anonymized data.
     * Providing GUS provided key connects to the production database.
     */
    constructor(options = {}) {
        this.key = options.key || 'abcde12345abcde12345';
        this.prod = options.key ? true : false;
        this._normalizeFn = options.normalizeFn;
    }
    normalize(obj) {
        return this._normalizeFn ? this._normalizeFn(obj) : obj;
    }
    async api(options) {
        if (this.sid) {
            options.headers = { ...options.headers, sid: this.sid };
        }
        return query(this.prod, options);
    }
    /**
     * Login to the API (method: Zaloguj)
     *
     * After successful login, the session id (`sid`) is stored in the
     * instance and used in subsequent requests.
     *
     * @remarks
     * This method must be called before any other method. It is called
     * automatically before other requests if the session id (`sid`) is
     * `undefined`.
     */
    async login() {
        assert(this.key, new BirError('No api key provided'));
        const body = template.Zaloguj({ key: this.key });
        const response = await this.api({ body });
        const sid = unsoap(response);
        assert(sid, new BirError('Login failed, no session found'));
        this.sid = sid;
    }
    /**
     * Automatically login to the API if not already logged in.
     */
    async autologin() {
        if (!this.sid) {
            await this.login();
        }
    }
    /**
     * Get diagnostic information (method: GetValue)
     * @param value value to retrieve
     */
    async value(value) {
        await this.autologin();
        const body = template.GetValue({ value });
        const response = await this.api({ body });
        return unsoap(response);
    }
    /**
     * Search (method: DaneSzukajPodmioty)
     * @param query
     * @param query.nip NIP number
     * @param query.regon REGON number
     * @param query.krs KRS number
     *
     * @remarks
     * Only one of the query parameters can be used at a time.
     */
    async search(query) {
        await this.autologin();
        const body = template.DaneSzukajPodmioty(query);
        const response = await this.api({ body });
        return this.normalize(parse(unsoap(response)));
    }
    /**
     * Retrive report (method: DanePobierzPelnyRaport)
     * @param query.regon REGON number
     * @param query.report report name
     */
    async report(query) {
        await this.autologin();
        const body = template.DanePobierzPelnyRaport(query);
        const response = await this.api({ body });
        return this.normalize(parse(unsoap(response)));
    }
    /**
     * Retrive summary report (method: DanePobierzRaportZbiorczy)
     * @param query.date date in format YYYY-MM-DD not earlier than week before
     * @param query.report report name
     */
    async summary(query) {
        await this.autologin();
        const body = template.DanePobierzRaportZbiorczy(query);
        const response = await this.api({ body });
        return this.normalize(parse(unsoap(response)));
    }
    /**
     * Logout (method: Wyloguj)
     */
    async logout() {
        if (!this.sid)
            return;
        const body = template.Wyloguj({ sid: this.sid });
        const response = await this.api({ body });
        unsoap(response);
    }
}
