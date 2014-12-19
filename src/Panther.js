
/**
	* @file A Data structure library for javascript.
	* @copyright Camilo Chacon Sartori 2014.
	* @version 0.2-alpha
	* @title Panther.JS

	The MIT License (MIT)

	Copyright (c) 2014 Camilo Chacon Sartori

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
 */



window.utils = (function(){



	var utils = {


		isUndefined: function(object){
			return typeof object === "undefined";
		},
		numberSort: function(a, b){
			return a - b;
		},
		binarySearch: function(dataList, element){
			this.dataList = dataList;
			this.dataList.sort(function(a, b){
				return a - b;
			});
			var found = false,
				first = 0,
				last = this.dataList.length - 1,
				pos = 0;
			while(first <= last && !found){
				pos = parseInt((first + last) / 2);
				if(element < this.dataList[pos]){
					last = pos - 1;
				}else if(this.dataList[pos] < element){
					first = pos	+ 1;

				}else{
					found = true;
				}
			}
			return found;

		}

	};

	return utils;

}());
/**
 * @namespace Panther
 * @ignore
 */

var PJS = (function(){


	/**
	* @class List
	 **/
	var List = function(){

		var dataList = [],
			pointer = -1,
			size = 0,
			values = arguments;

		this.add = add;
		this.clear = clear;
		this.remove = remove;
		this.reverse = reverse;
		this.contains = contains;
		this.insert = insert;
		this.addRange = addRange;
		this.empty = empty;
		this.size = size;
		this.removeRange = removeRange;
		this.sort = sort;
		this.indexOf = indexOf;
		this.front = front;
		this.back = back;
		this.lastIndexOf = lastIndexOf;
		this.set = set;
		this.subList = subList;
		this.get = get;
		this.clone = clone;
		this.toArray = toArray;
		this.forEach = forEach;


		/**
		 * Initialization
		 * @function init
         * @memberof List#
		 * @param {Array} Initialization elements.
		 * @return {Object} Current object list.
		 */
		var init = (function(){
			var i = 0, size = values.length;
			for(var i = 0; i < size; ++i){
				if(!utils.isUndefined(values[i])){
					add(values[i]);
				}
			}
			return this;
		})();

		/**
		 * Add element to a list.
		 * @memberof List#
		 * @param {Object} element Add a new element to the list.
		 * @return {Object} Current object list.
		 */

		function add(element){
			dataList[++pointer] = element;
			++size;
			return this;
		}
		/**
		 * Return a element from a index.
		 * @memberof List#
		 * @param {int} index Index to search.
		 * @return {Object} Return the element.
		 */

		function get(index){
			if(index > pointer || index < 0){
				throw new Error("PJS.List: Set, index undefined.");
			}
			return dataList[index];
		}
		/**
		 * Return a copy object of the list.
		 * @memberof List#
		 * @return {Object} Current object list.
		 */

		function clone(){
			return this;
		}
		/**
		 * Current List loop.
		 * @memberof List#
		 * @param {Callback} callback Function callback.
		 * @return {Object} Current object list.
		 */
		function forEach(callback){
			if(utils.isUndefined(callback)){
				return false;
			}
			var i = 0;
			for( ; i < size; ++i){
				callback(dataList[i]);
			}
			return this;
		}
		/**
		 * Return a normal array.
		 * @memberof List#
		 * @return {Array} A array of the list.
		 */
		function toArray(){
			var array = [],
				i = 0;
			for( ; i < size; ++i){
				array[i] = get(i);
			}
			return array;
		}
		/**
		 * Set a element in a specific index.
		 * @memberof List#
		 * @param {int} index Index of the array.
		 * @param {Object} element Element for replace or insert.
		 * @return {Object} Current object list.
		 */
		function set(index, element){

			if(index > pointer || index < 0){
				throw new Error("PJS.List: Set, index undefined.");
			}
			dataList[index] = element;
			return this;
		}
		/**
		 * Return first element of the List.
		 * @memberof List#
		 * @return {Object} First Element.
		 */
		function front(){
			if(size === 0){
				throw new Error("PJS.List: Front, list whiout elements.");
			}
			return dataList[0];
		}
		/**
		 * Return last element of the list.
		 * @memberof List#
		 * @return {Object} Last Element.
		 */
		function back() {
			if(size === 0){
				throw new Error("PJS.List: Back, list whiout elements.");
			}
			return dataList[pointer];
		}
		/**
		 * Clear the List.
		 * @memberof List#
		 * @return {Object} Current object list.
		 */
		function clear(){

			dataList = [];
			size = 0;
			pointer = -1;
			return this;
		}

		/**
		 * Remove a element of the List.
		 * @memberof List#
		 * @param {Object} element Element for replace or insert.
		 * @return {Object} Current object list.
		 */
		function remove(element){

			var result = false;
			if(utils.isUndefined(element)){
				return result;
			}
			var index = indexOf(element);
			if(index > 0){
				var i = index;
				while(i < size){
					dataList[i] = dataList[i+1];
					++i;
				}
				--pointer;
				--size;
				result = true;
			}
			return result;
		}
		/**
		 * Insert a element of the List.
		 * @memberof List#
		 * @param {int} index index of the list.
		 * @param {Object} element Element for replace or insert.
		 * @return {Object} Current object list.
		 */
		function insert(index, element){
			if(utils.isUndefined(element) || utils.isUndefined(index)){
				return false;
			}
			if(index > pointer || index < 0){
				throw new Error("PJS.List: Insert, index undefined.");
			}

			var i = 0;
			for( ; i < size; ++i){
				if(i === index){
					var temp = [];
					var j = 0;

					while(i < size){
						temp[j++] = dataList[i];
						++i;
					}
					dataList[index] = element;
					pointer = index;
					size = index + 1;
					var _size = temp.length;
					for(j = 0; j < _size; ++j){
						add(temp[j]);
					}
				}
			}
			return this;
		}
		/**
		 * Add elements to the list.
		 * @memberof List#
		 * @param {Object} elements Elements add to the list.
		 * @return {Object} Current object list.
		 */
		function addRange(elements){
			if(utils.isUndefined(elements)){
				return false;
			}
			var size = elements.length,
				 i = 0;
			if(size === 0){
				throw new Error("PJS.List: addRange, parameter with size 0.");
			}

			for( ; i < size; ++i){
				if(!utils.isUndefined(elements[i])){
					add(elements[i]);
				}

			}
			return this;

		}
		/**
		 * Remove elements to the list.
		 * @memberof List#
		 * @param {int} start First index.
		 * @param {int} end Last index.
		 * @return {Object} Current object list.
		 */
		function removeRange(start, end) {

			if(utils.isUndefined(start) || utils.isUndefined(end)){
				return false;
			}
			if(start >= size|| start < 0){
				throw new Error("PJS.List: removeRange, index undefined.");
			}
			var index = 0,
				i = 0;
			for( ; i < size; ++i){
				if(i >= start){
					while(index != end){
						remove(dataList[i]);
						++index;
					}
				}
			}
			return this;
		}
		/**
		 * Search index if exist element in the list.
		 * @memberof List#
		 * @param {Object} element Element to find.
		 * @return {bool} Return index position if find the element, otherwise return false.
		 */
		function indexOf(element){
			if(utils.isUndefined(element)){
				return false;
			}
			var result = -1,
				i = 0;
			for( ; i < size; ++i){
				if(dataList[i] === element){
					result =  i;
					break;
				}
			}
			return result;
		}
		/**
		 * Search from last index if exist element in the list.
		 * @memberof List#
		 * @param {Object} element Element to find.
		 * @return {Object} Return last index position if find the element, otherwise return false.
		 */
		function lastIndexOf(element){
			if(utils.isUndefined(element)){
				return false;
			}
			var result = -1,
				i = 0;
			for( ; i < size; ++i){

				if(dataList[size - 1 - i] === element){
					result = size - 1 - i;
					break;
				}
			}
			return	result;
		}
		/**
		 * Check if exist a element.
		 * @memberof List#
		 * @param {Object} element Element to find.
		 * @return {Object} Return Return a value boolean, true if exists or otherwise false.
		 */
		function contains(element){
			if(utils.isUndefined(element)){
				return false;
			}
			return utils.binarySearch.call(this, dataList, element);
		}
		/**
		 * Return the list in reverse.
		 * @memberof List#
		 * @return {Object} Return Return a new list create.
		 */

		function reverse(){
			dataReverse = [];
			var i = 0;
			for( ; i < size; ++i){
				dataReverse[i] = dataList[size - 1 - i];

			}
			return dataReverse;
		}
		/**
		 * Return a new list with the new range.
		 * @memberof List#
		 * @param {int} indexFrom Start index.
		 * @param {int} indexTo End index.
		 * @return {Object} Return Return a new list.
		 */
		function subList(indexFrom, indexTo) {
			if(utils.isUndefined(indexFrom) || utils.isUndefined(indexTo  )){
				return false;
			}
			var newList = new PJS.List();
			if(indexFrom > indexTo || indexFrom < 0 || indexTo > pointer){
				return false;
				//throw new Error("DT.List: subList, index undefined. indexFrom: " + indexFrom + ", indexTo: " + indexTo);
			}
			var i = indexFrom;
			while(i <= indexTo){
				newList.add(dataList[i]);
				++i;
			}
			return newList;
		}
		/**
		 * Return number elements of the list.
		 * @memberof List#
		 * @return {int} Return number elements.
		 */
		function size(){
			return size;
		}
		/**
		 * Check if the list is empty.
		 * @memberof List#
		 * @return {Bool} Return Return boolean.
		 */
		function empty() {
			return size === 0;
		}
		/**
		 * Return the sort list.
		 * @memberof List#
		 * @return {void} Return Return the sort list.
		 */
		function sort(){
			return dataList.sort();
		}



	};


	/** @class Set **/
	var Set = function(){

		var dataList = [],
			pointer = -1,
			size = 0;


		this.add = add;
		this.contains = contains;
		this.clear = clear;
		this.size = size;
		this.empty = empty;
		this.contains = contains;
		this.remove = remove;
		this.print = print;
		this.equals = equals;
		this.get = get;
		this.clone = clone;
		this.subSet = subSet;
		this.union = union;
		this.toArray = toArray;
		this.intersect = intersect;

		/**
		 * Add a element to set.
		 * @memberof Set#
		 * @param {Object} element Element to the set.
		 * @return {Object} Return Current object set.
		 */
		function add(element) {
			console.log("y", dataList);
			if(utils.isUndefined(element)){
				return false;
			}
			if(!(element in dataList) ){

				dataList[element] = { value: element};
				++size;
				++pointer;
			}
			return this;
		}
		/**
		 * Add a element to set.
		 * @memberof Set#
		 * @param {Object} element Element to the set.
		 * @return {Object} Return Return current object set.
		 */
		function toArray(){
			return dataList;
		}
		/**
		 * Return a copy object of the set.
		 * @memberof Set#
		 * @return {Object} Current object set.
		 */
		function clone(){
			return this;
		}
		/**
		 * Check if a bool if are subset.
		 * @memberof Set#
		 * @return {Bool} Return a true if exist a subset.
		 */
		function subSet(objSet){
			if(utils.isUndefined(objSet)){
				return false;
			}
			if(objSet instanceof Set){

				for(index in this.getData()){
					if(index != "pjsID"){
						if(!objSet.contains(this.getData()[index].value)){
							return false;
						}
					}

				}
				return true;
			}
			return false;
		}
		/**
		 * @memberof Set#
		 * @param {Object} element A set element.
		 * @return {Object} Return a new set from intersect.
		 */
		function intersect(objSet){
			if(utils.isUndefined(objSet)){
				return false;
			}
			var newSet = new PJS.Set();
			if(objSet instanceof Set){

				for(index in objSet.getData()){
					if(index != "pjsID"){
						if(this.contains(objSet.getData()[index].value)){

							newSet.add(objSet.getData()[index].value);
						}
					}
				}
			}
			return newSet;
		}
		/**
		 * @memberof Set#
		 * @param {Object} element
		 * @return {Bool}
		 */
		function contains(element){
			return (element in dataList);
		}
		/**
		 * Search index if exist element in the list.
		 * @memberof List#
		 * @param {Object} element Element to find.
		 * @return {bool} Return index position if find the element, otherwise return false.
		 */
		function indexOf(element){
			if(utils.isUndefined(element)){
				return false;
			}
			var result = -1,
				i = 0;
			for( ; i < size; ++i){
				if(dataList[i] === element){
					result =  i;
					break;
				}
			}
			return result;
		}
		/**
		 * @memberof Set#
		 * @param {Object} element
		 * @return {Bool}
		 */
		function remove(element){
			if(utils.isUndefined(element)){
				return false;
			}
			var result = false,
				index = indexOf(element);
			if(index > 0){
				var i = index;
				while(i < size){
					dataList[i] = dataList[i+1];
					++i;
				}
				--pointer;
				--size;
			}
			return this;
		}
		/**
		 * @memberof Set#
		 * @param {Object} objSet
		 * @return {Object}
		 */
		function union(objSet){
			if(utils.isUndefined(objSet)){
				return false;
			}
			var newSet = this.clone();
			if(objSet instanceof Set){
				var index = 0;
				for(index in objSet.getData()){
					if(index != "pjsID"){
						if(!newSet.contains(objSet.getData()[index].value)){

							newSet.add(objSet.getData()[index].value);

						}
					}
				}
			}

			return newSet;
		}
		/**
		 * @memberof Set#
		 * @param {Object} objSet
		 * @return {Bool}
		 */
		function equals(objSet){
			if(utils.isUndefined(objSet)){
				return false;
			}
			var result = true;
			if(objSet instanceof Set){

				if(objSet.size() != size){
					result = false;
				}
				if(result){
					var index = 0;
					for(index in objSet.getData()){
						if(!this.contains(objSet.getData()[index].value)){
							result = false;
							break;

						}
					}

				}

			}else{
				throw new Error("PJS.Set: parameter is not a Set Object.");
			}
			return result;
		}
		/**
		 * @memberof Set#
		 * @param {Object} index
		 * @return {Object}
		 */
		function get(index){
			if(utils.isUndefined(index)){
				return false;
			}
			if(index > this.pointer || index < 0){

				throw new Error("PJS.Set: Set, index undefined.");
			}
			return dataList[index].value;
		}
		/**
		 * @memberof Set#
		 * @return {int}
		 */
		function size(){
			return size;
		}
		/**
		 * @memberof Set#
		 */
		function clear(){
			dataList = [];
			size = 0;
			pointer = -1;
		}
		/**
		 * @memberof Set#
		 * @return {Bool}
		 */
		function empty(){
			return (size === 0);
		}


	}


	/** @class Stack **/
	var Stack = function()
	{

		var dataList = [],
		 	pointer = 0;

		this.add = add;
		this.pop = pop;
		this.empty = empty;
		this.size = size;
		this.get = get;
		this.clone = clone;
		this.toArray = toArray;
		this.clear = clear;
		this.contains = contains;

		/**
		 * @memberof Stack#
		 * @param {Object} element
		 * @return {Object}
		 */

		function add(element){
			if(utils.isUndefined(element)){
				return false;
			}
			dataList[pointer++] = element;

			return this;
		}
		/**
		 * @memberof Stack#
		 * @return {Object}
		 */
		function pop(){
			if(empty()){
				throw new Error("Error underflow");
			}
			return dataList[--pointer];
		}
		/**
		 * @memberof Stack#
		 * @return {Object}
		 */
		function peek(){
			if(empty()){
				throw new Error("Error underflow");
			}
			return dataList[pointer];
		}
		/**
		 * @memberof Stack#
		 * @param {int} index
		 * @return {Object}
		 */
		function get(index){
			if(utils.isUndefined(index)){
				return false;
			}
			if(pointer < 0 ){
				throw new Error("Overflow index.");
			}
			return dataList[index];

		}
		/**
		 * @memberof Stack#
		 */
		function clear(){
			dataList = [];
			pointer = 0;
		}
		/**
		 * @memberof Stack#
		 * @return {Bool}
		 */
		function empty(){
			return (pointer === 0);
		}
		/**
		 * @memberof Stack#
		 * @return {Object}
		 */
		function size(){
			return pointer;
		}
		/**
		 * @memberof Stack#
		 * @return {Object}
		 */
		function clone(){
			return this;
		}
		/**
		 * @memberof Stack#
		 * @return {Array}
		 */
		function toArray(){
			var newArray = [],
				 i = 0;
			for( ; i < pointer; ++i){
				newArray[i] = get(i);
			}
			return newArray;
		}
		/**
		 * @memberof Stack#
		 * @param {Object} element
		 * @return {Bool}
		 */

		function contains(element){
			if(utils.isUndefined(element)){
				return false;
			}
			var i = 0;
			for( ; i < pointer; ++i){
				if(dataList[i] === element){
					return true;
				}
			}
			return false;
		}



	}
	/** @class Queue **/
	var Queue = function(){


		var dataList = [],
			pointerUpper = 0,
			pointerLower = 0;
		this.enqueue = enqueue;
		this.dequeue = dequeue;
		this.peek = peek;
		this.clear = clear;
		this.empty = empty;
		this.size = size;
		this.forEach = forEach;
		this.clone = clone;
		this.get = get;
		this.contains = contains;
		this.toArray = toArray;

		/**
		 * @memberof Queue#
		 * @param {Object} element
		 * @return {Object}
		 */

		function enqueue(element){
			if(utils.isUndefined(element)){
				return false;
			}
			dataList[pointerUpper++] = element;
			return this;
		}
		/**
		 * @memberof Queue#
		 * @return {Object}
		 */
		function dequeue(){
			if(pointerLower > pointerUpper || pointerLower < 0){
				return false;
			}

			return dataList[pointerLower++];
		}
		/**
		 * @memberof Queue#
		 * @return {Object}
		 */
		function peek(){
			if(pointerLower > pointerUpper || pointerLower < 0){
				return false;
			}

			return dataList[pointerLower];
		}
		/**
		 * @memberof Queue#
		 */
		function clear(){
			dataList = [];
			pointerLower = 0;
			pointerUpper = 0;
		}
		/**
		 * @memberof Queue#
		 * @return {Bool}
		 */
		function empty(){
			return (pointerLower === pointerUpper);
		}
		/**
		 * @memberof Queue#
		 * @param {Callback} callback
		 * @return {Object}
		 */
		function forEach(callback){
			if(utils.isUndefined(callback)){
				return false;
			}
			var i = pointerLower,
				size = pointerUpper;
			for( ; i < size; ++i){
				callback(dataList[i]);
			}
			return this;
		}
		/**
		 * @memberof Queue#
		 * @return {int}
		 */
		function size(){
			return (pointerUpper - pointerLower);
		}
		/**
		 * @memberof Queue#
		 * @param {int} index
		 * @return {Object}
		 */
		function get(index){
			if(utils.isUndefined(index)){
				return false;
			}
			if(pointerLower < 0 || pointer >= pointerUpper){
				throw new Error("Overflow index.");
			}
			return dataList[index];

		}
		/**
		 * @memberof Queue#
		 * @return {Object}
		 */
		function clone(){
			return this;
		}
		/**
		 * @memberof Queue#
		 * @return {Array}
		 */
		function toArray(){
			var newArray = [],
				i = pointerLower;
			for( ; i < pointerUpper; ++i){
				newArray[i] = get(i);
			}
			return newArray;
		}
		/**
		 * @memberof Queue#
		 * @param {Object} element
		 * @return {Bool}
		 */
		function contains(element){
			if(utils.isUndefined(element)){
				return false;
			}
			var i = pointerLower;
			for( ; i < pointerUpper; ++i){
				if(dataList[i] === element){
					return true;
				}
			}
			return false;
		}
	}
	/** @class Hash **/
	var Hash = function(){

		var size = 0,
			listHashCode = new PJS.Set(),
			array = [],
			hashcode = 0;
		this.hashCode = hashCode;
		this.add = add;
		this.size = size;
		this.get = get;
		this.clear = clear;
		this.empty = empty;
		this.remove = remove;
		this.forEach = forEach;
		//this.BIG_NUMBER_PRIME = 1000000016531;
		this.BIG_NUMBER_PRIME = 1610612741;


		/**
		 * @memberof Hash#
		 * @return {Array}
		 */



		function hashCode(object){

			if(typeof object === "string" || typeof object == "object"){
				if(typeof object == "object"){
					object = object.pjsID();
				}

				var i = 0, len = object.length,
					 _hashCode = 0;
				for( ; i < len; i++){
					_hashCode = (_hashCode << 5) | (_hashCode >> 27);
					_hashCode += object[i].charCodeAt(0);
				}

				return _hashCode;
			}else if(utils.isUndefined(object)){
				return null;
			}
			return object;

		}
		function addLink(obj, key, _value){

			if(obj.next === null){
				++size;
				obj.next = {
					key: key,
					value: _value,
					next: null
				}
				return;
			}
			return addLink(obj.next, key, _value);
		}
		/**
		 * @memberof Hash#
		 * @param {Object} key
		 * @param {Object} value
		 * @return {Object}
		 */

		function add(key, _value){

			hashcode = hashCode(key) % this.BIG_NUMBER_PRIME;


			if(array[hashcode] == undefined){
				array[hashcode] = 	{
										key : key,
										hashcode: hashcode,
										value: _value,
										next: null
									}
				++size;

			}else{

				addLink(array[hashcode], key, _value);

			}
			listHashCode.add(hashcode);
			return this;
		}
		/**
		 * @memberof Hash#
		 * @return {int}
		 */
		function size(){
			return size;
		}
		/**
		* @memberof Hash#
		* @return {bool}
		*/
		function empty(){
			return size === 0;
		}
		/**
		* @memberof Hash#
		* @return {void}
		*/
		function clear(){
			array = [];
			listHashCode.clear();
			size = 0;
		}
		/**
		* @memberof Hash#
		* @param {Object} pointer
		* @param {Object} key
		* @param {bool} isRemove
		* @return {Object}
		*/
		function search(pointer, key, isRemove){
			if(pointer.key == key){

					if(isRemove){
						var _key = hashCode(key);
						array[_key] = undefined;
						listHashCode.remove(_key);
						return true;
					}
					return pointer.value;

			}
			return search(pointer.next, key, isRemove);

		}
		/**
		 * @memberof Hash#
		 * @param {Object} key
		 * @return {Object}
		 */
		function get(key){

			var k = hashCode(key) % this.BIG_NUMBER_PRIME;
			if(utils.isUndefined(array[k])) return null;
			return search(array[k], key, false);
		}
		/**
		* @memberof Hash#
		* @param {Object} key
		* @return {Object}
		*/
		function remove(key){

			var k = hashCode(key) % this.BIG_NUMBER_PRIME;
			if(utils.isUndefined(array[k])) return null;
			return search(array[k], key, true);
		}

		/**
		* @memberof Hash#
		* @param {callback} key
		* @return {Object}
		*/
		function forEach(callback){
			if(utils.isUndefined(callback)){
				return false;
			}
			var i = 0, _array = listHashCode.toArray();
			for(obj in _array){
				if(obj != "pjsID")	callback(array[obj]);
			}
			return this;
		}

	};
	return {
		List : List,
		Set : Set,
		Stack : Stack,
		Queue : Queue,
		Hash : Hash
	};
})();

(function() {
	if ( typeof Object.prototype.pjsID == "undefined") {
		var id = 0;

		Object.prototype.pjsID = function() {
			if ( typeof this.__uniqueid == "undefined" ) {
				this.__uniqueid = ++id;
			}
			return "pjs_" + this.__uniqueid;
		};
	}
})();
