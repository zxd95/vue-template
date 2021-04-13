一、JavaScript
1、讲讲js数据类型？基本和引用的区别？symbol和bigint讲一讲应用场景？
	基本类型：String、Number、Boolean、Undefined、Null
	引用类型：Object(Object/Array/Function/Date)
	Symbol类型： Symbol类型的对象永远不相等，即使创建的时候传入相同的值。可以用于解决命名冲突，作为标记。
	BigInt类型： Javascript中的任意精度整数，可以安全存储和操作大整数。即始超出Number类型能够表示的安全整数范围。

2、判断数据类型的方法？instanceof原理?判断空对象？ typeof null？ typeof NaN？
	typeof: 判断对象类型，对于Object类型，返回"object"，对于Function类型，返回"function"。
	instanceof: 判断引用类型的值，根据查找构造函数的原型链指向。

3、var/let/const 区别？暂时性死区？块级作用域？ const a = {}; a.x = 1 能不能修改？
	var:
	let: 添加了块级作用域、约束了变量提升、有暂时性死区、禁止重复声明变量、不会成为全局对象的属性。
	const: 变量不能重新赋值、其他与let规则一致。const a = {}; a.x = 1;可以往对象新增属性，但不能对已存在属性值做改变。

4、说说你对函数式编程的理解？ 函数柯里化的理解？ 平时的使用场景？
	函数编程:
	函数柯里化:
	
5、防抖、节流的含义，使用场景？ 手写一下？
	防抖: 单位时间内避免事件多次触发，应用: 浏览器事件，如resize,scroll,keydown,keyup,keypress,mousemove等
		function debounce(fun, wait) {
			let timeout;
			return function () {
				const _this = this
				clearTimeout(timeout);
				timeout = setTimeout(function () {
					fun.apply(_this, arguments);
				}, wait);
			}
		}

	节流: 单位时间内事件只触发一次, 应用: 上拉加载，滚动条等
		function throttle(fun, wait) {
			let timeout;
			return function () {
				if(!timeout) {
					const _this = this;
					timeout = setTimeout(function() {
						fun.apply(_this, arguments);
						timeout = null;
					}, wait);
				}
			}
		}

6、call、apply、bind区别？ bind实现？ bind之后还能修改this指向吗？ 为什么？
	都是改变this的指向，call、apply传参不同
	call: 若干参数列表，立即调用
	apply: 数组形式，立即调用
	bind: 返回对应函数，便于稍后调用

7、闭包概念，最主要的还是问闭包的场景？
	闭包: 有权访问另外一个函数作用域中的变量的函数


8、用es5实现es6类的继承？ 各种继承问的挺多的


9、深拷贝与浅拷贝？常用方法？ 手写一个深拷贝函数？
	1.JSON.parse(JSON.stringify(target));
	2.function deepClone(target) {
		let reslut;
		if (typeof target != 'object') {
			reslut = target;
		}

		if (typeof target == 'object') {
			reslut = Array.isArray(target) ? [] : {};

			for(let key in target) {
				if (target.hasOwnProperty(key)) {
					if (target[key] && typeof target[key] == 'object') {
						reslut[key] = deepClone(target[key]);
					} else {
						reslut[key] = target[key];
					}
				}
			}
		}
		return reslut;
	}


10、说说你知道的JavaScript设计模式？ 观察者和发布订阅的区别？ 手写一个发布订阅？
	事件总代（发布订阅模式）
	class EventEmitter {
    	constructor() {
    	    this.cache = {};
    	}
    	on(name, fn) {
    	    if (this.cache[name]) {
    	        this.cache[name].push(fn);
    	    } else {
    	        this.cache[name] = [fn];
    	    }
    	}
    	off(name, fn) {
    	    let tasks = this.cache[name];
    	    if (tasks) {
    	        const index = tasks.findIndex(f => f === fn || f.callback === fn);
    	        if (index >= 0) {
    	            tasks.splice(index, 1);
    	        }
    	    }
    	}
    	emit(name, once = false, ...args) {
    	    if (this.cache[name]) {
    	        // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
    	        let tasks = this.cache[name].slice();
    	        for (let fn of tasks) {
    	            fn(...args);
    	        }
    	        if (once) {
    	            delete this.cache[name];
    	        }
    	    }
    	}
	}

	// 测试
	let eventBus = new EventEmitter();
	let fn1 = function(name, age) {
		console.log(`${name} ${age}`);
	}
	let fn2 = function(name, age) {
		console.log(`hello, ${name} ${age}`);
	}
	eventBus.on('aaa', fn1);
	eventBus.on('aaa', fn2);
	eventBus.emit('aaa', false, '布兰', 12);
	// '布兰 12'
	// 'hello, 布兰 12'


11、说说对你对JavaScript异步编程的理解？
	Javascript是单线程
	同步、宏任务、微任务
	事件轮询
	回调与Promise、async、await


12、ES Module与CommonJS模块的差异？ 两者互相加载的方式？ 一般会扯到AMD
	CommonJS模块输出的是一个值的复制; ES6模块输出的是值得引用。
	CommonJS模块是运行时加载，动态引入; ES6模块是编译时输出接口，静态引入，现实Tree-ShaKing。
	第二个差异是因为CommonJS加载的是一个对象（即module.export属性），该对象只有在脚本运行结束时才会生成。而ES6模块不是对象，它的对外接口是一种静态定义，在代码静态解析阶段就会生成。
	CommonJS模块输出的是值的复制，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。


13、Promise.all、race、allSettled 概念、手写？ 很多手写题都会用到，比如用promise实现请求并发个数限制？
	Promise.all
	Promise.race
	Promise.allSettled


14、
