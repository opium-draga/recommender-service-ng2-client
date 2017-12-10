import {Injectable, EventEmitter} from '@angular/core';

/**
 * Service for event emmiting for App
 * It provide non-hierarchy dependency relation of Events
 * Credit to https://gist.github.com/sasxa
 */
@Injectable()
export class EmitterService {

	static keys = {
		TOKEN: "TOKEN"
	};

	/**
	 * Event store
	 */
	private static _emitters: {
		[ID: string]: EventEmitter<any>
	} = {};

	/**
	 * Set a new event in the store with a given ID as key
	 * @param ID
	 * @returns {EventEmitter<any>}
	 */
	static get(ID: string): EventEmitter<any> {
		if (!this._emitters[ID]) {
			this._emitters[ID] = new EventEmitter();
		}
		return this._emitters[ID];
	}
}