const formFields = {
    "title": {
        type: "text",
        min: 3,
        max: 64,
        errorMessage: "Başlık en az 3 karakter olmalıdır."
    },
    "parent_id": {
        type: "select",
        errorMessage: "Geçersiz değer."
    },
    "first_name": {
        type: "text",
        min: 3,
        max: 64,
        errorMessage: "Ad en az 3 karakter olmalıdır."
    },
    "last_name": {
        type: "text",
        min: 3,
        max: 64,
        errorMessage: "Soyad en az 3 karakter olmalıdır."
    },
    "phone": {
        type: "numeric",
        min: 10,
        max: 10,
        errorMessage: "Geçerli bir telefon numarası giriniz."
    },
    "email": {
        type: "email",
        min: 3,
        max: 64,
        errorMessage: "Geçerli bir e-posta adresi giriniz."
    },
    "password": {
        type: "text",
        min: 6,
        max: 64,
        errorMessage: "Şifre en az 6 karakter olmalıdır."
    },
    "password_confirmation": {
        errorMessage: "Şifreler uyuşmuyor."
    },
    "is_admin": {
        type: "checkbox",
        errorMessage: "Geçersiz değer."
    }
}


const validationFunctions = {
    text: (value, min, max) => value.length >= min && value.length <= max,
    numeric: (value, min, max) => /^\d+$/.test(value) && value.length >= min && value.length <= max,
    email: (value, min, max) => {
        const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/i;
        return regex.test(value) && value.length >= min && value.length <= max;
    },
    confirmation: (value, confirmation) => value === confirmation,
    checkbox: (value, min, max) => {
        return typeof value === 'boolean' || value === undefined
    },
    select: (value) => value >= 0 || value === undefined

};


const validateForm = async ({fields, data, setErrors}) => {
    let errors = {};

    for (const fieldForm of fields) {
        const {type, min, max, errorMessage} = formFields[fieldForm.field]
        let validationFunction = null;
        let confirmation = false;

        if (fieldForm.field.endsWith("_confirmation") && data[fieldForm.field] !== undefined) {
            validationFunction = validationFunctions["confirmation"];
            confirmation = true;
        } else {
            validationFunction = validationFunctions[type];
            confirmation = false;
        }

        if (!confirmation && fieldForm.required && !data[fieldForm.field]) {
            errors[fieldForm.field] = "Alan boş bırakılamaz";
        } else if (
            confirmation &&
            !validationFunctions["confirmation"](
                data[fieldForm.field],
                data[fieldForm.field.substring(0, fieldForm.field.indexOf("_confirmation"))]
            )
        ) {
            errors[fieldForm.field] = errorMessage;
        } else if (!confirmation && data[fieldForm.field] !== undefined && !validationFunction(data[fieldForm.field], min, max)) {
            errors[fieldForm.field] = errorMessage;
        }
    }

    const x = async () => {
        await setErrors(errors); // await kullanarak setErrors işleminin tamamlanmasını bekleyin
    }
    await x()
};


export {
    validateForm
}