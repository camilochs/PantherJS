
/**
 * @file A Data structure library for javascript.
 * @copyright Camilo Chacón Sartori 2014.
 * @version 0.1-alpha
 * @title Panther.JS
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
			sizeList = 0,
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
			++sizeList;
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
				throw new Error("DT.List: Set, index undefined.");
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
			for( ; i < sizeList; ++i){
				//console.debug(obj);
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
			for( ; i < sizeList; ++i){
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
				throw new Error("DT.List: Set, index undefined.");
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
			if(sizeList === 0){
				throw new Error("DT.List: Front, list whiout elements.");
			}
			return dataList[0];
		}
		/**
		 * Return last element of the list.
		 * @memberof List#
		 * @return {Object} Last Element.
		 */
		function back() {
			if(sizeList === 0){
				throw new Error("DT.List: Back, list whiout elements.");
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
			sizeList = 0;
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
				while(i < sizeList){
					dataList[i] = dataList[i+1];
					++i;
				}
				--pointer;
				--sizeList;
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
				throw new Error("DT.List: Insert, index undefined.");
			}
			
			var i = 0;
			for( ; i < sizeList; ++i){
				if(i === index){
					var temp = [];
					var j = 0;

					while(i < sizeList){
						temp[j++] = dataList[i];
						++i;
					}
					dataList[index] = element;
					pointer = index;
					sizeList = index + 1;
					var size = temp.length;
					for(j = 0; j < size; ++j){
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
				throw new Error("DT.List: addRange, parameter with size 0.");
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
			if(start >= sizeList || start < 0){
				throw new Error("DT.List: removeRange, index undefined.");
			}
			var index = 0, 
				i = 0;
			for( ; i < sizeList; ++i){
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
			for( ; i < sizeList; ++i){
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
			for( ; i < sizeList; ++i){

				if(dataList[sizeList - 1 - i] === element){
					result = sizeList - 1 - i;
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
			for( ; i < sizeList; ++i){
				dataReverse[i] = dataList[sizeList-1-i];

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
				console.debug("DT.List: subList, index undefined. indexFrom: " + indexFrom + ", indexTo: " + indexTo);
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
			return sizeList;
		}
		/**
		 * Check if the list is empty.
		 * @memberof List#
		 * @return {Bool} Return Return boolean.
		 */
		function empty() {
			return sizeList === 0;
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
	
		var dataList = {}, 
			pointer = -1,
			sizeList = 0;


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
		this.getData = getData;
		this.intersect = intersect;

		/**
		 * Add a element to set.
		 * @memberof Set#
		 * @param {Object} element Element to the set.
		 * @return {Object} Return Current object set.
		 */
		function add(element) {

			if(utils.isUndefined(element)){
				return false;
			}
			if(!(element in dataList)){
				
				dataList[element] = { value: element};
				++sizeList;	
			}
			return this;
		}
		/**
		 * Add a element to set.
		 * @memberof Set#
		 * @param {Object} element Element to the set.
		 * @return {Object} Return Return current object set.
		 */
		function getData(){
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
				console.debug(this.getData());
				var i = 0,
					size = objSet.size();
				for( ;  i < size; ++i){
					
					if(!this.contains(objSet.get(i))){
						return false;
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
			var newSet = new Set();
			if(objSet instanceof Set){
				var i = 0,
					size = objSet.size();
				for( ; i < size; ++i){

					if(this.contains(objSet.get(i))){
						newSet.add(objSet.get(i));
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
				while(i < sizeList){
					dataList[i] = dataList[i+1];
					++i;
				}
				--pointer;
				--sizeList;
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
					if(!newSet.contains(objSet.getData()[index].value)){

						newSet.add(objSet.getData()[index].value);

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
				
				if(objSet.size() != sizeList){
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
				throw new Error("DT.Set: parameter is not a Set Object.");
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
			if(index > pointer || index < 0){
				throw new Error("DT.List: Set, index undefined.");
			}
			return dataList[index].value;
		}
		/**
		 * @memberof Set# 
		 * @return {int}
		 */
		function size(){
			return sizeList;
		}
		/**
		 * @memberof Set#
		 */
		function clear(){
			dataList = [];
			sizeList = 0;
			pointer = -1;
			console.debug("DROP");
		}
		/**
		 * @memberof Set#
		 * @return {Bool}
		 */
		function empty(){
			return (sizeList === 0);
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
			return dataList[pointer--];
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
				//console.debug(obj);
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
			if(sizeList < 0 || pointer >= sizeList){
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

		var _size = 0, 
			listKey = new PJS.List(),
			array = [];
		this.hashCode = hashCode;
		this.add = add;
		this.size = size;
		this.get = get;
		this.getData =getData;
		//this.BIG_NUMBER_PRIME = 1000000016531;
		this.BIG_NUMBER_PRIME = 1610612741;
		

		/**
		 * @memberof Hash#
		 * @return {Array}
		 */

		function getData(){
			return array;
		}

		function hashCode(object){

			if(typeof object === "string" || typeof object == "object"){
				if(typeof object == "object"){
					object = object.pjsID();
				}
				var i = 0, len = object.length,
					 hashCode = 0;
				for( ; i < len; i++){
					//console.log("code:" +object[i].charCodeAt(0));
					//hashCode = hashCode * 33 + object[i].charCodeAt(0) ;
					//console.log(hashCode);

					hashCode = (hashCode << 5) | (hashCode >> 27);
					hashCode += object[i].charCodeAt(0);
					
					//hashCode += object[i].charCodeAt(0) * ((Math.random() * 11) + 2);

				}
			//	console.log(hashCode);
				return hashCode;
			}else if(utils.isUndefined(object)){
				return null;
			}
			return object;

		}
		function addLink(obj, key, _value){
			
			if(obj.next === null){
				++_size;
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
			
			var hashcode = hashCode(key) % this.BIG_NUMBER_PRIME;
			if(array[hashcode] == undefined){
				array[hashcode] = 	{
										key : key,
										hashcode: hashcode,
										value: _value,
										next: null
									}
				++_size;

			}else{

				addLink(array[hashcode], key, _value);
				
			}
			return this;
		}
		/**
		 * @memberof Hash#
		 * @return {int}
		 */
		function size(){
			return _size;
		}

		function search(pointer, key){
			//console.debug("Comparación:", pointer.key, key, pointer.key == key, pointer.value);
			if(pointer.key == key){
				return pointer.value;
			}
			return search(pointer.next, key);

		}
		/**
		 * @memberof Hash#
		 * @param {Object} key 
		 * @return {Object}
		 */
		function get(key){
			//console.debug(array);
			
			var k = hashCode(key) % this.BIG_NUMBER_PRIME;
			if(utils.isUndefined(array[k])) return null;
			return search(array[k], key); 
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































