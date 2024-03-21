import { useState } from "react";

import "./index.css";

import FieldForm from "../../component/field-form";
import Grid from "../../component/grid";

import { Alert, Loader, LOAD_STATUS } from "../../component/load";

export default function Component({
  onCreate,
  placeholder,
  button,
  id = null,
}) {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (value) => {
    //Стара версія, яка не працювала: return sendData({ value }) - чому?
    return sendData({ dataToSend: { value } });
  };

  const sendData = async ({ dataToSend }) => {
    setStatus(LOAD_STATUS.PROGRESS);

    try {
      const res = await fetch("http://localhost:4000/post-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertData(dataToSend),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(null);

        if (onCreate) onCreate();
      } else {
        setMessage(data.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    } catch (error) {
      setMessage(error.message);
      setStatus(LOAD_STATUS.ERROR);
    }
  };
  const convertData = ({ value }) =>
    JSON.stringify({
      text: value,
      username: "user",
      postId: id,
    });

  return (
    <Grid>
      <FieldForm
        placeholder={placeholder}
        button={button}
        onSubmit={handleSubmit}
      />
      {status === LOAD_STATUS.ERROR && (
        <Alert status={status} message={message} />
      )}
      {status === LOAD_STATUS.PROGRESS && <Loader />}
    </Grid>
  );
}

// ### Детальний опис функцій, методів та властивостей

// #### Функції:
// 1. **handleSubmit(value)**
//    - **Опис**: Обробляє подію надсилання даних на сервер.
//    - **Параметри**: `value` - значення, що надходить з форми.
//    - **Дії**: Викликає функцію `sendData` з об'єктом `data` для відправлення даних на сервер.

// 2. **sendData({ dataToSend })**
//    - **Опис**: Відправляє POST-запит на сервер для створення нового посту.
//    - **Параметри**: `{ dataToSend }` - об'єкт даних для відправлення.
//    - **Дії**:
//      - Встановлює статус загрузки на `LOAD_STATUS.PROGRESS`.
//      - Відправляє запит на сервер з даними, конвертованими за допомогою `convertData`.
//      - Обробляє отриману відповідь: якщо успішно - очищає статус та, якщо передано функцію `onCreate`, викликає її; якщо невдало - встановлює статус `LOAD_STATUS.ERROR` та встановлює повідомлення про помилку.

// 3. **convertData({ value })**
//    - **Опис**: Перетворює вхідні дані у формат JSON перед відправленням на сервер.
//    - **Параметри**: `{ value }` - дані для конвертації.
//    - **Повертає**: Рядок JSON з додатковою інформацією: `text`, `username` та `postId`.

// #### Властивості:
// 1. **status**
//    - **Тип**: State
//    - **Опис**: Визначає статус запиту: `null`, `LOAD_STATUS.PROGRESS`, або `LOAD_STATUS.ERROR`.

// 2. **message**
//    - **Тип**: State
//    - **Опис**: Повідомлення про помилку або стан операції.

// 3. **onCreate**
//    - **Тип**: Prop
//    - **Опис**: Функція, яка викликається у випадку успішного створення посту.

// 4. **placeholder**
//    - **Тип**: Prop
//    - **Опис**: Текстова вказівка для поля вводу у формі.

// 5. **button**
//    - **Тип**: Prop
//    - **Опис**: Текст на кнопці для відправлення форми.

// 6. **id**
//    - **Тип**: Prop
//    - **Опис**: Ідентифікатор посту, який може передаватися при створенні нового посту.

// #### Компоненти:
// - **FieldForm**: Компонент для введення даних і події відправки форми.
// - **Grid**: Компонент для розміщення елементів у вигляді сітки.
// - **Alert**: Компонент для відображення повідомлень про помилки.
// - **Loader**: Компонент для відображення індікатора загрузки.

// Даний файл містить функції для взаємодії з сервером, властивості для управління станом та параметрами відображення компонентів.
