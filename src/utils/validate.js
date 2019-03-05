import Vue from "vue";
import iView from 'iview';

Vue.use(iView);
let bus = new Vue();

const platformDomain = ['https://egame.qq.com/'];

const errMsg = {
    /* 必填项 */
    required: {
        msg: "不能为空",
        test: function (val) {
            return val.length > 0;
        }
    },
    /* 用户名(长度2-12位的中英文) */
    userName: {
        msg: "格式错误",
        test: function (val) {
            return !val
                || /^[A-Za-z0-9\u4e00-\u9fa5]{1,12}$/
                    .test(val);
        }
    },
    /* 手机号码 */
    phoneNumber: {
        msg: "格式错误",
        test: function (val) {
            return !val
                || /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
                    .test(val);
        }
    },
    /* 4位数字验证码 */
    verification: {
        msg: "格式错误",
        test: function (val) {
            return !val
                || /([0-9]{4})/
                    .test(val);
        }
    },
    // 平台
    platform: {
        msg: "暂不支持的直播平台",
        test: function (val) {
            for (let domain of platformDomain) {
                if (val.indexOf(domain) > -1) {
                    return true;
                }
            }
            return false;
        }
    },
    // 密码
    password: {
        msg: "为6到16位数字和字母",
        test: function (val) {
            return !val
                || /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
                    .test(val);
        }
    },
};
/**
 * 根据validatorJson验证
 * @param validatorJson
 * @returns {boolean}
 */
let validate = (validatorJson) => {
    for (let validatorItem of validatorJson) {
        let rules = validatorItem['rules'];
        if (rules && rules.length === 0) {
            continue;
        }
        let item = $('[name="'+ validatorItem.name +'"]');
        for (let value of rules) {
            let val = $.trim(item.val());
            if (errMsg[value].test(val)) {
                continue;
            }
            bus.$Message.warning(validatorItem.label + errMsg[value].msg);
            item.focus();
            return false;
        }
    }
    return true;
};

export default validate;