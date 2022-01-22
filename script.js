// Global Variables
let display_val = null;
let display = document.querySelector('#result');
let operator_clicked = false;
let equals_clicked = false;
let temp_val = null;
let operator = null;
let prev_operator = null;
let first_digit_typed = false;
let last_btn_clk = null;
let expression = document.getElementById('expression');

add_blinker();

//1. Create functions for basic math operators

//1.a - ADD
function add(a,b){
    return a+b;
}

//1.b - Subtract
function subtract(a,b){
    return a-b;
}

//1.c - Multiply
function multiply(a,b){
    return a * b;
}

//1.d - Divide
function divide(a,b){
    return a/b;
}

/*2. Create a new function operate that takes an
operator and 2 numbers and then calls one of the above.
*/

function operate(operator, a, b){
    a = Number(a);
    b = Number(b);
    switch (operator){
        case ("add"):
            return add(a,b);
            break;
        case ("subtract"):
            return subtract(a,b);
            break;
        case ("multiply"):
            return multiply(a,b);
            break;
        case ("divide"):
            return divide(a,b)
            break;
    }
}

function update_expression(key){
    //  console.log(key)
    // if (key === "Del") {
    //     expression.textContent = expression.textContent.slice(0,-1);
    // } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    //     if (last_btn_clk === "=") {
    //         expression.textContent = ": "
    //         expression.textContent += display.textContent + " " + key + " ";
    //     } else if (key !== last_btn_clk && expression.textContent !== null){
    //         // expression.textContent += display.textContent;
    //         expression.textContent += " " + key + " ";
    //     }
    // } else if (key ==='=' && last_btn_clk === key) {
    //     console.log(key);
    //     expression.textContent += " " + key;
    // } else if (last_btn_clk !=='+' && last_btn_clk !=='-' && last_btn_clk !=='*' && last_btn_clk !=='/' && last_btn_clk !=='=') {
    //     expression.textContent += key;
    // }

    if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        // console.log(display_val)
        if (display_val === null || key !==last_btn_clk) expression.textContent = key;
    }
    if (key === '=' && (expression.textContent !== "_" || expression.textContent !== "_ ")) {
        //console.log(expression.textContent)
        expression.textContent = "Ans:";
    }
    if (key === '=' && expression.textContent === "Ans:" && display.textContent === "_") {
        expression.textContent = "_";
    }
    if (key === '%' && display.textContent === "_") {
        expression.textContent = "_";
    }
    
    // console.log(result.textContent.length);
    if (result.textContent.length >=15){
        result.style.fontSize = "2.5rem"
    } else {
        result.style.fontSize = "4rem"
    }
    
}

// //Create a display updater
// function update_display_val(){
//     display.textContent = display_val;
// }

function clear_display_val(){
    display.textContent = "_";
    expression.textContent = "_ ";
    add_blinker();
}

function add_blinker(){
    display.classList.add ('blink');
}

function remove_blinker(){
    display.classList.remove ('blink');
}

const keys = document.getElementsByClassName('btn')
for (let key of Array.from(keys)){
    key.addEventListener('click', (e)=> {
        calculate(key);
    })
}

//colorize operator buttons
for (let btn of Array.from(keys)){
    if (btn.textContent === '+' || btn.textContent === '-' || btn.textContent === '*'
        || btn.textContent === '/' || btn.textContent === '%' || btn.textContent === '='
        || btn.textContent === 'Del' || btn.textContent === '+/-' || btn.textContent === 'AC') {
        btn.style.color = "#65ffdb";
        // console.log(btn);
    }
}

window.addEventListener('keydown', calc_using_numpad);
function calc_using_numpad(e){
    // console.log(e.keyCode);
    const key = document.querySelector(`.btn[data-key="${e.keyCode}"]`);
    if (key !==null) calculate(key);
}

function calculate(key){
    if (!isNaN(key.textContent)) {
        if (first_digit_typed === false) display.textContent = "";
        if (display.textContent === '0' || display.textContent === '_'){
            display.textContent = key.textContent;
        } else {
            display.textContent += key.textContent;
        }
        remove_blinker();
        // operator_clicked = false;
        equals_clicked = false;
        first_digit_typed = true;
        last_btn_clk = key.textContent;
        update_expression(key.textContent);
    }

    if (isNaN(key.textContent)) {
        if (key.textContent === '+' || key.textContent === '-' || key.textContent === '*' || key.textContent === '/'){
            // console.log('before: ', key.id, prev_operator);
            if (display.textContent !== "_"){

                if (key.textContent === '+') operator = "add";
                if (key.textContent === '-') operator = "subtract";
                if (key.textContent === '*') operator = "multiply";
                if (key.textContent === '/') operator = "divide";
                
                update_expression(key.textContent);
                // bug: if another operator is pressed after a previous one
                operator_clicked = true;
                if (display_val === null || equals_clicked) {
                    //just store it
                    display_val = display.textContent
                    equals_clicked = false;
                } else if (last_btn_clk === '+' || last_btn_clk === '-' || last_btn_clk === '*' || last_btn_clk === '/') {
                    prev_operator = operator; // just override the operator with the last clicked
                } else if (key.textContent !== last_btn_clk){
                    //perform operation
                    display_val = operate(prev_operator, display_val, display.textContent)
                    if (typeof(display_val) === 'number'){
                        display_val = Number(display_val);
                        if (Math.floor(display_val) !== display_val){
                            display_val = display_val.toFixed(8);
                        }
                    }
                    display.textContent = display_val;
                }
            }
            prev_operator = operator;
            first_digit_typed = false;
            last_btn_clk = key.textContent;
            // console.log('after: ', key.id, prev_operator);
        }
    }

    switch (key.id){
        case ('allclear'): //reset everything
            clear_display_val();
            equals_clicked = false;
            operator_clicked = false;
            display_val = null;
            operator = null;
            prev_operator = null;
            last_btn_clk = key.textContent;
            expression.textContent = "_";
            break;
        case ('decimal'):
            if (last_btn_clk === '+' || last_btn_clk === '-' || last_btn_clk === '*' || last_btn_clk === '/') {
                display.textContent = '0.'
            }
            first_digit_typed = true;
            if (display.textContent !== '_' && !display.textContent.includes('.')){
                display.textContent += "."
            } else if (display.textContent === "_" && !display.textContent.includes('.')){
                display.textContent = "0."
                remove_blinker();
            }
            last_btn_clk = key.textContent;
            update_expression(key.textContent);
            break;
        case ('pos_neg'):
            if (display.textContent !== '0' && display.textContent !== '_'){
                display.textContent = Number(display.textContent) * -1;
            }
            last_btn_clk = key.textContent;
            update_expression(key.textContent);
            break;
        case ('percent'):
            if (display.textContent !== '0' && display.textContent !== '_'){
                let temp_num = Number(display.textContent) / 100;
                if (typeof(display_val) === 'number'){
                    temp_num = Number(display_val);
                    if (Math.floor(temp_num) !== temp_num){
                        temp_num = temp_num.toFixed(5);
                    }
                } else {
                    display.textContent = temp_num;
                }
                display.textContent = temp_num * 1; //drop trailing zeroes
            }
            last_btn_clk = key.textContent;
            update_expression(key.textContent);
            break;
        case ('delete'):
            if (display.textContent === '0' || display.textContent === '_'){
                display.textContent = '_';
            } else {
                display.textContent = display.textContent.slice(0,-1)
                if (display.textContent.length === 0) {
                    display.textContent = '_';
                    equals_clicked = false;
                    add_blinker();
                }
            }
            update_expression(key.textContent);
            last_btn_clk = key.textContent;
            break;
         case ('equals'):
            if (display.textContent !== "_"){
                // console.log(operator_clicked);
                if (operator_clicked && last_btn_clk !== '+' && last_btn_clk !== '-' && last_btn_clk !== '*' && last_btn_clk !== '/') {
                    // console.log(operator, display_val, display.textContent);
                    display_val = operate(operator, display_val, display.textContent);
                    equals_clicked = true;
                    operator_clicked = false;
                } else {
                    display_val = display.textContent;
                }
                if (typeof(display_val) === 'number'){
                    display_val = Number(display_val);
                    if (Math.floor(display_val) !== display_val){
                        display_val = display_val.toFixed(4);
                    }
                }
                display.textContent = display_val * 1; //drop trailing zeroes
                if (display_val === Infinity) display.textContent = "Math Error";
                display_val = null;
                
            }
            first_digit_typed = false;
            last_btn_clk = key.textContent;
            update_expression(key.textContent);
            break;
    }
}