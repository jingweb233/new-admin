// 用户名匹配
export function nameRule(rules, value, callback) {
    let reg = /^[a-zA-Z0-9]{4,10}$/;
    if (value === "") {
        callback(new Error("请输入用户名"));
    } else if (!reg.test(value)) {
        callback(new Error("请输入用户名4-10位"));
    } else {
        callback();
    }
}

// 密码匹配
export function passRule(rules, value, callback) {
    let pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@&%#_])[a-zA-Z0-9~!@&%#_]{6,12}$/;
    if (value === "") {
        callback(new Error("请输入密码"));
    } else if (!pass.test(value)) {
        callback(new Error("请输入密码包含英文大小写、数字和特殊符号6-12位"));
    } else {
        callback();
    }
}