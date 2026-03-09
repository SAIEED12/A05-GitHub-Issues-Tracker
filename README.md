<!-- 1️⃣ What is the difference between var, let, and const? -->
1. var is redeclarable. On the other hand let and const is not.
2. var and let is reassignable but const can not be reassigned.
3. var is function scoped. However let and const are block scoped.
4. var hoisting is initialized as undefined. let and const are hoisted in Temporal Dead Zone.


<!-- 2️⃣ What is the spread operator (...)? -->
Spread Operator allows an array,string or object to be expanded. It creates a copy of original element where the original element remains unchangeable. The copied data can be manipulated or changed.


<!-- 3️⃣ What is the difference between map(), filter(), and forEach()? -->
map(), filter(), and forEach() all are iteration methods.
1. map() returns an array of same length and each element is transformed or processed.
2. filter() is used basically to filter out elements and keep rest of the elements. A condition should be passed and only the elements that are true based on that condition are kept and returned in a new array. With filter(), search functionality can be implemented.
3. forEach() iterates through all elements but does not return anything.


<!-- 4️⃣ What is an arrow function? -->
Arrow function is a short and modern approach of writing traditional functions. It was introduced in ES6. return keyword is not neccessary for single line body. Example of arrow function --> const add = (a, b) => a + b; Here a,b is passed as parameters and '=>' symbol indicates return. In this function a+b is returned.


<!-- 5️⃣ What are template literals? -->
Template Literals in JavaScript is a method of declaring string. It mainly uses backtick(``). With template literals multiline strings can be written. ALso varibles and expressions can directly be embedded with ${} notation. 