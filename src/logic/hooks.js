import { store, storeProxy } from "./Store.js";

function useState(initialValue) {
	const error = new Error();
	const [, , atCaller] = error.stack.split("\n");
	const [, caller] = atCaller.trim().split(" "); //호출한 컴포넌트 이름

	const key = caller; //JSON.stringify(initialValue);
	if (!store[key]) store[key] = initialValue;
	//state가 없는경우 초기 state 등록

	const setState = (value) => {
		if (typeof value === "function")
			storeProxy[key] = value(store[key]);
		else storeProxy[key] = value;
	};

	return [store[key], setState];	
}

export { useState };
