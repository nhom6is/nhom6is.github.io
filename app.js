// Lấy modal
var modal = document.getElementsByClassName("canvas-customer-login")[0];

var modalMenu = document.getElementsByClassName("header-canvas-menu")[0];

// Lấy button mở modal
var btn = document.getElementsByClassName("header-account")[0];

var btnMenu = document.getElementsByClassName("action-menu-responsive")[0];


var overLay = document.getElementsByClassName("header-overlay")[0];


// Lay btn close modal

var btnClose = document.getElementsByClassName("close")[0];
var btnClose2 = document.getElementsByClassName("header-overlay")[0];

var btnCloseMenu = document.getElementsByClassName("close-menu")[0];



// Khi người dùng nhấp vào nút, mở modal
btn.onclick = function () {
  modal.style.right = "0";
  overLay.style.display = "block";
};

// btnMenu.onclick = function () {
//   modalMenu.style.left = "0";
//   overLay.style.display = "block";
// };


// Khi người dùng nhấp vào nút, mở modal
btnClose.onclick = function () {
  modal.style.right = "-500px";
  overLay.style.display = "none";

};

btnClose2.onclick = function () {
  modal.style.right = "-500px";
  overLay.style.display = "none";

};

// btnCloseMenu.onclick = function () {
//   modalMenu.style.left = "-450px";
//   overLay.style.display = "none";

// };

btnClose2.onclick = function () {
  modal.style.right = "-500px";
  modalMenu.style.left = "-450px";
  overLay.style.display = "none";
};

//Even scroll 

const detail = document.getElementById("detail")
const header = document.getElementsByClassName("middle-content")[0]
document.onscroll = function (e) {
  console.log(window.pageYOffset)
  if (window.pageYOffset > 100) {
    header.style.padding = "20px 40px";
    header.style.boxShadow = " 0 5px 15px 0 rgba(0,0,0,.1)";
  } else {
    header.style.padding = "45px 40px";
    header.style.boxShadow = "none";

  }
}


// Validate form

function Validator(options) {
  function getParent(element, selector) {
    while (element.parentElement) {
      console.log(element.parentElement)
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  var selectorRules = {};

  // Hàm thực hiện validate
  function validate(inputElement, rule) {
    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
    var errorMessage;

    // Lấy ra các rules của selector
    var rules = selectorRules[rule.selector];

    // Lặp qua từng rule & kiểm tra
    // Nếu có lỗi thì dừng việc kiểm
    for (var i = 0; i < rules.length; ++i) {
      switch (inputElement.type) {
        case 'radio':
        case 'checkbox':
          errorMessage = rules[i](
            formElement.querySelector(rule.selector + ':checked')
          );
          break;
        default:
          errorMessage = rules[i](inputElement.value);
      }
      if (errorMessage) break;
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      getParent(inputElement, options.formGroupSelector).classList.add('invalid');
    } else {
      errorElement.innerText = '';
      getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
    }

    return !errorMessage;
  }

  // Lấy element của form cần validate
  var formElement = document.querySelector(options.form);
  if (formElement) {
    // Khi submit form
    formElement.onsubmit = function (e) {
      e.preventDefault();

      var isFormValid = true;

      // Lặp qua từng rules và validate
      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        var isValid = validate(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        // Trường hợp submit với javascript
        if (typeof options.onSubmit === 'function') {
          var enableInputs = formElement.querySelectorAll('[name]');
          var formValues = Array.from(enableInputs).reduce(function (values, input) {

            switch (input.type) {
              case 'radio':
                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                break;
              case 'checkbox':
                if (!input.matches(':checked')) {
                  values[input.name] = '';
                  return values;
                }
                if (!Array.isArray(values[input.name])) {
                  values[input.name] = [];
                }
                values[input.name].push(input.value);
                break;
              case 'file':
                values[input.name] = input.files;
                break;
              default:
                values[input.name] = input.value;
            }

            return values;
          }, {});
          options.onSubmit(formValues);
        }
        // Trường hợp submit với hành vi mặc định
        else {
          formElement.submit();
        }
      }
    }

    // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
    options.rules.forEach(function (rule) {

      // Lưu lại các rules cho mỗi input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      var inputElements = formElement.querySelectorAll(rule.selector);

      Array.from(inputElements).forEach(function (inputElement) {
        // Xử lý trường hợp blur khỏi input
        inputElement.onblur = function () {
          validate(inputElement, rule);
        }

        // Xử lý mỗi khi người dùng nhập vào input
        inputElement.oninput = function () {
          var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
          errorElement.innerText = '';
          getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }
      });
    });
  }

}



// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : message || 'Vui lòng nhập trường này'
    }
  };
}

Validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : message || 'Trường này phải là email';
    }
  };
}

Validator.minLength = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
    }
  };
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
    }
  }
}






