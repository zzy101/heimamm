//   验证邮箱
export let checkEmail = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("邮箱不能为空"));
    } else {
        let email = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (email.test(value)) {
            callback();
        } else {
            return callback(new Error("邮箱格式错误"));
        }
    }
};

// 手机号判断
export let checkPhone = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("手机不能为空"));
    } else {
        let email = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (email.test(value)) {
            callback();
        } else {
            return callback(new Error("手机格式错误"));
        }
    }
};